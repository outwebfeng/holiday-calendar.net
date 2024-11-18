"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HolidayCard } from './holiday-card';
import { HolidayFilters } from './holiday-filters';
import { Pagination } from './pagination';
import { Holiday } from '@/lib/get-holidays';
import { useTranslations } from 'next-intl';

const ITEMS_PER_PAGE = 9;

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
  locale: string;
}

export function HolidayList({ holidays, locale }: HolidayListProps) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');

  // Memoize filtered and sorted holidays
  const filteredHolidays = useMemo(() => {
    const filtered = [...holidays]
      .filter(holiday => 
        holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holiday.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
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
    setCurrentPage(1);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <HolidayFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      <AnimatePresence mode="wait">
        {filteredHolidays.length > 0 ? (
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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <p className="text-gray-500">{t('holidays.noResults')}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredHolidays.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
