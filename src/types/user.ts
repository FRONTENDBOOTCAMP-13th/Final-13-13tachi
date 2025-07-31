export interface User {
  _id: number; // 사용자 고유 ID
  email: string; // 이메일 주소
  name: string; // 사용자 이름
  phone?: string; // 전화번호
  address?: string; // 주소
  postcode?: string; //우편변호
  addressDetail1?: string; //상세주소1
  addressDetail2?: string; //상세주소2
  type: 'user' | 'seller' | 'admin'; // 사용자 유형
  loginType?: 'email' | 'kakao' | 'naver'; // 로그인 방식
  image?: string; // 프로필 이미지
  token?: {
    // 인증 토큰
    accessToken: string; // 액세스 토큰
    refreshToken: string; // 리프레시 토큰
  };
  createdAt?: string; // 생성일
  updatedAt?: string; // 수정일
}
export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

export interface UserInfoType {
  name: string;
  phone: string;
  postcode: string;
  addressDetail1: string;
  addressDetail2: string;
}

// auth provider 인증 후 자동 회원 가입에 사용되는 타입
// 필수: type, loginType, extra.providerAccountId
// 선택: name, email, image
export type OAuthUser = Required<Pick<User, 'type' | 'loginType'>> &
  Partial<Pick<User, 'name' | 'email' | 'image'>> & {
    extra: {
      providerAccountId: string;
    };
  };
