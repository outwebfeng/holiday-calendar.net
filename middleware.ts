import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/config/site';
 
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});
 
export const config = {
  matcher: [
    '/',
    '/(zh|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};