import NotFound from "../not-found";
import { Movie, MovieDTO } from "../shared/models/movie.model";
import { TMDB_API_BASE } from "../utils/utils";

export async function getPopularMovies(page: number = 1): Promise<MovieDTO> {
  const res = await fetch(
    `${TMDB_API_BASE}/movie/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch TMDB popular movies");
  }

  return res.json();
}

export async function getMovie(id: string): Promise<Movie | null> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    cache: "no-store",
  });

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  return res.json();
}
