import { cache } from 'react';
import { Locale } from '@/config/site';

export type Holiday = {
  id: string;
  name: string;
  date: string;
  description: string;
  origin: string;
  guide: string;
  taboos: string;
};

export const getHolidays = cache(async (locale: Locale): Promise<Holiday[]> => {
  const data = await import(`@/data/holidays/${locale}.json`);
  return data.holidays;
});