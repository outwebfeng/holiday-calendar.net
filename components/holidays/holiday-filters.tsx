"use client";

import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from 'next-intl';

interface HolidayFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function HolidayFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange
}: HolidayFiltersProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center space-x-3">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[130px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder={t('holidays.sortBy.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">{t('holidays.sortBy.date')}</SelectItem>
          <SelectItem value="name">{t('holidays.sortBy.name')}</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t('holidays.search')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
}