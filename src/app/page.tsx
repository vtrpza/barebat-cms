import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Barebat CMS</h1>
      <p className="mb-8 text-center text-lg text-gray-600">
        Create beautiful event websites for bar and bat mitzvahs with ease.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/auth/register">Get Started</Link>
        </Button>
      </div>
    </div>
  )
}
