const PAGE_SIZE = 12

export { PAGE_SIZE }

export default function Pagination({
  page,
  totalPages,
  total,
  pageSize = PAGE_SIZE,
  onPageChange,
  className = '',
}) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  )

  if (total === 0) return null

  return (
    <div
      className={`flex flex-col gap-4 border-t border-border-subtle bg-bg-secondary/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${className}`}
    >
      <p className="text-sm text-text-secondary">
        Showing <span className="font-medium text-text-primary">{start}</span>–
        <span className="font-medium text-text-primary">{end}</span> of{' '}
        <span className="font-medium text-text-primary">{total}</span> captures
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex h-10 items-center rounded-full border border-border-subtle bg-bg-surface px-4 text-sm font-medium text-text-primary transition hover:border-brand-secondary hover:text-brand-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {visiblePages.map((p, index) => {
            const prev = visiblePages[index - 1]
            const showEllipsis = prev && p - prev > 1

            return (
              <span key={p} className="flex items-center gap-1">
                {showEllipsis && (
                  <span className="px-1 text-sm text-text-tertiary">…</span>
                )}
                <button
                  type="button"
                  onClick={() => onPageChange(p)}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition ${
                    p === page
                      ? 'bg-brand-secondary text-white shadow-[0_8px_24px_rgba(0,74,92,0.25)]'
                      : 'border border-border-subtle bg-bg-surface text-text-primary hover:border-brand-secondary hover:text-brand-secondary'
                  }`}
                >
                  {p}
                </button>
              </span>
            )
          })}
        </div>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex h-10 items-center rounded-full border border-border-subtle bg-bg-surface px-4 text-sm font-medium text-text-primary transition hover:border-brand-secondary hover:text-brand-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
