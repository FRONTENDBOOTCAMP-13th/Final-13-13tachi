'use client';

import { useEffect } from 'react';
import useUserStore from '@/zustand/useStore';

export default function AuthInit() {
  const { setUser } = useUserStore(state => state);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userInfo = localStorage.getItem('userInfo');

    if (accessToken && userInfo) {
      try {
        //토큰 만료 시간 확인
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        //now보다 크면 유효한 토큰
        if (payload.exp > now) {
          const user = JSON.parse(userInfo);
          setUser({
            ...user,
            token: {
              accessToken,
            },
          });
        } else {
          // 만료된 토큰이면 삭제
          localStorage.removeItem('accessToken');

          localStorage.removeItem('userInfo');
        }
      } catch (err) {
        console.error('자동 로그인 복원 실패:', err);
      }
    }
  }, []);

  return null;
}
