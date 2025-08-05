import OrderForm from '@/app/order/OrderForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `상품 주문 - UgVeg: 흙내음 상점`,
    description: `결제 정보를 입력하여 주문을 완료하세요.`,
    openGraph: {
      title: `상품 주문 - UgVeg: 흙내음 상점`,
      description: `결제 정보를 입력하여 주문을 완료하세요.`,
      url: `/order`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default function Order() {
  return (
    <Suspense>
      <main className="min-h-[calc(100dvh-26.125px)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <OrderForm />
      </main>
    </Suspense>
  );
}
