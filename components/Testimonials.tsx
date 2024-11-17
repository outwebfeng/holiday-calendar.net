import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export default async function Testimonials() {
  const t = await getTranslations("testimonials");

  const testimonials = [
    {
      text: t("items.1.text"),
      author: t("items.1.author"),
      role: t("items.1.role"),
    },
    {
      text: t("items.2.text"),
      author: t("items.2.author"),
      role: t("items.2.role"),
    },
    {
      text: t("items.3.text"),
      author: t("items.3.author"),
      role: t("items.3.role"),
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={`testimonial-${index}`} className="p-6 flex flex-col transition-transform hover:-translate-y-1">
              <div className="flex-1">
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="mt-4">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}