'use client';

import Image from 'next/image';
import Button from '@/components/common/Button';
import { LikeItemProps } from '@/types';
import useUserStore from '@/zustand/useStore';
import Link from 'next/link';

interface LikeItemActionProps {
  addAction: (FormData: FormData) => void;
  deleteAction: (FormData: FormData) => void;
}

export default function WishItem({
  item,
  action,
}: {
  item: LikeItemProps;
  action: LikeItemActionProps;
}) {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex md:flex-row md:justify-between flex-col w-full border-1 border-light-gray md:p-4.5 p-2.5 rounded-lg gap-5">
        <div className="flex flex-row items-center gap-[1.5625rem]">
          <div className="flex flex-row items-center gap-3.5 md:h-[6.25rem]">
            <Link
              href={`/shopping/${item._id}`}
              className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 overflow-hidden rounded-lg"
            >
              <Image
                width={100}
                height={100}
                src={item.mainImages[0]?.path}
                alt={`${item.name} 이미지`}
                className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 object-cover rounded-lg shadow-image transition-transform duration-300 hover:scale-110"
              ></Image>
            </Link>
            <div className="flex flex-col justufy-center gap-2">
              <Link href={`/shopping/${item._id}`}>
                <span className="md:text-base text-sm font-semibold text-dark-green mr-2.5">
                  {item.name}
                </span>
                <span className="text-xs">({item.extra?.details})</span>
              </Link>
              <p className="md:text-base text-sm">
                {item.price.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
        <div className="md:flex md:flex-col md:justify-center md:items-end grid grid-cols-2 justify-around gap-2">
          <form action={action.addAction}>
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
