export declare module '@auth/core/types' {
  interface User {
    id?: string;
    type?: string;
    loginType?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    id?: string;
    type?: string;
    loginType?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
