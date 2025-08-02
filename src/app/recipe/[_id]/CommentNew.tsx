'use client';

import Button from '@/components/common/Button';
import { createReply } from '@/data/actions/post';
import useUserStore from '@/zustand/useStore';
import { useActionState } from 'react';

export default function CommentNew({ postId }: { postId: number }) {
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!content.trim()) {
  //     Swal.fire({
  //       icon: 'warning',
  //       text: '댓글 내용을 입력해주세요.',
  //       confirmButtonText: '확인',
  //     });
  //     return;
  //   }

  //   if (!user) {
  //     Swal.fire({
  //       icon: 'warning',
  //       text: '로그인이 필요합니다.',
  //       confirmButtonText: '확인',
  //     });
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/replies`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
  //         },
  //         body: JSON.stringify({
  //           content,
  //           name: user.name,
  //           user_image: user.image,
  //         }),
  //       },
  //     );
  //     const data = await res.json();
  //     if (res.status === 201 && data.ok === 1) {
  //       setContent('');
  //       await fetchComments();
  //       Swal.fire({
  //         icon: 'success',
  //         text: '댓글이 등록되었습니다.',
  //         confirmButtonText: '확인',
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         text: data.message || '댓글 등록에 실패했습니다.',
  //         confirmButtonText: '확인',
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       icon: 'error',
  //       text: '네트워크 오류가 발생했습니다.',
  //       confirmButtonText: '확인',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
