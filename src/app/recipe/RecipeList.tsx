'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
export default function RecipeList() {
  const [activeTab, setActiveTab] = useState<
    '전체' | '채소' | '과일' | '나의레시피'
  >('전체');

  interface Recipe {
    author: string;
    ingredients: string;
    title: string;
    img: string;
    category: '채소' | '과일' | '나의레시피';
  }

  const recipeArr: Recipe[] = [
    {
      author: 'oneway',
      ingredients: '당근',
      title: '사과 올린 샌드위치',
      img: '/imgs/recipe/recipe1.png',
      category: '과일',
    },
    {
      author: 'oneway',
      ingredients: '가지',
      title: '가지 올린 샌드위치',
      img: '/imgs/recipe/recipe2.png',
      category: '채소',
    },
    {
      author: 'oneway',
      ingredients: '고추',
      title: '고추 올린 샌드위치',
      img: '/imgs/recipe/recipe3.png',
      category: '채소',
    },
    {
      author: 'oneway',
      ingredients: '배추',
      title: '배추 올린 샌드위치',
      img: '/imgs/recipe/recipe4.png',
      category: '채소',
    },
    {
      author: 'oneway',
      ingredients: '양배추',
      title: '양배추 올린 샌드위치',
      img: '/imgs/recipe/recipe5.png',
      category: '채소',
    },
    {
      author: 'oneway',
      ingredients: '아스파라거스',
      title: '아스파라거스 올린 샌드위치인데 우동을 곁들인',
      img: '/imgs/recipe/recipe6.png',
      category: '나의레시피',
    },
  ];

  const filteredRecipes =
    activeTab === '전체'
      ? recipeArr
      : recipeArr.filter(item => item.category === activeTab);

  return (
    <>
      <div className="flex justify-between mt-[1.5625rem]">
        <div className="flex gap-4">
          {['전체', '채소', '과일', '나의레시피'].map(tab => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`cursor-pointer ${
                activeTab === tab
                  ? 'text-orange font-semibold'
                  : 'text-dark-green font-semibold'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        <Link
          href="/recipe/write"
          className="text-orange font-semibold cursor-pointer"
        >
          + 레시피 등록
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:max-w-5xl">
        {filteredRecipes.map((item, index) => {
          return (
            <div
              key={index}
              className={`w-[15rem] ${
                index >= 4 ? 'mt-[60px]' : index >= 0 ? 'mt-[25px]' : ''
              }`}
            >
              <figure className="lg:w-[15rem]">
                <div className="relative w-[15rem] h-[15rem] overflow-hidden rounded-lg">
                  <Image
                    src={item.img}
                    alt="레시피 이미지"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                  />
                </div>
                <figcaption className="mt-[12px]">
                  <div className="relative flex">
                    <span className="text-xl font-semibold max-w-[90%]">
                      {item.title}
                    </span>
                    <Image
                      src="/imgs/ico-bookmark.png"
                      alt="북마크"
                      width={15}
                      height={20}
                      className="absolute right-0 top-1"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange text-sm">
                      {item.ingredients}
                    </span>
                    <span className="text-gray">{item.author}</span>
                  </div>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </>
  );
}
