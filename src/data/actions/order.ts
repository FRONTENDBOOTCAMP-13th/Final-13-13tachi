'use server';

import { deleteAllCart } from '@/data/actions/cart';
import { getMember } from '@/data/functions/user';
import {
  ApiRes,
  ApiResPromise,
  EmailType,
  OrderInfoType,
  ProductItemType,
  ShoppingOrderType,
  UserInfoType,
} from '@/types';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 주문 생성 (장바구니 주문)
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function createOrder(
  state: ApiRes<OrderInfoType> | null,
  formData: FormData,
): ApiResPromise<OrderInfoType> {
  console.log('추가');
  const accessToken = formData.get('accessToken');
  const productsStr = formData.get('products');
  const userStr = formData.get('user');
  let products: { _id: number; quantity: number }[] = [];
  let user: {
    name: string;
    phone: string;
    postcode: string;
    addressDetail1: string;
    addressDetail2: string;
    message: string;
  } | null = null;

  if (productsStr && typeof productsStr == 'string') {
    products = JSON.parse(productsStr) as {
      _id: number;
      quantity: number;
    }[];
  }

  if (userStr && typeof userStr === 'string') {
    user = JSON.parse(userStr) as {
      name: string;
      phone: string;
      postcode: string;
      addressDetail1: string;
      addressDetail2: string;
      message: string;
    };
  }

  const body = {
    products,
    user: user,
    payment: formData.get('payment'), //card,kakaopay
    total: formData.get('total'),
  };

  let res: Response;
  let data: ApiRes<OrderInfoType>;

  try {
    res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    console.log(data);
    const products = data.item.products;
    const orderNum = data.item.createdAt;
    const sellerIds = Array.from(
      new Set(data.item.products.map(p => p.seller_id)),
    );
    console.log(sellerIds);

    for (const seller_id of sellerIds) {
      const sellerProducts = products.filter(
        product => product.seller_id === seller_id,
      );
      await sendEmail(
        Number(seller_id),
        sellerProducts,
        user!,
        orderNum,
        String(accessToken),
      );
    }

    await deleteAllCart(formData);
    revalidateTag(`orders`);
    redirect(`/complete?orderNum=${data.item.createdAt}`); // 추후 주문 완료 페이지로 수정해야됨
  }

  return data;
}

