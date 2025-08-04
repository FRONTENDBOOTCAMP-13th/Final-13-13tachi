'use client';

import RelationProductsLoading from './edit/RelationProductsLoading';
import ProfileLoading from './ProfileLoading';

export default function RecipeDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto pt-16 pb-24 px-7.5 animate-pulse">
      {/* breadcrumb placeholder */}
      <div className="h-4 w-48 bg-gray-200 rounded mb-4 px-4 md:px-6 lg:px-8" />

      {/* 대표 이미지 placeholder */}
      <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
        <div className="w-full h-[20rem] md:h-[30rem] lg:w-[900px] lg:h-[500px] bg-gray-300 rounded-lg" />
      </div>

      {/* 작성자 프로필 placeholder */}
      <ProfileLoading />

      {/* 제목 placeholder */}
      <div className="mt-6 px-4 md:px-6 lg:px-8">
        <div className="h-10 w-3/4 bg-gray-200 rounded" />
      </div>

      {/* 태그 + 수정/삭제 버튼 placeholder */}
      <div className="mt-5 px-4 md:px-6 lg:px-8 flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-7 w-16 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="h-8 w-20 bg-gray-300 rounded" />
      </div>

      {/* 본문 placeholder */}
      <div className="bg-[#f4f4f4] rounded-lg mt-5 px-4 md:px-6 lg:px-8 py-6 space-y-3 text-xs md:text-sm lg:text-base">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-200 rounded" />
        ))}
      </div>

      {/* 공유 + 북마크 버튼 placeholder */}
      <div className="flex justify-end gap-2 mt-3 px-4 md:px-6 lg:px-8">
        <div className="h-8 w-8 bg-gray-300 rounded-full" />
        <div className="h-8 w-8 bg-gray-300 rounded-full" />
      </div>

      {/* 목록으로 버튼 placeholder */}
      <div className="flex justify-center mt-6 px-4 md:px-6 lg:px-8">
        <div className="h-12 w-32 bg-gray-300 rounded-lg" />
      </div>

      {/* 연관상품 placeholder */}
      <RelationProductsLoading />

      {/* 댓글 placeholder */}
      <div className="mt-10 px-4 md:px-6 lg:px-8 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
