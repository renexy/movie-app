import HomePage from "./components/Homepage/homepage.component";
import { getPopularMovies } from "./types/tmdb";

export default async function Home() {
  // ssr initial 20 movies for faster LCP in lighthouse
  const popularMovies = await getPopularMovies();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <HomePage movies={popularMovies} />
      </main>
    </div>
  );
}
