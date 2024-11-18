"use client";

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Holiday } from '@/lib/get-holidays';

interface HolidayCardProps {
  holiday: Holiday;
  locale: string;
}

export function HolidayCard({ holiday, locale }: HolidayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href={`/${locale}/holidays/${holiday.id}`}>
        <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-semibold">{holiday.name}</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(holiday.date).toLocaleDateString(locale, {
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
          <p className="text-muted-foreground line-clamp-2">
            {holiday.description}
          </p>
        </Card>
      </Link>
    </motion.div>
  );
}