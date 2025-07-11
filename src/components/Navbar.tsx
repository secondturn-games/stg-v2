"use client";

import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BRAND_LIGHT_BG = "#E6EAD7";
const BRAND_DARK_BG = "#29432B";

export default function Navbar() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [isDark, setIsDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b border-[#e3e9d2] dark:border-[#29432B]"
      style={{
        backgroundColor: isDark ? BRAND_DARK_BG : BRAND_LIGHT_BG,
        color: isDark ? BRAND_LIGHT_BG : "#29432B",
      }}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center h-full">
          <Image
            src={isDark ? "/nav-logo-dark.svg" : "/nav-logo-light.svg"}
            alt="Second Turn Logo"
            width={120}
            height={32}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        {/* Search bar - hidden on xs, visible sm+ */}
        <form
          className="hidden sm:flex flex-1 max-w-md mx-6"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search for a game"
            className="w-full rounded-lg px-4 py-2 text-base border-none focus:ring-2 focus:ring-[#D95323] bg-[#FFFBED] text-[#29432B] dark:bg-[#3A4A3A] dark:text-[#DBE5B9] placeholder-[#6C8C64] dark:placeholder-[#DBE5B9]"
            disabled
          />
        </form>
        {/* Right side: Auth or Avatar */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!isLoaded ? null : !isSignedIn ? (
            <Link
              href="/sign-in"
              className="rounded-lg px-4 py-2 font-semibold bg-[#D95323] text-white hover:bg-[#b53e17] transition-colors text-sm shadow dark:bg-[#F2C94C] dark:text-[#29432B] dark:hover:bg-[#ffe066]"
            >
              Sign up | Log in
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="User menu"
                type="button"
              >
                <Image
                  src={user.imageUrl}
                  alt="User avatar"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-[#DBE5B9] dark:border-[#6C8C64]"
                />
              </button>
              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-[#1a2118] border border-[#e3e9d2] dark:border-[#29432B] py-2 z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-[#29432B] dark:text-[#DBE5B9] hover:bg-[#DBE5B9] dark:hover:bg-[#29432B] rounded-t-xl transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Your dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-[#29432B] dark:text-[#DBE5B9] hover:bg-[#DBE5B9] dark:hover:bg-[#29432B] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <div className="px-4 pt-2 pb-1">
                    <SignOutButton redirectUrl="/">
                      <button className="w-full text-left py-2 rounded-lg font-semibold text-white bg-[#D95323] hover:bg-[#b53e17] dark:bg-[#b53e17] dark:hover:bg-[#D95323] transition-colors text-sm shadow cursor-pointer">
                        Log Out
                      </button>
                    </SignOutButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Mobile search bar below nav */}
      <div className="sm:hidden px-4 pb-2 pt-1 bg-transparent">
        <input
          type="text"
          placeholder="Search for a game"
          className="w-full rounded-lg px-4 py-2 text-base border-none focus:ring-2 focus:ring-[#D95323] bg-[#FFFBED] text-[#29432B] dark:bg-[#3A4A3A] dark:text-[#DBE5B9] placeholder-[#6C8C64] dark:placeholder-[#DBE5B9]"
          disabled
        />
      </div>
    </nav>
  );
} 