import { getRequestConfig } from 'next-intl/server';

export const LANGUAGES = [
  { code: 'en', label: 'English', href: '/en' },
  { code: 'zh', label: '中文', href: '/zh' },
  { code: 'hi', label: 'हिंदी', href: '/hi' },
] as const;

export type LanguageCode = typeof LANGUAGES[number]['code'];

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));