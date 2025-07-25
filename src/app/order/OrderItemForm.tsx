'use client';
import Image from 'next/image';

import { ProductItemType } from '@/types';

export default function OrderItemForm({ item }: { item: ProductItemType }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      <div className="flex flex-row items-center lg:gap-[1.875rem] lg:h-[6.25rem]">
        <Image
          src={item.image ? `${API_URL}/${item.image.path}` : '/fallback.png'}
          width={100}
          height={100}
          alt="상품이미지"
          className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
        ></Image>
        <div className="flex flex-col justufy-center">
          <p className="lg:text-base font-semibold">
            <span className=" mr-1">{item.name}</span>
            <span className="lg:text-xs font-medium mr-2.5">(350g)</span>
            <span>{item.quantity}</span>
            <span>개</span>
          </p>
          <p>
            <span className="lg:text-sm">{item.price * item.quantity}원</span>
          </p>
        </div>
      </div>
    </>
  );
}
