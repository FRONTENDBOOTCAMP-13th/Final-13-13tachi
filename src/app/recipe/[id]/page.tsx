// app/recipe/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Bookmark, Share2 } from 'lucide-react';
import profilePic from '../../../images/profile.jpg';
import type { Post } from '@/types/post';
import Comments from './Comments';

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
    console.error(error);
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

  // 이미지 URL 구성
  const imageUrl =
    recipe.image && recipe.image.trim() !== ''
      ? `${process.env.NEXT_PUBLIC_API_URL}/${recipe.image}`.replace(
          /\/{2,}/g,
          '/',
        )
      : null;

  return (
    <>
      <Header />
      <div className="lg:max-w-[56.25rem] mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray">
          <Link href="/">HOME</Link> &gt; <Link href="/recipe">레시피</Link>{' '}
          &gt; {recipe.title}
        </h2>

        <div className="px-15">
          {/* 레시피 이미지 */}
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

          {/* 작성자 프로필 */}
          <div className="flex flex-col items-center justify-center mt-[-4rem] relative z-10">
            <div className="lg:w-[7.5rem] lg:h-[7.5rem] overflow-hidden rounded-full ring-4 ring-white">
              <Image
                src={profilePic}
                alt={recipe.user?.name ?? '작성자'}
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-[0.625rem] text-xl font-semibold">
              {recipe.user?.name ?? '익명'}
            </span>
          </div>

          <main>
            <h1 className="text-5xl font-bold">{recipe.title}</h1>

            {/* 태그와 버튼 */}
            <div className="flex justify-between items-center mt-5">
              <div className="flex gap-2 flex-wrap">
                {(() => {
                  let tagList: string[] = [];

                  try {
                    const parsed = JSON.parse(recipe.tag ?? '[]');
                    if (Array.isArray(parsed)) tagList = parsed;
                  } catch {
                    tagList = recipe.tag?.split(',') || [];
                  }

                  return tagList.map((item, idx) => (
                    <FoodBtn key={idx} label={item} selected={true} />
                  ));
                })()}
              </div>

              <div className="flex">
                <div className="mr-[0.625rem]">
                  <Button size="sm">수정</Button>
                </div>
                <Button size="sm" variant="white">
                  삭제
                </Button>
              </div>
            </div>

            {/* 본문 */}
            <div
              className="bg-[#f4f4f4] px-9 py-6 rounded-lg mt-5"
              dangerouslySetInnerHTML={{ __html: recipe.content || 'null' }}
            />

            {/* 공유/북마크 */}
            <div className="flex justify-end mt-3">
              <Share2 strokeWidth={1} fill="true" />
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

            {/* 연관 상품 자리 */}
            <div>
              <h2 className="text-2xl font-bold mt-15">연관상품</h2>
              <div className="mt-[1.875rem]">
                <p>연관상품 컴포 올 자리</p>
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
