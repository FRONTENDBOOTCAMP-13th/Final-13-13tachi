import Link from 'next/link';
import RecipeCarousel from './RecipeCarousel';
import RecipeList from './RecipeList';

export default function RecipeListPage() {
  return (
    <div className="lg:max-w-5xl m-auto">
      <h2 className="text-gray mt-[4.0625rem]">
        <Link href="/">HOME</Link>
        <span>{' > '}</span>
        <Link href="/recipe/list">레시피</Link>
      </h2>

      <div>
        <h1 className="text-center text-5xl font-bold mt-[1.5625rem]">
          오늘의 요리는?
        </h1>
      </div>

      <h2 className="text-3xl text-dark-green font-semibold mt-[1.875rem]">
        인기 레시피
      </h2>
      {/* 레시피 캐러셀 */}

      <RecipeCarousel />
      <h3 className="text-xl text-dark-green font-bold">전체 레시피</h3>
      <div className="flex justify-between mt-[1.875rem]">
        <div className="flex gap-5 font-semibold text-dark-green">
          <span>전체</span>
          <span>채소</span>
          <span>과일</span>
          <span>나의 레시피</span>
        </div>
        <span className="text-orange font-semibold">+ 레시피 등록</span>
      </div>
      <RecipeList />
    </div>
  );
}
