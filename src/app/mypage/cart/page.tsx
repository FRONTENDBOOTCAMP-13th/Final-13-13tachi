// 비지 않은 경우
import CartList from '@/app/mypage/cart/CartList';

export default async function Cart() {
  return (
    <div className="flex flex-col lg:w-[49.875rem] md:w-[31.75rem] w-80 h-full">
      <div className="flex flex-col gap-2">
        <h3 className="w-full text-xl font-semibold">장바구니</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <CartList />
    </div>
  );
}
