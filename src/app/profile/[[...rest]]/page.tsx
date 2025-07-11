'use client';

import { UserProfile, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { BottomNav } from '@/components/BottomNav';
import Link from 'next/link';
import { ProfileLogOutButton } from '@/components/ProfileLogOutButton';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  // BGG username state and logic
  const [bggUsername, setBggUsername] = useState('');
  const [initialBggUsername, setInitialBggUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/bgg/username')
      .then(res => res.json())
      .then(data => {
        setBggUsername(data.bgg_username || '');
        setInitialBggUsername(data.bgg_username || '');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load BGG username');
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);
    const res = await fetch('/api/bgg/username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bgg_username: bggUsername.trim() })
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
      setInitialBggUsername(bggUsername.trim());
    } else {
      setError(data.error || 'Failed to save');
    }
    setSaving(false);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center dark:bg-[#222b1f] p-4 pb-20 relative">
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
        {/* BGG Username Section */}
        <section className="w-full max-w-md mt-8 bg-white dark:bg-[#1a2118] rounded-xl shadow-lg p-6 border border-transparent dark:border-[#6C8C64]">
          <h2 className="text-lg font-bold text-[#6C8C64] dark:text-[#DBE5B9] mb-2">BoardGameGeek Account</h2>
          <label className="block text-[#29432B] dark:text-[#DBE5B9] font-semibold mb-1" htmlFor="bgg-username">BGG Username</label>
          <input
            id="bgg-username"
            type="text"
            className="w-full rounded-lg border-gray-300 focus:border-[#6C8C64] focus:ring-[#6C8C64] text-base dark:bg-[#222b1f] dark:text-[#DBE5B9] dark:border-[#6C8C64] mb-2"
            value={bggUsername}
            onChange={e => { setBggUsername(e.target.value); setSuccess(false); setError(''); }}
            disabled={loading || saving}
            placeholder="Enter your BGG username"
          />
          <button
            className="w-full bg-[#6C8C64] text-white rounded-lg py-2 font-semibold hover:bg-[#587353] dark:bg-[#29432B] dark:text-[#DBE5B9] dark:hover:bg-[#6C8C64] transition-colors mb-2 disabled:opacity-50"
            onClick={handleSave}
            disabled={loading || saving || bggUsername.trim() === initialBggUsername.trim() || !bggUsername.trim()}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          {loading && <p className="text-sm text-gray-500">Loading...</p>}
          {success && <p className="text-sm text-green-600">Saved!</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </section>
        <ProfileLogOutButton />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </main>
  );
} 