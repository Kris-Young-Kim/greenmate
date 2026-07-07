import { streamText, UIMessage, convertToModelMessages } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { plants, chats } from "@/lib/db/schema"
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
이 정보를 바탕으로, 사용자가 질문할 때 굳이 본인 식물 상황을 설명하지 않아도 맞춤형 답변을 해줘. 친근하고 실용적으로 답변해줘.`

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
    onFinish: async ({ text }) => {
      if (!userText) return
      await db.insert(chats).values([
        { plantId, userId, role: "user", content: userText },
        { plantId, userId, role: "assistant", content: text },
      ])
    },
  })

  return result.toUIMessageStreamResponse()
}
