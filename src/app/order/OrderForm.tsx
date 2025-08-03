'use client';

import PayForm from '@/app/order/PayForm';
import Button from '@/components/common/Button';
import OrderUserForm from '@/app/order/OrderUserForm';
import useUserStore from '@/zustand/useStore';
import { useActionState, useEffect, useState } from 'react';
import {
  ApiRes,
  ApiResCart,
  CartItemType,
  MemberType,
  ShoppingOrderType,
  UserInfoType,
} from '@/types';
import {
  getCartProducts,
  getMember,
  getShoppingOrder,
} from '@/data/functions/post';
import { createOrder, createShoppingOrder } from '@/data/actions/cart';
import OrderList from '@/app/order/OrderList';
import OrderTable from '@/app/order/OrderTable';
import { useRouter, useSearchParams } from 'next/navigation';
// import Swal from 'sweetalert2';
import Loading from '@/app/order/Loading';

export default function OrderForm() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const [res, setRes] = useState<ApiResCart<CartItemType[]> | null>(null);
  const [shoppingRes, setShoppingRes] =
    useState<ApiRes<ShoppingOrderType> | null>(null);
  const [userFormData, setUserFormData] = useState<UserInfoType | null>(null);
  const [, orderAction] = useActionState(createOrder, null);
  const [, shoppingOrderAction] = useActionState(createShoppingOrder, null);
  const id = useSearchParams().get('id');
  const quantity = useSearchParams().get('quantity');
  const router = useRouter();

  const [userRes, setUserRes] = useState<ApiRes<MemberType> | null>(null);

  useEffect(() => {
    const user_id = Number(user?._id);
    getMember(user_id).then(setUserRes);
  }, [user]);

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

  // id, quantity가 있을 때(단일 상품 주문)
  if (id && quantity) {
    if (!shoppingRes) return <Loading />;
    if (shoppingRes.ok === 0) router.replace('/error');
  } else {
    // 장바구니 주문
    if (!res || !userRes) return <Loading />;

    // if (res.ok === 0 || userRes.ok === 0) {
    //   router.replace('/error');
    // }
  }

  return (
    <div className="w-full">
      {id && quantity ? (
        shoppingRes?.ok ? (
          <div>
            <div className="flex flex-col md:gap-8 gap-5 md:my-[1.875rem] my-5">
              <OrderList
                items={shoppingRes.item.products.map(item => ({
                  _id: item._id,
                  product_id: item._id,
                  quantity: item.quantity,
                  product: {
                    _id: item._id,
                    quantity: item.quantity,
                    name: item.name,
                    price: item.price / item.quantity,
                    image: item.image,
                    extra: item.extra,
                  },
                }))}
              />
            </div>
            <OrderTable total={shoppingRes.item.cost.total ?? 0} />
          </div>
        ) : (
          <p>{}</p>
        )
      ) : res?.ok ? (
        <div>
          <div className="flex flex-col md:gap-8 gap-5 md:my-[1.875rem] my-5">
            <OrderList items={res.item} />
          </div>
          <OrderTable total={res.cost?.total ?? 0} />
        </div>
      ) : (
        <p>{}</p>
      )}

      <form
        action={id && quantity ? shoppingOrderAction : orderAction}
        onSubmit={handleClientValidation}
      >
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
        <input
          type="hidden"
          name="total"
          value={
            id && quantity
              ? shoppingRes?.ok
                ? (shoppingRes.item.cost.total ?? 0)
                : 0
              : res?.ok
                ? (res.cost?.total ?? 0)
                : 0
          }
        />
        <div className="flex md:flex-row flex-col justify-between gap-[2rem] w-full">
          <div className="flex flex-col gap-[0.625rem] md:w-full">
            <h3 className="md:text-xl text-base font-bold mb-[0.75rem]">
              주문자 정보
            </h3>
            <hr className="text-light-gray w-full md:mb-[1.5rem] mb-3" />
            {userRes?.ok ? (
              <OrderUserForm
                onChangeUserData={setUserFormData}
                user={userRes.item}
              />
            ) : (
              <p>{userRes?.message}</p>
            )}
          </div>
          <div className="flex flex-col justify-between md:w-full">
            <PayForm />
            <p className="font-semibold text-lg lg:mt-0 mt-15 text-right">
              총금액 :{' '}
              <span className="text-dark-red text-5xl font-bold">
                {(id && quantity
                  ? shoppingRes?.ok
                    ? (shoppingRes.item.cost.total ?? 0)
                    : 0
                  : res?.ok
                    ? (res.cost?.total ?? 0)
                    : 0
                ).toLocaleString()}
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
