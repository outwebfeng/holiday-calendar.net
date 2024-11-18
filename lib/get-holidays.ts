import { cache } from 'react';
import { LanguageCode } from '@/i18n';

export interface Holiday {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  description: string;
}

export const getHolidays = cache(async (locale: LanguageCode): Promise<Holiday[]> => {
  const currentYear = new Date().getFullYear();
  const data = await import(`@/data/holidays-year/holiday-${currentYear}-${locale}.json`);
  return data.holidays;
});