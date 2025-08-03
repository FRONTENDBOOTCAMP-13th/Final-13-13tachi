'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/zustand/useStore';
import Button from '@/components/common/Button';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { updateRecipe } from '@/data/functions/post';

const QuillNoSSRWrapper = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface RecipeEditFormProps {
  postId: number;
  initialTitle: string;
  initialContent: string;
  initialImage?: string;
}

export default function RecipeEditForm({
  postId,
  initialTitle,
  initialContent,
}: RecipeEditFormProps) {
  const router = useRouter();
  const user = useUserStore(state => state.user);

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.token?.accessToken) {
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요.',
        confirmButtonText: '확인',
      }).then(() => {
        router.push('/login');
      });
      return;
    }

    setLoading(true);

    try {
      const result = await updateRecipe(user.token.accessToken, postId, {
        title,
        content,
      });

      if (result.ok === 1) {
        Swal.fire({
          icon: 'success',
          text: '수정이 완료되었습니다.',
          confirmButtonText: '확인',
        }).then(() => {
          router.push(`/recipe/${postId}`);
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: result.message || '수정에 실패했습니다.',
          confirmButtonText: '확인',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        text: '수정 중 오류가 발생했습니다.',
        confirmButtonText: '확인',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="제목"
        className="border border-light-gray p-2 rounded"
        required
      />

      <div className="h-[32.5rem] rounded-lg">
        <QuillNoSSRWrapper
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'indent',
            'link',
            'image',
            'video',
          ]}
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ height: '90%' }}
        />
        <input type="hidden" name="content" value={content} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="xxl" disabled={loading}>
          {loading ? '수정 중...' : '수정 완료'}
        </Button>
      </div>
    </form>
  );
}
