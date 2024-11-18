import { getTranslations, getLocale } from "next-intl/server";
import { getHolidays } from "@/lib/get-holidays";
import { LanguageCode } from "@/i18n";
import { ClientCountdown } from "./ClientCountdown";

export default async function UpcomingHolidays() {
  const t = await getTranslations("countdown");
  const locale = (await getLocale()) as LanguageCode;
  
  // Get upcoming holidays (max 3)
  const today = new Date();
  const holidays = await getHolidays(locale);
  const upcomingHolidays = holidays
    .filter(holiday => new Date(holiday.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingHolidays.map(holiday => (
            <a 
              key={holiday.id} 
              href={`/${locale}/holidays/${holiday.id}`}
              className="block transition-transform hover:scale-105"
            >
              <ClientCountdown 
                targetDate={holiday.date} 
                title={holiday.name} 
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}