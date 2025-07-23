import {
  CartItemType,
  ApiResPromise,
  ProductType,
  LikeItemType,
  BuyListType,
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
      cache: 'force-cache',
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

// 찜 목록 불러오기
export async function getLikeProducts(
  accessToken: string,
): ApiResPromise<LikeItemType[]> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/product`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      next: {
        tags: [`bookmarks/product`],
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 불러오기 실패' };
  }
}

// 주문내역 목록 불러오기
export async function BuyProducts(
  accessToken: string,
): ApiResPromise<BuyListType[]> {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      next: {
        tags: [`orders`],
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 불러오기 실패' };
  }
}
