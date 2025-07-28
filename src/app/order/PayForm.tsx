'use client';

import Image from 'next/image';
// 임시 이미지 불러오기
import kakaopay from '../../images/kakaopay.png';
import naverpay from '../../images/naverpay.png';
import tosspay from '../../images/tosspay.png';
import { useState } from 'react';

export default function PayForm() {
  const [payment, setPayment] = useState('내 통장 결제');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPayment(value);
  };
  return (
    <>
      <input type="hidden" name="payment" value={payment} />
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
                  id="내 통장 결제"
                  value="내 통장 결제"
                  className="mr-2"
                  checked={payment === '내 통장 결제'}
                  onChange={handleChange}
                />
                <span>내 통장 결제</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="contact"
                  id="계좌 이체"
                  value="계좌 이체"
                  className="mr-2"
                  checked={payment === '계좌 이체'}
                  onChange={handleChange}
                />
                <span>계좌 이체</span>
              </label>
            </div>
            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  name="contact"
                  id="신용/체크카드"
                  value="신용/체크카드"
                  className="mr-2"
                  checked={payment === '신용/체크카드'}
                  onChange={handleChange}
                />
                <span>신용/체크카드</span>
              </label>
            </div>
            <div className="flex flex-row mb-4">
              <label className="flex flex-row items-center mr-[2.125rem]">
                <input
                  type="radio"
                  name="contact"
                  id="카카오페이"
                  value="카카오페이"
                  className="mr-2"
                  checked={payment === '카카오페이'}
                  onChange={handleChange}
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
                  id="네이버페이"
                  value="네이버페이"
                  className="mr-2"
                  checked={payment === '네이버페이'}
                  onChange={handleChange}
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
                  id="토스페이"
                  value="토스페이"
                  className="mr-2"
                  checked={payment === '토스페이'}
                  onChange={handleChange}
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
    </>
  );
}
