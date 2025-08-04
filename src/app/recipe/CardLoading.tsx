'use client';

export default function RecipeCardLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[25px] animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="w-full">
          <div className="relative w-full aspect-square bg-gray-200 rounded-lg" />
          <div className="mt-3">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
