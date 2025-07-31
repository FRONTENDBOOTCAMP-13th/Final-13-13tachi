'use client';

import { useActionState, useEffect, useState } from 'react';
import { getLikeRecipe } from '@/data/functions/post';
import { ApiRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import { LikePostType } from '@/types/post';
import CustomLink from '@/components/common/CustomLink';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { deleteBookmark } from '@/data/actions/post';
import EmptyLikeRecipe from '@/app/mypage/recipe/bookmarkRecipe/EmptyBookmarkRecipe';
import BookmarkRecipeItem from '@/app/mypage/recipe/bookmarkRecipe/BookmarkRecipeItem';
import Loading from '@/app/mypage/recipe/bookmarkRecipe/Loading';

export default function BookmarkRecipeList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const router = useRouter();
  const [res, setRes] = useState<ApiRes<LikePostType[]> | null>(null);
  const [deleteState, deleteAction] = useActionState(deleteBookmark, null);

  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      // accessToken이 아직 로드 중이라면 아무것도 하지 않음
      return;
    }
    if (!accessToken) {
      {
        Swal.fire({
          icon: 'warning',
          text: '로그인 후 이용해주세요',
          confirmButtonText: '확인',
        }).then(result => {
          if (result.isConfirmed) router.replace('/login');
        });
      }
    } else {
      getLikeRecipe(accessToken)
        .then(res => {
          console.log('찜 데이터:', res);
          setRes(res);
        })
        .catch(err => {
          console.error('찜 가져오기 실패:', err);
          setRes({ ok: 0, message: '에러 발생!' });
        });
    }
  }, [accessToken]);

  useEffect(() => {
    if (deleteState?.ok) {
      if (accessToken) {
        getLikeRecipe(accessToken).then(setRes);
      }
    }
  }, [deleteState]);

  if (!res) {
    return <Loading />;
  }

  if (res.ok && res.item.length === 0) {
    return <EmptyLikeRecipe />;
  }

  if (res.ok === 0) {
    router.replace('/error'); // 실패 메시지 렌더링
  }

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-fit gap-x-6 gap-y-5 mx-auto">
        {res.ok ? (
          res.item.map((item: LikePostType) => (
            <BookmarkRecipeItem
              key={item._id}
              item={{
                _id: item._id,
                title: item.post.title,
                image: item.post.image,
              }}
              action={{ deleteAction }}
            />
          ))
        ) : (
          <p>{res.message}</p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <CustomLink href="/recipe">레시피 보러가기</CustomLink>
      </div>
    </>
  );
}
