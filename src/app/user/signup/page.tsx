import Button from '@/components/common/Button';

export default async function SignupPage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-5xl font-bold text-black mb-2">회원 가입</h2>
        <div className="w-[1024px] flex flex-col items-end">
          <div className="flex mt-[12px]">
            <p className="text-dark-red text-sm">*</p>
            <p className=" text-sm text-gray">는 필수 입력</p>
          </div>
          <hr className="w-[1024px] h-px md-[30px] bg-light-gray border-0" />
        </div>
      </div>

      <form action="/" className="w-[458px]">
        <div className="flex items-center justify-between mb-[10px]">
          <div className="flex items-center">
            <label className="block text-black text-base" htmlFor="email">
              이메일
            </label>
            <span className="text-dark-red text-sm ml-1">*</span>
          </div>
          <input
            type="email"
            id="email"
            autoComplete="username"
            placeholder="이메일을 입력하세요"
            className="w-[330px] px-3 py-2 text-base border rounded-lg focus:outline-none"
            name="email"
          />
        </div>
        <div className="flex items-center justify-between mb-[10px]">
          <div className="flex items-center">
            <label className="block text-black text-base" htmlFor="password">
              비밀번호
            </label>
            <span className="text-dark-red text-sm ml-1">*</span>
          </div>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력하세요"
            className="w-[330px] px-3 py-2 text-base border rounded-lg focus:outline-none"
            name="password"
          />
        </div>
        <div className="flex items-center justify-between mb-[10px]">
          <div className="flex items-center">
            <label className="block text-black text-base" htmlFor="password">
              비밀번호 확인
            </label>
            <span className="text-dark-red text-sm ml-1">*</span>
          </div>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력하세요"
            className="w-[330px] px-3 py-2 text-base border rounded-lg focus:outline-none"
            name="password"
          />
        </div>
        <div className="flex items-center justify-between mb-[10px]">
          <div className="flex items-center">
            <label className="block text-black text-base" htmlFor="name">
              이름
            </label>
            <span className="text-dark-red text-sm ml-1">*</span>
          </div>
          <input
            type="text"
            id="name"
            autoComplete="name"
            placeholder="이름을 입력하세요"
            className="w-[330px] px-3 py-2 text-base border rounded-lg focus:outline-none "
            name="name"
          />
        </div>
        <div className="flex items-center justify-between mb-[10px]">
          <div className="flex items-center">
            <label className="block text-black text-base" htmlFor="phone">
              전화번호
            </label>
            <span className="text-dark-red text-sm ml-1">*</span>
          </div>
          <input
            type="text"
            id="name"
            autoComplete="name"
            placeholder="이름을 입력하세요"
            className="w-[330px] px-3 py-2 text-base border rounded-lg focus:outline-none "
            name="name"
          />
        </div>
        <div className="flex items-center justify-between mb-[60px]">
          <div className="flex items-center">
            <label className="block text-black text-base" htmlFor="address">
              주소
            </label>
            <span className="text-dark-red text-sm ml-1">*</span>
          </div>
          <input
            type="text"
            id="name"
            autoComplete="name"
            placeholder="이름을 입력하세요"
            className="w-[330px] px-3 py-2 text-base border rounded-lg focus:outline-none "
            name="name"
          />
        </div>

        <div className="flex justify-center items-center">
          <Button size="xxl">가입하기</Button>
        </div>
      </form>
    </main>
  );
}
