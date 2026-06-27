import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ListTodo, 
  CheckCircle2, 
  Clock, 
  Inbox, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import TodoCard from '../components/TodoCard';
import TodoModal from '../components/TodoModal';

/**
 * Dashboard Page Component
 */
export default function Dashboard({ todosHook, user, triggerToast }) {
  const {
    todos,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    createTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    stats,
    refresh
  } = todosHook;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isServiceLoading, setIsServiceLoading] = useState(false);

  // Open modal for Create Task
  const handleOpenCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  // Open modal for Edit Task
  const handleOpenEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  // Handle Save (Create or Update) inside modal
  const handleSaveTask = async (title, description) => {
    setIsServiceLoading(true);
    setIsModalOpen(false); // Close modal immediately for smooth UX
    
    try {
      if (editingTodo) {
        await updateTodo(editingTodo.id, title, description);
        triggerToast('Task updated successfully!', 'success');
      } else {
        await createTodo(title, description);
        triggerToast('New task created successfully!', 'success');
      }
    } catch (err) {
      triggerToast('Failed to save task. Please try again.', 'danger');
    } finally {
      setIsServiceLoading(false);
      setEditingTodo(null);
    }
  };

  // Handle toggle task status
  const handleToggleStatus = async (todoId) => {
    try {
      await toggleTodoStatus(todoId);
      triggerToast('Task status updated!', 'success');
    } catch (err) {
      triggerToast('Failed to update status.', 'danger');
    }
  };

  // Handle delete task
  const handleDeleteTask = async (todoId) => {
    try {
      await deleteTodo(todoId);
      triggerToast('Task deleted successfully.', 'success');
    } catch (err) {
      triggerToast('Failed to delete task.', 'danger');
    }
  };

  return (
    <div id="dashboard-page">
      {/* Welcome & Action Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
          <h2 className="fw-black text-dark mb-1 select-none">
            Dashboard Workspace
          </h2>
          <p className="text-muted mb-0">
            Welcome back, <strong className="text-primary">{user?.fullName}</strong>. Manage and filter your tasks below.
          </p>
        </div>
        <button
          id="create-task-btn"
          onClick={handleOpenCreateModal}
          className="btn btn-success px-4 py-2-5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm transition-all text-white"
        >
          <Plus size={20} />
          <span>Create New Task</span>
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="row g-4 mb-5" id="stats-section">
        {/* Total Tasks Card */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center">
              <div className="p-3 bg-primary-subtle text-primary rounded-3 me-3">
                <ListTodo size={28} />
              </div>
              <div>
                <h6 className="text-secondary small fw-bold text-uppercase mb-1 tracking-wider">Total Tasks</h6>
                <h3 className="fw-black text-dark mb-0 fs-1" id="stat-total-count">{stats.total}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center">
              <div className="p-3 bg-success-subtle text-success rounded-3 me-3">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h6 className="text-secondary small fw-bold text-uppercase mb-1 tracking-wider">Completed</h6>
                <h3 className="fw-black text-dark mb-0 fs-1" id="stat-completed-count">{stats.completed}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center">
              <div className="p-3 bg-warning-subtle text-warning rounded-3 me-3">
                <Clock size={28} />
              </div>
              <div>
                <h6 className="text-secondary small fw-bold text-uppercase mb-1 tracking-wider">Pending</h6>
                <h3 className="fw-black text-dark mb-0 fs-1" id="stat-pending-count">{stats.pending}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white" id="filter-bar-card">
        <div className="row g-3 align-items-center">
          {/* Search Field */}
          <div className="col-12 col-lg-5">
            <div className="input-group">
              <span className="input-group-text bg-light text-muted border-end-0">
                <Search size={18} />
              </span>
              <input
                type="text"
                id="search-input"
                className="form-control border-start-0 ps-0"
                placeholder="Search tasks by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Status Filters */}
          <div className="col-12 col-lg-7 d-flex justify-content-lg-end gap-2 flex-wrap">
            <span className="align-self-center text-muted small me-2 d-none d-sm-inline">Filter:</span>
            
            <button
              id="filter-all-btn"
              onClick={() => setStatusFilter('All')}
              className={`btn px-3 py-2 rounded-3 fw-semibold small ${
                statusFilter === 'All'
                  ? 'btn-dark text-white'
                  : 'btn-outline-secondary bg-white'
              }`}
            >
              All Tasks
            </button>
            
            <button
              id="filter-completed-btn"
              onClick={() => setStatusFilter('Completed')}
              className={`btn px-3 py-2 rounded-3 fw-semibold small ${
                statusFilter === 'Completed'
                  ? 'btn-success text-white'
                  : 'btn-outline-success bg-white'
              }`}
            >
              Completed ({todos.filter(t => t.status === 'Completed').length})
            </button>

            <button
              id="filter-pending-btn"
              onClick={() => setStatusFilter('Pending')}
              className={`btn px-3 py-2 rounded-3 fw-semibold small ${
                statusFilter === 'Pending'
                  ? 'btn-warning text-dark border-warning'
                  : 'btn-outline-warning bg-white'
              }`}
            >
              Pending ({todos.filter(t => t.status === 'Pending').length})
            </button>

            {/* Sync Refresh Button */}
            <button
              id="refresh-btn"
              onClick={refresh}
              className="btn btn-outline-secondary p-2 rounded-3"
              title="Refresh Task Database"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Task List Grid */}
      <div id="todo-list-container">
        {loading || isServiceLoading ? (
          /* Loading State Spinner */
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-3">Updating task repository...</p>
          </div>
        ) : error ? (
          /* Error State alert */
          <div className="alert alert-danger text-center p-5 rounded-4" role="alert" id="dashboard-error-alert">
            <h4 className="alert-heading fw-bold mb-2">Error!</h4>
            <p className="mb-0">{error}</p>
          </div>
        ) : todos.length === 0 ? (
          /* Empty State Display */
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white" id="empty-state">
            <div className="py-4">
              <div className="d-inline-flex p-4 bg-light rounded-circle text-muted mb-4">
                <Inbox size={48} className="opacity-50" />
              </div>
              <h4 className="fw-bold text-dark mb-2">No tasks found</h4>
              <p className="text-muted max-w-md mx-auto mb-4" style={{ maxWidth: '400px' }}>
                {searchQuery || statusFilter !== 'All'
                  ? "We couldn't find any tasks matching your current search filters. Try clearing some filters or search query."
                  : "You haven't registered any tasks yet! Kickstart your productivity by creating your very first task above."}
              </p>
              
              {(searchQuery || statusFilter !== 'All') && (
                <button
                  id="reset-filters-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All');
                  }}
                  className="btn btn-outline-primary rounded-3"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Responsive Task Cards Grid */
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="todos-grid">
            {todos.map((todo) => (
              <div className="col animate-fade-in" key={todo.id}>
                <TodoCard
                  todo={todo}
                  onToggleStatus={handleToggleStatus}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Creation & Editing Modal */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        existingTodo={editingTodo}
      />
    </div>
  );
}
