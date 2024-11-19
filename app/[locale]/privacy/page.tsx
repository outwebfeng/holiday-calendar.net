import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

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
