'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import type { Post } from '@/types/post';
import useUserStore from '@/zustand/useStore';

import { addBookmark, deleteBookmark } from '@/data/functions/post';
import { getLikeRecipe } from '@/data/functions/post';

interface RecipeListProps {
  post: Post[];
}

export default function RecipeList({ post }: RecipeListProps) {
  const [activeTab, setActiveTab] = useState<
    '전체' | '채소' | '과일' | '나의레시피'
  >('전체');
  const [recipeArr, setRecipeArr] = useState<Post[]>([]);
  const [likeMap, setLikeMap] = useState<Map<number, number>>(new Map());

  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  useEffect(() => {
    setRecipeArr(post);
  }, [post]);

  useEffect(() => {
    if (!accessToken) return;

    getLikeRecipe(accessToken).then(res => {
      if (res.ok === 1 && res.item) {
        const map = new Map<number, number>();
        res.item.forEach(bookmark => {
          map.set(bookmark.post._id, bookmark._id);
        });
        setLikeMap(map);
      }
    });
  }, [accessToken]);

  const toggleBookmark = async (postId: number) => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    const bookmarkId = likeMap.get(postId);
    const isBookmarked = bookmarkId !== undefined;

    try {
      if (isBookmarked) {
        const res = await deleteBookmark(accessToken, bookmarkId);
        if (res.ok === 1) {
          setLikeMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(postId);
            return newMap;
          });
        } else {
          alert(res.message || '삭제 중 오류가 발생했습니다.');
        }
      } else {
        const res = await addBookmark(accessToken, postId);
        if (res.ok === 1 && res.item) {
          setLikeMap(prev => new Map(prev).set(postId, res.item._id));
        }
      }
    } catch (error) {
      console.error('북마크 요청 실패:', error);
    }
  };

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:max-w-5xl">
        {filteredRecipes.map((item, index) =>
          item._id ? (
            <Link
              key={item._id}
              href={`/recipe/${item._id}`}
              className={`w-[15rem] block ${
                index >= 4 ? 'mt-[60px]' : 'mt-[25px]'
              }`}
            >
              <figure className="lg:w-[15rem]">
                <div className="relative w-[15rem] h-[15rem] overflow-hidden rounded-lg bg-gray-100">
                  {item.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image}`}
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
                      className={`absolute right-0 top-1 cursor-pointer ${
                        likeMap.has(item._id)
                          ? 'fill-black text-black'
                          : 'text-black'
                      }`}
                      strokeWidth={1}
                      onClick={e => {
                        e.preventDefault(); // 링크 이동 방지
                        toggleBookmark(item._id);
                      }}
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
                      {item.user.name}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Link>
          ) : null,
        )}
      </div>
    </>
  );
}
