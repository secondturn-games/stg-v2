"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BGGGame {
  objectid: string;
  name: string;
  yearpublished?: string;
  thumbnail?: string;
}

export default function NewListingPage() {
  const [bggUsername, setBggUsername] = useState("");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<'collection' | 'bgg' | null>(null);
  const [results, setResults] = useState<BGGGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<BGGGame | null>(null);

  // Fetch BGG username on mount
  useEffect(() => {
    fetch("/api/bgg/username")
      .then((res) => res.json())
      .then((data) => setBggUsername(data.bgg_username || ""));
  }, []);

  // Clear results when input changes
  useEffect(() => {
    setResults([]);
    setSource(null);
    setSelected(null);
    setError("");
  }, [search]);

  // Search handler
  const handleSearch = async (src: 'collection' | 'bgg') => {
    if (!search.trim() || (src === 'collection' && !bggUsername)) return;
    setLoading(true);
    setError("");
    setResults([]);
    setSource(src);
    setSelected(null);
    try {
      let url = '';
      if (src === 'collection') {
        url = `/api/bgg/collection/search?username=${encodeURIComponent(bggUsername)}&q=${encodeURIComponent(search)}`;
      } else {
        url = `/api/bgg/search?q=${encodeURIComponent(search)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch results');
      const data = await res.json();
      setResults(data.games || []);
    } catch {
      setError('Error fetching results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full bg-white dark:bg-[#1a2118] rounded-xl shadow-lg p-4 border border-transparent dark:border-[#6C8C64] mt-4">
      <h1 className="text-2xl font-bold text-[#6C8C64] dark:text-[#DBE5B9] mb-4 text-center">List a Game for Sale</h1>
      <div className="flex gap-2 mb-4 items-center">
        <input
          type="text"
          className="flex-1 rounded-lg border-gray-300 focus:border-[#6C8C64] focus:ring-[#6C8C64] text-base dark:bg-[#222b1f] dark:text-[#DBE5B9] dark:border-[#6C8C64]"
          placeholder="Enter full game name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          disabled={loading}
        />
        <div className="flex gap-1">
          <button
            className={`px-3 py-2 rounded-lg font-semibold text-xs transition-colors ${source === 'collection' ? 'bg-[#6C8C64] text-white' : 'bg-gray-200 dark:bg-[#29432B] dark:text-[#DBE5B9] text-[#29432B]'}`}
            onClick={() => handleSearch('collection')}
            disabled={!bggUsername || !search.trim() || loading}
          >
            My Collection
          </button>
          <button
            className={`px-3 py-2 rounded-lg font-semibold text-xs transition-colors ${source === 'bgg' ? 'bg-[#6C8C64] text-white' : 'bg-gray-200 dark:bg-[#29432B] dark:text-[#DBE5B9] text-[#29432B]'}`}
            onClick={() => handleSearch('bgg')}
            disabled={!search.trim() || loading}
          >
            All BGG
          </button>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {selected ? (
        <div className="p-4 bg-[#E6EAD7] dark:bg-[#222b1f] rounded-lg flex items-center gap-4 mb-4">
          {selected.thumbnail && (
            <Image src={selected.thumbnail} alt={selected.name} width={64} height={64} className="rounded shadow" />
          )}
          <div>
            <div className="font-semibold text-[#29432B] dark:text-[#DBE5B9]">{selected.name}</div>
            {selected.yearpublished && <div className="text-xs text-gray-500">{selected.yearpublished}</div>}
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-[#e3e9d2] dark:divide-[#29432B]">
          {loading && <li className="py-4 text-center text-gray-500">Loading...</li>}
          {!loading && results.length === 0 && source && search.trim() && (
            <li className="py-4 text-center text-gray-500">No games found.</li>
          )}
          {results.map((game) => (
            <li
              key={game.objectid}
              className="flex items-center gap-4 py-3 cursor-pointer hover:bg-[#e3e9d2] dark:hover:bg-[#29432B] rounded"
              onClick={() => setSelected(game)}
            >
              {game.thumbnail && (
                <Image src={game.thumbnail} alt={game.name} width={48} height={48} className="rounded shadow" />
              )}
              <div>
                <div className="font-semibold text-[#29432B] dark:text-[#DBE5B9]">{game.name}</div>
                {game.yearpublished && <div className="text-xs text-gray-500">{game.yearpublished}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div className="mt-6 text-center">
          <button
            className="bg-[#6C8C64] text-white rounded-lg px-6 py-2 font-semibold hover:bg-[#587353] dark:bg-[#29432B] dark:text-[#DBE5B9] dark:hover:bg-[#6C8C64] transition-colors"
            // onClick={...} // To be implemented: go to next step
            disabled
          >
            Continue to Listing Details (coming soon)
          </button>
        </div>
      )}
      {source === 'collection' && !bggUsername && (
        <p className="text-center text-[#29432B] dark:text-[#DBE5B9] mt-4">Set your BGG username in your profile to search your collection.</p>
      )}
    </div>
  );
} 