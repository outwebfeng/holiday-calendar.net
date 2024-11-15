import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-6">
            By using Holiday Calendar, you agree to these terms of service. 
            Please read them carefully.
          </p>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Usage Terms</h2>
              <p className="text-muted-foreground">
                Our content is provided for informational purposes. You may use it for 
                personal, non-commercial purposes while providing appropriate attribution.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
              <p className="text-muted-foreground">
                We strive for accuracy but cannot guarantee that all information is 
                completely accurate or up-to-date at all times.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}