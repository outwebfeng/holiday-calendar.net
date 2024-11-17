"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { ChevronDown, Globe, Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { LANGUAGES } from '@/i18n';
import { useParams } from 'next/navigation';

export default function Header() {
  const t = useTranslations("navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const params = useParams();
  const currentLocale = params.locale as string;

  // 获取当前语言的标签
  const getCurrentLanguageLabel = () => {
    const currentLanguage = LANGUAGES.find(lang => lang.code === currentLocale);
    return currentLanguage?.label || 'Language';
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold">
              Holiday Calendar
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                {t("home")}
              </Link>
              <Link href="/holidays" className="text-gray-700 hover:text-gray-900">
                {t("holidays")}
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                {t("about")}
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                {t("contact")}
              </Link>
            </div>
          </div>

          {/* Language Switcher Dropdown */}
          <div className="hidden md:flex items-center">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100">
                <Globe className="h-5 w-5" />
                <span>{getCurrentLanguageLabel()}</span>
                <ChevronDown className="h-4 w-4" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {LANGUAGES.map((lang) => (
                    <Menu.Item key={lang.code}>
                      {({ active }) => (
                        <Link
                          href={lang.href}
                          locale={lang.code}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } flex px-4 py-2 text-sm ${
                            currentLocale === lang.code ? 'font-semibold' : ''
                          }`}
                        >
                          {lang.label}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                {t("home")}
              </Link>
              <Link
                href="/holidays"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                {t("holidays")}
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                {t("about")}
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                {t("contact")}
              </Link>
              
              {/* Mobile Language Menu */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  {getCurrentLanguageLabel()}
                </div>
                {LANGUAGES.map((lang) => (
                  <Link
                    key={lang.code}
                    href={lang.href}
                    locale={lang.code}
                    className={`block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md ${
                      currentLocale === lang.code ? 'font-semibold bg-gray-50' : ''
                    }`}
                  >
                    {lang.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}