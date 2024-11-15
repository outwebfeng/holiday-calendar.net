"use client";

import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ReactNode } from "react";

interface LocaleProviderProps {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
  timeZone?: string;
}

export default function LocaleProvider({
  locale,
  messages,
  children,
  timeZone = "America/New_York"
}: LocaleProviderProps) {
  return (
    <NextIntlClientProvider 
      locale={locale} 
      messages={messages} 
      timeZone={timeZone}
      now={new Date()}
    >
      {children}
    </NextIntlClientProvider>
  );
}