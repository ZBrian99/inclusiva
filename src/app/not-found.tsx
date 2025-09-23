'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirección inmediata
    if (typeof window !== 'undefined' && window.history.length > 1) {
      // router.back()
      router.push('/')
    } else {
      router.push('/')
    }
  }, [router])

  // No mostrar nada, redirección inmediata
  return null
}
