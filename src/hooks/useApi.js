import { useCallback, useEffect, useRef, useState } from 'react';
import { apiService } from '../services/api';

// Generic API hook with loading, error, and refetch capabilities
export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    abortControllerRef.current?.abort(); // Abort any previous requests
    abortControllerRef.current = new AbortController();

    try {
      const result = await apiCall(abortControllerRef.current.signal);
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('API Error:', err);
        setError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, dependencies); // dependencies must include all used in apiCall

  useEffect(() => {
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  const refetch = async () => {
    await fetchData();
    return data;
  };

  return { data, loading, error, refetch };
}

// ================================
// Domain-Specific Hooks
// ================================

// Hook for fetching all campaigns with filters
export function useCampaigns(filters = {}) {
  return useApi(
    () => apiService.campaigns.getAll(filters),
    [JSON.stringify(filters)]
  );
}

// Hook for fetching all collaborations with filters
export function useCollaborations(filters = {}) {
  return useApi(
    () => apiService.collaborations.getAll(filters),
    [JSON.stringify(filters)]
  );
}

// Hook for fetching earnings
export function useEarnings() {
  return useApi(
    () => apiService.earnings.getEarnings(),
    []
  );
}

// Hook for fetching dashboard data based on user type
export function useDashboard(userType) {
  const apiCall = userType === 'brand'
    ? apiService.dashboard.getBrandDashboard
    : apiService.dashboard.getInfluencerDashboard;

  return useApi(
    () => apiCall(),
    [userType]
  );
}

// Hook for fetching analytics with filters
export function useAnalytics(filters = {}) {
  return useApi(
    () => apiService.dashboard.getAnalytics(filters),
    [JSON.stringify(filters)]
  );
}
