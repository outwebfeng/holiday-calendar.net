import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Have questions or suggestions? We'd love to hear from you. 
            Get in touch with us using the information below.
          </p>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Email:</strong> support@holidaycalendar.com
            </p>
            <p className="text-muted-foreground">
              <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}