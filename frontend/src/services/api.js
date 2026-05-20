import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Request interceptor to add the access token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rentlink_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration (optional, but good practice)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('rentlink_refresh_token');
        if (refreshToken) {
          const res = await axios.post('http://localhost:5001/api/auth/refresh-token', { refreshToken });
          if (res.data.success) {
            localStorage.setItem('rentlink_access_token', res.data.data.accessToken);
            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
            return api(originalRequest);
          }
        }
      } catch (err) {
        // Refresh token failed, clear storage and let AuthContext handle logout if needed
        localStorage.removeItem('rentlink_access_token');
        localStorage.removeItem('rentlink_refresh_token');
        localStorage.removeItem('rentlink_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
