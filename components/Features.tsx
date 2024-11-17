import { getTranslations } from "next-intl/server";
import { Clock, BookOpen, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export default async function Features() {
  const t = await getTranslations("features");

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{t("title")}</h2>
        <p className="text-center text-muted-foreground mb-12">{t("subtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 transition-transform hover:-translate-y-1"
            >
              <feature.icon className="h-12 w-12 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}