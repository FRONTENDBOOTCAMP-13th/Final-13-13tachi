// app/recipe/write/page.tsx (서버 컴포넌트)
import Link from 'next/link';
import RecipeWriteClient from './RecipeWriteClient';

export default function RecipeWritePage() {
  return (
    <main className="lg:max-w-5xl mx-auto pt-[4rem] pb-[6rem] px-4">
      <h2 className="text-gray">
        <Link href="/">HOME</Link> &gt; <Link href="/recipe">레시피</Link> &gt;
        레시피 작성
      </h2>
      <h3 className="text-5xl font-bold mt-4 mb-6">레시피 작성</h3>

      <RecipeWriteClient />
    </main>
  );
}
