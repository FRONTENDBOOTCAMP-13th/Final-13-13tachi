'use client';

import Link from 'next/link';

import PayForm from '@/app/order/PayForm';
import OrderTable from '@/app/order/OrderTable';
import Button from '@/components/common/Button';
import OrderList from '@/app/order/OrderList';
import OrderUserForm from '@/app/order/OrderUserForm';
import useUserStore from '@/zustand/useStore';
import { useEffect, useState } from 'react';
import { ApiResCart, CartItemType } from '@/types';
import { getCartProducts } from '@/data/functions/post';

export default function OrderForm() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const [res, setRes] = useState<ApiResCart<CartItemType[]> | null>(null);

  useEffect(() => {
    if (accessToken) {
      getCartProducts(accessToken).then(setRes);
    }
  }, [accessToken]);

  if (!res) return <div>로딩 중...</div>;
  if (res.ok === 0) return <div>{res.message}</div>;
  return (
    <>
      <main className="flex flex-col min-h-screen items-center">
        <div className="lg:w-[64rem] flex flex-col mb-[1.875rem]">
          <h2 className="text-sm text-gray mt-[4.0625rem] mb-[1.25rem]">
            <Link href="/">HOME</Link>
            <span>{' > '}</span>
            <Link href="/recipe/list">주문 정보 입력</Link>
          </h2>

          <h3 className="lg:w-full lg:text-5xl font-semibold mb-[2.1875rem]">
            주문하기
          </h3>

          <hr className="text-light-gray w-full " />

          <div className="flex flex-col gap-5 my-[1.875rem]">
            <OrderList />
          </div>
          <OrderTable />
          <div className="flex flex-col lg:flex-row justify-between gap-[2rem]">
            <div className="flex flex-col gap-[0.625rem] w-[31.25rem]">
              <h3 className="lg:text-xl font-bold mb-[0.75rem]">주문자 정보</h3>
              <hr className="text-light-gray w-full mb-[1.5rem]" />
              <OrderUserForm />
            </div>
            <div className="flex flex-col justify-between">
              <PayForm />
              <p className="font-semibold text-lg">
                총금액 :{' '}
                <span className="text-dark-red text-5xl font-bold">
                  {(res.cost?.total ?? 0).toLocaleString()}
                </span>
                원
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-20 mb-[6.25rem]">
          <Button size="xxl" variant="green">
            결제하기
          </Button>
        </div>
      </main>
    </>
  );
}
