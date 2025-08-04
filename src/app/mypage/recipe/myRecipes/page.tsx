import MyRecipeList from '@/app/mypage/recipe/myRecipes/MyRecipeList';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `내 레시피 목록 - UgVeg: 흙내음 상점`,
    description: `내가 작성한 레시피를 확인하세요.`,
    openGraph: {
      title: `내 레시피 목록 - UgVeg: 흙내음 상점`,
      description: `내가 작성한 레시피를 확인하세요.`,
      url: `/mypage/recipe/myRecipes`,
      images: {
        url: '/UgVeg.png',
      },
    },
  };
}

export default async function MyRecipe() {
  return (
    <div className="flex flex-col justify-between h-full">
      <MyRecipeList />
    </div>
  );
}
