'use client';

import Link from 'next/link';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex flex-col min-h-screen items-center">
        <div className="flex flex-col mb-[1.875rem]">
          <h2 className="text-xs md:text-sm lg:text-base text-gray mt-[4.0625rem] mb-[1.25rem]">
            <Link href="/">HOME</Link>
            &nbsp;&gt;&nbsp;
            <Link href="/cart">장바구니</Link>
            &nbsp;&gt;&nbsp;
            <Link href="/order">주문 정보 입력</Link>
          </h2>

          <h3 className="text-4xl font-semibold mb-[2.1875rem]">주문하기</h3>

          <hr className="text-light-gray w-full" />
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}
