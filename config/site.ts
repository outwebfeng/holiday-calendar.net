export const defaultLocale = 'en';
export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const siteConfig = {
  name: 'Holiday Calendar',
  description: 'Your Ultimate US Holiday Guide',
  email: 'support@holidaycalendar.com',
  links: {
    github: 'https://github.com/xxx/holidaycalendar',
    twitter: 'https://twitter.com/holidaycalendar',
  },
};