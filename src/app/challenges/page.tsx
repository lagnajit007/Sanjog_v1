
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Flame, Crown, Play, Pause, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


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


export default function ChallengesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState<any | null>(null);

    const handlePlay = (challenge: any) => {
        setActiveChallenge(challenge);
        setIsModalOpen(true);
    }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-background font-body space-y-6">
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
  );
}
