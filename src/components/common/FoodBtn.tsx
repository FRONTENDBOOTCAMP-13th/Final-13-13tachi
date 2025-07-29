interface IngredientTagProps {
  label: string;
  onClick?: () => void;
  selected?: boolean;
}

export default function FoodBtn({
  label,
  onClick,
  selected = false,
}: IngredientTagProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`lg:px-[0.625rem] lg:py-[0.2813rem] lg:text-sm text-dark-green border border-dark-green rounded-full whitespace-nowrap
        ${selected ? 'bg-orange text-white border-orange' : ''}
      `}
    >
      {label}
    </button>
  );
}
