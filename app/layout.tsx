import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@/components/analytics/google-analytics';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
