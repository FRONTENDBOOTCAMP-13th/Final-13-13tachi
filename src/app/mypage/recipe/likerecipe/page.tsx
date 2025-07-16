// import Image from 'next/image';

// 임시 이미지 불러오기
import LikeRecipeItem from '@/app/mypage/recipe/likerecipe/LikeRecipeItem';
import Button from '@/components/common/Button';

export default async function LikeRecipe() {
  return (
    <form className="flex flex-col justify-between h-full">
      <div className="grid grid-cols-4 w-fit gap-x-6 gap-y-5 mx-auto">
        <LikeRecipeItem />
        <LikeRecipeItem />
        <LikeRecipeItem />
      </div>
      <div className="flex justify-end">
        <Button size="xxl" variant="green">
          레시피 보러가기
        </Button>
      </div>
    </form>
  );
}
