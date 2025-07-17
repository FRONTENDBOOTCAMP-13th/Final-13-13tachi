'use client';

import Link from 'next/link';
import TextEditor from './TextEditor';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';

export default function RecipeWritePage() {
  const [fileName, setFileName] = useState('대표 이미지를 등록 해주세요');
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const ingredientList = [
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

  const handleClick = (ingredient: string) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      } else {
        if (prev.length >= 3) return prev;
        return [...prev, ingredient];
      }
    });
  };
  return (
    <>
      <Header />
      <div className="lg:max-w-5xl mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray">
          <Link href="/">HOME</Link>
          <span>{' > '}</span>
          <Link href="/recipe/list">레시피</Link>
        </h2>
        <h1 className="text-5xl font-bold mt-[0.9375rem]">레시피 작성</h1>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="제목을 입력 해주세요."
            className="mt-[1.875rem] w-full h-[2.8125rem] border-1 border-light-gray rounded-lg pl-4"
          />
          <p className="mt-[1.875rem] mb-5">사용하신 재료를 선택해주세요</p>
          <div className="flex justify-between items-center mb-5">
            <div className="flex gap-4 flex-wrap">
              {ingredientList.map((item, index) => (
                <FoodBtn
                  key={index}
                  label={item.ingredient}
                  selected={selectedIngredients.includes(item.ingredient)}
                  onClick={() => handleClick(item.ingredient)}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setToggleOpen(prev => !prev)}
              className="p-2"
            >
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
              <div className="flex gap-4 flex-wrap">
                {ingredientList.map((item, index) => (
                  <FoodBtn
                    key={index}
                    label={item.ingredient}
                    selected={selectedIngredients.includes(item.ingredient)}
                    onClick={() => handleClick(item.ingredient)}
                  />
                ))}
              </div>
            </div>
          )}

          <TextEditor />
          <div className="flex justify-end mt-5">
            <span className="mr-1 text-required-red">*</span>
            <input
              type="file"
              id="fileInput"
              required
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
            <div className="ml-3">
              <Button size="md" variant="white">
                등록
              </Button>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button size="xxl" type="submit">
              작성완료
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
