import Link from 'next/link';
import LandingPage from './LandingPage';

const showLanding = process.env.NEXT_PUBLIC_SHOW_LANDING_ONLY === 'true';

export default function Home() {
  if (showLanding) {
    return <LandingPage />;
  }
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <section className="w-full max-w-xs flex flex-col items-center bg-white rounded-2xl shadow-lg py-10 px-4">
        <h1 className="text-3xl font-bold text-[#6C8C64] mb-2 text-center">Second Turn</h1>
        <h2 className="text-xl font-semibold text-[#29432B] mb-4 text-center">
          Buy and sell your used board games!
        </h2>
        <p className="text-center text-[#29432B] mb-8 text-base">
          Sign up now to start selling your games.
        </p>
        <Link
          href="/sign-up"
          className="w-full bg-[#6C8C64] text-white rounded-lg py-3 text-lg font-semibold mb-3 text-center shadow-md hover:bg-[#587353] transition-colors"
        >
          Sign Up
        </Link>
        <Link
          href="/sign-in"
          className="w-full border-2 border-[#6C8C64] text-[#6C8C64] rounded-lg py-3 text-lg font-semibold text-center hover:bg-[#f3f6ec] transition-colors"
        >
          Log In
        </Link>
      </section>
    </main>
  );
}
