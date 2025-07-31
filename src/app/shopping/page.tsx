import AllItems from '@/app/shopping/AllItems';
import HotItemList from '@/app/shopping/HotItemList';
import SearchBar from '@/components/common/SearchBar';
import { Suspense } from 'react';
import { getProducts } from '@/data/functions/post';
import { ProductType } from '@/types';
import Link from 'next/link';

export default async function ShoppingList() {
  const res = await getProducts();
  const products: ProductType[] = res.ok === 1 ? res.item : [];

  return (
    <>
      <main>
        <div className="mx-auto px-5 pt-7.5 pb-15 md:px-7.5 md:pt-12.5 md:pb-20 lg:px-0 lg:max-w-5xl lg:pt-[4.0625rem] lg:pb-25">
          {/* ST: 오늘의 못난이는? */}
          <div>
            <h2 className="text-gray text-xs md:text-sm lg:text-base">
              <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
              <Link href="/shopping">장보기</Link>
            </h2>
            <h3 className="mt-5 font-bold text-center text-3xl md:text-4xl lg:text-5xl">
              오늘의 못난이는?
            </h3>
          </div>
          {/* ED: 오늘의 못난이는? */}

          {/* ST: Search Bar */}
          <div className="w-fit mx-auto mt-[1.5625rem]">
            <SearchBar handleType="handleProductSearch" />
          </div>
          {/* ED: Search Bar */}

          {/* ST: 인기상품 */}
          <div className="mt-7.5">
            <h4 className="font-bold text-dark-green text-lg md:text-2xl lg:text-3xl">
              인기 상품
            </h4>
            <Suspense>
              <HotItemList products={products} />
            </Suspense>
          </div>
          {/* ED: 인기상품 */}

          {/* ST: 전체 상품 */}
          <div className="mt-9.5 lg:mt-12">
            <h4 className="font-bold text-dark-green text-lg md:text-2xl lg:text-3xl">
              전체 상품
            </h4>
            <Suspense>
              <AllItems />
            </Suspense>
          </div>
          {/* ED: 전체 상품 */}
        </div>
      </main>
    </>
  );
}
