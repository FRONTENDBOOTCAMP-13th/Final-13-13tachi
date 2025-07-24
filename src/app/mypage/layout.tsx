'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// 임시 이미지 불러오기

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import {
  BookOpen,
  Heart,
  IdCard,
  LogOut,
  ReceiptText,
  ShoppingCart,
} from 'lucide-react';
import useUserStore from '@/zustand/useStore';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  const isActive = (path: string) => (pathname === path ? 'mypage-active' : '');
  const { user } = useUserStore();
  return (
    <>
      <Header />
      <div className="flex justify-center mt-[4.0625rem] mb-[6.25rem]">
        <div className="flex flex-row lg:max-w-5xl">
          <div className="flex flex-col lg:gap-[2.1875rem]">
            <h2 className="text-sm text-gray mt-[4.0625rem] mb-[1.25rem]">
              <Link href="/">HOME</Link>
              <span>{' > '}</span>
              <Link href="/mypage">마이페이지</Link>
            </h2>
            <div className="flex flex-row">
              <aside className="flex flex-col items-center lg:gap-[2.125rem] lg:w-[12.25rem] h-full bg-bg-gray text-black lg:p-[1.875rem] lg:mr-[1.875rem] rounded-lg">
                <div className="flex flex-col items-center lg:gap-1">
                  <Image
                    src={
                      user?.image
                        ? `${API_URL}/${user.image}`
                        : '/images/front-end.png'
                    }
                    alt={`${user?.name} 프로필 이미지`}
                    width={80}
                    height={80}
                    className="rounded-[50%] object-cover lg:w-20 lg:h-20"
                  ></Image>
                  <p className="lg:text-base font-semibold">{user?.name}</p>
                  <p className="lg:text-sm">{user?.email}</p>
                </div>
                <ul className="flex flex-col lg:space-y-4  lg:text-base">
                  <li>
                    <Link
                      href="/mypage/cart"
                      className={`flex flex-row gap-2 hover:text-dark-green hover:font-semibold ${isActive('/mypage/cart')}`}
                    >
                      <ShoppingCart width={16} />
                      <span>장바구니</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/likes"
                      className={`flex flex-row gap-2 hover:text-dark-green hover:font-semibold ${isActive('/mypage/likes')} `}
                    >
                      <Heart width={16} />
                      <span>내가 찜한 상품</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/buylist"
                      className={`flex flex-row gap-2 hover:text-dark-green hover:font-semibold ${isActive('/mypage/buylist')} ${isActive('/mypage/buyinfo')}`}
                    >
                      <ReceiptText width={16} />
                      <span>주문내역</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/recipe"
                      className={`flex flex-row gap-2 hover:text-dark-green hover:font-semibold ${isActive('/mypage/recipe/myrecipe')} ${isActive('/mypage/recipe/likerecipe')}`}
                    >
                      <BookOpen width={16} />
                      <span>레시피</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/myuser"
                      className={`flex flex-row gap-2 hover:text-dark-green hover:font-semibold ${isActive('/mypage/myuser')} `}
                    >
                      <IdCard width={16} />
                      <span>회원정보</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="flex flex-row gap-2 hover:text-[var(--color-dark-green)] hover:font-semibold"
                    >
                      <LogOut width={16} />
                      <span>로그아웃</span>
                    </Link>
                  </li>
                </ul>
              </aside>
              <main className="">{children}</main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
