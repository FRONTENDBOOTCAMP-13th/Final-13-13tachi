import OrderNum from '@/app/complete/OrderNum';
import CustomLink from '@/components/common/CustomLink';
import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `주문 완료 - UgVeg: 흙내음 상점`,
    description: `상품 주문이 완료되었습니다.`,
    openGraph: {
      title: `주문 완료 - UgVeg: 흙내음 상점`,
      description: `상품 주문이 완료되었습니다.`,
      url: `/complete`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default function Complete() {
  return (
    <main className="flex flex-col justify-center min-h-[calc(100dvh-26.125rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)] lg:px-0 md:px-[1.875rem] px-5 lg:pt-[4.0625rem] lg:pb-[6.25rem] md:pt-[3.125rem] md:pb-20 pt-[1.875rem] pb-[3.75rem]">
      <div className="flex flex-col items-center gap-4">
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
