// app/recipe/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';
import Comments from './Comments';
import Profile from './Profile';
import RecipeActionButtons from './RecipeActionButton';
import ShareButton from '@/components/common/ShareButton';
import { getRecipeDetail } from '@/data/functions/post';
import BookmarkButton from './BookmarkButton';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export type RecipeDetailData = Pick<
//   Post,
//   | '_id'
//   | 'title'
//   | 'content'
//   | 'user'
//   | 'category'
//   | 'image'
//   | 'tag'
//   | 'createdAt'
// >;

interface InfoPageProps {
  params: Promise<{
    _id: number;
  }>;
}

export default async function RecipeDetailPage({ params }: InfoPageProps) {
  const { _id } = await params;
  const recipe = await getRecipeDetail(Number(_id));
  if (!recipe) {
    return <div className="text-center mt-10">레시피를 찾을 수 없습니다.</div>;
  }

  // 이미지 URL 정리
  // const imageUrl =
  //   recipe.image && recipe.image.trim() !== ''
  //     ? `${process.env.NEXT_PUBLIC_API_URL}/${recipe.image}`.replace(
  //         /(?<!:)\/{2,}/g,
  //         '/',
  //       )

  const imageUrl = recipe.ok;

  // const profileImageUrl =
  //   recipe.user.image && recipe.user.image.trim() !== ''
  //     ? recipe.user.image
  //     : null;

  // 태그 배열 파싱
  const tagList = (() => {
    if (recipe.ok === 0) {
      return [];
    } else {
      try {
        const parsed = JSON.parse(recipe.item.tag ?? '[]');
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return recipe.item.tag?.split(',') || [];
      }
    }
  })();

  return (
    <>
      {recipe.ok === 0 ? (
        <p>{recipe.message}</p>
      ) : (
        <>
          <div className="flex justify-center">
            <h2 className="text-gray text-sm mt-[4.0625rem] lg:w-[64rem]">
              <Link href="/">HOME</Link> &gt; <Link href="/recipe">레시피</Link>{' '}
              &gt; {recipe.item.title}
            </h2>
          </div>
          <div className="lg:max-w-[56.25rem] mx-auto pb-[6.25rem]">
            <div className="px-15">
              {/* 대표 이미지 */}
              <div className="flex justify-center mt-[4.0625rem] relative z-0">
                <div className="lg:w-[56.25rem] lg:h-[31.25rem] relative">
                  {imageUrl ? (
                    <Image
                      src={`${API_URL}/${recipe.item.image}`}
                      alt={recipe.item.title}
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
              <Profile
                username={recipe.item.user.name}
                imageUrl={`${recipe.item.user.image}`}
              />

              <main>
                <h1 className="text-5xl font-bold mt-6">{recipe.item.title}</h1>

                {/* 태그 + 수정/삭제 버튼 */}
                <div className="flex justify-between items-center mt-5">
                  <div className="flex gap-2 flex-wrap">
                    {tagList.map((item, idx) => (
                      <FoodBtn key={idx} label={item} selected={true} />
                    ))}
                  </div>

                  {/* 작성자만 수정/삭제 가능 */}
                  <RecipeActionButtons
                    authorId={String(recipe.item.user._id)}
                    postId={String(recipe.item._id)}
                  />
                </div>

                {/* 본문 내용 */}
                <div
                  className="bg-[#f4f4f4] px-9 py-6 rounded-lg mt-5"
                  dangerouslySetInnerHTML={{
                    __html: recipe.item.content || '내용 없음',
                  }}
                />

                {/* 공유/북마크 */}
                <div className="flex justify-end mt-3">
                  <ShareButton />
                  <div className="text-center ml-[0.4375rem] flex items-center">
                    <BookmarkButton postId={recipe.item._id} />
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
                <Comments postId={_id} />
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
}
