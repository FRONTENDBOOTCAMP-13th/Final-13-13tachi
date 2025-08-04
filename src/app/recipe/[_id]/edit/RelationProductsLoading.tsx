'use client';

export default function RelationProductsLoading() {
  return (
    <div className="mt-10 animate-pulse">
      <h3 className="text-2xl font-bold mb-5 bg-gray-200 rounded w-32 h-8" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-300 rounded-lg"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
