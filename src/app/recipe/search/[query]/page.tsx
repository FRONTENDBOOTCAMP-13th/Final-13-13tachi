'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bookmark } from 'lucide-react';
import type { Post } from '@/types/post';
import useUserStore from '@/zustand/useStore';
import useBookmarkStore from '@/zustand/useBookmarkStore';
import { addBookmark, deleteBookmark, getRecipes } from '@/data/functions/post';
import SearchBar from '@/components/common/SearchBar';

export default function RecipeSearchPage() {
  const params = useParams();
  const searchQuery = decodeURIComponent(params.query as string);

  const [allRecipes, setAllRecipes] = useState<Post[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'전체' | '채소' | '과일'>('전체');

  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const {
    likeMap,
    addBookmark: add,
    removeBookmark: remove,
  } = useBookmarkStore();

  // 전체 레시피 데이터 가져오기
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await getRecipes();
        if (res.ok === 1 && res.item) {
          setAllRecipes(res.item);
        }
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // 검색어로 레시피 필터링
  useEffect(() => {
    if (!searchQuery || allRecipes.length === 0) {
      setFilteredRecipes([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allRecipes.filter(recipe => {
      // 제목에서 검색
      const titleMatch = recipe.title.toLowerCase().includes(query);

      // 태그에서 검색
      const tagMatch = recipe.tag && recipe.tag.toLowerCase().includes(query);

      // 작성자 이름에서 검색
      const authorMatch = recipe.user.name.toLowerCase().includes(query);

      // 카테고리에서 검색
      const categoryMatch =
        recipe.category && recipe.category.toLowerCase().includes(query);

      return titleMatch || tagMatch || authorMatch || categoryMatch;
    });

    setFilteredRecipes(filtered);
  }, [searchQuery, allRecipes]);

  // 북마크 토글 함수
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
          remove(postId);
        } else {
          alert(res.message || '삭제 중 오류가 발생했습니다.');
        }
      } else {
        const res = await addBookmark(accessToken, postId);
        if (res.ok === 1 && res.item) {
          add(postId, res.item._id);
        }
      }
    } catch (error) {
      console.error('북마크 요청 실패:', error);
    }
  };

  // 카테고리별 필터링
  const categoryFilteredRecipes =
    activeTab === '전체'
      ? filteredRecipes
      : filteredRecipes.filter(recipe => recipe.category === activeTab);

  return (
    <div className="lg:max-w-5xl mx-auto pt-[4.0625rem] pb-[6.25rem]">
      {/* 브레드크럼 */}
      <h2 className="text-gray">
        <Link href="/">HOME</Link>
        <span>{' > '}</span>
        <Link href="/recipe">레시피</Link>
        <span>{' > '}</span>
        <span>검색결과</span>
      </h2>

      {/* 페이지 제목 */}
      <div className="text-center mt-5">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-orange">{`"${searchQuery}"`}</span> 검색결과
        </h1>
        <p className="text-gray-600">
          {loading
            ? '검색 중...'
            : `총 ${categoryFilteredRecipes.length}개의 레시피를 찾았습니다.`}
        </p>
      </div>

      {/* 검색바 */}
      <div className="flex justify-center mt-6">
        <SearchBar handleType="handleRecipeSearch" />
      </div>

      {/* 카테고리 탭 */}
      <div className="flex justify-between mt-8">
        <div className="flex gap-4">
          {(['전체', '채소', '과일'] as const).map(tab => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
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

      {/* 검색 결과 */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
            <p className="mt-4 text-gray-600">검색 중입니다...</p>
          </div>
        ) : categoryFilteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">
              {`"${searchQuery}"에 대한 검색 결과가 없습니다.`}
            </p>
            <p className="text-gray-500">
              다른 검색어를 사용하거나 전체 레시피를 확인해보세요.
            </p>
            <Link
              href="/recipe"
              className="inline-block mt-4 px-6 py-2 bg-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              전체 레시피 보기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryFilteredRecipes.map((item, index) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
