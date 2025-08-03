'use client';

import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import { login } from '@/data/actions/user';
import useUserStore from '@/zustand/useStore';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function LoginForm() {
  const router = useRouter();
  const [userState, formAction, isLoading] = useActionState(login, null);
  console.log(isLoading, userState);
  const { setUser } = useUserStore(state => state);

  const [autoLogin, setAutoLogin] = useState(false);

  const redirect = useSearchParams().get('redirect');

  // setUser는 상태를 변경하는 함수이므로 useEffect에서 호출해야 한다.
  useEffect(() => {
    if (userState?.ok) {
      setUser({
        _id: userState.item._id,
        email: userState.item.email,
        name: userState.item.name,
        phone: userState.item.phone,
        postcode: userState.item.postcode,
        addressDetail1: userState.item.addressDetail1,
        addressDetail2: userState.item.addressDetail2,
        type: userState.item.type,
        image: userState.item.image,
        token: {
          accessToken: userState.item.token?.accessToken || '',
          refreshToken: userState.item.token?.refreshToken || '',
        },
      });

      // 자동로그인 체크 시 localStorage에 저장
      if (autoLogin) {
        localStorage.setItem(
          'accessToken',
          userState.item.token?.accessToken || '',
        );
        localStorage.setItem(
          'refreshToken',
          userState.item.token?.refreshToken || '',
        );
        localStorage.setItem('userInfo', JSON.stringify(userState.item));
      }

      Swal.fire({
        icon: 'success',
        title: '로그인 완료',
        text: '로그인이 완료되었습니다.',
        confirmButtonText: '확인',
      }).then(result => {
        if (result.isConfirmed) {
          if (redirect) {
            router.replace(redirect);
          } else {
            router.push('/');
          }
        }
      });
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
        <input type="hidden" name="autoLogin" value={autoLogin.toString()} />
        <div className="mt-[20px] lg:mb-[0.625rem] lg:mt-[1.25rem] flex justify-center ">
          <div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="이메일을 입력하세요"
              className="w-[250px] h-[40px] text-xs md:w-[290px] md:h-[45px] md:text-sm md lg:w-[18.125rem] lg:h-[2.8125rem] px-[0.75rem] lg:py-[0.5rem] border border-light-gray rounded-lg focus:outline-none focus:border-gray "
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
              className="w-[250px] h-[40px] text-xs md:w-[290px] md:h-[45px] md:text-sm lg:w-[18.125rem] lg:h-[2.8125rem] px-[0.75rem] lg:py-[0.5rem] border border-light-gray rounded-lg focus:outline-none focus:border-gray"
              name="password"
            />
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {userState?.ok === 0 && userState.errors?.password?.msg}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[5px] w-[250px] md:w-[290px] lg:w-[18.125rem] mx-auto ml-auto text-gray text-xs">
          <div className="flex items-center gap-1">
            <Checkbox
              className="lg:w-[1.25rem] lg:h-[1.25rem]"
              checked={autoLogin}
              onChange={e => setAutoLogin(e.target.checked)}
            />
            <p className="text-2xs md:text-xs hover:font-semibold">
              자동 로그인
            </p>
          </div>
          <Link
            href="/signup"
            className="text-2xs md:text-xs hover:font-semibold"
          >
            회원가입
          </Link>
        </div>

        <div className="flex justify-center items-center mt-[45px] lg:mt-[3.125rem]">
          <Button size="md">로그인</Button>
        </div>
      </form>
    </>
  );
}
