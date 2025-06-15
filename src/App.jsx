import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppProvider } from './context/AppContext'

// Auth Components
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Unauthorized from './components/auth/Unauthorized'

// Feature Components
import Dashboard from './components/features/Dashboard/Dashboard'
import Applications from './components/features/Applications/Applications'
import Students from './components/features/Students/Students'
import Universities from './components/features/Universities/Universities'
import Payments from './components/features/Payments/Payments'
import Reports from './components/features/Reports/Reports'
import Settings from './components/features/Settings/Settings'

// Layout Components
import Layout from './components/layout/Layout'

// Context
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="students" element={<Students />} />
            <Route path="universities" element={<Universities />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AppProvider>
    </AuthProvider>
  )
}

export default App 