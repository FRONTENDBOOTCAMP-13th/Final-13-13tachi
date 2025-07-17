import OrderList from '@/app/order/OrderList';
import Input from '@/components/common/Input';
import Image from 'next/image';
import Link from 'next/link';

// 임시 이미지 불러오기
import kakaopay from '../../images/kakaopay.png';
import naverpay from '../../images/naverpay.png';
import tosspay from '../../images/tosspay.png';
import Button from '@/components/common/Button';

export default function Order() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="lg:w-[64rem] flex flex-col mb-[1.875rem]">
        <h2 className="text-sm text-gray mt-[4.0625rem] mb-[1.25rem]">
          <Link href="/">HOME</Link>
          <span>{' > '}</span>
          <Link href="/recipe/list">레시피</Link>
        </h2>

        <h3 className="lg:w-full lg:text-5xl font-semibold mb-[2.1875rem]">
          주문하기
        </h3>

        <hr className="text-light-gray w-full mb-7" />
        <div className="flex flex-col gap-5 mb-7">
          <OrderList />
          <OrderList />
          <OrderList />
        </div>
        <table className="w-full text-center border-collapse table-fixed mb-10">
          <thead>
            <tr>
              <th className="border border-l-0 py-3 bg-disable-gray">
                주문 금액
              </th>
              <th className="border py-3 bg-disable-gray">적립금 사용</th>
              <th className="border py-3 bg-disable-gray">배송비</th>
              <th className="border border-r-0 py-3 bg-disable-gray">
                결제 예상 금액
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-l-0 relative py-4">
                <span>10000</span>
                {/* <PlusCircle className="text-black fill-gray-100 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" /> */}
              </td>
              <td className="border relative py-4">
                <span>10000</span>
                {/* <MinusCircle className="text-black fill-gray-100 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" /> */}
              </td>
              <td className="border relative py-4">
                <span>10000</span>
                {/* <CircleEqualIcon className="text-black fill-gray-100 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" /> */}
              </td>
              <td className="border border-r-0 relative py-4">
                <span>10000</span>
              </td>
            </tr>
          </tbody>
        </table>
        <form>
          <div className="flex flex-col lg:flex-row justify-between gap-[2rem]">
            <div className="flex flex-col gap-[0.625rem] w-[31.25rem]">
              {/* 주문자 정보 */}
              <h3 className="lg:text-xl font-bold mb-[0.75rem]">주문자 정보</h3>
              <hr className="text-light-gray w-full mb-[1.5rem]" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <label
                    className="block text-black lg:text-base"
                    htmlFor="name1"
                  >
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
                  <label
                    className="block text-black lg:text-base"
                    htmlFor="phone"
                  >
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
                  <label
                    className="block text-black lg:text-base"
                    htmlFor="address"
                  >
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
                <label
                  className="block text-black lg:text-base"
                  htmlFor="message"
                >
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

            {/* 결제방법 */}
            <div className="flex flex-col gap-[0.625rem] w-[31.25rem]">
              <h3 className="lg:text-xl font-bold mb-[0.75rem]">결제 수단</h3>
              <hr className="text-light-gray w-full mb-[1.5rem]" />
              <div>
                <fieldset>
                  <div className="mb-4">
                    <label className="mr-[2.125rem]">
                      <input
                        type="radio"
                        name="contact"
                        id="bank"
                        value="bank"
                        className="mr-2"
                      />
                      <span>내 통장 결제</span>
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="contact"
                        id="account"
                        value="account"
                        className="mr-2"
                      />
                      <span>계좌 이체</span>
                    </label>
                  </div>
                  <div className="mb-4">
                    <label>
                      <input
                        type="radio"
                        name="contact"
                        id="card"
                        value="card"
                        className="mr-2"
                      />
                      <span>신용/체크카드</span>
                    </label>
                  </div>
                  <div className="flex flex-row mb-4">
                    <label className="flex flex-row items-center mr-[2.125rem]">
                      <input
                        type="radio"
                        name="contact"
                        id="kakaopay"
                        value="kakaopay"
                        className="mr-2"
                      />
                      <Image
                        src={kakaopay}
                        alt="카카오페이"
                        width={74}
                        height={29}
                        className="mr-2"
                      />
                      <span>카카오페이</span>
                    </label>
                    <label className="flex flex-row items-center mr-[2.125rem]">
                      <input
                        type="radio"
                        name="contact"
                        id="naverpay"
                        value="naverpay"
                        className="mr-2"
                      />
                      <Image
                        src={naverpay}
                        alt="카카오페이"
                        width={74}
                        height={27}
                        className="mr-2"
                      />
                      <span>네이버페이</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex flex-row items-center mr-[2.125rem]">
                      <input
                        type="radio"
                        name="contact"
                        id="tosspay"
                        value="tosspay"
                        className="mr-2"
                      />
                      <Image
                        src={tosspay}
                        alt="토스페이"
                        width={29}
                        height={29}
                        className="mr-2"
                      />
                      <span>토스페이</span>
                    </label>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-20">
            <Button size="xxl" variant="green">
              결제하기
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
