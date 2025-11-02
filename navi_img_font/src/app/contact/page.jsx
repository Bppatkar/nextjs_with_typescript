'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const router = useRouter();
  return (
    <div >
      <h1>Contact Page</h1>
      <button onClick={() => router.push('/')}>Back to home</button>
    </div>
  );
};

export default Page;
