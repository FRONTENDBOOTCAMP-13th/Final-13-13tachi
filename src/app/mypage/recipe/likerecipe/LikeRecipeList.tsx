'use client';

import { useEffect, useState } from 'react';
import { getLikeRecipe } from '@/data/functions/post';
import Button from '@/components/common/Button';
import { ApiRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import { LikePostType } from '@/types/post';
import LikeRecipeItem from '@/app/mypage/recipe/likerecipe/LikeRecipeItem';

export default function LikeRecipeList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const [res, setRes] = useState<ApiRes<LikePostType[]> | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    getLikeRecipe(accessToken)
      .then(res => {
        console.log('찜 데이터:', res);
        setRes(res);
      })
      .catch(err => {
        console.error('찜 가져오기 실패:', err);
        setRes({ ok: 0, message: '에러 발생!' });
      });
  }, [accessToken]);

  if (!accessToken) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!res) {
    return <div>로딩중...</div>;
  }

  // if (res.ok && res.item.length === 0) {
  //   return <EmptyMyRecipe />;
  // }
  console.log('1');
  console.log(res);
  const items =
    res &&
    Object.entries(res)
      .filter(([key]) => key !== 'ok')
      .map(([, value]) => value as LikePostType);

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
              }}
            />
          ))
        ) : (
          <p>{res.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button size="xxl" variant="green">
          레시피 보러가기
        </Button>
      </div>
    </>
  );
}
