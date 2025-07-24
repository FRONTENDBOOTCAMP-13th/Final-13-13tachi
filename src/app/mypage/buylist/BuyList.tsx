'use client';
// import Image from 'next/image';

// 임시 이미지 불러오기
// import profilePic from '../../../images/profile.jpg';
// import Button from '@/components/common/Button';
import BuyItemList from '@/app/mypage/buylist/BuyItemList';
import EmptyBuyList from '@/app/mypage/buylist/EmptyBuyList';
import { BuyProducts } from '@/data/functions/post';
import { ApiRes, BuyListType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useEffect, useState } from 'react';

export default function BuyList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const [res, setRes] = useState<ApiRes<BuyListType[]> | null>(null);

  useEffect(() => {
    if (accessToken) {
      BuyProducts(accessToken).then(setRes);
    }
  }, [accessToken]);

  if (!accessToken) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!res) {
    return <div>로딩중...</div>;
  }
  if (res.ok && res.item.length === 0) {
    return (
      <div className="h-full">
        <EmptyBuyList />
      </div>
    );
  }
  console.log('1번 호출');
  return (
    <div className="flex flex-col mb-9">
      {res.ok ? (
        res.item.map((item: BuyListType) => (
          <BuyItemList
            key={item._id}
            item={{
              _id: item._id,
              createdAt: item.createdAt,
              products: item.products,
            }}
          />
        ))
      ) : (
        <p>{res.message}</p>
      )}
    </div>
  );
}
