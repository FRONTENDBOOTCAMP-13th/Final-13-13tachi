'use client';
// import Image from 'next/image';

// 임시 이미지 불러오기
// import profilePic from '../../../images/profile.jpg';
// import Button from '@/components/common/Button';
import BuyItemList from '@/app/mypage/buylist/BuyItemList';
import EmptyBuyList from '@/app/mypage/buylist/EmptyBuyList';
import { AddCart } from '@/data/actions/cart';
import { BuyProducts } from '@/data/functions/post';
import { ApiRes, BuyListType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function BuyList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const router = useRouter();

  const [res, setRes] = useState<ApiRes<BuyListType[]> | null>(null);
  const [addState, AddAction, isAdding] = useActionState(AddCart, null);
  console.log(isAdding);

  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      // accessToken이 아직 로드 중이라면 아무것도 하지 않음
      return;
    }
    if (accessToken) {
      BuyProducts(accessToken).then(setRes);
    } else {
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      }).then(result => {
        if (result.isConfirmed) router.replace('/login');
      });
    }
  }, [accessToken]);

  useEffect(() => {
    if (addState?.ok) {
      if (accessToken) {
        Swal.fire({
          icon: 'success',
          text: '장바구니에 담겼습니다',
          confirmButtonText: '확인',
        });
      }
    }
  }, [addState]);

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
            action={{ addAction: AddAction }}
          />
        ))
      ) : (
        <p>{res.message}</p>
      )}
    </div>
  );
}
