'use client';
import { SignupFormProps } from '@/app/(user)/signup/SignupForm';
import Input from '@/components/common/Input';
import useUserStore from '@/zustand/useStore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function OrderUserForm() {
  const { user } = useUserStore();

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<SignupFormProps>({ mode: 'onChange' });

  useEffect(() => {
    if (user) {
      setValue('phone', user.phone ?? '');
      setValue('postcode', user.postcode ?? '');
      setValue('addressDetail1', user.addressDetail1 ?? '');
      setValue('addressDetail2', user.addressDetail2 ?? '');
    }
  }, [user, setValue]);

  return (
    <form>
      <div className="flex items-center justify-between mb-[0.625rem]">
        <div className="flex items-center">
          <label className="block text-black lg:text-base" htmlFor="name1">
            주문자 이름
          </label>
          <span className="text-light-red lg:text-sm ml-1">*</span>
        </div>
        <div className="flex flex-col">
          <Input
            width="md"
            type="text"
            id="name"
            autoComplete="name"
            placeholder="이름을 입력하세요"
            defaultValue={user?.name ?? ''}
            {...register('name', {
              required: '이름를 입력해주세요',
            })}
          />
          {errors.name && (
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-[0.625rem]">
        <div className="flex items-center">
          <label className="block text-black lg:text-base" htmlFor="phone">
            주문자 연락처
          </label>
          <span className="text-light-red lg:text-sm ml-1">*</span>
        </div>
        <div className="flex flex-col">
          <Input
            width="md"
            type="text"
            id="phone"
            autoComplete="tel"
            placeholder="전화번호를 입력하세요"
            defaultValue={user?.phone ?? ''}
            {...register('phone', {
              required: '전화번호를 입력해주세요',
              pattern: {
                value: /^[0-9-]+$/,
                message: '숫자와 하이픈(-)만 입력 가능합니다',
              },
            })}
          />
          {errors.phone && (
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex lg:gap-[1.25rem] w-full items-start">
        <div className="flex items-center pt-[0.375rem] min-w-[9.35rem]">
          <label className="block text-black lg:text-base" htmlFor="address">
            배송지 정보
          </label>
          <span className="text-light-red lg:text-sm lg:ml-1">*</span>
        </div>

        <div className="flex flex-col lg:gap-[0.625rem] lg:w-[20.625rem] mb-[0.625rem]">
          <div className="flex lg:gap-[0.625rem] items-center">
            <Input
              width="xs"
              type="text"
              id="postcode"
              placeholder="우편번호"
              defaultValue={user?.postcode ?? ''}
              {...register('postcode', {
                required: '우편번호를 입력해주세요',
                pattern: {
                  value: /^[0-9-]+$/,
                  message: '숫자와 하이픈(-)만 입력 가능합니다',
                },
              })}
            />
            {errors.postcode && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.postcode.message}
              </p>
            )}

            <button className="lg:w-[4rem] lg:h-[1.875rem] lg:border-[0.0938rem] border-light-gray lg:rounded-[0.3125rem] lg:text-xs text-light-gray lg:hover:border-[.125rem]">
              우편번호
            </button>
          </div>
          <Input
            width="md"
            type="text"
            id="addressdetail1"
            placeholder="상세주소를 입력하세요"
            defaultValue={user?.addressDetail1 ?? ''}
            {...register('addressDetail1', {
              required: '상세주소를 입력해주세요',
            })}
          />
          {errors.addressDetail1 && (
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.addressDetail1.message}
            </p>
          )}

          <Input
            width="md"
            type="text"
            id="addressDetail2"
            defaultValue={user?.addressDetail2 ?? ''}
            {...register('addressDetail2', {
              required: '상세주소를 입력해주세요',
            })}
          />
          {errors.addressDetail1 && (
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.addressDetail1.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="block text-black lg:text-base" htmlFor="message">
          배송 메세지
        </label>
        <Input
          width="md"
          type="text"
          id="message"
          placeholder="배송 전 연락주세요"
          name="message"
        />
      </div>
    </form>
  );
}
