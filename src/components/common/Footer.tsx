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

export default function Footer() {
  // 주소창의 path 값 추출
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? 'ft-nav-active' : '');

  const isFilled = (path: string) => (pathname === path ? 2 : 1);

  return (
    <footer className=" bg-dark-green w-full pt-7.5 pb-25 md:py-8.5">
      <div className="mx-auto flex flex-col items-center md:items-start gap-6 h-full text-white px-5 md:px-7.5 lg:px-0 lg:max-w-5xl">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg md:text-3xl">흙내음 상점: UgVeg</h2>
          <ul className="flex gap-2 mt-1.5 font-thin text-xs md:text-sm ">
            <li className="relative after:absolute after:right-[-0.3125rem] after:top-[0.25rem] lg:after:top-[0.3125rem] after:w-[0.0625rem] after:h-2.5 md:after:h-3 after:bg-white">
              강석현
            </li>
            <li className="relative after:absolute after:right-[-0.3125rem] after:top-[0.25rem] lg:after:top-[0.3125rem] after:w-[0.0625rem] after:h-2.5 md:after:h-3 after:bg-white">
              김혜민
            </li>
            <li className="relative after:absolute after:right-[-0.3125rem] after:top-[0.25rem] lg:after:top-[0.3125rem] after:w-[0.0625rem] after:h-2.5 md:after:h-3 after:bg-white">
              이진현
            </li>
            <li>임한길</li>
          </ul>
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
            이 웹 사이트는 멋쟁이사자처럼 부트캠프 13기 파이널 프로젝트로
            제작되었습니다.
          </p>
          <small className="mt-1 text-xs md:text-sm font-thin">
            Copyrightⓒ2025 Likelion 13-13.
          </small>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 px-5 py-2.5 bg-white border-t border-light-gray shadow-[var(--shadow-image)] md:hidden">
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
          </li>
        </ul>
      </nav>
    </footer>
  );
}
