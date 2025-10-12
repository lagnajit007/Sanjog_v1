
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Flame, Crown, Play, Pause, X, Trophy, Star, Shield, Zap, Award, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProgressCircle from '@/components/dashboard/progress-circle';
import { Label } from '@/components/ui/label';

// Mock Data
const challengeProgress = {
  currentStreak: 3,
  xpProgress: 60,
  motivationMessage: "You've completed 3 challenges today! Keep it up!",
};

const challenges = [
  { id: 'c1', title: 'Speed Sign', description: 'Sign as many words as possible in 60 seconds.', thumbnail: 'https://picsum.photos/seed/speed/300/180', xpReward: 50, isUnlocked: true },
  { id: 'c2', title: 'Accuracy Quest', description: 'Perfectly sign 10 words in a row.', thumbnail: 'https://picsum.photos/seed/accuracy/300/180', xpReward: 75, isUnlocked: true },
  { id: 'c3', title: 'Story Time', description: 'Narrate a short story using signs.', thumbnail: 'https://picsum.photos/seed/story/300/180', xpReward: 100, isUnlocked: false },
  { id: 'c4', title: 'Emoji Challenge', description: 'Guess the sign for the emoji shown.', thumbnail: 'https://picsum.photos/seed/emoji/300/180', xpReward: 40, isUnlocked: true },
];

const leaderboard = {
    daily: [
        { rank: 1, username: 'Liam', xp: 1200, avatar: 'https://picsum.photos/seed/liam/40/40' },
        { rank: 2, username: 'Ava', xp: 1150, avatar: 'https://picsum.photos/seed/ava/40/40' },
        { rank: 3, username: 'Noah', xp: 1100, avatar: 'https://picsum.photos/seed/noah/40/40' },
    ],
    weekly: [
        { rank: 1, username: 'Jenny Wilson', xp: 18487, avatar: 'https://picsum.photos/seed/1/40/40' },
        { rank: 2, username: 'Alex Rivera', xp: 15231, avatar: 'https://picsum.photos/seed/2/40/40' },
        { rank: 3, username: 'Ben Carter', xp: 14765, avatar: 'https://picsum.photos/seed/3/40/40' },
    ],
    allTime: [
        { rank: 1, username: 'SuperSigner', xp: 150200, avatar: 'https://picsum.photos/seed/supersigner/40/40' },
        { rank: 2, username: 'SignPro', xp: 145000, avatar: 'https://picsum.photos/seed/signpro/40/40' },
        { rank: 3, username: 'Handy', xp: 130000, avatar: 'https://picsum.photos/seed/handy/40/40' },
    ],
}

const user = {
  level: 8,
  xp: 750,
  streak: 12,
  xpProgress: 75,
  nextBadgeMessage: 'Just 5 more lessons to earn the "Lesson Pro" badge!',
  milestones: {
    lessonsCompleted: 45,
    challengesWon: 8,
  },
  totalBadges: 15,
  totalBadgesCount: 30,
};

const badges = [
  { id: 'b1', icon: 'A', title: 'Alphabet Ace', earned: true, category: 'Skill', description: 'Mastered all 26 alphabet signs.', xpReward: 100 },
  { id: 'b2', icon: '1️⃣', title: 'Number Ninja', earned: true, category: 'Skill', description: 'Learned numbers 0-9.', xpReward: 50 },
  { id: 'b3', icon: '🔥', title: '7-Day Streak', earned: true, category: 'Streak', description: 'Logged in for 7 consecutive days.', xpReward: 75 },
  { id: 'b4', icon: '🏆', title: 'Greeting Guru', earned: true, category: 'Challenge', description: 'Won the greetings challenge.', xpReward: 120 },
  { id: 'b5', icon: '✨', title: 'Quick Learner', earned: false, category: 'Skill', description: 'Completed a lesson in under 5 minutes.', xpReward: 50 },
  { id: 'b6', icon: '🛡️', title: 'Weekend Warrior', earned: true, category: 'Streak', description: 'Practiced on a Saturday and Sunday.', xpReward: 40 },
  { id: 'b7', icon: '⚡', title: 'Challenge Champ', earned: false, category: 'Challenge', description: 'Win 5 community challenges.', xpReward: 200 },
  { id: 'b8', icon: '🏅', title: 'Perfect Score', earned: true, category: 'Skill', description: 'Achieved 100% accuracy in a lesson.', xpReward: 150 },
];

const latestBadge = badges[3];

