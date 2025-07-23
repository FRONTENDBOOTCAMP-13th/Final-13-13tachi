'use client';

import Link from 'next/link';
import TextEditor from './TextEditor';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useState } from 'react';
import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';
import { ChevronDown } from 'lucide-react';
import { useActionState } from 'react';
import { createPost } from '@/data/actions/post';
import useUserStore from '@/zustand/useStore';

export default function RecipeWritePage() {
  const [fileName, setFileName] = useState('대표 이미지를 등록 해주세요');
  const [file, setFile] = useState<File | null>(null);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [state, formAction] = useActionState(createPost, null);
  const { user } = useUserStore();

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
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : prev.length < 3
          ? [...prev, ingredient]
          : (alert('재료 선택은 3개까지만 가능합니다!'), prev),
    );
  };

  return (
    <>
      <Header />
      <div className="lg:max-w-5xl mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray">
          <Link href="/">HOME</Link>
          <span>{' > '}</span>
          <Link href="/recipe">레시피</Link>
        </h2>
        <h1 className="text-5xl font-bold mt-[0.9375rem]">레시피 작성</h1>

        <form action={formAction}>
          <input
            type="hidden"
            name="accessToken"
            value={user?.token?.accessToken ?? ''}
          />
          <input
            type="hidden"
            name="user"
            value={user?.token?.accessToken ?? ''}
          />
          <input
            type="text"
            name="title"
            placeholder="제목을 입력 해주세요."
            required
            className="mt-[1.875rem] w-full h-[2.8125rem] border border-light-gray rounded-lg pl-4"
          />

          <input type="hidden" name="type" value="recipe" />
          <input
            type="hidden"
            name="tag"
            value={selectedIngredients.join(',')}
          />
          <input type="hidden" name="content" value={content} />

          <p className="mt-[1.875rem] mb-5">
            사용하신 재료를 선택해주세요 (최대 3개 까지만)
            <span className="text-required-red ml-1">*</span>
          </p>
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
              aria-label="재료 선택 토글"
            >
              <ChevronDown
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

          <TextEditor value={content} onChange={setContent} />

          <div className="flex justify-end mt-5">
            <input
              type="file"
              id="fileInput"
              name="image"
              required
              onChange={e => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                } else {
                  setFile(null);
                  setFileName('대표 이미지를 등록 해주세요');
                }
              }}
              className="sr-only"
            />
            <label
              htmlFor="fileInput"
              className="w-[20.625rem] h-[2.8125rem] border border-light-gray rounded-lg pl-4 flex items-center cursor-pointer overflow-hidden"
            >
              {fileName}
            </label>
          </div>

          <div className="flex justify-end mt-5">
            <Button size="xxl" type="submit">
              작성완료
            </Button>
          </div>

          {state?.ok === 0 && (
            <p className="text-red-500 mt-4 text-center">{state.message}</p>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}
