import Pill from "./Pill";
import { ALL_CATEGORIES, type Category, type CategoryFilterValue } 
from "../types";

interface CategoryFilterRowProps {
  categories: Category[];
  selected: CategoryFilterValue;
  onSelect: (value: CategoryFilterValue) => void;
}


//app.tsx ma CategoryFilterRow details magxu
export default function CategoryFilterRow({
  categories,
  selected,
  onSelect,
}: CategoryFilterRowProps) {
  
  const allOption: Category = { id: 0, value: ALL_CATEGORIES, label: "All" };
  const pillOptions = [allOption, ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {pillOptions.map((category) => (
        <Pill
          key={category.id}
          label={category.label}
          active={selected === category.value}
          onClick={() => onSelect(category.value)}
        />
      ))}
    </div>
  );
}