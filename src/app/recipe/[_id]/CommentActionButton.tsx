'use client';

import Button from '@/components/common/Button';
import { deleteReply } from '@/data/actions/post';
import { PostReply } from '@/types/post';
import useUserStore from '@/zustand/useStore';
import { useParams } from 'next/navigation';
import { useActionState } from 'react';
// import Swal from 'sweetalert2';

// interface CommentActionButtonsProps {
//   authorId: number;
//   commentId: number;
//   onDelete: () => void;
//   onEditToggle: () => void;
//   loading?: boolean;
// }

export default function CommentActionButton({ reply }: { reply: PostReply }) {
  const { type, _id } = useParams();
  const { user } = useUserStore();

  const [deleteState, deleteAction, deleteLoading] = useActionState(
    deleteReply,
    null,
  );
  // const [updateState, updateAction, updateLoading] = useActionState(
  //   updateReply,
  //   null,
  // );

  console.log(deleteState, deleteLoading);
  // console.log(updateState, updateLoading);

  // if (deleteState?.ok === 1) {
  //   Swal.fire({
  //     icon: 'success',
  //     text: '댓글이 삭제되었습니다.',
  //     confirmButtonText: '확인',
  //   });
  // }

  // if (updateState?.ok === 1) {
  //   Swal.fire({
  //     icon: 'success',
  //     text: '댓글이 삭제되었습니다.',
  //     confirmButtonText: '확인',
  //   });
  // } else if (updateState?.ok === 0) {
  //   Swal.fire({
  //     icon: 'error',
  //     text: updateState?.message || '삭제에 실패했습니다.',
  //     confirmButtonText: '확인',
  //   });
  // }

  if (!user) return null;

  // const handleUpdate = async () => {
  //   if (!editedContent.trim()) {
  //     return Swal.fire({
  //       icon: 'warning',
  //       text: '내용을 입력하세요.',
  //       confirmButtonText: '확인',
  //     });
  //   }

  //   if (!user?.token?.accessToken) {
  //     return Swal.fire({
  //       icon: 'warning',
  //       text: '로그인 후 이용해주세요.',
  //       confirmButtonText: '확인',
  //     });
  //   }

  return (
    <div className="flex gap-2">
      {/* <form action={updateAction}>
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="_id" value={_id} />
        <input type="hidden" name="replyId" value={reply._id} />
        <input
          type="hidden"
          name="accessToken"
          value={user?.token?.accessToken ?? ''}
        />
        <Button size="sm" variant="green" ownerId={reply.user._id}>
          수정
        </Button>
      </form> */}
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
