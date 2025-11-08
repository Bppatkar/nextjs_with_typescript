'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const route = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="gap-3 p-5 text-center flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl mb-3">Fetching API</h1>
        <p>
          SSR, SSG, ISR these 3 only work in server component not client
          component
        </p>
        <div className="flex flex-col gap-4 w-[150px] text-center ">
          <button
            onClick={() => route.push('/api/user')}
            className="bg-blue-500 hover:bg-indigo-600 text-white rounded-xl px-6 py-3 transition duration-200"
          >
            Get Request
          </button>
          <button
            onClick={() => route.push('/api/user/create')}
            className="bg-amber-500 hover:bg-indigo-600 text-white rounded-xl px-6 py-3 transition duration-200"
          >
            POST Request
          </button>
          <button
            onClick={() => route.push('/api/user/update')}
            className="bg-green-500 hover:bg-indigo-600 text-white rounded-xl px-6 py-3 transition duration-200"
          >
            PUT Request
          </button>
          <button
            onClick={() => route.push('/api/user/delete')}
            className="bg-red-500 hover:bg-indigo-600 text-white rounded-xl px-6 py-3 transition duration-200"
          >
            Delete Request
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          This will navigate to the API endpoint and show JSON Data
        </p>
      </div>
    </div>
  );
}
