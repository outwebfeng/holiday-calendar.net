import { getTranslations, getLocale } from "next-intl/server";
import { getHolidays } from "@/lib/get-holidays";
import { LanguageCode } from "@/i18n";

export default async function HolidayList() {
  const t = await getTranslations("holidays");
  const locale = (await getLocale()) as LanguageCode;
  const holidays = await getHolidays(locale);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("title")}
        </h2>
        <div className="grid gap-6">
          {holidays.map(holiday => (
            <a 
              key={holiday.id}
              href={`/${locale}/holidays/${holiday.id}`}
              className="block p-6 bg-card rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{holiday.name}</h3>
                <time className="text-muted-foreground">{holiday.date}</time>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
