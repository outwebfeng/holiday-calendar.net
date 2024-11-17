import createMiddleware from 'next-intl/middleware';
import { LANGUAGES } from './i18n';

export default createMiddleware({
  locales: LANGUAGES.map(l => l.code),
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};