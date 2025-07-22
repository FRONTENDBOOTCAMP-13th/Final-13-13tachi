'use client';

import { useEffect, useState } from 'react';
import { getCartProducts } from '@/data/functions/post';
import Button from '@/components/common/Button';
import { CartItemType, ApiRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import CartItemForm from '@/app/mypage/cart/CartItemForm';

export default function CartList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const [res, setRes] = useState<ApiRes<CartItemType[]> | null>(null);

  useEffect(() => {
    if (accessToken) {
      getCartProducts(accessToken).then(setRes);
    }
  }, [accessToken]);

  if (!accessToken) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!res) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      {res.ok ? (
        res.item.map((item: CartItemType) => (
          <CartItemForm
            key={item._id}
            item={{
              _id: item._id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            }}
          />
        ))
      ) : (
        <p>{res.message}</p>
      )}
      <p className="text-right lg:mt-[1.875rem] lg:text-lg font-semibold">
        총 상품 금액 <span className="text-[#8B0505]">59,900</span>원
      </p>
      <div className="flex justify-center">
        <Button size="xxl" variant="green">
          주문하기
        </Button>
      </div>
    </>
  );
}
