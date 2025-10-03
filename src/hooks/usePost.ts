"use client"

import { useQuery } from '@tanstack/react-query'
import type { DetailResponse } from '@/types/api'

export function usePostQuery(id?: string) {
  return useQuery<DetailResponse>({
    queryKey: ['post', id],
    enabled: !!id,
    queryFn: async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
      const res = await fetch(`/api/posts/${id}` , {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      if (!res.ok) throw new Error('Error fetching post')
      return res.json() as Promise<DetailResponse>
    },
    staleTime: 60_000,
  })
}