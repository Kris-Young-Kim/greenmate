import { streamText, UIMessage, convertToModelMessages, jsonSchema } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { plants, chats, products } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { daysSincePlanted, waterStatus } from "@/lib/plant-utils"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return new Response("Unauthorized", { status: 401 })

  const { messages, plantId }: { messages: UIMessage[]; plantId: number } =
    await req.json()

  const [plant] = await db
    .select()
    .from(plants)
    .where(and(eq(plants.id, plantId), eq(plants.userId, userId)))
    .limit(1)

  if (!plant) return new Response("Plant not found", { status: 404 })

  const diffDays = daysSincePlanted(plant.plantedDate)
  const status = waterStatus(plant.lastWatered)

  const systemPrompt = `너는 홈 가드닝 전문가야. 사용자가 키우는 식물 정보는 다음과 같아.
- 종류: ${plant.type}
- 별명: ${plant.nickname}
- 키운 지: ${diffDays}일째
- 물주기 상태: ${status.label}
이 정보를 바탕으로, 사용자가 질문할 때 굳이 본인 식물 상황을 설명하지 않아도 맞춤형 답변을 해줘. 친근하고 실용적으로 답변해줘.

그린마트에는 씨앗, 모종, 농기구(물뿌리개 등), 농자재, 비료, 신선 농산물(강원도찰옥수수 등)이 있어.
사용자가 "어디서 사요", "추천해줘", "무엇이 필요해요" 같은 구매·도구·재료 관련 질문을 하면 recommendProducts 도구로 관련 상품을 찾아 추천해줘.
식물 관리 방법이나 병충해 대처 같은 순수한 가드닝 질문에는 도구 없이 조언만 해줘.`

  // 마지막 사용자 메시지 텍스트 추출
  const lastUserMsg = messages[messages.length - 1]
  const userText = lastUserMsg?.parts
    ?.filter((p: { type: string }) => p.type === "text")
    .map((p: { type: string; text?: string }) => p.text ?? "")
    .join("") ?? ""

  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxSteps: 3,
    tools: {
      recommendProducts: {
        description:
          "사용자에게 그린마트 상품을 추천할 때 호출합니다. 씨앗, 모종, 농기구, 비료, 농자재, 농산물 등을 검색합니다.",
        parameters: jsonSchema<{ keywords: string[] }>({
          type: "object",
          properties: {
            keywords: {
              type: "array",
              items: { type: "string" },
              description: "검색 키워드 목록 (예: ['씨앗', '상추', '물뿌리개'])",
            },
          },
          required: ["keywords"],
        }),
        execute: async ({ keywords }: { keywords: string[] }) => {
          const all = await db.select().from(products).limit(100)
          const matched = all
            .filter((p) => p.stock > 0)
            .filter((p) => {
              const haystack =
                `${p.name} ${p.description} ${p.category} ${p.emoji}`.toLowerCase()
              return keywords.some((k) => haystack.includes(k.toLowerCase()))
            })
            .slice(0, 3)
            .map(({ id, name, description, price, emoji, options }) => ({
              id,
              name,
              description,
              emoji,
              lowestPrice: options?.length
                ? Math.min(...options.map((o) => o.price))
                : price,
            }))
          return { products: matched }
        },
      },
    },
    onFinish: async ({ text }) => {
      if (!userText) return
      await db.insert(chats).values([
        { plantId, userId, role: "user", content: userText },
        {
          plantId,
          userId,
          role: "assistant",
          content: text || "(상품 추천됨)",
        },
      ])
    },
  })

  return result.toUIMessageStreamResponse()
}
