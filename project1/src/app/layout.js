import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

export const metadata = {
  title: 'Travel Guide Website',
  description: 'Best Travel Guidance',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${poppins.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
