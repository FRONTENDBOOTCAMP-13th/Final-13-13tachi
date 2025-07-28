import AuthInit from '@/components/common/AuthInit';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthInit />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
