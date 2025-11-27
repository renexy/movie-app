import { Movie } from "../../models/movie.model";

interface CardProps {
  movie: Movie;
}

export default function Card({ movie }: CardProps) {
  return (
    <div className="flex flex-col w-full cursor-pointer">
      <div
        key={movie.id}
        className="bg-gray-300 h-64 rounded-lg shadow-md flex items-center justify-center text-lg font-bold hover:scale-105 transition-transform"
      >
        Movie {movie.original_title}
      </div>
    </div>
  );
}
