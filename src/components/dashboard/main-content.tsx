import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProgressCard from './progress-card';
import LearningCard from './learning-card';
import { progressCards, learningCards } from '@/lib/data';
import Link from 'next/link';

const MainContent = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative rounded-lg bg-primary p-8 text-primary-foreground shadow-lg overflow-hidden">
        <div className="absolute -right-10 -bottom-16 h-48 w-48 rounded-full bg-white/10"></div>
        <div className="absolute right-20 top-0 h-32 w-32 rounded-full bg-white/10"></div>
        <div className="relative z-10">
          <p className="mb-2 text-sm font-semibold uppercase">Online Course</p>
          <h2 className="mb-4 max-w-sm text-3xl font-bold">Learn Sign Language with Fun Gestures!</h2>
          <Link href="/learn">
            <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Start Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-bold">Your Progress</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {progressCards.map((card) => (
            <ProgressCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xl font-bold">Continue Learning</h3>
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent>
            {learningCards.map((card, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <LearningCard {...card} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -top-12 right-14" />
          <CarouselNext className="absolute -top-12 right-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default MainContent;