/**
 * 주문 생성(상품 페이지에서 개별 주문)
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function createShoppingOrder(
  state: ApiRes<OrderInfoType> | null,
  formData: FormData,
): ApiResPromise<OrderInfoType> {
  console.log('추가');
  const accessToken = formData.get('accessToken');
  const productsStr = formData.get('products');
  const userStr = formData.get('user');
  let products: { _id: number; quantity: number }[] = [];
  let user: {
    name: string;
    phone: string;
    postcode: string;
    addressDetail1: string;
    addressDetail2: string;
    message: string;
  } | null = null;
  if (productsStr && typeof productsStr == 'string') {
    products = JSON.parse(productsStr) as {
      _id: number;
      quantity: number;
    }[];
  }
  if (userStr && typeof userStr === 'string') {
    user = JSON.parse(userStr) as {
      name: string;
      phone: string;
      postcode: string;
      addressDetail1: string;
      addressDetail2: string;
      message: string;
    };
  }

  const body = {
    products,
    user: user,
    payment: formData.get('payment'), //card,kakaopay
    total: formData.get('total'),
  };

  let res: Response;
  let data: ApiRes<OrderInfoType>;

  try {
    res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    console.log(data);
    const products = data.item.products;
    const orderNum = data.item.createdAt;
    const seller_id = data.item.products[0].seller_id;

    await sendEmail(
      Number(seller_id),
      products,
      user!,
      orderNum,
      String(accessToken),
    );

    revalidateTag(`orders`);
    redirect(`/complete?orderNum=${data.item.createdAt}`); // 추후 주문 완료 페이지로 수정해야됨
  }

  return data;
}

// 메일 전송 api
export async function sendEmail(
  seller_id: number,
  products: ProductItemType[],
  user: UserInfoType,
  orderNum: string,
  accessToken: string,
): ApiResPromise<EmailType> {
  console.log('추가');

  let res: Response;
  let data: ApiRes<EmailType>;

  const seller = await getMember(seller_id);
  let sellerEmail = '';
  let sellerName = '';
  if (seller.ok) {
    sellerEmail = String(seller.item.email);
    sellerName = String(seller.item.name);
  }

  let totalPrice = 0;
  products.map(p => (totalPrice += p.price));

  const content = `
  <div style="margin:0 auto; max-width:600px; font-family: Arial, sans-serif; ">
    <h1 style="font-size: xx-large; font-weight: 700; color: darkgreen; margin-bottom: 50px; text-align: center;">
      <a href='https://ugveg.vercel.app/' target="_blank" style='text-decoration: none; color: darkgreen;'>UgVeg: 흙내음 상점</a>
    </h1>
    <h2 style="margin-bottom: 40px; text-align: center">${sellerName} 농부님! 새 주문이 접수되었습니다!</h2>
    <p style="font-size: large; font-weight: 700; margin-bottom: 14px;">배송지 정보</p>
    <div style="display: flex; flex-direction: column; gap: 10px; border-radius: 20px; background-color: rgb(240, 240, 240); padding: 20px; margin-bottom: 40px;">
      <div style="display: flex;">
        <div style="display: inline-block; width: 115px;"><b>주문 번호</b></div>
        <span style="display: inline-block; width: 40px;">|</span>
        <span>${orderNum}</span>
      </div>
      <div style="display: flex;">
        <div style="display: inline-block; width: 115px;"><b>받으시는 분</b></div>
        <span style="display: inline-block; width: 40px;">|</span>
        <span>${user.name}</span>
      </div>
      <div style="display: flex;">
        <div style="display: inline-block; width: 115px;"><b>전화번호</b></div>
        <span style="display: inline-block; width: 40px;">|</span>
        <span>${user.phone}</span>
      </div>
      <div style="display: flex;">
        <div style="display: inline-block; width: 115px; flex-shrink: 0;"><b>배송지 주소</b></div>
        <span style="display: inline-block; width: 40px; flex-shrink: 0;">|</span>
        <div style="display: block;">
          <span>${user.addressDetail1}</span>&nbsp;<span>${user.addressDetail2}</span>&nbsp;<span>(${user.postcode})</span>
        </div>
      </div>
      ${
        user.message
          ? ` 
            <div style="display: flex;">
              <span style="display: inline-block; width: 115px; flex-shrink: 0;"><b>배송 요청사항</b></span>
              <span style="display: inline-block; width: 40px; flex-shrink: 0;">|</span>
              <span>${user.message}</span>
            </div>`
          : ''
      }
    </div>
    <p style="font-size: large; font-weight: 700; margin-bottom: 14px;">구매 정보</p>
    <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px;">
      ${products.map(
        product => `
          <div style="display: flex; flex-direction: column; gap: 10px; border-radius: 20px; background-color: rgb(240, 240, 240); padding: 20px;">
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex;">
                <div style="display: inline-block; width: 115px;"><b>상품명</b></div>
                <span style="display: inline-block; width: 40px;">|</span>
                <div style="display: flex; align-items: baseline;"><span>${product.name}</span><span style="font-size: small; margin-left: 8px;">(${product.extra?.details})</span></div>
              </div>
              <div style="display: flex;">
                <div style="display: inline-block; width: 115px;"><b>주문 수량</b></div>
                <span style="display: inline-block; width: 40px;">|</span>
                <span>${product.quantity}개</span>
              </div>
              <div style="display: flex;">
                <div style="display: inline-block; width: 115px;"><b>가격</b></div>
                <span style="display: inline-block; width: 40px;">|</span>
                <span>${product.price.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        `,
      )}
    </div>
    <hr style="margin-bottom: 40px;"/>
    <p style="font-size:large; text-align: right;">
      <b>총 결제금액 <span style="font-size: x-large; margin-left: 20px;"><span style='color: #8B0505;'>${totalPrice.toLocaleString()}</span>원</span> </b>
    </p>
    <p style="margin-top: 40px; text-align: center;">소중한 농작물이 신선하게 잘 도착할 수 있도록 안전하고 신속한 배송 부탁드립니다. 감사합니다.</p>
  </div>
`;

  const body = {
    to: sellerEmail,
    serviceName: 'UgVeg: 흙내음 상점',
    subject: '[UgVeg: 흙내음 상점] 주문 안내',
    content,
  };

  try {
    res = await fetch(`${API_URL}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    console.log('전송됨', sellerName);
  }

  return data;
}

// 단일 상품 구매 정보 불러오기
export async function getShoppingOrder({
  id,
  quantity,
  accessToken,
}: {
  id: string;
  quantity: string;
  accessToken: string;
}): ApiResPromise<ShoppingOrderType> {
  const body = {
    dryRun: true,
    products: [
      {
        _id: Number(id),
        quantity: Number(quantity),
      },
    ],
  };

  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return res.json();
}
