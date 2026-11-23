import type { Application } from './types'

export function formatDate(date: string | null): string {
  if (!date) return 'Not recorded'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatSalary(salary: Application['salary']): string {
  if (!salary) return 'Not recorded'
  const { min, max, currency, period } = salary
  return `${currency} ${min?.toLocaleString()} - ${max?.toLocaleString()} / ${period}`
}
