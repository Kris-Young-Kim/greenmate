import {ClerkProvider} from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito, Fraunces } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GreenMate — 홈 가드닝 파트너',
  description:
    'GreenMate로 텃밭 새싹을 기록하고, 물 주기를 관리하고, AI 가드닝 조언을 받아보세요.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2D6A4F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${nunito.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        <ClerkProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ClerkProvider>
      </body>
    </html>
  )
}