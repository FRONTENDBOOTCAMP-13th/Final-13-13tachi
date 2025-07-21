'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (text.trim()) {
      router.push(`/recipe/search/${encodeURIComponent(text.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className="flex items-center lg:w-[17.8125rem] lg:h-[2.5rem] bg-white border border-dark-green placeholder-gray lg:placeholder:text-sm rounded-3xl overflow-hidden"
      style={{ boxShadow: 'inset 1px 1px 4px rgba(0, 0, 0, 0.1)' }}
    >
      <input
        type="text"
        placeholder="상품명을 입력해주세요"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow lg:px-3 lg:text-sm outline-none"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="w-10 h-full flex justify-center items-center cursor-pointer"
      >
        <Search className="text-dark-green w-4" />
      </button>
    </div>
  );
}
