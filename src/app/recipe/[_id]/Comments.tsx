// 'use client';

// import { useState, useEffect } from 'react';
// import Button from '@/components/common/Button';
import Comment from './Comment';
// import useUserStore from '@/zustand/useStore';
// import Swal from 'sweetalert2';
// import { PostReply, ReplyApiResponse } from '@/types/post';
import { getReplies } from '@/data/functions/post';
import CommentNew from '@/app/recipe/[_id]/CommentNew';
import { PostReply } from '@/types/post';

// PostReply 타입에 name 필드를 임시 추가한 타입 (기존 호환성 유지용)
// interface CommentType extends PostReply {
//   name?: string;
// }

interface CommentsProps {
  postId: number;
}

export default async function Comments({ postId }: CommentsProps) {
  // const { user } = useUserStore();
  // const [comments, setComments] = useState<CommentType[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [imagesLoaded, setImagesLoaded] = useState(false);
  // const [content, setContent] = useState('');

  // 이미지 모두 로드될 때까지 대기하는 함수
  // const waitForImagesToLoad = (
  //   imageUrls: (string | null | undefined)[],
  // ): Promise<void> => {
  //   const validUrls = imageUrls.filter(url => url);
  //   if (validUrls.length === 0) return Promise.resolve();

  //   return Promise.all(
  //     validUrls.map(
  //       url =>
  //         new Promise<void>(resolve => {
  //           const img = new Image();
  //           img.src = url!;
  //           img.onload = () => resolve();
  //           img.onerror = () => resolve(); // 에러 시에도 resolve해서 무한대기 방지
  //         }),
  //     ),
  //   ).then(() => {});
  // };

  // useEffect(() => {
  //   const res = getReplies(postId);
  // });

  // Swal.fire({
  //       icon: 'error',
  //       text: '댓글을 불러오는 데 실패했습니다.',
  //       confirmButtonText: '확인',
  //     });

  // useEffect(() => {
  //   fetchComments();
  // }, [postId]);

  // const handleDelete = (_id: number) => {
  //   setComments(prev => prev.filter(comment => comment._id !== _id));
  // };

  // const handleUpdate = (_id: number, newContent: string) => {
  //   setComments(prev =>
  //     prev.map(comment =>
  //       comment._id === _id ? { ...comment, content: newContent } : comment,
  //     ),
  //   );
  // };

  const res = await getReplies(Number(postId));

  // if (loading || !imagesLoaded) {
  //   return <p>댓글 및 이미지 불러오는 중...</p>;
  // }

  return (
    <div className="p-15">
      <div className="flex items-center border-b-2 border-[#DEDEDE]">
        <h3 className="text-xl font-semibold mb-2">댓글</h3>
        {res.ok ? (
          <span className="text-xl font-semibold text-[#67913C] ml-2 mb-2">
            {res.item.length}
          </span>
        ) : (
          <span></span>
        )}
      </div>

      {res.ok ? (
        res.item.map((reply: PostReply) => (
          <Comment key={reply._id} reply={reply} />
        ))
      ) : (
        <p>{res.message}</p>
      )}

      <CommentNew postId={postId} />
    </div>
  );
}
