import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";

export default async function Footer() {
  const footerT = await getTranslations("footer");
  const navT = await getTranslations("navigation");

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{footerT("title")}</h3>
            <p className="text-gray-600 mb-4">
              {footerT("description")}
            </p>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>{footerT("email")}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900">{footerT("quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  {navT("about")}
                </a>
              </li>
              <li>
                <a href="/holidays" className="text-gray-600 hover:text-gray-900">
                  {navT("holidays")}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-gray-900">
                  {navT("contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-900">{footerT("legal")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900">
                  {footerT("privacy")}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900">
                  {footerT("terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            {footerT("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}