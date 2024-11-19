import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LanguageCode, LANGUAGES } from '@/i18n';
import { Metadata } from 'next';

interface TermsPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const locale = params.locale as LanguageCode;
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'terms' });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonicalUrl = locale === 'en' 
    ? `${siteUrl}/terms`
    : `${siteUrl}/${locale}/terms`;

  const languages = LANGUAGES.reduce((acc, lang) => {
    if (lang.code === 'en') return acc;
    return {
      ...acc,
      [lang.code]: `${siteUrl}/${lang.code}/terms`,
    };
  }, {});

  return {
    title: t('title'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}

export default async function TermsPage() {
  const t = await getTranslations('terms');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      <p className="text-gray-600 mb-8">{t('lastUpdated')}</p>

      <div className="space-y-8">
        {t.raw('sections').map((section: { title: string; content: string }, index: number) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
