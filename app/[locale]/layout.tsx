import { Inter } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';
import { locales } from '@/config/site';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import LocaleProvider from '@/components/locale-provider';
import '../globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const generateMetadata = ({ params }: { params: { locale: string } }): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const canonicalUrl = `${baseUrl}/${params.locale}`;
  
  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    return null;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LocaleProvider locale={locale} messages={messages}>
            <div className="min-h-screen bg-background flex flex-col antialiased">
              {children}
            </div>
          </LocaleProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}