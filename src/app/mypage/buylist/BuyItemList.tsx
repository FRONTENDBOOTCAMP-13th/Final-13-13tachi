'use client';
import BuyItem from '@/app/mypage/buylist/BuyItem';
// import Image from 'next/image';

// 임시 이미지 불러오기
// import profilePic from '../../../images/profile.jpg';
// import Button from '@/components/common/Button';

import { BuyItemListType, ProductItemType } from '@/types';
import Link from 'next/link';

export default function BuyItemList({ item }: { item: BuyItemListType }) {
  return (
    <div className="mb-9">
      <div className="flex flex-row justify-between text-sm mb-2.5">
        <p>
          <span className="mr-4 text-dark-green">{item.createdAt}</span>
          <span className="text-gray">주문번호:20230725-0001</span>
        </p>
        <Link href={`/mypage/buylist/${item._id}`} className="text-dark-green">
          상세조회
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center border-1 rounded-lg border-light-gray lg:w-[49.875rem] p-[1.125rem]">
        <div className="flex flex-col w-full gap-[2.125rem]">
          {item.products.map((product: ProductItemType) => (
            <BuyItem
              key={product._id}
              item={{
                _id: product._id,
                name: product.name,
                quantity: product.quantity,
                price: product.price,
                image: product.image,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
