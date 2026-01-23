export const useApi = () => {
  const config = useRuntimeConfig();
  const { token } = useAuth();

  const baseUrl = config.public.apiBaseUrl;

  const request = async <T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      requiresAuth?: boolean;
    } = {}
  ): Promise<T> => {
    const { method = 'GET', body, requiresAuth = false } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth && token.value) {
      headers['Authorization'] = `Bearer ${token.value}`;
    }

    const response = await $fetch<T>(`${baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? body : undefined,
    });

    return response;
  };

  return {
    get: <T>(endpoint: string, requiresAuth = false) =>
      request<T>(endpoint, { method: 'GET', requiresAuth }),
    
    post: <T>(endpoint: string, body: any, requiresAuth = false) =>
      request<T>(endpoint, { method: 'POST', body, requiresAuth }),
    
    put: <T>(endpoint: string, body: any, requiresAuth = false) =>
      request<T>(endpoint, { method: 'PUT', body, requiresAuth }),
    
    delete: <T>(endpoint: string, requiresAuth = false) =>
      request<T>(endpoint, { method: 'DELETE', requiresAuth }),
  };
};
