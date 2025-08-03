import Image from 'next/image';
import emptyPic from '../../../images/emptylike.png';
import CustomLink from '@/components/common/CustomLink';

export default function EmptyWish() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={emptyPic}
        width={60}
        height={60}
        alt="하트 이미지"
        className="mb-3.5 md:mt-0 mt-6"
      />
      <span className="md:mb-10 mb-6">
        <p className="text-xl font-semibold text-center mb-3">
          찜한 상품이 없어요.
        </p>
        <p className="text-sm">새로운 상품으로 채워보세요.</p>
      </span>
      <CustomLink href="/shopping">상품 보러 가기</CustomLink>
    </div>
  );
}
