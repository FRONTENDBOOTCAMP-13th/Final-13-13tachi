'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { ApiRes, LikeItemType, ProductType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { getLikeProducts } from '@/data/functions/post';

export default function AllItems({ products }: { products: ProductType[] }) {
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

  // 아이템 필터링
  const filteredItems =
    activeTab === '전체'
      ? products
      : products.filter(item => item.extra?.category?.includes(activeTab));

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
    </>
  );
}
