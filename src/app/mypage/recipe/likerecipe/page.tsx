// import Image from 'next/image';

// import EmptyLikeRecipe from '@/app/mypage/recipe/likerecipe/EmptyLikeRecipe';

// 북마크 불러오기
import LikeRecipeItem from '@/app/mypage/recipe/likerecipe/LikeRecipeItem';
import Button from '@/components/common/Button';
import { ApiRes } from '@/types';
import { LikePostType } from '@/types/post';
import useUserStore from '@/zustand/useStore';
import { useEffect, useState } from 'react';

export default function LikeRecipe() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;

  const [res, setRes] = useState<ApiRes<LikePostType[]> | null>(null);
  useEffect(() => {
    if (accessToken) {
      getCartProducts(accessToken).then(setRes);
    }
  }, [accessToken]);

  if (!accessToken) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!res) {
    return <div>로딩중...</div>;
  }
  return (
    <form className="flex flex-col justify-between h-full">
      <div className="grid grid-cols-4 w-fit gap-x-6 gap-y-5 mx-auto">
        <LikeRecipeItem />
      </div>
      <div className="flex justify-end">
        <Button size="xxl" variant="green">
          레시피 보러가기
        </Button>
      </div>
    </form>

    // <div className="h-full">
    //   <EmptyLikeRecipe />
    // </div>
  );
}
