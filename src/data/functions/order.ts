import { ApiResPromise, BuyListType, OrderInfoType } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

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

// 주문 상세 불러오기
export async function getOrderInfo(
  accessToken: string,
  _id: number,
): ApiResPromise<OrderInfoType> {
  try {
    const res = await fetch(`${API_URL}/orders/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      next: {
        tags: [`orders/${_id}`],
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 불러오기 실패' };
  }
}
