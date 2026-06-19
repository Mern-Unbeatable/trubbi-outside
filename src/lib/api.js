const API_BASE = import.meta.env.VITE_API_URL || '/api'

export class ApiError extends Error {
  constructor(message, meta = {}) {
    super(message)
    this.name = 'ApiError'
    this.meta = meta
  }
}

async function request(path, options = {}) {
  const { credentials = 'include', ...fetchOptions } = options
  let response

  try {
    response = await fetch(`${API_BASE}${path}`, {
      credentials,
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })
  } catch {
    throw new ApiError('Unable to reach the server. Please check your connection and try again.')
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new ApiError(data.message || `Request failed (${response.status})`, {
      locked: data.locked,
      attemptsLeft: data.attemptsLeft,
      lockoutSeconds: data.lockoutSeconds,
    })
  }

  return data
}

export const api = {
  login: (body) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  logout: () => request('/auth/logout', { method: 'POST' }),

  getLoginStatus: (email) =>
    request(`/auth/login-status?email=${encodeURIComponent(email)}`, {
      credentials: 'omit',
    }),

  me: () => request('/auth/me'),

  changePassword: (body) =>
    request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  getUserCaptures: ({ page = 1, limit = 12, search = '' } = {}) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    const trimmed = search.trim()
    if (trimmed) params.set('search', trimmed)
    return request(`/admin/user-captures?${params}`)
  },

  getAnalytics: () => request('/admin/analytics'),

  captureUser: (body) =>
    request('/user-capture', {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'omit',
    }),
}
