"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <CalendarDays className="mx-auto h-16 w-16 text-blue-600 mb-8" />
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          {t("title")}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          {t("subtitle")}
        </p>
        <Link
          href="/holidays"
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}