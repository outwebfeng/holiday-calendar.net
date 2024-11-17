import { getTranslations } from "next-intl/server";
import Link from "next/link";
import holidaysData from "@/data/holidays.json";
import { ClientCountdown } from "./ClientCountdown";

export default async function UpcomingHolidays() {
  const t = await getTranslations("countdown");
  
  // 获取未来的节日(最多3个)
  const today = new Date();
  const upcomingHolidays = holidaysData.holidays
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
            <Link 
              key={holiday.id} 
              href={`/${holiday.id}`}
              className="block transition-transform hover:scale-105"
            >
              <ClientCountdown 
                targetDate={holiday.date} 
                title={holiday.name} 
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}