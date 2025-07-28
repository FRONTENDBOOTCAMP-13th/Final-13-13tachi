import Image from 'next/image';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100dvh-25rem)] md:min-h-[calc(100dvh-20.185rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-img.svg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black opacity-50" />
      <div className="flex flex-col items-center ">
        <h2 className="text-base font-semibold md:text-lg md:font-semibold lg:text-xl lg:font-bold text-center text-white mb-[1.25rem]">
          흙내음 상점에서 <br /> 자연의 맛을 로그인하세요
        </h2>

        {/* 이메일 로그인 */}
        <div className="flex flex-col gap-[0.625rem] w-full relative">
          <Link
            href="/login"
            className="flex items-center justify-center w-[280px] h-[45px] md:w-[264px] md:h-[45px] lg:w-[20.3125rem] lg:h-[3.4375rem] border-white border-[0.1875rem] text-sm lg:text-base lg:font-semibold text-white text-center rounded-lg hover:bg-black/15"
          >
            이메일로 시작하기
          </Link>

          {/* 카카오 로그인 */}
          <Link
            href="/api/auth/kakao"
            className="block text-sm w-[280px] h-[45px] md:w-[264px] md:h-[45px] lg:w-[20.3125rem] lg:h-[3.4375rem]"
          >
            <Image
              src="/kakao.svg"
              alt="Kakao Login"
              width={325}
              height={55}
              className="w-full h-auto"
            />
          </Link>

          {/* 네이버 로그인 */}
          <Link
            href="/api/auth/naver"
            className="block text-sm w-[280px] h-[45px] md:w-[264px] md:h-[45px] lg:w-[20.3125rem] lg:h-[3.4375rem]"
          >
            <Image
              src="/naver.svg"
              alt="Naver Login"
              width={325}
              height={55}
              className="w-full h-auto"
            />
          </Link>

          {/* 회원가입 */}
          <Link
            href="/signup"
            className="absolute right-0 bottom-[-2rem] text-sm text-white hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
