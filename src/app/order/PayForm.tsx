'use client';

import Image from 'next/image';
// 임시 이미지 불러오기
import kakaopay from '../../images/kakaopay.png';
import naverpay from '../../images/naverpay.png';
import tosspay from '../../images/tosspay.png';
import { useState } from 'react';

export default function PayForm() {
  const [payment, setPayment] = useState('무통장 입금');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPayment(value);
  };
  return (
    <>
      <input type="hidden" name="payment" value={payment} />
      <div className="flex flex-col gap-[0.625rem] lg:w-[31.25rem]">
        <h3 className="md:text-xl text-base font-bold mb-[0.75rem]">
          결제 수단
        </h3>
        <hr className="text-light-gray w-full md:mb-[1.5rem] mb-3" />
        <div className="flex md:justify-center justify-start lg:justify-start">
          <fieldset>
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex md:flex-row flex-col md:gap-8 gap-3">
                <label>
                  <input
                    type="radio"
                    name="contact"
                    id="무통장 입금"
                    value="무통장 입금"
                    className="mr-2"
                    checked={payment === '무통장 입금'}
                    onChange={handleChange}
                  />
                  <span>무통장 입금</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="contact"
                    id="실시간 계좌이체"
                    value="실시간 계좌이체"
                    className="mr-2"
                    checked={payment === '실시간 계좌이체'}
                    onChange={handleChange}
                  />
                  <span>실시간 계좌이체</span>
                </label>
              </div>

              <div className="flex md:flex-row flex-col gap-3">
                <label>
                  <input
                    type="radio"
                    name="contact"
                    id="신용카드"
                    value="신용카드"
                    className="mr-2"
                    checked={payment === '신용카드'}
                    onChange={handleChange}
                  />
                  <span>신용카드</span>
                </label>
              </div>
              <div className="flex md:flex-row flex-col gap-3 md:gap-8">
                <label className="flex flex-row items-center">
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
                    width={50}
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
                    width={50}
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
                    width={20}
                    height={29}
                    className="mr-2"
                  />
                  <span>토스페이</span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}
