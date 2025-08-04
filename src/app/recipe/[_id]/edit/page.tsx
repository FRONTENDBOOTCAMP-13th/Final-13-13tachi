import { getRecipeDetail } from '@/data/functions/recipe';
import RecipeEditForm from './RecipeEditForm';
import { Metadata } from 'next';
import Link from 'next/link';

interface EditPageProps {
  params: Promise<{
    _id: number;
  }>;
}

export async function generateMetadata({
  params,
}: EditPageProps): Promise<Metadata> {
  const { _id } = await params;
  const recipe = await getRecipeDetail(Number(_id));

  if (!recipe || recipe.ok === 0) {
    return {
      title: '레시피 수정 - 레시피를 찾을 수 없습니다',
      description: '요청한 레시피 정보를 불러올 수 없습니다.',
    };
  }

  const title = recipe.item.title;

  return {
    title: `레시피 수정 - ${title} - UgVeg`,
    description: `레시피 "${title}"을(를) 수정합니다.`,
    openGraph: {
      title: `레시피 수정 - ${title} - UgVeg`,
      description: `레시피 "${title}"을(를) 수정합니다.`,
      url: `/recipe/edit/${_id}`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default async function RecipeEditPage({ params }: EditPageProps) {
  const { _id } = await params;
  const recipe = await getRecipeDetail(Number(_id));
  if (!recipe) {
    return <div className="text-center mt-10">레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      {recipe.ok === 0 ? (
        <p>{recipe.message}</p>
      ) : (
        <div className="md:px-7.5 px-5 min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
          <div className="lg:max-w-5xl mx-auto lg:pt-[4.0625rem] lg:pb-[6.25rem] md:pt-12.5 md:pb-20 pt-[1.875rem] pb-15">
            <h2 className="text-gray lg:text-base md:text-sm text-xs mb-[0.9375rem]">
              <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
              <Link href="/recipe">레시피</Link>
              &nbsp;&gt;&nbsp;레시피 작성
            </h2>
            <RecipeEditForm
              postId={_id}
              initialTitle={recipe.item.title}
              initialContent={recipe.item.content}
              initialImage={recipe.item.extra?.image ?? ''}
            />
          </div>
        </div>
      )}
    </>
  );
}
