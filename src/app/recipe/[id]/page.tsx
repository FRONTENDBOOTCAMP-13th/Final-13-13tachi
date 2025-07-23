import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Comment from './Comment';
import { Bookmark, Share2 } from 'lucide-react';

interface RecipeDetailData {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  img?: string;
  ingredients?: string;
  createdAt?: string;
}

async function fetchRecipeDetail(id: string): Promise<RecipeDetailData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      headers: {
        'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '',
      },
      cache: 'no-store', // 항상 최신 데이터 불러오기
    });
    if (!res.ok) throw new Error('Failed to fetch recipe detail');
    const data = await res.json();
    // API 응답 구조에 맞게 조정 필요
    return data.item || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function RecipeDetailPage(props: {
  params: { id: string };
}) {
  const { id } = await props.params;
  const recipe = await fetchRecipeDetail(id);

  if (!recipe) {
    return <div className="text-center mt-10">레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Header />
      <div className="lg:max-w-[56.25rem] mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray">
          <Link href="/">HOME</Link> &gt; <Link href="/recipe">레시피</Link>{' '}
          &gt; {recipe.title}
        </h2>

        <div className="px-15">
          <div className="flex justify-center mt-[4.0625rem]">
            <div className="lg:w-[56.25rem] lg:h-[31.25rem] relative">
              {recipe.img ? (
                <Image
                  src={recipe.img}
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

          <div className="flex flex-col items-center justify-center mt-[-4rem]">
            <div className="lg:w-[7.5rem] lg:h-[7.5rem] overflow-hidden rounded-full ring-4 ring-white">
              {/* 작성자 프로필 이미지가 있으면 보여주고 없으면 기본 이미지 */}
              <Image
                src="/imgs/recipe/recipe7.png"
                alt={recipe.author || '작성자'}
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-[0.625rem] text-xl font-semibold">
              {recipe.author || '익명'}
            </span>
          </div>

          <main>
            <h1 className="text-5xl font-bold">{recipe.title}</h1>

            <div className="flex justify-between items-center mt-5">
              <FoodBtn label={recipe.ingredients || 'null'} selected={true} />
              <div className="flex">
                <div className="mr-[0.625rem]">
                  <Button size="sm">수정</Button>
                </div>
                <Button size="sm" variant="white">
                  삭제
                </Button>
              </div>
            </div>

            <div
              className="bg-[#f4f4f4] px-9 py-6 rounded-lg mt-5"
              dangerouslySetInnerHTML={{ __html: recipe.content || 'null' }}
            />

            <div className="flex justify-end mt-3">
              <Share2 strokeWidth={1} fill="true" />
              <div className="text-center ml-[0.4375rem]">
                <Bookmark strokeWidth={1} />
                <p>13</p>
              </div>
            </div>

            <div className="flex justify-center mt-[1.875rem]">
              <Button size="xxl">
                <Link href="/recipe">목록으로</Link>
              </Button>
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-15">연관상품</h2>
              <div className="mt-[1.875rem]">
                <p>연관상품 컴포 올 자리</p>
              </div>
            </div>

            <div className="p-15">
              <div className="flex items-center border-b-2 border-[#DEDEDE]">
                <h3 className="text-xl font-semibold mb-[0.625rem]">댓글</h3>
                <span className="text-xl font-semibold text-[#67913C] ml-2 mb-[0.625rem]">
                  3
                </span>
              </div>
              <Comment />
              <form action="#">
                <div className="flex items-center mt-9">
                  <input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    className="w-[48.75rem] h-[2.5rem] border-1 border-light-gray rounded-lg mr-5 px-5  text-sm"
                  />
                  <Button size="md">등록</Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
