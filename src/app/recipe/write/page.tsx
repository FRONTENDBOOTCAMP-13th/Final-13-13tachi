import Link from 'next/link';
import RecipeWriteClient from './RecipeWriteClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '레시피 작성 - UgVeg',
    description: '나만의 레시피를 작성해보세요.',
    openGraph: {
      title: '레시피 작성 - UgVeg',
      description: '나만의 레시피를 작성해보세요.',
      url: '/recipe/write',
      images: 'https://ugveg.vercel.app/UgVeg.png',
    },
  };
}

export default function RecipeWritePage() {
  return (
    <div className="md:px-7.5 px-5">
      <main className="lg:max-w-5xl mx-auto pt-[4rem] pb-[6rem] min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <h2 className="text-gray lg:text-base md:text-sm text-xs">
          <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
          <Link href="/recipe">레시피</Link>
          &nbsp;&gt;&nbsp;레시피 작성
        </h2>
        <h3 className="lg:text-5xl md:text-4xl text-3xl font-bold mt-4 mb-6">
          레시피 작성
        </h3>

        <RecipeWriteClient />
      </main>
    </div>
  );
}
