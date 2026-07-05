"use client"

import Link from "next/link"
import { Sprout } from "lucide-react"
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sprout className="size-5" />
          </span>
          <span className="font-serif text-xl font-semibold text-foreground">
            GreenMate
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton>
              <Button variant="ghost" size="sm">로그인</Button>
            </SignInButton>
            <SignUpButton>
              <Button size="sm">회원가입</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/dashboard" />}
            >
              내 텃밭
            </Button>
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  )
}
