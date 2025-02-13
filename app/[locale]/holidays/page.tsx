import { getLocale, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getAllHolidays } from '@/lib/get-holidays';
import { HolidayList } from '@/components/holidays/holiday-list';
import { LanguageCode, LANGUAGES } from '@/i18n';
import { Metadata } from 'next';

interface HolidaysPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: HolidaysPageProps): Promise<Metadata> {
  const locale = params.locale as LanguageCode;
  unstable_setRequestLocale(locale);
  const t = await getTranslations('holidays');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonicalUrl = locale === 'en' 
    ? `${siteUrl}/holidays`
    : `${siteUrl}/${locale}/holidays`;

  const languages = LANGUAGES.reduce((acc, lang) => {
    if (lang.code === 'en') return acc;
    return {
      ...acc,
      [lang.code]: `${siteUrl}/${lang.code}/holidays`,
    };
  }, {});

  return {
    title: t('pageTitle'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function HolidaysPage() {
  const locale = await getLocale() as LanguageCode;
  const t = await getTranslations();
  
  // Fetch all holidays on the server
  const holidays = await getAllHolidays(locale);

  return (
    <main className="pt-32 pb-16 container mx-auto px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold">{t('holidays.pageTitle')}</h1>
        </div>
        <HolidayList holidays={holidays} locale={locale} />
      </div>
    </main>
  );
}