"use client";

import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Holiday Calendar</h3>
            <p className="text-gray-600 mb-4">
              Your comprehensive guide to American holidays and celebrations.
            </p>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>{t("email")}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="/holidays" className="text-gray-600 hover:text-gray-900">
                  Holidays
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-gray-900">
                  {t("contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900">
                  {t("privacy")}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900">
                  {t("terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Holiday Calendar. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}