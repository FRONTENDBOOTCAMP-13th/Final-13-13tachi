import Link from 'next/link';
import RecipeCarousel from './RecipeCarousel';
import RecipeList from './RecipeList';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Search from '@/components/common/Search';

export default function RecipeListPage() {
  return (
    <>
      <Header />
      <div className="lg:max-w-5xl mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray">
          <Link href="/">HOME</Link>
          <span>{' > '}</span>
          <Link href="/recipe">레시피</Link>
        </h2>

        <div>
          <h1 className="text-center text-5xl font-bold mt-[1.5625rem]">
            오늘의 요리는?
          </h1>
        </div>

        <div className="flex justify-center mt-5">
          <Search />
        </div>
        <h2 className="text-5xl text-dark-green font-semibold mt-[1.875rem]">
          인기 레시피
        </h2>
        {/* 레시피 캐러셀 */}

        <RecipeCarousel />
        <h3 className="text-3xl text-dark-green font-bold">전체 레시피</h3>
        <RecipeList />
      </div>
      <Footer />
    </>
  );
}
