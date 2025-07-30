import OrderInfo from '@/app/mypage/order/[_id]/OrderInfo';

interface InfoPageProps {
  params: Promise<{
    _id: number;
  }>;
}

export default async function OrderInfoPage({ params }: InfoPageProps) {
  const _id = (await params)._id;

  return (
    <div className="flex flex-col lg:w-[49.875rem] md:w-[31.75rem] w-80">
      <div className="flex flex-col gap-2 mb-[1.875rem]">
        <h3 className="w-full text-xl font-semibold">주문 상세 내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <OrderInfo orderId={_id} />
    </div>
  );
}
