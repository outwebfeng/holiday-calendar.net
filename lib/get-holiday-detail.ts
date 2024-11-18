import { cache } from 'react';
import { LanguageCode } from '@/i18n';

export interface HolidayDetail {
  id: string;
  name: string;
  date: string;
  description: string;
  origin: string;
  guide: string;
  taboos: string;
}

export const getHolidayDetail = cache(async (
  id: string,
  locale: LanguageCode
): Promise<HolidayDetail | null> => {
  try {
    const data = await import(`@/data/holidays/${locale}.json`);
    const holiday = data.holidays.find((h: HolidayDetail) => h.id === id);
    return holiday || null;
  } catch (error) {
    console.error('Error loading holiday detail:', error);
    return null;
  }
});
