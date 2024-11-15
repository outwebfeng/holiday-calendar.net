import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config/site';
 
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    return null;
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'America/New_York',
    now: new Date()
  };
});