'use client';

import OrderItemForm from '@/app/order/OrderItemForm';
import { getCartProducts } from '@/data/functions/post';
import { ApiResCart, CartItemType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useEffect, useState } from 'react';

export default function OrderList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const [res, setRes] = useState<ApiResCart<CartItemType[]> | null>(null);

  useEffect(() => {
    if (accessToken) {
      getCartProducts(accessToken).then(setRes);
    }
  }, [accessToken]);

  return (
    <>
      {' '}
      {res?.ok ? (
        res.item.map((item: CartItemType) => (
          <OrderItemForm
            key={item._id}
            item={{
              _id: item._id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
              image: item.product.image,
              extra: item.product.extra,
            }}
          />
        ))
      ) : (
        <p>{}</p>
      )}
    </>
  );
}
