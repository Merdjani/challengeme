import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@challengeme:auth_token';
const USER_DATA_KEY = '@challengeme:user_data';

// Mock authentication service (replace with real API calls)
export const authService = {
  // Login
  async login(email, password) {
    // TODO: Replace with actual API call
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: '1',
            name: 'User',
            email: email,
            avatar: null,
          };
          const mockToken = 'mock_jwt_token_' + Date.now();
          resolve({ user: mockUser, token: mockToken });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Signup
  async signup(userData) {
    // TODO: Replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.name) {
          const mockUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            avatar: null,
          };
          const mockToken = 'mock_jwt_token_' + Date.now();
          resolve({ user: mockUser, token: mockToken });
        } else {
          reject(new Error('Missing required fields'));
        }
      }, 1000);
    });
  },

  // Forgot Password
  async forgotPassword(email) {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password reset email sent' });
      }, 1000);
    });
  },

  // Store auth data
  async storeAuthData(token, user) {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Error storing auth data:', error);
      return false;
    }
  },

  // Get stored auth data
  async getAuthData() {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      if (token && userData) {
        return { token, user: JSON.parse(userData) };
      }
      return null;
    } catch (error) {
      console.error('Error getting auth data:', error);
      return null;
    }
  },

  // Logout
  async logout() {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const authData = await this.getAuthData();
    return authData !== null;
  },
};

