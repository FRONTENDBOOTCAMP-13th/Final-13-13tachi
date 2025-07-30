'use client';

import SearchItemsList from '@/app/shopping/search/[id]/SearchItemsList';
import SearchBar from '@/components/common/SearchBar';
import { ProductType } from '@/types';
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
    <div className="mx-auto lg:max-w-5xl lg:pt-[4.0625rem] lg:py-25">
      {/* ST: 오늘의 못난이는? */}
      <div>
        <p className="text-gray">HOME &gt; 장보기</p>
        <div className="text-center mt-5">
          <h1 className="font-bold mb-2 lg:text-5xl ">
            <span className="text-orange">&quot;{searchKeyword}&quot;</span>
            &nbsp;검색결과
          </h1>
          <p className="text-gray-600">
            총 {searchProducts.length}개의 상품을 찾았습니다.
          </p>
        </div>
      </div>
      {/* ED: 오늘의 못난이는? */}

      {/* ST: Search Bar */}
      <div className="w-fit lg:mt-[1.5625rem] lg:mx-auto">
        <SearchBar handleType="handleProductSearch" />
      </div>
      {/* ED: Search Bar */}

      {/* ST: 전체 상품 */}
      <div className="lg:mt-7">
        <SearchItemsList
          searchProducts={searchProducts}
          searchKeyword={searchKeyword}
        />
      </div>
      {/* ED: 전체 상품 */}
    </div>
  );
}
