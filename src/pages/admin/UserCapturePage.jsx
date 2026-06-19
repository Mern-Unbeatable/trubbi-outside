import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { useToast } from '../../components/ui/Toast'
import AdminLoader from '../../components/admin/AdminLoader'
import Pagination, { PAGE_SIZE } from '../../components/admin/Pagination'

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function CaptureCard({ capture }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-secondary/50 p-4 sm:hidden">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-sm font-bold text-brand-secondary">
          {capture.firstName[0]}
          {capture.lastName[0]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-text-primary">
            {capture.firstName} {capture.lastName}
          </p>
          <p className="truncate text-sm text-text-secondary">{capture.email}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-text-tertiary">Captured {formatDate(capture.createdAt)}</p>
    </div>
  )
}

export default function UserCapturePage() {
  const toast = useToast()
  const [captures, setCaptures] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  })

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput.trim()), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const fetchCaptures = useCallback(
    async (targetPage, search = searchQuery) => {
      setLoading(true)
      try {
        const res = await api.getUserCaptures({
          page: targetPage,
          limit: PAGE_SIZE,
          search,
        })
        setCaptures(res.data.captures)
        setPagination(res.data.pagination)
      } catch (err) {
        toast.error(err.message, 'Failed to load user captures')
      } finally {
        setLoading(false)
      }
    },
    [toast, searchQuery],
  )

  useEffect(() => {
    fetchCaptures(1, searchQuery)
  }, [searchQuery, fetchCaptures])

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > pagination.totalPages || nextPage === pagination.page) {
      return
    }
    fetchCaptures(nextPage, searchQuery)
  }

  const isSearching = searchQuery.length > 0
  const showEmpty = !loading && captures.length === 0

  return (
    <div className="mx-auto w-full">
      <div className="mb-6 text-center sm:mb-8 sm:text-left">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-secondary">
          Management
        </p>
        <h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">User Capture</h2>
        <p className="mt-2 text-sm text-text-secondary sm:text-base">
          Waitlist users captured from the landing page only.
        </p>
      </div>

      <div className="flex min-h-[420px] flex-col overflow-hidden rounded-[20px] border border-border-subtle bg-bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.04)] sm:rounded-[24px]">
        <div className="border-b border-border-subtle bg-bg-secondary/30 px-4 py-4 sm:px-6">
          <label className="relative block">
            <span className="sr-only">Search by name or email</span>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name or email…"
              className="h-11 w-full rounded-2xl border border-border-subtle bg-bg-surface pl-11 pr-4 text-sm text-text-primary placeholder:text-text-secondary/70 outline-none transition focus:border-brand-secondary focus:bg-white sm:h-12 sm:text-base"
            />
          </label>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-surface/70">
              <AdminLoader />
            </div>
          )}

          {showEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-12 text-center">
              <p className="text-lg font-medium text-text-primary">
                {isSearching ? 'No matching users' : 'No users captured yet'}
              </p>
              <p className="max-w-sm text-sm text-text-secondary">
                {isSearching
                  ? `No results for "${searchQuery}". Try a different name or email.`
                  : 'Submissions from the landing waitlist form will appear here.'}
              </p>
            </div>
          ) : (
            <>
              <div
                className={`flex-1 overflow-auto transition-opacity duration-300 ${
                  loading ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="flex flex-col gap-3 p-4 sm:hidden">
                  {captures.map((capture) => (
                    <CaptureCard key={capture.id} capture={capture} />
                  ))}
                </div>

                <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="border-b border-border-subtle bg-bg-secondary/60 text-xs uppercase tracking-wide text-text-secondary">
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Email</th>
                        <th className="px-6 py-4 font-medium">Captured</th>
                      </tr>
                    </thead>
                    <tbody>
                      {captures.map((capture) => (
                        <tr
                          key={capture.id}
                          className="border-b border-border-subtle/70 last:border-0"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-secondary/10 text-sm font-bold text-brand-secondary">
                                {capture.firstName[0]}
                                {capture.lastName[0]}
                              </span>
                              <span className="font-medium text-text-primary">
                                {capture.firstName} {capture.lastName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-text-secondary">{capture.email}</td>
                          <td className="px-6 py-4 text-text-secondary">
                            {formatDate(capture.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Pagination
                className="mt-auto shrink-0"
                page={pagination.page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
