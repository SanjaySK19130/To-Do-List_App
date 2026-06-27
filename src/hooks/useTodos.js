import { useState, useEffect, useCallback, useMemo } from 'react';
import todoService from '../services/todoService';

/**
 * Custom Hook for managing To-Do items
 * Segmented by user and supports searching, filtering, and sorting.
 */
export default function useTodos(userId) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Completed', 'Pending'

  // Fetch todos from local storage
  const fetchTodos = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await todoService.getTodos(userId);
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create a new todo
  const createTodo = async (title, description) => {
    if (!userId) return;
    setError(null);
    try {
      const newTodo = await todoService.createTodo(userId, title, description);
      setTodos((prev) => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError('Failed to create task.');
      throw err;
    }
  };

  // Update a todo
  const updateTodo = async (todoId, title, description) => {
    setError(null);
    try {
      const updatedTodo = await todoService.updateTodo(todoId, title, description);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === todoId ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      setError('Failed to update task.');
      throw err;
    }
  };

  // Toggle todo status (Completed / Pending)
  const toggleTodoStatus = async (todoId) => {
    setError(null);
    try {
      const updatedTodo = await todoService.toggleTodoStatus(todoId);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === todoId ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      setError('Failed to update task status.');
      throw err;
    }
  };

  // Delete a todo
  const deleteTodo = async (todoId) => {
    setError(null);
    try {
      await todoService.deleteTodo(todoId);
      setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
    } catch (err) {
      setError('Failed to delete task.');
      throw err;
    }
  };

  // Process todos: search filter, status filter, and sort by Newest First
  const processedTodos = useMemo(() => {
    let result = [...todos];

    // 1. Status Filter
    if (statusFilter === 'Completed') {
      result = result.filter((todo) => todo.status === 'Completed');
    } else if (statusFilter === 'Pending') {
      result = result.filter((todo) => todo.status === 'Pending');
    }

    // 2. Search Query (Title or Description match)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query)
      );
    }

    // 3. Sort by Newest First (using createdAt ISO String)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [todos, searchQuery, statusFilter]);

  // Statistics for Dashboard
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.status === 'Completed').length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [todos]);

  return {
    todos: processedTodos,
    allTodosRaw: todos,
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
    refresh: fetchTodos
  };
}
