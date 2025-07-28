import SignupForm from '@/app/(user)/signup/SignupForm';

export default async function SignupPage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center">
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
    </main>
  );
}
