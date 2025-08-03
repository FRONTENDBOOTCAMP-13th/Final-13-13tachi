'use server';

import { signIn } from '@/auth';
import { ApiRes, ApiResPromise, User } from '@/types';
import { OAuthUser } from '@/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 회원가입 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 회원가입 폼 데이터(FormData 객체)
 * @returns 회원가입 결과 응답 객체
 */
export async function createUser(
  state: ApiRes<User> | null,
  formData: FormData,
): ApiResPromise<User> {
  let res: Response;
  let data: ApiRes<User>;

  try {
    // 회원가입 요청 바디 생성
    const body = {
      type: formData.get('type') || 'user',
      image: formData.get('image'),
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      phone: formData.get('phone'),
      postcode: formData.get('postcode'),
      addressDetail1: formData.get('addressDetail1'),
      addressDetail2: formData.get('addressDetail2'),
    };

    // 회원가입 API 호출
    res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  return data;
}

/**
 * 로그인 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 로그인 폼 데이터(FormData 객체)
 * @returns 로그인 결과 응답 객체
 */
export async function login(
  state: ApiRes<User> | null,
  formData: FormData,
): ApiResPromise<User> {
  const body = Object.fromEntries(formData.entries());

  const autoLogin = body.autoLogin === 'true'; //자동로그인 체크했는지 확인
  const query = autoLogin ? '?expiresIn=30d' : ''; //자동로그인일 경우 30일

  try {
    const res = await fetch(`${API_URL}/users/login${query}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }
}

/**
 * 회원정보 수정 함수
 * @param state - 이전 상태(사용하지 않음)
 * @param formData - 회원정보 폼 데이터(FormData 객체)
 * @returns 회원정보 결과 응답 객체
 */
export async function updateUser(
  state: ApiRes<User> | null,
  formData: FormData,
): ApiResPromise<User> {
  const userId = formData.get('userId');
  const accessToken = formData.get('accessToken');

  if (!userId || !accessToken) {
    return { ok: 0, message: '인증 정보가 없습니다.' };
  }

  const body = {
    phone: formData.get('phone'),
    password: formData.get('password'),
    postcode: formData.get('postcode'),
    addressDetail1: formData.get('addressDetail1'),
    addressDetail2: formData.get('addressDetail2'),
  };

  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
}

/**
 * OAuth 인증 후 자동 회원가입 함수
 * @param user - OAuth 사용자 정보 객체
 * @returns 회원가입 결과 응답 객체
 * @description
 * OAuth 제공자 인증 후 자동으로 회원가입을 처리합니다.
 */
export async function createUserWithOAuth(
  user: OAuthUser,
): ApiResPromise<User> {
  const res = await fetch(`${API_URL}/users/signup/oauth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': CLIENT_ID,
    },
    body: JSON.stringify(user),
  });

  return res.json();
}

/**
 * OAuth 제공자로 인증된 사용자를 API 서버에 로그인 처리
 * @param providerAccountId - OAuth 제공자 계정 ID
 * @returns 로그인 결과 응답 객체
 * @description
 * OAuth 제공자 계정 ID를 사용하여 기존 사용자를 로그인 처리합니다.
 */
export async function loginWithOAuth(
  providerAccountId: string,
): ApiResPromise<User> {
  const res = await fetch(`${API_URL}/users/login/with`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Client-Id': CLIENT_ID,
    },
    body: JSON.stringify({ providerAccountId }),
  });
  return res.json();
}

/**
 * Auth.js 기반 로그인 함수
 * @param provider - 로그인 제공자 ('credentials', 'google', 'github', 'naver', 'kakao')
 * @param formData - 로그인 폼 데이터(FormData 객체)
 * @returns Promise<void>
 * @description
 * credentials 로그인 시 email/password를 사용하고, OAuth 로그인 시 provider만 사용합니다.
 */
export async function loginWithAuthjs(provider: string, formData: FormData) {
  // 로그인 후에 이동해야 할 페이지(redirect 파라미터) 추출
  const redirectTo = (formData.get('redirect') as string) || '/';

  await signIn(provider, { redirectTo });
}
