/**
 * Todo Service
 * Simulates CRUD operations for tasks using LocalStorage.
 * Keeps tasks segmented by userId to support multiple users.
 * Async design makes it easy to replace with Axios/Fetch API calls later.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const todoService = {
  /**
   * Fetches all tasks for a specific user.
   */
  getTodos: async (userId) => {
    await delay(300); // Simulate network latency
    const allTodos = JSON.parse(localStorage.getItem('todo_tasks') || '[]');
    // Filter tasks belonging to the current user
    return allTodos.filter((todo) => todo.userId === userId);
  },

  /**
   * Creates a new task for a user.
   */
  createTodo: async (userId, title, description) => {
    await delay(300);
    const allTodos = JSON.parse(localStorage.getItem('todo_tasks') || '[]');

    const newTodo = {
      id: 'task_' + Math.random().toString(36).substr(2, 9),
      userId,
      title,
      description,
      status: 'Pending', // Defaults to 'Pending'
      createdAt: new Date().toISOString()
    };

    allTodos.push(newTodo);
    localStorage.setItem('todo_tasks', JSON.stringify(allTodos));
    return newTodo;
  },

  /**
   * Updates an existing task's title and description.
   */
  updateTodo: async (todoId, title, description) => {
    await delay(300);
    const allTodos = JSON.parse(localStorage.getItem('todo_tasks') || '[]');
    
    const index = allTodos.findIndex((t) => t.id === todoId);
    if (index === -1) {
      throw new Error('Task not found.');
    }

    allTodos[index] = {
      ...allTodos[index],
      title,
      description
    };

    localStorage.setItem('todo_tasks', JSON.stringify(allTodos));
    return allTodos[index];
  },

  /**
   * Toggles the status of a task (Pending <=> Completed).
   */
  toggleTodoStatus: async (todoId) => {
    await delay(200);
    const allTodos = JSON.parse(localStorage.getItem('todo_tasks') || '[]');
    
    const index = allTodos.findIndex((t) => t.id === todoId);
    if (index === -1) {
      throw new Error('Task not found.');
    }

    const currentStatus = allTodos[index].status;
    allTodos[index] = {
      ...allTodos[index],
      status: currentStatus === 'Completed' ? 'Pending' : 'Completed'
    };

    localStorage.setItem('todo_tasks', JSON.stringify(allTodos));
    return allTodos[index];
  },

  /**
   * Deletes a task from storage.
   */
  deleteTodo: async (todoId) => {
    await delay(200);
    const allTodos = JSON.parse(localStorage.getItem('todo_tasks') || '[]');
    
    const filteredTodos = allTodos.filter((t) => t.id !== todoId);
    localStorage.setItem('todo_tasks', JSON.stringify(filteredTodos));
    return { success: true };
  }
};

export default todoService;
