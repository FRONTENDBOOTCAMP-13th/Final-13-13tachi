import Link from 'next/link';
import RecipeCarousel from './RecipeCarousel';
import SearchBar from '@/components/common/SearchBar';
import RecipeList from './RecipeList';
import { getRecipes } from '@/data/functions/recipe';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '레시피 목록 - UgVeg',
    description: '다양한 요리 레시피를 확인해보세요.',
    openGraph: {
      title: '레시피 목록 - UgVeg',
      description: '오늘의 요리를 위한 레시피를 만나보세요.',
      url: '/recipe',
      images: 'https://ugveg.vercel.app/UgVeg.png',
    },
  };
}

export default async function RecipeListPage() {
  const res = await getRecipes();

  const hotRecipes =
    res.ok && res.item
      ? res.item
          .filter(recipe => recipe._id && (recipe.bookmarks ?? 0) >= 1)
          .slice(0, 8)
      : [];

  return (
    <>
      <div className="md:px-7.5 px-5 min-h-[calc(100dvh-26.125rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <main className="lg:max-w-5xl mx-auto lg:pt-[4.0625rem] lg:pb-[6.25rem] md:pt-12.5 md:pb-20 pt-[1.875rem] pb-15">
          <h2 className="text-gray lg:text-base md:text-sm text-xs">
            <Link href="/">HOME</Link>
            &nbsp;&gt;&nbsp;
            <Link href="/recipe">레시피</Link>
          </h2>

          <div>
            <h3 className="text-center lg:text-5xl md:text-4xl text-3xl font-bold mt-5 md:mb-[1.5625rem] mb-[1.5625rem]">
              오늘의 요리는?
            </h3>
          </div>

          <div className="flex justify-center lg:mt-[1.5625rem]">
            <SearchBar
              handleType="handleRecipeSearch"
              placeholder="레시피명을 입력해주세요"
            />
          </div>

          <h4 className="lg:text-3xl md:text-2xl text-lg text-dark-green font-semibold mt-[1.875rem]">
            인기 레시피
          </h4>

          {/* 레시피 캐러셀 - 인기 레시피 표시 */}
          {hotRecipes.length > 0 ? (
            <RecipeCarousel recipes={hotRecipes} sortBy="likes" />
          ) : (
            <div className="text-center text-gray-500 py-8">
              인기 레시피가 없습니다.
            </div>
          )}

          <h5 className="lg:text-3xl md:text-2xl text-lg text-dark-green font-bold mt-8">
            전체 레시피
          </h5>
          {res.ok ? <RecipeList post={res.item} /> : <p>{res.message}</p>}
        </main>
      </div>
    </>
  );
}
