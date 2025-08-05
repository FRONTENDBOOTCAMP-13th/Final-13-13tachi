'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import type { Post } from '@/types/recipe';
import useUserStore from '@/zustand/useStore';
import useBookmarkStore from '@/zustand/useBookmarkStore';
import RecipeListLoading from './Loading';
import { getLikeRecipe } from '@/data/functions/recipe';
import { addRecipeBookmark, deleteRecipeBookmark } from '@/data/actions/recipe';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface RecipeListProps {
  post: Post[];
}

export default function RecipeList({ post }: RecipeListProps) {
  const [activeTab, setActiveTab] = useState<
    '전체' | '채소' | '과일' | '나의레시피'
  >('전체');
  const [recipeArr, setRecipeArr] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const router = useRouter();

  const {
    likeMap,
    addBookmark: add,
    removeBookmark: remove,
    setLikeMap,
  } = useBookmarkStore();

  // 초기 게시글 설정
  useEffect(() => {
    setRecipeArr(post);
  }, [post]);

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

  // 카테고리별 재료 매핑
  const categoryMap = {
    채소: ['당근', '감자', '고구마', '오이', '양송이'],
    과일: ['사과', '바나나', '딸기', '포도', '수박'],
  };

  // 탭별 필터링
  const filteredRecipes =
    activeTab === '전체'
      ? recipeArr
      : activeTab === '나의레시피'
        ? recipeArr.filter(r => r.user._id === user?._id)
        : recipeArr.filter(r => {
            const tags = r.tag?.split(',').map(tag => tag.trim()) || [];
            const filterIngredients = categoryMap[activeTab] || [];
            return tags.some(tag => filterIngredients.includes(tag));
          });

  // 무한 스크롤
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        visibleCount < filteredRecipes.length
      ) {
        setVisibleCount(prev => prev + 8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, filteredRecipes.length]);

  // 탭 변경 시 count 초기화
  useEffect(() => {
    setVisibleCount(8);
  }, [activeTab]);

  // 레시피등록 로그인 체크
  const handleRegisterClick = async () => {
    if (!user) {
      await Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
      router.push('/login');
      return;
    }
    router.push('/recipe/write');
  };

  return (
    <>
      {/* 탭과 등록 버튼 영역 - 항상 표시 */}
      <div className="flex justify-between mt-[1.5625rem] mb-5">
        <div className="flex gap-2.5 lg:text-base md:text-base text-sm">
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
        <button
          type="button"
          onClick={handleRegisterClick}
          className="text-orange font-semibold cursor-pointer lg:text-base md:text-base text-sm"
        >
          + 레시피 등록
        </button>
      </div>

      {/* 레시피 리스트 or 로딩 */}
      {recipeArr.length === 0 ? (
        <RecipeListLoading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:max-w-5xl md:w-full md:gap-x-5 md:gap-y-15 lg:gap-x-5 lg:gap-y-15">
          {filteredRecipes.slice(0, visibleCount).map((item, index) =>
            item._id ? (
              <Link key={item._id} href={`/recipe/${item._id}`}>
                <figure className="w-full">
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={index < 4}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 select-none">
                        이미지 없음
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-3">
                    <div className="relative flex">
                      <span className="w-full pr-5.5 text-lg font-semibold truncate md:text-xl md:pr-6">
                        {item.title}
                      </span>
                      <Bookmark
                        strokeWidth={1}
                        className={`absolute right-0 md:top-1 cursor-pointer w-[1.25rem] top-0 md:w-[1.5rem] 
                        ${likeMap.has(item._id) ? 'fill-black text-black' : 'text-black'} focus:outline-none`}
                        onClick={e => {
                          e.preventDefault();
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
                    <div className="flex justify-between items-center">
                      <span className="text-orange text-xs md:text-sm truncate">
                        {item.tag
                          ? item.tag
                              .split(',')
                              .map(s => s.trim())
                              .join(' | ')
                          : '재료 없음'}
                      </span>
                      <span className="text-gray text-xs md:text-sm truncate">
                        {item.user.name}
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
