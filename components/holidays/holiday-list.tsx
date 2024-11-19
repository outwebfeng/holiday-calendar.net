"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HolidayCard } from './holiday-card';
import { HolidayFilters } from './holiday-filters';
import { Pagination } from './pagination';
import { getAllHolidays } from '@/lib/get-holidays';
import { useTranslations } from 'next-intl';
import { LanguageCode } from '@/i18n';

const ITEMS_PER_PAGE = 24;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface HolidayListProps {
  holidays: Holiday[];
  locale: LanguageCode;
}

export function HolidayList({ holidays, locale }: HolidayListProps) {
  const t = useTranslations('holidays');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');

  // Memoize filtered and sorted holidays
  const filteredHolidays = useMemo(() => {
    let filtered = [...holidays];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(holiday => 
        holiday.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return a.name.localeCompare(b.name);
    });
  }, [holidays, searchTerm, sortBy]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredHolidays.length / ITEMS_PER_PAGE);

  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHolidays.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredHolidays, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <HolidayFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      <AnimatePresence mode="wait">
        {filteredHolidays.length > 0 ? (
          <>
            <motion.div
              key={`holiday-grid-${sortBy}`}
              variants={container}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentItems.map((holiday) => (
                <HolidayCard
                  key={`${holiday.id}-${sortBy}`}
                  holiday={holiday}
                  locale={locale}
                />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 text-muted-foreground"
          >
            {t('noResults')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
