"use client";

import { MovieDTO } from "@/app/shared/models/movie.model";

interface HomePageProps {
  movies: MovieDTO;
}

export default function HomePage({ movies }: HomePageProps) {
  return <div>{movies.total_results || 0}</div>;
}
