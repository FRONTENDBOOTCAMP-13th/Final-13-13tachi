import WishList from '@/app/mypage/wish/WishList';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `내가 찜한 상품 - UgVeg: 흙내음 상점`,
    description: `내가 찜한 상품 목록을 확인하세요.`,
    openGraph: {
      title: `내가 찜한 상품 - UgVeg: 흙내음 상점`,
      description: `내가 찜한 상품 목록을 확인하세요.`,
      url: `/mypage/wish`,
      images: {
        url: '/UgVeg.png',
      },
    },
  };
}

export default async function Wish() {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-col gap-2">
        <h3 className="w-full text-xl font-semibold">내가 찜한 상품</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <WishList />
    </div>
  );
}
