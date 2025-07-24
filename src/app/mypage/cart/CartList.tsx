'use client';

import { useEffect, useState } from 'react';
import { getCartProducts } from '@/data/functions/post';
import { CartItemType, ApiRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import CartItemForm from '@/app/mypage/cart/CartItemForm';
import EmptyCart from '@/app/mypage/cart/EmptyCart';
import CustomLink from '@/components/common/CustomLink';

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
  if (res.ok && res.item.length === 0) {
    return (
      <div className="h-full">
        <EmptyCart />
      </div>
    );
  }
  if (res.ok === 0) {
    return <div>{res.message}</div>; // 실패 메시지 렌더링
  }
  const totalPrice = res.item.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

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
              image: item.product.image,
            }}
          />
        ))
      ) : (
        <p>{}</p>
      )}
      <p className="text-right lg:mt-[1.875rem] lg:text-lg font-semibold">
        총 상품 금액 <span className="text-[#8B0505]">{totalPrice}</span>원
      </p>
      <div className="flex justify-center">
        <form>
          <CustomLink href="/order">주문하기</CustomLink>
        </form>
      </div>
    </>
  );
}
