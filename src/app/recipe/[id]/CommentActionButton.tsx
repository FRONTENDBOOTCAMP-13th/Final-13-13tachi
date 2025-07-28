'use client';

import Button from '@/components/common/Button';
import useUserStore from '@/zustand/useStore';

interface CommentActionButtonsProps {
  authorId: number;
  commentId: number;
  onDelete: () => void;
  onEditToggle: () => void;
  loading?: boolean;
}

export default function CommentActionButton({
  onDelete,
  onEditToggle,
  loading = false,
}: CommentActionButtonsProps) {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="green"
        onClick={onEditToggle}
        disabled={loading}
      >
        수정
      </Button>
      <Button
        size="sm"
        variant="white"
        onClick={onDelete}
        disabled={loading}
        type="button"
      >
        {loading ? '처리 중...' : '삭제'}
      </Button>
    </div>
  );
}
