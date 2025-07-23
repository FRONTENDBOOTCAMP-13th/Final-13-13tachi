import {
  CartItemType,
  ApiResPromise,
  ProductType,
  ProductTypeRes,
} from '@/types';
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

// 상품 상세 불러오기
export async function getProductDetails(
  _id: number,
): ApiResPromise<ProductTypeRes> {
  try {
    const res = await fetch(`${API_URL}/products/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
      next: {
        tags: [`products/${_id}`],
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

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
        tags: [`/carts`],
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 불러오기 실패' };
  }
}
