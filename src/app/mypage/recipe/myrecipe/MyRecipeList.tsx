'use client';

import { useEffect, useState } from 'react';
import { getMyRecipe } from '@/data/functions/post';
// import Button from '@/components/common/Button';
import { ApiRes } from '@/types';
import useUserStore from '@/zustand/useStore';
import MyRecipeItem from '@/app/mypage/recipe/myrecipe/MyRecipeItem';
import { MyPostType } from '@/types/post';
import EmptyMyRecipe from '@/app/mypage/recipe/myrecipe/EmptyMyRecipe';
import CustomLink from '@/components/common/CustomLink';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Loading from '@/app/mypage/recipe/myrecipe/Loading';
// import { deletePost } from '@/data/actions/post';

export default function MyRecipeList() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const router = useRouter();

  const [res, setRes] = useState<ApiRes<MyPostType[]> | null>(null);

  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      // accessToken이 아직 로드 중이라면 아무것도 하지 않음
      return;
    }
    if (accessToken) {
      getMyRecipe(accessToken).then(setRes);
    } else {
      Swal.fire({
        icon: 'warning',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      }).then(result => {
        if (result.isConfirmed) router.replace('/login');
      });
    }
  }, [accessToken]);

  if (!res) {
    return <Loading />;
  }

  if (res.ok && res.item.length === 0) {
    return <EmptyMyRecipe />;
  }

  console.log('1');
  console.log(res);
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-fit gap-x-6 gap-y-5 mx-auto">
        {res.ok ? (
          res.item.map((item: MyPostType) => (
            <MyRecipeItem
              key={item._id}
              item={{
                _id: item._id,
                title: item.title,
                image: item.image,
              }}
            />
          ))
        ) : (
          <p>{res.message}</p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        {/* <form>
          <Button size="xxlsm" variant="white">
            삭제
          </Button>
        </form> */}
        <CustomLink href={`/recipe/write`}>레시피 작성하기</CustomLink>
      </div>
    </>
  );
}