const getIcon = (iconStr: string) => {
    switch(iconStr) {
        case '🔥': return <Flame className="h-10 w-10 text-accent-orange" />;
        case '🏆': return <Trophy className="h-10 w-10 text-yellow-500" />;
        case '✨': return <Star className="h-10 w-10 text-yellow-400" />;
        case '🛡️': return <Shield className="h-10 w-10 text-blue-500" />;
        case '⚡': return <Zap className="h-10 w-10 text-yellow-400" />;
        case '🏅': return <Award className="h-10 w-10 text-primary" />;
        default: return <span className="text-4xl">{iconStr}</span>;
    }
}

const BadgeCard = ({ badge }: { badge: typeof badges[0] }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Card
                className={`flex cursor-pointer flex-col items-center justify-center p-4 text-center transition-all hover:shadow-lg hover:-translate-y-1 ${
                badge.earned ? 'bg-card border-primary/50' : 'bg-secondary/50 border-dashed opacity-60'
                }`}
            >
                <div className="mb-2">{getIcon(badge.icon)}</div>
                <p className="font-semibold text-sm">{badge.title}</p>
            </Card>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">{badge.title}</DialogTitle>
            </DialogHeader>
            <div className="text-center">
                <div className="mx-auto my-4 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                    {getIcon(badge.icon)}
                </div>
                <p className="text-muted-foreground">{badge.description}</p>
                <p className="mt-2 font-bold text-primary">XP Reward: {badge.xpReward}</p>
                {badge.earned ? (
                    <Button variant="secondary" className="mt-4 w-full" disabled>Already Claimed</Button>
                ) : (
                    <Button className="mt-4 w-full bg-accent-green text-white hover:bg-accent-green/90">Claim Reward</Button>
                )}
            </div>
        </DialogContent>
    </Dialog>
);

const ChallengeCard = ({ challenge, onPlay }: { challenge: typeof challenges[0], onPlay: (challenge: any) => void }) => {
  return (
    <Card className={`flex flex-col overflow-hidden transition-transform hover:scale-105 ${!challenge.isUnlocked && 'opacity-60'}`}>
      <Image src={challenge.thumbnail} alt={challenge.title} width={300} height={180} className="w-full object-cover" data-ai-hint="sign language challenge" />
      <CardContent className="p-4 flex flex-col flex-1">
        <p className="font-semibold text-lg">{challenge.title}</p>
        <p className="text-sm text-muted-foreground flex-1 mt-1">{challenge.description}</p>
        <p className="font-bold text-accent-green my-2">+{challenge.xpReward} XP</p>
        <Button onClick={() => onPlay(challenge)} disabled={!challenge.isUnlocked}>
          <Play className="mr-2 h-4 w-4" /> Play Now
        </Button>
      </CardContent>
    </Card>
  );
};

