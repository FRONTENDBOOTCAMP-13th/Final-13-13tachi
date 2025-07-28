'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// 임시 이미지 불러오기

import {
  BookOpen,
  Heart,
  IdCard,
  LogOut,
  ReceiptText,
  ShoppingCart,
} from 'lucide-react';
import useUserStore from '@/zustand/useStore';
import { useEffect, useState } from 'react';
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-center  mt-[4.0625rem] mb-[6.25rem] md:p-[1.125rem]">
        <div className="flex flex-row lg:w-5xl md:w-[44.25rem] w-80">
          <div className="flex flex-col gap-[2.1875rem]">
            <h2 className="text-sm text-gray">
              <Link href="/">HOME</Link>
              <span>{' > '}</span>
              <Link href="/mypage">마이페이지</Link>
              <p className="mt-5 text-4xl font-semibold text-black">
                마이페이지
              </p>
            </h2>
            <div className="lg:flex lg:flex-row md:flex md:flex-row flex flex-row">
              <aside
                className="lg:flex lg:flex-col lg:items-center lg:gap-[2.125rem] lg:w-[12.25rem] lg:p-[1.875rem] lg:mr-[1.875rem] 
                  md:flex md:flex-col md:items-center md:gap-[2.125rem] md:w-[10.625rem] md:py-[1.875rem] md:px-5 md:mr-[1.875rem] 
                  hidden
                  h-full bg-bg-gray text-black rounded-lg"
              >
                <div>
                  {loading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-20 rounded-[50%] bg-gray-200 animate-pulse" />
                      <div className="h-5 w-15 rounded-lg bg-gray-200 animate-pulse" />
                      <div className="mt-1 h-[0.8rem] w-32 rounded-lg bg-gray-200 animate-pulse" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Image
                        src={
                          user?.image
                            ? `${API_URL}/${user.image}`
                            : '/profile.svg'
                        }
                        alt={`${user?.name} 프로필 이미지`}
                        width={80}
                        height={80}
                        className="rounded-[50%] object-cover w-20 h-20"
                      ></Image>
                      <p className="lg:text-base md:text-base font-semibold">
                        {user?.name}
                      </p>
                      <p className="lg:text-sm md:text-sm">{user?.email}</p>
                    </div>
                  )}
                </div>
                <ul className="flex flex-col space-y-4 lg:text-base md:text-base">
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
    </>
  );
}
