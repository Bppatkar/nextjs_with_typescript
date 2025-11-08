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

        // =============================================
        // DATA FETCHING STRATEGIES - CLASS NOTES
        // =============================================

        // 1. SSR (Server-Side Rendering)
        // ---------------------------------------------
        // • Fresh data on EVERY request
        // • No caching - always fetches from server
        // • Good for: Real-time data, frequently changing content
        // • Use case: Dashboard, live scores, stock prices
        /*
        const res = await fetch('http://localhost:3000/api/user', {
          cache: 'no-store',  // ← This enables SSR
        });
        */

        // 2. SSG (Static Site Generation)
        // ---------------------------------------------
        // • Data cached at BUILD TIME
        // • Same data for all users until next build
        // • Good for: Blog posts, documentation, landing pages
        // • Use case: Company website, portfolio, blog
        /*
        const res = await fetch('http://localhost:3000/api/user', {
          cache: 'force-cache',  // ← This enables SSG (default)
        });
        */

        // 3. ISR (Incremental Static Regeneration)
        // ---------------------------------------------
        // • Cached data but revalidates after specified time
        // • Background updates without rebuilding entire site
        // • Good for: E-commerce products, news articles
        // • Use case: Product catalog, news website
        /*
        const res = await fetch('http://localhost:3000/api/user', {
          next: { revalidate: 10 },  // ← Revalidate every 10 seconds
        });
        */

        // 4. CSR (Client-Side Rendering) - CURRENTLY USING
        // ---------------------------------------------
        // • Data fetched in browser after component mounts
        // • Good for: User-specific data, protected routes
        // • Use case: User profiles, dashboards, admin panels

        const res = await fetch('/api/user'); // Relative URL for same origin

        // =============================================
        // IMPORTANT NOTE ABOUT CLIENT vs SERVER COMPONENTS
        // =============================================
        // • SSR, SSG, ISR only work in SERVER COMPONENTS
        // • In Client Components ('use client'), these fetch options are IGNORED
        // • Client Components can only do CSR (Client-Side Rendering)
        // • Remove 'use client' to use SSR/SSG/ISR in Server Components

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

  // =============================================
  // MANUAL CSR EXAMPLE (Additional API call)
  // =============================================
  const handleApi = async () => {
    // CSR Example: Manual API call triggered by user action
    const res = await fetch('/api/user'); // No full URL needed for same origin
    const data = await res.json();
    console.log('Manual CSR call:', data);
  };

  // =============================================
  // LOADING STATE
  // =============================================
  if (loading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          Loading user data... (CSR in progress)
        </div>
      </div>
    );
  }

  // =============================================
  // ERROR STATE
  // =============================================
  if (error) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-red-500 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  // =============================================
  // SUCCESS STATE - DISPLAYING DATA
  // =============================================
  return (
    <div className="p-6 h-full bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        User Data - CSR (Client-Side Rendering)
      </h2>

      {/* 
        CURRENT STRATEGY: CSR
        - Data fetched after component mounts in browser
        - No initial server-side data
        - Good for dynamic, user-specific content
      */}

      {userData ? (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm text-gray-800 dark:text-gray-200">
          {JSON.stringify(userData, null, 2)}
        </pre>
      ) : (
        <div className="text-gray-500 dark:text-gray-400">
          No user data available
        </div>
      )}

      {/* 
        QUICK REFERENCE:
        - SSR: cache: 'no-store'          → Fresh data every time
        - SSG: cache: 'force-cache'       → Cached at build time  
        - ISR: next: { revalidate: X }    → Cached with background updates
        - CSR: fetch in useEffect         → Client-side only
      */}
    </div>
  );
}
