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
      className={`lg:px-[0.625rem] lg:py-[0.2813rem] md:px-[0.425rem] py-[0.05rem] px-[0.4rem] md:py-[0.0813rem] lg:text-sm md:text-sm text-xs text-dark-green border border-dark-green rounded-full whitespace-nowrap
        ${selected ? 'bg-orange text-white border-orange' : ''}
      `}
    >
      {label}
    </button>
  );
}
