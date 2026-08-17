interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search services..."
      className="w-full max-w-sm border rounded-md px-3 py-1.5 text-sm bg-white shadow-sm"
    />
  );
}

export default SearchBar;