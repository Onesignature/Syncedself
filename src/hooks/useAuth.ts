import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user');
      
      setAuthState({
        isAuthenticated: !!token,
        isLoading: false,
        user: user ? JSON.parse(user) : null
      });
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store auth data
    localStorage.setItem('auth_token', 'dummy_token');
    localStorage.setItem('user', JSON.stringify({ email }));
    
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
      user: { email }
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null
    });
  };

  return {
    ...authState,
    login,
    logout
  };
}