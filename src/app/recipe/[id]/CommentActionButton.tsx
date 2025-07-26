'use client';

import Button from '@/components/common/Button';
import useUserStore from '@/zustand/useStore';

interface CommentActionButtonsProps {
  authorId: number;
  commentId: number;
  onDelete: (id: number) => void;
  onEditToggle: () => void;
}

export default function CommentActionButton({
  authorId,
  commentId,
  onDelete,
  onEditToggle,
}: CommentActionButtonsProps) {
  const { user } = useUserStore();

  const isAuthor = String(user?._id) === String(authorId);

  if (!isAuthor) return null;

  return (
    <div className="flex gap-2 ml-auto">
      <Button size="sm" variant="green" onClick={onEditToggle}>
        수정
      </Button>
      <Button size="sm" variant="white" onClick={() => {
        if (confirm('정말 댓글을 삭제하시겠습니까?')) {
          onDelete(commentId);
        }
      }}>
        삭제
      </Button>
    </div>
  );
}
