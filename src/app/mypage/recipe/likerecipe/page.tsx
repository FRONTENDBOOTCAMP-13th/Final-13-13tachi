// import Image from 'next/image';

// import EmptyLikeRecipe from '@/app/mypage/recipe/likerecipe/EmptyLikeRecipe';

// 북마크 불러오기
import LikeRecipeList from '@/app/mypage/recipe/likerecipe/LikeRecipeList';

export default function LikeRecipe() {
  return (
    <div className="flex flex-col justify-between h-full">
      <LikeRecipeList />
    </div>
  );
}
