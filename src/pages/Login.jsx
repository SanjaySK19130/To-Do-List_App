import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { validateLogin } from '../utils/validators';

/**
 * Login Page Component
 */
export default function Login({ onLogin, triggerToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    // Form Validation
    const validation = validateLogin(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onLogin(email, password);
      triggerToast('Logged in successfully! Welcome back.', 'success');
      navigate('/dashboard');
    } catch (err) {
      setGeneralError(err.message || 'Invalid email or password.');
      triggerToast(err.message || 'Login failed.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="login-page">
      <h3 className="text-center fw-bold text-dark mb-4">Account Login</h3>

      {/* Error Alert Box */}
      {generalError && (
        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert" id="login-alert">
          <small className="fw-semibold">{generalError}</small>
        </div>
      )}

      <form onSubmit={handleSubmit} id="login-form">
        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label small fw-bold text-secondary">
            Email Address
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0">
              <Mail size={16} />
            </span>
            <input
              type="email"
              id="login-email"
              className={`form-control border-start-0 ps-0 ${errors.email ? 'is-invalid' : ''}`}
              placeholder="e.g. email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
              disabled={isSubmitting}
            />
            {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="login-password" className="form-label small fw-bold text-secondary">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0">
              <Lock size={16} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="login-password"
              className={`form-control border-start-0 border-end-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              disabled={isSubmitting}
            />
            <button
              id="toggle-show-pwd"
              type="button"
              className="input-group-text bg-light text-muted border-start-0 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSubmitting}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="login-submit-btn"
          type="submit"
          className="btn btn-primary w-full py-2 mb-3 fw-bold d-flex align-items-center justify-content-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <LogIn size={18} />
              <span>Sign In</span>
            </>
          )}
        </button>

        {/* Link to Register */}
        <div className="text-center text-muted small mt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary fw-semibold text-decoration-none" id="to-register-link">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}
