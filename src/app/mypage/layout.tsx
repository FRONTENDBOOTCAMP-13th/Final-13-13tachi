'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// 임시 이미지 불러오기
import profilePic from '../../images/profile.jpg';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  const isActive = (path: string) => (pathname === path ? 'mypage-active' : '');

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-row lg:max-w-5xl">
          <div className="flex flex-col lg:gap-[2.1875rem]">
            <div className="flex flex-col lg:gap-[1.125rem]">
              <p className="lg:text-base text-gray">HOME &gt; 마이페이지</p>
              <h2 className="lg:text-5xl font-semibold">마이페이지</h2>
            </div>
            <div className="flex flex-row">
              <aside className="flex flex-col items-center lg:gap-[2.125rem] lg:w-[12.25rem] h-full bg-bg-gray text-black lg:p-[1.875rem] lg:mr-[1.875rem] rounded-lg">
                <div className="flex flex-col items-center lg:gap-1">
                  <Image
                    src={profilePic}
                    alt="profilepic"
                    width={80}
                    height={80}
                    className="rounded-[50%] object-cover lg:w-20 lg:h-20"
                  ></Image>
                  <p className="lg:text-base font-semibold">UserName</p>
                  <p className="lg:text-sm">testId123@naver.com</p>
                </div>
                <ul className="flex flex-col lg:space-y-4  lg:text-base">
                  <li>
                    <Link
                      href="/mypage/cart"
                      className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/cart')} `}
                    >
                      🛒 장바구니
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/likes"
                      className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/likes')} `}
                    >
                      🖤 내가 찜한 상품
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/buylist"
                      className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/buylist')} `}
                    >
                      🧾 주문내역
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/recipe"
                      className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/recipe/myrecipe')} ${isActive('/mypage/recipe/likerecipe')}`}
                    >
                      📖 레시피
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mypage/user"
                      className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/user')} `}
                    >
                      🪪 회원정보
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="block hover:text-[var(--color-dark-green)] hover:font-semibold"
                    >
                      ⌽ 로그아웃
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
