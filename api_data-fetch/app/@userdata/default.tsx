'use client';

import { useEffect, useState } from 'react';

export default function UserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/user");
        
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading user data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-red-500 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">User Data</h2>
      {userData ? (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm text-gray-800 dark:text-gray-200">
          {JSON.stringify(userData, null, 2)}
        </pre>
      ) : (
        <div className="text-gray-500 dark:text-gray-400">No user data available</div>
      )}
    </div>
  );
}