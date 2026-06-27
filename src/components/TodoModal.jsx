import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';

/**
 * TodoModal Component
 * Serves as both Create and Edit form.
 * Works as a pure React modal utilizing Bootstrap 5 styles.
 */
export default function TodoModal({ isOpen, onClose, onSave, existingTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Sync state with existingTodo when opening for edit
  useEffect(() => {
    if (existingTodo) {
      setTitle(existingTodo.title);
      setDescription(existingTodo.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setError('');
  }, [existingTodo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Form Validation
    if (!title || !title.trim()) {
      setError('Task Title is required.');
      return;
    }

    if (title.trim().length < 3) {
      setError('Task Title must be at least 3 characters.');
      return;
    }

    onSave(title.trim(), description.trim());
  };

  return (
    <>
      {/* Modal Overlay */}
      <div 
        className="modal show d-block fade show" 
        tabIndex="-1" 
        role="dialog"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}
        id="todo-modal"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 shadow-lg rounded-4">
            {/* Modal Header */}
            <div className="modal-header bg-dark text-white rounded-top-4 border-0 py-3 px-4">
              <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                {existingTodo ? <Save size={20} className="text-primary" /> : <Plus size={20} className="text-success" />}
                {existingTodo ? 'Edit Task' : 'Create New Task'}
              </h5>
              <button
                id="close-modal-x"
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} id="todo-form">
              <div className="modal-body p-4">
                {/* Local validation alert */}
                {error && (
                  <div className="alert alert-danger py-2 d-flex align-items-center" role="alert" id="modal-validation-alert">
                    <small className="fw-semibold">{error}</small>
                  </div>
                )}

                {/* Title Input */}
                <div className="mb-3">
                  <label htmlFor="modal-todo-title" className="form-label fw-semibold text-secondary">
                    Task Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-todo-title"
                    className={`form-control ${error && !title.trim() ? 'is-invalid' : ''}`}
                    placeholder="e.g. Finish React Dashboard layout"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (error) setError('');
                    }}
                    autoFocus
                  />
                  <div className="form-text text-muted">
                    Give your task a clear, concise title.
                  </div>
                </div>

                {/* Description Input */}
                <div className="mb-3">
                  <label htmlFor="modal-todo-desc" className="form-label fw-semibold text-secondary">
                    Description
                  </label>
                  <textarea
                    id="modal-todo-desc"
                    className="form-control"
                    rows="4"
                    placeholder="What details are involved in this task?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer bg-light rounded-bottom-4 border-0 py-3 px-4">
                <button
                  id="cancel-modal-btn"
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  id="submit-modal-btn"
                  type="submit"
                  className={`btn ${existingTodo ? 'btn-primary' : 'btn-success'} px-4 py-2 d-flex align-items-center gap-2`}
                >
                  {existingTodo ? <Save size={16} /> : <Plus size={16} />}
                  <span>{existingTodo ? 'Save Changes' : 'Create Task'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
