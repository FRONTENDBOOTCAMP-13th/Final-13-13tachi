import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// 로그아웃
export async function Logout() {
  (await cookies()).delete('authjs.session-token');
  (await cookies()).delete('authjs.callback-url');

  // 배포용 쿠키 삭제
  const response = NextResponse.json({ ok: true });

  response.cookies.set('__Secure-authjs.session-token', '', {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });

  response.cookies.set('__Secure-authjs.callback-url', '', {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
}
