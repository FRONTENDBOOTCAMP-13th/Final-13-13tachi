// 빈 경우
// import EmptyBuyList from '@/app/mypage/buylist/EmptyBuyList';

// 주문 내역 목록
import BuyList from '@/app/mypage/buylist/BuyList';

export default async function buyList() {
  return (
    <main className="flex flex-col h-full">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2 mb-[1.875rem]">
        <h3 className="lg:w-full lg:text-xl font-semibold">주문내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <BuyList />
      {/* <div className="h-full">
        <EmptyBuyList />
      </div> */}
    </main>
  );
}
