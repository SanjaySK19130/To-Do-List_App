import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Components
import Toast from './components/Toast';

// Hooks
import useAuth from './hooks/useAuth';
import useTodos from './hooks/useTodos';

// Import CSS Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

/**
 * Main App Component
 * Handles Global States, Routing, and Toast Alerts
 */
export default function App() {
  const auth = useAuth();
  const todos = useTodos(auth.user?.id);

  // Toast State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Display a toast notification
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleClearToast = () => {
    setToast({ message: '', type: 'success' });
  };

  if (auth.loading) {
    return (
      <div className="min-vh-100 bg-light d-flex flex-column align-items-center justify-content-center" id="app-loading-screen">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="mt-3 fw-bold text-dark">Initializing Taskify Workspace...</h5>
        <p className="text-muted small">Preparing To-Do assets</p>
      </div>
    );
  }

  return (
    <HashRouter>
      {/* Toast Overlay */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={handleClearToast}
      />

      <Routes>
        {/* Authentication Routes */}
        <Route
          path="/login"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <Login onLogin={auth.login} triggerToast={triggerToast} />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <Register onRegister={auth.register} triggerToast={triggerToast} />
              </AuthLayout>
            )
          }
        />

        {/* Dashboard Work Area Route (Protected) */}
        <Route
          path="/dashboard"
          element={
            auth.isAuthenticated ? (
              <DashboardLayout user={auth.user} onLogout={auth.logout}>
                <Dashboard
                  todosHook={todos}
                  user={auth.user}
                  triggerToast={triggerToast}
                />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch All Redirection */}
        <Route
          path="*"
          element={<Navigate to={auth.isAuthenticated ? '/dashboard' : '/login'} replace />}
        />
      </Routes>
    </HashRouter>
  );
}
