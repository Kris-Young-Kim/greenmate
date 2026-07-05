import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { db } from "@/lib/db"
import { plants } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"

export const dynamic = "force-dynamic"

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ plantId?: string }>
}) {
  const { plantId } = await searchParams
  const id = Number(plantId)

  const plant = Number.isFinite(id)
    ? (await db.select().from(plants).where(eq(plants.id, id)).limit(1))[0]
    : undefined

  if (!plant) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <h1 className="font-serif text-2xl text-foreground">식물을 찾을 수 없어요</h1>
        <p className="max-w-sm text-muted-foreground">
          해당 식물을 찾을 수 없어요. 텃밭으로 돌아가서 식물을 선택해주세요.
        </p>
        <Button nativeButton={false} render={<Link href="/dashboard" />} className="gap-2">
          <ArrowLeft className="size-4" />
          텃밭으로 돌아가기
        </Button>
      </div>
    )
  }

  return <ChatInterface plant={plant} />
}
