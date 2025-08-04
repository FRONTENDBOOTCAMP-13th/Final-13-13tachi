'use client';

import Button from '@/components/common/Button';
import { deleteReply } from '@/data/actions/recipe';
import { PostReply } from '@/types/recipe';
import useUserStore from '@/zustand/useStore';
import { useParams } from 'next/navigation';
import { useActionState } from 'react';

export default function CommentActionButton({ reply }: { reply: PostReply }) {
  const { type, _id } = useParams();
  const { user } = useUserStore();

  const [, deleteAction] = useActionState(deleteReply, null);

  if (!user) return null;

  return (
    <div className="flex gap-2">
      <form action={deleteAction}>
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="_id" value={_id} />
        <input type="hidden" name="replyId" value={reply._id} />
        <input
          type="hidden"
          name="accessToken"
          value={user?.token?.accessToken ?? ''}
        />
        <Button size="sm" variant="white" ownerId={reply.user._id}>
          삭제
        </Button>
      </form>
    </div>
  );
}
