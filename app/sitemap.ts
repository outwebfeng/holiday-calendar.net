import { MetadataRoute } from 'next';
import { getHolidays } from '@/lib/get-holidays';
import { LANGUAGES } from '@/i18n';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://holidaycalendar.net';
  const currentDate = new Date();
  const lastModified = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();

  // Get all holidays for both languages
  const enHolidays = await getHolidays('en');
  const zhHolidays = await getHolidays('zh');

  // Base static pages for each language
  const staticPages = LANGUAGES.flatMap(({ code }) => [
    {
      url: `${baseUrl}/${code}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${code}/about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${code}/holidays`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]);

  // Generate URLs for each holiday in each language
  const holidayPages = [
    ...enHolidays.map((holiday) => ({
      url: `${baseUrl}/en/holidays/${holiday.id}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...zhHolidays.map((holiday) => ({
      url: `${baseUrl}/zh/holidays/${holiday.id}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...holidayPages];
}
