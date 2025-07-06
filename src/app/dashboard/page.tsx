import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';
import Image from 'next/image';

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-[#DBE5B9] dark:bg-[#222b1f] p-4 pb-20">
      <SignedIn>
        <section className="w-full max-w-xs flex flex-col items-center bg-white dark:bg-[#1a2118] rounded-2xl shadow-lg py-8 px-4 mb-6 border border-transparent dark:border-[#6C8C64]">
          {user?.imageUrl && (
            <Link href="/profile" className="mb-4">
              <Image
                src={user.imageUrl}
                alt="User avatar"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-4 border-[#6C8C64] shadow hover:scale-105 transition-transform cursor-pointer"
                priority
              />
            </Link>
          )}
          <h1 className="text-2xl font-bold text-[#6C8C64] dark:text-[#DBE5B9] mb-2 text-center">
            Welcome, {user?.firstName || 'User'}!
          </h1>
          <p className="text-sm text-[#29432B] dark:text-[#DBE5B9] mb-2 text-center">{user?.emailAddresses?.[0]?.emailAddress}</p>
        </section>
        <p className="text-center text-[#29432B] dark:text-[#DBE5B9] mb-4">You are signed in! Ready to start selling your board games?</p>
        <BottomNav />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </main>
  );
} 