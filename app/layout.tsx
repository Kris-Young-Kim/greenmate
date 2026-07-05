import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Nunito, Fraunces } from "next/font/google"
import "./globals.css"

import { BottomNav } from "@/components/bottom-nav"
import { ToastProvider } from "@/components/toast-provider"
import { SiteFooter } from "@/components/site-footer"
import { PWARegister } from "@/components/pwa-register"
import { CartHydrator } from "@/components/cart-hydrator"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GreenMate — 홈 가드닝 파트너",
  description:
    "GreenMate로 텃밭 새싹을 기록하고, 물 주기를 관리하고, AI 가드닝 조언을 받아보세요.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GreenMate",
    startupImage: "/apple-touch-icon.png",
  },
  formatDetection: {
    telephone: true,
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#2D6A4F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${nunito.variable} ${fraunces.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ClerkProvider>
          {children}
          <SiteFooter />
          <BottomNav />
          <ToastProvider />
          <CartHydrator />
          <PWARegister />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ClerkProvider>
      </body>
    </html>
  )
}
