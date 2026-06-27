/**
 * Authentication Service
 * Simulates API calls using LocalStorage to store users and session data.
 * Ready to be connected to a real Node.js/Express JWT-based backend.
 */

// Helper to simulate network latency for API-like behavior
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  /**
   * Registers a new user and stores them in localStorage.
   */
  register: async (fullName, email, password) => {
    await delay(500); // Simulate network latency

    const users = JSON.parse(localStorage.getItem('todo_users') || '[]');

    // Check if user already exists
    const userExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      throw new Error('Email is already registered. Please login.');
    }

    // Create new user object
    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      fullName,
      email: email.toLowerCase(),
      password, // In a real backend, this would be hashed on the server
      createdAt: new Date().toISOString()
    };

    // Save to users collection
    users.push(newUser);
    localStorage.setItem('todo_users', JSON.stringify(users));

    return {
      success: true,
      message: 'Registration successful! Please login.'
    };
  },

  /**
   * Authenticates a user and sets up the active session.
   */
  login: async (email, password) => {
    await delay(500); // Simulate network latency

    const users = JSON.parse(localStorage.getItem('todo_users') || '[]');

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    // Generate a mock JWT token
    const token = 'mock-jwt-token-xyz-' + user.id;

    // Set session in local storage
    localStorage.setItem('todo_token', token);
    localStorage.setItem(
      'todo_current_user',
      JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        email: user.email
      })
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    };
  },

  /**
   * Logs out the user by clearing the session from localStorage.
   */
  logout: async () => {
    await delay(200);
    localStorage.removeItem('todo_token');
    localStorage.removeItem('todo_current_user');
    return { success: true };
  },

  /**
   * Gets the currently authenticated user from local storage.
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('todo_current_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Checks if user is authenticated (token exists).
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('todo_token');
  }
};

export default authService;
