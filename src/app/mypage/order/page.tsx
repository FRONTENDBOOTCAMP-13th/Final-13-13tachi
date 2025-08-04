import OrderList from '@/app/mypage/order/OrderList';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `주문 내역 - UgVeg: 흙내음 상점`,
    description: `내 주문 내역을 확인하세요.`,
    openGraph: {
      title: `주문 내역 - UgVeg: 흙내음 상점`,
      description: `내 주문 내역을 확인하세요.`,
      url: `/mypage/order`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default async function Order() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-2 mb-[1.875rem]">
        <h3 className="w-full text-xl font-semibold">주문내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <OrderList />
    </div>
  );
}
