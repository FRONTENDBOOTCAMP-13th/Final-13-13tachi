'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchBarProps {
  handleType: 'handleRecipeSearch' | 'handleProductSearch';
  placeholder?: string;
}

export default function SearchBar({ handleType, placeholder }: SearchBarProps) {
  const [text, setText] = useState('');
  const router = useRouter();

  // placeholder 기본값 설정
  const defaultPlaceholder =
    handleType === 'handleRecipeSearch'
      ? '레시피명을 입력해주세요'
      : '상품명을 입력해주세요';

  const handleRecipeSearch = () => {
    if (text.trim()) {
      router.push(`/recipe/search/${encodeURIComponent(text.trim())}`);
    }
  };

  const handleProductSearch = () => {
    if (text.trim()) {
      router.push(`/shopping/search/${encodeURIComponent(text.trim())}`);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    handleType: 'handleRecipeSearch' | 'handleProductSearch',
  ) => {
    if (e.key === 'Enter') {
      if (handleType === 'handleRecipeSearch') {
        handleRecipeSearch();
      } else if (handleType === 'handleProductSearch') {
        handleProductSearch();
      }
    }
  };

  return (
    <div
      className="flex items-center lg:w-[17.8125rem] lg:h-[2.5rem] bg-white border border-dark-green placeholder-gray lg:placeholder:text-sm rounded-3xl overflow-hidden"
      style={{ boxShadow: 'inset 1px 1px 4px rgba(0, 0, 0, 0.1)' }}
    >
      <input
        type="text"
        placeholder={placeholder || defaultPlaceholder}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => handleKeyDown(e, handleType)}
        className="flex-grow lg:px-3 lg:text-sm outline-none"
      />
      <button
        type="button"
        onClick={
          handleType === 'handleRecipeSearch'
            ? handleRecipeSearch
            : handleProductSearch
        }
        className="w-10 h-full flex justify-center items-center cursor-pointer"
      >
        <Search className="text-dark-green w-4" strokeWidth={1} />
      </button>
    </div>
  );
}
