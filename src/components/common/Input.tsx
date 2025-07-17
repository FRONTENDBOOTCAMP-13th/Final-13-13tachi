'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   width?: 'lg' | 'md' | 'sm' | 'xs';
//   className?: string;
//   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

export default function Input() {
  // const widthClasses = {
  //   lg: 'lg:w-[48.75rem]',
  //   md: 'lg:w-[20.625rem]',
  //   sm: 'lg:w-[10.9375rem]',
  //   xs: 'lg:w-[7.4375rem]',
  // };

  const [text, setText] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (text.trim() !== '') {
      // 입력 후 recipe/search/입력값 형식의 url로 이동
      router.push(`/recipe/search/${encodeURIComponent(text.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center lg:w-[17.8125rem] lg:h-[2.5rem] border border-dark-green rounded-3xl overflow-hidden">
      <input
        type="text"
        placeholder="상품명을 입력해주세요"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow px-3 text-sm outline-none"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="w-10 h-full flex justify-center items-center"
      >
        <Image src="/search.svg" alt="검색" width={16} height={16} />
      </button>
    </div>

    // 참고: 기본 input 스타일 예시
    // <input
    //   className={`lg:h-[2.8125rem] ${widthClasses[width]} lg:px-3 lg:text-sm lg:placeholder:text-sm border border-light-gray rounded-lg text-black
    //     ${readOnly
    //         ? 'bg-gray-200 text-gray-500 cursor-default placeholder-gray-400 focus:outline-none'
    //         : 'bg-white focus:outline-gray'}
    //     ${className}`}
    //   onChange={onChange}
    //   readOnly={readOnly}
    //   {...rest}
    // />
  );
}
