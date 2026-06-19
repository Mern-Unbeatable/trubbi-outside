import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/ui/Toast'
import LandingPage from './pages/landing/LandingPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import UserCapturePage from './pages/admin/UserCapturePage'
import AnalyticsPage from './pages/admin/AnalyticsPage'
import ProfilePage from './pages/admin/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminLayout />}>
                <Route index element={<Navigate to="user-capture" replace />} />
                <Route path="user-capture" element={<UserCapturePage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
