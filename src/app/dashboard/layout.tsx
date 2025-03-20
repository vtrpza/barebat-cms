import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Barebat CMS',
  description: 'Manage your bar/bat mitzvah events, guest lists, and gift registry',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
} 