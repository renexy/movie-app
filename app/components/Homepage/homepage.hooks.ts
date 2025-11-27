"use client";

import { useRef, useEffect } from "react";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { MovieDTO } from "@/app/shared/models/movie.model";

interface UsePopularMoviesProps {
  initialData: MovieDTO;
}

export default function usePopularMovies({
  initialData,
}: UsePopularMoviesProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const query = useInfiniteQuery<MovieDTO, Error>({
    queryKey: ["popularMovies"],
    queryFn: async ({ pageParam }) => {
      const page = (pageParam as number) || 1;
      const res = await fetch(`/api/popular-movies?page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 2,
  });

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && query.hasNextPage) {
          query.fetchNextPage();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [loadMoreRef, query.fetchNextPage, query.hasNextPage]);

  return { ...query, loadMoreRef };
}
