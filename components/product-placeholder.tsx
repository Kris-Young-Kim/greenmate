import Image from "next/image"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

const SIZE_MAP = {
  sm:  { box: "size-12 rounded-xl",  icon: "size-5" },
  md:  { box: "size-16 rounded-2xl", icon: "size-7" },
  lg:  { box: "w-full aspect-square max-w-[160px] rounded-3xl", icon: "size-14" },
}

export function ProductPlaceholder({
  size = "md",
  src,
  alt,
}: {
  size?: "sm" | "md" | "lg"
  src?: string
  alt?: string
}) {
  const s = SIZE_MAP[size]
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center bg-secondary overflow-hidden",
        src ? "relative" : "",
        s.box,
      )}
      aria-hidden={!src}
    >
      {src ? (
        <Image src={src} alt={alt ?? ""} fill className="object-cover" />
      ) : (
        <Package className={cn("text-muted-foreground/50", s.icon)} />
      )}
    </div>
  )
}
