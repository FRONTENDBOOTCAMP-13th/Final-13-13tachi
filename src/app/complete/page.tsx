import OrderNum from '@/app/complete/OrderNum';
import CustomLink from '@/components/common/CustomLink';
import Image from 'next/image';
import { Suspense } from 'react';

export default function Complete() {
  return (
    <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <div className="flex flex-col items-center gap-[1.5625rem] mt-[10.9375rem] mb-[13.6875rem]">
        <Image
          src="/check-circle.svg"
          alt="원형체크"
          width={68}
          height={69}
        ></Image>
        <h2 className="md:text-2xl text-xl font-bold ">
          결제가 완료되었습니다!
        </h2>
        <div className="flex flex-col md:flex-row md:text-lg text-base font-bold text-light-green ">
          <span>주문이 성공적으로 처리되었습니다.&nbsp;</span>
          <span>약 2일 안에 배송이 시작될 것입니다.</span>
        </div>
        <Suspense>
          <OrderNum />
        </Suspense>
        <CustomLink href="/" size="xxl">
          홈으로 돌아가기
        </CustomLink>
      </div>
    </main>
  );
}
