import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-[#DBE5B9] p-4">
      <h1 className="text-3xl font-bold text-[#6C8C64] mb-2">Page Not Found</h1>
      <p className="mb-6">Sorry, we couldn&apos;t find that page.</p>
      <Link href="/" className="bg-[#6C8C64] text-white rounded-lg px-6 py-3 text-lg font-semibold">Go Home</Link>
    </main>
  );
} 