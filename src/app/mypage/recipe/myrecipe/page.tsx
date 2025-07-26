// import Image from 'next/image';

// import EmptyMyRecipe from '@/app/mypage/recipe/myrecipe/EmptyMyRecipe';

// 레시피 목록 불러오기

import MyRecipeList from '@/app/mypage/recipe/myrecipe/MyRecipeList';

export default async function MyRecipe() {
  return (
    <div className="flex flex-col justify-between lg:w-[49.875rem] md:w-[31.75rem] w-80 h-full">
      <MyRecipeList />
    </div>
  );
}
