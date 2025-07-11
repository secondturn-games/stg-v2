"use client";
import Image from 'next/image';
import { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    // Honeypot value
    const website = (e.target as HTMLFormElement).website.value;
    if (website) {
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch('https://formspree.io/f/mjkrqkba', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target as HTMLFormElement),
      });
      if (res.ok) {
        setSuccess(true);
        setEmail('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="w-full flex flex-col items-center">
        <p className="text-lg text-[#6C8C64] dark:text-[#DBE5B9] font-semibold text-center mb-2">Thank you for signing up!</p>
        <p className="text-center text-[#29432B] dark:text-[#DBE5B9]">You&apos;ll be the first to know when we launch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-[#6C8C64] text-base focus:outline-none focus:ring-2 focus:ring-[#6C8C64] bg-white"
        disabled={submitting}
      />
      <button
        type="submit"
        className="w-full bg-[#6C8C64] text-white rounded-lg py-3 text-lg font-semibold shadow-md hover:bg-[#587353] transition-colors disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Notify Me'}
      </button>
      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </form>
  );
}

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center dark:bg-[#222b1f] p-4">
      <section className="w-full max-w-md flex flex-col items-center bg-[#E6EAD7] dark:bg-[#1a2118] rounded-2xl shadow-lg py-10 px-4">
        <div className="w-full max-w-xs mb-4">
          <Image src="/logo.png" alt="Second Turn Logo" width={400} height={80} className="w-full h-auto" priority />
        </div>
        <h2 className="text-xl font-semibold text-[#29432B] dark:text-[#DBE5B9] mb-2 text-center">
          Coming soon to the Baltics!
        </h2>
        <p className="text-center text-[#29432B] dark:text-[#DBE5B9] mb-1 text-base">
        Sell your used games or find new favorites. 
        </p>
        <p className="text-center text-[#29432B] dark:text-[#DBE5B9] mb-8 text-base">
        Join the waitlist and get notified at launch!
        </p>
        <NewsletterForm />
      </section>
    </main>
  );
} 