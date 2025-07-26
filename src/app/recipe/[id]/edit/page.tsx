import RecipeEditForm from './RecipeEditForm';
import { Metadata } from 'next';
import type { Post } from '@/types/post';

type RecipeDetailData = Pick<
  Post,
  '_id' | 'title' | 'content' | 'user'
> & {
  extra?: {
    image?: string;
    [key: string]: unknown;
  };
};

async function fetchRecipeDetail(id: string): Promise<RecipeDetailData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      headers: {
        'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
      },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch recipe detail');
    const data = await res.json();
    return data.item || null;
  } catch (error) {
    console.error('fetch error:', error);
    return null;
  }
}

export const metadata: Metadata = {
  title: '레시피 수정',
};

export default async function RecipeEditPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await fetchRecipeDetail(params.id);
  if (!recipe) {
    return <div className="text-center mt-10">레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">레시피 수정</h1>
      <RecipeEditForm
        postId={params.id}
        initialTitle={recipe.title}
        initialContent={recipe.content}
        initialImage={recipe.extra?.image ?? ''}
      />
    </div>
  );
}
