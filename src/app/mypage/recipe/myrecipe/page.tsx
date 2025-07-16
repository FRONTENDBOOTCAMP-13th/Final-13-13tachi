// import Image from 'next/image';

// 임시 이미지 불러오기
import MyRecipeItem from '@/app/mypage/recipe/myrecipe/MyRecipeItem';
import Button from '@/components/common/Button';

export default async function MyRecipe() {
  return (
    <form className="flex flex-col justify-between h-full">
      <div className="grid grid-cols-4 w-fit gap-x-6 gap-y-5 mx-auto">
        <MyRecipeItem />
        <MyRecipeItem />
      </div>
      <div className="flex justify-end gap-x-2.5">
        <Button size="xxlsm" variant="white">
          삭제
        </Button>
        <Button size="xxl" variant="green">
          레시피 작성하기
        </Button>
      </div>
    </form>
  );
}
