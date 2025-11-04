import { API_CONFIG, createApiUrl, getAuthHeaders, getUploadHeaders } from '../config/api.js';

// Token utilities
const getToken = () => localStorage.getItem('authToken');
const setToken = (token) => localStorage.setItem('authToken', token);
const removeToken = () => localStorage.removeItem('authToken');

// Base API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = createApiUrl(endpoint);
  const token = getToken();

  const { method = 'GET', body, headers = {} } = options;

  // Determine headers:
  let finalHeaders = headers;
  let finalBody = body;

  if (!(body instanceof FormData)) {
    // JSON request
    finalHeaders = { ...getAuthHeaders(token), ...headers };
    if (body && typeof body === 'object') {
      finalBody = JSON.stringify(body);
    }
  } else {
    // FormData request
    finalHeaders = { ...getUploadHeaders(token), ...headers };
    // Let browser set Content-Type for FormData
  }

  try {
    const response = await fetch(url, {
      method,
      body: finalBody,
      headers: finalHeaders
    });

    const contentType = response.headers.get('content-type') || '';

    if (!response.ok) {
      let errorData = {};
      if (contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        // If not JSON, try to get text
        const text = await response.text();
        errorData = { message: text || `HTTP error! status: ${response.status}` };
      }
      
      // Create error object with response data
      const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
      error.response = {
        status: response.status,
        data: errorData
      };
      throw error;
    }

    if (contentType.includes('application/json')) {
      return await response.json();
    }
    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// API Service Object
export const apiService = {
  // ========================
  // Authentication
  // ========================
  auth: {
    login: async (credentials) => {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: credentials
      });
      if (response.token) setToken(response.token);
      return response;
    },

    register: async (userData) => {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: userData
      });
      if (response.token) setToken(response.token);
      return response;
    },

    logout: async () => {
        removeToken();
      
    },

    getProfile: async () => {
      return await apiRequest(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    },
    
    updatePassword: async (passwordData) => {
      return await apiRequest('/api/users/update-password', {
        method: 'PUT',
        body: passwordData
      });
    },
    
    deleteAccount: async () => {
      return await apiRequest('/api/users/delete-account', {
        method: 'DELETE'
      });
    }
  },

  // ========================
  // Users
  // ========================
  users: {
    getProfile: async () => {
      return await apiRequest(API_CONFIG.ENDPOINTS.USERS.PROFILE);
    },
    updateProfile: async (profileData) => {
      return await apiRequest(API_CONFIG.ENDPOINTS.USERS.UPDATE, {
        method: 'PUT',
        body: profileData
      });
    }
  },

  // ========================
  // Campaigns
  // ========================
  campaigns: {
    getAll: async (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = queryParams
        ? `${API_CONFIG.ENDPOINTS.CAMPAIGNS.BASE}?${queryParams}`
        : API_CONFIG.ENDPOINTS.CAMPAIGNS.BASE;
      return await apiRequest(endpoint);
    },

    getById: async (id) => {
      return await apiRequest(`${API_CONFIG.ENDPOINTS.CAMPAIGNS.BASE}/${id}`);
    },

    create: async (campaignData) => {
      return await apiRequest(API_CONFIG.ENDPOINTS.CAMPAIGNS.CREATE, {
        method: 'POST',
        body: campaignData
      });
    },

    update: async (id, campaignData) => {
      return await apiRequest(`${API_CONFIG.ENDPOINTS.CAMPAIGNS.UPDATE}/${id}`, {
        method: 'PUT',
        body: campaignData
      });
    },

    delete: async (id) => {
      return await apiRequest(`${API_CONFIG.ENDPOINTS.CAMPAIGNS.DELETE}/${id}`, {
        method: 'DELETE'
      });
    },

    apply: async (campaignId, applicationData) => {
      return await apiRequest(`${API_CONFIG.ENDPOINTS.CAMPAIGNS.APPLY}/${campaignId}`, {
        method: 'POST',
        body: applicationData
      });
    }
  },

  // ========================
  // Collaborations
  // ========================
  collaborations: {
    getAll: async (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = queryParams
        ? `${API_CONFIG.ENDPOINTS.COLLABORATIONS.BASE}?${queryParams}`
        : API_CONFIG.ENDPOINTS.COLLABORATIONS.BASE;
      return await apiRequest(endpoint);
    },

    updateStatus: async (id, status) => {
      return await apiRequest(`${API_CONFIG.ENDPOINTS.COLLABORATIONS.STATUS}/${id}`, {
        method: 'PUT',
        body: { status }
      });
    }
  },

  // ========================
  // Earnings
  // ========================
  earnings: {
    getEarnings: async () => {
      return await apiRequest(API_CONFIG.ENDPOINTS.EARNINGS.BASE);
    },
    getPayouts: async () => {
      return await apiRequest(API_CONFIG.ENDPOINTS.EARNINGS.PAYOUTS);
    },
    requestWithdrawal: async (withdrawalData) => {
      return await apiRequest(API_CONFIG.ENDPOINTS.EARNINGS.WITHDRAW, {
        method: 'POST',
        body: withdrawalData
      });
    }
  },

  // ========================
  // Dashboard
  // ========================
  dashboard: {
    getBrandDashboard: async () => {
      return await apiRequest(API_CONFIG.ENDPOINTS.DASHBOARD.BRAND);
    },
    getInfluencerDashboard: async () => {
      return await apiRequest(API_CONFIG.ENDPOINTS.DASHBOARD.INFLUENCER);
    },
    getAnalytics: async (filters = {}) => {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = queryParams
        ? `${API_CONFIG.ENDPOINTS.DASHBOARD.ANALYTICS}?${queryParams}`
        : API_CONFIG.ENDPOINTS.DASHBOARD.ANALYTICS;
      return await apiRequest(endpoint);
    }
  },

  // ========================
  // Notifications
  // ========================
  notifications: {
    getAll: async () => {
      return await apiRequest('/api/notifications');
    },
    
    markAsRead: async (id) => {
      return await apiRequest(`/api/notifications/${id}/read`, {
        method: 'PUT'
      });
    },
    
    markAllAsRead: async () => {
      return await apiRequest('/api/notifications/read-all', {
        method: 'PUT'
      });
    },
    
    delete: async (id) => {
      return await apiRequest(`/api/notifications/${id}`, {
        method: 'DELETE'
      });
    }
  },

  // ========================
  // Uploads
  // ========================
  uploads: {
    uploadProfile: async (file) => {
      const formData = new FormData();
      formData.append('profile', file);

      return await apiRequest(API_CONFIG.ENDPOINTS.UPLOADS.PROFILE, {
        method: 'POST',
        body: formData
      });
    },

    uploadPortfolio: async (files) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('portfolio', file);
      });

      return await apiRequest(API_CONFIG.ENDPOINTS.UPLOADS.PORTFOLIO, {
        method: 'POST',
        body: formData
      });
    }
  }
};

// Expose token utilities for AuthContext
export { getToken, removeToken, setToken };