const LeaderboardList = ({ players }: { players: any[] }) => (
    <ul className="space-y-3">
        {players.map((player, index) => (
            <li key={player.username} className="flex items-center gap-4 rounded-lg bg-secondary/50 p-3">
                <span className="font-bold text-lg w-6 text-center">{player.rank}</span>
                <Avatar>
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback>{player.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-semibold flex-1">{player.username}</span>
                <span className="font-bold text-primary">{player.xp.toLocaleString()} XP</span>
                {index === 0 && <Crown className="text-yellow-500" />}
            </li>
        ))}
    </ul>
);

const ActiveChallengeModal = ({ challenge, isOpen, onClose }: { challenge: any | null, isOpen: boolean, onClose: () => void }) => {
    if (!challenge) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold text-center">{challenge.title}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-8 space-y-4">
                        <p className="text-lg text-muted-foreground">Sign the word:</p>
                        <p className="text-4xl font-bold text-primary">"HELLO"</p>
                        <div className="text-5xl font-bold text-accent-orange">00:45</div>
                        <p className="font-semibold text-accent-green">Correct!</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-black/80">
                         <Image src="https://picsum.photos/seed/webcam/400/300" width={400} height={300} alt="Webcam feed" className="rounded-md" data-ai-hint="webcam person signing"/>
                         <p className="mt-4 text-xl font-bold text-white">92% Accuracy</p>
                    </div>
                </div>
                 <div className="flex justify-center gap-4 bg-secondary/30 p-4">
                    <Button variant="outline"><Pause className="mr-2 h-4 w-4" /> Pause</Button>
                    <Button variant="destructive"><X className="mr-2 h-4 w-4" /> End Challenge</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};


export default function PlayPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState<any | null>(null);
    const totalBadgesProgress = (user.totalBadges / user.totalBadgesCount) * 100;
    const lessonsProgress = (user.milestones.lessonsCompleted / 100) * 100;
    const challengesProgress = (user.milestones.challengesWon / 10) * 100;
    const skillBadges = badges.filter(b => b.category === 'Skill');
    const streakBadges = badges.filter(b => b.category === 'Streak');
    const challengeBadges = badges.filter(b => b.category === 'Challenge');

    const handlePlay = (challenge: any) => {
        setActiveChallenge(challenge);
        setIsModalOpen(true);
    }

  return (
    <div className="space-y-6">
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-primary">Your Daily Challenge Progress</h2>
            <div className="flex items-center gap-2 font-bold text-accent-orange text-lg">
              <Flame />
              <span>{challengeProgress.currentStreak} Day Streak</span>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={challengeProgress.xpProgress} indicatorClassName="bg-accent-green" className="h-3" />
            <p className="mt-2 text-center text-sm font-semibold text-primary">{challengeProgress.motivationMessage}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {challenges.map(c => <ChallengeCard key={c.id} challenge={c} onPlay={handlePlay} />)}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="allTime">All-time</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-4">
                <LeaderboardList players={leaderboard.daily} />
            </TabsContent>
            <TabsContent value="weekly" className="mt-4">
                <LeaderboardList players={leaderboard.weekly} />
            </TabsContent>
            <TabsContent value="allTime" className="mt-4">
                <LeaderboardList players={leaderboard.allTime} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ActiveChallengeModal challenge={activeChallenge} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
    <div className="">
      <div className="flex flex-col gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">Level {user.level}</span>
                  <span className="text-muted-foreground">{user.xp} XP</span>
                  <span className="mt-1 flex items-center font-semibold text-accent-orange">
                    <Flame className="mr-1 h-5 w-5" /> {user.streak} Day Streak
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <ProgressCircle progress={user.xpProgress} size={100} />
              </div>
              <p className="text-center font-semibold text-primary md:text-left">{user.nextBadgeMessage}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-card p-0">
                <TabsTrigger value="all" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">All Badges</TabsTrigger>
                <TabsTrigger value="skill" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">Skill</TabsTrigger>
                <TabsTrigger value="streak" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">Streak</TabsTrigger>
                <TabsTrigger value="challenge" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">Challenge</TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="all">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {badges.map(badge => <BadgeCard key={badge.id} badge={badge} />)}
                  </div>
                </TabsContent>
                 <TabsContent value="skill">
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                     {skillBadges.map(badge => <BadgeCard key={badge.id} badge={badge} />)}
                   </div>
                 </TabsContent>
                 <TabsContent value="streak">
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                     {streakBadges.map(badge => <BadgeCard key={badge.id} badge={badge} />)}
                   </div>
                 </TabsContent>
                 <TabsContent value="challenge">
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                     {challengeBadges.map(badge => <BadgeCard key={badge.id} badge={badge} />)}
                   </div>
                 </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Milestone Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <div className="mb-1 flex justify-between">
                            <Label>Total Badges Earned</Label>
                            <span className="text-sm font-semibold">{user.totalBadges}/{user.totalBadgesCount}</span>
                        </div>
                        <Progress value={totalBadgesProgress} indicatorClassName="bg-primary" />
                     </div>
                     <div>
                        <div className="mb-1 flex justify-between">
                            <Label>Lessons Completed</Label>
                            <span className="text-sm font-semibold">{user.milestones.lessonsCompleted}/100</span>
                        </div>
                        <Progress value={lessonsProgress} indicatorClassName="bg-accent-green" />
                     </div>
                     <div>
                        <div className="mb-1 flex justify-between">
                            <Label>Challenges Won</Label>
                            <span className="text-sm font-semibold">{user.milestones.challengesWon}/10</span>
                        </div>
                        <Progress value={challengesProgress} indicatorClassName="bg-accent-orange" />
                     </div>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Featured Achievement</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-3">
                            {getIcon(latestBadge.icon)}
                        </div>
                        <p className="text-lg font-bold">{latestBadge.title}</p>
                        <p className="text-muted-foreground text-sm">{latestBadge.description}</p>
                    </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button className="w-full">
                        <Share2 className="mr-2 h-4 w-4" /> Share to Community
                    </Button>
                </div>
            </Card>
        </div>
      </div>
    </div>
    </div>
  );
}
