'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bookmark } from 'lucide-react';
import { Post } from '@/types/post';
import useUserStore from '@/zustand/useStore';
import useBookmarkStore from '@/zustand/useBookmarkStore';
import { addRecipeBookmark, deleteRecipeBookmark, getRecipes } from '@/data/functions/post';
import SearchBar from '@/components/common/SearchBar';
import CustomLink from '@/components/common/CustomLink';

interface Props {
  searchQuery: string;
}

export default function RecipeSearchClient({ searchQuery }: Props) {
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

  // 레시피 데이터 가져오기
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

  // 검색어로 필터링
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = allRecipes.filter(recipe => {
      const titleMatch = recipe.title.toLowerCase().includes(query);
      const tagMatch = recipe.tag?.toLowerCase().includes(query);
      const authorMatch = recipe.user.name.toLowerCase().includes(query);
      const categoryMatch = recipe.category?.toLowerCase().includes(query);
      return titleMatch || tagMatch || authorMatch || categoryMatch;
    });
    setFilteredRecipes(filtered);
  }, [searchQuery, allRecipes]);

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
        const res = await deleteRecipeBookmark(accessToken, bookmarkId);
        if (res.ok === 1) remove(postId);
      } else {
        const res = await addRecipeBookmark(accessToken, postId);
        if (res.ok === 1 && res.item) add(postId, res.item._id);
      }
    } catch (err) {
      console.error('북마크 처리 실패:', err);
    }
  };

  // 카테고리 필터링
  const categoryFiltered =
    activeTab === '전체'
      ? filteredRecipes
      : filteredRecipes.filter(r => r.category === activeTab);

  return (
    <div className="lg:max-w-5xl lg:min-h-screen mx-auto pt-[4.0625rem] pb-[6.25rem]">
      {/* 브레드크럼 */}
      <h2 className="text-gray">
        <Link href="/">HOME</Link>
        &nbsp;&gt;&nbsp;
        <Link href="/recipe">레시피</Link>
        &nbsp;&gt;&nbsp;
        <span>검색결과</span>
      </h2>

      {/* 제목 */}
      <div className="text-center mt-5">
        <h3 className="text-4xl font-bold mb-2">
          <span className="text-orange">{`"${searchQuery}"`}</span> 검색결과
        </h3>
        <p className="text-gray-600">
          {loading
            ? '검색 중...'
            : `총 ${categoryFiltered.length}개의 레시피를 찾았습니다.`}
        </p>
      </div>

      {/* 검색바 */}
      <div className="flex justify-center mt-6">
        <SearchBar handleType="handleRecipeSearch" />
      </div>

      {/* 탭 */}
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

      {/* 결과 */}
      <div className="mt-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
            <p className="mt-4 text-gray-600">검색 중입니다...</p>
          </div>
        ) : categoryFiltered.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">
              {`"${searchQuery}"`}에 대한 검색 결과가 없습니다.
            </p>
            <p className="text-gray-500">다른 키워드를 입력해 보세요.</p>
            <div className="mt-[4.0625rem]">
              <CustomLink
                variant="orange"
                size="xl"
                type="button"
                href={'/recipe'}
              >
                레시피 보러가기
              </CustomLink>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryFiltered.map((item, index) => (
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
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        이미지 없음
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-3">
                    <div className="relative flex items-center">
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
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-orange truncate">
                        {item.tag
                          ? item.tag
                              .split(',')
                              .map(s => s.trim())
                              .join(' | ')
                          : '재료 없음'}
                      </span>
                      <span className="text-gray truncate">
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