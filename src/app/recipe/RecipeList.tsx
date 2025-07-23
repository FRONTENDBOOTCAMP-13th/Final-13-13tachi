'use client';

import { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/types/product';

interface APIResponseItem {
  _id: string | number;
  title?: string;
  ingredients?: string;
  user?: {
    name?: string;
  };
  product?: {
    image?: string;
  };
  category?: '채소' | '과일' | '나의레시피';
}

export default function RecipeList() {
  const [activeTab, setActiveTab] = useState<
    '전체' | '채소' | '과일' | '나의레시피'
  >('전체');
  const [recipeArr, setRecipeArr] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
          headers: {
            'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
          },
        });

        if (!res.ok) throw new Error('네트워크 오류');

        const data = await res.json();

        const recipes: Recipe[] = (
          Array.isArray(data.item) ? data.item : []
        ).map((item: APIResponseItem) => ({
          _id: item._id.toString(),
          title: item.title || '제목 없음',
          author: item.user?.name || '작성자없음',
          ingredients: item.ingredients || '',
          img: item.product?.image || '',
          category: item.category || '나의레시피',
        }));

        setRecipeArr(recipes);
      } catch (error) {
        console.error(error);
        alert('레시피 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes =
    activeTab === '전체'
      ? recipeArr
      : recipeArr.filter(r => r.category === activeTab);

  if (loading) {
    return <div className="text-center mt-10">불러오는 중...</div>;
  }

  if (filteredRecipes.length === 0) {
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
        <div className="text-center mt-10 text-gray-500">
          레시피가 없습니다.
        </div>
      </>
    );
  }

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
        {filteredRecipes.map((item, index) => (
          <Link
            key={item._id}
            href={`/recipe/${item._id}`}
            className={`w-[15rem] block ${
              index >= 4 ? 'mt-[60px]' : index >= 0 ? 'mt-[25px]' : ''
            }`}
          >
            <figure className="lg:w-[15rem]">
              <div className="relative w-[15rem] h-[15rem] overflow-hidden rounded-lg bg-gray-100">
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 15rem"
                    priority={index < 4}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 select-none">
                    이미지 없음
                  </div>
                )}
              </div>
              <figcaption className="mt-[12px]">
                <div className="relative flex">
                  <span className="text-xl font-semibold max-w-[90%]">
                    {item.title}
                  </span>
                  <Bookmark
                    className="absolute right-0 top-1"
                    strokeWidth={1}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange text-sm">
                    {item.ingredients || '재료 없음'}
                  </span>
                  <span className="text-gray">{item.author}</span>
                </div>
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </>
  );
}
