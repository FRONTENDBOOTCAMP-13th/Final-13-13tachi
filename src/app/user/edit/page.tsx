import EditForm from '@/app/user/edit/EditForm';

export default async function EditPage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-6">
        <h2 className="lg:text-5xl font-bold text-black lg:mt-[4.375rem] lg:mb-2">
          회원정보
        </h2>
        <div className="lg:w-[64rem] flex flex-col items-end">
          <div className="flex lg:mt-[0.75rem]">
            <p className="text-light-red text-sm">*</p>
            <p className="lg:text-sm text-gray">는 필수 입력</p>
          </div>
          <hr className="lg:w-[64rem] h-px lg:md-[1.875rem] bg-light-gray border-0" />
        </div>
      </div>
      <EditForm />
    </main>
  );
}
