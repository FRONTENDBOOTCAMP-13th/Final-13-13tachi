'use client';

import { useState } from 'react';
import Image from 'next/image';
import useUserStore from '@/zustand/useStore';
import CommentActionButton from './CommentActionButton';
import Swal from 'sweetalert2';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CommentProps {
  comment: {
    _id: number;
    content: string;
    name: string;
    user: { _id: number; name: string };
    createdAt: string;
  };
  currentUserId?: number | null;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newContent: string) => void;
  postId: number;
}

export default function Comment({
  comment,
  onDelete,
  onUpdate,
  postId,
}: CommentProps) {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const profileSrc = '/images/front-end.png';

  const handleUpdate = async () => {
    if (!editedContent.trim()) {
      return Swal.fire({
        icon: 'warning',
        text: '내용을 입력하세요.',
        confirmButtonText: '확인',
      });
    }

    if (!user?.token?.accessToken) {
      return Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요.',
        confirmButtonText: '확인',
      });
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
            Authorization: `Bearer ${user.token.accessToken}`,
          },
          body: JSON.stringify({ content: editedContent }),
        },
      );

      const data = await res.json();
      if (res.ok && data.ok === 1) {
        onUpdate(comment._id, editedContent);
        setIsEditing(false);
        Swal.fire({
          icon: 'success',
          text: '댓글이 수정되었습니다.',
          confirmButtonText: '확인',
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: data.message || '수정에 실패했습니다.',
          confirmButtonText: '확인',
        });
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류:', error);
      Swal.fire({
        icon: 'error',
        text: '수정 중 오류가 발생했습니다.',
        confirmButtonText: '확인',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user?.token?.accessToken) {
      return Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요.',
        confirmButtonText: '확인',
      });
    }

    const result = await Swal.fire({
      icon: 'question',
      text: '댓글을 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#d33',
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/posts/${postId}/replies/${comment._id}`,
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
        onDelete(comment._id);
        Swal.fire({
          icon: 'success',
          text: '댓글이 삭제되었습니다.',
          confirmButtonText: '확인',
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: data.message || '삭제에 실패했습니다.',
          confirmButtonText: '확인',
        });
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류:', error);
      Swal.fire({
        icon: 'error',
        text: '삭제 중 오류가 발생했습니다.',
        confirmButtonText: '확인',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) setEditedContent(comment.content);
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
        <div className="flex items-center justify-between">
          <p className="font-semibold text-dark-green mb-1">
            {comment.name || comment.user?.name}
          </p>
          {!isEditing && user && comment.name === user.name && (
            <CommentActionButton
              authorId={comment.user._id}
              commentId={comment._id}
              onDelete={handleDelete}
              onEditToggle={handleEditToggle}
              loading={loading}
            />
          )}
        </div>

        {isEditing ? (
          <div className="flex gap-2 items-center mt-2">
            <input
              className="border px-2 py-1 rounded text-sm w-full"
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
              disabled={loading}
              placeholder="댓글 내용을 입력하세요"
            />
            <button
              className="text-dark-green text-sm hover:underline px-2 py-1 border border-dark-green rounded"
              onClick={handleUpdate}
              type="button"
              disabled={loading}
            >
              {loading ? '저장 중...' : '저장'}
            </button>
            <button
              className="text-gray-500 text-sm hover:underline px-2 py-1 border border-gray-300 rounded"
              onClick={handleEditToggle}
              disabled={loading}
            >
              취소
            </button>
          </div>
        ) : (
          <p className="text-sm">{comment.content}</p>
        )}
      </div>
    </div>
  );
}
