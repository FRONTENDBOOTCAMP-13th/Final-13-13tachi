import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-green w-full lg:py-8.5">
      <div className="mx-auto flex flex-col gap-6 h-full text-white lg:max-w-5xl">
        <div>
          <h2 className="lg:text-2xl lg:font-bold">흙내음 상점: UgVeg</h2>
          <ul className="flex gap-2 lg:mt-1.5 lg:text-sm lg:font-thin">
            <li className="lg:relative lg:after:absolute lg:after:right-[-0.3125rem] lg:after:top-[0.3125rem] lg:after:w-[0.0625rem] lg:after:h-3 lg:after:bg-white">
              강석현
            </li>
            <li className="lg:relative lg:after:absolute lg:after:right-[-0.3125rem] lg:after:top-[0.3125rem] lg:after:w-[0.0625rem] lg:after:h-3 lg:after:bg-white">
              김혜민
            </li>
            <li className="lg:relative lg:after:absolute lg:after:right-[-0.3125rem] lg:after:top-[0.3125rem] lg:after:w-[0.0625rem] lg:after:h-3 lg:after:bg-white">
              이진현
            </li>
            <li>임한길</li>
          </ul>
        </div>
        <ul className="flex items-center lg:gap-4">
          <li>
            <Link
              href="https://github.com/FRONTENDBOOTCAMP-13th/Final-13-13tachi"
              target="_blank"
              title="13tachi 깃허브 새창열림으로 바로가기"
            >
              <Image
                src="/ico-github.svg"
                alt="깃허브 아이콘"
                width={36}
                height={36}
              ></Image>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Image
                src="/ico-youtube.svg"
                alt="유튜브 아이콘"
                width={38}
                height={28}
              ></Image>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Image
                src="/ico-x.svg"
                alt="X 아이콘"
                width={34}
                height={34}
              ></Image>
            </Link>
          </li>
          <li>
            <Link href="#">
              <Image
                src="/ico-instagram.svg"
                alt="인스타그램 아이콘"
                width={32}
                height={33}
              ></Image>
            </Link>
          </li>
        </ul>
        <div className="lg:space-y-1.5">
          <p className="lg:text-sm">
            이 웹 사이트는 멋쟁이사자처럼 부트캠프 13기 파이널 프로젝트로
            제작되었습니다.
          </p>
          <small className="font-thin lg:mt-1">
            Copyrightⓒ2025 Likelion 13-13.
          </small>
        </div>
      </div>
    </footer>
  );
}
