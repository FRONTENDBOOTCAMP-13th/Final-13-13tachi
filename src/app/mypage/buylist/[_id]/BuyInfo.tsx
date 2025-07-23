'use client';
import BuyInfoItemList from '@/app/mypage/buylist/[_id]/BuyInfoItemList';
// import Image from 'next/image';

// 임시 이미지 불러오기
// import profilePic from '../../../images/profile.jpg';
// import Button from '@/components/common/Button';
import { getOrderInfo } from '@/data/functions/post';
import { ApiRes, OrderInfoType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useEffect, useState } from 'react';

export default function BuyInfo({ orderId }: { orderId: number }) {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const [res, setRes] = useState<ApiRes<OrderInfoType> | null>(null);
  useEffect(() => {
    if (accessToken) {
      getOrderInfo(accessToken, orderId).then(setRes);
    }
  }, [accessToken, orderId]);

  if (!accessToken) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!res) {
    return <div>로딩중...</div>;
  }
  if (res.ok === 0) {
    return <div>{res.message}</div>; // 실패 메시지 렌더링
  }

  console.log('1번 호출');
  console.log(orderId);

  return (
    <BuyInfoItemList
      item={{
        _id: res.item._id,
        products: res.item.products,
        createdAt: res.item.createdAt,
        address: res.item.address.value,
        cost: res.item.cost.total,
      }}
    />
  );
}
