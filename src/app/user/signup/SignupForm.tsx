'use client';

import { useActionState, useEffect } from 'react';
import { createUser } from '@/data/actions/user';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function SignupForm() {
  const [state, formAction, isLoading] = useActionState(createUser, null);
  console.log(isLoading, state);

  const router = useRouter();

  useEffect(() => {
    if (state?.ok) {
      alert('회원 가입이 완료되었습니다');
      router.replace('/user/login');
    } else if (state?.ok === 0 && !state?.errors) {
      alert(state?.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="lg:w-[28.625rem] space-y-[0.625rem]">
      <input type="hidden" name="type" value="user" />
      <div className="flex items-center justify-between">
        <div className="flex items-center w-[6rem]">
          <label htmlFor="email" className="block text-black lg:text-base">
            이메일
          </label>
          <span className="text-light-red lg:text-sm ml-1">*</span>
        </div>
        <div>
          <Input
            width="md"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            className="w-[20rem]"
            required
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
            {state?.ok === 0 && state.errors?.email?.msg}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center w-[6rem]">
          <label htmlFor="password" className="block text-black lg:text-base">
            비밀번호
          </label>
          <span className="text-light-red lg:text-sm ml-1">*</span>
        </div>
        <div>
          <Input
            width="md"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력하세요"
            className="w-[20rem]"
            required
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
            {state?.ok === 0 && state.errors?.password?.msg}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center w-[6rem]">
          <label
            htmlFor="passwordConfirm"
            className="block text-black lg:text-base"
          >
            비밀번호 확인
          </label>
          <span className="text-light-red lg:text-sm ml-1">*</span>
        </div>
        <div>
          {' '}
          <Input
            width="md"
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            className="w-[20rem]"
            required
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400"></p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center w-[6rem]">
          <label htmlFor="name" className="block text-black lg:text-base">
            이름
          </label>
          <span className="text-light-red lg:text-sm ml-1">*</span>
        </div>
        <div>
          <Input
            width="md"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="이름을 입력하세요"
            className="w-[20rem]"
            required
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
            {state?.ok === 0 && state.errors?.name?.msg}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center w-[6rem]">
          <label htmlFor="phone" className="block text-black lg:text-base">
            전화번호
          </label>
          <span className="text-light-red lg:text-sm ml-1">*</span>
        </div>
        <div>
          <Input
            width="md"
            id="phone"
            name="phone"
            type="text"
            autoComplete="tel"
            placeholder="전화번호를 입력하세요"
            className="w-[20rem]"
            required
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
            {state?.ok === 0 && state.errors?.phone?.msg}
          </p>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center w-[6rem]">
          <label htmlFor="address" className="block text-black lg:text-base">
            주소
          </label>
          <span className="text-light-red lg:text-sm ml-1">*</span>
        </div>

        <div className="flex flex-col gap-[0.625rem] ">
          <div className="flex gap-[0.625rem] items-center">
            <div>
              <Input
                width="xs"
                type="text"
                id="postcode"
                name="postcode"
                placeholder="우편번호"
                className="w-[8rem]"
                required
              />
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {state?.ok === 0 && state.errors?.address?.msg}
              </p>
            </div>
            <button
              type="button"
              className="w-[4rem] h-[1.875rem] border-[0.0938rem] border-light-gray rounded-[0.3125rem] text-xs text-light-gray hover:border-[0.125rem]"
            >
              우편번호
            </button>
          </div>
          <Input
            width="md"
            type="text"
            id="address-detail1"
            name="address-detail1"
            placeholder="상세주소를 입력하세요"
            required
          />
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
            {state?.ok === 0 && state.errors?.address?.msg}
          </p>
          <Input
            width="md"
            type="text"
            id="address-detail2"
            name="address-detail2"
            required
          />
        </div>
      </div>

      <div className="flex justify-center items-center lg:mt-[2rem] lg:mb-[6.25rem]">
        <Button size="xxl">가입하기</Button>
      </div>
    </form>
  );
}
