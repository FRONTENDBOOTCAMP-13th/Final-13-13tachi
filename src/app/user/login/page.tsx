import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Image from 'next/image';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-img.svg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-black opacity-50" />

      <main className="py-[5.9375rem] flex justify-center items-center min-h-full">
        <div
          className="py-[4.3125rem] rounded-[0.9375rem] w-[25rem] h-[31.25rem] max-w-md bg-white"
          style={{ boxShadow: '.375rem .375rem .25rem rgba(0, 0, 0, 0.25)' }}
        >
          <div className="flex flex-col items-center text-center ">
            <Image src="/logo-black.svg" alt="로고" width={110} height={70} />
            <h2 className="text-4xl font-semibold mt-[0.625rem] text-dark-green">
              로그인
            </h2>
          </div>

          <form action="/">
            <div className="mb-[0.625rem] mt-[1.25rem] flex justify-center ">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="이메일을 입력하세요"
                className="w-[18.125rem] h-[2.8125rem] px-[0.75rem] py-[0.5rem] border border-light-gray rounded-lg focus:outline-none focus:border-gray "
                name="email"
              />
            </div>
            <div className="mb-[0.625rem] flex justify-center">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력하세요"
                className="w-[18.125rem] h-[2.8125rem] px-[0.75rem] py-[0.5rem] border border-light-gray rounded-lg focus:outline-none focus:border-gray"
                name="password"
              />
            </div>
            <div className="flex justify-between items-center w-[18.125rem] mx-auto ml-auto text-gray text-xs hover:underline">
              <div className="flex items-center gap-1">
                <Checkbox className="w-[1.25rem] lg:h-[1.25rem]" />
                <p>자동 로그인</p>
              </div>
              <Link href="#">회원가입</Link>
            </div>

            <div className="flex justify-center items-center mt-[3.125rem]">
              <Button size="md">로그인</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
