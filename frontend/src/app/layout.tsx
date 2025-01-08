'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { initEmailJS } from '@/lib/emailjs'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initEmailJS()
  }, [])

  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
