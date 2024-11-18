import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/animated-element";
import { getLocale } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto text-center">
        <AnimatedElement>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("title")}
          </h1>
        </AnimatedElement>
        
        <AnimatedElement delay={0.2}>
          <p className="text-xl text-muted-foreground mb-8">
            {t("subtitle")}
          </p>
        </AnimatedElement>
        
        <AnimatedElement delay={0.4}>
          <Button asChild size="lg" className="bg-primary text-primary-foreground">
            <a href={`/${locale}/holidays`}>{t("cta")}</a>
          </Button>
        </AnimatedElement>
      </div>
    </section>
  );
}