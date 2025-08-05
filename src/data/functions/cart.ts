import { ApiResPromise, CartItemType } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 장바구니 목록 불러오기
export async function getCartProducts(
  accessToken: string,
): ApiResPromise<CartItemType[]> {
  try {
    const res = await fetch(`${API_URL}/carts`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      next: {
        tags: [`carts`],
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 불러오기 실패' };
  }
}
