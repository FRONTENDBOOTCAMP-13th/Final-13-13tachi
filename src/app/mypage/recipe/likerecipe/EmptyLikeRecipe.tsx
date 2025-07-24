import Image from 'next/image';

// 임시 이미지 불러오기
import emptyPic from '../../../../images/bookmark.png';
import CustomLink from '@/components/common/CustomLink';

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
          북마크 한 레시피가 없어요
        </p>
        <p className="text-sm">마음에 드는 레시피를 북마크 해 보세요</p>
      </p>
      <CustomLink href="/recipe">레시피 보러가기</CustomLink>
    </div>
  );
}
