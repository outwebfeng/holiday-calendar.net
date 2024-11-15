"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout';
import { HolidayCard } from '@/components/holidays/holiday-card';
import { HolidayFilters } from '@/components/holidays/holiday-filters';
import { Pagination } from '@/components/holidays/pagination';
import { Holiday, getHolidays } from '@/lib/get-holidays';

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

export default function HolidaysPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as 'en' | 'zh';
  const t = useTranslations();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHolidays = async () => {
      try {
        const data = await getHolidays(locale);
        setHolidays(data);
      } catch (error) {
        console.error('Failed to load holidays:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHolidays();
  }, [locale]);

  const filteredHolidays = holidays
    .filter(holiday => 
      holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  const totalPages = Math.ceil(filteredHolidays.length / ITEMS_PER_PAGE);
  const paginatedHolidays = filteredHolidays.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  if (loading) {
    return (
      <Layout>
        <main className="pt-32 pb-16 container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="pt-32 pb-16 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-4xl font-bold">{t('navigation.holidays')}</h1>
            <HolidayFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginatedHolidays.map(holiday => (
              <HolidayCard
                key={holiday.id}
                holiday={holiday}
                locale={locale}
              />
            ))}
          </motion.div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {filteredHolidays.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('holidays.noResults')}</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}