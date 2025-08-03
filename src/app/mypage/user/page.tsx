import UserInfo from '@/app/mypage/user/UserInfo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `회원 정보 - UgVeg: 흙내음 상점`,
    description: `내 회원 정보를 확인하세요`,
    openGraph: {
      title: `회원정보 - UgVeg: 흙내음 상점`,
      description: `내 회원정보를 확인하세요.`,
      url: `/mypage/user`,
      images: {
        url: '/UgVeg.png',
      },
    },
  };
}

export default async function User() {
  return <UserInfo />;
}
