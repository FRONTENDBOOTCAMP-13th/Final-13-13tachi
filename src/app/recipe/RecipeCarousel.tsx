'use client';

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import type { Post } from '@/types/post';
import useUserStore from '@/zustand/useStore';
import useBookmarkStore from '@/zustand/useBookmarkStore';
import {
  addBookmark,
  deleteBookmark,
  getLikeRecipe,
} from '@/data/functions/post';

import './recipe.css';

interface RecipeCarouselProps {
  recipes: Post[];
}

export default function RecipeCarousel({ recipes }: RecipeCarouselProps) {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const {
    likeMap,
    addBookmark: add,
    removeBookmark: remove,
    setLikeMap,
  } = useBookmarkStore();

  // 북마크 상태 세팅
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
  }, [accessToken, setLikeMap]);

  // 북마크 토글
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
        if (res.ok === 1) remove(postId);
        else alert(res.message || '삭제 중 오류가 발생했습니다.');
      } else {
        const res = await addBookmark(accessToken, postId);
        if (res.ok === 1 && res.item) add(postId, res.item._id);
      }
    } catch (error) {
      console.error('북마크 요청 실패:', error);
    }
  };

  const hotRecipeList = recipes
    .map(item => {
      if (!item._id) return null;

      return (
        <SwiperSlide key={item._id}>
          <figure className=" shadow-image rounded-4xl">
            <Link href={`/recipe/${item._id}`}>
              <div className="relative lg:h-[9.375rem] overflow-hidden rounded-t-4xl">
                {item.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image}`}
                    alt="레시피 이미지"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 select-none bg-gray-100">
                    이미지 없음
                  </div>
                )}
              </div>
              <figcaption className="pb-[3.75rem] pt-[0.9375rem] pl-5 pr-5 text-center max-h-[9.375rem]">
                <div className="relative flex items-center justify-center">
                  <p className="text-[#454545] text-xs">{item.user.name}</p>
                  <Bookmark
                    className={`absolute right-0 w-5 cursor-pointer ${
                      likeMap.has(item._id)
                        ? 'fill-black text-black'
                        : 'text-black'
                    }`}
                    strokeWidth={1}
                    onClick={e => {
                      e.preventDefault(); // 링크 이동 방지
                      toggleBookmark(item._id);
                    }}
                    aria-label={
                      likeMap.has(item._id) ? '북마크 해제' : '북마크 추가'
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleBookmark(item._id);
                      }
                    }}
                  />
                </div>
                <span className="text-orange text-sm mt-[0.5rem]">
                  {item.tag
                    ? item.tag
                        .split(',')
                        .map(s => s.trim())
                        .join(' | ')
                    : '재료 없음'}
                </span>
                <p className="text-xl font-semibold mt-[0.5rem]">
                  {item.title}
                </p>
              </figcaption>
            </Link>
          </figure>
        </SwiperSlide>
      );
    })
    .filter(Boolean); // null 값 제거

  // 데이터가 없거나 비어있으면 빈 상태 표시
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        인기 레시피가 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full max-w-[1024px] mx-auto lg:mt-4.5 lg:mb-12">
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          navigation={true}
          modules={[Navigation]}
          autoHeight={true}
          loop={recipes.length >= 4} // 4개 이상일 때만 loop 활성화
          className="recipe-slide"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 35,
            },
          }}
        >
          {hotRecipeList}
        </Swiper>
      </div>
    </>
  );
}
