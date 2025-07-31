import Image from 'next/image';
import vegboxImg from '../../images/vegbox.png';
import CustomLink from '@/components/common/CustomLink';

export default function NotFound() {
  return (
    <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <div className="flex flex-col w-full justify-center items-center gap-1 mt-4 mb-20">
        <Image
          src={vegboxImg}
          width={250}
          height={275}
          alt="채소 상자 이미지"
        />
        <span className="font-extrabold text-[5rem] text-dark-green">404</span>
        <span className="font-semibold text-lg mb-4">
          페이지를 찾을 수 없습니다.
        </span>
        <span className="font-light">
          방문하시려는 페이지의 주소가 잘못 입력되었거나,
        </span>
        <span className="font-light">
          페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </span>
        <span className="font-light mb-10">
          입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </span>
        <CustomLink href="/" size="xxl" variant="green">
          홈으로 돌아가기
        </CustomLink>
      </div>
    </main>
  );
}
