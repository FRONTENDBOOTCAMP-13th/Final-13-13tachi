'use client';
import Image from 'next/image';

import { ProductType } from '@/types';
import useUserStore from '@/zustand/useStore';
import Link from 'next/link';
import Button from '@/components/common/Button';
import CustomLink from '@/components/common/CustomLink';

interface CartItemActionProps {
  deleteAction: (FormData: FormData) => void;
}

export default function ProductItem({
  item,
  action,
}: {
  item: ProductType;
  action: CartItemActionProps;
}) {
  const { user } = useUserStore();

  return (
    <>
      <div className="flex flex-col  justify-center items-center">
        <div className="flex flex-col w-full lg:my-[30px] md:my-6 my-5">
          <div className="flex w-full justify-between">
            <div className="relative mr-[1.5625rem] md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 overflow-hidden rounded-lg flex-shrink-0">
              <Link
                href={`/shopping/${item._id}`}
                className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20"
              >
                <Image
                  fill
                  src={item.mainImages[0].path}
                  alt={`${item.name} 이미지`}
                  className="md:w-[6.25rem] md:h-[6.25rem] h-20 w-20 object-cover rounded-lg shadow-image transition-transform duration-300 hover:scale-110"
                ></Image>
              </Link>
            </div>
            <div className="flex flex-col gap-3.5 w-full ">
              <div className="grid md:grid-cols-[3fr_3fr_0fr] md:gird-rows-0 grid-cols-[1fr_1fr] grid-rows-1 md:gap-0 gap-4 justify-between md:h-[100px] h-[120px] w-full">
                <div className="flex flex-col justify-between">
                  <Link href={`/shopping/${item._id}`}>
                    <span className="md:text-base text-sm font-semibold text-dark-green line-clamp-1">
                      {item.name}
                    </span>
                    <span className="text-sm">{item.extra?.details}</span>
                  </Link>
                  <p className="md:text-base text-sm mt-1">
                    {item.price.toLocaleString()}원
                  </p>
                </div>
                <div className="flex flex-col justify-between md:text-base text-sm">
                  <span>총 수량 : {item.quantity}</span>
                  <span>판매량 : {item.buyQuantity}</span>
                  <span>남은 수량 : {item.quantity - item.buyQuantity}</span>
                </div>
                <div className="flex md:flex-col flex-row md:col-span-1 col-span-2 md:gap-0 gap-2 justify-between md:justify-around w-full">
                  <form action={action.deleteAction} className="w-full">
                    <input
                      type="hidden"
                      name="accessToken"
                      value={user?.token?.accessToken ?? ''}
                    />
                    <input type="hidden" name="_id" value={item._id} />
                    <Button size="xxs">삭제</Button>
                  </form>
                  <form action={action.deleteAction} className="w-full">
                    <input
                      type="hidden"
                      name="accessToken"
                      value={user?.token?.accessToken ?? ''}
                    />
                    <input type="hidden" name="_id" value={item._id} />
                    <CustomLink
                      href="/registProduct"
                      size="xxs"
                      variant="white"
                    >
                      수정
                    </CustomLink>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="text-light-gray w-full" />
      </div>
    </>
  );
}
