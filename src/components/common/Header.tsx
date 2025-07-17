'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

import './header.css'; // nav 메뉴 해당 경로에서 active 시키는 css. header 에서만 사용
import useUserStore from '@/zustand/useStore';

export default function Header() {
  const { user, resetUser } = useUserStore();

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetUser();
    alert('로그아웃 되었습니다.');
  };

  // 주소창의 path 값 추출
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname.startsWith(path) ? 'nav-active' : '';

  //TODO isLogin 확인해서 로그인 메뉴가 아이콘으로 바뀌도록
  //TODO 로그인 상태에서 아이콘 클릭하면 마이페이지 하위 메뉴 바로가는 링크
  return (
    <header className="sticky top-0 left-0 w-full bg-dark-green z-10 lg:h-[5rem]">
      <div className="mx-auto flex justify-between items-center h-full lg:max-w-5xl">
        <h1 className="lg:-mt-0.5">
          <Link href="/" target="self" title="홈 바로 가기" className="block">
            <Image
              src="/logo-white.svg"
              alt="UgVeg 로고"
              width={68}
              height={47}
            ></Image>
          </Link>
        </h1>
        <nav className="h-full">
          <ul className="flex gap-15 items-center h-full text-white">
            <li className="h-full">
              <Link
                href="/shopping"
                target="_self"
                title="장보기 페이지 바로 가기"
                className={`${isActive('/shopping')} block h-full content-center hover:text-yellow transition-all duration-100`}
              >
                장보기
              </Link>
            </li>
            <li className="h-full">
              <Link
                href="/about"
                target="_self"
                title="흙내음 상점은? 페이지 바로 가기"
                className={`${isActive('/about')} block h-full content-center hover:text-yellow transition-all duration-100`}
              >
                흙내음 상점은?
              </Link>
            </li>
            <li className="h-full">
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
                <form onSubmit={handleLogout}>
                  <p className="flex items-center">
                    {/* <Image
                      className="w-8 h-8 object-cover rounded-full mr-2"
                      src={
                        user.image
                          ? `${API_URL}/${user.image}`
                          : '/images/front-end.png'
                      }
                      width="32"
                      height="32"
                      alt={`${user.name} 프로필 이미지`}
                    /> */}
                    <Link
                      href="/mypage"
                      target="_self"
                      title="로그인 페이지 바로 가기"
                      className={`${isActive('/login')} block h-full content-center hover:text-yellow transition-all duration-100`}
                    >
                      {user.name}님
                    </Link>
                    <button
                      type="submit"
                      className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                    >
                      로그아웃
                    </button>
                  </p>
                </form>
              ) : (
                <Link
                  href="/user/login"
                  target="_self"
                  title="로그인 페이지 바로 가기"
                  className={`${isActive('/login')} block h-full content-center hover:text-yellow transition-all duration-100`}
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
