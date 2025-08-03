'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './layout.css'; // nav 메뉴 해당 경로에서 active 시키는 css. header/footer 에서만 사용
import useUserStore from '@/zustand/useStore';
import Dropdown from '@/components/common/Dropdown';

export default function Header() {
  const { user } = useUserStore();

  // 주소창의 path 값 추출
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname.startsWith(path) ? 'nav-active' : '';

  return (
    <header className="w-full bg-dark-green z-10 py-2.5 lg:py-[1.0938rem] sticky top-0">
      <div className="mx-auto flex justify-between items-center h-full px-5 md:px-7.5 lg:px-0 lg:max-w-5xl">
        <h1 className="relative w-13.5 h-[2.3125rem] lg:w-17 lg:h-[2.9375rem] lg:-mt-0.5">
          <Link href="/" target="_self" title="홈 바로 가기" className="block">
            <Image src="/logo-white.svg" alt="UgVeg 로고" fill></Image>
          </Link>
        </h1>
        <nav className="h-full">
          <ul className="flex gap-10 items-center h-full text-white text-sm lg:text-base lg:gap-15">
            <li className="h-full hidden md:block">
              <Link
                href="/shopping"
                target="_self"
                title="장보기 페이지 바로 가기"
                className={`${isActive('/shopping')} block h-full content-center hover:text-yellow transition-all duration-100`}
              >
                장보기
              </Link>
            </li>
            <li className="h-full hidden md:block">
              <Link
                href="/about"
                target="_self"
                title="흙내음 상점은? 페이지 바로 가기"
                className={`${isActive('/about')} block h-full content-center hover:text-yellow transition-all duration-100`}
              >
                흙내음 상점은?
              </Link>
            </li>
            <li className="h-full hidden md:block">
              <Link
                href="/recipe"
                target="_self"
                title="레시피 페이지 바로 가기"
                className={`${isActive('/recipe')} block h-full content-center hover:text-yellow transition-all duration-100`}
              >
                레시피
              </Link>
            </li>
            <li className="h-full">
              {user ? (
                <Dropdown />
              ) : (
                <Link
                  href="/login/select"
                  target="_self"
                  title="로그인 페이지 바로 가기"
                  className={`${isActive('/login')} block h-full px-2 py-0.5 content-center border border-yellow rounded-full text-yellow hover:text-black hover:bg-yellow transition-all duration-100 lg:px-3 lg:py-1 `}
                >
                  로그인
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
