import Link from 'next/link';
import RecipeCarousel from './RecipeCarousel';
import SearchBar from '@/components/common/SearchBar';
import RecipeList from './RecipeList';
import { getRecipes } from '@/data/functions/post';

export default async function RecipeListPage() {
  const res = await getRecipes();

  // 인기 레시피 데이터 생성 - extra.isBest가 true인 레시피들
  const hotRecipes =
    res.ok && res.item
      ? res.item
          .filter(
            recipe => recipe._id && recipe.extra?.isBest === true, // isBest가 true인 레시피만
          )
          .slice(0, 8) // 최대 8개까지 표시
      : [];

  return (
    <>
      <div className="lg:max-w-5xl mx-auto pt-[4.0625rem] pb-[6.25rem] md:px-7.5 md:pt-12.5 md:pb-20">
        <h2 className="text-gray md:text-sm">
          <Link href="/">HOME</Link>
          &nbsp;&gt;&nbsp;
          <Link href="/recipe">레시피</Link>
        </h2>

        <div>
          <h3 className="text-center lg:text-5xl md:text-4xl font-bold mt-5">
            오늘의 요리는?
          </h3>
        </div>

        <div className="flex justify-center lg:mt-[1.5625rem]">
          <SearchBar
            handleType="handleRecipeSearch"
            placeholder="레시피명을 입력해주세요"
          />
        </div>

        <h4 className="lg:text-3xl md:text-2xl text-dark-green font-semibold mt-[1.875rem]">
          인기 레시피
        </h4>

        {/* 레시피 캐러셀 - 인기 레시피 표시 */}
        {hotRecipes.length > 0 ? (
          <RecipeCarousel recipes={hotRecipes} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            인기 레시피가 없습니다.
          </div>
        )}

        <h5 className="lg:text-3xl md:text-2xl text-dark-green font-bold mt-8">
          전체 레시피
        </h5>
        {res.ok ? <RecipeList post={res.item} /> : <p>{res.message}</p>}
      </div>
    </>
  );
}
