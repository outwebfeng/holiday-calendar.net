"use client";

import { useTranslations } from "next-intl";
import { Clock, Calendar, BookOpen } from "lucide-react";

export default function Features() {
  const t = useTranslations("features");

  const features = [
    {
      icon: Clock,
      title: t("countdown.title"),
      description: t("countdown.description"),
    },
    {
      icon: BookOpen,
      title: t("information.title"),
      description: t("information.description"),
    },
    {
      icon: Calendar,
      title: t("planning.title"),
      description: t("planning.description"),
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg transform transition-all hover:-translate-y-1"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}