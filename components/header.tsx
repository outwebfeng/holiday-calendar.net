"use client";

import { useTranslations } from 'next-intl';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center">
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <img 
            src="/favicon.ico"
            alt={t('navigation.logoAlt')}
            className="h-6 w-6"
          />
          <span className="font-bold text-xl">{t('navigation.title')}</span>
        </Link>

        {/* Center Navigation */}
        <div className="flex-1 flex justify-center space-x-6">
          <Button variant="ghost" asChild>
            <Link href={`/${locale}`}>{t('navigation.home')}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/holidays`}>{t('navigation.holidays')}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/about`}>{t('navigation.about')}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/contact`}>{t('navigation.contact')}</Link>
          </Button>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={t('navigation.githubUrl')} target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">{t('navigation.github')}</span>
            </a>
          </Button>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}