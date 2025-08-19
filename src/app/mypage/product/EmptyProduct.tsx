import Image from 'next/image';
import CustomLink from '@/components/common/CustomLink';

export default function EmptyProduct() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={'/emptycart.png'}
        width={90}
        height={65}
        alt="장바구니 이미지"
        className="mb-3.5 md:mt-0 mt-6"
      />
      <span className="md:mb-10 mb-6">
        <p className="text-xl font-semibold text-center mb-3">
          장바구니가 비어있어요
        </p>
        <p className="text-sm">새로운 상품을 등록해보세요.</p>
      </span>
      <CustomLink href="/shopping">상품 등록하기</CustomLink>
    </div>
  );
}
