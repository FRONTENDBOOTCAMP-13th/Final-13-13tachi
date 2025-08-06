'use client';
import Input from '@/components/common/Input';
import PostCode from 'react-daum-postcode';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MemberType, UserInfoType } from '@/types';

type UserOrderFormProps = {
  onChangeUserData: (data: UserInfoType) => void;
  user: MemberType;
};

export default function OrderUserForm({
  onChangeUserData,
  user,
}: UserOrderFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  //받은 주소 결과(zonecode, address)를 setValue로 form에 입력
  const handleComplete = (data: { zonecode: string; address: string }) => {
    setValue('postcode', data.zonecode);
    setValue('addressDetail1', data.address);
    setIsOpen(false);
  };

  const {
    control,
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm<UserInfoType>({ mode: 'onChange' });

  useEffect(() => {
    if (user) {
      setValue('phone', user.phone ?? '');
      setValue('postcode', user.postcode ?? '');
      setValue('addressDetail1', user.addressDetail1 ?? '');
      setValue('addressDetail2', user.addressDetail2 ?? '');
      setValue('message', '');
    }
  }, [user, setValue]);

  const name = watch('name');
  const phone = watch('phone');
  const postcode = watch('postcode');
  const addressDetail1 = watch('addressDetail1');
  const addressDetail2 = watch('addressDetail2');
  const message = watch('message');

  useEffect(() => {
    onChangeUserData({
      name,
      phone,
      postcode,
      addressDetail1,
      addressDetail2,
      message,
    });
  }, [
    name,
    phone,
    postcode,
    addressDetail1,
    addressDetail2,
    message,
    onChangeUserData,
  ]);

  function formatPhoneNum(raw: string) {
    const cleaned = raw.replace(/\D/g, '').slice(0, 11);
    if (cleaned.length < 4) return cleaned;
    if (cleaned.length < 8) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }

  return (
    <div>
      <div className="flex items-center lg:justify-between md:justify-center justify-between mb-[0.625rem]">
        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-center">
          <label
            className="block text-black md:text-base text-sm"
            htmlFor="name1"
          >
            주문자 이름<span className="text-light-red lg:text-sm ml-1">*</span>
          </label>
        </div>
        <div className="flex flex-col w-full">
          <Input
            width="md2"
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

      <div className="flex items-center lg:justify-between md:justify-center justify-between mb-[0.625rem]">
        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-center">
          <label
            className="block text-black md:text-base text-sm"
            htmlFor="phone"
          >
            주문자 연락처
            <span className="text-light-red lg:text-sm ml-1">*</span>
          </label>
        </div>
        <div className="flex flex-col w-full">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: '전화번호를 입력해주세요',
              validate: value => {
                if (!/^[0-9-]+$/.test(value))
                  return '숫자와 하이픈만 입력 가능합니다';
                return true;
              },
            }}
            render={({ field: { value, onChange } }) => (
              <>
                <Input
                  width="md2"
                  type="text"
                  placeholder="전화번호를 입력하세요"
                  value={value}
                  onChange={e => {
                    // 하이픈 자동 붙이기
                    const formatted = formatPhoneNum(e.target.value);
                    onChange(formatted);
                  }}
                  maxLength={13}
                  className="w-[320px] text-xs lg:text-sm px-[0.75rem]"
                />
                {errors.phone && (
                  <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="flex items-start">
        <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-center pt-[0.375rem]">
          <label
            className="block text-black md:text-base text-sm"
            htmlFor="address"
          >
            배송지 정보<span className="text-light-red lg:text-sm ml-1">*</span>
          </label>
        </div>

        <div className="flex flex-col gap-[0.625rem] mb-[0.625rem] w-full">
          <div className="flex gap-[0.625rem] items-center w-full">
            <Input
              width="xs"
              type="text"
              id="postcode"
              placeholder="우편번호"
              disabled
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

            <button
              type="button"
              className="w-[4rem] h-[1.875rem] border-[0.0938rem] border-light-gray rounded-[0.3125rem] text-xs text-light-gray hover:border-[.125rem]"
              onClick={() => setIsOpen(true)}
            >
              우편번호
            </button>
          </div>
          <Input
            width="md2"
            type="text"
            id="addressdetail1"
            placeholder="주소를 입력하세요"
            defaultValue={user?.addressDetail1 ?? ''}
            {...register('addressDetail1', {
              required: '주소를 입력해주세요',
            })}
          />
          {errors.addressDetail1 && (
            <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.addressDetail1.message}
            </p>
          )}

          <Input
            width="md2"
            type="text"
            id="addressDetail2"
            placeholder="상세주소를 입력하세요"
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

      <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] items-center lg:justify-between md:justify-center justify-between">
        <label
          className="block text-black md:text-base text-sm "
          htmlFor="message"
        >
          배송 메세지
        </label>
        <Input
          width="md2"
          type="text"
          id="message"
          placeholder="배송 전 연락주세요"
          {...register('message')}
        />
      </div>
      {/* 주소 검색 모달창 */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '25%',
            width: '450px',
            height: '500px',
            zIndex: 100,
            boxShadow: '0 0 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* PostCode - 카카오 우편번호 검색 서비스를 사용하는 리액트용 컴포넌트 */}
          <PostCode
            style={{ width: '100%', height: '100%' }} // 닫기 버튼 최하단 위치
            onComplete={handleComplete} //주소 정보(zonecode, address)를 넘겨줌
          />

          {/* 모달 닫기 버튼 */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '100%',
              padding: '0.5rem',
              boxShadow: '0 0 8px rgba(0,0,0,0.3)',
              background: '#eee',
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
