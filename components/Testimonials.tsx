"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      text: t("items.1.text"),
      author: t("items.1.author"),
    },
    {
      text: t("items.2.text"),
      author: t("items.2.author"),
    },
    {
      text: t("items.3.text"),
      author: t("items.3.author"),
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 relative"
            >
              <Quote className="h-8 w-8 text-blue-600 mb-4" />
              <p className="text-gray-600 mb-6">{testimonial.text}</p>
              <p className="font-medium text-gray-900">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}