import Link from 'next/link';
import RecipeCarousel from './RecipeCarousel';
import SearchBar from '@/components/common/SearchBar';
import RecipeList from './RecipeList';
import { getRecipes } from '@/data/functions/post';

export default async function RecipeListPage() {
  const res = await getRecipes();

  // 인기 레시피 데이터 생성 (예: 최신 8개 또는 특정 조건으로 필터링)
  const hotRecipes =
    res.ok && res.item
      ? res.item.slice(0, 8) // 최신 8개를 인기 레시피로 사용
      : [];

  return (
    <>
      <div className="lg:max-w-5xl mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray">
          <Link href="/">HOME</Link>
          &nbsp;&gt;&nbsp;
          <Link href="/recipe">레시피</Link>
        </h2>

        <div>
          <h3 className="text-center text-5xl font-bold mt-5">
            오늘의 요리는?
          </h3>
        </div>

        <div className="flex justify-center lg:mt-[1.5625rem]">
          <SearchBar
            handleType="handleRecipeSearch"
            placeholder="레시피명을 입력해주세요"
          />
        </div>

        <h4 className="text-3xl text-dark-green font-semibold mt-[1.875rem]">
          인기 레시피
        </h4>

        {/* 레시피 캐러셀 */}
        {hotRecipes.length > 0 ? (
          <RecipeCarousel recipes={hotRecipes} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            인기 레시피가 없습니다.
          </div>
        )}

        <h5 className="text-3xl text-dark-green font-bold mt-8">전체 레시피</h5>
        {res.ok ? <RecipeList post={res.item} /> : <p>{res.message}</p>}
      </div>
    </>
  );
}
