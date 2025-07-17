'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeSearchInput() {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (text.trim() !== '') {
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
  );
}
