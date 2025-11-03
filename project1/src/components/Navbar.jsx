'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center m-5 justify-between">
      <h2 className="font-bold text-2xl">🌍 Travel Guide</h2>
      <div className="flex gap-8 font-semibold">
        <Link 
          href="/" 
          className={`pb-1 ${pathname === '/' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-white-600 hover:text-indigo-600'}`}
        >
          Home
        </Link>
        <Link 
          href="/destination" 
          className={`pb-1 ${pathname === '/destination' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-white-600 hover:text-indigo-600'}`}
        >
          Destinations
        </Link>
        <Link 
          href="/contact" 
          className={`pb-1 ${pathname === '/contact' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-white-600 hover:text-indigo-600'}`}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;