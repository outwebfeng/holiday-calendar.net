import { redirect } from 'next/navigation';

// Redirect from / to /en (default locale)
export default function RootPage() {
  redirect('/en');
}