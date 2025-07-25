'use client';

import { useEffect, useState } from 'react';
import { getLikeRecipe } from '@/data/functions/post';
import { ApiRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import { LikePostType } from '@/types/post';
import LikeRecipeItem from '@/app/mypage/recipe/likerecipe/LikeRecipeItem';

import CustomLink from '@/components/common/CustomLink';
import EmptyLikeRecipe from '@/app/mypage/recipe/likerecipe/EmptyLikeRecipe';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function LikeRecipeList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const router = useRouter();
  const [res, setRes] = useState<ApiRes<LikePostType[]> | null>(null);

  useEffect(() => {
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

  if (!res) {
    return <div>로딩중...</div>;
  }

  console.log('1');
  console.log(res);
  const items =
    res &&
    Object.entries(res)
      .filter(([key]) => key !== 'ok')
      .map(([, value]) => value as LikePostType);

  if (res.ok && items.length === 0) {
    return <EmptyLikeRecipe />;
  }

  return (
    <>
      <div className="grid grid-cols-4 w-fit gap-x-6 gap-y-5 mx-auto">
        {res.ok ? (
          items.map((item: LikePostType) => (
            <LikeRecipeItem
              key={item._id}
              item={{
                _id: item._id,
                title: item.post.title,
                image: item.post.image,
              }}
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
