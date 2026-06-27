import React from 'react';
import { CheckSquare } from 'lucide-react';

/**
 * Layout for Authentication Pages (Login / Register)
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column align-items-center justify-content-center py-5 px-3" id="auth-layout">
      <div className="text-center mb-4 select-none">
        <div className="d-inline-flex align-items-center justify-content-center bg-dark text-white p-3 rounded-circle shadow mb-3">
          <CheckSquare size={36} className="text-primary animate-bounce" />
        </div>
        <h2 className="fw-bold text-dark">MERN Taskify</h2>
        <p className="text-muted small">Beginner-friendly MERN stack To-Do portfolio project</p>
      </div>
      
      <div className="w-full" style={{ maxWidth: '440px' }}>
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          {children}
        </div>
      </div>
      
      <footer className="text-center mt-4 text-muted small">
        &copy; {new Date().getFullYear()} MERN Taskify. Built with Bootstrap 5.
      </footer>
    </div>
  );
}
