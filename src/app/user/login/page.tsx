import LoginForm from '@/app/user/login/LoginForm';
import Image from 'next/image';

export default async function LoginPage() {
  return (
    <div className="relative">
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
