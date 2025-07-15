import Button from '@/components/common/Button';
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

      <main className="py-[95px] flex justify-center items-center min-h-full">
        <div
          className="py-[69px] rounded-[15px] w-[400px] h-[500px] max-w-md bg-white"
          style={{ boxShadow: '6px 6px 4px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="flex flex-col items-center text-center ">
            <Image
              src="/logo-black.svg"
              alt="로고"
              width={110}
              height={70}
            ></Image>
            <h2 className="text-4xl font-semibold mt-[10px] text-dark-green">
              로그인
            </h2>
          </div>

          <form action="/">
            <div className="mb-[10px] mt-[20px] flex justify-center ">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="이메일을 입력하세요"
                className="w-[290px] h-[45px] px-3 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-gray "
                name="email"
              />
            </div>
            <div className="mb-[10px] flex justify-center">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호를 입력하세요"
                className="w-[290px] h-[45px] px-3 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-gray"
                name="password"
              />
            </div>
            <div className="flex justify-between w-[290px] mx-auto ml-auto text-gray text-xs  hover:underline">
              <div className="flex">
                <Image
                  src="/public/checkbox.svg"
                  alt="로고"
                  width={14}
                  height={14}
                ></Image>
                <p>자동 로그인</p>
              </div>
              <Link href="#">회원가입</Link>
            </div>

            <div className=" flex justify-center items-center mt-[50px]">
              <Button size="md">로그인</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
