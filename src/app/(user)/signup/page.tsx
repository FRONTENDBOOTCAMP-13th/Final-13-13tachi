import SignupForm from '@/app/(user)/signup/SignupForm';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `회원가입 - UgVeg : 흙내음 상점`,
    description: `무료 회원 가입후 흙내음 가득한 여정에 첫 발을 내딛어 보세요`,
    openGraph: {
      title: `회원가입 - UgVeg : 흙내음 상점`,
      description: `무료 회원 가입후 흙내음 가득한 여정에 첫 발을 내딛어 보세요`,
      url: `/signup`,
      images: {
        url: '/thumbnail.svg',
      },
    },
  };
}

export default async function SignupPage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-6">
        <h2 className="lg:text-5xl font-bold text-black lg:mt-[4.375rem] lg:mb-2">
          회원 가입
        </h2>
        <div className="lg:w-[64rem] flex flex-col items-end">
          <div className="flex lg:mt-[0.75rem]">
            <p className="text-light-red text-sm">*</p>
            <p className="lg:text-sm text-gray">는 필수 입력</p>
          </div>
          <hr className="lg:w-[64rem] h-px lg:md-[1.875rem] bg-light-gray border-0" />
        </div>
      </div>
      <SignupForm />
    </main>
  );
}
