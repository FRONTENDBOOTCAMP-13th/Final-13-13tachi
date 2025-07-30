'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useUserStore from '@/zustand/useStore';

export default function InitUserStore() {
  const { data: session, status } = useSession();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUser({
        _id: Number(session.user.id),
        name: session.user.name ?? '',
        email: session.user.email ?? '',
        image: session.user.image ?? '',
        type: 'user',
        token: {
          accessToken: session.user.accessToken ?? '',
          refreshToken: session.user.refreshToken ?? '',
        },
      });
    }
  }, [session, status, setUser]);

  return null;
}
