'use client';

import Button from '@/components/common/Button';
import { createReply } from '@/data/actions/recipe';
import useUserStore from '@/zustand/useStore';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import Swal from 'sweetalert2';

export default function CommentNew({ postId }: { postId: number }) {
  const [, formAction, isLoading] = useActionState(createReply, null);
  const { user } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!user) {
      e.preventDefault();
      await Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
      router.replace('/login');
      return;
    }
  };

  return (
    <form
      action={formAction}
      className="mt-9 flex items-center"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_id" value={postId} />
      <input
        type="hidden"
        name="accessToken"
        value={user?.token?.accessToken ?? ''}
      />
      <input
        type="text"
        placeholder="댓글을 입력하세요"
        className="w-full h-9 md:h-10 border border-light-gray rounded-lg mr-5 px-5 text-xs md:text-sm"
        name="content"
        disabled={isLoading}
      />
      <Button size="md" disabled={isLoading}>
        {isLoading ? '등록 중...' : '등록'}
      </Button>
    </form>
  );
}
