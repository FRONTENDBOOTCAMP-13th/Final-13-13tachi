'use client';

import ProductCard from '@/components/ProductCard';
import { getLikeProducts } from '@/data/functions/post';
import { ApiRes, LikeItemType, ProductType } from '@/types';
import useUserStore from '@/zustand/useStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MainProductLists({
  products,
}: {
  products: ProductType[];
}) {
  const hotItems = products.filter(item => item.extra?.isBest).slice(0, 4);

  const vegeItems = products
    .filter(item => item.extra?.category?.includes('채소'))
    .slice(0, 4);

  const fruitItems = products
    .filter(item => item.extra?.category?.includes('과일'))
    .slice(0, 4);

  const { user } = useUserStore(); // 로그인 정보
  const accessToken = user?.token?.accessToken; // accessToken 값

  const [likeRes, setLikeRes] = useState<ApiRes<LikeItemType[]> | null>(null); // 좋아요 목록 최신 상태 관리

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

  return (
    <main className="mx-auto lg:space-y-15 lg:max-w-5xl lg:pt-15 lg:pb-25">
      {/* ST: 인기 상품 */}
      <section>
        <div className="flex items-center lg:gap-8">
          <h3 className="font-semibold lg:text-3xl">인기 상품</h3>
          <Link href="/shopping" className="text-dark-green font-semibold">
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
        <div className="flex items-center lg:gap-8">
          <h3 className="font-semibold lg:text-3xl">채소류</h3>
          <Link href="#" className="text-dark-green font-semibold">
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
        <div className="flex items-center lg:gap-8">
          <h3 className="font-semibold lg:text-3xl">과일류</h3>
          <Link href="#" className="text-dark-green font-semibold">
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
        <div className="flex items-center lg:gap-8">
          <h3 className="font-semibold lg:text-3xl">인기 레시피</h3>
          <Link href="/recipe" className="text-dark-green font-semibold">
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
      {/* ED: 인기 레시피 */}

      {/* ST:  */}
      {/* ED:  */}
    </main>
  );
}
