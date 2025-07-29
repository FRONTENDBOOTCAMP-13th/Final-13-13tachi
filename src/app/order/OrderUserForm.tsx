'use client';
import Input from '@/components/common/Input';
import PostCode from 'react-daum-postcode';
import useUserStore from '@/zustand/useStore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserInfoType } from '@/types';

type UserOrderFormProps = {
  onChangeUserData: (data: UserInfoType) => void;
};

export default function OrderUserForm({
  onChangeUserData,
}: UserOrderFormProps) {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  //받은 주소 결과(zonecode, address)를 setValue로 form에 입력
  const handleComplete = (data: { zonecode: string; address: string }) => {
    setValue('postcode', data.zonecode);
    setValue('addressDetail1', data.address);
    setIsOpen(false);
  };

  const {
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
    }
  }, [user, setValue]);

  const name = watch('name');
  const phone = watch('phone');
  const postcode = watch('postcode');
  const addressDetail1 = watch('addressDetail1');
  const addressDetail2 = watch('addressDetail2');
  useEffect(() => {
    onChangeUserData({ name, phone, postcode, addressDetail1, addressDetail2 });
  }, [name, phone, postcode, addressDetail1, addressDetail2, onChangeUserData]);

  return (
    <div>
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
              validate: value => {
                if (!/^[0-9-]+$/.test(value)) {
                  return '숫자와 하이픈(-)만 입력 가능합니다';
                }
                if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(value)) {
                  return '000-0000-0000 형식이어야 합니다';
                }
                return true;
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
              className="lg:w-[4rem] lg:h-[1.875rem] lg:border-[0.0938rem] border-light-gray lg:rounded-[0.3125rem] lg:text-xs text-light-gray lg:hover:border-[.125rem]"
              onClick={() => setIsOpen(true)}
            >
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
