import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getHolidayDetail } from '@/lib/get-holiday-detail';
import { LanguageCode, LANGUAGES } from '@/i18n';
import { ClientCountdown } from '@/components/ClientCountdown';
import { Card } from '@/components/ui/card';
import { Calendar, Info, History, PartyPopper, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';

interface HolidayDetailPageProps {
  params: {
    holidayId: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: HolidayDetailPageProps): Promise<Metadata> {
  const locale = params.locale as LanguageCode;
  unstable_setRequestLocale(locale);
  const t = await getTranslations('holiday');
  const holiday = await getHolidayDetail(params.holidayId, locale);

  if (!holiday) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonicalUrl = locale === 'en' 
    ? `${siteUrl}/holidays/${params.holidayId}`
    : `${siteUrl}/${locale}/holidays/${params.holidayId}`;

  const languages = LANGUAGES.reduce((acc, lang) => {
    if (lang.code === 'en') return acc;
    return {
      ...acc,
      [lang.code]: `${siteUrl}/${lang.code}/holidays/${params.holidayId}`,
    };
  }, {});

  return {
    title: holiday.name,
    description: holiday.description?.split('\n')[0] || '',
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
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
        
        {/* Countdown Section - Only show if date is available */}
        {holiday.date && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t('countdown')}</h2>
            <ClientCountdown targetDate={holiday.date} title={holiday.name} />
          </div>
        )}
        
        <div className="space-y-6">
          {/* Date - Only show if available */}
          {holiday.date && (
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
          )}
          
          {/* Description Section */}
          {holiday.description && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Info className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">{t('description')}</h2>
              </div>
              <div className="prose prose-lg dark:prose-invert ml-9">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {holiday.description}
                </ReactMarkdown>
              </div>
            </Card>
          )}
          
          {/* Origin Section */}
          {holiday.origin && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <History className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">{t('origin')}</h2>
              </div>
              <div className="prose prose-lg dark:prose-invert ml-9">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {holiday.origin}
                </ReactMarkdown>
              </div>
            </Card>
          )}
          
          {/* Guide Section */}
          {holiday.guide && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <PartyPopper className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">{t('guide')}</h2>
              </div>
              <div className="prose prose-lg dark:prose-invert ml-9">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {holiday.guide}
                </ReactMarkdown>
              </div>
            </Card>
          )}
          
          {/* Taboos Section */}
          {holiday.taboos && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">{t('taboos')}</h2>
              </div>
              <div className="prose prose-lg dark:prose-invert ml-9">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {holiday.taboos}
                </ReactMarkdown>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
