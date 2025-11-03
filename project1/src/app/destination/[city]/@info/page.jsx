'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { city } = useParams();
  
  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
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

      {/* CTA Section */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
          Start Your {city} Adventure
        </button>
      </div>
    </div>
  );
};

export default Page;