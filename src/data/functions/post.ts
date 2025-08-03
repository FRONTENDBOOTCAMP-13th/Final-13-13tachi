import {
  CartItemType,
  ApiResPromise,
  ProductType,
  ProductTypeRes,
  LikeItemType,
  BuyListType,
  OrderInfoType,
  ShoppingOrderType,
  MemberType,
} from '@/types';
import { LikePostType, MyPostType, Post, PostReply } from '@/types/post';
import { CreatePostData, ApiRes } from '@/types/post';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// ============= 레시피 관련 API 함수들 =============

/**
 * 레시피 수정
 * @param {string} accessToken - 인증 토큰
 * @param {number} postId - 게시글 ID
 * @param {object} updateData - 수정할 데이터 (title, content)
 * @returns {Promise<ApiRes<Post>>} - 수정 결과 응답 객체
 */
export async function updateRecipe(
  accessToken: string,
  postId: number,
  updateData: { title: string; content: string }
): ApiResPromise<Post> {
  try {
    const res = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();
    
    if (!res.ok || data.ok !== 1) {
      return { ok: 0, message: data.message || '수정에 실패했습니다.' };
    }
    
    return data;
  } catch (error) {
    console.error('레시피 수정 오류:', error);
    return { ok: 0, message: '수정 중 오류가 발생했습니다.' };
  }
}

/**
 * 레시피 삭제
 * @param {string} accessToken - 인증 토큰
 * @param {number} postId - 게시글 ID
 * @returns {Promise<ApiRes<unknown>>} - 삭제 결과 응답 객체
 */
export async function deleteRecipe(
  accessToken: string,
  postId: number
): ApiResPromise<unknown> {
  try {
    const res = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    
    if (!res.ok || data.ok !== 1) {
      return { ok: 0, message: data.message || '삭제 실패' };
    }
    
    return data;
  } catch (error) {
    console.error('레시피 삭제 오류:', error);
    return { ok: 0, message: '삭제 중 오류가 발생했습니다.' };
  }
}

/**
 * 레시피 북마크 추가
 * @param {string} accessToken - 인증 토큰
 * @param {number} postId - 게시글 ID
 * @returns {Promise<ApiRes<{_id: number}>>} - 북마크 추가 결과
 */
export async function addRecipeBookmark(
  accessToken: string,
  postId: number
): ApiResPromise<{_id: number}> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ target_id: postId }),
    });

    const data = await res.json();
    
    if (!res.ok || data.ok !== 1) {
      return { ok: 0, message: data.message || '북마크 추가 실패' };
    }
    
    return data;
  } catch (error) {
    console.error('북마크 추가 오류:', error);
    return { ok: 0, message: '북마크 추가 중 오류가 발생했습니다.' };
  }
}

/**
 * 레시피 북마크 삭제
 * @param {string} accessToken - 인증 토큰
 * @param {number} bookmarkId - 북마크 ID
 * @returns {Promise<ApiRes<unknown>>} - 북마크 삭제 결과
 */
export async function deleteRecipeBookmark(
  accessToken: string,
  bookmarkId: number
): ApiResPromise<unknown> {
  try {
    const res = await fetch(`${API_URL}/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    
    if (!res.ok || data.ok !== 1) {
      return { ok: 0, message: data.message || '북마크 삭제 실패' };
    }
    
    return data;
  } catch (error) {
    console.error('북마크 삭제 오류:', error);
    return { ok: 0, message: '북마크 삭제 중 오류가 발생했습니다.' };
  }
}

// ============= 기존 함수들 (수정된 이름들) =============

/**
 * 북마크 추가 (기존 함수 - 하위 호환성 유지)
 * @deprecated addRecipeBookmark 사용 권장
 */
export const addBookmark = addRecipeBookmark;

/**
 * 북마크 삭제 (기존 함수 - 하위 호환성 유지)
 * @deprecated deleteRecipeBookmark 사용 권장
 */
export const deleteBookmark = deleteRecipeBookmark;

// ============= 기존 API 함수들 (그대로 유지) =============

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

// 이미지 파일 업로드
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('attach', file);

  const res = await fetch(`${API_URL}/files/`, {
    method: 'POST',
    headers: {
      'client-id': CLIENT_ID,
    },
    body: formData,
  });
  const data = await res.json();

  if (!res.ok || data.ok !== 1 || !data.item?.length) {
    throw new Error('파일 업로드 실패');
  }

  return data.item[0].path;
}

// 게시글 등록
export async function createPost(
  postData: CreatePostData,
): Promise<ApiRes<unknown>> {
  const res = await fetch(`${API_URL}/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${postData.accessToken ?? ''}`,
    },
    body: JSON.stringify(postData),
  });

  const data = await res.json();

  if (!res.ok || data.ok !== 1) {
    return { ok: 0, message: data.message ?? '게시글 등록 실패' };
  }

  return data;
}

// 태그와 일치하는 상품 필터링 함수
export function getRelatedProducts(products: ProductType[], tags: string[]) {
  return products.filter(product => {
    const name = product.name ?? '';
    const category = product.extra?.category ?? '';
    return tags.some(tag => name.includes(tag) || category.includes(tag));
  });
}

// 단일 상품 구매 정보 불러오기
export async function getShoppingOrder({
  id,
  quantity,
  accessToken,
}: {
  id: string;
  quantity: string;
  accessToken: string;
}): ApiResPromise<ShoppingOrderType> {
  const body = {
    dryRun: true,
    products: [
      {
        _id: Number(id),
        quantity: Number(quantity),
      },
    ],
  };

  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

// 단일 회원 정보 조회
export async function getMember(_id: number): ApiResPromise<MemberType> {
  try {
    const res = await fetch(`${API_URL}/users/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      next: {
        tags: [`users/${_id}`],
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 조회에 실패했습니다.' };
  }
}