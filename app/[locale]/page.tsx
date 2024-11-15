"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Clock, Globe, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Layout } from '@/components/layout';
import { Countdown } from '@/components/countdown';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Holiday, getHolidays } from '@/lib/get-holidays';

export default function Home() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as 'en' | 'zh';
  const [upcomingHolidays, setUpcomingHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const loadHolidays = async () => {
      const holidays = await getHolidays(locale);
      const now = new Date();
      const upcoming = holidays
        .map(holiday => ({
          ...holiday,
          date: new Date(holiday.date)
        }))
        .filter(holiday => holiday.date > now)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 3);
      setUpcomingHolidays(upcoming);
    };

    loadHolidays();
  }, [locale]);

  return (
    <Layout>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link href={`/${locale}/holidays`}>{t('hero.cta')}</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('countdown.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingHolidays.map(holiday => (
                <Link key={holiday.id} href={`/${locale}/${holiday.id}`}>
                  <Countdown targetDate={holiday.date} title={holiday.name} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">{t('features.title')}</h2>
            <p className="text-center text-muted-foreground mb-12">{t('features.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <Clock className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('features.feature1.title')}</h3>
                <p className="text-muted-foreground">{t('features.feature1.description')}</p>
              </Card>
              <Card className="p-6">
                <Globe className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('features.feature2.title')}</h3>
                <p className="text-muted-foreground">{t('features.feature2.description')}</p>
              </Card>
              <Card className="p-6">
                <Heart className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('features.feature3.title')}</h3>
                <p className="text-muted-foreground">{t('features.feature3.description')}</p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}