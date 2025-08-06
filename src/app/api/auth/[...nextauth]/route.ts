// import { handlers } from '@/auth';

// export const { GET, POST } = handlers;

import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
// import { authOptions } from '@/lib/auth'; // 설정한 인증 옵션

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  // 추가 옵션 필요시 작성
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
