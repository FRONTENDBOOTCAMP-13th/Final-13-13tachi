// import Link from 'next/link';

import BuyList from '@/app/mypage/buylist/BuyList';

export default async function buyList() {
  return (
    <main className="flex flex-col">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2 mb-[1.875rem]">
        <h3 className="lg:w-full lg:text-xl font-semibold">주문내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <BuyList />
    </main>
  );
}
