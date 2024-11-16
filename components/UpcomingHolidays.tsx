"use client";

import { useEffect, useState } from "react";
import { differenceInDays, parseISO } from "date-fns";
import holidaysData from "@/data/holidays.json";

interface Holiday {
  id: string;
  name: string;
  date: string;
  description: string;
}

export default function UpcomingHolidays() {
  const [upcomingHolidays, setUpcomingHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const today = new Date();
    const sortedHolidays = holidaysData.holidays
      .map((holiday) => ({
        ...holiday,
        daysUntil: differenceInDays(parseISO(holiday.date), today),
      }))
      .filter((holiday) => holiday.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(0, 3);

    setUpcomingHolidays(sortedHolidays);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Upcoming Holidays
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingHolidays.map((holiday) => (
            <div
              key={holiday.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{holiday.name}</h3>
                <p className="text-gray-600 mb-4">{holiday.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium">
                    {new Date(holiday.date).toLocaleDateString()}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {(holiday as any).daysUntil} days left
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}