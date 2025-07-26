'use client';
import Image from 'next/image';

import { ProductItemType } from '@/types';
import useUserStore from '@/zustand/useStore';
import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

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
      <div className="flex flex-col  justify-center items-center">
        <div className="flex flex-col w-full lg:my-[30px] md:my-6 my-5">
          <div className="flex w-full justify-between">
            <div className="relative mr-[1.5625rem] md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 flex-shrink-0">
              <Link
                href={`/shopping/${item._id}`}
                className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20"
              >
                <Image
                  fill
                  src={`${API_URL}/${item.image?.path}`}
                  alt={`${item.name} 이미지`}
                  className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 object-cover rounded-lg shadow-image"
                ></Image>
              </Link>
            </div>
            <div className="flex flex-col gap-3.5 w-full">
              <div className="flex flex-row justify-between">
                <div>
                  <div>
                    <span className="md:text-base text-sm font-semibold text-dark-green line-clamp-1">
                      {item.name}
                      <span className="ml-2.5 text-xs">
                        ({item.extra?.details})
                      </span>
                    </span>
                  </div>
                  <p className="md:text-base text-sm mt-1">
                    {item.price.toLocaleString()}원
                  </p>
                </div>
                <form action={action.deleteAction}>
                  <input
                    type="hidden"
                    name="accessToken"
                    value={user?.token?.accessToken ?? ''}
                  />
                  <input type="hidden" name="_id" value={item._id} />
                  <button>
                    <X color="gray" />
                  </button>
                </form>
              </div>
              <div className="flex flex-row justify-between gap-[1.5625rem]">
                <div className="flex flex-row justify-center items-center md:gap-5 gap-3 border-[0.0625rem] rounded-lg md:w-20 md:h-[1.875rem] w-16 h-6 p-1">
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
                      className="text-base font-semibold hover:cursor-pointer"
                    >
                      -
                    </button>
                  </form>
                  <span className="text-sm">{quantity}</span>
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
                      className="text-base font-semibold hover:cursor-pointer"
                    >
                      +
                    </button>
                  </form>
                </div>
                <span className="md:text-base text-sm font-semibold">
                  {(item.price * item.quantity).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-light-gray w-full" />
      </div>
    </>
  );
}
