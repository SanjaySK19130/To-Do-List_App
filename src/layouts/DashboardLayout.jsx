import React from 'react';
import Navbar from '../components/Navbar';

/**
 * Layout for Dashboard pages
 */
export default function DashboardLayout({ user, onLogout, children }) {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column" id="dashboard-layout">
      {/* App Navigation */}
      <Navbar user={user} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-grow-1 py-4 py-md-5">
        <div className="container">{children}</div>
      </main>

      {/* App Footer */}
      <footer className="bg-dark text-white-50 text-center py-3 border-top border-secondary mt-auto">
        <div className="container">
          <small>&copy; {new Date().getFullYear()} MERN Taskify. Designed for MERN Stack portfolios.</small>
        </div>
      </footer>
    </div>
  );
}
