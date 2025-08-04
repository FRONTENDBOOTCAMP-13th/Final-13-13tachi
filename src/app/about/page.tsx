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
    name: '강석현',
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
    name: '이진현',
    image: '/about-profile4.svg',
    detailImage: '/mushroom.png',
    intro: '팀원입니다.',
  },
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const selected = members.find(m => m.name === selectedMember);

  return (
    <main className="min-h-[calc(100dvh-23.625rem)] md:min-h-[calc(100dvh-20.1875rem)] bg-[#f8f8f0] text-gray-800">
      <div className="mx-auto px-5 py-16 md:px-10 lg:max-w-5xl">
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
              src="/about.png"
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
              삶을 살아갈 수 있도록, 친환경적이고 착한 소비를 지향합니다.
              <br />
              <br />
              못난이 농작물의 새로운 가치를 발견하고, 음식 자원 낭비를 줄이는
              착한 선택, 흙내음 상점에서 함께 시작해보세요. 소비자의 한 걸음이
              농부에게 큰 응원이 되고, 지구를 지키는 작은 실천이 됩니다.
            </p>
          </div>
        </motion.div>

        <hr className="my-16 border-t border-gray-300" />

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
