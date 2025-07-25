import Button from '@/components/common/Button';
import Image from 'next/image';

export default function Complete() {
  //주문번호 예시 값
  const orderNumber = '20230725-0001';

  return (
    <div className="flex flex-col items-center gap-[1.5625rem] mt-[10.9375rem] mb-[13.6875rem]">
      <Image
        src="/check-circle.svg"
        alt="원형체크"
        width={68}
        height={69}
      ></Image>
      <h2 className="text-2xl font-bold ">결제가 완료되었습니다!</h2>
      <p className="text-lg font-bold text-light-green ">
        주문이 성공적으로 처리되었습니다. 약 2일 안에 배송이 시작될 것입니다.
      </p>
      <p className="text-sm font-bold text-light-green ">
        주문번호: {orderNumber}
      </p>
      <Button size="xxl">홈으로 돌아가기</Button>
    </div>
  );
}
