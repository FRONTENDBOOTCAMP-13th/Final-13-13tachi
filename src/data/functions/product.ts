import {
  ApiResPromise,
  LikeItemType,
  ProductType,
  ProductTypeRes,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 상품 목록 불러오기(전체)
export async function getProducts(): ApiResPromise<ProductType[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
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
      next: {
        tags: [`products/${_id}`],
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

// 찜 목록(전체) 불러오기
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

// 찜 목록 불러오기
export async function getLikeProductDetails(
  accessToken: string,
  id: number,
): ApiResPromise<LikeItemType[]> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/product/${id}`, {
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
