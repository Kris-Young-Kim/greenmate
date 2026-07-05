import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Nunito, Fraunces } from "next/font/google"
import Script from "next/script"
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

const SITE_URL = "https://swgreen.shop"
const SITE_NAME = "GreenMate"
const DEFAULT_DESC = "GreenMate로 텃밭 새싹을 기록하고, 물 주기를 관리하고, AI 가드닝 조언을 받아보세요."
const OG_IMAGE = "/icons/icon-512.png"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GreenMate — 홈 가드닝 파트너",
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: ["홈 가드닝", "텃밭", "반려식물", "베란다 농사", "식물 키우기", "AI 가드닝", "그린마트"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "GreenMate — 홈 가드닝 파트너",
    description: DEFAULT_DESC,
    images: [{ url: OG_IMAGE, width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    site: "@greenmate_kr",
    title: "GreenMate — 홈 가드닝 파트너",
    description: DEFAULT_DESC,
    images: [OG_IMAGE],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
    startupImage: "/apple-touch-icon.png",
  },
  verification: { other: { "naver-site-verification": ["16b4ebc9cd6a8f472027bf436f19a631c3b26218", "9cf72da9fb1c08e434eb67374fb8b2d7ddd94d87"] } },
  formatDetection: { telephone: true },
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
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NRQHQNMG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NRQHQNMG"
          strategy="afterInteractive"
        />
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
