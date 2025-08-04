import CartList from '@/app/mypage/cart/CartList';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `장바구니 - UgVeg: 흙내음 상점`,
    description: `내 장바구니 목록을 확인하세요.`,
    openGraph: {
      title: `장바구니 - UgVeg: 흙내음 상점`,
      description: `내 장바구니 목록을 확인하세요.`,
      url: `/mypage/cart`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default async function Cart() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2">
        <h3 className="w-full text-xl font-semibold">장바구니</h3>
        <hr className="text-light-gray" />
      </div>
      <CartList />
    </div>
  );
}
