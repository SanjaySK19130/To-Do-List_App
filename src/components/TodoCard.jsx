import React from 'react';
import { Calendar, Check, RotateCcw, Edit3, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';

/**
 * TodoCard Component
 * Displays task information and handles user operations (edit, delete, toggle status)
 */
export default function TodoCard({ todo, onToggleStatus, onEdit, onDelete }) {
  const isCompleted = todo.status === 'Completed';

  return (
    <div 
      className={`card h-100 shadow-sm border-0 transition-all ${
        isCompleted ? 'bg-light border-start border-success border-4' : 'border-start border-warning border-4'
      }`}
      id={`todo-card-${todo.id}`}
    >
      <div className="card-body d-flex flex-column justify-content-between p-4">
        {/* Content Section */}
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 
              className={`card-title fw-bold mb-0 text-truncate-2 ${
                isCompleted ? 'text-muted text-decoration-line-through' : 'text-dark'
              }`}
              title={todo.title}
            >
              {todo.title}
            </h5>
            
            {/* Status Badge */}
            <span 
              className={`badge rounded-pill ${
                isCompleted ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-warning-subtle text-warning border border-warning-subtle'
              } px-3 py-2 fs-7 fw-semibold`}
            >
              {todo.status}
            </span>
          </div>

          <p 
            className={`card-text text-secondary mb-4 text-break ${
              isCompleted ? 'text-muted text-decoration-line-through opacity-75' : ''
            }`}
            style={{ 
              whiteSpace: 'pre-line',
              fontSize: '0.925rem',
              lineHeight: '1.5'
            }}
          >
            {todo.description || <em className="text-muted">No description provided.</em>}
          </p>
        </div>

        {/* Footer & Actions Section */}
        <div className="border-top pt-3 mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            {/* Date info */}
            <div className="text-muted d-flex align-items-center gap-1 fs-7">
              <Calendar size={14} />
              <span>{formatDate(todo.createdAt)}</span>
            </div>

            {/* Action buttons */}
            <div className="d-flex gap-2">
              {/* Toggle Status Button */}
              <button
                id={`toggle-status-${todo.id}`}
                onClick={() => onToggleStatus(todo.id)}
                className={`btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-circle ${
                  isCompleted 
                    ? 'btn-outline-secondary' 
                    : 'btn-success text-white'
                }`}
                title={isCompleted ? 'Mark Pending' : 'Mark Complete'}
              >
                {isCompleted ? <RotateCcw size={16} /> : <Check size={16} />}
              </button>

              {/* Edit Button */}
              <button
                id={`edit-todo-${todo.id}`}
                onClick={() => onEdit(todo)}
                className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center p-2 rounded-circle"
                title="Edit Task"
              >
                <Edit3 size={16} />
              </button>

              {/* Delete Button */}
              <button
                id={`delete-todo-${todo.id}`}
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    onDelete(todo.id);
                  }
                }}
                className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-2 rounded-circle"
                title="Delete Task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
