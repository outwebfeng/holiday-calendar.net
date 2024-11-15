import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Your privacy is important to us. This Privacy Policy explains how we collect, 
            use, and protect your personal information.
          </p>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect minimal information necessary to provide our services, 
                including basic usage statistics and any information you voluntarily provide.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use your information to provide and improve our services, 
                send notifications you've requested, and enhance your experience.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}