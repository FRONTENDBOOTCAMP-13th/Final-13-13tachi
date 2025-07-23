'use client';
// import Image from 'next/image';

// 임시 이미지 불러오기
// import profilePic from '../../../images/profile.jpg';
// import Button from '@/components/common/Button';
import BuyItemList from '@/app/mypage/buylist/BuyItemList';
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
  console.log('1번 호출');
  return (
    <>
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
    </>
  );
}
