interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null);
  const token = useState<string | null>('auth-token', () => null);

  const isAuthenticated = computed(() => !!token.value);

  const setAuth = (newUser: User, newToken: string) => {
    user.value = newUser;
    token.value = newToken;
    
    if (import.meta.client) {
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', newToken);
    }
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;
    
    if (import.meta.client) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  const loadAuth = () => {
    if (import.meta.client) {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        user.value = JSON.parse(storedUser);
        token.value = storedToken;
      }
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    clearAuth,
    loadAuth,
  };
};
