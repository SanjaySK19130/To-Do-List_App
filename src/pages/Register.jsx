import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { validateRegister } from '../utils/validators';

/**
 * Register Page Component
 */
export default function Register({ onRegister, triggerToast }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    const validation = validateRegister(fullName, email, password, confirmPassword);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onRegister(fullName, email, password);
      triggerToast('Registration successful! Please login to continue.', 'success');
      navigate('/login');
    } catch (err) {
      setGeneralError(err.message || 'Registration failed. Try again.');
      triggerToast(err.message || 'Registration failed.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="register-page">
      <h3 className="text-center fw-bold text-dark mb-4">Create Account</h3>

      {/* General Error Alert Box */}
      {generalError && (
        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert" id="register-alert">
          <small className="fw-semibold">{generalError}</small>
        </div>
      )}

      <form onSubmit={handleSubmit} id="register-form">
        {/* Full Name Field */}
        <div className="mb-3">
          <label htmlFor="reg-name" className="form-label small fw-bold text-secondary">
            Full Name
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0">
              <User size={16} />
            </span>
            <input
              type="text"
              id="reg-name"
              className={`form-control border-start-0 ps-0 ${errors.fullName ? 'is-invalid' : ''}`}
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
              }}
              disabled={isSubmitting}
            />
            {errors.fullName && <div className="invalid-feedback d-block">{errors.fullName}</div>}
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="reg-email" className="form-label small fw-bold text-secondary">
            Email Address
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0">
              <Mail size={16} />
            </span>
            <input
              type="email"
              id="reg-email"
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
        <div className="mb-3">
          <label htmlFor="reg-password" className="form-label small fw-bold text-secondary">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0">
              <Lock size={16} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="reg-password"
              className={`form-control border-start-0 border-end-0 ps-0 ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              disabled={isSubmitting}
            />
            <button
              id="reg-toggle-pwd"
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

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label htmlFor="reg-confirm-password" className="form-label small fw-bold text-secondary">
            Confirm Password
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light text-muted border-end-0">
              <Lock size={16} />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="reg-confirm-password"
              className={`form-control border-start-0 ps-0 ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: null }));
              }}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="reg-submit-btn"
          type="submit"
          className="btn btn-primary w-full py-2 mb-3 fw-bold d-flex align-items-center justify-content-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <UserPlus size={18} />
              <span>Sign Up</span>
            </>
          )}
        </button>

        {/* Link to Login */}
        <div className="text-center text-muted small mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-primary fw-semibold text-decoration-none" id="to-login-link">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}
