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
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;
  
  // Load both current and next year's data
  const [currentYearData, nextYearData] = await Promise.all([
    import(`@/data/holidays-year/holiday-${currentYear}-${locale}.json`).catch(() => ({ holidays: [] })),
    import(`@/data/holidays-year/holiday-${nextYear}-${locale}.json`).catch(() => ({ holidays: [] }))
  ]);

  // Filter current year's holidays (from today onwards)
  const currentYearHolidays = currentYearData.holidays.filter((holiday: Holiday) => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= today;
  });

  // Filter next year's holidays (up to same date next year)
  const nextYearCutoff = new Date(today);
  nextYearCutoff.setFullYear(nextYearCutoff.getFullYear() + 1);
  
  const nextYearHolidays = nextYearData.holidays.filter((holiday: Holiday) => {
    const holidayDate = new Date(holiday.date);
    return holidayDate < nextYearCutoff;
  });

  // Combine and sort all holidays by date
  return [...currentYearHolidays, ...nextYearHolidays].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
});

// Get only federal and major holidays (type 1 and 2) for homepage
export const getHolidays = cache(async (locale: LanguageCode): Promise<Holiday[]> => {
  const currentYear = new Date().getFullYear();
  const data = await import(`@/data/holidays-year/holiday-${currentYear}-${locale}.json`);
  return data.holidays.filter((holiday: Holiday) => holiday.type === "1" || holiday.type === "2");
});