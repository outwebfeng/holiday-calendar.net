import { getTranslations } from 'next-intl/server';

export default async function FAQ() {
  const t = await getTranslations('faq');
  const faqItems = Object.values(t.raw('items')).map((item: any) => ({
    q: item.q,
    a: item.a
  }));

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t('title')}</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqItems.map((item, index) => (
            <div 
              key={`faq-${index}`} 
              className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-3">
                {item.q}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}