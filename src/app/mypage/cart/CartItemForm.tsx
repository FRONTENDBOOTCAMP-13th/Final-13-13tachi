'use client';
import Image from 'next/image';

import Button from '@/components/common/Button';
import { ProductItemType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useState } from 'react';

interface CartItemActionProps {
  deleteAction: (FormData: FormData) => void;
  quantityAction: (FormData: FormData) => void;
}

export default function CartItemForm({
  item,
  action,
}: {
  item: ProductItemType;
  action: CartItemActionProps;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useUserStore();

  const [quantity, setQuantity] = useState(item.quantity);

  const handleUp = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDown = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between lg:w-[49.375rem] lg:my-[30px]">
          <div className="flex flex-row items-center gap-[1.5625rem]">
            <label
              htmlFor={`inputCheckBox-${item._id}`}
              className="sr-only"
            ></label>
            <div className="flex flex-row lg:gap-3.5 lg:h-[6.25rem]">
              <Image
                width={100}
                height={100}
                src={`${API_URL}/${item.image?.path}`}
                alt={`${item.name} 이미지`}
                className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
              ></Image>
              <div className="flex flex-col justify-between">
                <div>
                  <>
                    <span className="lg:text-base font-semibold text-dark-green mr-0.5">
                      {item.name}
                    </span>
                    <span className="lg:text-sm">(350g)</span>
                  </>
                  <p className="lg:text-sm mt-1">{item.price}원</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-5 border-[0.0625rem] rounded-lg lg:w-20 lg:h-[1.875rem] p-1">
                  <form action={action.quantityAction}>
                    <input
                      type="hidden"
                      name="accessToken"
                      value={user?.token?.accessToken ?? ''}
                    />
                    <input type="hidden" name="_id" value={item._id} />
                    <input
                      type="hidden"
                      name="quantity"
                      value={item.quantity - 1}
                    />
                    <button
                      type="submit"
                      onClick={() => handleDown()}
                      className="lg:text-base font-semibold hover:cursor-pointer"
                    >
                      -
                    </button>
                  </form>
                  <span className="lg:text-sm">{quantity}</span>
                  <form action={action.quantityAction}>
                    <input
                      type="hidden"
                      name="accessToken"
                      value={user?.token?.accessToken ?? ''}
                    />
                    <input type="hidden" name="_id" value={item._id} />
                    <input
                      type="hidden"
                      name="quantity"
                      value={item.quantity + 1}
                    />
                    <button
                      type="submit"
                      onClick={() => handleUp()}
                      className="lg:text-base font-semibold hover:cursor-pointer"
                    >
                      +
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end gap-[1.5625rem]">
            <form action={action.deleteAction}>
              <input
                type="hidden"
                name="accessToken"
                value={user?.token?.accessToken ?? ''}
              />
              <input type="hidden" name="_id" value={item._id} />
              <Button size="sm" variant="white">
                삭제
              </Button>
            </form>
            <span className="lg:text-base font-semibold">
              {item.price * item.quantity}원
            </span>
          </div>
        </div>
        <hr className="text-light-gray w-full" />
      </div>
    </>
  );
}
