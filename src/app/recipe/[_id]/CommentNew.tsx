'use client';

import Button from '@/components/common/Button';
import { createReply } from '@/data/actions/post';
import useUserStore from '@/zustand/useStore';
import { useActionState } from 'react';

export default function CommentNew({ postId }: { postId: number }) {
  const [state, formAction, isLoading] = useActionState(createReply, null);
  console.log(isLoading, state);
  const { user } = useUserStore();
  return (
    <form action={formAction} className="mt-9 flex items-center">
      <input type="hidden" name="_id" value={postId} />
      <input
        type="hidden"
        name="accessToken"
        value={user?.token?.accessToken ?? ''}
      />
      <input
        type="text"
        placeholder="댓글을 입력하세요"
        className="w-[48.75rem] h-[2.5rem] border border-light-gray rounded-lg mr-5 px-5 text-sm"
        // value={content}
        // onChange={e => setContent(e.target.value)}
        name="content"
        disabled={isLoading}
      />
      <Button size="md" disabled={isLoading}>
        {isLoading ? '등록 중...' : '등록'}
      </Button>
    </form>
  );
}
