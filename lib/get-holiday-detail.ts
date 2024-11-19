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
    // 获取当前年份
    const currentYear = new Date().getFullYear();
    
    // 构建文件路径
    const detailPath = path.join(process.cwd(), 'data', 'holidays', `${locale}.json`);
    const yearPath = path.join(process.cwd(), 'data', 'holidays-year', `holiday-${currentYear}-${locale}.json`);
    
    // 读取年度数据
    const yearContent = await fs.readFile(yearPath, 'utf8').catch(error => {
      console.warn(`Warning: Could not find holiday data for year ${currentYear}, falling back to previous year`);
      // 如果当前年份的数据不存在，尝试使用上一年的数据
      const previousYear = currentYear - 1;
      const fallbackPath = path.join(process.cwd(), 'data', 'holidays-year', `holiday-${previousYear}-${locale}.json`);
      return fs.readFile(fallbackPath, 'utf8');
    });

    const yearData = JSON.parse(yearContent);
    
    // 从年度数据中查找基本信息
    const yearHoliday = yearData.holidays.find((h: { id: string; name: string; date: string; dayOfWeek: string; type: string }) => h.id === holidayId);
    if (!yearHoliday) return null;

    try {
      // 尝试读取详细信息
      const detailContent = await fs.readFile(detailPath, 'utf8');
      const detailData = JSON.parse(detailContent);
      const holidayDetail = detailData.holidays.find((h: HolidayDetail) => h.id === holidayId);

      // 如果找到详细信息，合并数据
      if (holidayDetail) {
        return {
          ...holidayDetail,
          date: yearHoliday.date,
          dayOfWeek: yearHoliday.dayOfWeek,
          type: yearHoliday.type
        };
      }
    } catch (error) {
      console.warn('Warning: Could not load holiday details, falling back to basic info');
    }

    // 如果没有找到详细信息或读取失败，返回基本信息
    return {
      id: yearHoliday.id,
      name: yearHoliday.name,
      date: yearHoliday.date,
      dayOfWeek: yearHoliday.dayOfWeek,
      type: yearHoliday.type
    };

  } catch (error) {
    console.error('Error fetching holiday detail:', error);
    return null;
  }
}
