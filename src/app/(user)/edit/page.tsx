import EditForm from '@/app/(user)/edit/EditForm';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `회원수정 - UgVeg: 흙내음 상점`,
    description: `회원 정보를 수정할 수 있습니다.`,
    openGraph: {
      title: `회원수정  - UgVeg: 흙내음 상점`,
      description: `회원 정보를 변경하고 관리할 수 있습니다.`,
      url: `/edit`,
      images: {
        url: '/UgVeg.png',
      },
    },
  };
}

export default async function EditPage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] lg:min-h-[calc(100dvh-21.625rem)]">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mt-[40px] mb-[25px] md:mt-[50px] md:mb-[30px] lg:mt-[4.375rem] lg:mb-2">
          회원정보
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
      <EditForm />
    </main>
  );
}
