'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { ApiRes, LikeItemType, ProductType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import CustomLink from '@/components/common/CustomLink';
import LoadingAll from '@/app/shopping/LoadingAll';
import { getLikeProducts } from '@/data/functions/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

type AllItemsProps = {
  products?: ProductType[];
  searchKeyword?: string;
};

export default function AllItems({ products, searchKeyword }: AllItemsProps) {
  const { user } = useUserStore(); // 로그인 정보
  const accessToken = user?.token?.accessToken; // accessToken 값

  const [likeRes, setLikeRes] = useState<ApiRes<LikeItemType[]> | null>(null); // 좋아요 목록 최신 상태 관리

  // 쿼리스트링에서 tab 값 읽기
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab');
  const categories = ['전체', '채소', '과일'];

  // tabParam이 categories에 포함되어 있으면 그 값, 아니면 '전체'로 초기화
  const initialTab =
    tabParam && categories.includes(tabParam) ? tabParam : '전체';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    // 쿼리스트링이 바뀔 때 activeTab도 변경
    if (tabParam && categories.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

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

  // ST: 무한스크롤
  const handleGetProducts = async (page: number) => {
    try {
      const res = await fetch(`${API_URL}/products?limit=12&page=${page}`, {
        headers: {
          'Client-Id': CLIENT_ID,
        },
      });
      return res.json();
    } catch (e) {
      console.error(e);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['product-list'],
      queryFn: ({ pageParam = 1 }) => handleGetProducts(pageParam),
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        if (lastPage.pagination.page < lastPage.pagination.totalPages) {
          return lastPage.pagination.page + 1;
        }
        return undefined;
      },
    });

  // product 프롭스가 있으면 그걸 사용, 없으면 data 사용
  const allItems =
    products ?? (data ? data.pages.flatMap(page => page.item) : []);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  // ED: 무한스크롤

  // 아이템 필터링
  const filteredItems =
    activeTab === '전체'
      ? allItems
      : allItems.filter(item => item.extra?.category?.includes(activeTab));

  // 카테고리 탭 active
  const AllItemCategory = categories.map((category, i) => (
    <li key={i}>
      <button
        type="button"
        onClick={() => setActiveTab(category)}
        className={`cursor-pointer ${
          activeTab === category
            ? 'text-orange font-semibold'
            : 'text-dark-green font-semibold'
        }`}
      >
        {category}
      </button>
    </li>
  ));

  if (!data) {
    return <LoadingAll />;
  }

  return (
    <>
      <div className="mt-[1.5625rem]">
        <ul className="flex gap-2.5 font-semibold text-dark-green text-sm md:text-base">
          {AllItemCategory}
        </ul>
      </div>
      {products && filteredItems.length === 0 ? (
        <div className="text-center py-6 md:py-10 lg:py-12">
          <Search className="mx-auto h-12 w-12 mb-4 text-gray-300 md:h-14 md:w-14 lg:h-16 lg:w-16" />
          <p className="text-gray-600 mb-2 text-sm md:text-base">
            &quot;{searchKeyword}&quot;에 대한 검색 결과가 없습니다.
          </p>
          <p className="text-gray-500 text-sm md:text-base">
            다른 검색어를 사용하거나 전체 상품을 확인해보세요.
          </p>
          <div className="mt-7.5 md:mt-12.5 lg:mt-[4.0625rem]">
            <CustomLink href="/shopping" variant="orange" size="xl">
              전체 상품 보기
            </CustomLink>
          </div>
        </div>
      ) : (
        <ProductCard
          filteredItems={filteredItems}
          likeRes={likeRes!}
          accessToken={accessToken!}
          user={user}
        />
      )}

      {hasNextPage && filteredItems.length !== 0 ? (
        <p
          ref={ref}
          className="mt-7.5 w-full text-center text-dark-green font-semibold text-lg md:mt-12.5 md:text-2xl lg:mt-[4.026rem] lg:text-3xl"
        >
          더보기
        </p>
      ) : null}
    </>
  );
}
