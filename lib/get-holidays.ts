import { cache } from 'react';
import { LanguageCode } from '@/i18n';

export interface Holiday {
  id: string;
  name: string;
  date: string | Date;
  description: string;
  origin: string;
  guide: string;
  taboos: string;
}

export const getHolidays = cache(async (locale: LanguageCode): Promise<Holiday[]> => {
  const data = await import(`@/data/holidays/${locale}.json`);
  return data.holidays;
});