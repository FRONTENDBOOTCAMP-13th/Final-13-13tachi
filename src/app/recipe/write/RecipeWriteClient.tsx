'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { ChevronDown } from 'lucide-react';
import useUserStore from '@/zustand/useStore';

import FoodBtn from '@/components/common/FoodBtn';
import Button from '@/components/common/Button';
import TextEditor from './TextEditor';

import { CreatePostData } from '@/types/recipe';
import { createPost, uploadFile } from '@/data/actions/recipe';

export default function RecipeWriteClient() {
  const { user } = useUserStore();

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('대표 이미지를 등록 해주세요');
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const ingredientList = [
    '당근',
    '감자',
    '고구마',
    '오이',
    '양송이',
    '사과',
    '바나나',
    '딸기',
    '포도',
    '수박',
    '고추',
    '바질',
    '시금치',
    '토마토',
    '콩나물',
    '호박',
    '멜론',
    '양배추',
    '느타리 버섯',
    '복숭아',
    '파프리카',
    '옥수수',
    '마늘',
  ];

  const visibleIngredients = ingredientList.slice(0, 10);
  const hiddenIngredients = ingredientList.slice(10);

  const handleClick = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : prev.length < 3
          ? [...prev, ingredient]
          : (Swal.fire({
              icon: 'warning',
              text: '재료 선택은 3개까지만 가능합니다!',
              confirmButtonText: '확인',
            }),
            prev),
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files?.[0];
    setFile(fileInput ?? null);
    setFileName(fileInput?.name ?? '대표 이미지를 등록 해주세요');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !content.trim() ||
      !file ||
      selectedIngredients.length === 0
    ) {
      Swal.fire({
        icon: 'warning',
        text: '모든 필수 항목을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!user?.token?.accessToken) {
      Swal.fire({
        icon: 'warning',
        text: '로그인이 필요합니다.',
        confirmButtonText: '확인',
      });
      return;
    }

    setLoading(true);

    try {
      const imagePath = await uploadFile(file);

      const postData: CreatePostData = {
        accessToken: user.token.accessToken,
        type: 'recipe',
        title,
        content,
        tag: selectedIngredients.join(','),
        image: imagePath,
      };

      const result = await createPost(postData);

      if (result.ok === 1) {
        Swal.fire({
          icon: 'success',
          text: '게시글이 성공적으로 등록되었습니다!',
          confirmButtonText: '확인',
        }).then(() => {
          window.location.href = '/recipe';
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: result.message ?? '게시글 등록 실패',
          confirmButtonText: '확인',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        text: '파일 업로드 또는 게시글 등록 중 오류가 발생했습니다.',
        confirmButtonText: '확인',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="제목을 입력 해주세요."
        className="w-full h-10 px-4 mb-4 text-sm border border-light-gray rounded-lg md:h-12 md:text-base"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <p className="mb-3 lg:text-base md:text-base text-sm">
        사용하신 재료를 선택해주세요 (최대 3개)
        <span className="text-required-red ml-1">*</span>
      </p>

      <div className="flex justify-between items-start mb-5">
        <div className="flex lg:gap-4 md:gap-4 gap-2 flex-wrap">
          {visibleIngredients.map((ingredient, idx) => (
            <FoodBtn
              key={idx}
              label={ingredient}
              selected={selectedIngredients.includes(ingredient)}
              onClick={() => handleClick(ingredient)}
            />
          ))}
          {toggleOpen && (
            <div className="flex lg:gap-4 md:gap-4 gap-2 flex-wrap border border-light-gray p-4 shadow-image rounded-md">
              {hiddenIngredients.map((ingredient, idx) => (
                <FoodBtn
                  key={`hidden-${idx}`}
                  label={ingredient}
                  selected={selectedIngredients.includes(ingredient)}
                  onClick={() => handleClick(ingredient)}
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setToggleOpen(!toggleOpen)}
          aria-label="재료 토글"
          className="ml-2"
        >
          <ChevronDown
            className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${toggleOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <TextEditor value={content} onChange={setContent} />

      <div className="flex justify-end mt-5">
        <span className="text-required-red mr-1">*</span>
        <input
          type="file"
          id="fileInput"
          name="image"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileInput"
          className="w-80 h-10 md:h-12 lg:text-base md:text-base text-sm border border-light-gray rounded-lg px-4 flex items-center cursor-pointer overflow-hidden"
        >
          {fileName}
        </label>
      </div>

      <div className="flex justify-end mt-5">
        <Button size="xxl" type="submit" disabled={loading}>
          {loading ? '등록 중...' : '작성완료'}
        </Button>
      </div>
    </form>
  );
}
