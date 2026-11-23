import type { Application, SortOrder } from './types'
import { formatSalary } from './format'

export function Table({
  applications,
  sort,
  setSort,
}: {
  applications: Application[]
  sort: SortOrder
  setSort: (sort: SortOrder) => void
}) {
  return (
    <div>
      <table>
        <caption className="sr-only">Job applications</caption>
        <thead>
          <tr>
            <th aria-sort={sort === 'company' ? 'ascending' : 'none'}>
              <button onClick={() => setSort('company')}>Company / Role</button>
            </th>
            <th aria-sort={sort === 'status' ? 'ascending' : 'none'}>
              <button onClick={() => setSort('status')}>Status</button>
            </th>
            <th
              aria-sort={
                sort === 'newest'
                  ? 'descending'
                  : sort === 'oldest'
                    ? 'ascending'
                    : 'none'
              }
            >
              <button
                onClick={() => setSort(sort === 'newest' ? 'oldest' : 'newest')}
              >
                Applied
              </button>
            </th>
            <th>Location</th>
            <th>Salary range</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>
                <strong>{app.company}</strong>
                <br />
                {app.role}
              </td>
              <td>{app.status}</td>
              <td>{app.dateApplied}</td>
              <td>
                {app.location} ({app.arrangement})
              </td>
              <td>{formatSalary(app.salary)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Status({ status }: { status: Application['status'] }) {
  return (
    <span className={`status ${status.toLowerCase()}`}>
      <span aria-hidden="true" />
      {status}
    </span>
  )
}
