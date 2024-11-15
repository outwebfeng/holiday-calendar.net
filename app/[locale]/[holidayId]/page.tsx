import { notFound } from 'next/navigation';
import { HolidayDetail } from '@/components/holiday-detail';
import { getHolidays } from '@/lib/get-holidays';
import { locales } from '@/config/site';
import { Layout } from '@/components/layout';

export async function generateStaticParams() {
  const holidays = await getHolidays('en');
  return locales.flatMap((locale) => 
    holidays.map((holiday) => ({
      locale,
      holidayId: holiday.id,
    }))
  );
}

export default async function HolidayPage({ 
  params: { holidayId, locale } 
}: { 
  params: { holidayId: string; locale: string } 
}) {
  const holidays = await getHolidays(locale as 'en' | 'zh');
  const holiday = holidays.find(h => h.id === holidayId);

  if (!holiday) {
    notFound();
  }

  return (
    <Layout>
      <HolidayDetail holiday={holiday} />
    </Layout>
  );
}