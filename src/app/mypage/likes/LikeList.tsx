'use client';

import EmptyLikes from '@/app/mypage/likes/EmptyLikes';
import LikeItemForm from '@/app/mypage/likes/LikeItemForm';

import { getLikeProducts } from '@/data/functions/post';
import { ApiRes, LikeItemType } from '@/types';
import useUserStore from '@/zustand/useStore';

import { useEffect, useState } from 'react';

export default function LikeList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const [res, setRes] = useState<ApiRes<LikeItemType[]> | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    getLikeProducts(accessToken)
      .then(res => {
        console.log('찜 데이터:', res);
        setRes(res);
      })
      .catch(err => {
        console.error('찜 가져오기 실패:', err);
        setRes({ ok: 0, message: '에러 발생!' });
      });
  }, [accessToken]);

  if (!accessToken) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!res) {
    return <div>로딩중...</div>;
  }

  const items =
    res &&
    Object.entries(res)
      .filter(([key]) => key !== 'ok')
      .map(([, value]) => value as LikeItemType);

  if (res.ok && items.length === 0) {
    return (
      <div className="h-full">
        <EmptyLikes />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {res.ok ? (
        items.map((item: LikeItemType) => (
          <LikeItemForm
            key={item._id}
            item={{
              _id: item._id,
              price: item.product?.price,
              name: item.product?.name,
              image: item.product.image,
            }}
          />
        ))
      ) : (
        <p>{res.message}</p>
      )}
    </div>
  );
}
