'use client';

export default function CommentLoading() {
  return (
    <div className="flex items-start py-5 border-b-2 border-[#DEDEDE] animate-pulse">
      <div className="relative w-[3.125rem] h-[3.125rem] shrink-0 rounded-full bg-gray-300" />

      <div className="ml-4 w-full space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-300 rounded w-24" />
          <div className="h-5 bg-gray-300 rounded w-6" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-full max-w-[80%]" />
      </div>
    </div>
  );
}
