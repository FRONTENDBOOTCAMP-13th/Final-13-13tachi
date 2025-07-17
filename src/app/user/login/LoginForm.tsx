'use client';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import { login } from '@/data/actions/user';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [userState, formAction, isLoading] = useActionState(login, null);
  console.log(isLoading, userState);

  const redirect = useSearchParams().get('redirect');

  // setUser는 상태를 변경하는 함수이므로 useEffect에서 호출해야 한다.
  useEffect(() => {
    if (userState?.ok) {
      alert('로그인이 완료되었습니다.');
      if (redirect) {
        router.replace(redirect); // 돌아갈 페이지가 있을 경우 이동한다.
      } else {
        router.back(); // 이전 페이지로 이동한다.
      }
    } else {
      if (!userState?.errors && userState?.message) {
        // 입력값 검증에러가 아닌 경우
        alert(userState.message); // 로그인 실패 메세지
      }
    }
  }, [userState]);

  return (
    <>
      <form action={formAction}>
        <div className="lg:mb-[0.625rem] lg:mt-[1.25rem] flex justify-center ">
          <div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="이메일을 입력하세요"
              className="lg:w-[18.125rem] lg:h-[2.8125rem] lg:px-[0.75rem] lg:py-[0.5rem] border border-light-gray rounded-lg focus:outline-none focus:border-gray "
              name="email"
            />
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {userState?.ok === 0 && userState.errors?.email?.msg}
            </p>
          </div>
        </div>
        <div className="lg:mb-[0.625rem] flex justify-center">
          <div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              className="lg:w-[18.125rem] lg:h-[2.8125rem] lg:px-[0.75rem] lg:py-[0.5rem] border border-light-gray rounded-lg focus:outline-none focus:border-gray"
              name="password"
            />
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {userState?.ok === 0 && userState.errors?.password?.msg}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center lg:w-[18.125rem] mx-auto ml-auto text-gray text-xs hover:underline">
          <div className="flex items-center gap-1">
            <Checkbox className="lg:w-[1.25rem] lg:h-[1.25rem]" />
            <p>자동 로그인</p>
          </div>
          <Link href="/user/signup">회원가입</Link>
        </div>

        <div className="flex justify-center items-center lg:mt-[3.125rem]">
          <Button size="md">로그인</Button>
        </div>
      </form>
      ;
    </>
  );
}
