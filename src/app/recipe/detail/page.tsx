import Button from '@/components/common/Button';
import FoodBtn from '@/components/common/FoodBtn';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Image from 'next/image';
import Link from 'next/link';
import Comment from './Comment';

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

        <div className="px-15">
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
            <span className="mt-[0.625rem] text-xl font-semibold">
              UserName
            </span>
          </div>
          <main>
            <h1 className="text-5xl font-bold">가지무침 레시피</h1>
            <div className="flex justify-between items-center mt-5">
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
              <p>TextEditor에서 받아온 레시피 HTML 파싱하기</p>
            </div>
            {/* 공유 북마크 나중에 웹팩 아이콘으로 바꾸기 */}
            <div className="flex justify-end mt-3">
              <span>공유</span>
              <div className="text-center ml-[0.4375rem]">
                <p>북마크</p>
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
                <span className="text-xl font-semibold text-[#67913C] ml-2 mb-[0.625rem]">{`${'3'}`}</span>
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
