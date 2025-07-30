'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { ApiRes, LikeItemType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { getLikeProducts } from '@/data/functions/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export default function AllItems() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const allItems = data ? data.pages.flatMap(page => page.item) : [];

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

  return (
    <>
      <div className="lg:mt-[1.5625rem] lg:flex lg:justify-between lg:items-center">
        <ul className="font-semibold text-dark-green lg:flex lg:gap-2.5">
          {AllItemCategory}
        </ul>
        <button
          type="button"
          className="font-semibold text-dark-green cursor-pointer"
        >
          정렬기준
        </button>
      </div>
      <ProductCard
        filteredItems={filteredItems}
        likeRes={likeRes!}
        accessToken={accessToken!}
        user={user}
      />
      {hasNextPage ? (
        <p
          ref={ref}
          className="w-full text-center text-dark-green font-semibold lg:mt-[4.026rem] lg:text-3xl"
        >
          더보기
        </p>
      ) : null}
    </>
  );
}
