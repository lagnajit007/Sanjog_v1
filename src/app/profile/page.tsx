'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, Trophy, Edit, Camera, Palette, Bell, ShieldCheck, Mail, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const activityData = [
  { name: 'Jan', accuracy: 65 },
  { name: 'Feb', accuracy: 72 },
  { name: 'Mar', accuracy: 78 },
  { name: 'Apr', accuracy: 82 },
  { name: 'May', accuracy: 85 },
  { name: 'Jun', accuracy: 90 },
];

const recentSessions = [
    { title: 'Greetings Basics', type: 'Lesson', accuracy: '92%' },
    { title: 'Alphabet Challenge', type: 'Challenge', accuracy: '88%' },
    { title: 'Numbers Practice', type: 'Practice', accuracy: '95%' },
]

const ProfilePage = () => {
  const user = {
    avatar: 'https://picsum.photos/seed/1/120/120',
    displayName: 'Jenny Wilson',
    username: 'jennyw',
    bio: 'Learning sign language to connect with more people! ✨',
    streak: 7,
    xp: 1250,
    level: 10,
    xpForNextLevel: 1500,
    badges: ['Alphabet Ace', 'Number Ninja', 'Streak Keeper', 'Quick Learner'],
    email: 'jen.wilson@example.com',
  };
  
  const currentLevelXP = user.xp % 1000;
  const xpToNextLevel = 1000;
  const progressPercent = (currentLevelXP / xpToNextLevel) * 100;

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 bg-background">
      <Card className="w-full overflow-hidden rounded-2xl border-none shadow-lg bg-card mb-8">
        <CardContent className="p-8 text-center">
          <div className="relative mx-auto w-fit">
            <Avatar className="w-32 h-32 border-4 border-primary shadow-md">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute bottom-1 right-1 h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Camera className="h-5 w-5" />
            </Button>
          </div>

          <h2 className="mt-4 text-2xl font-bold">{user.displayName}</h2>
          <p className="text-muted-foreground">@{user.username}</p>
          <p className="mt-2 max-w-md mx-auto text-sm">{user.bio}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-2 font-semibold text-accent-orange">
              <Flame className="h-6 w-6" />
              <span>{user.streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-primary">
              <Trophy className="h-6 w-6" />
              <span>{user.xp.toLocaleString()} XP</span>
            </div>
          </div>
            
          <div className="mt-4 max-w-sm mx-auto">
            <div className="flex justify-between text-sm font-medium text-muted-foreground mb-1">
                <span>Level {user.level}</span>
                <span>{currentLevelXP} / {xpToNextLevel} XP</span>
            </div>
            <Progress value={progressPercent} className="h-3" indicatorClassName="bg-primary" />
          </div>

          <div className="mt-6">
            <Button className='rounded-full'>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Accuracy Over Time</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Recent Sessions</h3>
                    <ul className="space-y-4">
                        {recentSessions.map(session => (
                            <li key={session.title} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                                <div>
                                    <p className="font-semibold">{session.title}</p>
                                    <p className="text-sm text-muted-foreground">{session.type}</p>
                                </div>
                                <p className="font-semibold text-primary">{session.accuracy}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customization" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-color" className="text-base">Theme Color</Label>
                  <p className="text-sm text-muted-foreground">Customize the look of your dashboard.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" className="rounded-full w-8 h-8 bg-[#7B61FF] hover:bg-[#7B61FF]/90 border-2 border-primary"></Button>
                    <Button size="icon" variant="outline" className="rounded-full w-8 h-8 bg-[#00BCD4] hover:bg-[#00BCD4]/90"></Button>
                    <Button size="icon" variant="outline" className="rounded-full w-8 h-8 bg-[#FF9800] hover:bg-[#FF9800]/90"></Button>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="voice-feedback" className="text-base">Voice Feedback</Label>
                  <p className="text-sm text-muted-foreground">Get audio feedback during lessons.</p>
                </div>
                <Switch id="voice-feedback" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="captions" className="text-base">Captions Enabled</Label>
                   <p className="text-sm text-muted-foreground">Show captions on video content.</p>
                </div>
                <Switch id="captions" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
           <Card>
                <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Full Activity Log</h3>
                    <ul className="space-y-2">
                        {recentSessions.concat(recentSessions).map((session, index) => (
                            <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50">
                                <div>
                                    <p className="font-semibold">{session.title}</p>
                                    <p className="text-sm text-muted-foreground">{new Date(Date.now() - index * 3600000).toLocaleString()}</p>
                                </div>
                                <div className="w-1/4">
                                     <Progress value={parseInt(session.accuracy)} indicatorClassName="bg-primary" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
                 <h3 className="font-bold text-xl">Account Settings</h3>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="w-6 h-6 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                        </div>
                    </div>
                    <Button variant="outline">Change Password</Button>
                 </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                        <Bell className="w-6 h-6 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Lesson reminders, progress updates, and more.</p>
                        </div>
                    </div>
                    <Switch defaultChecked />
                 </div>
                 <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
                    <div className="flex items-center gap-4">
                        <Trash2 className="w-6 h-6 text-destructive" />
                        <div>
                            <p className="font-medium text-destructive">Delete Account</p>
                            <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                        </div>
                    </div>
                    <Button variant="destructive" >Delete</Button>
                 </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
