import MovieInfo from "@/app/components/MovieInfo/movieInfo.component";
import { getMovie } from "@/app/types/tmdb";
import { notFound } from "next/navigation";

export default async function MovieCard({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const movie = await getMovie(id);
  if (!movie) {
    return notFound();
  }
  return <MovieInfo movie={movie} />;
}
