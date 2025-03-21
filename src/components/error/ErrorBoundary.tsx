'use client'

import { Component, ReactNode } from 'react'
import { logError } from '@/lib/logger'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (info.componentStack) {
      logError(error, { ...info, componentStack: info.componentStack })
    } else {
      logError(error, { componentStack: 'No stack trace available' })
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
            <p className="mt-2 text-gray-600">
              An error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 