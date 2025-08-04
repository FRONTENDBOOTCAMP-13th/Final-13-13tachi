'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/zustand/useStore';
import { getMember } from '@/data/functions/user';

export default function InitUserStore() {
  const { data: session, status } = useSession();
  const { setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      if (status === 'authenticated' && session?.user) {
        //zustand에 로그인 유저 정보 저장
        setUser({
          _id: Number(session.user.id),
          name: session.user.name ?? '',
          email: session.user.email ?? '',
          image: session.user.image ?? '',
          loginType: session.user.loginType as 'email' | 'kakao' | 'naver',
          type: 'user',
          token: {
            accessToken: session.user.accessToken ?? '',
            refreshToken: session.user.refreshToken ?? '',
          },
        });

        //서버 전화번호 유무 확인 getMember
        //전화번호 없을 시 수정 페이지로 이동
        const res = await getMember(Number(session.user.id));
        if (res.ok && !res.item.phone) {
          router.replace('/socialedit');
        }
      }
    };

    init();
  }, [session, status, setUser, router]);

  return null;
}
