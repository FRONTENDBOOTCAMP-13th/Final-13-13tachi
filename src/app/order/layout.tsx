'use client';

import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto lg:w-5xl w-full lg:px-0 md:px-[1.875rem] px-5">
      <div className="flex flex-col min-h-screen items-center">
        <div className="flex flex-col mb-[1.875rem] w-full">
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
    </div>
  );
}
