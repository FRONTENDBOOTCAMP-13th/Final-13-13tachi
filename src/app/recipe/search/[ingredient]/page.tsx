'use client';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SearchBar from '@/components/common/SearchBar';

export default function RecipeSearchPage() {
  const params = useParams();
  const ingredientRaw = params.ingredient as string;
  const ingredient = decodeURIComponent(ingredientRaw);

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

  const filteredRecipes = recipeArr.filter(item =>
    item.ingredients.includes(ingredient),
  );

  return (
    <>
      <div>
        <Header />
        <div className="lg:max-w-5xl mx-auto pt-[4.0625rem] pb-[6.25rem]">
          <h2 className="text-gray">
            <Link href="/">HOME</Link>
            <span>{' > '}</span>
            <Link href="/recipe">레시피</Link>
          </h2>

          <div>
            <h1 className="text-center text-3xl font-bold mt-[1.5625rem]">
              오늘의 요리는?
            </h1>
          </div>

          <div className="flex justify-center mt-5">
            <SearchBar handleType="handleRecipeSearch" />
          </div>

          <div className="flex justify-between mt-[1.5625rem]">
            <div>
              <span className="text-5xl font-bold text-dark-green">{`'${ingredient}'를 이용한 레시피`}</span>
            </div>
            <Link
              href="/recipe/write"
              className="text-orange font-semibold cursor-pointer"
            >
              + 레시피 등록
            </Link>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:max-w-5xl mt-6">
              {filteredRecipes.map((item, index) => (
                <div
                  key={index}
                  className={`w-[15rem] ${
                    index >= 4 ? 'mt-[60px]' : 'mt-[25px]'
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
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] w-full mt-10">
              <Image
                src="/search.svg"
                alt="검색 아이콘"
                width={100}
                height={100}
              />
              <p className="text-center text-gray-500 mt-6">
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
