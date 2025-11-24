// ----------------------------------------------
// Error handling utilities for API interactions
// This provides:
//  - Custom ApiError class for structured errors
//  - Unified API error handler (handleApiError)
//  - User-friendly error display (showErrorMessage)
//  - Retry mechanism for failed API calls (retryApiCall)
// ----------------------------------------------

// Custom error class to represent API-specific errors
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Main handler for consistent API error responses
export const handleApiError = (error) => {
  console.error('API Error:', error);

  // Handle unauthorized access - clear token and redirect
  if (error.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    return 'Session expired. Please login again.';
  }

  // Handle forbidden actions
  if (error.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  // Handle not found error
  if (error.status === 404) {
    return 'The requested resource was not found.';
  }

  // Handle server-side errors
  if (error.status >= 500) {
    return 'Server error. Please try again later.';
  }

  // Default fallback message
  return error.message || 'An unexpected error occurred.';
};

// Display error in a user-friendly way (toast/alert)
export const showErrorMessage = (error) => {
  const message = handleApiError(error);

  // Using alert for now — can replace with a toast system
  alert(message);

  return message;
};

// Retry mechanism for failed API calls (mainly for server/network errors)
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall(); // Try the API call
    } catch (error) {
      // If this was the final attempt, throw error
      if (i === maxRetries - 1) throw error;

      // Do not retry on client-side errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Wait before retrying (incremental delay)
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};
