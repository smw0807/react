import { CookiesProvider } from 'next-client-cookies/server';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CookiesProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </CookiesProvider>
      </body>
    </html>
  );
}
