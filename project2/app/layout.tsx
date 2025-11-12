import type { Metadata } from 'next';
import './globals.css';
import ClientProvider from '@/ClientProvider';

export const metadata: Metadata = {
  title: 'Next_JS FullStack Project',
  description:
    'This is my first Next JS fullstack project with next , cloudinary and mongodb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
       
      </body>
    </html>
  );
}
