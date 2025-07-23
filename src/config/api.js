// API Configuration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_VERSION = import.meta.env.VITE_API_VERSION || '';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  VERSION: API_VERSION,
  ENDPOINTS: {
    // Authentication
    AUTH: {
      LOGIN: '/api/users/login',            // updated
      REGISTER: '/api/users/register',      // updated
      LOGOUT: '/api/users/logout',          // if implemented
      REFRESH: '/api/users/refresh',        // if implemented
      PROFILE: '/api/users/profile'         // updated
    },

    // Users
    USERS: {
      BASE: '/api/users',
      PROFILE: '/api/users/profile',
      UPDATE: '/api/users/update'
    },

    // Campaigns
    CAMPAIGNS: {
      BASE: '/api/campaigns',
      CREATE: '/api/campaigns/create',
      UPDATE: '/api/campaigns/update',
      DELETE: '/api/campaigns/delete',
      APPLY: '/api/campaigns/apply'
    },

    // Collaborations
    COLLABORATIONS: {
      BASE: '/api/collaborations',
      CREATE: '/api/collaborations/create',
      UPDATE: '/api/collaborations/update',
      STATUS: '/api/collaborations/status'
    },

    // Earnings
    EARNINGS: {
      BASE: '/api/earnings',
      PAYOUTS: '/api/earnings/payouts',
      WITHDRAW: '/api/earnings/withdraw'
    },

    // Dashboard
    DASHBOARD: {
      BRAND: '/api/dashboard/brand',
      INFLUENCER: '/api/dashboard/influencer',
      ANALYTICS: '/api/dashboard/analytics'
    },

    // Uploads
    UPLOADS: {
      BASE: '/api/uploads',
      PROFILE: '/api/uploads/profile',
      PORTFOLIO: '/api/uploads/portfolio'
    }
  }
};

// Create full URL
export const createApiUrl = (endpoint) => {
  const base = API_CONFIG.BASE_URL.replace(/\/+$/, '');
  const path = endpoint.replace(/^\/+/, '');
  return `${base}/${path}`;
};

// Request headers
export const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

// Multipart form headers for file uploads
export const getUploadHeaders = (token) => ({
  ...(token && { 'Authorization': `Bearer ${token}` })
  // Do not set Content-Type; let the browser set it for multipart/form-data
});
