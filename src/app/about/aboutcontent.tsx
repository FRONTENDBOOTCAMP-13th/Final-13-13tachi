'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const members = [
  {
    name: '임한길',
    image: '/about-profile2.svg',
    detailImage: '/potato.png',
    intro: '팀장입니다.',
  },
  {
    name: '이진현',
    image: '/about-profile1.svg',
    detailImage: '/tomato.png',
    intro: '팀원입니다.',
  },
  {
    name: '김혜민',
    image: '/about-profile3.svg',
    detailImage: '/carrot.png',
    intro: '팀원입니다.',
  },
  {
    name: '강석현',
    image: '/about-profile4.svg',
    detailImage: '/mushroom.png',
    intro: '팀원입니다.',
  },
];

export default function AboutContent() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const selected = members.find(m => m.name === selectedMember);

  return (
    <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] bg-[#f8f8f0] ">
      <div className="lg:pt-[4.0625rem] lg:pb-[6.25rem] md:pt-[3.125rem] md:pb-20 pt-[1.875rem] pb-[3.75rem] mx-auto py-16 px-[20px] md:px-[30px] lg:px-[0px]  lg:max-w-5xl">
        {/* Title */}
        <div className="mb-10">
          <h2 className="text-gray text-xs md:text-sm lg:text-base">
            <Link href="/">HOME</Link>&nbsp;&gt;&nbsp;
            <Link href="/about">ABOUT</Link>
          </h2>
          <h3 className="mt-[20px] font-bold text-3xl md:text-4xl lg:text-5xl">
            흙내음 상점은?
          </h3>
        </div>
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10 "
        >
          <div className="relative w-full h-full">
            <Image
              src="/about-main.svg"
              alt="About 이미지"
              width={1920}
              height={100}
              className="object-cover w-full"
              priority
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-800 mb-4">
              🌿 UgVeg가 추구하는 것
            </p>
            <p className="leading-relaxed text-[1.05rem]">
              흙내음 상점은 못난이 농작물, 즉 겉모습에 약간의 흠집이 있거나
              모양이 특이해도 품질과 맛에는 전혀 문제가 없는 농산물들을 판매하는
              곳입니다. 자연이 빚어낸, 각기 다른 모양과 색깔을 가진 농작물들은
              우리 식탁에 신선함과 건강함을 전해줍니다. 하지만 이러한 농작물들은
              외관상의 이유로 종종 시장에서 외면받고, 낭비되는 일이 많았습니다.
              <br />
              <br />
              흙내음 상점은 이런 아까운 농작물들이 세상의 빛을 볼 수 있도록,
              그리고 농부님들의 소중한 땀과 노력이 헛되지 않도록, 가치 있는
              소비의 장을 만들고자 합니다. 조금은 못생겼지만 자연 그대로의 모습,
              신선한 품질, 그리고 농부의 정성이 담긴 농산물을 편안하게
              만나보세요. 흙내음 상점은 생산자와 소비자 모두가 건강하고 풍요로운
              삶을 살아갈 수 있도록,{' '}
              <strong>친환경적이고 착한 소비를 지향합니다.</strong>
              <br />
              <br />
              못난이 농작물의 새로운 가치를 발견하고, 음식 자원 낭비를 줄이는
              착한 선택, 흙내음 상점에서 함께 시작해보세요.
              <strong>
                {' '}
                소비자의 한 걸음이 농부에게 큰 응원이 되고, 지구를 지키는 작은
                실천이 됩니다.
              </strong>
            </p>
          </div>
          <hr className="my-16 border-t border-gray-300" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-2xl font-bold mb-6 text-green-800">
              🥕 왜 못난이 농산물인가요?
            </h4>
            <div className="text-[1.05rem] leading-relaxed text-gray-800 space-y-6">
              <p>
                자연이 만든 농작물은 똑같은 모양일 수 없습니다. 햇빛, 바람, 비,
                흙 속의 영양소까지 — 수많은 자연 조건 속에서 농작물은 각자 다른
                모습으로 자랍니다.
              </p>

              <p>
                못난이 농산물은 단지 겉모습이 조금 다를 뿐,
                <strong>맛도, 영양도, 신선함도 일반 농산물과 동일</strong>
                합니다. 하지만 단순히 시장에서 보기 좋지 않다는 이유로 선별에서
                제외되고,
                <strong>많은 양이 폐기</strong>되는 것이 현실입니다.
              </p>

              <p>
                <strong>
                  전 세계 농산물의 약 30~40%가 ‘외형’ 때문에 버려지고
                </strong>
                , 이로 인해 매년 수천만 톤의 음식이 낭비되고 있습니다. 이는
                단순한 낭비가 아니라, 기후 변화와 환경 파괴로 이어지는 심각한
                문제입니다.
              </p>

              <p>
                흙내음 상점은 이러한 문제를 해결하고자 합니다.
                <strong>조금 못생겨도 건강한 먹거리</strong>를 소비자에게
                소개하고,
                <strong>음식물 쓰레기를 줄이는 작은 실천</strong>을 함께합니다.
              </p>

              <p className="text-green-800 font-semibold">
                &quot;못난이 농산물의 가치를 알아보는 것, 그것이 우리가 더 나은
                먹거리 문화를 만들어가는 첫걸음입니다. &quot;
              </p>
            </div>
          </motion.div>
          <hr className="my-16 border-t border-gray-300" />
          <div className="relative w-full h-full">
            <Image
              src="/about.png"
              alt="About 이미지"
              width={1920}
              height={100}
              className="object-cover w-full"
              priority
            />
          </div>
          <p className="text-2xl font-bold text-green-800 mb-4">
            🚜 UgVeg의 유통 방식
          </p>
          <p className="leading-relaxed text-[1.05rem] mt-8">
            흙내음 상점은 농부와 소비자 사이의 거리를 줄이는 새로운 유통 방식을
            지향합니다. 중간 유통 과정을 최소화하고,
            <strong>농가에서 직접 소비자에게 바로 배송</strong>하는 직송
            시스템을 통해 신선함을 그대로 전합니다. 우리는 단순한 판매 플랫폼이
            아닌, <strong>생산자와 소비자가 연결되는 장</strong>을 제공합니다.
            <br />
            흙내음 상점은 물류를 보유하거나 상품을 보관하지 않습니다. 대신, 각
            농가가 정성껏 수확한 농산물을 소비자의 주문에 맞춰 직접 포장하고,
            바로 발송합니다.
            <br />
            <br />
            이를 통해 유통 과정에서 발생하는 비용과 시간 낭비를 줄이고, 농부는
            제값을 받고, 소비자는 더 신선한 농산물을 더 합리적인 가격에 만날 수
            있습니다. 흙내음 상점은 이런 건강한 거래 구조를 통해 모두에게 이로운
            농산물 시장을 만들어가고자 합니다.
          </p>
        </motion.div>
        <hr className="my-16 border-t border-gray-300" />
        {/* 운영 방식 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-2xl font-bold mb-8 text-green-800">
            🔄 우리는 이렇게 운영돼요
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center text-sm md:text-base">
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🛒</span>
              <p className="font-semibold">소비자 주문</p>
              <p className="text-gray-600 mt-1">
                흙내음 상점 웹사이트를 통해 주문
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">📩</span>
              <p className="font-semibold">농가 접수</p>
              <p className="text-gray-600 mt-1">주문 내역이 농부에게 전달</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🥕</span>
              <p className="font-semibold">수확 및 포장</p>
              <p className="text-gray-600 mt-1">신선하게 수확 후 바로 포장</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🚚</span>
              <p className="font-semibold">직접 배송</p>
              <p className="text-gray-600 mt-1">농가에서 직접 출고 및 발송</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">📦</span>
              <p className="font-semibold">소비자 수령</p>
              <p className="text-gray-600 mt-1">신선한 농산물이 문 앞까지!</p>
            </div>
          </div>

          <div className="mt-10 text-[1.05rem] text-gray-700 leading-relaxed">
            <p>
              <strong>농부</strong>는 수확과 포장, 발송까지 직접 책임지고
              수행하며,
              <strong>흙내음 상점</strong>은 주문을 연결하고 구매 시스템을
              지원하는 플랫폼 역할만 담당합니다. 중간 유통 없이 농부와 소비자가
              직접 연결되기에, 더 <strong>신선하고 합리적인 소비</strong>가
              가능해집니다.
            </p>
          </div>
        </motion.div>{' '}
        <hr className="my-16 border-t border-gray-300" />
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-2xl font-bold mb-8 text-green-800">
            ❓ 자주 묻는 질문
          </h4>
          <div className="space-y-6 text-[1.05rem]">
            <div>
              <p className="font-semibold text-gray-800">
                Q. 못난이 농산물은 정말 괜찮은 건가요?
              </p>
              <p className="text-gray-700 mt-1">
                네! 못난이 농산물은 단지 겉모습에 약간의 흠집이나 모양이 있을
                뿐, 품질이나 맛에는 전혀 문제가 없습니다. 오히려 자연 그대로의
                신선함을 간직한 건강한 먹거리입니다.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Q. 배송 중 상할 수는 없나요?
              </p>
              <p className="text-gray-700 mt-1">
                농가에서 수확 직후 직접 포장해 발송하기 때문에 신선도가
                높습니다. 또한 각 농산물에 맞는 포장 방식으로 최대한 안전하게
                배송되도록 신경 쓰고 있습니다.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Q. 어떤 농가와 협업하나요?
              </p>
              <p className="text-gray-700 mt-1">
                흙내음 상점은 친환경 농업을 실천하는 전국 각지의 소규모 농가와
                협업하고 있습니다. 믿을 수 있는 생산자분들과 함께 건강한 먹거리
                문화를 만들어가고 있습니다.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Q. 주문하면 얼마나 걸리나요?
              </p>
              <p className="text-gray-700 mt-1">
                일반적으로 주문 후 2~3일 내 농가에서 직접 수확 및 포장하여
                발송되며, 지역에 따라 1~2일 내 도착합니다. 다만 기상 상황이나
                농작물 수확 상황에 따라 다소 유동적일 수 있습니다.
              </p>
            </div>
          </div>{' '}
        </motion.div>{' '}
        <hr className="my-16 border-t border-gray-300 mb-1" />
        <p className="text-xs text-light-gray text-right mb-[50px]">
          프로필 이미지 출처 &quot;Designed by Freepik &quot;
        </p>
        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-2xl font-bold mb-10 text-green-800">
            👨‍🌾 UgVeg 팀원 소개
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {members.map(member => (
              <motion.div
                key={member.name}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-5 gap-2 cursor-pointer select-none"
                onClick={() =>
                  setSelectedMember(
                    selectedMember === member.name ? null : member.name,
                  )
                }
              >
                <Image
                  src={member.image}
                  alt={`${member.name} 프로필`}
                  width={100}
                  height={100}
                  className="rounded-full border border-gray-300"
                />
                <div className="text-lg font-semibold text-center">
                  <span>{member.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selected && (
        <motion.div
          key={selected.name} // 이 줄이 중요!!
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="  relative  -mb2 mx-auto max-w-3xl px-5 md:px-10 text-center"
        >
          <div className="rounded-xl flex flex-row items-center gap-4">
            <Image
              src={selected.detailImage}
              alt={`${selected.name} 프로필`}
              width={200}
              height={200}
              className="w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]  "
            />
            <div className="text-left">
              <p className="text-xl font-bold text-green-800">
                {selected.name}
              </p>
              <p className="text-base text-gray-700">{selected.intro}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 흙 이미지 */}
      <div className="relative w-full overflow-visible">
        <div className="relative z-10">
          <Image
            src="/about-sand.png"
            alt="팀원소개 흙"
            layout="responsive"
            width={1920}
            height={100}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}
