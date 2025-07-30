import { getRecipeDetail } from '@/data/functions/post';
import RecipeEditForm from './RecipeEditForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '레시피 수정',
};
interface EditPageProps {
  params: Promise<{
    _id: number;
  }>;
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
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">레시피 수정</h1>
          <RecipeEditForm
            postId={_id}
            initialTitle={recipe.item.title}
            initialContent={recipe.item.content}
            initialImage={recipe.item.extra?.image ?? ''}
          />
        </div>
      )}
    </>
  );
}
