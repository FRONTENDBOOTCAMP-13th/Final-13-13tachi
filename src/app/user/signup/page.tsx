import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

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

      <form action="/" className="lg:w-[28.625rem]">
        <div className="flex items-center justify-between lg:mb-[0.625rem]">
          <div className="flex items-center">
            <label className="block text-black lg:text-base" htmlFor="email">
              이메일
            </label>
            <span className="text-light-red lg:text-sm lg:ml-1">*</span>
          </div>
          <Input
            width="md"
            type="email"
            id="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            name="email"
          />
        </div>
        <div className="flex items-center justify-between lg:mb-[0.625rem]">
          <div className="flex items-center">
            <label className="block text-black lg:text-base" htmlFor="password">
              비밀번호
            </label>
            <span className="text-light-red lg:text-sm lg:ml-1">*</span>
          </div>
          <Input
            width="md"
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력하세요"
            name="password"
          />
        </div>
        <div className="flex items-center justify-between lg:mb-[0.625rem]">
          <div className="flex items-center">
            <label className="block text-black lg:text-base" htmlFor="password">
              비밀번호 확인
            </label>
            <span className="text-light-red lg:text-sm lg:ml-1">*</span>
          </div>
          <Input
            width="md"
            type="password"
            id="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            name="password"
          />
        </div>
        <div className="flex items-center justify-between lg:mb-[0.625rem]">
          <div className="flex items-center">
            <label className="block text-black lg:text-base" htmlFor="name">
              이름
            </label>
            <span className="text-light-red lg:text-sm lg:ml-1">*</span>
          </div>
          <Input
            width="md"
            type="text"
            id="name"
            autoComplete="name"
            placeholder="이름을 입력하세요"
            name="name"
          />
        </div>
        <div className="flex items-center justify-between lg:mb-[0.625rem]">
          <div className="flex items-center">
            <label className="block text-black lg:text-base" htmlFor="phone">
              전화번호
            </label>
            <span className="text-light-red lg:text-sm lg:ml-1">*</span>
          </div>
          <Input
            width="md"
            type="text"
            id="phone"
            autoComplete="tel"
            placeholder="전화번호를 입력하세요"
            name="phone"
          />
        </div>
        <div className="flex items-start justify-between lg:mb-[4.0625rem]">
          <div className="flex items-center">
            <label className="block text-black lg:text-base" htmlFor="address">
              주소
            </label>
            <span className="text-light-red lg:text-sm lg:ml-1">*</span>
          </div>

          <div className="flex flex-col lg:gap-[0.625rem] lg:w-[20.625rem]">
            <div className="flex lg:gap-[0.625rem] items-center">
              <Input
                width="xs"
                type="text"
                id="postcode"
                placeholder="우편번호"
                name="postcode"
              />
              <button className="lg:w-[4rem] lg:h-[1.875rem] lg:border-[0.0938rem] border-light-gray lg:rounded-[0.3125rem] lg:text-xs text-light-gray lg:hover:border-[.125rem]">
                우편번호
              </button>
            </div>
            <Input
              width="md"
              type="text"
              id="address-detail1"
              placeholder="상세주소를 입력하세요"
              name="address-detail1"
            />
            <Input
              width="md"
              type="text"
              id="address-detail2"
              name="address-detail2"
            />
          </div>
        </div>

        <div className="flex justify-center items-center lg:mb-[6.25rem]">
          <Button size="xxl">가입하기</Button>
        </div>
      </form>
    </main>
  );
}
