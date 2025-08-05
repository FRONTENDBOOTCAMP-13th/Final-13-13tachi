import LoginForm from '@/app/(user)/login/LoginForm';
import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Login - UgVeg: 흙내음 상점`,
    description: `흙내음 상점에 로그인하세요.`,
    openGraph: {
      title: `Login  - UgVeg: 흙내음 상점`,
      description: `흙내음 상점에 로그인하세요.`,
      url: `/login`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default async function LoginPage() {
  return (
    <main className="flex justify-center items-center min-h-[calc(100dvh-26.125px)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-img.svg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black opacity-50" />

      <div className=" pt-[100px] pb-[100px] md:py-[107px]  flex justify-center items-center min-h-full">
        <div
          className="py-[30px] md:py-[73px] lg:py-[4.3125rem] rounded-[0.9375rem] w-[300px] h-[350px] md:w-[25rem] md:h-[31.25rem] lg:w-[25rem] lg:h-[31.25rem] max-w-md bg-white"
          style={{ boxShadow: '.375rem .375rem .25rem rgba(0, 0, 0, 0.25)' }}
        >
          <div className="flex flex-col items-center text-center ">
            <div className="relative w-[95px] h-[50px] md:w-[9rem] md:h-[4.5rem] lg:w-[9rem] lg:h-[4.5rem] mb-2">
              <Image
                src="/logo-black.svg"
                alt="로고"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-xl md:text-4xl lg:text-4xl font-semibold  lg:mt-[0.625rem] text-dark-green">
              로그인
            </h2>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
