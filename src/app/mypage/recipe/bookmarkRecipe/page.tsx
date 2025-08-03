import BookmarkRecipeList from '@/app/mypage/recipe/bookmarkRecipe/BookmarkRecipeList';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `레시피 북마크 목록 - UgVeg: 흙내음 상점`,
    description: `내가 북마크 한 레시피 목록을 확인하세요.`,
    openGraph: {
      title: `레시피 북마크 목록 - UgVeg: 흙내음 상점`,
      description: `내가 북마크 한 레시피 목록을 확인하세요.`,
      url: `/mypage/recipe/bookmarkRecipe`,
      images: {
        url: '/UgVeg.png',
      },
    },
  };
}

export default function BookmarkRecipe() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <BookmarkRecipeList />
    </div>
  );
}
