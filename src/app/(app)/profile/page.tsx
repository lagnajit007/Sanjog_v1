

'use client';

import React from 'react';
import { useState, useRef, useEffect } from 'react';
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
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

// Mock Data
const achievements = [
    { title: 'First 10 Signs', description: 'Learned your first 10 signs', locked: false, gradientId: 'gradient-1' },
    { title: '7-Day Streak', description: 'Logged in for 7 days in a row', locked: false, gradientId: 'gradient-2' },
    { title: 'Perfect Lesson', description: 'Scored 100% on a lesson', locked: false, gradientId: 'gradient-3' },
    { title: 'Level 5', description: 'Reached level 5', locked: false, gradientId: 'gradient-4' },
    { title: 'Alphabet Ace', description: 'Mastered the full alphabet', locked: true, gradientId: 'gradient-5' },
    { title: 'Challenge Champ', description: 'Won 5 challenges', locked: true, gradientId: 'gradient-6' },
    { title: 'Community Helper', description: 'Helped 10 users in the community', locked: true, gradientId: 'gradient-7' },
    { title: 'Speed Signer', description: 'Completed a speed challenge', locked: true, gradientId: 'gradient-8' },
];

const badgeGradients = {
    'gradient-1': { from: '#FFD35E', to: '#FF8C00' },
    'gradient-2': { from: '#82F4B1', to: '#2E8B57' },
    'gradient-3': { from: '#A7B2FF', to: '#7B61FF' },
    'gradient-4': { from: '#FF954D', to: '#FF4500' },
    'gradient-5': { from: '#E0E0E0', to: '#A0A0A0' },
    'gradient-6': { from: '#E0E0E0', to: '#A0A0A0' },
    'gradient-7': { from: '#E0E0E0', to: '#A0A0A0' },
    'gradient-8': { from: '#E0E0E0', to: '#A0A0A0' },
};

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

const BadgeIcon = ({ gradientId }: { gradientId: string }) => {
    const gradient = badgeGradients[gradientId as keyof typeof badgeGradients] || { from: '#E0E0E0', to: '#A0A0A0' };
    return (
        <svg width="63" height="64" viewBox="0 0 63 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2">
            <defs>
                <linearGradient id={gradientId} x1="31.5" y1=".5" x2="31.5" y2="63.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor={gradient.from} />
                    <stop offset="1" stopColor={gradient.to} />
                </linearGradient>
            </defs>
            <path d="M26.5 3.387a10 10 0 0 1 10 0l17.28 9.976a10 10 0 0 1 5 8.66v19.954a10 10 0 0 1-5 8.66L36.5 60.613a10 10 0 0 1-10 0L9.22 50.637a10 10 0 0 1-5-8.66V22.024a10 10 0 0 1 5-8.66z" fill={`url(#${gradientId})`} />
            <g clipPath="url(#badge-clip)">
                <path d="M45.178 19.386a.28.28 0 0 0-.213-.22c-3.505-.856-11.603 2.198-15.99 6.583a19 19 0 0 0-2.133 2.52c-1.352-.12-2.705-.02-3.859.483-3.253 1.431-4.2 5.168-4.464 6.775a.576.576 0 0 0 .631.67l5.225-.576q.005.591.07 1.18c.027.271.148.525.342.717l2.023 2.019c.192.194.447.314.718.34q.584.066 1.173.072l-.574 5.218a.577.577 0 0 0 .67.631c1.605-.257 5.348-1.204 6.771-4.458.503-1.153.606-2.5.49-3.846a19 19 0 0 0 2.526-2.133c4.401-4.379 7.437-12.296 6.594-15.975M34.193 30.137a2.872 2.872 0 1 1 4.06-4.063 2.872 2.872 0 0 1-4.06 4.063" fill="#fff" />
                <path d="M26.673 40.999c-.328.328-.854.456-1.487.566-1.423.242-2.679-.987-2.423-2.425.097-.545.386-1.31.565-1.489a.262.262 0 0 0-.218-.446 3.6 3.6 0 0 0-2.102 1.025c-1.407 1.408-1.54 6.633-1.54 6.633s5.228-.133 6.634-1.541a3.57 3.57 0 0 0 1.026-2.104c.022-.25-.283-.4-.455-.22" fill="#fff" />
            </g>
            <defs>
                <clipPath id="badge-clip">
                    <path fill="#fff" d="M18.237 18.737h27.355v27.355H18.237z" />
                </clipPath>
            </defs>
        </svg>
    );
};


