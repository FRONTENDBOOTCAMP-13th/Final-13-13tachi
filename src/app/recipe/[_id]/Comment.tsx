'use client';

// import { useState, useEffect } from 'react';
import Image from 'next/image';
// import useUserStore from '@/zustand/useStore';
// import CommentActionButton from './CommentActionButton';
// import Swal from 'sweetalert2';
// import { getUserByName } from '@/data/actions/post';
import { PostReply } from '@/types/post';
import CommentActionButton from '@/app/recipe/[_id]/CommentActionButton';
// import { cp } from 'fs';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface CommentProps {
//   comment: PostReply & {
//     name?: string; // 기존 코드와의 호환성을 위해 추가
//   };
//   currentUserId?: number | null;
//   onDelete: (id: number) => void;
//   onUpdate: (id: number, newContent: string) => void;
//   postId: number;
//   user_img: string;
// }

export default function Comment({ reply }: { reply: PostReply }) {
  // const { user } = useUserStore();
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedContent, setEditedContent] = useState(comment.content);
  // const [loading, setLoading] = useState(false);
  // // const [userImage, setUserImage] = useState<string | null>(null);
  // const [imageLoading, setImageLoading] = useState(true);

  // 댓글 작성자 이름 (name 또는 user.name 사용)
  // const authorName = comment.name || comment.user?.name || '';

  // 댓글 작성자의 이미지 정보 가져오기
  // useEffect(() => {
  //   const fetchUserImage = async () => {
  //     try {
  //       setImageLoading(true);

  //       // 현재 로그인된 사용자가 댓글 작성자와 같은 경우 store의 이미지 사용
  //       const isCurrentUser = user && authorName === user.name;
  //       if (isCurrentUser && user.image) {
  //         // setUserImage(user.image);
  //         setImageLoading(false);
  //         return;
  //       }

  //       // 댓글 데이터에 이미지가 있는 경우 사용
  //       if (comment.user?.image) {
  //         // setUserImage(comment.user.image);
  //         setImageLoading(false);
  //         return;
  //       }

  //       // Server Action을 통해 사용자 이미지 정보 조회
  //       if (authorName) {
  //         const response = await getUserByName(authorName);

  //         if (response.ok === 1 && response.item && response.item.length > 0) {
  //           const userData = response.item[0];
  //           if (userData.image) {
  //             // setUserImage(userData.image);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error('사용자 이미지 조회 중 오류:', error);
  //     } finally {
  //       setImageLoading(false);
  //     }
  //   };

  //   fetchUserImage();
  // }, [authorName, comment.user?.image, user]);

  // 이미지 URL 처리
  // const profileSrc = userImage ? `${userImage}` : '/images/front-end.png';

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

  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `${API_URL}/posts/${postId}/replies/${comment._id}`,
  //       {
  //         method: 'PATCH',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
  //           Authorization: `Bearer ${user.token.accessToken}`,
  //         },
  //         body: JSON.stringify({ content: editedContent }),
  //       },
  //     );

  //     const data = await res.json();
  //     if (res.ok && data.ok === 1) {
  //       onUpdate(comment._id, editedContent);
  //       setIsEditing(false);
  //       Swal.fire({
  //         icon: 'success',
  //         text: '댓글이 수정되었습니다.',
  //         confirmButtonText: '확인',
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         text: data.message || '수정에 실패했습니다.',
  //         confirmButtonText: '확인',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('댓글 수정 중 오류:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       text: '수정 중 오류가 발생했습니다.',
  //       confirmButtonText: '확인',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDelete = async () => {
  //   if (!user?.token?.accessToken) {
  //     return Swal.fire({
  //       icon: 'warning',
  //       text: '로그인 후 이용해주세요.',
  //       confirmButtonText: '확인',
  //     });
  //   }

  //   const result = await Swal.fire({
  //     icon: 'question',
  //     text: '댓글을 삭제하시겠습니까?',
  //     showCancelButton: true,
  //     confirmButtonText: '삭제',
  //     cancelButtonText: '취소',
  //     confirmButtonColor: '#d33',
  //   });

  //   if (!result.isConfirmed) return;

  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       `${API_URL}/posts/${postId}/replies/${comment._id}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
  //           Authorization: `Bearer ${user.token.accessToken}`,
  //         },
  //       },
  //     );

  //     const data = await res.json();
  //     if (res.ok && data.ok === 1) {
  //       onDelete(comment._id);
  //       Swal.fire({
  //         icon: 'success',
  //         text: '댓글이 삭제되었습니다.',
  //         confirmButtonText: '확인',
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         text: data.message || '삭제에 실패했습니다.',
  //         confirmButtonText: '확인',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('댓글 삭제 중 오류:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       text: '삭제 중 오류가 발생했습니다.',
  //       confirmButtonText: '확인',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleEditToggle = () => {
  //   setIsEditing(!isEditing);
  //   if (isEditing) setEditedContent(comment.content);
  // };
  return (
    <div className="flex items-start py-5 border-b-2 border-[#DEDEDE]">
      <div className="relative w-[3.125rem] h-[3.125rem] shrink-0">
        {reply.user.image ? (
          <Image
            src={reply.user?.image}
            alt={`${reply.user.name} 프로필 이미지`}
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <Image
            src={'/profile.svg'}
            alt={`${reply.user.name} 프로필 이미지`}
            fill
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div className="ml-4 w-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-dark-green mb-1">
            {reply.user.name}
          </p>
          {/* {!isEditing && user && authorName === user.name && (
            <CommentActionButton
              authorId={comment.user._id}
              commentId={comment._id}
              onDelete={handleDelete}
              onEditToggle={handleEditToggle}
              loading={loading}
            />
          )} */}
          <CommentActionButton reply={reply} />
        </div>
        <p className="text-sm">{reply.content}</p>
        {/* {isEditing ? (
          <div className="flex gap-2 items-center mt-2">
            <input
              className="border px-2 py-1 rounded text-sm w-full"
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
              disabled={loading}
              placeholder="댓글 내용을 입력하세요"
            />
            <button
              className="text-dark-green text-sm hover:underline px-2 py-1 border border-dark-green rounded"
              onClick={handleUpdate}
              type="button"
              disabled={loading}
            >
              {loading ? '저장 중...' : '저장'}
            </button>
            <button
              className="text-gray-500 text-sm hover:underline px-2 py-1 border border-gray-300 rounded"
              onClick={handleEditToggle}
              disabled={loading}
            >
              취소
            </button>
          </div>
        ) : (
          <p className="text-sm">{comment.content}</p>
        )} */}
      </div>
    </div>
  );
}
