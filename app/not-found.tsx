"use client"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
      <p className="opacity-70">The movie you&apos;re looking for doesn&apos;t exist.</p>
    </div>
  );
}
