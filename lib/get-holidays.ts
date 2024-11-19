import { cache } from 'react';
import { LanguageCode } from '@/i18n';

// Define holiday types
export interface Holiday {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  type: string;
}

// Get all holidays without filtering
export const getAllHolidays = cache(async (locale: LanguageCode): Promise<Holiday[]> => {
  const currentYear = new Date().getFullYear();
  const data = await import(`@/data/holidays-year/holiday-${currentYear}-${locale}.json`);
  return data.holidays;
});

// Get only federal and major holidays (type 1 and 2) for homepage
export const getHolidays = cache(async (locale: LanguageCode): Promise<Holiday[]> => {
  const currentYear = new Date().getFullYear();
  const data = await import(`@/data/holidays-year/holiday-${currentYear}-${locale}.json`);
  return data.holidays.filter((holiday: Holiday) => holiday.type === "1" || holiday.type === "2");
});