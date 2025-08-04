import './main.css';
import MainSlide from '@/app/MainSlide';
import ValueSlide from '@/app/ValueSlide';
import MainProductLists from '@/app/MainProductLists';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `홈 - UgVeg: 흙내음 상점`,
    description: `못난이 농산물을 구출하고, 더 착한 소비를 실천하세요. 신선한 농산물을 합리적인 가격에 만나보는 지속 가능한 푸드 플랫폼, UGVEG.`,
    openGraph: {
      title: `홈 - UgVeg: 흙내음 상점`,
      description: `못난이 농산물을 구출하고, 더 착한 소비를 실천하세요. 신선한 농산물을 합리적인 가격에 만나보는 지속 가능한 푸드 플랫폼, UGVEG.`,
      url: `/`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default function Home() {
  return (
    <main>
      <div>
        {/* ST: 메인 슬라이드 */}
        <div className="max-w-full mx-auto">
          <MainSlide />
        </div>
        {/* ED: 메인 슬라이드 */}

        {/* ST: 우리가 함께 만든 변화 */}
        <div className="mx-auto py-12.5 bg-light-yellow lg:max-w-5xl lg:py-15">
          <h2 className="text-center font-semibold text-3xl md:text-4xl lg:text-5xl">
            우리가 함께 만든 변화
          </h2>
          <p className="text-center text-xs md:text-sm mt-2 lg:text-base">
            {' '}
            우리는 가치 있는 소비를 함께합니다.
          </p>
          <ValueSlide />
        </div>
        {/* ED: 우리가 함께 만든 변화 */}

        {/* ST: 상품 리스트 */}
        <MainProductLists />
        {/* ED: 상품 리스트 */}
      </div>
    </main>
  );
}
