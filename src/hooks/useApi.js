import { useCallback, useEffect, useRef, useState } from 'react';
import { apiService } from '../services/api';

// =======================================================
// Generic API hook for handling fetch, loading, error state
// Includes: auto-cancel, refetch ability, dependency tracking
// =======================================================
export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);       // Store API response
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);     // Store any error message
  const abortControllerRef = useRef(null);      // Keeps AbortController reference for canceling requests

  // Function to execute API request
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Cancel previous ongoing request before starting a new one
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      // Pass abort signal to request
      const result = await apiCall(abortControllerRef.current.signal);
      setData(result); // Save response
    } catch (err) {
      // Ignore aborted requests; handle real errors only
      if (err.name !== 'AbortError') {
        console.error('API Error:', err);
        setError(err.message || 'An error occurred');
      }
    } finally {
      setLoading(false); // Stop loading state
    }
  }, dependencies); // Ensure correct memoization based on dependencies

  // Automatically call fetch on mount or when dependencies change
  useEffect(() => {
    fetchData();

    // Cleanup on unmount: abort any pending request
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  // Expose refetch method for manual refreshing
  const refetch = async () => {
    await fetchData();
    return data;
  };

  return { data, loading, error, refetch };
}

// ================================
// Domain-Specific Hooks
// These wrap useApi for each API endpoint
// ================================

// Fetch all campaigns (supports filter params)
export function useCampaigns(filters = {}) {
  return useApi(
    () => apiService.campaigns.getAll(filters),
    [JSON.stringify(filters)] // Stringify to detect deep changes
  );
}

// Fetch all collaborations (supports filter params)
export function useCollaborations(filters = {}) {
  return useApi(
    () => apiService.collaborations.getAll(filters),
    [JSON.stringify(filters)]
  );
}

// Fetch earnings of user
export function useEarnings() {
  return useApi(
    () => apiService.earnings.getEarnings(),
    []
  );
}

// Fetch dashboard data depending on user role
export function useDashboard(userType) {
  // Choose API based on brand vs influencer
  const apiCall = userType === 'brand'
    ? apiService.dashboard.getBrandDashboard
    : apiService.dashboard.getInfluencerDashboard;

  return useApi(
    () => apiCall(),
    [userType] // Refetch when user type changes
  );
}

// Fetch analytics metrics (supports filtered queries)
export function useAnalytics(filters = {}) {
  return useApi(
    () => apiService.dashboard.getAnalytics(filters),
    [JSON.stringify(filters)]
  );
}
