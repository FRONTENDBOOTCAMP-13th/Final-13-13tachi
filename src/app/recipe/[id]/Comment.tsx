'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import useUserStore from '@/zustand/useStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CommentProps {
  comment: {
    _id: number;
    content: string;
    user: { _id: number; name: string; image?: string };
    createdAt: string;
  };
  currentUserId?: number | null;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newContent: string) => void;
  postId: string; // 추가 (댓글 수정/삭제 API에서 필요)
}

export default function Comment({
  comment,
  currentUserId,
  onDelete,
  onUpdate,
  postId,
}: CommentProps) {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const profileSrc = comment.user?.image
    ? `${API_URL}/${comment.user.image}`
    : '/images/front-end.png';

  // 여기서 타입 맞춰서 비교
  const isAuthor = String(currentUserId) === String(comment.user._id);

  const handleUpdate = async () => {
    if (!editedContent.trim()) {
      alert('내용을 입력하세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/posts/${postId}/replies/${comment._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
            Authorization: `Bearer ${user?.token?.accessToken || ''}`,
          },
          body: JSON.stringify({ content: editedContent }),
        },
      );
      const data = await res.json();
      if (res.ok && data.ok === 1) {
        onUpdate(comment._id, editedContent);
        setIsEditing(false);
      } else {
        alert(data.message || '수정 실패');
      }
    } catch (error) {
      console.error(error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/posts/${postId}/replies/${comment._id}`,
        {
          method: 'DELETE',
          headers: {
            'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
            Authorization: `Bearer ${user?.token?.accessToken || ''}`,
          },
        },
      );
      const data = await res.json();
      if (res.ok && data.ok === 1) {
        onDelete(comment._id);
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
    <div className="flex items-start py-5 border-b-2 border-[#DEDEDE]">
      <div className="relative w-[3.125rem] h-[3.125rem] shrink-0">
        <Image
          src={profileSrc}
          alt={`${comment.user.name} 프로필 이미지`}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="ml-4 w-full">
        <p className="font-semibold text-dark-green mb-1">
          {comment.user?.name}
        </p>
        {isEditing ? (
          <div className="flex gap-2 items-center">
            <input
              className="border px-2 py-1 rounded text-sm w-full"
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
              disabled={loading}
            />
            <button
              className="text-dark-green text-sm hover:underline"
              onClick={handleUpdate}
              disabled={loading}
            >
              저장
            </button>
            <button
              className="text-gray-500 text-sm hover:underline"
              onClick={() => {
                setIsEditing(false);
                setEditedContent(comment.content);
              }}
              disabled={loading}
            >
              취소
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm">{comment.content}</p>
            {isAuthor && (
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  variant="green"
                  onClick={() => setIsEditing(true)}
                  disabled={loading}
                >
                  수정
                </Button>
                <Button
                  size="sm"
                  variant="white"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  삭제
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
