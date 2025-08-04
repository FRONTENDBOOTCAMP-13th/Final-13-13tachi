import SignupForm from '@/app/(user)/signup/SignupForm';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `회원가입 - UgVeg: 흙내음 상점`,
    description: ` 회원가입 후 흙내음 상점의 모든 서비스를 이용하세요.`,
    openGraph: {
      title: `회원가입  - UgVeg: 흙내음 상점`,
      description: `회원가입 후 흙내음 상점의 모든 서비스를 이용하세요.`,
      url: `/signup`,
      images: {
        url: '/UgVeg.png',
      },
    },
  };
}

export default async function SignupPage() {
  return (
    <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mt-[40px] mb-[25px] md:mt-[50px] md:mb-[30px] lg:mt-[4.375rem] lg:mb-2">
            회원 가입
          </h2>
          <div className="w-[320px] md:w-[600px] lg:w-[64rem] flex flex-col items-end">
            <div className="flex lg:mt-[0.75rem]">
              <p className="text-light-red text-sm">*</p>
              <p className="text-2xs md:text-xs lg:text-sm text-gray">
                는 필수 입력
              </p>
            </div>
            <hr className="w-[320px] md:w-[600px] lg:w-[64rem] h-px mb-[20px] md:md-[1.875rem] lg:md-[1.875rem] bg-light-gray border-0" />
          </div>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
