'use client';

import React, { useState } from 'react';
import PostCode from 'react-daum-postcode';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import Input from '@/components/common/Input';
import { SignupFormProps } from '@/app/(user)/signup/SignupForm';

//react-hook-form의 함수와 에러 객체를(SignupForm, EditForm) props로 받아옴
//기존의 회원 정보 데이터를 가져오기 위함
interface AddressFormProps {
  register: UseFormRegister<SignupFormProps>;
  setValue: UseFormSetValue<SignupFormProps>;
  errors: FieldErrors<SignupFormProps>;
  required?: boolean; //* 여부
}

export default function AddressForm({
  register,
  setValue,
  errors,
  required = false,
}: AddressFormProps) {
  //검색 모달 열고 닫기
  const [isOpen, setIsOpen] = useState(false);

  //받은 주소 결과(zonecode, address)를 setValue로 form에 입력
  const handleComplete = (data: { zonecode: string; address: string }) => {
    setValue('postcode', data.zonecode);
    setValue('addressDetail1', data.address);
    setIsOpen(false);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center w-[6rem]">
        <label htmlFor="address" className="block text-black lg:text-base">
          주소
        </label>
        {required && <span className="text-light-red lg:text-sm ml-1">*</span>}
      </div>
      <div className="flex flex-col gap-[0.625rem]">
        <div className="flex gap-[0.625rem] items-center">
          <div>
            {/* 우편번호 */}
            <Input
              width="xs"
              type="text"
              id="postcode"
              placeholder="우편번호"
              className="w-[8rem]"
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
          </div>
          <button
            type="button"
            className="w-[4rem] h-[1.875rem] border-[0.0938rem] border-light-gray rounded-[0.3125rem] text-xs text-light-gray hover:border-[0.125rem]"
            onClick={() => setIsOpen(true)}
          >
            우편번호
          </button>
        </div>

        {/* 상세주소 1 */}
        <Input
          type="text"
          id="addressDetail1"
          placeholder="기본주소"
          {...register('addressDetail1', {
            required: '상세주소를 입력하세요',
          })}
        />
        {errors.addressDetail1 && (
          <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
            {errors.addressDetail1.message}
          </p>
        )}

        {/* 상세주소 2 */}
        <Input
          width="md"
          type="text"
          id="addressDetail2"
          {...register('addressDetail2')}
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
