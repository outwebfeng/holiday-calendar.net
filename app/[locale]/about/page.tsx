"use client";

import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        {t("title")}
      </h1>
      
      <div className="space-y-8 text-lg">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("mission.title")}</h2>
          <p className="text-gray-600">{t("mission.content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("features.title")}</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>{t("features.item1")}</li>
            <li>{t("features.item2")}</li>
            <li>{t("features.item3")}</li>
            <li>{t("features.item4")}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("technology.title")}</h2>
          <p className="text-gray-600">{t("technology.content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>
          <p className="text-gray-600">{t("contact.content")}</p>
        </section>
      </div>
    </div>
  );
}
