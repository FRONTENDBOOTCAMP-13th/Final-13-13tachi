// 빈 경우
// import EmptyCart from '@/app/mypage/cart/EmptyCart';

// 비지 않은 경우
import CartList from '@/app/mypage/cart/CartList';

export default async function Cart() {
  return (
    <main className="flex flex-col h-full">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2">
        <h3 className="lg:w-full lg:text-xl font-semibold">장바구니</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <CartList />
      {/* <div className="h-full">
        <EmptyCart />
      </div> */}
    </main>
  );
}
