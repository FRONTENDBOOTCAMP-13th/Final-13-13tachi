import Image from 'next/image';
import CustomLink from '@/components/common/CustomLink';

export default function EmptyOrder() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={'/emptybuylist.png'}
        width={60}
        height={60}
        alt="영수증 이미지"
        className="mb-3.5"
      />
      <span className="mb-10">
        <p className="text-xl font-semibold text-center mb-3">
          주문 내역이 없어요
        </p>
        <p className="text-sm">UgVeg의 상품을 구매해 보세요</p>
      </span>
      <CustomLink href="/shopping">상품 보러 가기</CustomLink>
    </div>
  );
}
