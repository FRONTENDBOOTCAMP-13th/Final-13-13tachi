import Image from 'next/image';

// 임시 이미지 불러오기
import emptyPic from '../../../images/emptycart.png';
import CustomLink from '@/components/common/CustomLink';

export default function EmptyCart() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={emptyPic}
        width={90}
        height={65}
        alt="장바구니 이미지"
        className="mb-3.5"
      />
      <span className="mb-10">
        <p className="text-xl font-semibold text-center mb-3">
          장바구니가 비어있어요
        </p>
        <p className="text-sm">장바구니를 새로운 상품으로 채워보세요</p>
      </span>
      <CustomLink href="/shopping">상품 담으러 가기</CustomLink>
    </div>
  );
}
