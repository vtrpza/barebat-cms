'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

/**
 * DashboardLayout Component
 * 
 * Main layout component for the dashboard area. Handles the responsive sidebar
 * and header layout, managing the sidebar's open/closed state.
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be rendered within the layout
 */
interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 