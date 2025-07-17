'use client';

import { useEffect, useState } from 'react';
import { getCartProducts } from '@/data/functions/post';
import CartList from './CartList'; // 실제 경로 맞게
import Button from '@/components/common/Button';
import { ApiCartItem, ApiRes } from '@/types';
import useUserStore from '@/zustand/useStore';

export default function CartForm() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const [res, setRes] = useState<ApiRes<ApiCartItem[]> | null>(null);

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
    <form>
      <fieldset>
        {res.ok ? (
          res.item.map((item: ApiCartItem) => (
            <CartList
              key={item._id}
              product={{
                _id: item._id,
                name: item.product.name,
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
      </fieldset>
    </form>
  );
}
