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
    <div className="flex flex-col lg:w-[49.875rem] md:w-[31.75rem] w-80">
      <div className="flex flex-col gap-2 mb-[1.875rem]">
        <h3 className="w-full text-xl font-semibold">주문내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <BuyInfo orderId={_id} />
    </div>
  );
}
