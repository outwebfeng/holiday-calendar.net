"use client";

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, History, PartyPopper, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Countdown } from '@/components/countdown';
import { Holiday } from '@/lib/get-holidays';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export function HolidayDetail({ holiday }: { holiday: Holiday }) {
  const t = useTranslations();

  return (
    <main className="pt-32 pb-16 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{holiday.name}</h1>
          <p className="text-xl text-muted-foreground">
            <Calendar className="inline-block mr-2 h-5 w-5" />
            {new Date(holiday.date).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>

        {/* Countdown Section */}
        <motion.div
          className="mb-12"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
        >
          <Countdown targetDate={holiday.date} size="large" />
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="celebration">Celebration</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-6">
              <motion.div
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={fadeIn.transition}
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {holiday.description}
                </p>
              </motion.div>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-6">
              <motion.div
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={fadeIn.transition}
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Historical Background
                </h2>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {holiday.origin}
                    </p>
                  </div>
                </ScrollArea>
              </motion.div>
            </Card>
          </TabsContent>

          <TabsContent value="celebration">
            <Card className="p-6">
              <motion.div
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={fadeIn.transition}
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Celebration Guide
                </h2>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {holiday.guide}
                    </p>
                  </div>
                </ScrollArea>
              </motion.div>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines">
            <Card className="p-6">
              <motion.div
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={fadeIn.transition}
              >
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Important Guidelines
                </h2>
                <Alert className="mb-6">
                  <AlertDescription>
                    Please review these important guidelines to ensure a respectful and safe celebration.
                  </AlertDescription>
                </Alert>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <div className="whitespace-pre-line text-muted-foreground">
                      {holiday.taboos}
                    </div>
                  </div>
                </ScrollArea>
              </motion.div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Share Section */}
        <motion.div
          className="mt-12 text-center"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            Share this holiday with friends and family to celebrate together!
          </p>
        </motion.div>
      </div>
    </main>
  );
}