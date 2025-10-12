
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Lesson = {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  progress: number;
  xpReward: number;
  isUnlocked: boolean;
};

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  return (
    <Card className={cn("overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col", !lesson.isUnlocked && "bg-secondary/50 opacity-70")}>
        <div className="relative">
            <Image
                src={lesson.thumbnail}
                alt={lesson.title}
                width={300}
                height={180}
                className="w-full object-cover aspect-video"
                data-ai-hint="sign language gestures"
            />
            {lesson.progress === 100 && (
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-accent-green/80 px-2 py-1 text-xs font-semibold text-white">
                    <CheckCircle className="h-4 w-4" />
                    <span>Completed</span>
                </div>
            )}
        </div>
      <CardContent className="p-4 flex flex-col flex-1">
        <p className="font-semibold text-lg mb-2 flex-1">{lesson.title}</p>
        <div className="mb-3">
          <Progress value={lesson.progress} className="h-2" indicatorClassName="bg-primary" />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{lesson.category}</span>
          <span className="font-semibold text-accent-green">+{lesson.xpReward} XP</span>
        </div>
        <Button className="w-full mt-auto" disabled={!lesson.isUnlocked}>
          {lesson.isUnlocked ? 'Start Lesson' : <Lock className="mr-2 h-4 w-4" />}
          {!lesson.isUnlocked && 'Locked'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
