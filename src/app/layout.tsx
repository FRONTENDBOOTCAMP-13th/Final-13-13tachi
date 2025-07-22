import AuthInit from '@/components/common/AuthInit';
import './globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AuthInit />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
