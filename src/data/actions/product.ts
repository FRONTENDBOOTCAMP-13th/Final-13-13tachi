'use server';

import { ApiRes, ApiResPromise, LikeItemType, ProductType } from '@/types';
import { revalidatePath, revalidateTag } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 상품 좋아요 추가
export async function productAddLike(
  state: ApiRes<LikeItemType> | null,
  formData: FormData,
): ApiResPromise<LikeItemType> {
  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<LikeItemType>;

  const body = {
    target_id: Number(formData.get('_id')),
  };

  try {
    res = await fetch(`${API_URL}/bookmarks/product`, {
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
    revalidateTag(`bookmarks`);
    revalidateTag(`/shopping/${_id}`);
    revalidateTag(`/shopping`);
  }

  return data;
}

// 상품 좋아요 삭제
export async function productDeleteLike(
  state: ApiRes<LikeItemType> | null,
  formData: FormData,
): ApiResPromise<LikeItemType> {
  const like_id = formData.get('like_id'); // 북마크의 id
  const _id = formData.get('_id'); // 상품의 id
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<LikeItemType>;

  const body = {
    target_id: Number(formData.get('_id')),
  };

  try {
    res = await fetch(`${API_URL}/bookmarks/${like_id}`, {
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
    revalidateTag(`/shopping/${_id}`);
    revalidateTag(`/shopping`);
  }

  return data;
}

/**
 * 상품 좋아요 삭제 (마이페이지용)
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
    revalidatePath(`/mypage/wish`);
  }

  return data;
}

export async function deleteLikeInWish(
  _id: number,
  accessToken: string,
): ApiResPromise<LikeItemType> {
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
    revalidatePath(`/mypage/wish`);
  }

  return data;
}

// 판매자 상품 관리

// 판매자 상품 삭제
export async function deleteProduct(
  state: ApiRes<ProductType> | null,
  formData: FormData,
): ApiResPromise<ProductType> {
  let res: Response;
  let data: ApiRes<ProductType>;

  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');
  const body = {
    _id,
  };

  try {
    res = await fetch(`${API_URL}/seller/products/${_id}`, {
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
    revalidatePath(`/mypage/product`);
  }

  return data;
}
