// 주문 내역 목록
// import BuyList from '@/app/mypage/buylist/BuyList';

import BuyInfoItem from '@/app/mypage/buyinfo/BuyinfoItem';
import Button from '@/components/common/Button';

export default async function buyInfo() {
  return (
    <main className="flex flex-col h-full">
      <div className="lg:w-[49.875rem] flex flex-col lg:gap-2 mb-[1.875rem]">
        <h3 className="lg:w-full lg:text-xl font-semibold">주문내역</h3>
        <hr className="text-light-gray w-full" />
      </div>
      <div className="flex flex-row justify-between text-sm mb-2.5">
        <p>
          <span className="mr-4 text-dark-green">2025.07.10</span>
          <span className="text-gray">주문번호:20230725-0001</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center border-1 rounded-lg border-light-gray lg:w-[49.875rem] p-[1.125rem]">
        <div className="flex flex-col w-full gap-[2.125rem]">
          <BuyInfoItem />
          <BuyInfoItem />
          <BuyInfoItem />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[1.875rem] mt-9 h-full">
        <div>
          <p className="text-xl font-semibold text-dark-green mb-6">배송지</p>
          <div className="flex flex-col border-1 rounded-lg border-light-gray p-5 gap-1.5">
            <p>성이름</p>
            <p>010-1234-5678</p>
            <p>
              서울 종로구 종로23길 17, 광화문 D타워 <span>(55050)</span>
            </p>
          </div>
        </div>
        <div className="h-full">
          <p className="text-xl font-semibold text-dark-green mb-6">
            결제 정보
          </p>
          <div className="flex flex-col border-1 rounded-lg border-light-gray px-5 py-8 gap-2">
            <p className="flex flex-row justify-between">
              <span>결제 금액</span>
              <span>35000원</span>
            </p>
            <p className="flex flex-row justify-between">
              <span>결제 수단</span>
              <span>신용카드</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-9 mt-[4.0625rem]">
        <Button size="xxl" variant="white">
          주문 취소하기
        </Button>
        <Button size="xxl" variant="green">
          주문 내역으로 돌아가기
        </Button>
      </div>
    </main>
  );
}
