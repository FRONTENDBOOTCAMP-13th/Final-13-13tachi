'use client';

import { useEffect, useMemo } from 'react';
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
  maxCount?: number; // 최대 표시할 인기 레시피 개수
  sortBy?: 'likes' | 'views' | 'bookmarks' | 'recent'; // 정렬 기준
}

export default function RecipeCarousel({
  recipes,
  maxCount = 10,
  sortBy = 'likes',
}: RecipeCarouselProps) {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const {
    likeMap,
    addBookmark: add,
    removeBookmark: remove,
    setLikeMap,
  } = useBookmarkStore();

  // 인기 레시피 필터링 및 정렬 로직
  const popularRecipes = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];

    // 유효한 레시피만 필터링
    const validRecipes = recipes.filter(recipe => recipe._id);

    // 정렬 기준에 따른 정렬
    const sortedRecipes = validRecipes.sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          // 좋아요/북마크 수 기준 (likeMap에 있는 것들 우선)
          const aLiked = likeMap.has(a._id) ? 1 : 0;
          const bLiked = likeMap.has(b._id) ? 1 : 0;
          if (aLiked !== bLiked) return bLiked - aLiked;

          // Post 타입에 실제 좋아요 수 필드가 있다면 사용
          // return (b.likeCount || 0) - (a.likeCount || 0);
          break;

        case 'views':
          // 조회수 기준 (Post 타입에 viewCount 필드가 있다면)
          // return (b.viewCount || 0) - (a.viewCount || 0);
          break;

        case 'bookmarks':
          // 북마크 수 기준
          // return (b.bookmarkCount || 0) - (a.bookmarkCount || 0);
          break;

        case 'recent':
          // 최신순
          const aDate = new Date(a.createdAt || 0).getTime();
          const bDate = new Date(b.createdAt || 0).getTime();
          return bDate - aDate;

        default:
          return 0;
      }
      return 0;
    });

    // 상위 N개만 반환
    return sortedRecipes.slice(0, maxCount);
  }, [recipes, maxCount, sortBy, likeMap]);

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

  // 인기 레시피 리스트 렌더링
  const hotRecipeList = popularRecipes.map(item => (
    <SwiperSlide key={item._id}>
      <figure className="shadow-image rounded-4xl">
        <Link href={`/recipe/${item._id}`}>
          <div className="relative lg:h-[9.375rem] md:h-[19.375rem] overflow-hidden rounded-t-4xl">
            {item.image ? (
              <Image
                src={item.image}
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
          <figcaption className="pb-[0.9375rem] pt-[0.9375rem] pl-5 pr-5 text-center max-h-[9.375rem]">
            <div className="relative flex items-center justify-center">
              <p className="text-[#454545] text-xs">{item.user.name}</p>
              <Bookmark
                className={`absolute right-0 w-5 cursor-pointer ${
                  likeMap.has(item._id) ? 'fill-black text-black' : 'text-black'
                }`}
                strokeWidth={1}
                onClick={e => {
                  e.preventDefault(); // 링크 이동 방지
                  e.stopPropagation(); // 이벤트 버블링 방지
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
            <p className="lg:text-xl md:text-lg font-semibold mt-[0.5rem]">
              {item.title}
            </p>
          </figcaption>
        </Link>
      </figure>
    </SwiperSlide>
  ));

  // 인기 레시피가 없으면 빈 상태 표시
  if (!popularRecipes || popularRecipes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        인기 레시피가 없습니다.
      </div>
    );
  }

  return (
    <div className="relative w-full lg:max-w-[1024px] mx-auto lg:mt-4.5 lg:mb-12">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation]}
        autoHeight={true}
        loop={popularRecipes.length > 1} // 1개 이하일 때는 loop 비활성화
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
        {hotRecipeList}
      </Swiper>
    </div>
  );
}
