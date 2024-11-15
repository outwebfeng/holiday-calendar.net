"use client";

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface CountdownProps {
  targetDate: string | Date;
  title: string;
  size?: 'default' | 'large';
}

export function Countdown({ targetDate, title, size = 'default' }: CountdownProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const getTargetDate = () => {
    return typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = getTargetDate();
      const diff = target.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isLarge = size === 'large';
  const containerClass = isLarge ? 'p-10' : 'p-6';
  const numberClass = isLarge 
    ? 'text-5xl md:text-6xl font-bold bg-primary text-primary-foreground w-24 h-24 rounded-xl flex items-center justify-center' 
    : 'text-3xl md:text-4xl font-bold bg-primary text-primary-foreground w-16 h-16 rounded-lg flex items-center justify-center';
  const labelClass = isLarge
    ? 'text-sm md:text-base font-medium text-muted-foreground mt-2'
    : 'text-xs md:text-sm font-medium text-muted-foreground mt-2';
  const titleClass = isLarge
    ? 'text-2xl md:text-3xl font-bold mb-8'
    : 'text-xl md:text-2xl font-semibold mb-6';

  return (
    <Card className={`${containerClass} backdrop-blur-sm bg-background/95`}>
      {title && (
        <div className="flex justify-between items-baseline mb-6">
          <h2 className={titleClass}>{title}</h2>
          <span className="text-muted-foreground text-sm shrink-0 ml-4">
            {getTargetDate().toLocaleDateString(
              locale === 'zh' ? 'zh-CN' : 'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }
            )}
          </span>
        </div>
      )}
      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {[
          { value: countdown.days, label: t('countdown.days') },
          { value: countdown.hours, label: t('countdown.hours') },
          { value: countdown.minutes, label: t('countdown.minutes') },
          { value: countdown.seconds, label: t('countdown.seconds') }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.div
              className={numberClass}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              {item.value}
            </motion.div>
            <div className={labelClass}>{item.label}</div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}