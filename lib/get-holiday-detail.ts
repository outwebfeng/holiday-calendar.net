import { promises as fs } from 'fs';
import path from 'path';
import { LanguageCode } from '@/i18n';

export interface HolidayDetail {
  id: string;
  name: string;
  description?: string;
  origin?: string;
  guide?: string;
  taboos?: string;
  date?: string;
  dayOfWeek?: string;
  type?: string;
}

/**
 * 获取当前年份的节日详细信息
 * @param holidayId 节日ID
 * @param locale 语言代码
 * @returns 节日详细信息，包括基础信息和当年日期
 */
export async function getHolidayDetail(holidayId: string, locale: LanguageCode): Promise<HolidayDetail | null> {
  try {
    // Get current date and years
    const today = new Date();
    const currentYear = today.getFullYear();
    const nextYear = currentYear + 1;
    
    // Build file paths
    const detailPath = path.join(process.cwd(), 'data', 'holidays', `${locale}.json`);
    const currentYearPath = path.join(process.cwd(), 'data', 'holidays-year', `holiday-${currentYear}-${locale}.json`);
    const nextYearPath = path.join(process.cwd(), 'data', 'holidays-year', `holiday-${nextYear}-${locale}.json`);

    // Try to get the year-specific data first
    let yearHoliday = null;
    try {
      // Try current year first
      const currentYearContent = await fs.readFile(currentYearPath, 'utf8');
      const currentYearData = JSON.parse(currentYearContent);
      const currentYearHoliday = currentYearData.holidays.find(
        (h: { id: string; date: string }) => h.id === holidayId
      );

      // Try next year if needed
      const nextYearContent = await fs.readFile(nextYearPath, 'utf8');
      const nextYearData = JSON.parse(nextYearContent);
      const nextYearHoliday = nextYearData.holidays.find(
        (h: { id: string; date: string }) => h.id === holidayId
      );

      // Determine which year's data to use based on date
      if (currentYearHoliday && nextYearHoliday) {
        const currentDate = new Date(currentYearHoliday.date);
        yearHoliday = currentDate >= today ? currentYearHoliday : nextYearHoliday;
      } else {
        yearHoliday = currentYearHoliday || nextYearHoliday;
      }
    } catch (error) {
      console.warn('Warning: Could not load year-specific holiday data');
    }

    // If we found year-specific data, use it as the base
    if (yearHoliday) {
      let baseHolidayDetail: HolidayDetail = {
        id: yearHoliday.id,
        name: yearHoliday.name,
        date: yearHoliday.date,
        dayOfWeek: yearHoliday.dayOfWeek,
        type: yearHoliday.type
      };

      // Try to get additional details if available
      try {
        const detailContent = await fs.readFile(detailPath, 'utf8');
        const detailData = JSON.parse(detailContent);
        const additionalDetails = detailData.holidays.find((h: HolidayDetail) => h.id === holidayId);
        
        if (additionalDetails) {
          baseHolidayDetail = {
            ...additionalDetails,
            date: yearHoliday.date,
            dayOfWeek: yearHoliday.dayOfWeek,
            type: yearHoliday.type
          };
        }
      } catch (error) {
        console.warn('Warning: Could not load additional holiday details');
      }

      return baseHolidayDetail;
    }

    // If no year-specific data found, try to get base holiday details
    try {
      const detailContent = await fs.readFile(detailPath, 'utf8');
      const detailData = JSON.parse(detailContent);
      const baseHolidayDetail = detailData.holidays.find((h: HolidayDetail) => h.id === holidayId);
      return baseHolidayDetail || null;
    } catch (error) {
      console.warn('Warning: Could not load base holiday details');
      return null;
    }
  } catch (error) {
    console.error('Error fetching holiday detail:', error);
    return null;
  }
}
