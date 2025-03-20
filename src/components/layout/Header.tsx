'use client'

import { Menu, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <User className="h-6 w-6" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 