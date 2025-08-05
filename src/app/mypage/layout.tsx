'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? 'mypage-active' : '');
  const { user } = useUserStore();
  const { resetUser } = useUserStore();

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  //로그아웃 시 토큰 삭제
  const handleLogout = () => {
    resetUser();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    Swal.fire({
      icon: 'info',
      title: '로그아웃 완료',
      text: '로그아웃이 완료 되었습니다.',
      confirmButtonText: '확인',
    }).then(result => {
      if (result.isConfirmed) {
        router.replace('/');
      }
    });
  };

  return (
    <main className="min-h-[calc(100dvh-26.125px)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <div className="flex justify-center lg:pt-[4.0625rem] lg:pb-[6.25rem] md:pt-[3.125rem] md:pb-20 pt-[1.875rem] pb-[3.75rem]">
        <div className="flex flex-row lg:w-5xl w-full lg:px-0 md:px-[1.875rem] px-5">
          <div className="flex flex-col gap-[2.1875rem] w-full">
            <h2 className="text-xs md:text-sm lg:text-base text-gray">
              <Link href="/">HOME</Link>
              &nbsp;&gt;&nbsp;
              <Link href="/mypage">마이페이지</Link>
              <p className="mt-5 text-4xl font-semibold text-black">
                마이페이지
              </p>
            </h2>
            <div className="lg:flex lg:flex-row md:flex md:flex-row flex flex-row">
              <aside
                className="hidden md:flex flex-shrink-0
                  md:flex-col md:items-center lg:w-[12.25rem] lg:p-[1.875rem] md:gap-[2.125rem] md:w-[10.625rem] md:py-[1.875rem] md:px-5 md:mr-[1.875rem] 
                  mr-0
                  h-full bg-bg-gray text-black rounded-lg "
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
                        src={user?.image ? `${user.image}` : '/profile.svg'}
                        alt={`${user?.name} 프로필 이미지`}
                        width={80}
                        height={80}
                        className="rounded-[50%] object-cover w-20 h-20"
                      ></Image>
                      <p className="lg:text-base md:text-base font-semibold">
                        {user?.name}
                      </p>
                      {user?.loginType === 'kakao' && (
                        <div className="flex">
                          <Image
                            src="/kakao_logo.png"
                            width={20}
                            height={20}
                            alt="네이버 로고"
                          />
                          <span className="text-sm ml-2">카카오 로그인</span>
                        </div>
                      )}
                      {user?.loginType === 'naver' && (
                        <div className="flex">
                          <Image
                            src="/naver_logo.png"
                            width={20}
                            height={20}
                            alt="네이버 로고"
                          />
                          <span className="text-sm ml-2">네이버 로그인</span>
                        </div>
                      )}
                      <p className="text-sm">{user?.email}</p>
                    </div>
                  )}
                </div>
                <ul className="flex flex-col space-y-4 lg:text-base md:text-base">
                  <li>
                    <Link
                      href="/mypage/cart"
                      className={`flex flex-row gap-3 hover:text-dark-green hover:font-semibold ${isActive('/mypage/cart')}`}
                    >
                      <ShoppingCart width={16} />
                      <span>장바구니</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/wish"
                      className={`flex flex-row gap-3 hover:text-dark-green hover:font-semibold ${isActive('/mypage/wish')} `}
                    >
                      <Heart width={16} />
                      <span>찜한 상품</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/order"
                      className={`flex flex-row gap-3 hover:text-dark-green hover:font-semibold ${isActive('/mypage/order')}`}
                    >
                      <ReceiptText width={16} />
                      <span>주문내역</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/recipe"
                      className={`flex flex-row gap-3 hover:text-dark-green hover:font-semibold ${isActive('/mypage/recipe/myRecipes')} ${isActive('/mypage/recipe/bookmarkRecipe')}`}
                    >
                      <BookOpen width={16} />
                      <span>레시피</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/user"
                      className={`flex flex-row gap-3 hover:text-dark-green hover:font-semibold ${isActive('/mypage/user')} `}
                    >
                      <IdCard width={16} />
                      <span>회원정보</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex flex-row gap-3 hover:text-[var(--color-dark-green)] hover:font-semibold"
                    >
                      <LogOut width={16} />
                      <span>로그아웃</span>
                    </button>
                  </li>
                </ul>
              </aside>
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
