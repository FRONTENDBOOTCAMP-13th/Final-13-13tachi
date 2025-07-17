import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipeDetailPage() {
  return (
    <>
      <Header />
      <div className="lg:max-w-[56.25rem] mx-auto pt-[4.0625rem] pb-[6.25rem]">
        <h2 className="text-gray">
          <Link href="/">HOME</Link>
          <span>{' > '}</span>
          <Link href="/recipe/detail">레시피 상세</Link>
        </h2>

        {/* 레시피 이미지 */}
        <div className="flex justify-center mt-[4.0625rem]">
          <div className="lg:w-[56.25rem] lg:h-[31.25rem]">
            <Image
              src="/imgs/recipe/recipe1.png"
              alt="레시피 이미지"
              width={900}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-[-4rem]">
          <div className="lg:w-[7.5rem] lg:h-[7.5rem] overflow-hidden rounded-full ring-4 ring-white">
            <Image
              src="/imgs/recipe/recipe7.png"
              alt="프로필 이미지"
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-[0.625rem] text-xl font-semibold">UserName</span>
        </div>
        <main>
          <h1 className="text-5xl font-bold">가지무침 레시피</h1>
          <div className="flex justify-between items-center">
            <FoodBtn label={'가지'} selected={true} />
            <div className="flex">
              <div className="mr-[0.625rem]">
                <Button size="sm">수정</Button>
              </div>
              <Button size="sm" variant="white">
                삭제
              </Button>
            </div>
          </div>
          <div className="bg-[#f4f4f4] px-9 py-6 rounded-lg mt-5">
            <p>레시피 HTML 파싱하기</p>
          </div>
          <div>
            
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
