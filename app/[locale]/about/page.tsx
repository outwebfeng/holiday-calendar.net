import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Us</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Holiday Calendar is your comprehensive guide to American holidays and celebrations. 
            We provide accurate countdowns, cultural insights, and celebration guides to help 
            you make the most of every holiday.
          </p>
          <p className="text-lg text-muted-foreground">
            Our mission is to help people understand and celebrate American holidays, 
            fostering cultural appreciation and creating meaningful celebrations for everyone.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}