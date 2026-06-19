import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../lib/api'
import { useToast } from '../../components/ui/Toast'
import PasswordInput from '../../components/admin/PasswordInput'

export default function ProfilePage() {
  const { admin } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (form.newPassword !== form.confirmPassword) {
      toast.error('New passwords do not match.', 'Validation error')
      return
    }

    if (form.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters.', 'Validation error')
      return
    }

    setLoading(true)

    try {
      await api.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      toast.success('Your password has been updated.', 'Success')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast.error(error.message || 'Failed to update password', 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 text-center sm:mb-8 sm:text-left">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-secondary">
          Account
        </p>
        <h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">Profile</h2>
        <p className="mt-2 text-sm text-text-secondary sm:text-base">
          Manage your account details and password.
        </p>
      </div>

      <div className="mb-5 rounded-[20px] border border-border-subtle bg-bg-surface p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] sm:mb-6 sm:rounded-[24px] sm:p-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-xl font-bold text-white">
            {admin?.firstName?.[0]}
            {admin?.lastName?.[0]}
          </span>
          <div className="min-w-0">
            <p className="text-lg font-bold text-text-primary sm:text-xl">
              {admin?.firstName} {admin?.lastName}
            </p>
            <p className="break-all text-sm text-text-secondary sm:text-base">{admin?.email}</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[20px] border border-border-subtle bg-bg-surface p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] sm:rounded-[24px] sm:p-6"
      >
        <h3 className="text-base font-bold text-text-primary sm:text-lg">Change password</h3>

        <div className="mt-5 flex flex-col gap-4">
          <PasswordInput
            label="Current password"
            autoComplete="current-password"
            value={form.currentPassword}
            onChange={(e) => setForm((c) => ({ ...c, currentPassword: e.target.value }))}
            required
          />

          <PasswordInput
            label="New password"
            autoComplete="new-password"
            minLength={8}
            value={form.newPassword}
            onChange={(e) => setForm((c) => ({ ...c, newPassword: e.target.value }))}
            required
          />

          <PasswordInput
            label="Confirm new password"
            autoComplete="new-password"
            minLength={8}
            value={form.confirmPassword}
            onChange={(e) => setForm((c) => ({ ...c, confirmPassword: e.target.value }))}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-12 w-full cursor-pointer rounded-full bg-brand-secondary text-base font-medium text-white shadow-[0_8px_24px_rgba(0,74,92,0.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px] sm:self-center"
          >
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </div>
      </form>
    </div>
  )
}
