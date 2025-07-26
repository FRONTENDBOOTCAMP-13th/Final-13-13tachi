// 빈 경우
// import EmptyBuyList from '@/app/mypage/buylist/EmptyBuyList';

// 주문 내역 목록
import BuyList from '@/app/mypage/buylist/BuyList';

export default async function buyList() {
  return (
    <main className="flex flex-col lg:w-[49.875rem] md:w-[31.75rem] w-80 h-full">
      <div className="flex flex-col gap-2 mb-[1.875rem]">
        <h3 className="w-full text-xl font-semibold">주문내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <BuyList />
    </main>
  );
}
