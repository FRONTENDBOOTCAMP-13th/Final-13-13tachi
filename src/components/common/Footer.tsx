'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  CircleUserRound,
  CookingPot,
  House,
  ShoppingBasket,
} from 'lucide-react';
import useUserStore from '@/zustand/useStore';

export default function Footer() {
  const { user } = useUserStore();

  // 주소창의 path 값 추출
  const pathname = usePathname();

  // 주요 네비게이션 경로의 하위 경로까지 모두 활성화 처리
  const navPaths = ['/', '/shopping', '/recipe', '/mypage', '/login'];

  const isActive = (path: string) => {
    if (navPaths.includes(path) && path !== '/') {
      return pathname.startsWith(path) ? 'ft-nav-active' : '';
    }
    return pathname === path ? 'ft-nav-active' : '';
  };

  const isFilled = (path: string) => {
    if (navPaths.includes(path) && path !== '/') {
      return pathname.startsWith(path) ? 2 : 1;
    }
    return pathname === path ? 2 : 1;
  };

  return (
    <footer className=" bg-dark-green w-full pt-7.5 pb-25 md:py-8.5">
      <div className="mx-auto flex flex-col items-center md:items-start gap-6 h-full text-white px-5 md:px-7.5 lg:px-0 lg:max-w-5xl">
        <div className="flex flex-col justify-between items-center gap-4 md:flex-row md:items-start w-full">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg md:text-3xl">
              흙내음 상점: UgVeg
            </h2>
            <ul className="flex gap-2 mt-1.5 font-thin text-xs md:text-sm ">
              <li className="relative after:absolute after:right-[-0.3125rem] after:top-[0.25rem] lg:after:top-[0.3125rem] after:w-[0.0625rem] after:h-2.5 md:after:h-3 after:bg-white">
                <Link
                  href="https://github.com/Kanghyeon00"
                  target="_blank"
                  title="강석현 깃허브 새창림으로 연결"
                >
                  강석현
                </Link>
              </li>
              <li className="relative after:absolute after:right-[-0.3125rem] after:top-[0.25rem] lg:after:top-[0.3125rem] after:w-[0.0625rem] after:h-2.5 md:after:h-3 after:bg-white">
                <Link
                  href="https://github.com/minixzip"
                  target="_blank"
                  title="김혜민 깃허브 새창림으로 연결"
                >
                  김혜민
                </Link>
              </li>
              <li className="relative after:absolute after:right-[-0.3125rem] after:top-[0.25rem] lg:after:top-[0.3125rem] after:w-[0.0625rem] after:h-2.5 md:after:h-3 after:bg-white">
                <Link
                  href="https://github.com/imnotpossib1e"
                  target="_blank"
                  title="이진현 깃허브 새창림으로 연결"
                >
                  이진현
                </Link>
              </li>
              <Link
                href="https://github.com/onewayay"
                target="_blank"
                title="임한길 깃허브 새창림으로 연결"
              >
                <li>임한길</li>
              </Link>
            </ul>
          </div>
          <div className="text-xs md:text-sm">
            <label htmlFor="family-site" className="sr-only">
              패밀리 사이트
            </label>
            <select
              id="family-site"
              className="w-40 px-2 py-1 border border-[#5e7f3a] bg-[#3c5524] text-[#f0f0f0] rounded hover:bg-[#4c6e2a] transition-all duration-200 md:w-45 md:px-3"
              onChange={e => {
                const url = e.target.value;
                if (url && url !== '#') {
                  window.open(url, '_blank');
                  e.target.selectedIndex = 0; // 선택 초기화
                }
              }}
            >
              <option value="">Family Site</option>
              <option value="https://final-05-oguogu.vercel.app/">
                오구텃밭
              </option>
              <option value="#">슬로우채소연구소</option>
              <option value="#">산들산들 식탁</option>
              <option value="#">오늘의 채소</option>
            </select>
          </div>
        </div>
        <ul className="flex items-center gap-4">
          <li className="relative w-6.5 h-6.5 md:w-9 md:h-9">
            <Link
              href="https://github.com/FRONTENDBOOTCAMP-13th/Final-13-13tachi"
              target="_blank"
              title="13tachi 깃허브 새창열림으로 바로가기"
            >
              <Image src="/ico-github.svg" alt="깃허브 아이콘" fill></Image>
            </Link>
          </li>
          <li className="relative w-6.5 h-6.5 md:w-9 md:h-9">
            <Link href="#">
              <Image src="/ico-youtube.svg" alt="유튜브 아이콘" fill></Image>
            </Link>
          </li>
          <li className="relative w-6.5 h-6.5 md:w-9 md:h-9">
            <Link href="#">
              <Image src="/ico-x.svg" alt="X 아이콘" fill></Image>
            </Link>
          </li>
          <li className="relative w-6.5 h-6.5 md:w-9 md:h-9">
            <Link href="#">
              <Image
                src="/ico-instagram.svg"
                alt="인스타그램 아이콘"
                fill
              ></Image>
            </Link>
          </li>
        </ul>
        <div className="space-y-1.5 text-center md:text-left">
          <p className="text-xs md:text-sm">
            이 웹 사이트는 멋쟁이사자처럼 부트캠프 13기{' '}
            <br className="md:hidden" />
            파이널 프로젝트로 제작되었습니다.
          </p>
          <small className="mt-1 text-xs md:text-sm font-thin">
            Copyrightⓒ2025 Likelion 13-13.
          </small>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 px-5 py-2.5 bg-white border-t border-light-gray shadow-[var(--shadow-image)] z-10 md:hidden">
        <ul className="flex justify-around">
          <li className="w-11.5">
            <Link
              href="/"
              className={`${isActive('/')} flex flex-col items-center gap-1`}
            >
              <House strokeWidth={isFilled('/')} className="w-auto h-6.5" />
              <span className="text-2xs">홈으로</span>
            </Link>
          </li>
          <li className="w-11.5">
            <Link
              href="/shopping"
              className={`${isActive('/shopping')} flex flex-col items-center gap-1`}
            >
              <ShoppingBasket
                strokeWidth={`${isFilled(`/shopping`)}`}
                className="w-auto h-6.5"
              />
              <span className="text-2xs">장보기</span>
            </Link>
          </li>
          <li className="w-11.5">
            <Link
              href="/recipe"
              className={`${isActive('/recipe')} flex flex-col items-center gap-1`}
            >
              <CookingPot
                strokeWidth={`${isFilled(`/recipe`)}`}
                className="w-auto h-6.5"
              />
              <span className="text-2xs">레시피</span>
            </Link>
          </li>
          <li className="w-11.5">
            {user ? (
              <Link
                href="/mypage"
                className={`${isActive('/mypage')} flex flex-col items-center gap-1`}
              >
                <CircleUserRound
                  strokeWidth={`${isFilled(`/mypage`)}`}
                  className="w-auto h-6.5"
                />
                <span className="text-2xs">마이페이지</span>
              </Link>
            ) : (
              <Link
                href="/login/select"
                className={`${isActive('/login')} flex flex-col items-center gap-1`}
              >
                <CircleUserRound
                  strokeWidth={`${isFilled(`/login`)}`}
                  className="w-auto h-6.5"
                />
                <span className="text-2xs">로그인</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </footer>
  );
}
