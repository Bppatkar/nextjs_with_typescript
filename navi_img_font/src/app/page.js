import Link from 'next/link';

export default function Home() {
  return (
    <div >
      <ul className="flex gap-2 font-bold mt-2 px-2">
        <Link href={'/'}>
          <li>Home</li>
        </Link>
        <Link href={'/about'}>
          <li>About</li>
        </Link>
        <Link href={'/contact'}>
          <li>Contact</li>
        </Link>
      </ul>
      <main className="h-screen flex items-center justify-center font-bold text-6xl">
        <h1>Here in Main Heading</h1>
      </main>
    </div>
  );
}
