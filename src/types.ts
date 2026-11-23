export const STATUSES = [
  'saved',
  'applied',
  'interviewing',
  'offer',
  'rejected',
  'withdrawn',
] as const
export type ApplicationStatus = (typeof STATUSES)[number]

export const ARRANGEMENTS = ['remote', 'hybrid', 'onsite'] as const
export type WorkArrangement = (typeof ARRANGEMENTS)[number]

export const SORT_ORDERS = [
  'newest',
  'oldest',
  'company',
  'role',
  'status',
  'salary',
] as const
export type SortOrder = (typeof SORT_ORDERS)[number]

export interface Salary {
  min?: number
  max?: number
  currency: string // "USD"
  period: 'year' | 'hour'
}

export interface Application {
  id: string // crypto.randomUUID()
  company: string
  role: string
  status: ApplicationStatus
  dateApplied: string // ISO date, "2026-11-22"
  location: string // "Chicago, IL"
  arrangement: WorkArrangement
  salary?: Salary // optional: many postings omit it
}

export const PAGE_SIZES = [5, 10, 20] as const
export type PageSize = (typeof PAGE_SIZES)[number]
