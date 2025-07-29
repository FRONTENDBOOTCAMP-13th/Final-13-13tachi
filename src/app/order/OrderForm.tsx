'use client';

import Link from 'next/link';

import PayForm from '@/app/order/PayForm';
import OrderTable from '@/app/order/OrderTable';
import Button from '@/components/common/Button';
import OrderList from '@/app/order/OrderList';
import OrderUserForm from '@/app/order/OrderUserForm';
import useUserStore from '@/zustand/useStore';
import { useActionState, useEffect, useState } from 'react';
import {
  ApiRes,
  ApiResCart,
  ShoppingOrderType,
  CartItemType,
  UserInfoType,
} from '@/types';
import { getShoppingOrder, getCartProducts } from '@/data/functions/post';
import { createOrder } from '@/data/actions/cart';
import { useSearchParams } from 'next/navigation';

export default function OrderForm({}) {
  const id = useSearchParams().get('id');
  const quantity = useSearchParams().get('quantity');

  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const [res, setRes] = useState<ApiResCart<CartItemType[]> | null>(null);
  const [shoppingRes, setShoppingRes] =
    useState<ApiRes<ShoppingOrderType> | null>(null);
  const [userFormData, setUserFormData] = useState<UserInfoType | null>(null);
  const [orderState, orderAction, isOrdering] = useActionState(
    createOrder,
    null,
  );
  console.log(orderState, isOrdering);

  useEffect(() => {
    if (accessToken) {
      if (id && quantity) {
        getShoppingOrder({ id, quantity, accessToken }).then(setShoppingRes);
      } else {
        getCartProducts(accessToken).then(setRes);
      }
    }
  }, [accessToken]);
  const products =
    id && quantity
      ? shoppingRes?.ok
        ? [
            {
              _id: shoppingRes.item.products[0]._id,
              quantity: shoppingRes.item.products[0].quantity,
            },
          ]
        : []
      : res?.ok
        ? res.item.map(item => ({
            _id: Number(item.product_id),
            quantity: Number(item.quantity),
          }))
        : [];

  console.log('shoppingRes', products);

  //주문자 정보 입력 확인
  const handleClientValidation = (e: React.FormEvent<HTMLFormElement>) => {
    if (
      !userFormData?.name ||
      !userFormData?.phone ||
      !userFormData?.postcode ||
      !userFormData?.addressDetail1
    ) {
      e.preventDefault();
      alert('주문자 정보를 모두 입력해주세요.');
    }
  };

  if (!res) return <div>로딩 중...</div>;
  if (res.ok === 0) return <div>{res.message}</div>;

  return (
    <form action={orderAction} onSubmit={handleClientValidation}>
      <input
        type="hidden"
        name="accessToken"
        value={user?.token?.accessToken ?? ''}
      />
      <input type="hidden" name="products" value={JSON.stringify(products)} />
      <input
        type="hidden"
        name="user"
        value={userFormData ? JSON.stringify(userFormData) : ''}
      />
      <input type="hidden" name="total" value={res.cost?.total} />

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
              <OrderUserForm onChangeUserData={setUserFormData} />
            </div>
            <div className="flex flex-col justify-between">
              <PayForm />
              <p className="font-semibold text-lg">
                총금액 :{' '}
                <span className="text-dark-red text-5xl font-bold">
                  {/* {(res.cost?.total ?? 0).toLocaleString()} */}
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
    </form>
  );
}
