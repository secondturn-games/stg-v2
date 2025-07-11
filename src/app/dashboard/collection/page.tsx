"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

interface BGGGame {
  objectid: string;
  name: string;
  yearpublished?: string;
  thumbnail?: string;
}

export default function CollectionPage() {
  const { user } = useUser();
  const [bggUsername, setBggUsername] = useState("");
  const [games, setGames] = useState<BGGGame[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch BGG username on mount
  useEffect(() => {
    fetch("/api/bgg/username")
      .then((res) => res.json())
      .then((data) => setBggUsername(data.bgg_username || ""));
  }, []);

  // Fetch collection when username is available
  const fetchCollection = async () => {
    if (!bggUsername) return;
    setLoading(true);
    setError("");
    setGames([]);
    try {
      const res = await fetch(`/api/bgg/collection?username=${encodeURIComponent(bggUsername)}`);
      if (!res.ok) throw new Error("Failed to fetch collection");
      const data = await res.json();
      setGames(data.games || []);
    } catch (e: any) {
      setError(e.message || "Error fetching collection");
    } finally {
      setLoading(false);
    }
  };

  // Filtered games
  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto w-full bg-white dark:bg-[#1a2118] rounded-xl shadow-lg p-4 border border-transparent dark:border-[#6C8C64] mt-4">
      <h1 className="text-2xl font-bold text-[#6C8C64] dark:text-[#DBE5B9] mb-4 text-center">Your Board Game Collection</h1>
      {!bggUsername ? (
        <p className="text-center text-[#29432B] dark:text-[#DBE5B9]">Please set your BGG username in your profile first.</p>
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 rounded-lg border-gray-300 focus:border-[#6C8C64] focus:ring-[#6C8C64] text-base dark:bg-[#222b1f] dark:text-[#DBE5B9] dark:border-[#6C8C64]"
              placeholder="Search your collection..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading || !games.length}
            />
            <button
              className="bg-[#6C8C64] text-white rounded-lg px-4 py-2 font-semibold hover:bg-[#587353] dark:bg-[#29432B] dark:text-[#DBE5B9] dark:hover:bg-[#6C8C64] transition-colors disabled:opacity-50"
              onClick={fetchCollection}
              disabled={loading || !bggUsername}
            >
              {loading ? "Loading..." : "Fetch Collection"}
            </button>
          </div>
          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
          {games.length > 0 && (
            <ul className="divide-y divide-[#e3e9d2] dark:divide-[#29432B]">
              {filteredGames.length === 0 ? (
                <li className="py-4 text-center text-gray-500">No games found.</li>
              ) : (
                filteredGames.map((game) => (
                  <li key={game.objectid} className="flex items-center gap-4 py-3">
                    {game.thumbnail && (
                      <Image
                        src={game.thumbnail}
                        alt={game.name}
                        width={48}
                        height={48}
                        className="rounded shadow"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-[#29432B] dark:text-[#DBE5B9]">{game.name}</div>
                      {game.yearpublished && (
                        <div className="text-xs text-gray-500">{game.yearpublished}</div>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
          {/* Optionally, add a button to search all BGG */}
          <div className="mt-6 text-center">
            <button
              className="underline text-[#6C8C64] dark:text-[#DBE5B9] hover:text-[#29432B] dark:hover:text-[#6C8C64] font-medium"
              // onClick={...} // To be implemented
              disabled
            >
              Search all BGG (coming soon)
            </button>
          </div>
        </>
      )}
    </div>
  );
} 