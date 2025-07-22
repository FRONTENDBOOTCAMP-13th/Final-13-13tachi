'use server';
import { ApiRes, ApiResPromise, CartItemType } from '@/types';
import { revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

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
    revalidateTag(`carts/${_id}`);
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
    quantity: formData.get('quantity'),
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
  } else {
    return data;
  }

  return data;
}
