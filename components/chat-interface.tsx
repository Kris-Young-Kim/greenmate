"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Droplets, Sprout } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { MessageContent } from "@/components/message-content"
import type { Plant } from "@/lib/db/schema"
import {
  plantEmoji,
  daysSincePlanted,
  waterStatus,
} from "@/lib/plant-utils"

type Message = {
  id: number
  role: "user" | "assistant"
  text: string
}

const QUICK_QUESTIONS = [
  { emoji: "🌱", label: "My leaves are yellow" },
  { emoji: "💧", label: "How often to water?" },
  { emoji: "🐛", label: "Bug help!" },
]

function mockReply(plant: Plant, question: string): string {
  const q = question.toLowerCase()
  const name = plant.nickname

  if (q.includes("yellow") || q.includes("leaves")) {
    return `Yellowing leaves on **${name}** are usually a watering or light issue. Here's what to check:\n- **Overwatering:** let the top inch of soil dry between waterings.\n- **Light:** ${plant.type} loves 6+ hours of bright, indirect light.\n- **Nutrients:** a diluted liquid feed every 2 weeks helps once seedlings establish.\n\nRemove any fully yellow leaves so the plant can focus its energy on new growth.`
  }
  if (q.includes("water") || q.includes("often")) {
    return `Great question! For **${plant.type}** at this stage:\n- Water when the **top 2-3cm of soil feels dry** to the touch.\n- Aim for consistently moist (not soggy) soil.\n- Water in the **morning** so leaves dry out during the day.\n\nSince this is Day ${daysSincePlanted(plant.plantedDate)}, keep the seedling evenly moist to encourage strong roots.`
  }
  if (q.includes("bug") || q.includes("pest")) {
    return `Let's tackle those pests on **${name}**. Common seedling bugs:\n- **Aphids:** rinse leaves and spray with diluted soapy water.\n- **Fungus gnats:** let soil dry out a bit and add a sticky trap.\n- **Spider mites:** raise humidity and wipe leaves down.\n\nInspect the **undersides of leaves** — that's where they hide!`
  }
  return `Thanks for asking about **${name}**! Your ${plant.type} is on Day ${daysSincePlanted(plant.plantedDate)}. Keep the soil evenly moist, give it plenty of bright indirect light, and rotate the pot every few days for even growth. What would you like help with — watering, light, leaves, or pests?`
}

export function ChatInterface({ plant }: { plant: Plant }) {
  const status = waterStatus(plant.lastWatered)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: `Hi! I'm your GreenMate AI expert. 🌿 I'm here to help you care for **${plant.nickname}**, your ${plant.type} on Day ${daysSincePlanted(plant.plantedDate)}. Ask me anything!`,
    },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(2)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = { id: nextId.current++, role: "user", text: trimmed }
    const aiMsg: Message = {
      id: nextId.current++,
      role: "assistant",
      text: mockReply(plant, trimmed),
    }
    setMessages((prev) => [...prev, userMsg, aiMsg])
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
            status.urgent ? "border-destructive/40 text-destructive" : "text-muted-foreground",
          )}
        >
          <Droplets className="size-3" />
          {status.neverWatered ? "Not watered" : status.label.replace("Last watered: ", "")}
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
                <MessageContent text={m.text} />
              ) : (
                <p className="leading-relaxed">{m.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick questions */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-1">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => send(q.label)}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
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
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
