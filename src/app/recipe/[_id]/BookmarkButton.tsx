'use client';

import { Bookmark } from 'lucide-react';
import useBookmarkStore from '@/zustand/useBookmarkStore';
import { useState } from 'react';
import useUserStore from '@/zustand/useStore';
import { addRecipeBookmark, deleteRecipeBookmark } from '@/data/actions/recipe';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface BookmarkButtonProps {
  postId: number;
}

export default function BookmarkButton({ postId }: BookmarkButtonProps) {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const {
    likeMap,
    addBookmark: add,
    removeBookmark: remove,
  } = useBookmarkStore();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isBookmarked = likeMap.has(postId);

  const toggleBookmark = async () => {
    if (!accessToken) {
      await Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
      router.replace('/login');
      return;
    }

    setLoading(true);

    const bookmarkId = likeMap.get(postId);

    try {
      if (isBookmarked && bookmarkId) {
        const res = await deleteRecipeBookmark(accessToken, bookmarkId);
        if (res.ok === 1) {
          remove(postId);
        } else {
          await Swal.fire({
            icon: 'error',
            title: '오류',
            text: res.message || '삭제 중 오류가 발생했습니다.',
            confirmButtonText: '확인',
          });
        }
      } else {
        const res = await addRecipeBookmark(accessToken, postId);
        if (res.ok === 1 && res.item) {
          add(postId, res.item._id);
        }
      }
    } catch (error) {
      console.error('북마크 요청 실패:', error);
      await Swal.fire({
        icon: 'error',
        title: '오류',
        text: '북마크 요청에 실패했습니다.',
        confirmButtonText: '확인',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleBookmark();
        }
      }}
      className={`cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}
      disabled={loading}
      type="button"
    >
      <Bookmark
        strokeWidth={1}
        className={
          isBookmarked
            ? 'fill-black text-black w-4 md:w-6'
            : 'text-black w-4 md:w-6'
        }
      />
    </button>
  );
}
