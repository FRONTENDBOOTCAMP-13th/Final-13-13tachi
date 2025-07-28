'use client';

import BuyInfoItem from '@/app/mypage/buylist/[_id]/BuyinfoItem';
import Button from '@/components/common/Button';
import CustomLink from '@/components/common/CustomLink';
import { OrderInfoItemType, ProductItemType } from '@/types';

interface BuyListActionProps {
  addAction: (FormData: FormData) => void;
}
export default function BuyInfoItemList({
  item,
  action,
}: {
  item: OrderInfoItemType;
  action: BuyListActionProps;
}) {
  return (
    <div className="lg:w-[49.875rem] md:w-[31.75rem] w-80">
      <div className="flex flex-row justify-between text-sm mb-2.5">
        <p>
          <span className="mr-4 text-dark-green">{item.createdAt}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center border-1 rounded-lg border-light-gray md:p-[1.125rem] p-3">
        <div className="flex flex-col w-full gap-[2.125rem]">
          {item.products.map((product: ProductItemType) => (
            <BuyInfoItem
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
          <p className="text-xl font-semibold text-dark-green mb-6">배송지</p>
          <div className="flex flex-col border-1 rounded-lg border-light-gray p-5 gap-1.5">
            <p>{item.user.name}</p>
            <p>{item.user.phone}</p>
            <p>
              {item.user.addressDetail1} {item.user.addressDetail2}{' '}
              <span>({item.user.postcode})</span>
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
              <span>{item.payment}</span>
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
    </div>
  );
}
