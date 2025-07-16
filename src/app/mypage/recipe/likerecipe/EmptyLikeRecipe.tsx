import Image from 'next/image';

// 임시 이미지 불러오기
import emptyPic from '../../../../images/bookmark.png';
import Button from '@/components/common/Button';

export default function EmptyLikeRecipe() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={emptyPic}
        width={60}
        height={60}
        alt="장바구니 이미지"
        className="mb-3.5"
      />
      <p className="mb-10">
        <p className="text-xl font-semibold text-center mb-3">
          내 레시피가 없어요
        </p>
        <p className="text-sm">나만의 새로운 레시피를 등록해 보세요</p>
      </p>
      <Button size="xxl" variant="green">
        레시피 작성하기
      </Button>
    </div>
  );
}
