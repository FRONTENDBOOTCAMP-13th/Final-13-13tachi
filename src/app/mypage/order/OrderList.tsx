'use client';

import EmptyOrder from '@/app/mypage/order/EmptyOrder';
import Loading from '@/app/mypage/order/Loading';
import OrderItemList from '@/app/mypage/order/OrderItemList';
import { AddCart } from '@/data/actions/cart';
import { BuyProducts } from '@/data/functions/order';
import { ApiRes, BuyListType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function OrderList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const router = useRouter();

  const [res, setRes] = useState<ApiRes<BuyListType[]> | null>(null);
  const [addState, AddAction] = useActionState(AddCart, null);

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
    return <Loading />;
  }
  if (res.ok && res.item.length === 0) {
    return (
      <div className="h-full">
        <EmptyOrder />
      </div>
    );
  }

  // if (res.ok === 0) {
  //   router.replace('/error'); // 실패 메시지 렌더링
  // }

  return (
    <div className="flex flex-col mb-9 w-full">
      {res.ok ? (
        res.item.map((item: BuyListType) => (
          <OrderItemList
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
