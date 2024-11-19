import { getLocale, getTranslations } from 'next-intl/server';
import { Holiday, getAllHolidays } from '@/lib/get-holidays';
import { HolidayList } from '@/components/holidays/holiday-list';
import { LanguageCode } from '@/i18n';

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