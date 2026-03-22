import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Startup Investor Bot',
  description: 'Pitch your startup. Get judged. No fluff. Just brutal honesty.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-white bg-vc-bg min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
