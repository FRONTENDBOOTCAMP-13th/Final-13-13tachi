'use client';

import Image from 'next/image';

// 임시 이미지 불러오기
import profilePic from '../../../images/profile.jpg';

import Button from '@/components/common/Button';
import { LikeItemProps } from '@/types';
import { useActionState } from 'react';
import { AddCart, deleteLike } from '@/data/actions/cart';
import useUserStore from '@/zustand/useStore';

export default function LikeItemForm({ item }: { item: LikeItemProps }) {
  const { user } = useUserStore();
  const [addState, AddAction, isAdding] = useActionState(AddCart, null);
  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteLike,
    null,
  );
  console.log(deleteState, isDeleting);
  console.log(addState, isAdding);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between lg:w-[49.875rem] border-1 border-light-gray lg:p-4.5 rounded-lg ">
        <div className="flex flex-row items-center gap-[1.5625rem]">
          <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
            <Image
              src={profilePic}
              alt="상품이미지"
              width={100}
              height={100}
              className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
            ></Image>
            <div className="flex flex-col justufy-center lg:gap-2">
              <div>
                <span className="lg:text-base font-semibold text-dark-green mr-0.5">
                  {item.name}
                </span>
                <span className="lg:text-sm">(350g)</span>
              </div>
              <p className="lg:text-sm">{item.price}원</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end lg:gap-2">
          <form action={AddAction}>
            <input
              type="hidden"
              name="accessToken"
              value={user?.token?.accessToken ?? ''}
            />
            <input type="hidden" name="product_id" value={item._id} />
            <input type="hidden" name="quantity" value={+1} />
            <Button size="xxs" variant="green">
              장바구니 담기
            </Button>
          </form>
          <form action={deleteAction}>
            <input
              type="hidden"
              name="accessToken"
              value={user?.token?.accessToken ?? ''}
            />
            <input type="hidden" name="_id" value={item._id} />
            <Button size="xxs" variant="white">
              삭제
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
