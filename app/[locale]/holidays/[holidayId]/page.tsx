import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getHolidayDetail } from '@/lib/get-holiday-detail';
import { LanguageCode } from '@/i18n';
import { ClientCountdown } from '@/components/ClientCountdown';
import { Card } from '@/components/ui/card';
import { Calendar, Info, History, PartyPopper, AlertTriangle } from 'lucide-react';

interface HolidayDetailPageProps {
  params: {
    holidayId: string;
    locale: string;
  };
}

export default async function HolidayDetailPage({ params }: HolidayDetailPageProps) {
  const locale = params.locale as LanguageCode;
  const t = await getTranslations('holiday');
  
  // Fetch holiday detail data
  const holiday = await getHolidayDetail(params.holidayId, locale);
  
  // If holiday not found, return 404
  if (!holiday) {
    notFound();
  }

  return (
    <main className="pt-32 pb-16 container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{holiday.name}</h1>
        
        {/* Countdown Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('countdown')}</h2>
          <ClientCountdown targetDate={holiday.date} title={holiday.name} />
        </div>
        
        <div className="space-y-6">
          {/* Date */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">{t('date')}</h2>
            </div>
            <p className="text-lg ml-9">{new Date(holiday.date).toLocaleDateString(locale, { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Info className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">{t('description')}</h2>
            </div>
            <p className="text-lg leading-relaxed ml-9">{holiday.description}</p>
          </Card>

          {/* Origin */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <History className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">{t('origin')}</h2>
            </div>
            <p className="text-lg leading-relaxed ml-9">{holiday.origin}</p>
          </Card>

          {/* Celebration Guide */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <PartyPopper className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">{t('guide')}</h2>
            </div>
            <p className="text-lg leading-relaxed ml-9">{holiday.guide}</p>
          </Card>

          {/* Taboos */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">{t('taboos')}</h2>
            </div>
            <div className="text-lg leading-relaxed ml-9 whitespace-pre-line">
              {holiday.taboos}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
