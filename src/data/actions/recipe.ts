'use server';

import { ApiRes, ApiResPromise } from '@/types';
import { CreatePostData, LikePostType, Post, PostReply } from '@/types/recipe';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// ============= 레시피 작성 관련 함수 ==============

/**
 * 레시피 생성하는 함수
 * @param {ApiRes<Post> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 게시글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<Post>>} - 생성 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 게시글을 생성하고, 성공 시 해당 게시판으로 리다이렉트합니다.
 * 실패 시 에러 메시지를 반환합니다.
 */
export async function createPost(
  postData: CreatePostData,
): ApiResPromise<Post> {
  let res: Response;
  let data: ApiRes<Post>;

  try {
    res = await fetch(`${API_URL}/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${postData.accessToken ?? ''}`,
      },
      body: JSON.stringify(postData),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`recipe`); // 게시글 상세 페이지 갱신
    revalidatePath(`/recipe`);
    return data;
  } else {
    return data;
  }
}

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
  updateData: { title: string; content: string },
): ApiResPromise<Post> {
  let res: Response;
  let data: ApiRes<Post>;

  try {
    res = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateData),
    });

    data = await res.json();

    // if (!res.ok || data.ok !== 1) {
    //   return { ok: 0, message: data.message || '수정에 실패했습니다.' };
    // }
  } catch (error) {
    console.error('레시피 수정 오류:', error);
    return { ok: 0, message: '수정 중 오류가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`recipe`); // 게시글 상세 페이지 갱신
    revalidatePath(`/recipe`);
    return data;
  } else {
    return data;
  }
}

/**
 * 레시피 삭제
 * @param {string} accessToken - 인증 토큰
 * @param {number} postId - 게시글 ID
 * @returns {Promise<ApiRes<Post>>} - 삭제 결과 응답 객체
 */
export async function deleteRecipe(
  accessToken: string,
  postId: number,
): ApiResPromise<Post> {
  let res: Response;
  let data: ApiRes<Post>;

  try {
    res = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();

    // if (!res.ok || data.ok !== 1) {
    //   return { ok: 0, message: data.message || '삭제 실패' };
    // }
  } catch (error) {
    console.error('레시피 삭제 오류:', error);
    return { ok: 0, message: '삭제 중 오류가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`recipe`); // 게시글 상세 페이지 갱신
    revalidatePath(`/recipe`);
    return data;
  } else {
    return data;
  }
}

// ============= 레시피 댓글 관련 함수 ==============

/**
 * 댓글을 생성하는 함수
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 생성 결과 응답 객체
 * @description
 * 댓글을 생성하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function createReply(
  state: ApiRes<PostReply> | null,
  formData: FormData,
): ApiResPromise<PostReply> {
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: ApiRes<PostReply>;
  const accessToken = formData.get('accessToken');

  try {
    res = await fetch(`${API_URL}/posts/${body._id}/replies`, {
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
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }

  if (data.ok) {
    revalidatePath(`/${body.type}/${body._id}/replies`);
  }

  return data;
}

// 댓글 수정
export async function updateReply(
  state: ApiRes<PostReply> | null,
  formData: FormData,
): ApiResPromise<PostReply> {
  const _id = formData.get('_id');
  const replyId = formData.get('replyId');
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<PostReply>;

  try {
    res = await fetch(`${API_URL}/posts/${_id}/replies/${replyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`posts/${_id}/replies`);
  }

  return data;
}

/**
 * 댓글을 삭제하는 함수
 * @param {ApiRes<PostReply> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 삭제할 댓글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<PostReply>>} - 삭제 결과 응답 객체
 * @description
 * 댓글을 삭제하고, 성공 시 해당 게시글의 댓글 목록을 갱신합니다.
 */
export async function deleteReply(
  state: ApiRes<PostReply> | null,
  formData: FormData,
): ApiResPromise<PostReply> {
  const _id = formData.get('_id');
  const replyId = formData.get('replyId');
  const accessToken = formData.get('accessToken');

  let res: Response;
  let data: ApiRes<PostReply>;

  try {
    res = await fetch(`${API_URL}/posts/${_id}/replies/${replyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`posts/${_id}/replies`);
  }

  return data;
}

// ============= 레시피 북마크 관련 함수 ==============

/**
 * 레시피 북마크 추가
 * @param {string} accessToken - 인증 토큰
 * @param {number} postId - 게시글 ID
 * @returns {Promise<ApiRes<{_id: number}>>} - 북마크 추가 결과
 */
export async function addRecipeBookmark(
  accessToken: string,
  postId: number,
): ApiResPromise<LikePostType> {
  let res: Response;
  let data: ApiRes<LikePostType>;
  try {
    res = await fetch(`${API_URL}/bookmarks/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ target_id: postId }),
    });

    data = await res.json();
  } catch (error) {
    console.error('북마크 추가 오류:', error);
    return { ok: 0, message: '북마크 추가 중 오류가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`recipe`); // 게시글 상세 페이지 갱신
    revalidatePath(`/recipe`);
    return data;
  } else {
    return data;
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
  bookmarkId: number,
): ApiResPromise<LikePostType> {
  let res: Response;
  let data: ApiRes<LikePostType>;
  try {
    res = await fetch(`${API_URL}/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
  } catch (error) {
    console.error('북마크 삭제 오류:', error);
    return { ok: 0, message: '북마크 삭제 중 오류가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag(`recipe`); // 게시글 상세 페이지 갱신
    revalidatePath(`/recipe`);
    return data;
  } else {
    return data;
  }
}

/**
 * 북마크 삭제 (마이페이지용)
 * @param {ApiRes<LikePostType> | null} state - 이전 상태
 * @param {FormData} formData - 삭제할 북마크 정보
 * @returns {Promise<ApiRes<LikePostType>>} - 삭제 결과 응답 객체
 */
export async function deleteBookmark(
  state: ApiRes<LikePostType> | null,
  formData: FormData,
): ApiResPromise<LikePostType> {
  const _id = formData.get('_id');
  const accessToken = formData.get('accessToken');
  const body = {
    target_id: formData.get('_id'),
  };
  let res: Response;
  let data: ApiRes<LikePostType>;

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
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  if (data.ok) {
    redirect(`/mypage/recipe/bookmarkRecipe`);
  }

  return data;
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
