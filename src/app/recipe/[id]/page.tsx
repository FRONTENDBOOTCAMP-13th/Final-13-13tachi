// app/recipe/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Bookmark } from 'lucide-react';
import type { Post } from '@/types/post';
import Comments from './Comments';
import Profile from './Profile';
import RecipeActionButtons from './RecipeActionButton';
import ShareButton from '@/components/common/ShareButton';

type RecipeDetailData = Pick<
  Post,
  | '_id'
  | 'title'
  | 'content'
  | 'user'
  | 'category'
  | 'image'
  | 'tag'
  | 'createdAt'
>;

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
    console.error('❌ fetch error:', error);
    return null;
  }
}

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await fetchRecipeDetail(params.id);
  if (!recipe) {
    return <div className="text-center mt-10">레시피를 찾을 수 없습니다.</div>;
  }

  // 이미지 URL 정리
  const imageUrl =
    recipe.image && recipe.image.trim() !== ''
      ? `${process.env.NEXT_PUBLIC_API_URL}/${recipe.image}`.replace(
          /(?<!:)\/{2,}/g,
          '/',
        )
      : null;

  const profileImageUrl =
    recipe.user.image && recipe.user.image.trim() !== ''
      ? recipe.user.image
      : null;

  // 태그 배열 파싱
  const tagList = (() => {
    try {
      const parsed = JSON.parse(recipe.tag ?? '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return recipe.tag?.split(',') || [];
    }
  })();

  return (
    <>
      <Header />
      <div className="lg:max-w-[56.25rem] mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray text-sm mb-5">
          <Link href="/">HOME</Link> &gt; <Link href="/recipe">레시피</Link>{' '}
          &gt; {recipe.title}
        </h2>

        <div className="px-15">
          {/* 대표 이미지 */}
          <div className="flex justify-center mt-[4.0625rem] relative z-0">
            <div className="lg:w-[56.25rem] lg:h-[31.25rem] relative">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={recipe.title}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                  이미지 없음
                </div>
              )}
            </div>
          </div>

          {/* 프로필 */}
          <Profile username={recipe.user.name} imageUrl={profileImageUrl} />

          <main>
            <h1 className="text-5xl font-bold mt-6">{recipe.title}</h1>

            {/* 태그 + 수정/삭제 버튼 */}
            <div className="flex justify-between items-center mt-5">
              <div className="flex gap-2 flex-wrap">
                {tagList.map((item, idx) => (
                  <FoodBtn key={idx} label={item} selected={true} />
                ))}
              </div>

              {/* 작성자만 수정/삭제 가능 */}
              <RecipeActionButtons
                authorId={String(recipe.user._id)}
                postId={String(recipe._id)}
              />
            </div>

            {/* 본문 내용 */}
            <div
              className="bg-[#f4f4f4] px-9 py-6 rounded-lg mt-5"
              dangerouslySetInnerHTML={{
                __html: recipe.content || '내용 없음',
              }}
            />

            {/* 공유/북마크 */}
            <div className="flex justify-end mt-3">
              <ShareButton />
              <div className="text-center ml-[0.4375rem]">
                <Bookmark strokeWidth={1} />
                <p>13</p>
              </div>
            </div>

            {/* 목록으로 */}
            <div className="flex justify-center mt-[1.875rem]">
              <Button size="xxl">
                <Link href="/recipe">목록으로</Link>
              </Button>
            </div>

            {/* 연관상품 자리 */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold">연관상품</h2>
              <div className="mt-5">
                <p>연관상품 컴포넌트 자리</p>
              </div>
            </div>

            {/* 댓글 */}
            <Comments postId={params.id} />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
