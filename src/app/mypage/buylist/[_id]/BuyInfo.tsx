'use client';
import BuyInfoItemList from '@/app/mypage/buylist/[_id]/BuyInfoItemList';
import Loading from '@/app/mypage/buylist/[_id]/Loading';
import { AddCart } from '@/data/actions/cart';
// import Image from 'next/image';

// 임시 이미지 불러오기
// import profilePic from '../../../images/profile.jpg';
// import Button from '@/components/common/Button';
import { getOrderInfo } from '@/data/functions/post';
import { ApiRes, OrderInfoType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function BuyInfo({ orderId }: { orderId: number }) {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const [res, setRes] = useState<ApiRes<OrderInfoType> | null>(null);
  const router = useRouter();
  const [addState, AddAction, isAdding] = useActionState(AddCart, null);
  console.log(isAdding);
  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      // accessToken이 아직 로드 중이라면 아무것도 하지 않음
      return;
    }
    if (accessToken) {
      getOrderInfo(accessToken, orderId).then(setRes);
    } else {
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      }).then(result => {
        if (result.isConfirmed) router.replace('/login');
      });
    }
  }, [accessToken, orderId]);

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
    return <Loading />;
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
        user: res.item.user,
        cost: res.item.cost.total,
        payment: res.item.payment,
      }}
      action={{ addAction: AddAction }}
    />
  );
}
