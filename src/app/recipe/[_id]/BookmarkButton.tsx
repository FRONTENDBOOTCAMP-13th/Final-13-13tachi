'use client';

import { Bookmark } from 'lucide-react';
import useBookmarkStore from '@/zustand/useBookmarkStore';
import { addBookmark, deleteBookmark } from '@/data/functions/post';
import { useState } from 'react';
import useUserStore from '@/zustand/useStore';

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

  const [loading, setLoading] = useState(false);

  const isBookmarked = likeMap.has(postId);

  const toggleBookmark = async () => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);

    const bookmarkId = likeMap.get(postId);

    try {
      if (isBookmarked && bookmarkId) {
        const res = await deleteBookmark(accessToken, bookmarkId);
        if (res.ok === 1) {
          remove(postId);
        } else {
          alert(res.message || '삭제 중 오류가 발생했습니다.');
        }
      } else {
        const res = await addBookmark(accessToken, postId);
        if (res.ok === 1 && res.item) {
          add(postId, res.item._id);
        } else {
          alert(res.message || '추가 중 오류가 발생했습니다.');
        }
      }
    } catch (error) {
      console.error('북마크 요청 실패:', error);
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
        className={isBookmarked ? 'fill-black text-black' : 'text-gray-600'}
      />
    </button>
  );
}
