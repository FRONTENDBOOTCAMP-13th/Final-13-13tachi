import Button from '@/components/common/Button';
import Image from 'next/image';

export default function Comment() {
  return (
    <>
      <div className="flex items-center py-5 border-b-2 border-[#DEDEDE]">
        <div className="relative lg:w-[3.125rem] lg:h-[3.125rem]">
          <Image
            src="/imgs/recipe/recipe7.png"
            alt="프로필 이미지"
            fill
            className="w-full h-full object-cover  rounded-full"
          />
        </div>
        <div className="ml-[1.875rem]">
          <p className="font-semibold text-dark-green">홍길동</p>
          <p className="text-sm">와. 정말. 맛있겠다.</p>
        </div>
        <div className="ml-auto">
          <Button size="xs">수정</Button>
          <Button size="xs" variant="white" style={{ marginLeft: '8px' }}>
            삭제
          </Button>
        </div>
      </div>
    </>
  );
}
