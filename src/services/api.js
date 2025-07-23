import { API_CONFIG, createApiUrl, getAuthHeaders, getUploadHeaders } from '../config/api.js';

// Get token from localStorage
const getToken = () => localStorage.getItem('authToken');

// Set token to localStorage
const setToken = (token) => localStorage.setItem('authToken', token);

// Remove token from localStorage
const removeToken = () => localStorage.removeItem('authToken');

// Base API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = createApiUrl(endpoint);
  const token = getToken();
  
  const config = {
    headers: getAuthHeaders(token),
    ...options,
    headers: {
      ...getAuthHeaders(token),
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    
    // Handle different response types
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
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
  // Authentication
  auth: {
    login: async (credentials) => {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      
      if (response.token) {
        setToken(response.token);
      }
      
      return response;
    },

    register: async (userData) => {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      
      if (response.token) {
        setToken(response.token);
      }
      
      return response;
    },

    logout: async () => {
      try {
        await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
          method: 'POST'
        });
      } finally {
        removeToken();
      }
    },

    getProfile: async () => {
      return await apiRequest(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    }
  },

  // Users
  users: {
    getProfile: async () => {
      return await apiRequest(API_CONFIG.ENDPOINTS.USERS.PROFILE);
    },

    updateProfile: async (profileData) => {
      return await apiRequest(API_CONFIG.ENDPOINTS.USERS.UPDATE, {
        method: 'PUT',
        body: JSON.stringify(profileData)
      });
    }
  },

  // Campaigns
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
        body: JSON.stringify(campaignData)
      });
    },

    update: async (id, campaignData) => {
      return await apiRequest(`${API_CONFIG.ENDPOINTS.CAMPAIGNS.UPDATE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(campaignData)
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
        body: JSON.stringify(applicationData)
      });
    }
  },

  // Collaborations
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
        body: JSON.stringify({ status })
      });
    }
  },

  // Earnings
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
        body: JSON.stringify(withdrawalData)
      });
    }
  },

  // Dashboard
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

  // Uploads
  uploads: {
    uploadProfile: async (file) => {
      const formData = new FormData();
      formData.append('profile', file);
      
      const token = getToken();
      return await apiRequest(API_CONFIG.ENDPOINTS.UPLOADS.PROFILE, {
        method: 'POST',
        headers: getUploadHeaders(token),
        body: formData
      });
    },

    uploadPortfolio: async (files) => {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('portfolio', file);
      });
      
      const token = getToken();
      return await apiRequest(API_CONFIG.ENDPOINTS.UPLOADS.PORTFOLIO, {
        method: 'POST',
        headers: getUploadHeaders(token),
        body: formData
      });
    }
  }
};

export { getToken, removeToken, setToken };
