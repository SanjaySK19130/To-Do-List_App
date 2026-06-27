import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Toast Component
 * Displays self-dismissing toast alerts using Bootstrap 5 styling
 */
export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    // Auto close toast after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-success me-2" size={20} />;
      case 'danger':
        return <AlertTriangle className="text-danger me-2" size={20} />;
      default:
        return <Info className="text-info me-2" size={20} />;
    }
  };

  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'border-success bg-white text-dark shadow';
      case 'danger':
        return 'border-danger bg-white text-dark shadow';
      default:
        return 'border-info bg-white text-dark shadow';
    }
  };

  return (
    <div 
      className="position-fixed top-0 end-0 p-3" 
      style={{ zIndex: 1100, maxWidth: '380px', marginTop: '1rem' }}
      id="app-toast-container"
    >
      <div 
        className={`card border-start border-4 ${getAlertClass()} rounded-3`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="card-body py-3 px-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {getIcon()}
            <span className="fw-semibold fs-7 text-secondary-emphasis">{message}</span>
          </div>
          <button 
            id="close-toast-btn"
            type="button" 
            className="btn-close ms-3" 
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
