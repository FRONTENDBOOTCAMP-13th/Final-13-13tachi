'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { ChevronDown } from 'lucide-react';
import useUserStore from '@/zustand/useStore';

import FoodBtn from '@/components/common/FoodBtn';
import Button from '@/components/common/Button';
import TextEditor from './TextEditor';

import { uploadFile, createPost } from '@/data/functions/post';
import { CreatePostData } from '@/types/post';

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
    '아스파라거스',
    '오이',
    '피망',
    '사과',
    '바나나',
    '딸기',
    '포도',
    '수박',
  ];

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
        className="w-full h-12 border border-light-gray rounded-lg pl-4 mb-4"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <p className="mb-2">
        사용하신 재료를 선택해주세요 (최대 3개)
        <span className="text-required-red ml-1">*</span>
      </p>

      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4 flex-wrap">
          {ingredientList.map((ingredient, idx) => (
            <FoodBtn
              key={idx}
              label={ingredient}
              selected={selectedIngredients.includes(ingredient)}
              onClick={() => handleClick(ingredient)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setToggleOpen(!toggleOpen)}
          aria-label="재료 토글"
        >
          <ChevronDown
            className={`${toggleOpen ? 'rotate-180' : ''} transition-transform`}
          />
        </button>
      </div>

      {toggleOpen && (
        <div className="p-4 border rounded-lg mb-4">
          <div className="flex gap-4 flex-wrap">
            {ingredientList.map((ingredient, idx) => (
              <FoodBtn
                key={idx}
                label={ingredient}
                selected={selectedIngredients.includes(ingredient)}
                onClick={() => handleClick(ingredient)}
              />
            ))}
          </div>
        </div>
      )}

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
          className="w-80 h-12 border border-light-gray rounded-lg pl-4 flex items-center cursor-pointer overflow-hidden"
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
