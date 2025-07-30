'use server';
import { ApiRes, ApiResPromise, CartItemType, LikeItemType } from '@/types';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 장바구니 추가
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function AddCart(
  state: ApiRes<CartItemType> | null,
  formData: FormData,
): ApiResPromise<CartItemType> {
  const accessToken = formData.get('accessToken');
  console.log('추가');

  const body = {
    product_id: Number(formData.get('product_id')),
    quantity: Number(formData.get('quantity')),
  };

  let res: Response;
  let data: ApiRes<CartItemType>;

  try {
    res = await fetch(`${API_URL}/carts`, {
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
    revalidateTag(`carts`);
  }

  return data;
}

/**
 * 장바구니 개별 삭제
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function deleteCart(
  state: ApiRes<CartItemType> | null,
  formData: FormData,
): ApiResPromise<CartItemType> {
  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<CartItemType>;

  try {
    res = await fetch(`${API_URL}/carts/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`carts`);
    revalidatePath(`/mypage/cart`);
  }

  return data;
}

/**
 * 장바구니 수량 수정
 * @param {ApiRes<Post> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 게시글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<Post>>} - 수정 결과 응답 객체
 * @description
 * 게시글을 수정하고, 성공 시 해당 게시글 상세 페이지로 이동합니다.
 * 실패 시 에러 메시지를 반환합니다.
 */
export async function updateCartQuantity(
  state: ApiRes<CartItemType> | null,
  formData: FormData,
): ApiResPromise<CartItemType> {
  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken'); // 인증 토큰

  const body = {
    quantity: Number(formData.get('quantity')),
  };

  let res: Response;
  let data: ApiRes<CartItemType>;

  try {
    // 게시글 수정 API 호출
    res = await fetch(`${API_URL}/carts/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`, // 인증 토큰
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  // 수정 성공 시 해당 게시글 상세 페이지로 이동
  if (data.ok) {
    revalidateTag(`carts/${_id}`); // 게시글 상세 페이지 갱신
    revalidateTag(`carts/`);
    revalidatePath(`/mypage/cart`);
  } else {
    return data;
  }

  return data;
}

/**
 * 찜상품 삭제
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function deleteLike(
  state: ApiRes<LikeItemType> | null,
  formData: FormData,
): ApiResPromise<LikeItemType> {
  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<LikeItemType>;

  const body = {
    target_id: 'any',
  };

  try {
    res = await fetch(`${API_URL}/bookmarks/${_id}`, {
      method: 'DELETE',
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
    revalidateTag(`bookmarks`);
    revalidatePath(`/mypage/likes`);
  }

  return data;
}

/**
 * 주문 폼
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function createOrder(
  state: ApiRes<CartItemType> | null,
  formData: FormData,
): ApiResPromise<CartItemType> {
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
  let data: ApiRes<CartItemType>;

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
    await deleteAllCart(state, formData);

    revalidateTag(`orders`);
    redirect(`/complete`); // 추후 주문 완료 페이지로 수정해야됨
  }

  return data;
}

/**
 * 주문 폼
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function createShoppingOrder(
  state: ApiRes<CartItemType> | null,
  formData: FormData,
): ApiResPromise<CartItemType> {
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
    };
  }

  const body = {
    products,
    user: user,
    payment: formData.get('payment'), //card,kakaopay
    total: formData.get('total'),
  };

  let res: Response;
  let data: ApiRes<CartItemType>;

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
    revalidateTag(`orders`);
    redirect(`/complete`); // 추후 주문 완료 페이지로 수정해야됨
  }

  return data;
}

/**
 * 장바구니 전체 삭제
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function deleteAllCart(
  state: ApiRes<CartItemType> | null,
  formData: FormData,
): ApiResPromise<CartItemType> {
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<CartItemType>;

  try {
    res = await fetch(`${API_URL}/carts/cleanup`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`carts`);
    revalidatePath(`/mypage/cart`);
  }

  return data;
}

/**
 * order 주문 정보
 * @param {ApiRes<any> | null} state - 이전 상태 (사용하지 않음)
 * @param {FormData} formData - 주문 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<any>>} - 주문 생성 결과 응답 객체
 * @description
 * 주문 정보를 서버에 전송
 */
export async function createOrderlist(
  state: ApiRes<CartItemType> | null,
  formData: FormData,
): ApiResPromise<CartItemType> {
  const accessToken = formData.get('accessToken');

  const body = {
    items: String(formData.get('items')), //product_id, quantity
    user: String(formData.get('user')), //name, phone, address
    payment: formData.get('payment'), //card,kakaopay
    total: formData.get('total'),
  };

  let res: Response;
  let data: ApiRes<CartItemType>;

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
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`orders`);
  }

  return data;
}
