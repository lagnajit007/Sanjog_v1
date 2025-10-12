
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Star } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import LessonCard from '@/components/lessons/lesson-card';

// Mock Data
const userProgress = {
  overallProgress: 45,
  badgeCount: 5,
  xpToNextBadge: 70,
};

const currentLesson = {
  id: 'L3',
  title: 'Essential Questions',
  thumbnail: 'https://picsum.photos/seed/lesson3/300/180',
  description: "Learn to ask 'who,' 'what,' 'where,' 'when,' and 'why.'",
  isUnlocked: true,
};

const allLessons = [
  { id: 'L1', title: 'Alphabet (A-E)', thumbnail: 'https://picsum.photos/seed/lesson1/300/180', category: 'Beginner', progress: 100, xpReward: 50, isUnlocked: true },
  { id: 'L2', title: 'Basic Greetings', thumbnail: 'https://picsum.photos/seed/lesson2/300/180', category: 'Beginner', progress: 100, xpReward: 50, isUnlocked: true },
  { id: 'L3', title: 'Essential Questions', thumbnail: 'https://picsum.photos/seed/lesson3/300/180', category: 'Beginner', progress: 60, xpReward: 75, isUnlocked: true },
  { id: 'L4', title: 'Family Members', thumbnail: 'https://picsum.photos/seed/lesson4/300/180', category: 'Beginner', progress: 0, xpReward: 75, isUnlocked: true },
  { id: 'L5', title: 'Feelings & Emotions', thumbnail: 'https://picsum.photos/seed/lesson5/300/180', category: 'Intermediate', progress: 0, xpReward: 100, isUnlocked: false },
  { id: 'L6', title: 'Restaurant Conversation', thumbnail: 'https://picsum.photos/seed/lesson6/300/180', category: 'Intermediate', progress: 0, xpReward: 120, isUnlocked: false },
  { id: 'L7', title: 'Telling Time', thumbnail: 'https://picsum.photos/seed/lesson7/300/180', category: 'Advanced', progress: 0, xpReward: 150, isUnlocked: false },
  { id: 'L8', title: 'Storytelling Basics', thumbnail: 'https://picsum.photos/seed/lesson8/300/180', category: 'Advanced', progress: 0, xpReward: 200, isUnlocked: false },
];

const recommendedNext = {
  id: 'L4',
  title: 'Family Members',
  thumbnail: 'https://picsum.photos/seed/lesson4/300/180',
};


export default function LessonsPage() {
  const beginnerLessons = allLessons.filter(l => l.category === 'Beginner');
  const intermediateLessons = allLessons.filter(l => l.category === 'Intermediate');
  const advancedLessons = allLessons.filter(l => l.category === 'Advanced');
  const specialLessons = allLessons.filter(l => l.category === 'Special Topics');

  return (
    <div className="p-4 sm:p-6 bg-background space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle className="text-2xl font-bold text-primary">Continue Learning</CardTitle>
            <div>
              <p className="text-sm font-medium text-right text-muted-foreground">Overall Progress</p>
              <Progress value={userProgress.overallProgress} className="w-40 h-2 mt-1" indicatorClassName="bg-accent-green" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Card className="overflow-hidden shadow-none border-secondary">
            <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                    <div className="p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-2">{currentLesson.title}</h3>
                        <p className="text-muted-foreground mb-4">{currentLesson.description}</p>
                        <Button className="w-full md:w-auto">Continue Lesson</Button>
                    </div>
                    <div className="hidden md:block">
                        <Image
                            src={currentLesson.thumbnail}
                            alt={currentLesson.title}
                            width={300}
                            height={180}
                            className="w-full h-full object-cover"
                            data-ai-hint="sign language lesson"
                        />
                    </div>
                </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Tabs defaultValue="beginner" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 rounded-xl">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="special">Special Topics</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
            <TabsContent value="beginner">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {beginnerLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="intermediate">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {intermediateLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="advanced">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {advancedLessons.map(lesson => <LessonCard key={lesson.id} lesson={lesson} />)}
                </div>
            </TabsContent>
            <TabsContent value="special">
                 <div className="text-center p-8 text-muted-foreground">
                    <p>No special topics yet. Check back soon!</p>
                </div>
            </TabsContent>
        </div>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Image
                        src={recommendedNext.thumbnail}
                        alt={recommendedNext.title}
                        width={150}
                        height={90}
                        className="rounded-lg object-cover"
                        data-ai-hint="learning sign language"
                    />
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Recommended Next Lesson</p>
                        <p className="font-semibold text-lg">{recommendedNext.title}</p>
                    </div>
                    <Button>Start Now</Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">Milestones & Rewards</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                     <div className="flex items-center gap-3">
                         <Award className="w-6 h-6 text-yellow-500" />
                         <p className="font-medium">Badges Unlocked: {userProgress.badgeCount}</p>
                     </div>
                     <div>
                        <div className="mb-1 flex justify-between">
                            <p className="text-sm font-medium">XP to Next Badge</p>
                            <span className="text-sm font-semibold">{userProgress.xpToNextBadge}%</span>
                        </div>
                        <Progress value={userProgress.xpToNextBadge} indicatorClassName="bg-accent-green" />
                     </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
