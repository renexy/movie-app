"use client";
import ImageWithFallback from "@/app/shared/components/ImageWithFallback/imageWithFallback.component";
import { Movie } from "@/app/shared/models/movie.model";

export default function MovieInfo({ movie }: { movie: Movie }) {
  // dumb down the star logic here a bit, we use a 5-star system
  // should maybe export the rating system into a seperate component, but I didnt want to overcomplicate this example
  const ratingOutOf5 = movie.vote_average / 2;
  const fullStars = Math.floor(ratingOutOf5);
  const halfStar = ratingOutOf5 - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="min-h-screen w-full text-white flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row w-full gap-8">
        <div className="relative w-full md:w-[500px] h-[750px] rounded-lg overflow-hidden">
          <ImageWithFallback
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4 justify-center">
          <h1 className="text-4xl font-bold">{movie.title || "/"}</h1>

          <div className="flex items-center gap-2 text-yellow-400">
            {" "}
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={`full-${i}`}>★</span>
            ))}
            {halfStar ? <span key="half">☆</span> : null}{" "}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <span key={`empty-${i}`} className="text-gray-600">
                ★
              </span>
            ))}
            <span className="ml-2 text-gray-300">
              {`(${movie.vote_count || "/"} reviews)`}
            </span>
          </div>

          <p className="text-gray-200 text-lg">{movie.overview || "/"}</p>

          <div className="flex flex-col gap-1 text-gray-400 text-sm">
            <span>Release Date: {movie.release_date || "/"}</span>
            <span>Votes: {movie.vote_count || "/"}</span>
            {movie.adult && (
              <span className="text-red-600 font-bold">18+ Adult</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
