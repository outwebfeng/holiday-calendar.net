"use client";

import { useTranslations } from 'next-intl';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { holidays } from '@/data/holidays.json';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/en" className="flex items-center space-x-2 mb-4">
              <Calendar className="h-6 w-6" />
              <span className="font-bold text-xl">Holiday Calendar</span>
            </Link>
            <p className="text-sm text-muted-foreground">support@holidaycalendar.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('navigation.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/en/about">{t('footer.about')}</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/en/privacy">{t('footer.privacy')}</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/en/terms">{t('footer.terms')}</Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('navigation.holidays')}</h3>
            <ul className="space-y-2">
              {holidays.slice(0, 3).map(holiday => (
                <li key={holiday.id}>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href={`/en/${holiday.id}`}>{holiday.name.en}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('navigation.contact')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions? We'd love to hear from you.
            </p>
            <Button asChild>
              <Link href="/en/contact">{t('navigation.contact')}</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}