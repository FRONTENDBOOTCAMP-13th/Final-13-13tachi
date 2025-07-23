import {
  CartItemType,
  ApiResPromise,
  ProductType,
  LikeItemType,
  BuyListType,
} from '@/types';
import { LikePostType, MyPostType, Post, PostReply } from '@/types/post';
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

/**
 * 게시판 타입에 해당하는 게시글 목록을 가져옵니다.
 * @param {string} boardType - 게시판 타입(예: notice, free 등)
 * @returns {Promise<ApiRes<Post[]>>} - 게시글 목록 응답 객체
 */
export async function getPosts(boardType: string): ApiResPromise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts?type=${boardType}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 특정 게시글의 상세 정보를 가져옵니다.
 * @param {number} _id - 게시글의 고유 ID
 * @returns {Promise<ApiRes<Post>>} - 게시글 상세 정보 응답 객체
 */
export async function getPost(_id: number): ApiResPromise<Post> {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 특정 게시글의 댓글 목록을 가져옵니다.
 * @param {number} _id - 게시글의 고유 ID
 * @returns {Promise<ApiRes<PostReply[]>>} - 댓글 목록 응답 객체
 */
export async function getReplies(_id: number): ApiResPromise<PostReply[]> {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}/replies`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 내 레시피 목록 불러오기
 * @param {string} boardType - 게시판 타입(예: notice, free 등)
 * @returns {Promise<ApiRes<Post[]>>} - 게시글 목록 응답 객체
 */
export async function getMyRecipe(
  accessToken: string,
): ApiResPromise<MyPostType[]> {
  try {
    const res = await fetch(`${API_URL}/posts/users?type=recipe`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'force-cache',
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 내 북마크  레시피 목록 불러오기
 * @param {string} boardType - 게시판 타입(예: notice, free 등)
 * @returns {Promise<ApiRes<Post[]>>} - 게시글 목록 응답 객체
 */
export async function getLikeRecipe(
  accessToken: string,
): ApiResPromise<LikePostType[]> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/post?type=recipe`, {
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'force-cache',
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}
