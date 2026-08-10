import type { Category, CategoryFilterValue, RatingFilterValue } from "../types";
import { ALL_CATEGORIES, ANY_RATING } from "../types";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  categoryFilter: CategoryFilterValue;
  onCategoryChange: (value: CategoryFilterValue) => void;
  ratingFilter: RatingFilterValue;
  onRatingChange: (value: RatingFilterValue) => void;
}

const RATING_OPTIONS: RatingFilterValue[] = [4.5, 4.0, 3.5, ANY_RATING];

export default function FilterSidebar({
  isOpen,
  onClose,
  categories,
  categoryFilter,
  onCategoryChange,
  ratingFilter,
  onRatingChange,
}: FilterSidebarProps) {
  if (!isOpen) return null;

  const handleClearAll = () => {
    onCategoryChange(ALL_CATEGORIES);
    onRatingChange(ANY_RATING);
  };

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* sidebar panel */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear All
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={categoryFilter === cat.value}
                  onChange={() =>
                    onCategoryChange(categoryFilter === cat.value ? ALL_CATEGORIES : cat.value)
                  }
                  className="rounded"
                />
                {cat.label}
              </label>
            ))}
          </div>
        </div>

        {/* Minimum Rating */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {RATING_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={ratingFilter === option}
                  onChange={() => onRatingChange(option)}
                />
                {option === ANY_RATING ? "Any Rating" : `${option}+ ★`}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-700 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-800"
        >
          Apply Filters
        </button>
      </div>
    </>
  );
}