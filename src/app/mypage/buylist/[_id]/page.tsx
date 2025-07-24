// 주문 내역 목록
// import BuyList from '@/app/mypage/buylist/BuyList';

import BuyInfo from '@/app/mypage/buylist/[_id]/BuyInfo';
interface InfoPageProps {
  params: Promise<{
    _id: number;
  }>;
}
export default async function buyInfo({ params }: InfoPageProps) {
  const _id = (await params)._id;

  return (
    <main className="flex flex-col h-full">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2 mb-[1.875rem]">
        <h3 className="lg:w-full lg:text-xl font-semibold">주문내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <BuyInfo orderId={_id} />
    </main>
  );
}
