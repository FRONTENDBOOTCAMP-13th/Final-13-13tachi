import AboutContent from '@/app/about/aboutcontent';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `흙내음 상점이란? - UgVeg: 흙내음 상점`,
    description: `흙내음 상점에 대해 알아보세요.`,
    openGraph: {
      title: `흙내음 상점이란?  - UgVeg: 흙내음 상점`,
      description: `흙내음 상점에 대해 알아보세요.`,
      url: `/about`,
      images: {
        url: 'https://ugveg.vercel.app/UgVeg.png',
      },
    },
  };
}

export default function aboutPage() {
  return <AboutContent />;
}
