import { ApiResPromise, ProductType } from '@/types';
import { LikePostType, MyPostType, Post, PostReply } from '@/types/recipe';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

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
    });
    return res.json();
  } catch (error) {
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
    });
    return res.json();
  } catch (error) {
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
    const res = await fetch(
      `${API_URL}/posts/${_id}/replies?limit=10&page=1&sort={"_id":1}`,
      {
        headers: {
          'Client-Id': CLIENT_ID,
        },
        next: {
          tags: [`posts/${_id}/replies`],
        },
      },
    );
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 내 레시피 목록 불러오기
 * @param {string} accessToken - 인증 토큰
 * @returns {Promise<ApiRes<MyPostType[]>>} - 내 레시피 목록 응답 객체
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
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 내 북마크 레시피 목록 불러오기
 * @param {string} accessToken - 인증 토큰
 * @returns {Promise<ApiRes<LikePostType[]>>} - 북마크된 레시피 목록 응답 객체
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
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 레시피 상세 불러오기
 * @param {number} _id - 레시피 ID
 * @returns {Promise<ApiRes<Post>>} - 레시피 상세 정보 응답 객체
 */
export async function getRecipeDetail(_id: number): ApiResPromise<Post> {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 레시피 목록 불러오기
 * @returns {Promise<ApiRes<Post[]>>} - 레시피 목록 응답 객체
 */
export async function getRecipes(): ApiResPromise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts?type=recipe`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

// 태그와 일치하는 상품 필터링 함수
export function getRelatedProducts(products: ProductType[], tags: string[]) {
  return products.filter(product => {
    const name = product.name ?? '';
    const category = product.extra?.category ?? '';
    return tags.some(tag => name.includes(tag) || category.includes(tag));
  });
}
