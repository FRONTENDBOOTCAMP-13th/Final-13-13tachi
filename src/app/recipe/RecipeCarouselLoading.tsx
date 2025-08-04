'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function RecipeCarouselLoading() {
  return (
    <div className="mt-2 md:mt-4.5 animate-pulse">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={15}
        className="recipe-slide"
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className="shadow-image rounded-4xl w-full">
              {/* 이미지 영역 */}
              <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-t-4xl" />
              {/* 텍스트 영역 */}
              <div className="pb-[0.9375rem] pt-[0.9375rem] px-5 space-y-2">
                <div className="h-4 w-1/3 bg-gray-300 rounded" /> {/* 작성자 */}
                <div className="h-3 w-1/2 bg-gray-200 rounded" /> {/* 태그 */}
                <div className="h-4 w-full bg-gray-300 rounded" /> {/* 제목 1 */}
                <div className="h-4 w-3/4 bg-gray-200 rounded" /> {/* 제목 2 */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
