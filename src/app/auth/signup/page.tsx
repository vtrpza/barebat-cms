'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import SignUpForm from '@/components/auth/SignUpForm'

function SignUpPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      // Handle token if needed
      router.push('/auth/login')
    }
  }, [router, searchParams])

  return <SignUpForm />
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPageContent />
    </Suspense>
  )
} 