const TMDB_API_BASE = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const res = await fetch(`${TMDB_API_BASE}/movie/popular?language=en-US`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch TMDB popular movies");
  }

  return res.json();
}

export async function searchMovies(query: string) {
  if (!query) return [];

  const res = await fetch(
    `${TMDB_API_BASE}/search/movie?language=en-US&query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      cache: "no-store"
    }
  );

  if (!res.ok) {
    throw new Error("Failed to search movies");
  }

  return res.json();
}