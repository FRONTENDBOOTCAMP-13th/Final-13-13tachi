'use client';

import { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import type { Post } from '@/types/recipe';
import useUserStore from '@/zustand/useStore';
import useBookmarkStore from '@/zustand/useBookmarkStore';
import './recipe.css';
import RecipeCarouselLoading from './RecipeCarouselLoading';
import { getLikeRecipe } from '@/data/functions/recipe';
import { addRecipeBookmark, deleteRecipeBookmark } from '@/data/actions/recipe';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface RecipeCarouselProps {
  recipes: Post[];
  maxCount?: number;
  sortBy?: 'likes' | 'views' | 'bookmarks' | 'recent';
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

  // 로딩 상태 관리 - HotItemList 패턴 사용
  const [recipesData, setRecipesData] = useState<Post[] | null>(null);
  const router = useRouter();

  // 인기 레시피 필터링 및 정렬 로직
  const popularRecipes = useMemo(() => {
    if (!recipesData || recipesData.length === 0) return [];

    const validRecipes = recipesData.filter(recipe => recipe._id);

    const sortedRecipes = validRecipes.sort((a, b) => {
      switch (sortBy) {
        case 'bookmarks': {
          const aLiked = likeMap.has(a._id) ? 1 : 0;
          const bLiked = likeMap.has(b._id) ? 1 : 0;
          if (aLiked !== bLiked) return bLiked - aLiked;
          break;
        }
        case 'recent': {
          const aDate = new Date(a.createdAt || 0).getTime();
          const bDate = new Date(b.createdAt || 0).getTime();
          return bDate - aDate;
        }
        default:
          return 0;
      }
      return 0;
    });

    return sortedRecipes.slice(0, maxCount);
  }, [recipesData, maxCount, sortBy, likeMap]);

  // recipes 데이터 설정 - HotItemList 패턴
  useEffect(() => {
    if (recipes && recipes.length > 0) {
      setRecipesData(recipes);
    }
  }, [recipes]);

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
      await Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
      router.replace('/login');
      return;
    }

    const bookmarkId = likeMap.get(postId);
    const isBookmarked = bookmarkId !== undefined;

    try {
      if (isBookmarked) {
        const res = await deleteRecipeBookmark(accessToken, bookmarkId);
        if (res.ok === 1) remove(postId);
        else alert(res.message || '삭제 중 오류가 발생했습니다.');
      } else {
        const res = await addRecipeBookmark(accessToken, postId);
        if (res.ok === 1 && res.item) add(postId, res.item._id);
      }
    } catch (error) {
      console.error('북마크 요청 실패:', error);
    }
  };

  // 인기 레시피 리스트 렌더링
  const hotRecipeList = popularRecipes.map((item, index) => (
    <SwiperSlide key={item._id || index} className="shadow-image rounded-4xl">
      <figure className="w-full">
        <Link href={`/recipe/${item._id}`}>
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-4xl">
            {item.image ? (
              <Image
                src={item.image}
                alt="레시피 이미지"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 select-none bg-gray-100">
                이미지 없음
              </div>
            )}
          </div>
          <figcaption className="pb-[0.9375rem] pt-[0.9375rem] pl-5 pr-5 text-center">
            <div className="relative flex items-center justify-center">
              <p className="text-[#454545] text-xs">{item.user.name}</p>
              <Bookmark
                className={`absolute right-0 w-5 cursor-pointer ${
                  likeMap.has(item._id) ? 'fill-black text-black' : 'text-black'
                }`}
                strokeWidth={1}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
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
            <span className="text-orange text-sm mt-[0.5rem] block truncate">
              {item.tag
                ? item.tag
                    .split(',')
                    .map(s => s.trim())
                    .join(' | ')
                : '재료 없음'}
            </span>
            <p className="lg:text-xl md:text-lg text-base font-semibold mt-[0.5rem] line-clamp-1">
              {item.title}
            </p>
          </figcaption>
        </Link>
      </figure>
    </SwiperSlide>
  ));

  // HotItemList와 동일한 로딩 처리 패턴
  if (!recipesData) {
    return <RecipeCarouselLoading />;
  }

  // 레시피가 없을 때
  if (!popularRecipes || popularRecipes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        인기 레시피가 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-2 md:mt-4.5">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation]}
        autoHeight={false}
        loop={true}
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
