'use client';
import Image from 'next/image';

// 임시 이미지 불러오기
import profilePic from '../../../images/profile.jpg';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import { ProductType } from '@/types';
import useCounterStore from '@/zustand/counter';
import React, { useEffect } from 'react';

export default function CartList({ product }: { product: ProductType }) {
  const countUp = useCounterStore(state => state.countUp);
  const countDown = useCounterStore(state => state.countDown);
  const count = useCounterStore(state => state.count);

  useEffect(() => {
    console.log('#### 리렌더링.');
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between lg:w-[49.375rem] lg:my-[30px]">
        <div className="flex flex-row items-center gap-[1.5625rem]">
          <label
            htmlFor={`inputCheckBox-${product._id}`}
            className="sr-only"
          ></label>
          <Checkbox id={`inputCheckBox-${product._id}`} value={product.price} />
          <div className="flex flex-row lg:gap-3.5 lg:h-[6.25rem]">
            <Image
              src={profilePic}
              alt="상품이미지"
              width={100}
              height={100}
              className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
            ></Image>
            <div className="flex flex-col justify-between">
              <div>
                <>
                  <span className="lg:text-base font-semibold text-dark-green mr-0.5">
                    {product.name}
                  </span>
                  <span className="lg:text-sm">(350g)</span>
                </>
                <p className="lg:text-sm mt-1">{product.price}</p>
              </div>
              <div className="flex flex-row justify-center items-center gap-5 border-[0.0625rem] rounded-lg lg:w-20 lg:h-[1.875rem] p-1">
                <button
                  className="lg:text-base font-semibold hover:cursor-pointer"
                  onClick={e => {
                    e.preventDefault();
                    countDown(1);
                  }}
                >
                  -
                </button>
                <span className="lg:text-sm">{count}</span>
                <button
                  className="lg:text-base font-semibold hover:cursor-pointer"
                  onClick={e => {
                    e.preventDefault();
                    countUp(1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end gap-[1.5625rem]">
          <Button size="sm" variant="white">
            삭제
          </Button>
          <span className="lg:text-base font-semibold">
            {product.price * count}
          </span>
        </div>
      </div>
      <hr className="text-light-gray w-full" />
    </div>
  );
}
