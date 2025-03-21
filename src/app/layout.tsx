import { BaseLayout } from '@/components/layouts/BaseLayout'
import { LoggerProvider } from '@/components/providers/LoggerProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Barebat CMS',
  description: 'A headless CMS for bar and bat mitzvah events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LoggerProvider>
          <BaseLayout>{children}</BaseLayout>
        </LoggerProvider>
      </body>
    </html>
  )
}
