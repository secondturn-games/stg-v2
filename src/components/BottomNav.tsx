"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Heroicons SVGs (inline for zero dependencies)
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-7 h-7 ${active ? 'text-[#6C8C64]' : 'text-gray-400'}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75V19.5A2.25 2.25 0 006.75 21.75h2.25m6 0h2.25A2.25 2.25 0 0019.5 19.5V9.75m-15 0L12 3m0 0l8.25 8.25"
    />
  </svg>
);

const UserIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-7 h-7 ${active ? 'text-[#6C8C64]' : 'text-gray-400'}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
    />
  </svg>
);

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center h-16 sm:hidden">
      <Link href="/dashboard" className="flex flex-col items-center justify-center flex-1">
        <HomeIcon active={pathname === '/dashboard'} />
        <span className={`text-xs mt-1 ${pathname === '/dashboard' ? 'text-[#6C8C64]' : 'text-gray-400'}`}>Dashboard</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center justify-center flex-1">
        <UserIcon active={pathname === '/profile'} />
        <span className={`text-xs mt-1 ${pathname === '/profile' ? 'text-[#6C8C64]' : 'text-gray-400'}`}>Profile</span>
      </Link>
    </nav>
  );
} 