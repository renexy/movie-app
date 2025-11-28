export default function Search({
  value,
  onChange,
  onEnter
}: {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnter()}
      className="
        w-full max-w-md
        px-4 py-2
        rounded-xl
        bg-neutral-800 text-gray-200
        placeholder-gray-500
        focus:outline-none
        focus:ring-2 focus:ring-neutral-600
        shadow-lg
      "
    />
  );
}
