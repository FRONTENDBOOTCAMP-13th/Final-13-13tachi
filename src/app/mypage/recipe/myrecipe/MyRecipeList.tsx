'use client';

import { useEffect, useState } from 'react';
import { getMyRecipe } from '@/data/functions/post';
import Button from '@/components/common/Button';
import { ApiRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import MyRecipeItem from '@/app/mypage/recipe/myrecipe/MyRecipeItem';
import { MyPostType } from '@/types/post';
import EmptyMyRecipe from '@/app/mypage/recipe/myrecipe/EmptyMyRecipe';

export default function MyRecipeList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const [res, setRes] = useState<ApiRes<MyPostType[]> | null>(null);

  useEffect(() => {
    if (accessToken) {
      getMyRecipe(accessToken).then(setRes);
    }
  }, [accessToken]);

  if (!accessToken) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!res) {
    return <div>로딩중...</div>;
  }

  if (res.ok && res.item.length === 0) {
    return <EmptyMyRecipe />;
  }
  console.log('1');
  console.log(res);
  return (
    <>
      <div className="grid grid-cols-4 w-fit gap-x-6 gap-y-5 mx-auto">
        {res.ok ? (
          res.item.map((item: MyPostType) => (
            <MyRecipeItem
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
      <div className="flex justify-end gap-x-2.5">
        <form>
          <Button size="xxlsm" variant="white">
            삭제
          </Button>
        </form>
        <form>
          <Button size="xxl" variant="green">
            레시피 작성하기
          </Button>
        </form>
      </div>
    </>
  );
}
