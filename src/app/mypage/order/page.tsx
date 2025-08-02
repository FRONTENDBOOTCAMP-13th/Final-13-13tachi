import OrderList from '@/app/mypage/order/OrderList';

export default async function Order() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-2 mb-[1.875rem]">
        <h3 className="w-full text-xl font-semibold">주문내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <OrderList />
    </div>
  );
}
