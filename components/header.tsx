"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Globe, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold">
              Holiday Calendar
            </Link>
          </div>

          {/* Desktop Navigation - Updated */}
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

          {/* Language Switcher - Moved to separate div */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/en" locale="en" className="text-gray-700">
              EN
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/zh" locale="zh" className="text-gray-700">
              中文
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              <Menu className="h-6 w-6" />
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
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link href="/en" locale="en" className="text-gray-700">
                  EN
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/zh" locale="zh" className="text-gray-700">
                  中文
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}