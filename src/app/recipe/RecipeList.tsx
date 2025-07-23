'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { Recipe } from '@/types/product';
import { Post } from '@/types/post';

export default function RecipeList() {
  const [activeTab, setActiveTab] = useState<
    '전체' | '채소' | '과일' | '나의레시피'
  >('전체');
  const [recipeArr, setRecipeArr] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts?type=recipe`,
          {
            headers: {
              'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
            },
            cache: 'no-store',
          },
        );

        const data = await res.json();

        const recipes: Recipe[] = (
          Array.isArray(data.item) ? (data.item as Post[]) : []
        ).map(item => ({
          _id: item._id?.toString() || '',
          title: item.title || '제목 없음',
          author: item.user?.name ? item.user.name : '익명', // 작성자 이름 없으면 익명
          tag: item.tag || '',
          image:
            typeof item.image === 'string' && item.image.trim() !== ''
              ? item.image
              : null,
          category: item.type === 'recipe' ? '나의레시피' : item.type,
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

      {loading ? (
        <div className="text-center mt-10">불러오는 중...</div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          레시피가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:max-w-5xl">
          {filteredRecipes.map((item, index) =>
            item._id ? (
              <Link
                key={item._id}
                href={`/recipe/${item._id}`}
                className={`w-[15rem] block ${index >= 4 ? 'mt-[60px]' : 'mt-[25px]'}`}
              >
                <figure className="lg:w-[15rem]">
                  <div className="relative w-[15rem] h-[15rem] overflow-hidden rounded-lg bg-gray-100">
                    {item.image ? (
                      <Image
                        src={item.image}
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
                      <span className="text-xl font-semibold max-w-[90%] truncate">
                        {item.title}
                      </span>
                      <Bookmark
                        className="absolute right-0 top-1"
                        strokeWidth={1}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange text-sm truncate">
                        {item.tag
                          ? item.tag
                              .split(',')
                              .map(s => s.trim())
                              .join(' | ')
                          : '재료 없음'}
                      </span>
                      <span className="text-gray text-sm truncate">
                        {item.author}
                      </span>
                    </div>
                  </figcaption>
                </figure>
              </Link>
            ) : null,
          )}
        </div>
      )}
    </>
  );
}
