'use client';

import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [bggUsername, setBggUsername] = useState('');
  const [initialBggUsername, setInitialBggUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch BGG username
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

    let data: any = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (res.ok) {
      setSuccess(true);
      setInitialBggUsername(bggUsername.trim());
    } else {
      setError(data.error || 'Failed to save');
    }
    setSaving(false);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center dark:bg-[#222b1f] p-4 pb-20">
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
        {/* BGG Username Section */}
        <section className="w-full max-w-md mt-2 bg-white dark:bg-[#1a2118] rounded-xl shadow-lg p-6 border border-transparent dark:border-[#6C8C64]">
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
        <p className="text-center text-[#29432B] dark:text-[#DBE5B9] mb-4">You are signed in! Ready to start selling your board games?</p>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </main>
  );
} 