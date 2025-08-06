import NextAuth from 'next-auth';
import { createUserWithOAuth, loginWithOAuth } from '@/data/actions/user';
import { OAuthUser, User } from '@/types';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
/**
 * Authjs 설정
 * @description
 * 인증 제공자, 세션 전략, 콜백 함수 등을 설정하고
 * handlers, signIn, signOut, auth 함수를 내보냅니다.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  /**
   * 배포시 현재 호스트를 신뢰하도록 설정
   * AUTH_TRUST_HOST=true 환경변수와 동일한 효과
   */
  trustHost: true,

  /**
   * 인증 제공자 설정
   * @description Google, GitHub, Kakao, Naver OAuth 제공자와 Credentials(email/password) 제공자를 설정
   */
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    /**
     * 네이버 OAuth 제공자 설정
     * @description 네이버 provider가 name을 반환하지 않으므로 직접 profile 변환 처리
     */
    NaverProvider({
      profile(profile) {
        return {
          id: profile.response.id,
          name: profile.response.name,
          email: profile.response.email,
        };
      },
    }),
  ],
  /**
   * 인증 과정에서 호출되는 콜백 함수들
   * @description 로그인, JWT 토큰 생성, 세션 생성, 리디렉션 처리 콜백
   */
  callbacks: {
    /**
     * 로그인 처리 콜백
     * @param {Object} params - 로그인 콜백 파라미터
     * @param {Object} params.user - authorize()가 리턴한 사용자 객체
     * @param {Object} params.account - provider 정보
     * @param {Object} params.profile - OAuth 제공자가 반환한 사용자 프로필 정보
     * @param {Object} params.credentials - authorize()에 전달된 로그인 정보
     * @returns {Promise<boolean>} 로그인 처리 계속 여부
     * @description
     * 로그인 처리를 계속 할지 여부 결정. OAuth 로그인시 자동 회원가입 및 로그인 처리를 수행.
     * true를 반환하면 로그인 처리를 계속하고, false를 반환하거나 오류를 던지면 로그인 흐름을 중단.
     */
    async signIn({ user, account, profile }) {
      switch (account?.provider) {
        case 'credentials':
          break;
        case 'kakao':
        case 'naver':
          let userInfo: User | null = null;
          try {
            // 자동 회원 가입
            const newUser: OAuthUser = {
              type: 'user',
              loginType: account.provider,
              name: user.name || undefined,
              email: user.email || undefined,
              image: user.image || undefined,
              // 인증 제공자에서 받은 정보를 extra 객체에 저장
              extra: {
                ...profile,
                providerAccountId: account.providerAccountId,
              },
            };

            // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
            await createUserWithOAuth(newUser);

            // 자동 로그인
            const resData = await loginWithOAuth(account.providerAccountId);
            if (resData.ok) {
              userInfo = resData.item;
            } else {
              // API 서버의 에러 메시지 처리
              throw new Error(resData.message);
            }
          } catch (err) {
            console.error(err);
            throw err;
          }

          user.id = String(userInfo._id);
          user.type = userInfo.type;
          user.loginType = userInfo.loginType;
          user.accessToken = userInfo.token!.accessToken;
          user.refreshToken = userInfo.token!.refreshToken;
          break;
      }
      return true;
    },

    /**
     * JWT 토큰 생성 콜백
     * @param {Object} params - JWT 콜백 파라미터
     * @param {Object} params.token - 기존 JWT 토큰 객체
     * @param {Object} params.user - 최초 로그인시에만 전달되는 사용자 객체
     * @returns {Promise<Object>} 업데이트된 JWT 토큰 객체
     * @description
     * 로그인에 성공한 회원 정보로 token 객체 설정.
     * 최초 로그인시 user 객체가 전달되며, 로그인 이후 세션 요청시에는 user 객체 없이 호출됨.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.loginType = user.loginType;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    /**
     * 세션 생성 콜백
     * @param {Object} params - 세션 콜백 파라미터
     * @param {Object} params.session - 기본 세션 객체
     * @param {Object} params.token - JWT 토큰 객체
     * @returns {Promise<Object>} 업데이트된 세션 객체
     * @description
     * 클라이언트에서 세션 정보 요청시 호출되며, token 객체 정보로 session 객체를 설정함.
     */
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.type = token.type as string;
      session.user.loginType = token.loginType as 'email' | 'kakao' | 'naver';
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
});
