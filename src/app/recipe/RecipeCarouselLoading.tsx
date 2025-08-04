'use client';

import { Bookmark } from 'lucide-react';

export default function RecipeCarouselLoading() {
  return (
    <div className="animate-pulse mt-2 md:mt-4.5">
      <div className="recipe-slide flex justify-between">
        <div className="w-[calc((100%-15px)/2)] md:w-[calc((100%-30px)/3)] lg:w-[calc((100%-45px)/4)] shadow-image rounded-4xl">
          <div className="w-full">
            {/* 이미지 영역 */}
            <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-t-4xl" />

            {/* 텍스트 영역 */}
            <div className="pb-[0.9375rem] pt-[0.9375rem] pl-5 pr-5 text-center">
              <div className="relative flex items-center justify-center mb-2">
                <div className="h-3 w-16 bg-gray-300 rounded" /> {/* 작성자 */}
                <div className="absolute right-0 w-5 h-5 bg-gray-200 rounded">
                  <Bookmark strokeWidth={1} stroke="gray" className="w-5 h-5" />
                </div>
              </div>
              <div className="h-3 w-2/3 bg-gray-200 rounded mx-auto mb-2" />{' '}
              {/* 태그 */}
              <div className="space-y-1">
                <div className="h-5 w-full bg-gray-300 rounded" />{' '}
                {/* 제목 1줄 */}
                <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto" />{' '}
                {/* 제목 2줄 */}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[calc((100%-15px)/2)] md:w-[calc((100%-30px)/3)] lg:w-[calc((100%-45px)/4)] shadow-image rounded-4xl">
          <div className="w-full">
            {/* 이미지 영역 */}
            <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-t-4xl" />

            {/* 텍스트 영역 */}
            <div className="pb-[0.9375rem] pt-[0.9375rem] pl-5 pr-5 text-center">
              <div className="relative flex items-center justify-center mb-2">
                <div className="h-3 w-16 bg-gray-300 rounded" /> {/* 작성자 */}
                <div className="absolute right-0 w-5 h-5 bg-gray-200 rounded">
                  <Bookmark strokeWidth={1} stroke="gray" className="w-5 h-5" />
                </div>
              </div>
              <div className="h-3 w-2/3 bg-gray-200 rounded mx-auto mb-2" />{' '}
              {/* 태그 */}
              <div className="space-y-1">
                <div className="h-5 w-full bg-gray-300 rounded" />{' '}
                {/* 제목 1줄 */}
                <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto" />{' '}
                {/* 제목 2줄 */}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[calc((100%-15px)/2)] md:w-[calc((100%-30px)/3)] lg:w-[calc((100%-45px)/4)] shadow-image rounded-4xl">
          <div className="w-full">
            {/* 이미지 영역 */}
            <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-t-4xl" />

            {/* 텍스트 영역 */}
            <div className="pb-[0.9375rem] pt-[0.9375rem] pl-5 pr-5 text-center">
              <div className="relative flex items-center justify-center mb-2">
                <div className="h-3 w-16 bg-gray-300 rounded" /> {/* 작성자 */}
                <div className="absolute right-0 w-5 h-5 bg-gray-200 rounded">
                  <Bookmark strokeWidth={1} stroke="gray" className="w-5 h-5" />
                </div>
              </div>
              <div className="h-3 w-2/3 bg-gray-200 rounded mx-auto mb-2" />{' '}
              {/* 태그 */}
              <div className="space-y-1">
                <div className="h-5 w-full bg-gray-300 rounded" />{' '}
                {/* 제목 1줄 */}
                <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto" />{' '}
                {/* 제목 2줄 */}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-[calc((100%-15px)/2)] md:w-[calc((100%-30px)/3)] lg:w-[calc((100%-45px)/4)] shadow-image rounded-4xl">
          <div className="w-full">
            {/* 이미지 영역 */}
            <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-t-4xl" />

            {/* 텍스트 영역 */}
            <div className="pb-[0.9375rem] pt-[0.9375rem] pl-5 pr-5 text-center">
              <div className="relative flex items-center justify-center mb-2">
                <div className="h-3 w-16 bg-gray-300 rounded" /> {/* 작성자 */}
                <div className="absolute right-0 w-5 h-5 bg-gray-200 rounded">
                  <Bookmark strokeWidth={1} stroke="gray" className="w-5 h-5" />
                </div>
              </div>
              <div className="h-3 w-2/3 bg-gray-200 rounded mx-auto mb-2" />{' '}
              {/* 태그 */}
              <div className="space-y-1">
                <div className="h-5 w-full bg-gray-300 rounded" />{' '}
                {/* 제목 1줄 */}
                <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto" />{' '}
                {/* 제목 2줄 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
