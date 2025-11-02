'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <h1>About Page</h1>
      <Image
        src={
          'https://static.vecteezy.com/system/resources/previews/008/969/361/non_2x/multi-layers-gray-blue-dark-texture-3d-papercut-layers-in-gradient-banner-abstract-paper-cut-art-background-design-for-website-template-topography-map-concept-or-smooth-origami-paper-cut-vector.jpg'
        }
        width={600}
        height={600}
        alt="img"
      />
      <button onClick={() => router.push('/')}>Back to home</button>
    </div>
  );
};

export default Page;
