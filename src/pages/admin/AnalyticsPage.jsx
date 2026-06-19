import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/api'
import { useToast } from '../../components/ui/Toast'
import AdminLoader from '../../components/admin/AdminLoader'
import Pagination, { PAGE_SIZE } from '../../components/admin/Pagination'

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-[20px] border border-border-subtle bg-bg-surface p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] sm:rounded-[24px] sm:p-6">
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: accent }}>
        {value}
      </p>
    </div>
  )
}

function formatMonth(key) {
  const [year, month] = key.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

const EMPTY_SUMMARY = {
  totalCaptures: 0,
  last30Days: 0,
  chartData: [],
}

export default function AnalyticsPage() {
  const toast = useToast()
  const [summary, setSummary] = useState(EMPTY_SUMMARY)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [recentCaptures, setRecentCaptures] = useState([])
  const [recentLoading, setRecentLoading] = useState(true)
  const [recentPagination, setRecentPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  })

  const fetchSummary = useCallback(async () => {
    setSummaryLoading(true)
    try {
      const res = await api.getAnalytics()
      setSummary(res.data ?? EMPTY_SUMMARY)
    } catch (err) {
      toast.error(err.message, 'Failed to load analytics')
      setSummary(EMPTY_SUMMARY)
    } finally {
      setSummaryLoading(false)
    }
  }, [toast])

  const fetchRecent = useCallback(
    async (page) => {
      setRecentLoading(true)
      try {
        const res = await api.getUserCaptures({ page, limit: PAGE_SIZE })
        setRecentCaptures(res.data.captures)
        setRecentPagination(res.data.pagination)
      } catch (err) {
        toast.error(err.message, 'Failed to load recent captures')
        setRecentCaptures([])
      } finally {
        setRecentLoading(false)
      }
    },
    [toast],
  )

  useEffect(() => {
    fetchSummary()
    fetchRecent(1)
  }, [fetchSummary, fetchRecent])

  const handleRecentPageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > recentPagination.totalPages) return
    fetchRecent(nextPage)
  }

  const maxCount = Math.max(...(summary.chartData?.map((d) => d.count) || [1]), 1)
  const isInitialLoad = summaryLoading && recentLoading

  return (
    <div className="mx-auto w-full">
      <div className="mb-6 text-center sm:mb-8 sm:text-left">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-secondary">
          Insights
        </p>
        <h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">Analytics</h2>
        <p className="mt-2 text-sm text-text-secondary sm:text-base">
          Overview of captured users and growth.
        </p>
      </div>

      <div className="relative min-h-[480px] sm:min-h-[520px]">
        {isInitialLoad && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[20px] bg-bg-primary/60 backdrop-blur-[2px] sm:rounded-[24px]">
            <AdminLoader />
          </div>
        )}

        <div
          className={`grid gap-4 transition-opacity duration-300 sm:gap-6 ${
            isInitialLoad ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <StatCard label="Total captures" value={summary.totalCaptures} accent="#004a5c" />
            <StatCard label="Last 30 days" value={summary.last30Days} accent="#2F9E44" />
          </div>

          <div className="rounded-[20px] border border-border-subtle bg-bg-surface p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] sm:rounded-[24px] sm:p-6">
            <h3 className="text-base font-bold text-text-primary sm:text-lg">Captures by month</h3>
            {summary.chartData.length > 0 ? (
              <div className="mt-5 flex h-[180px] items-end gap-2 overflow-x-auto pb-2 sm:mt-6 sm:h-[200px] sm:gap-3">
                {summary.chartData.map((item) => (
                  <div key={item.month} className="flex min-w-[48px] flex-col items-center gap-2 sm:min-w-[56px]">
                    <span className="text-xs font-medium text-text-secondary">{item.count}</span>
                    <div
                      className="w-8 rounded-t-xl bg-brand-primary transition-[height] duration-500 ease-out sm:w-10"
                      style={{ height: `${Math.max(24, (item.count / maxCount) * 140)}px` }}
                    />
                    <span className="text-[10px] text-text-tertiary sm:text-[11px]">
                      {formatMonth(item.month)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-text-secondary">No capture data yet.</p>
            )}
          </div>

          <div className="overflow-hidden rounded-[20px] border border-border-subtle bg-bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.04)] sm:rounded-[24px]">
            <div className="p-5 pb-3 sm:p-6 sm:pb-4">
              <h3 className="text-base font-bold text-text-primary sm:text-lg">Recent captures</h3>
            </div>

            <div className="relative min-h-[240px] px-4 pb-2 sm:min-h-[280px] sm:px-6">
              {recentLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-surface/70">
                  <AdminLoader className="scale-90" />
                </div>
              )}

              {recentCaptures.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {recentCaptures.map((capture) => (
                    <div
                      key={capture.id}
                      className="flex flex-col gap-2 rounded-2xl bg-bg-secondary px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-text-primary">
                          {capture.firstName} {capture.lastName}
                        </p>
                        <p className="truncate text-sm text-text-secondary">{capture.email}</p>
                      </div>
                      <span className="shrink-0 text-xs text-text-tertiary">
                        {new Date(capture.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                !recentLoading && (
                  <p className="py-8 text-center text-sm text-text-secondary">
                    No recent captures.
                  </p>
                )
              )}
            </div>

            <Pagination
              page={recentPagination.page}
              totalPages={recentPagination.totalPages}
              total={recentPagination.total}
              onPageChange={handleRecentPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
