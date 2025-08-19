import ProductList from '@/app/mypage/product/ProductList';
import { Metadata } from 'next';
import Link from 'next/link';

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

export default async function Product() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-semibold">상품 관리</h3>
          <Link
            href="/registProduct"
            className="text-dark-green font-semibold text-xs md:text-sm lg:text-base"
          >
            + 상품 등록하기
          </Link>
        </div>
        <hr className="text-light-gray" />
      </div>
      <ProductList />
    </div>
  );
}
