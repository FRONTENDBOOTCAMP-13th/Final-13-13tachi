import LoginForm from '@/app/(user)/login/LoginForm';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `로그인 - UgVeg : 흙내음 상점`,
  description: `흙내음 상점에서 자연의 맛을 로그인하세요`,
  openGraph: {
    title: `로그인 - UgVeg : 흙내음 상점`,
    description: `흙내음 상점에서 자연의 맛을 로그인하세요`,
    url: `/login`,
    images: {
      url: '/thumbnail.svg',
    },
  },
};

export default async function LoginPage() {
  return (
    <div className="relative lg:min-h-[calc(100dvh-21.625rem)]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-img.svg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black opacity-50" />

      <main className="lg:py-[5.9375rem] flex justify-center items-center min-h-full">
        <div
          className="lg:py-[4.3125rem] rounded-[0.9375rem] lg:w-[25rem] lg:h-[31.25rem] max-w-md bg-white"
          style={{ boxShadow: '.375rem .375rem .25rem rgba(0, 0, 0, 0.25)' }}
        >
          <div className="flex flex-col items-center text-center ">
            <Image src="/logo-black.svg" alt="로고" width={110} height={70} />
            <h2 className="lg:text-4xl lg:font-semibold lg:mt-[0.625rem] text-dark-green">
              로그인
            </h2>
          </div>

          <LoginForm />
        </div>
      </main>
    </div>
  );
}
