"use client";

import { useRef, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MovieDTO } from "@/app/shared/models/movie.model";

interface UsePopularMoviesProps {
  initialData: MovieDTO;
  hasSearched: boolean;
}

/**
 * Infinite scrolling
 */
export default function usePopularMovies({
  initialData,
  hasSearched,
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
        if (entries[0].isIntersecting && query.hasNextPage && !hasSearched) {
          query.fetchNextPage();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [query.fetchNextPage, query.hasNextPage, hasSearched]);

  return { ...query, loadMoreRef };
}

/**
 * Search hooks
 * At first I tried to implement a live-search without the user hitting enter (better UX) - but it seemed that I got rate limited on
 * TMDB api; I used a debounce timeout on search with a 500ms timeout so I wouldn't get rate limited but I still did :(
 * So I decided for a more conventional approach to trigger the search by enter key press
 */
export function useSearch() {
  const [search, setSearch] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const query = useQuery({
    queryKey: ["search", activeQuery],
    queryFn: async () => {
      const q = activeQuery.trim();
      if (!q) return { results: [] };

      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) throw new Error("Failed to search movies");
      return res.json();
    },
    enabled: Boolean(activeQuery),
  });

  const handleSearch = () => {
    const trimmed = search.trim();
    if (!trimmed) {
      setHasSearched(false);
      setActiveQuery("");
      return;
    }

    setHasSearched(true);
    setActiveQuery(trimmed);
  };

  return {
    search,
    setSearch,
    results: query.data?.results ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    hasSearched,
    handleSearch,
  };
}
