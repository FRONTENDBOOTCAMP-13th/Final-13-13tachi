import LoginForm from '@/app/(user)/login/LoginForm';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function LoginPage() {
  return (
    <div className="relative min-h-[calc(100dvh-25rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-img.svg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black opacity-50" />

      <main className=" py-[110px] lg:py-[5.9375rem] flex justify-center items-center min-h-full">
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
      </main>
    </div>
  );
}
