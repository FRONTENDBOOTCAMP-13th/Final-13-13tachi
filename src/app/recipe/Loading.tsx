'use client';

export default function RecipeListLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:max-w-5xl md:w-full md:gap-x-5 md:gap-y-15 lg:gap-x-5 lg:gap-y-15 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-full">
          {/* 이미지 영역 */}
          <div className="relative w-full aspect-square bg-gray-200 rounded-lg" />
          {/* 텍스트 영역 */}
          <div className="mt-3 space-y-2">
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="flex justify-between">
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
              <div className="h-3 w-1/4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
