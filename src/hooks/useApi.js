import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

// Custom hook for API calls with loading and error states
export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Hook for campaigns
export function useCampaigns(filters = {}) {
  return useApi(() => apiService.campaigns.getAll(filters), [JSON.stringify(filters)]);
}

// Hook for collaborations
export function useCollaborations(filters = {}) {
  return useApi(() => apiService.collaborations.getAll(filters), [JSON.stringify(filters)]);
}

// Hook for earnings
export function useEarnings() {
  return useApi(() => apiService.earnings.getEarnings(), []);
}

// Hook for dashboard data
export function useDashboard(userType) {
  const apiCall = userType === 'brand' 
    ? apiService.dashboard.getBrandDashboard
    : apiService.dashboard.getInfluencerDashboard;
    
  return useApi(apiCall, [userType]);
}

// Hook for analytics
export function useAnalytics(filters = {}) {
  return useApi(() => apiService.dashboard.getAnalytics(filters), [JSON.stringify(filters)]);
}