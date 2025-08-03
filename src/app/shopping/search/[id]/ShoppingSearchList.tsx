'use client';

import SearchItemsList from '@/app/shopping/search/[id]/SearchItemsList';
import SearchBar from '@/components/common/SearchBar';
import { ProductType } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ShoppingSearchList({
  products,
}: {
  products: ProductType[];
}) {
  // 주소창의 path 값 추출
  const pathname = usePathname();
  const searchKeyword = decodeURIComponent(
    // 주소창 path로 검색어 추출
    pathname.split('/shopping/search/')[1] || '',
  );

  const searchProducts = products.filter(
    (
      item, // 검색어를 포함한 상품 목록 필터링
    ) => item.name?.includes(searchKeyword),
  );

  return (
    <div className="mx-auto px-5 pt-7.5 pb-15 md:px-7.5 md:pt-12.5 md:pb-20 lg:px-0 lg:max-w-5xl lg:pt-[4.0625rem] lg:pb-25">
      {/* ST: 오늘의 못난이는? */}
      <div>
        <h2 className="text-gray text-xs md:text-sm lg:text-base">
          <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
          <Link href="/shopping">장보기</Link>&nbsp;&gt;&nbsp;검색결과
        </h2>
        <div className="text-center mt-5">
          <h3 className="font-bold mb-2 text-3xl md:text-4xl lg:text-5xl ">
            <span className="text-orange">&quot;{searchKeyword}&quot;</span>
            &nbsp;검색결과
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            총 {searchProducts.length}개의 상품을 찾았습니다.
          </p>
        </div>
      </div>
      {/* ED: 오늘의 못난이는? */}

      {/* ST: Search Bar */}
      <div className="w-fit mt-[1.5625rem] mx-auto">
        <SearchBar handleType="handleProductSearch" />
      </div>
      {/* ED: Search Bar */}

      {/* ST: 전체 상품 */}
      <div className="mt-7">
        <SearchItemsList
          searchProducts={searchProducts}
          searchKeyword={searchKeyword}
        />
      </div>
      {/* ED: 전체 상품 */}
    </div>
  );
}
