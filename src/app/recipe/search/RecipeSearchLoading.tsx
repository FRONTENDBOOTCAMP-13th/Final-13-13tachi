export default function RecipeSearchLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:max-w-5xl md:w-full md:gap-x-5 md:gap-y-15 lg:gap-x-5 lg:gap-y-15 mt-6 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-full">
          <div className="relative w-full aspect-square bg-gray-200 rounded-lg" />
          <div className="mt-3 space-y-2">
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="flex justify-between items-center">
              <div className="h-4 w-1/2 bg-gray-100 rounded" />
              <div className="h-4 w-1/4 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
