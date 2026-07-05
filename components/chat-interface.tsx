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
import type { Plant } from "@/lib/db/schema"
import { plantEmoji, daysSincePlanted, waterStatus } from "@/lib/plant-utils"

const QUICK_QUESTIONS = [
  { emoji: "🌱", label: "My leaves are yellow" },
  { emoji: "💧", label: "How often to water?" },
  { emoji: "🐛", label: "Bug help!" },
]

export function ChatInterface({ plant }: { plant: Plant }) {
  const status = waterStatus(plant.lastWatered)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status: chatStatus } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { plantId: plant.id },
    }),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text" as const,
            text: `Hi! I'm your GreenMate AI expert. 🌿 I'm here to help you care for **${plant.nickname}**, your ${plant.type} on Day ${daysSincePlanted(plant.plantedDate)}. Ask me anything!`,
          },
        ],
      },
    ] as UIMessage[],
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
          render={<Link href="/" aria-label="Back to dashboard" />}
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
            {plantEmoji(plant.type)} {plant.type} · Day{" "}
            {daysSincePlanted(plant.plantedDate)}
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
          {status.neverWatered
            ? "Not watered"
            : status.label.replace("Last watered: ", "")}
        </Badge>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((m) => (
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
                <MessageContent
                  text={m.parts
                    .filter((p) => p.type === "text")
                    .map((p) => (p as { type: "text"; text: string }).text)
                    .join("")}
                />
              ) : (
                <p className="leading-relaxed">
                  {m.parts
                    .filter((p) => p.type === "text")
                    .map((p) => (p as { type: "text"; text: string }).text)
                    .join("")}
                </p>
              )}
            </div>
          </div>
        ))}

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
            placeholder={`Ask GreenMate AI anything about your ${plant.type.toLowerCase()}...`}
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
