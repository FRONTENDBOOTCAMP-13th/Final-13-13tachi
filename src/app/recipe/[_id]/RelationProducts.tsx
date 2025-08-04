'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { ApiRes, LikeItemType, ProductType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { getLikeProducts } from '@/data/functions/product';

interface RelationProductsProps {
  relatedProducts: ProductType[];
}

export default function RelationProducts({
  relatedProducts,
}: RelationProductsProps) {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken ?? '';
  const [likeRes, setLikeRes] = useState<ApiRes<LikeItemType[] | null>>({
    ok: 0,
    message: '로그인이 필요합니다',
  });

  useEffect(() => {
    if (!accessToken) {
      setLikeRes({ ok: 0, message: '로그인이 필요합니다' });
      return;
    }

    getLikeProducts(accessToken).then(res => {
      setLikeRes(res);
    });
  }, [accessToken]);

  if (!user) {
    return (
      <div className="mt-10 p-4 border rounded bg-yellow-50 text-center">
        <p className="mb-2">로그인이 필요합니다.</p>
        {/* 로그인 페이지 링크 등 추가 가능 */}
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return <p className="mt-10">관련된 상품이 없습니다.</p>;
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold">연관상품</h3>
      <div className="mt-5">
        <ProductCard
          filteredItems={relatedProducts.slice(0, 4)}
          likeRes={likeRes}
          accessToken={accessToken}
          user={user}
        />
      </div>
    </div>
  );
}
