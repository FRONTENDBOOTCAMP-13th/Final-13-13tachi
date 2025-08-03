import AuthInit from '@/components/common/AuthInit';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import InitUserStore from '@/components/common/InitUserStore';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthInit />
        <SessionProvider>
          <Providers>
            <Header />
            <InitUserStore />
            {children}
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
