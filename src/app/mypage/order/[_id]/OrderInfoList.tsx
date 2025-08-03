'use client';

import OrderInfoItem from '@/app/mypage/order/[_id]/OrderInfoItem';
import Button from '@/components/common/Button';
import CustomLink from '@/components/common/CustomLink';
import { OrderInfoItemType, ProductItemType } from '@/types';

interface BuyListActionProps {
  addAction: (FormData: FormData) => void;
}

export default function OrderInfoList({
  item,
  action,
}: {
  item: OrderInfoItemType;
  action: BuyListActionProps;
}) {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between text-sm mb-2.5">
        <p>
          <span className="mr-4 text-dark-green">{item.createdAt}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center border-1 rounded-lg border-light-gray md:p-[1.125rem] p-3">
        <div className="flex flex-col w-full gap-[2.125rem]">
          {item.products.map((product: ProductItemType) => (
            <OrderInfoItem
              key={product._id}
              item={{
                _id: product._id,
                name: product.name,
                quantity: product.quantity,
                price: product.price,
                image: product.image,
                extra: product.extra,
              }}
              action={action}
            />
          ))}
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-[1.875rem] flex flex-col gap-5 lg:mt-9 mt-8 h-full">
        <div>
          <p className="text-xl font-semibold text-dark-green lg:mb-6 mb-3">
            배송 정보
          </p>
          <div className="flex flex-col border-1 rounded-lg border-light-gray p-4 gap-1.5">
            <p>{item.user.name}</p>
            <p>{item.user.phone}</p>
            <p>
              {item.user.addressDetail1} {item.user.addressDetail2}{' '}
              <span>({item.user.postcode})</span>
            </p>
            {item.user.message && (
              <p className="text-gray text-sm">
                배송 요청사항 : {item.user.message}
              </p>
            )}
          </div>
        </div>
        <div className="h-full">
          <p className="text-xl font-semibold text-dark-green lg:mb-6 mb-3">
            결제 정보
          </p>
          <div className="flex flex-col border-1 rounded-lg border-light-gray px-4 py-8 gap-2">
            <p className="flex flex-row justify-between">
              <span>결제 금액</span>
              <span>{item.cost}원</span>
            </p>
            <p className="flex flex-row justify-between">
              <span>결제 수단</span>
              <span>{item.payment}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-9 mt-[4.0625rem]">
        <Button size="xxl" variant="white">
          주문 취소하기
        </Button>
        <CustomLink href="/mypage/buylist" size="xxl">
          <span className="hidden md:inline">주문 내역으로&nbsp;</span>
          <span>돌아가기</span>
        </CustomLink>
      </div>
    </div>
  );
}