const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <Card>
    <CardContent className="pt-6 text-center">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </CardContent>
  </Card>
);

const AchievementCard = ({ gradientId, title, locked }: { gradientId: string, title: string, locked: boolean }) => (
  <Card className={`text-center p-4 transition-all hover:shadow-md hover:-translate-y-1 ${locked ? 'bg-secondary/50 opacity-60' : ''}`}>
    <BadgeIcon gradientId={gradientId} />
    <p className="font-semibold text-sm">{title}</p>
  </Card>
);

const EditProfileModal = ({ isOpen, onClose, user, onSave }: { isOpen: boolean, onClose: () => void, user: any, onSave: (updatedUser: {name: string, tagline: string, avatar: string}) => void }) => {
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
                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
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

const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
};

const ProfilePageSkeleton = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-96 mt-2" />
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1 w-full space-y-2">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-64" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-56" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="h-28 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <Skeleton className="h-7 w-64" />
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="h-10 w-40" />
          </CardContent>
        </Card>
    </div>
)

export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    const [profileData, setProfileData] = useState({
      name: 'Jenny Wilson',
      tagline: 'Lover of languages and lifelong learner.',
      level: 8,
      rank: 'Sign Master',
      xpPercent: 75,
      avatar: 'https://picsum.photos/seed/1/128/128',
    });

    useEffect(() => {
        if(user) {
            setProfileData(prev => ({
                ...prev,
                name: user.displayName || 'New User',
                avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'New+User'}&background=random&color=fff`,
                tagline: prev.tagline, // Keep mock tagline for now
            }));
        }
    }, [user]);

    const handleSaveProfile = (updatedUser: {name: string, tagline: string, avatar: string}) => {
        setProfileData(prevUser => ({...prevUser, ...updatedUser}));
        // Here you would typically also update the user profile in Firebase
    };
    
    const handleInvite = async () => {
        const shareData = {
            title: 'Join me on Sanjog!',
            text: 'Learn sign language with me on Sanjog, the fun and interactive AI-powered app!',
            url: window.location.origin
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled share, etc.
                console.error('Share failed:', err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            try {
                await navigator.clipboard.writeText(shareData.url);
                toast({
                    title: 'Link Copied!',
                    description: 'Invitation link copied to your clipboard.',
                });
            } catch (err) {
                console.error('Failed to copy: ', err);
                toast({
                    variant: 'destructive',
                    title: 'Failed to Copy',
                    description: 'Could not copy the invitation link.',
                });
            }
        }
    };


    if (isUserLoading) {
        return <ProfilePageSkeleton />;
    }

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
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback>{getInitials(profileData.name)}</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full" onClick={() => setIsModalOpen(true)}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.tagline}</p>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                 <span className="inline-block bg-secondary text-secondary-foreground font-semibold px-3 py-1 text-sm rounded-full">
                    Level {profileData.level} • {profileData.rank}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>XP Progress</span>
                  <span>{profileData.xpPercent}%</span>
                </div>
                <Progress value={profileData.xpPercent} indicatorClassName="bg-primary" />
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
              <AchievementCard key={index} gradientId={ach.gradientId} title={ach.title} locked={ach.locked} />
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
            <Button onClick={handleInvite}><UserPlus className="h-4 w-4 mr-2" /> Invite a Friend</Button>
          </CardContent>
        </Card>

        <EditProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={profileData}
            onSave={handleSaveProfile}
        />
    </div>
  );
}
