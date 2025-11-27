"use client";

import Card from "@/app/shared/components/Card/card.component";
import Grid from "@/app/shared/components/Grid/grid.component";
import { MovieDTO } from "@/app/shared/models/movie.model";
import usePopularMovies from "./homepage.hooks";

interface HomePageProps {
  movies: MovieDTO;
}

export default function HomePage({ movies }: HomePageProps) {
  const { data, isFetchingNextPage, loadMoreRef } = usePopularMovies({
    initialData: movies,
  });

  return (
    <div className="flex flex-col w-full">
      <Grid gap="gap-6" minColWidth="200px">
        {data?.pages.map((page) =>
          page.results.map((movie) => <Card movie={movie} key={movie.id} />)
        )}
      </Grid>

      <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}
