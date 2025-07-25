import Input from '@/components/common/Input';

export default function OrderForm() {
  return (
    <form>
      <div className="flex flex-col gap-[0.625rem] w-[31.25rem]">
        {/* 주문자 정보 */}
        <h3 className="lg:text-xl font-bold mb-[0.75rem]">주문자 정보</h3>
        <hr className="text-light-gray w-full mb-[1.5rem]" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <label className="block text-black lg:text-base" htmlFor="name1">
              주문자 이름
            </label>
            <span className="text-light-red lg:text-sm ml-1">*</span>
          </div>
          <Input
            width="md"
            type="text"
            id="name1"
            autoComplete="name"
            placeholder="이름을 입력하세요"
            name="name1"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <label className="block text-black lg:text-base" htmlFor="phone">
              주문자 연락처
            </label>
            <span className="text-light-red lg:text-sm ml-1">*</span>
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

        <div className="flex lg:gap-[1.25rem] w-full items-start">
          <div className="flex items-center pt-[0.375rem] min-w-[9.35rem]">
            <label className="block text-black lg:text-base" htmlFor="address">
              배송지 정보
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

        <div className="flex items-center justify-between">
          <label className="block text-black lg:text-base" htmlFor="message">
            배송 메세지
          </label>
          <Input
            width="md"
            type="text"
            id="message"
            placeholder="배송 전 연락주세요"
            name="message"
          />
        </div>
      </div>
    </form>
  );
}
