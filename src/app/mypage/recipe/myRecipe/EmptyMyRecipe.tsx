import Image from 'next/image';
import emptyPic from '../../../../images/recipe.png';
import CustomLink from '@/components/common/CustomLink';

export default function EmptyMyRecipe() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={emptyPic}
        width={60}
        height={60}
        alt="장바구니 이미지"
        className="mb-3.5"
      />
      <span className="mb-10">
        <p className="text-xl font-semibold text-center mb-3">
          내 레시피가 없어요
        </p>
        <p className="text-sm">나만의 새로운 레시피를 등록해 보세요</p>
      </span>
      <CustomLink href="/recipe/write">레시피 작성하기</CustomLink>
    </div>
  );
}
