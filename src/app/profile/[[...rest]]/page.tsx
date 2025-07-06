import { UserProfile, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { BottomNav } from '@/components/BottomNav';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-[#DBE5B9] dark:bg-[#222b1f] p-4 pb-20 relative">
      <SignedIn>
        {/* Desktop-only back button */}
        <Link href="/dashboard" className="absolute left-4 top-4 p-2 rounded-full hover:bg-[#e3e9d2] dark:hover:bg-[#1a2118] transition-colors hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#6C8C64" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <UserProfile
          appearance={{
            elements: {
              card: 'rounded-xl shadow-lg bg-white dark:bg-[#1a2118] border border-transparent dark:border-[#6C8C64]',
              rootBox: 'bg-[#DBE5B9] dark:bg-[#222b1f]',
              navbar: 'hidden',
              formButtonPrimary: 'bg-[#6C8C64] text-white rounded-lg hover:bg-[#587353] dark:bg-[#29432B] dark:text-[#DBE5B9] dark:hover:bg-[#6C8C64] transition-colors',
              formFieldInput: 'rounded-lg border-gray-300 focus:border-[#6C8C64] focus:ring-[#6C8C64] text-base dark:bg-[#222b1f] dark:text-[#DBE5B9] dark:border-[#6C8C64]',
              formFieldLabel: 'text-[#29432B] dark:text-[#DBE5B9] font-semibold',
              avatarBox: 'ring-2 ring-[#6C8C64]',
              headerTitle: 'text-[#6C8C64] dark:text-[#DBE5B9] font-bold',
              headerSubtitle: 'text-[#29432B] dark:text-[#DBE5B9]',
              profileSectionTitle: 'text-[#6C8C64] dark:text-[#DBE5B9] font-semibold',
              profileSectionContent: 'text-[#29432B] dark:text-[#DBE5B9]',
            },
          }}
        />
        <div className="w-full max-w-xs mt-6 mb-2">
          <SignOutButton redirectUrl="/">
            <button className="w-full py-3 rounded-lg font-semibold text-white bg-[#D95323] hover:bg-[#b53e17] dark:bg-[#b53e17] dark:hover:bg-[#D95323] transition-colors text-lg shadow cursor-pointer">
              Log Out
            </button>
          </SignOutButton>
        </div>
        <BottomNav />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </main>
  );
} 