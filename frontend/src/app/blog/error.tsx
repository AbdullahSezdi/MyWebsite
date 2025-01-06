'use client'

import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          Bir şeyler yanlış gitti!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error.message || 'Beklenmeyen bir hata oluştu.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  )
} 