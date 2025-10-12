'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Flame, Star, Award } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// Mock Data based on the provided Firebase Data Model
const userProgress = {
  level: 8,
  xp: 2450,
  streak: 12,
  averageAccuracy: 88,
  motivationMessage: "You're on fire! Keep up the great work!",
  xpHistory: [
    { date: 'Oct 1', xp: 100 },
    { date: 'Oct 2', xp: 250 },
    { date: 'Oct 3', xp: 180 },
    { date: 'Oct 4', xp: 300 },
    { date: 'Oct 5', xp: 220 },
    { date: 'Oct 6', xp: 400 },
  ],
  accuracyHistory: [
    { date: 'Oct 1', accuracy: 85 },
    { date: 'Oct 2', accuracy: 92 },
    { date: 'Oct 3', accuracy: 88 },
    { date: 'Oct 4', accuracy: 95 },
    { date: 'Oct 5', accuracy: 90 },
    { date: 'Oct 6', accuracy: 94 },
  ],
  lessonMastery: [
    { subject: 'Alphabet', A: 90, fullMark: 100 },
    { subject: 'Numbers', A: 70, fullMark: 100 },
    { subject: 'Gestures', A: 85, fullMark: 100 },
    { subject: 'Phrases', A: 60, fullMark: 100 },
    { subject: 'Greetings', A: 95, fullMark: 100 },
  ],
  practiceTime: [
    { name: 'Lessons', value: 40 },
    { name: 'Challenges', value: 30 },
    { name: 'Free Practice', value: 30 },
  ],
  aiInsights: {
    strengths: ['Handshape Accuracy'],
    weaknesses: ['Movement Smoothness'],
    recommendation: 'Conversation Signs Lesson',
  },
  streakProgress: (12 / 14) * 100,
  streakMessage: 'You are just 2 days away from the "14-Day Streak" badge!',
  badgeCount: 8,
  nextBadge: { title: 'Alphabet Pro' },
};

const PIE_CHART_COLORS = ['#6C4CF1', '#4CE1C6', '#FF6C3E'];

const MetricCard = ({ label, value, icon: Icon, color, suffix }: { label: string; value: string | number; icon?: React.ElementType, color: string, suffix?: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-6 w-6" style={{ color }} />}
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <span className="text-2xl font-bold" style={{ color }}>{value}{suffix}</span>
  </div>
);

const ProgressPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 bg-background font-body">
      <Card>
        <CardHeader>
          <CardTitle>Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-around gap-y-4">
            <MetricCard label="Level" value={userProgress.level} color="#6C4CF1" />
            <MetricCard label="Total XP" value={userProgress.xp.toLocaleString()} color="#4CE1C6" />
            <MetricCard label="Current Streak" value={userProgress.streak} icon={Flame} color="#FF6C3E" suffix=" Days" />
            <MetricCard label="Avg. Accuracy" value={userProgress.averageAccuracy} color="#6C4CF1" suffix="%" />
          </div>
          <p className="mt-6 text-center font-semibold text-primary">{userProgress.motivationMessage}</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>XP Growth Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userProgress.xpHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="xp" stroke="#6C4CF1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Accuracy Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userProgress.accuracyHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#4CE1C6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lesson Mastery Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={userProgress.lessonMastery}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Mastery" dataKey="A" stroke="#6C4CF1" fill="#6C4CF1" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Time Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={userProgress.practiceTime} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {userProgress.practiceTime.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-green-100/50 p-3">
              <Star className="h-5 w-5 text-accent-green" />
              <p>
                <span className="font-semibold text-accent-green">You’re best at: </span>
                {userProgress.aiInsights.strengths[0]}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-red-100/50 p-3">
              <Award className="h-5 w-5 text-destructive" />
              <p>
                <span className="font-semibold text-destructive">Needs improvement: </span>
                {userProgress.aiInsights.weaknesses[0]}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-blue-100/50 p-3">
              <Flame className="h-5 w-5 text-accent-blue" />
              <p>
                <span className="font-semibold text-accent-blue">Recommended next: </span>
                {userProgress.aiInsights.recommendation}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rewards Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <span className="font-semibold">Badges Earned:</span> {userProgress.badgeCount}
            </p>
            <p>
              <span className="font-semibold">Next Badge:</span> {userProgress.nextBadge.title}
            </p>
            <div>
              <div className="mb-1 flex justify-between">
                <label className="text-sm font-medium">Next Streak Badge</label>
                <span className="text-sm">{userProgress.streak}/14 Days</span>
              </div>
              <Progress value={userProgress.streakProgress} indicatorClassName="bg-primary" />
              <p className="mt-2 text-sm text-muted-foreground">{userProgress.streakMessage}</p>
            </div>
            <Button className="w-full">View All Achievements</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
