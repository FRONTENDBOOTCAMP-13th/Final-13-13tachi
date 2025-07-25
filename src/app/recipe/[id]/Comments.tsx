'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import Comment from './Comment';
import useUserStore from '@/zustand/useStore';

interface UserType {
  _id: number;
  name: string;
  image?: string;
}

interface CommentType {
  _id: number;
  content: string;
  user: UserType;
  createdAt: string;
}

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const { user } = useUserStore();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/replies?limit=10&page=1&sort={"_id":1}`,
        {
          headers: { 'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '' },
          cache: 'no-store',
        },
      );
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data.item || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/replies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
          },
          body: JSON.stringify({
            content,
            name: user.name,
          }),
        },
      );
      if (res.status === 201) {
        const data = await res.json();
        if (data.ok === 1) {
          setContent('');
          await fetchComments();
        } else {
          setErrorMsg(data.message || '댓글 등록에 실패했습니다.');
        }
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.message || '댓글 등록 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setErrorMsg('네트워크 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setComments(prev => prev.filter(comment => comment._id !== id));
  };

  const handleUpdate = (id: number, newContent: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment._id === id ? { ...comment, content: newContent } : comment,
      ),
    );
  };

  return (
    <div className="p-15">
      <div className="flex items-center border-b-2 border-[#DEDEDE]">
        <h3 className="text-xl font-semibold  mb-2">댓글</h3>
        <span className="text-xl font-semibold text-[#67913C] ml-2  mb-2">
          {comments.length}
        </span>
      </div>

      {loading && <p>댓글 불러오는중...</p>}

      {comments.map(comment => (
        <Comment
          key={comment._id}
          postId={postId}
          comment={comment}
          currentUserId={user?._id}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}

      <form onSubmit={handleSubmit} className="mt-9 flex items-center">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          className="w-[48.75rem] h-[2.5rem] border border-light-gray rounded-lg mr-5 px-5 text-sm"
          value={content}
          onChange={e => setContent(e.target.value)}
          disabled={loading}
        />
        <Button size="md" type="submit" disabled={loading}>
          {loading ? '등록 중...' : '등록'}
        </Button>
      </form>

      {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
    </div>
  );
}
