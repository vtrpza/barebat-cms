import { Theme } from '@radix-ui/themes'
import { cn } from '@/utils/helpers'
import '@radix-ui/themes/styles.css'

interface BaseLayoutProps {
  children: React.ReactNode
  className?: string
}

export function BaseLayout({ children, className }: BaseLayoutProps) {
  return (
    <Theme appearance="light" accentColor="violet" radius="medium">
      <div className={cn('min-h-screen bg-background font-sans antialiased', className)}>
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </div>
    </Theme>
  )
} 