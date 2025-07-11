'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUserCog, FaThList, FaLayerGroup, FaEnvelope, FaShoppingCart, FaQuestionCircle } from 'react-icons/fa';

const navItems = [
  { label: 'Account', href: '/dashboard/account', icon: <FaUserCog /> },
  { label: 'Listings', href: '/dashboard/listings', icon: <FaThList /> },
  { label: 'Collection', href: '/dashboard/collection', icon: <FaLayerGroup /> },
  { label: 'Messages', href: '/dashboard/messages', icon: <FaEnvelope /> },
  { label: 'Orders', href: '/dashboard/orders', icon: <FaShoppingCart /> },
  { label: 'Help', href: '/dashboard/help', icon: <FaQuestionCircle /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 min-h-screen bg-white dark:bg-[#1a2118] border-r border-[#e3e9d2] dark:border-[#29432B] flex-col py-8 px-4">
        <div className="mb-8 text-2xl font-bold text-[#6C8C64] text-center">Second Turn</div>
        <nav className="flex flex-col gap-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-[#6C8C64] text-white'
                  : 'text-[#29432B] dark:text-[#DBE5B9] hover:bg-[#e3e9d2] dark:hover:bg-[#29432B]'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* Mobile bottom nav */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white dark:bg-[#1a2118] border-t border-[#e3e9d2] dark:border-[#29432B] h-16 shadow-lg">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors ${
              pathname === item.href
                ? 'text-[#6C8C64]'
                : 'text-[#29432B] dark:text-[#DBE5B9] hover:text-[#6C8C64]'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[10px] leading-none">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
} 