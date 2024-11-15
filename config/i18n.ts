import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config/site';
 
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/messages/${locale}.json`)).default
}));