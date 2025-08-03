'use server';

import { ApiRes, ApiResPromise, User } from '@/types';
import { LikePostType, Post, PostReply } from '@/types/post';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 게시글을 생성하는 함수
 * @param {ApiRes<Post> | null} state - 이전 상태(사용하지 않음)
 * @param {FormData} formData - 게시글 정보를 담은 FormData 객체
 * @returns {Promise<ApiRes<Post>>} - 생성 결과 응답 객체
 * @throws {Error} - 네트워크 오류 발생 시
 * @description
 * 게시글을 생성하고, 성공 시 해당 게시판으로 리다이렉트합니다.
 * 실패 시 에러 메시지를 반환합니다.
 */
export async function createPost(
  state: ApiRes<Post> | null,
  formData: FormData,
): ApiResPromise<Post> {
  // FormData를 일반 Object로 변환
  const body = Object.fromEntries(formData.entries());

  let res: Response;
  let data: ApiRes<Post>;

  try {
    res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${body.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }

  // redirect는 예외를 throw 하는 방식이라서 try 문에서 사용하면 catch로 처리되므로 제대로 동작하지 않음
  if (data.ok) {
    revalidatePath(`/recipe`);
    redirect(`/recipe`);
  } else {
    return data;
  }
}

/**
 * 게시글을 수정하는 Server Action
 * @param {ApiRes<Post> | null} state - 이전 상태
 * @param {FormData} formData - 수정할 게시글 정보
 * @returns {Promise<ApiRes<Post>>} - 수정 결과
 */
export async function updatePostAction(
  state: ApiRes<Post> | null,
  formData: FormData,
): ApiResPromise<Post> {
  const postId = formData.get('postId') as string;
  const accessToken = formData.get('accessToken') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  let res: Response;
  let data: ApiRes<Post>;

  try {
    res = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, content }),
    });

    data = await res.json();
  } catch (error) {
    console.error('게시글 수정 오류:', error);
    return { ok: 0, message: '수정 중 오류가 발생했습니다.' };
  }

  if (data.ok) {
    revalidatePath(`/recipe/${postId}`);
    revalidatePath('/recipe');
  }

  return data;
}

/**
 * 게시글을 삭제하는 Server Action
 * @param {ApiRes<unknown> | null} state - 이전 상태
 * @param {FormData} formData - 삭제할 게시글 정보
 * @returns {Promise<ApiRes<unknown>>} - 삭제 결과
 */
export async function deletePostAction(
  state: ApiRes<unknown> | null,
  formData: FormData,
): ApiResPromise<unknown> {
  const postId = formData.get('postId') as string;
  const accessToken = formData.get('accessToken') as string;

  let res: Response;
  let data: ApiRes<unknown>;

  try {
    res = await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    data = await res.json();
  } catch (error) {
    console.error('게시글 삭제 오류:', error);
    return { ok: 0, message: '삭제 중 오류가 발생했습니다.' };
  }

  if (data.ok) {
    revalidatePath('/recipe');
    redirect('/recipe');
  } else {
    return data;
  }
}

/**
 * 북마크를 추가하는 Server Action
 * @param {ApiRes<{_id: number}> | null} state - 이전 상태
 * @param {FormData} formData - 북마크 추가 정보
 * @returns {Promise<ApiRes<{_id: number}>>} - 북마크 추가 결과
 */
export async function addBookmarkAction(
  state: ApiRes<{_id: number}> | null,
  formData: FormData,
): ApiResPromise<{_id: number}> {
  const postId = formData.get('postId') as string;
  const accessToken = formData.get('accessToken') as string;

  let res: Response;
  let data: ApiRes<{_id: number}>;

  try {
    res = await fetch(`${API_URL}/bookmarks/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ target_id: Number(postId) }),
    });

    data = await res.json();
  } catch (error) {
    console.error('북마크 추가 오류:', error);
    return { ok: 0, message: '북마크 추가 중 오류가 발생했습니다.' };
  }

  if (data.ok) {
    revalidateTag('bookmarks');
  }

  return data;
}

/**
 * 북마크를 삭제하는 Server Action
 * @param {ApiRes<unknown> | null} state - 이전 상태
 * @param {FormData} formData - 북마크 삭제 정보
 * @returns {Promise<ApiRes<unknown>>} - 북마크 삭제 결과
 */
export async function deleteBookmarkAction(
  state: ApiRes<unknown> | null,
  formData: FormData,
): ApiResPromise<unknown> {
  const bookmarkId = formData.get('bookmarkId') as string;
  const accessToken = formData.get('accessToken') as string;

  let res: Response;
  let data: ApiRes<unknown>;

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
    revalidateTag('bookmarks');
  }

  return data;
}

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
  console.log(body);

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
 * 북마크 삭제 (기존 함수 - 마이페이지용)
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
    redirect(`/mypage/recipe/likerecipe`);
  }

  return data;
}

/**
 * 사용자 목록을 조회하는 함수
 * @param {string} name - 조회할 사용자 이름
 * @returns {Promise<ApiRes<User[]>>} - 사용자 목록 응답 객체
 * @description
 * 이름으로 사용자를 검색하여 프로필 이미지 등의 정보를 가져옵니다.
 */
export async function getUserByName(name: string): Promise<ApiRes<User[]>> {
  let res: Response;
  let data: ApiRes<User[]>;

  try {
    res = await fetch(`${API_URL}/users?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
    });

    data = await res.json();
  } catch (error) {
    console.error('사용자 정보 조회 중 오류:', error);
    return {
      ok: 0,
      message: '일시적인 네트워크 문제로 사용자 정보를 가져올 수 없습니다.',
    };
  }

  return data;
}

/**
 * 사용자 ID로 사용자 정보를 조회하는 함수
 * @param {number} userId - 조회할 사용자 ID
 * @returns {Promise<ApiRes<User[]>>} - 사용자 정보 응답 객체
 */
export async function getUserById(userId: number): Promise<ApiRes<User[]>> {
  let res: Response;
  let data: ApiRes<User[]>;

  try {
    res = await fetch(`${API_URL}/users?_id=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
    });

    data = await res.json();
  } catch (error) {
    console.error('사용자 정보 조회 중 오류:', error);
    return {
      ok: 0,
      message: '일시적인 네트워크 문제로 사용자 정보를 가져올 수 없습니다.',
    };
  }

  return data;
}