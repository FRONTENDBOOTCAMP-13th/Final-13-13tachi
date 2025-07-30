'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    <main className="flex flex-col justify-start lg:w-[49.875rem] md:w-[31.75rem] w-80 h-full">
      <aside className="flex flex-col gap-4 text-gray rounded-lg">
        <div className="w-full text-base font-semibold">
          <ul className="flex flex-row justify-evenly">
            <li>
              <Link
                href="/mypage/recipe/myRecipe"
                className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/recipe/myRecipe')} `}
              >
                <h3>나의 레시피</h3>
              </Link>
            </li>
            <li>
              <Link
                href="/mypage/recipe/bookmarkRecipe"
                className={`block hover:text-dark-green hover:font-semibold ${isActive('/mypage/recipe/bookmarkRecipe')} `}
              >
                <h3>레시피 북마크</h3>
              </Link>
            </li>
          </ul>
        </div>
        <hr className="text-light-gray w-full mb-5" />
      </aside>
      <main className="h-full">{children}</main>
    </main>
  );
}
