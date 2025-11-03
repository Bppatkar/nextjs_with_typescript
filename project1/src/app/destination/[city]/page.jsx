'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { city } = useParams();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Welcome to {city}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {city === 'Paris' && "Experience the romance and elegance of the French capital"}
            {city === 'Tokyo' && "Discover the perfect blend of tradition and innovation"}
            {city === 'NewYork' && "Feel the energy of the city that never sleeps"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl text-cyan-400 mb-2">🏛️</div>
            <h3 className="text-white font-semibold mb-2">Culture</h3>
            <p className="text-gray-300">Rich heritage and vibrant arts scene</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl text-green-400 mb-2">🍽️</div>
            <h3 className="text-white font-semibold mb-2">Cuisine</h3>
            <p className="text-gray-300">World-renowned culinary experiences</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <div className="text-3xl text-yellow-400 mb-2">📸</div>
            <h3 className="text-white font-semibold mb-2">Photography</h3>
            <p className="text-gray-300">Endless iconic photo opportunities</p>
          </div>
        </div>

        {/* Image Section */}
        <div className="mb-12">
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              {city === 'Paris' && (
                <Image
                  src="https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"
                  width={600}
                  height={400}
                  alt="Paris - The City of Love"
                  className="rounded-xl shadow-2xl transform group-hover:scale-105 transition duration-500 w-full"
                />
              )}
              {city === 'Tokyo' && (
                <Image
                  src="https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                  width={600}
                  height={400}
                  alt="Tokyo - The Modern Metropolis"
                  className="rounded-xl shadow-2xl transform group-hover:scale-105 transition duration-500 w-full"
                />
              )}
              {city === 'NewYork' && (
                <Image
                  src="https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"
                  width={600}
                  height={400}
                  alt="New York - The City That Never Sleeps"
                  className="rounded-xl shadow-2xl transform group-hover:scale-105 transition duration-500 w-full"
                />
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
            Start Your {city} Adventure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;