'use client';

import ProductCard from '@/components/ProductCard';
import {
  getLikeProducts,
  getRecipes,
  addBookmark,
  deleteBookmark,
  getLikeRecipe,
  getProducts,
} from '@/data/functions/post';
import { ApiRes, LikeItemType, ProductType } from '@/types';
import { Post } from '@/types/post';
import useUserStore from '@/zustand/useStore';
import useBookmarkStore from '@/zustand/useBookmarkStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RecipeCard from './recipe/RecipeCard';
import RecipeCardLoading from './recipe/CardLoading';
import Loading from '@/app/Loading';

export default function MainProductLists() {
  const [itemCount, setItemCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768 && width < 1280) {
        setItemCount(3);
      } else {
        setItemCount(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [products, setProducts] = useState<ApiRes<ProductType[]> | null>(null);

  useEffect(() => {
    getProducts()
      .then(res => {
        setProducts(res);
      })
      .catch(err => {
        console.error('찜 상품 가져오기 실패:', err);
        setProducts({ ok: 0, message: '에러 발생!' });
      });
  });

  const hotItems =
    products?.ok === 1 && products.item
      ? products.item
          .filter((item: ProductType) => item.extra?.isBest)
          .slice(0, itemCount)
      : [];
  const vegeItems =
    products?.ok === 1 && products.item
      ? products.item
          .filter((item: ProductType) => item.extra?.category?.includes('채소'))
          .slice(0, itemCount)
      : [];
  const fruitItems =
    products?.ok === 1 && products.item
      ? products.item
          .filter((item: ProductType) => item.extra?.category?.includes('과일'))
          .slice(0, itemCount)
      : [];

  const { user } = useUserStore(); // 로그인 정보
  const accessToken = user?.token?.accessToken; // accessToken 값

  const [likeRes, setLikeRes] = useState<ApiRes<LikeItemType[]> | null>(null); // 좋아요 목록 최신 상태 관리
  const [recipes, setRecipes] = useState<Post[]>([]); // 레시피 목록
  const {
    likeMap,
    setLikeMap,
    addBookmark: add,
    removeBookmark: remove,
  } = useBookmarkStore(); // 북마크 상태

  useEffect(() => {
    // 현재 user의 좋아요 목록을 가져와서 likeRes에 넣어준다
    if (!accessToken) return;

    getLikeProducts(accessToken)
      .then(res => {
        setLikeRes(res);
      })
      .catch(err => {
        console.error('찜 가져오기 실패:', err);
        setLikeRes({ ok: 0, message: '에러 발생!' });
      });
  }, [accessToken]);

  useEffect(() => {
    getRecipes().then(res => {
      if (res.ok === 1 && res.item) {
        setRecipes(res.item);
      }
    });
  }, []);

  useEffect(() => {
    const token = user?.token?.accessToken;
    if (!token) return;

    getLikeRecipe(token).then(res => {
      if (res.ok === 1 && res.item) {
        const map = new Map<number, number>();
        res.item.forEach(b => map.set(b.post._id, b._id));
        setLikeMap(map);
      }
    });
  }, [user?.token?.accessToken, setLikeMap]);

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
      } else {
        const res = await addBookmark(accessToken, postId);
        if (res.ok === 1 && res.item) add(postId, res.item._id);
      }
    } catch (err) {
      console.error('북마크 토글 실패:', err);
    }
  };

  if (!products) {
    return <Loading />;
  }

  return (
    <main className="mx-auto px-5 pt-12.5 pb-15 space-y-15 md:px-7.5 md:pb-20 md:space-y-12.5 lg:px-0 lg:max-w-5xl lg:pt-[4.0625rem] lg:pb-25">
      {/* ST: 인기 상품 */}
      <section>
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">
            인기 상품
          </h3>
          <Link
            href="/shopping"
            className="text-dark-green font-semibold text-xs md:text-sm lg:text-base"
          >
            + 더보기
          </Link>
        </div>
        <ProductCard
          filteredItems={hotItems}
          likeRes={likeRes!}
          accessToken={accessToken!}
          user={user}
        />
      </section>
      {/* ED: 인기 상품 */}

      {/* ST: 채소류 */}
      <section>
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">
            채소류
          </h3>
          <Link
            href="/shopping?tab=채소"
            className="text-dark-green font-semibold text-xs md:text-sm lg:text-base"
          >
            + 더보기
          </Link>
        </div>
        <ProductCard
          filteredItems={vegeItems}
          likeRes={likeRes!}
          accessToken={accessToken!}
          user={user}
        />
      </section>
      {/* ED: 채소류 */}

      {/* ST: 과일류 */}
      <section>
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">
            과일류
          </h3>
          <Link
            href="/shopping?tab=과일"
            className="text-dark-green font-semibold text-xs md:text-sm lg:text-base"
          >
            + 더보기
          </Link>
        </div>
        <ProductCard
          filteredItems={fruitItems}
          likeRes={likeRes!}
          accessToken={accessToken!}
          user={user}
        />
      </section>
      {/* ED: 과일류 */}

      {/* ST: 인기 레시피 */}
      <section>
        <div className="flex items-center gap-3 md:gap-5 lg:gap-6">
          <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">
            인기 레시피
          </h3>
          <Link
            href="/recipe"
            className="text-dark-green font-semibold text-xs md:text-sm lg:text-base"
          >
            + 더보기
          </Link>
        </div>
        {recipes.length === 0 ? (
          <RecipeCardLoading />
        ) : (
          <RecipeCard
            posts={recipes.slice(0, itemCount)}
            toggleBookmark={toggleBookmark}
          />
        )}
      </section>
      {/* ED: 인기 레시피 */}
    </main>
  );
}
