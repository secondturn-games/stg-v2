"use client";
import { SignOutButton, useUser } from '@clerk/nextjs';

export function ProfileLogOutButton() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="w-full max-w-xs mt-6 mb-2">
      <SignOutButton redirectUrl="/">
        <button className="w-full py-3 rounded-lg font-semibold text-white bg-[#D95323] hover:bg-[#b53e17] dark:bg-[#b53e17] dark:hover:bg-[#D95323] transition-colors text-lg shadow cursor-pointer">
          Log Out
        </button>
      </SignOutButton>
    </div>
  );
} 