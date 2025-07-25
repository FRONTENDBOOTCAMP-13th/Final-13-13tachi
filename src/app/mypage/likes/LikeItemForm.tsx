'use client';

import Image from 'next/image';

// 임시 이미지 불러오기

import Button from '@/components/common/Button';
import { LikeItemProps } from '@/types';
import useUserStore from '@/zustand/useStore';

interface LikeItemActionProps {
  addAction: (FormData: FormData) => void;
  deleteAction: (FormData: FormData) => void;
}

export default function LikeItemForm({
  item,
  action,
}: {
  item: LikeItemProps;
  action: LikeItemActionProps;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useUserStore();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between lg:w-[49.875rem] border-1 border-light-gray lg:p-4.5 rounded-lg ">
        <div className="flex flex-row items-center gap-[1.5625rem]">
          <div className="flex flex-row items-center lg:gap-3.5 lg:h-[6.25rem]">
            <Image
              src={`${API_URL}/${item.mainImages[0].path}`}
              alt={`${item.name} 이미지`}
              width={100}
              height={100}
              className="lg:w-[6.25rem] lg:h-[6.25rem] object-cover rounded-lg shadow-image"
            ></Image>
            <div className="flex flex-col justufy-center lg:gap-2">
              <div>
                <span className="lg:text-base font-semibold text-dark-green mr-2.5">
                  {item.name}
                </span>
                <span className="lg:text-sm">({item.extra?.details})</span>
              </div>
              <p className="lg:text-sm">{item.price.toLocaleString()}원</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end lg:gap-2">
          <form action={action.addAction}>
            <input
              type="hidden"
              name="accessToken"
              value={user?.token?.accessToken ?? ''}
            />
            <input type="hidden" name="product_id" value={item.product_id} />
            <input type="hidden" name="quantity" value={+1} />
            <Button size="xxs" variant="green">
              장바구니 담기
            </Button>
          </form>
          <form action={action.deleteAction}>
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
