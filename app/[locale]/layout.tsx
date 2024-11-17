import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import '../globals.css';
import { getTranslations } from 'next-intl/server';
import { LANGUAGES, type LanguageCode } from '@/i18n';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return LANGUAGES.map(lang => ({ locale: lang.code }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: LanguageCode };
}) {
  const t = await getTranslations({ locale, namespace: 'Home' });
  
  const canonicalPath = locale === 'en' 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`;
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalPath
    }
  };
}

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: LanguageCode };
}) {
  if (!LANGUAGES.map(l => l.code).includes(locale)) {
    notFound();
  }

  const messages = useMessages();
  if (!messages) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;