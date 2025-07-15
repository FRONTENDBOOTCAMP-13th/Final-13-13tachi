'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 이미지 임시 불러오기

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  const isActive = (path: string) =>
    pathname === path ? 'mypage-recipe-active' : '';

  return (
    <div className="flex flex-col justify-center lg:w-[49.875rem]">
      <aside className="flex flex-col gap-4  h-full text-gray rounded-lg">
        <div className="lg:w-[49.875rem] lg:text-sm font-semibold">
          <ul className="flex flex-row justify-evenly">
            <li>
              <Link
                href="/mypage/recipe/myrecipe"
                className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/recipe/myrecipe')} `}
              >
                나의 레시피
              </Link>
            </li>
            <li>
              <Link
                href="/mypage/recipe/likerecipe"
                className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/recipe/likerecipe')} `}
              >
                레시피 북마크
              </Link>
            </li>
          </ul>
        </div>
        <div className="border-b border-light-gray"></div>
      </aside>
      <main className="">{children}</main>
    </div>
  );
}
