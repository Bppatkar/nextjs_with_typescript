import Link from 'next/link';
import React from 'react';

const page = () => {
  const destination = ['Paris', 'Tokyo', 'NewYork'];

  return (
    <div className="flex justify-center items-center min-h-screen text-white flex-col gap-4">
      <div>
        <h2 className="font-bold text-2xl">Choose Your Destination</h2>
      </div>
      <div className="flex flex-col gap-4">
        {destination.map((d, index) => (
          <Link
            href={`/destination/${d}`}
            key={index}
            className="font-bold flex items-center justify-center rounded-2xl w-[200px] h-[100px]  text-white bg-indigo-600 hover:opacity-[0.5] transition-all cursor-pointer"
          >
            {d}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
