// API Configuration for Influencexrn Frontend

// Base URL and Version from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_VERSION = import.meta.env.VITE_API_VERSION || ''; // e.g., '/v1'

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  VERSION: API_VERSION,

  ENDPOINTS: {
    // ==============================
    // Authentication
    // ==============================
    AUTH: {
      LOGIN: '/api/users/login',
      REGISTER: '/api/users/register',
      LOGOUT: '/api/users/logout',       // if implemented
      REFRESH: '/api/users/refresh',     // if implemented
      PROFILE: '/api/users/profile'
    },

    // ==============================
    // Users
    // ==============================
    USERS: {
      BASE: '/api/users',
      UPDATE: '/api/users/update'
    },

    // ==============================
    // Campaigns
    // ==============================
    CAMPAIGNS: {
      BASE: '/api/campaigns',
      CREATE: '/api/campaigns',
      UPDATE: '/api/campaigns',
      DELETE: '/api/campaigns',
      APPLY: '/api/campaigns/apply'
    },

    // ==============================
    // Collaborations
    // ==============================
    COLLABORATIONS: {
      BASE: '/api/collaborations',
      CREATE: '/api/collaborations',
      UPDATE: '/api/collaborations',
      STATUS: '/api/collaborations/status'
    },

    // ==============================
    // Earnings
    // ==============================
    EARNINGS: {
      BASE: '/api/earnings',
      PAYOUTS: '/api/earnings/payouts',
      WITHDRAW: '/api/earnings/withdraw'
    },

    // ==============================
    // Dashboard
    // ==============================
    DASHBOARD: {
      BRAND: '/api/dashboard/brand',
      INFLUENCER: '/api/dashboard/influencer',
      ANALYTICS: '/api/dashboard/analytics'
    },

    // ==============================
    // Uploads
    // ==============================
    UPLOADS: {
      BASE: '/api/uploads',
      PROFILE: '/api/uploads/profile',
      PORTFOLIO: '/api/uploads/portfolio'
    }
  }
};

/**
 * Create a full URL for a given endpoint.
 * Appends API_VERSION if specified.
 */
export const createApiUrl = (endpoint) => {
  const base = API_CONFIG.BASE_URL.replace(/\/+$/, '');
  const version = API_CONFIG.VERSION.replace(/\/+$/, '');
  const path = endpoint.replace(/^\/+/, '');

  return version
    ? `${base}/${version}/${path}`
    : `${base}/${path}`;
};

/**
 * Return JSON headers with optional Bearer token.
 */
export const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

/**
 * Return headers for multipart/form-data uploads.
 * Do not set Content-Type manually; let the browser handle it.
 */
export const getUploadHeaders = (token) => ({
  ...(token && { 'Authorization': `Bearer ${token}` })
});