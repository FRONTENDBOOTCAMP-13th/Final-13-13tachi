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
        <div className="mx-auto lg:max-w-5xl lg:pt-[4.0625rem] lg:py-25">
          {/* ST: 오늘의 못난이는? */}
          <div>
            <h2 className="text-gray">
              <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
              <Link href="/shopping">장보기</Link>
            </h2>
            <h3 className="font-bold lg:mt-5 lg:text-center lg:text-5xl">
              오늘의 못난이는?
            </h3>
          </div>
          {/* ED: 오늘의 못난이는? */}

          {/* ST: Search Bar */}
          <div className="w-fit lg:mt-[1.5625rem] lg:mx-auto">
            <SearchBar handleType="handleProductSearch" />
          </div>
          {/* ED: Search Bar */}

          {/* ST: 인기상품 */}
          <div className="lg:mt-7.5">
            <h4 className="font-bold text-dark-green lg:text-3xl">인기 상품</h4>
            <Suspense>
              <HotItemList products={products} />
            </Suspense>
          </div>
          {/* ED: 인기상품 */}

          {/* ST: 전체 상품 */}
          <div className="lg:mt-12">
            <h4 className="font-bold text-dark-green lg:text-3xl">전체 상품</h4>
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
