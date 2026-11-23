import { PAGE_SIZES, type PageSize } from "./types";

export function Pagination({
  page,
  pageSize,
  total,
  setPage,
  setPageSize,
}: {
  page: number
  pageSize: PageSize
  total: number
  setPage: (page: number) => void
  setPageSize: (size: PageSize) => void
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);

  return (
    <nav className="pagination" aria-label="Pagination">
      <label>
        <span>Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value) as PageSize)}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <span aria-live="polite">
        {first}–{last} of {total}
      </span>
      <div>
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          ‹
        </button>
        <span>
          Page {page} of {pageCount}
        </span>
        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </nav>
  )
}
