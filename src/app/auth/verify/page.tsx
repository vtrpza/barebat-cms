'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function VerifyPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  useEffect(() => {
    // If user is verified, redirect to the original destination
    if (user?.email_confirmed_at) {
      window.location.href = redirectTo || '/dashboard'
    }
  }, [user, redirectTo])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
        <p className="mt-2 text-sm text-gray-600">
          We sent you an email with a verification link. Please check your inbox and click the link to verify your account.
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            After verification, you will be redirected to {redirectTo || 'your dashboard'}.
          </p>
        </div>
      </div>
    </div>
  )
} 