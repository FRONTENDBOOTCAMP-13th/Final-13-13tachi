'use server';

import { ApiRes, ApiResPromise, User } from '@/types';

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
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
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

  let res: Response;
  let data: ApiRes<User>;

  try {
    // 로그인 API 호출
    res = await fetch(`${API_URL}/users/login`, {
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
