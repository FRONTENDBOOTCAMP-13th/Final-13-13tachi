'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Recipe {
  author: string;
  ingredients: string;
  title: string;
  img: string;
}

export default function RecipeCarousel() {
  const recipeArr: Recipe[] = [
    {
      author: 'oneway',
      ingredients: '당근',
      title: '사과 올린 샌드위치',
      img: '/imgs/recipe/recipe1.png',
    },
    {
      author: 'oneway',
      ingredients: '가지',
      title: '가지 올린 샌드위치',
      img: '/imgs/recipe/recipe2.png',
    },
    {
      author: 'oneway',
      ingredients: '고추',
      title: '고추 올린 샌드위치',
      img: '/imgs/recipe/recipe3.png',
    },
    {
      author: 'oneway',
      ingredients: '배추',
      title: '배추 올린 샌드위치',
      img: '/imgs/recipe/recipe4.png',
    },
    {
      author: 'oneway',
      ingredients: '양배추',
      title: '양배추 올린 샌드위치',
      img: '/imgs/recipe/recipe5.png',
    },
    {
      author: 'oneway',
      ingredients: '아스파라거스',
      title: '아스파라거스 올린 샌드위치인데 우동을 곁들인',
      img: '/imgs/recipe/recipe6.png',
    },
  ];

  const itemsPerPage = 4;
  const cardWidth = 230;

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 2, 0));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + 2, recipeArr.length - itemsPerPage));
  };

  return (
    <>
      <div className="relative w-[1024px] flex items-center mx-auto">
        <button
          onClick={handlePrev}
          className="absolute left-[-20px] bottom-[46%] z-10 bg-white rounded-full p-2 disabled:opacity-30 ring-3 ring-light-gray cursor-pointer"
        >
          <Image
            src="/imgs/left-arrow.png"
            alt="왼쪽 화살표"
            width={25}
            height={25}
          />
        </button>

        {/* 슬라이드 전체 감싸는 div */}
        <div className="overflow-hidden w-full">
          {/* 카드 리스트 - translateX로 슬라이드 + transition */}
          <div
            className="flex gap-8 mt-[1.875rem] mb-10"
            style={{
              transform: `translateX(-${startIndex * (cardWidth + 32)}px)`,
              transition: 'transform 0.5s ease',
            }}
          >
            {recipeArr.map((item, index) => (
              <figure
                key={index}
                className="w-[14.375rem] shadow-image rounded-4xl"
              >
                <div className="relative w-[14.375rem] h-[9.375rem] overflow-hidden rounded-t-4xl">
                  <Image
                    src={item.img}
                    alt="레시피 이미지"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
                <figcaption className="pb-[3.75rem] pt-[0.9375rem] pl-5 pr-5 text-center max-h-[9.375rem]">
                  <div className="relative flex items-center justify-center">
                    <p className="text-[#454545] text-xs">{item.author}</p>
                    <Image
                      src="/imgs/ico-bookmark.png"
                      alt="북마크"
                      width={12}
                      height={15}
                      className="absolute right-0"
                    />
                  </div>
                  <span className="text-orange text-sm mt-[0.5rem]">
                    {item.ingredients}
                  </span>
                  <p className="text-xl font-semibold mt-[0.5rem]">
                    {item.title}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-[-14px] bottom-[46%] z-10 bg-white rounded-full p-2 disabled:opacity-30 ring-3 ring-light-gray cursor-pointer"
        >
          <Image
            src="/imgs/right-arrow.png"
            alt="오른쪽 화살표"
            width={25}
            height={25}
          />
        </button>
      </div>
    </>
  );
}
