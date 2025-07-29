'use client';

import PayForm from '@/app/order/PayForm';
import Button from '@/components/common/Button';
import OrderUserForm from '@/app/order/OrderUserForm';
import useUserStore from '@/zustand/useStore';
import { useActionState, useEffect, useState } from 'react';
import { ApiResCart, CartItemType, UserInfoType } from '@/types';
import { getCartProducts } from '@/data/functions/post';
import { createOrder } from '@/data/actions/cart';
import OrderList from '@/app/order/OrderList';
import OrderTable from '@/app/order/OrderTable';

export default function OrderForm() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const [res, setRes] = useState<ApiResCart<CartItemType[]> | null>(null);
  const [userFormData, setUserFormData] = useState<UserInfoType | null>(null);
  const [orderState, orderAction, isOrdering] = useActionState(
    createOrder,
    null,
  );
  console.log(orderState, isOrdering);

  useEffect(() => {
    if (accessToken) {
      getCartProducts(accessToken).then(setRes);
    }
  }, [accessToken]);
  const products = res?.ok
    ? res.item.map(item => ({
        _id: Number(item.product_id),
        quantity: Number(item.quantity),
      }))
    : [];

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
    <div>
      {res.ok ? (
        <div>
          <div className="flex flex-col md:gap-8 gap-5 md:my-[1.875rem] my-5">
            <OrderList items={res.item} />
          </div>
          <OrderTable total={res.cost?.total ?? 0} />
        </div>
      ) : (
        <p>{}</p>
      )}
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
                {(res.cost?.total ?? 0).toLocaleString()}
              </span>
              원
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-20 mb-[6.25rem]">
          <Button size="xxl" variant="green">
            결제하기
          </Button>
        </div>
      </form>
    </div>
  );
}
