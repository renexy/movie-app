import { TMDB_IMAGE_BASE } from "@/app/utils/utils";
import { Movie } from "../../models/movie.model";
import Image from "next/image";

interface CardProps {
  movie: Movie;
}

export default function Card({ movie }: CardProps) {
  return (
    <div className="relative w-full h-64 rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform">
      <Image
        src={`${TMDB_IMAGE_BASE}w300${movie.poster_path}`}
        alt={movie.title ?? "/"}
        fill
        className="object-cover"
        priority={true}
      />
      <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 text-white p-2 text-sm font-bold">
        {movie.original_title ?? "/"}
      </div>
    </div>
  );
}
