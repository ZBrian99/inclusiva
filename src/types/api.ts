export type ApiPagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

import type { PostInput } from '@/lib/validation/post'
import { categoryOptions, paymentMethodOptions } from '@/lib/validation/post'

export type Category = typeof categoryOptions[number]
export type PaymentMethod = typeof paymentMethodOptions[number]

// API Post se basa en el PostInput del schema y asegura id presente
export type ApiPost = PostInput & { id: string }

export type ListResponse = { data: ApiPost[]; pagination: ApiPagination }
export type DetailResponse = { data: ApiPost }