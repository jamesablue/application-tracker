import { useEffect, useState } from 'react'
import './App.css'
import { Table } from './Table'
import { applications } from './data'
import { Filters } from './Filters'
import { Pagination } from './Pagination'
import { useUrlFilters } from './useUrlFilters'

function App() {
  const [filters, updateFilters] = useUrlFilters()
  const { query, status, arrangement, sort, page, size: pageSize } = filters
  const [draft, setDraft] = useState(query)
  const [syncedQuery, setSyncedQuery] = useState(query)
  if (query !== syncedQuery) {
    setSyncedQuery(query)
    setDraft(query)
  }

  useEffect(() => {
    if (draft === query) return
    const timer = setTimeout(() => {
      updateFilters({ query: draft })
    }, 350)
    return () => clearTimeout(timer)
  }, [draft, query, updateFilters])

  const search = query.trim().toLowerCase()
  const filteredApplications = applications.filter((app) => {
    const matchesQuery =
      !search ||
      app.company.toLowerCase().includes(search) ||
      app.role.toLowerCase().includes(search)
    const matchesStatus = !status || app.status === status
    const matchesArrangement = !arrangement || app.arrangement === arrangement
    return matchesQuery && matchesStatus && matchesArrangement
  })

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!a.dateApplied !== !b.dateApplied) return a.dateApplied ? -1 : 1

    switch (sort) {
      case 'newest':
        return (
          new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
        )
      case 'oldest':
        return (
          new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
        )
      case 'company':
        return a.company.localeCompare(b.company)
      case 'role':
        return a.role.localeCompare(b.role)
      case 'status':
        return a.status.localeCompare(b.status)
      case 'salary': {
        const salaryA = a.salary?.min ?? 0
        const salaryB = b.salary?.min ?? 0
        return salaryB - salaryA // descending order
      }
      default:
        return 0
    }
  })

  // Derived, not stored: clamp the page so it can never point past the end
  const pageCount = Math.max(1, Math.ceil(sortedApplications.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageRows = sortedApplications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  function clearFilters() {
    setDraft('') // drop any typed text that hasn't reached the URL yet
    updateFilters({ query: '', status: '', arrangement: '' })
  }

  return (
    <>
      <div className="app-shell">
        <main>
          <section className="workspace" aria-labelledby="applications-title">
            <WorkspaceHeading />
            <Filters
              query={draft}
              status={status}
              arrangement={arrangement}
              onQueryChange={setDraft}
              onStatusChange={(value) => updateFilters({ status: value })}
              onArrangementChange={(value) =>
                updateFilters({ arrangement: value })
              }
            />
            {sortedApplications.length === 0 ? (
              <div className="empty">
                <h3>No applications match</h3>
                <p>Try a different search or filter.</p>
                <button onClick={clearFilters}>Clear filters</button>
              </div>
            ) : (
              <>
                <Table
                  applications={pageRows}
                  sort={sort}
                  setSort={(value) => updateFilters({ sort: value })}
                />
                <Pagination
                  page={currentPage}
                  pageSize={pageSize}
                  total={sortedApplications.length}
                  setPage={(p) => updateFilters({ page: p })}
                  setPageSize={(s) => updateFilters({ size: s })}
                />
              </>
            )}
          </section>
        </main>
      </div>
    </>
  )
}

function WorkspaceHeading() {
  return (
    <div className="workspace-heading">
      <div>
        <div className="title-row">
          <h2>Applications</h2>
        </div>
        <div className="workspace-heading__subtitle">
          <p>Track your job applications and their statuses.</p>
        </div>
      </div>
      <div className="workspace-heading__actions">
        <button className="button button--primary">Refresh</button>
      </div>
    </div>
  )
}

export default App
