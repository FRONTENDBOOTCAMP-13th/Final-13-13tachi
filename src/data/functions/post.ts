import { ApiCartItem, ApiResPromise, ProductType } from '@/types';
// import useUserStore from '@/zustand/useStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 상품 목록 불러오기(전체)
export async function getProducts(): ApiResPromise<ProductType[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 불러오기 실패' };
  }
}

// 장바구니 목록 불러오기
export async function getCartProducts(
  accessToken: string,
): ApiResPromise<ApiCartItem[]> {
  try {
    const res = await fetch(`${API_URL}/carts/`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 불러오기 실패' };
  }
}
