'use client';
import Image from 'next/image';

import { ProductItemType } from '@/types';

export default function OrderItemForm({ item }: { item: ProductItemType }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      <div className="flex flex-row items-center md:gap-[1.875rem] md:h-[6.25rem] h-20">
        <Image
          src={item.image ? `${API_URL}/${item.image.path}` : '/fallback.png'}
          width={100}
          height={100}
          alt="상품이미지"
          className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 object-cover rounded-lg shadow-image"
        ></Image>
        <div className="flex flex-col justufy-center">
          <p className="lg:text-base font-semibold">
            <span className=" mr-1">{item.name}</span>
            <span className="lg:text-xs font-medium mr-2.5">
              {' '}
              ({item.extra?.details})
            </span>
            <span>{item.quantity}</span>
            <span>개</span>
          </p>
          <p>
            <span className="lg:text-sm">
              {(item.price * item.quantity).toLocaleString()}원
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
