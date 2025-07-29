'use client';

import OrderItemForm from '@/app/order/OrderItemForm';
import { CartItemType } from '@/types';

interface OrderListType {
  items: CartItemType[];
}

export default function OrderList({ items }: OrderListType) {
  return (
    <>
      {items.map((item: CartItemType) => (
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
      ))}
    </>
  );
}
