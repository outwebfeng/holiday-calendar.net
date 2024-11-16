import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/calendar/animated-element";

export default async function Hero() {
  const t = await getTranslations("hero");
  
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
            <Link href="/holidays">{t("cta")}</Link>
          </Button>
        </AnimatedElement>
      </div>
    </section>
  );
}