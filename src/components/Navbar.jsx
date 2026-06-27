import React from 'react';
import { LogOut, CheckSquare, User } from 'lucide-react';

/**
 * Navbar Component using Bootstrap 5 classes
 */
export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3" id="app-navbar">
      <div className="container">
        {/* Brand Link */}
        <span className="navbar-brand d-flex align-items-center fw-bold fs-4 select-none">
          <CheckSquare className="text-primary me-2" size={28} />
          MERN Taskify
        </span>

        {/* User Info and Logout */}
        {user && (
          <div className="d-flex align-items-center ms-auto">
            <span className="text-light me-3 d-none d-sm-flex align-items-center">
              <User size={18} className="text-primary me-2" />
              <span>
                Welcome, <strong className="text-white">{user.fullName}</strong>
              </span>
            </span>
            <button
              id="logout-btn"
              onClick={onLogout}
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 px-3 transition-all"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
