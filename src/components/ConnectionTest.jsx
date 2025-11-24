// ConnectionTest Component
// This component checks if the frontend can successfully
// communicate with the backend API. It sends a request to
// the backend root URL and displays the connection status.
// Useful for debugging API connectivity and CORS issues.

import React, { useState, useEffect } from 'react';
import { createApiUrl } from '../config/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch(createApiUrl(''));
        const data = await response.text();
        if (data.includes('API is running')) {
          setStatus('✅ Connection Successful! Backend is responding.');
        } else {
          setStatus('⚠️ Backend responded but with unexpected data.');
        }
      } catch (err) {
        setError('❌ Connection Failed: ' + err.message);
        setStatus('Connection Test Completed');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Backend Connection Test</h2>
      <div className="p-4 rounded-lg bg-gray-50">
        <p className="text-gray-600">Status: <span className="font-semibold">{status}</span></p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="text-sm text-gray-500">
        <p>Backend URL: {createApiUrl('')}</p>
        <p>Frontend should be able to communicate with backend if CORS is configured correctly.</p>
      </div>
    </div>
  );
};

export default ConnectionTest;
