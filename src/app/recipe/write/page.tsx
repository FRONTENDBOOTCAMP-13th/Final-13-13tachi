'use client';

import Link from 'next/link';
import TextEditor from './TextEditor';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Image from 'next/image';
import { useState } from 'react';

export default function RecipeWritePage() {
  const [fileName, setFileName] = useState('대표 이미지를 등록 해주세요');
  const [toggleOpen, setToggleOpen] = useState(false);

  type Ingredient = {
    ingredient: string;
  };

  const ingredientList: Ingredient[] = [
    { ingredient: '당근' },
    { ingredient: '감자' },
    { ingredient: '아스파라거스' },
    { ingredient: '오이' },
    { ingredient: '피망' },
    { ingredient: '사과' },
    { ingredient: '바나나' },
    { ingredient: '딸기' },
    { ingredient: '포도' },
    { ingredient: '수박' },
  ];

  return (
    <>
      <Header />
      <div className="lg:max-w-5xl m-auto">
        <h2 className="text-gray mt-[4.0625rem]">
          <Link href="/">HOME</Link>
          <span>{' > '}</span>
          <Link href="/recipe/list">레시피</Link>
        </h2>
        <h1 className="text-5xl font-bold mt-[0.9375rem]">레시피 작성</h1>
        <input
          type="text"
          placeholder="제목을 입력 해주세요."
          className="mt-[1.875rem] w-full h-[2.8125rem] border-1 border-light-gray rounded-lg pl-4"
        />
        <p className="mt-[1.875rem] mb-5">사용하신 재료를 선택해주세요</p>
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-4">
            {ingredientList.map((item, index) => {
              return (
                <p
                  key={index}
                  className="lg:min-w-15 lg:h-6 px-2 py-3 flex items-center justify-center text-dark-green border-1 border-dark-green rounded-full"
                >
                  {item.ingredient}
                </p>
              );
            })}
          </div>
          <button onClick={() => setToggleOpen(prev => !prev)}>
            <Image
              src="/imgs/toggle.svg"
              alt="토글메뉴"
              width={14}
              height={8}
              className={`${toggleOpen ? 'rotate-180' : ''} transition-transform`}
            />
          </button>
        </div>
        {toggleOpen && (
          <div className="p-4 rounded-lg border border-gray-300">
            <p>
              <div className="flex gap-4">
                {ingredientList.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="lg:min-w-15 lg:h-6 px-2 py-3 flex items-center justify-center text-dark-green border-1 border-dark-green rounded-full"
                    >
                      {item.ingredient}
                    </p>
                  );
                })}
              </div>
            </p>
          </div>
        )}

        <TextEditor />
        <div className="flex justify-end mt-5">
          <span className="mr-1 text-required-red">*</span>
          <input
            type="file"
            id="fileInput"
            onChange={e => {
              if (e.target.files?.[0]) {
                setFileName(e.target.files[0].name);
              } else {
                setFileName('대표 이미지를 등록 해주세요');
              }
            }}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="w-[20.625rem] h-[2.8125rem] border border-light-gray rounded-lg pl-4 flex items-center cursor-pointer overflow-hidden"
          >
            {fileName}
          </label>
          {/* 임시 (컴포넌트로 파싱) */}
          <button className="px-5 py-2 bg-amber-700">등록</button>
        </div>
        {/* 임시 (컴포넌트로 파싱) */}
        <div className="flex justify-end mt-5">
          <button className="px-5 py-2 bg-amber-700">작성완료</button>
        </div>
      </div>
      {/* margin div */}
      <div className="mb-25" />
      <Footer />
    </>
  );
}
