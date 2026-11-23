import type { ApplicationStatus, WorkArrangement } from "./types"

export function Filters({
    query,
    status,
    arrangement,
    onQueryChange,
    onStatusChange,
    onArrangementChange
}: {
    query: string
    status: ApplicationStatus | ""
    arrangement: WorkArrangement | ""
    onQueryChange: (value: string) => void
    onStatusChange: (value: ApplicationStatus | "") => void
    onArrangementChange: (value: WorkArrangement | "") => void
}) {
  return (
    <div className="filters">
      <label className="search">
        <span aria-hidden="true">⌕</span>
        <input
            type="text"
            placeholder="Search by company or role"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>
      <label>
        <span>Status</span>
        <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as ApplicationStatus | "")}
        >
          <option value="">All</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="saved">Saved</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </label>
      <label>
        <span>Work Arrangement</span>
        <select
            value={arrangement}
            onChange={(e) => onArrangementChange(e.target.value as WorkArrangement | "")}
        >
          <option value="">All</option>
          <option value="remote">Remote</option>
          <option value="onsite">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </label>
    </div>
  )
}