'use client'

import { useEffect } from 'react'
import { initEmailJS } from '@/lib/emailjs'

export function EmailInit() {
  useEffect(() => {
    initEmailJS()
  }, [])

  return null
} 