import type { LucideIcon } from 'lucide-react';
import { Grid, BookOpen, Trophy, Target, BarChart, Users, Crown, Hand, User } from 'lucide-react';

export type MenuItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
};

export const menuItems: MenuItem[] = [
  { icon: Grid, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: Hand, label: 'Practice', href: '/practice' },
  { icon: BookOpen, label: 'Lessons', href: '#' },
  { icon: Trophy, label: 'Achievements', href: '#' },
  { icon: Target, label: 'Challenges', href: '#' },
  { icon: BarChart, label: 'Progress', href: '#' },
  { icon: Users, label: 'Community', href: '#', badge: '32' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export type ProgressCardData = {
  title: string;
  value: string;
  progress: number;
  color: string;
};

export const progressCards: ProgressCardData[] = [
  { title: 'Daily Streak', value: '7 Days', progress: 86, color: 'bg-accent-blue' },
  { title: 'Lessons Completed', value: '12/48', progress: 25, color: 'bg-accent-orange' },
  { title: 'Skills Mastered', value: '3/10', progress: 30, color: 'bg-accent-green' },
];

export type LearningCardData = {
  background: string;
  title: string;
  subtitle: string;
  category: string;
};

export const learningCards: LearningCardData[] = [
  { background: 'bg-secondary', title: 'A-Z', subtitle: "Beginner’s Guide to Learn Alphabets (A-Z).", category: 'Alphabets' },
  { background: 'bg-[#C9D8FF]', title: '0-9', subtitle: "Beginner’s Guide to Learn Numbers (0-9).", category: 'Numbers' },
  { background: 'bg-[#D2C5FF]', title: 'Greetings', subtitle: "Learn common greetings and introductions.", category: 'Social' },
  { background: 'bg-pink-200', title: 'Family', subtitle: "Learn signs for family members.", category: 'People' },
];

export type BadgeData = {
  label: string;
  color: string;
};

export const badges: BadgeData[] = [
    { label: 'Alphabet Ace', color: 'border-accent-orange text-accent-orange' },
    { label: 'Number Ninja', color: 'border-primary text-primary' },
    { label: 'Streak Keeper', color: 'border-accent-blue text-accent-blue' },
    { label: 'Quick Learner', color: 'border-secondary text-secondary-foreground' },
    { label: 'Weekend Warrior', color: 'border-accent-green text-accent-green' },
    { label: 'Perfect Score', color: 'border-destructive text-destructive' },
];

export type LeaderboardEntry = {
  name: string;
  points: string;
  level: string;
  avatar: string;
  avatarId: string;
  icon?: LucideIcon;
};

export const leaderboard: LeaderboardEntry[] = [
  { name: 'Jenny Wilson', points: '118,487 pts', level: 'Lvl 10', avatar: '1', avatarId: '1', icon: Crown },
  { name: 'Alex Rivera', points: '105,231 pts', level: 'Lvl 9', avatar: '2', avatarId: '2' },
  { name: 'Ben Carter', points: '98,765 pts', level: 'Lvl 9', avatar: '3', avatarId: '3' },
  { name: 'Chloe Garcia', points: '95,112 pts', level: 'Lvl 8', avatar: '4', avatarId: '4' },
];
