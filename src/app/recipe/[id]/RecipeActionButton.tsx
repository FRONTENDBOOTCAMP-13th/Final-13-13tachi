'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import useUserStore from '@/zustand/useStore';

interface RecipeActionButtonsProps {
  authorId: string;
  postId: string;
}

export default function RecipeActionButtons({
  authorId,
  postId,
}: RecipeActionButtonsProps) {
  const router = useRouter();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);

  const isAuthor = String(user?._id) === String(authorId);

  if (!isAuthor) return null;

  const handleDelete = async () => {
    if (!confirm('정말 게시글을 삭제하시겠습니까?')) return;

    if (!user?.token?.accessToken) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
            Authorization: `Bearer ${user.token.accessToken}`,
          },
        },
      );

      const data = await res.json();

      if (res.ok && data.ok === 1) {
        alert('게시글이 삭제되었습니다.');
        router.push('/recipe');
      } else {
        alert(data.message || '삭제 실패');
      }
    } catch (error) {
      console.error(error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="green"
        onClick={() => router.push(`/recipe/${postId}/edit`)}
        disabled={loading}
      >
        수정
      </Button>
      <Button size="sm" variant="white" onClick={handleDelete} disabled={loading}>
        {loading ? '삭제 중...' : '삭제'}
      </Button>
    </div>
  );
}
