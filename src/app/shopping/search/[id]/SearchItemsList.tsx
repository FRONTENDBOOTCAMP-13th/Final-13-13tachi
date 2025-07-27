'use client';

import AllItems from '@/app/shopping/AllItems';
import { ProductType } from '@/types';
import { usePathname } from 'next/navigation';

export default function SearchItemsList({
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

  const searchProduts = products.filter(
    (
      item, // 검색어를 포함한 상품 목록 필터링
    ) => item.name?.includes(searchKeyword),
  );
  return (
    <>
      <h3 className="font-bold text-dark-green lg:text-3xl">
        &apos;{searchKeyword}&apos; 검색 결과
      </h3>
      <AllItems products={searchProduts} />
    </>
  );
}
