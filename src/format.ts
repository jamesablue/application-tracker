import type { Application } from './types'

export function formatDate(date: string | null): string {
  if (!date) return 'Not recorded'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    // "2026-11-22" parses as UTC midnight; format in UTC so it isn't shown as Nov 21
    timeZone: 'UTC',
  })
}

export function formatSalary(salary: Application['salary']): string {
  if (!salary) return 'Not recorded'
  const { min, max, currency, period } = salary
  let amount: string
  if (min != null && max != null)
    amount = `${min.toLocaleString()} - ${max.toLocaleString()}`
  else if (min != null) amount = `from ${min.toLocaleString()}`
  else if (max != null) amount = `up to ${max.toLocaleString()}`
  else return 'Not recorded'
  return `${currency} ${amount} / ${period}`
}
