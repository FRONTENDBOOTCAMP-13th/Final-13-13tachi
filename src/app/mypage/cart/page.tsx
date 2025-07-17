// 빈 경우
// import EmptyCart from '@/app/mypage/cart/EmptyCart';

// 비지 않은 경우
import CartList from '@/app/mypage/cart/CartList';
import Button from '@/components/common/Button';

import { getProducts } from '@/data/functions/post';
import { ProductType } from '@/types';

export default async function Cart() {
  const res = await getProducts();
  return (
    <main className="flex flex-col h-full">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2">
        <h3 className="lg:w-full lg:text-xl font-semibold">장바구니</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <form>
        {res.ok ? (
          res.item.map((product: ProductType) => (
            <CartList key={product._id} product={product} />
          ))
        ) : (
          <p>{res.message}</p>
        )}
        <p className="text-right lg:mt-[1.875rem] lg:text-lg font-semibold">
          총 상품 금액 <span className="text-[#8B0505]">59,900</span>원
        </p>
        <div className="flex justify-center">
          <Button size="xxl" variant="green">
            주문하기
          </Button>
        </div>
      </form>
      {/* <div className="h-full">
        <EmptyCart />
      </div> */}
    </main>
  );
}
