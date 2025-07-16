import Link from 'next/link';
import RecipeCarousel from './RecipeCarousel';
import RecipeList from './RecipeList';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import RecipeSearchInput from './search/RecipeSearch';

export default function RecipeListPage() {
  return (
    <>
      <Header />
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

        <div className="flex justify-center mt-5">
          <RecipeSearchInput />
        </div>
        <h2 className="text-3xl text-dark-green font-semibold mt-[1.875rem]">
          인기 레시피
        </h2>
        {/* 레시피 캐러셀 */}

        <RecipeCarousel />
        <h3 className="text-xl text-dark-green font-bold">전체 레시피</h3>
        <RecipeList />
      </div>
      {/* margin div */}
      <div className="mb-25" />
      <Footer />
    </>
  );
}
