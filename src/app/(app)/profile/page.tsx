
'use client';

import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Star, Award, BarChart3, TrendingUp, UserPlus, CheckCircle, Edit, Users, Upload } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Mock Data
const initialUser = {
  name: 'Jenny Wilson',
  tagline: 'Lover of languages and lifelong learner.',
  level: 8,
  rank: 'Sign Master',
  xpPercent: 75,
  avatar: 'https://picsum.photos/seed/1/128/128',
};

const achievements = [
  { icon: Award, title: 'First 10 Signs', description: 'Learned your first 10 signs', locked: false },
  { icon: Flame, title: '7-Day Streak', description: 'Logged in for 7 days in a row', locked: false },
  { icon: Star, title: 'Perfect Lesson', description: 'Scored 100% on a lesson', locked: false },
  { icon: TrendingUp, title: 'Level 5', description: 'Reached level 5', locked: false },
  { icon: CheckCircle, title: 'Alphabet Ace', description: 'Mastered the full alphabet', locked: true },
  { icon: Award, title: 'Challenge Champ', description: 'Won 5 challenges', locked: true },
  { icon: Users, title: 'Community Helper', description: 'Helped 10 users in the community', locked: true },
  { icon: Star, title: 'Speed Signer', description: 'Completed a speed challenge', locked: true },
];

const learningStats = {
  signsLearned: 154,
  activeStreak: 12,
  accuracy: 92,
};

const weeklyProgress = [
  { day: 'Mon', xp: 20 },
  { day: 'Tue', xp: 45 },
  { day: 'Wed', xp: 30 },
  { day: 'Thu', xp: 60 },
  { day: 'Fri', xp: 80 },
  { day: 'Sat', xp: 95 },
  { day: 'Sun', xp: 50 },
];

const recentActivity = [
  { icon: Star, text: 'You earned the "Perfect Lesson" badge.', time: '2 hours ago' },
  { icon: CheckCircle, text: 'You completed the "Basic Greetings" lesson.', time: '1 day ago' },
  { icon: Users, text: 'You became friends with Alex Rivera.', time: '2 days ago' },
];

const friends = [
  { avatar: 'https://picsum.photos/seed/2/40/40' },
  { avatar: 'https://picsum.photos/seed/3/40/40' },
  { avatar: 'https://picsum.photos/seed/4/40/40' },
  { avatar: 'https://picsum.photos/seed/5/40/40' },
  { avatar: 'https://picsum.photos/seed/6/40/40' },
];

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <Card>
    <CardContent className="pt-6 text-center">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </CardContent>
  </Card>
);

const AchievementCard = ({ icon: Icon, title, locked }: { icon: React.ElementType, title: string, locked: boolean }) => (
  <Card className={`text-center p-4 transition-all hover:shadow-md hover:-translate-y-1 ${locked ? 'bg-secondary/50 opacity-60' : ''}`}>
    <Icon className="h-10 w-10 text-primary mx-auto mb-2" />
    <p className="font-semibold text-sm">{title}</p>
  </Card>
);

const EditProfileModal = ({ isOpen, onClose, user, onSave }: { isOpen: boolean, onClose: () => void, user: typeof initialUser, onSave: (updatedUser: {name: string, tagline: string, avatar: string}) => void }) => {
    const [name, setName] = useState(user.name);
    const [tagline, setTagline] = useState(user.tagline);
    const [avatar, setAvatar] = useState(user.avatar);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        onSave({ name, tagline, avatar });
        onClose();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setAvatar(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="w-4 h-4 mr-2" /> Change Avatar
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Username</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tagline">Bio/Tagline</Label>
                        <Textarea id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default function ProfilePage() {
    const [user, setUser] = useState(initialUser);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveProfile = (updatedUser: {name: string, tagline: string, avatar: string}) => {
        setUser(prevUser => ({...prevUser, ...updatedUser}));
    };

  return (
    <div className="space-y-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">My Profile</h1>
        <p className="text-muted-foreground mt-1">Track your progress, achievements, and milestones.</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full" onClick={() => setIsModalOpen(true)}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.tagline}</p>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                 <span className="inline-block bg-secondary text-secondary-foreground font-semibold px-3 py-1 text-sm rounded-full">
                    Level {user.level} • {user.rank}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>XP Progress</span>
                  <span>{user.xpPercent}%</span>
                </div>
                <Progress value={user.xpPercent} indicatorClassName="bg-primary" />
              </div>
            </div>
             <Button variant="outline" className="mt-4 sm:mt-0" onClick={() => setIsModalOpen(true)}>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements & Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {achievements.map((ach, index) => (
              <AchievementCard key={index} icon={ach.icon} title={ach.title} locked={ach.locked} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Signs Learned" value={learningStats.signsLearned} />
                <StatCard label="Active Streak" value={`${learningStats.activeStreak}🔥`} />
                <StatCard label="AI Accuracy" value={`${learningStats.accuracy}%`} />
            </div>
            <div>
              <h3 className="font-semibold text-center mb-4">Weekly XP Progress</h3>
               <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} />
                  <Bar dataKey="xp" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map((activity, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary">
                    <activity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p>{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
             <Button variant="link" className="w-full mt-4">View All Activity</Button>
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Friends & Connections</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {friends.map((friend, index) => (
                  <Avatar key={index} className="border-2 border-background">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-muted-foreground font-medium">+{friends.length} more</span>
            </div>
            <Button><UserPlus className="h-4 w-4 mr-2" /> Invite a Friend</Button>
          </CardContent>
        </Card>

        <EditProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={user}
            onSave={handleSaveProfile}
        />
    </div>
  );
}

    