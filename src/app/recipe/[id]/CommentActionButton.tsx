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

  const handleDelete = () => {
    if (loading) return;
    if (confirm('정말 댓글을 삭제하시겠습니까?')) {
      onDelete();
    }
  };

  const handleEdit = () => {
    if (loading) return;
    onEditToggle();
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="green" onClick={handleEdit} disabled={loading}>
        수정
      </Button>
      <Button size="sm" variant="white" onClick={handleDelete} disabled={loading}>
        {loading ? '처리 중...' : '삭제'}
      </Button>
    </div>
  );
}
