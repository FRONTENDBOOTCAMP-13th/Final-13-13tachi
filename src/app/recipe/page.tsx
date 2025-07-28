import Link from 'next/link';
import RecipeCarousel from './RecipeCarousel';
import SearchBar from '@/components/common/SearchBar';
import RecipeList from './RecipeList';

export default function RecipeListPage() {
  return (
    <>
      <div className="lg:max-w-5xl mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray">
          <Link href="/">HOME</Link>
          <span>{' > '}</span>
          <Link href="/recipe">레시피</Link>
        </h2>

        <div>
          <h1 className="text-center text-5xl font-bold mt-5">
            오늘의 요리는?
          </h1>
        </div>

        <div className="flex justify-center lg:mt-[1.5625rem]">
          <SearchBar handleType="handleRecipeSearch" />
        </div>
        <h2 className="text-3xl text-dark-green font-semibold mt-[1.875rem]">
          인기 레시피
        </h2>
        {/* 레시피 캐러셀 */}

        <RecipeCarousel />
        <h3 className="text-3xl text-dark-green font-bold">전체 레시피</h3>
        <RecipeList />
      </div>
    </>
  );
}
