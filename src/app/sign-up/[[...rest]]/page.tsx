import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center dark:bg-[#222b1f] p-4 relative">
      <Link href="/" className="absolute left-4 top-4 p-2 rounded-full hover:bg-[#e3e9d2] dark:hover:bg-[#1a2118] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#6C8C64" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </Link>
      <SignUp 
        appearance={{
          elements: {
            card: 'rounded-xl shadow-lg bg-white dark:bg-[#1a2118] border border-transparent dark:border-[#6C8C64]',
            rootBox: 'bg-[#DBE5B9] dark:bg-[#222b1f]',
            formButtonPrimary: 'bg-[#6C8C64] text-white rounded-lg hover:bg-[#587353] dark:bg-[#29432B] dark:text-[#DBE5B9] dark:hover:bg-[#6C8C64] transition-colors',
            formFieldInput: 'rounded-lg border-gray-300 focus:border-[#6C8C64] focus:ring-[#6C8C64] text-base dark:bg-[#222b1f] dark:text-[#DBE5B9] dark:border-[#6C8C64]',
            formFieldLabel: 'text-[#29432B] dark:text-[#DBE5B9] font-semibold',
            headerTitle: 'text-[#6C8C64] dark:text-[#DBE5B9] font-bold',
            headerSubtitle: 'text-[#29432B] dark:text-[#DBE5B9]',
            socialButtonsBlockButton: 'bg-[#6C8C64] text-white rounded-lg hover:bg-[#587353] dark:bg-[#29432B] dark:text-[#DBE5B9] dark:hover:bg-[#6C8C64] transition-colors',
            dividerText: 'text-[#29432B] dark:text-[#DBE5B9]',
            logoBox: { width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '4rem', paddingTop: '2rem' },
            logoImage: { width: '100%', maxWidth: '400px', objectFit: 'contain', height: 'auto' },
          },
        }}
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
        signInUrl="/sign-in"
      />
    </main>
  );
} 