// import Image from 'next/image';

// import EmptyMyRecipe from '@/app/mypage/recipe/myrecipe/EmptyMyRecipe';

// 레시피 목록 불러오기

import MyRecipeList from '@/app/mypage/recipe/myrecipe/MyRecipeList';

export default async function MyRecipe() {
  return (
    <div className="flex flex-col justify-between h-full">
      <MyRecipeList />
    </div>
    // <div className="h-full">
    //   <EmptyMyRecipe />
    // </div>
  );
}
