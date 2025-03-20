'use client'

import { 
  HomeIcon as Home, 
  CalendarIcon as Calendar, 
  GiftIcon as Gift, 
  UsersIcon as Users, 
  SettingsIcon as Settings, 
  XIcon as X 
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Events', href: '/dashboard/events', icon: Calendar },
  { name: 'Gift Registry', href: '/dashboard/gifts', icon: Gift },
  { name: 'Guests', href: '/dashboard/guests', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
].map(item => ({
  ...item,
  href: item.href.startsWith('/') ? item.href : `/${item.href}`
}))

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 h-screen w-64 transform bg-white transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <h1 className="text-xl font-bold">Barebat</h1>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center rounded-lg px-4 py-2 text-sm font-medium
                ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
} 