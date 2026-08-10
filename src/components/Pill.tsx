interface PillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function Pill({ label, active, onClick }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        active
          ? "bg-blue-700 border-blue-700 text-white"
          : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
      }`}
    >
      {/* //yesle label le deko input deko text dekhauxa */}
      {label}   
    </button>
  );
}