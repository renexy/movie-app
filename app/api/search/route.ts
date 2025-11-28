import { TMDB_API_BASE } from "@/app/utils/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const res = await fetch(
    `${TMDB_API_BASE}/search/movie?language=en-US&query=${encodeURIComponent(
      query
    )}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
