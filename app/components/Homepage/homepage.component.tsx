"use client";

import Card from "@/app/shared/components/Card/card.component";
import Grid from "@/app/shared/components/Grid/grid.component";
import { Movie, MovieDTO } from "@/app/shared/models/movie.model";
import usePopularMovies, { useSearch } from "./homepage.hooks";
import Search from "@/app/shared/components/Search/search.component";

interface HomePageProps {
  movies: MovieDTO;
}

export default function HomePage({ movies }: HomePageProps) {
  const {
    search,
    setSearch,
    results,
    isLoading,
    hasSearched,
    handleSearch,
  } = useSearch();

  const {
    data: popularData,
    loadMoreRef,
    isFetchingNextPage,
  } = usePopularMovies({ initialData: movies, hasSearched });

  const popularMovies = popularData?.pages.flatMap((p) => p.results) || [];

  const showingSearch = hasSearched;

  return (
    <div className="flex flex-col w-full gap-[12px]">
      <Search value={search} onChange={setSearch} onEnter={handleSearch} />

      {isLoading && <p>Searching...</p>}
      {hasSearched && !isLoading && results.length === 0 && (
        <p>No movies found.</p>
      )}

      <Grid gap="gap-6" minColWidth="200px">
        {(showingSearch ? results : popularMovies).map((movie: Movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </Grid>

      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {!hasSearched && isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}
