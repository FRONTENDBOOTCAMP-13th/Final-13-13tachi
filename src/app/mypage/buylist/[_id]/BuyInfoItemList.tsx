'use client';

import BuyInfoItem from '@/app/mypage/buylist/[_id]/BuyinfoItem';
import Button from '@/components/common/Button';
import CustomLink from '@/components/common/CustomLink';
import { OrderInfoItemType, ProductItemType } from '@/types';

export default function BuyInfoItemList({ item }: { item: OrderInfoItemType }) {
  return (
    <>
      <div className="flex flex-row justify-between text-sm mb-2.5">
        <p>
          <span className="mr-4 text-dark-green">{item.createdAt}</span>
          <span className="text-gray">주문번호:20230725-0001</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center border-1 rounded-lg border-light-gray lg:w-[49.875rem] p-[1.125rem]">
        <div className="flex flex-col w-full gap-[2.125rem]">
          {item.products.map((product: ProductItemType) => (
            <BuyInfoItem
              key={product._id}
              item={{
                _id: product._id,
                name: product.name,
                quantity: product.quantity,
                price: product.price,
              }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[1.875rem] mt-9 h-full">
        <div>
          <p className="text-xl font-semibold text-dark-green mb-6">배송지</p>
          <div className="flex flex-col border-1 rounded-lg border-light-gray p-5 gap-1.5">
            <p>성이름</p>
            <p>010-1234-5678</p>
            <p>
              {item.address} <span>(55050)</span>
            </p>
          </div>
        </div>
        <div className="h-full">
          <p className="text-xl font-semibold text-dark-green mb-6">
            결제 정보
          </p>
          <div className="flex flex-col border-1 rounded-lg border-light-gray px-5 py-8 gap-2">
            <p className="flex flex-row justify-between">
              <span>결제 금액</span>
              <span>{item.cost}원</span>
            </p>
            <p className="flex flex-row justify-between">
              <span>결제 수단</span>
              <span>신용카드</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-9 mt-[4.0625rem]">
        <Button size="xxl" variant="white">
          주문 취소하기
        </Button>
        <CustomLink href="/mypage/buylist">주문 내역으로 돌아가기</CustomLink>
      </div>
    </>
  );
}
