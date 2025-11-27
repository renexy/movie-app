"use client";

interface ResponsiveGridProps {
  children: React.ReactNode;
  gap?: string;
  minColWidth?: string;
}

export default function Grid({
  children,
  gap = "gap-4",
  minColWidth = "150px",
}: ResponsiveGridProps) {
  return (
    <div
      className={`grid ${gap}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
