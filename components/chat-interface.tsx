"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Droplets, Sprout } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { MessageContent } from "@/components/message-content"
import { ProductRecommendCard, type RecommendProduct } from "@/components/product-recommend-card"
import type { Plant, Chat } from "@/lib/db/schema"
import { plantEmoji, plantDisplayName, daysSincePlanted, waterStatus } from "@/lib/plant-utils"

const QUICK_QUESTIONS = [
  { emoji: "🌱", label: "잎이 노랗게 변해요" },
  { emoji: "💧", label: "물은 얼마나 자주 줘야 해요?" },
  { emoji: "🐛", label: "벌레가 생겼어요!" },
]

export function ChatInterface({ plant, history = [] }: { plant: Plant; history?: Chat[] }) {
  const status = waterStatus(plant.lastWatered)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const welcomeMessage: UIMessage = {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text" as const,
        text: `안녕하세요! 저는 GreenMate AI 전문가예요. 🌿 **${plant.nickname}**(${plantDisplayName(plant.type)}, ${daysSincePlanted(plant.plantedDate)}일째)의 케어를 도와드릴게요. 무엇이든 물어보세요!`,
      },
    ],
  }

  const historyMessages: UIMessage[] = history.map((c) => ({
    id: String(c.id),
    role: c.role as "user" | "assistant",
    parts: [{ type: "text" as const, text: c.content }],
  }))

  const { messages, sendMessage, status: chatStatus } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { plantId: plant.id },
    }),
    messages: [welcomeMessage, ...historyMessages] as UIMessage[],
  })

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    sendMessage({ text: trimmed })
    setInput("")
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing &&
      e.keyCode !== 229
    ) {
      e.preventDefault()
      send(input)
    }
  }

  const isLoading = chatStatus === "streaming"

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-2xl flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border/70 bg-background/90 px-3 py-2.5 backdrop-blur">
        <Button
          variant="ghost"
          size="icon"
          nativeButton={false}
          render={<Link href="/dashboard" aria-label="내 텃밭으로 돌아가기" />}
        >
          <ArrowLeft className="size-5" />
        </Button>

        <span
          className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-xl"
          aria-hidden="true"
        >
          {plantEmoji(plant.type)}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate font-serif text-base text-foreground">
              {plant.nickname}
            </h1>
          </div>
          <p className="text-xs text-muted-foreground">
            {plantEmoji(plant.type)} {plantDisplayName(plant.type)} · {daysSincePlanted(plant.plantedDate)}일째
          </p>
        </div>

        <Badge
          variant="outline"
          className={cn(
            "gap-1",
            status.urgent
              ? "border-destructive/40 text-destructive"
              : "text-muted-foreground",
          )}
        >
          <Droplets className="size-3" />
          {status.label}
        </Badge>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((m) => {
          const textContent = m.parts
            .filter((p) => p.type === "text")
            .map((p) => (p as { type: "text"; text: string }).text)
            .join("")

          // tool-invocation parts (dynamic-tool or tool-recommendProducts)
          const recommendedProducts: RecommendProduct[] = m.parts
            .filter((p: any) => {
              const isDynamic =
                p.type === "dynamic-tool" && p.toolName === "recommendProducts"
              const isStatic = p.type === "tool-recommendProducts"
              return (
                (isDynamic || isStatic) &&
                p.state === "output-available" &&
                Array.isArray(p.output?.products)
              )
            })
            .flatMap((p: any) => p.output.products as RecommendProduct[])

          return (
            <div
              key={m.id}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {m.role === "assistant" && (
                <span className="mr-2 mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sprout className="size-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                  m.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-card text-card-foreground ring-1 ring-border",
                )}
              >
                {m.role === "assistant" ? (
                  <>
                    {textContent && <MessageContent text={textContent} />}
                    {recommendedProducts.length > 0 && (
                      <div className={cn("flex flex-col gap-2", textContent && "mt-3")}>
                        {recommendedProducts.map((product) => (
                          <ProductRecommendCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="leading-relaxed">{textContent}</p>
                )}
              </div>
            </div>
          )
        })}

        {isLoading && (
          <div className="flex justify-start">
            <span className="mr-2 mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sprout className="size-4" />
            </span>
            <div className="rounded-2xl rounded-bl-md bg-card px-4 py-2.5 text-sm ring-1 ring-border">
              <span className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.2s]">●</span>
                <span className="animate-bounce [animation-delay:0.4s]">●</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quick questions */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-1">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => send(q.label)}
            disabled={isLoading}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <span aria-hidden="true">{q.emoji}</span>
            {q.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border/70 bg-background px-3 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-end gap-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${plantDisplayName(plant.type)}에 대해 무엇이든 물어보세요...`}
            rows={1}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl bg-card"
          />
          <Button
            type="submit"
            size="icon-lg"
            className="size-11 shrink-0 rounded-2xl"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <Send className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
