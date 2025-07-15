// import Link from 'next/link';
import CartList from '@/app/mypage/cart/CartList';
// import Image from 'next/image';

export default async function Cart() {
  return (
    <main className="flex flex-col">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2">
        <h3 className="lg:w-full lg:text-xl font-semibold">장바구니</h3>
        <div className="border-b border-light-gray"></div>
      </div>
      <form>
        <CartList />
        <CartList />
        <CartList />
        <p className="text-right lg:mt-[1.875rem] lg:text-lg font-semibold">
          총 상품 금액 <span className="text-[#8B0505]">59,900</span>원
        </p>
        <div className="flex justify-center">
          <button className="w-[200px] h-[48px] bg-dark-green text-white">
            주문하기
          </button>
        </div>
      </form>
    </main>
  );
}
