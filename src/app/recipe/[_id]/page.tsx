import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';
import Comments from './Comments';
import Profile from './Profile';
import RecipeActionButtons from './RecipeActionButton';
import ShareButton from '@/components/common/ShareButton';
import BookmarkButton from './BookmarkButton';
import RelationProducts from './RelationProducts';
import { getRecipeDetail, getRelatedProducts } from '@/data/functions/recipe';
import { getProducts } from '@/data/functions/product';
import { Metadata } from 'next';

interface InfoPageProps {
  params: Promise<{ _id: number }>;
}

export async function generateMetadata({
  params,
}: InfoPageProps): Promise<Metadata> {
  const { _id } = await params;
  const recipe = await getRecipeDetail(Number(_id));

  if (!recipe || recipe.ok === 0) {
    return {
      title: '레시피 상세 - 레시피를 찾을 수 없습니다',
      description: '요청한 레시피 정보를 불러올 수 없습니다.',
    };
  }

  const title = recipe.item.title;

  return {
    title: `${title} - UgVeg 레시피`,
    description: `지금 "${title}" 레시피를 확인해보세요.`,
    openGraph: {
      title: `${title} - UgVeg 레시피`,
      description: `지금 "${title}" 레시피를 확인해보세요.`,
      url: `/recipe/${_id}`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default async function RecipeDetailPage({ params }: InfoPageProps) {
  const { _id } = await params;
  const recipe = await getRecipeDetail(Number(_id));
  const productsRes = await getProducts();

  if (!recipe || recipe.ok === 0) {
    return (
      <div className="text-center mt-10 lg:text-base md:text-sm text-xs">
        레시피를 찾을 수 없습니다.
      </div>
    );
  }

  const imageUrl = recipe.item.image;
  const allProducts =
    productsRes.ok === 1 && productsRes.item ? productsRes.item : [];

  // 태그 파싱
  const tagList: string[] = (() => {
    try {
      const parsed = JSON.parse(recipe.item.tag ?? '[]');
      return Array.isArray(parsed) ? parsed : recipe.item.tag?.split(',') || [];
    } catch {
      return recipe.item.tag?.split(',') || [];
    }
  })();

  const relatedProducts = getRelatedProducts(allProducts, tagList);

  return (
    <>
      <div className="lg:max-w-5xl mx-auto lg:pt-[4rem] lg:pb-[6rem] md:pt-12 md:pb-20 pt-8 pb-15 min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
        <h2 className="text-gray lg:text-base md:text-sm text-xs lg:px-0 md:px-7.5 px-4">
          <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
          <Link href="/recipe">레시피</Link>
          &nbsp;&gt;&nbsp;{recipe.item.title}
        </h2>
        <div className="lg:px-15 md:px-7.5 px-4">
          {/* 대표 이미지 */}
          <div className="flex justify-center lg:mt-[4.0625rem] md:mt-12 mt-8 relative">
            <div className="lg:w-[56.25rem] lg:h-[31.25rem] md:h-[30rem] w-full h-[20rem] relative">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={recipe.item.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 56.25rem"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg text-gray-400 lg:text-base md:text-sm text-xs">
                  이미지 없음
                </div>
              )}
            </div>
          </div>

          {/* 작성자 프로필 */}
          <Profile
            username={recipe.item.user.name}
            imageUrl={recipe.item.user.image}
          />

          <main>
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold lg:mt-6 md:mt-5 mt-4">
              {recipe.item.title}
            </h1>

            {/* 태그 + 수정/삭제 */}
            <div className="flex justify-between items-start lg:mt-5 md:mt-4 mt-3 gap-4">
              <div className="flex gap-2 flex-wrap flex-1">
                {tagList.map((tag, idx) => (
                  <FoodBtn key={idx} label={tag} selected />
                ))}
              </div>

              <div className="flex-shrink-0">
                <RecipeActionButtons
                  authorId={String(recipe.item.user._id)}
                  postId={String(recipe.item._id)}
                />
              </div>
            </div>

            {/* 본문 */}
            <div
              className="bg-[#f4f4f4] lg:px-9 lg:py-6 md:px-6 md:py-4 px-4 py-3 rounded-lg lg:mt-5 md:mt-4 mt-3 lg:text-base md:text-sm text-xs"
              dangerouslySetInnerHTML={{
                __html: recipe.item.content || '내용 없음',
              }}
            />

            {/* 공유 + 북마크 */}
            <div className="flex justify-end lg:mt-3 md:mt-2 mt-2">
              <ShareButton />
              <div className="text-center ml-[0.4375rem] flex items-center">
                <BookmarkButton postId={recipe.item._id} />
              </div>
            </div>

            {/* 목록으로 */}
            <div className="flex justify-center lg:mt-[1.875rem] md:mt-6 mt-4">
              <Button size="xxl">
                <Link href="/recipe">목록으로</Link>
              </Button>
            </div>

            {/* 연관상품 */}
            <RelationProducts relatedProducts={relatedProducts} />

            {/* 댓글 */}
            <Comments postId={_id} />
          </main>
        </div>
      </div>
    </>
  );
}
