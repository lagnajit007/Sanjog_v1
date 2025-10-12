'use client';

import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, MessageCircle, Share2, Upload, Crown, ThumbsUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock Data - Replace with Firebase data
const user = {
  avatar: 'https://picsum.photos/seed/1/48/48',
  displayName: 'Jenny Wilson',
};

const postsData = [
  {
    id: 'post1',
    user: {
      avatar: 'https://picsum.photos/seed/2/40/40',
      displayName: 'Alex Rivera',
    },
    timestamp: '2 hours ago',
    content: 'Just finished the alphabet challenge! Feeling accomplished. 🎉',
    mediaUrl: 'https://picsum.photos/seed/post1/600/300',
    likes: 12,
    comments: 3,
  },
  {
    id: 'post2',
    user: {
      avatar: 'https://picsum.photos/seed/3/40/40',
      displayName: 'Ben Carter',
    },
    timestamp: '5 hours ago',
    content: 'Practicing my greetings. How does this look?',
    mediaUrl: null,
    likes: 8,
    comments: 2,
  },
];

const leaderboardData = [
  { avatar: 'https://picsum.photos/seed/1/36/36', displayName: 'Jenny Wilson', xp: '118,487' },
  { avatar: 'https://picsum.photos/seed/2/36/36', displayName: 'Alex Rivera', xp: '105,231' },
  { avatar: 'https://picsum.photos/seed/3/36/36', displayName: 'Ben Carter', xp: '98,765' },
  { avatar: 'https://picsum.photos/seed/4/36/36', displayName: 'Chloe Garcia', xp: '95,112' },
  { avatar: 'https://picsum.photos/seed/5/36/36', displayName: 'David Lee', xp: '92,450' },
];

const challengesData = [
  { id: 'c1', title: '7-Day Streak Challenge', description: 'Practice every day for a week!', progress: 60 },
  { id: 'c2', title: 'Greeting Master', description: 'Learn 10 new greetings.', progress: 25 },
];

const commentsData = {
    post1: [
        { id: 'com1', user: { avatar: 'https://picsum.photos/seed/3/30/30', displayName: 'Ben Carter'}, comment: 'Awesome job!' },
        { id: 'com2', user: { avatar: 'https://picsum.photos/seed/4/30/30', displayName: 'Chloe Garcia'}, comment: 'Keep it up!'},
    ],
    post2: [
        { id: 'com3', user: { avatar: 'https://picsum.photos/seed/1/30/30', displayName: 'Jenny Wilson'}, comment: 'Looks great!' },
    ]
}

const CommunityPost = ({ post }: { post: typeof postsData[0] }) => {
    const [liked, setLiked] = useState(false);

    return (
        <Card className="mb-4">
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={post.user.avatar} alt={post.user.displayName} />
                        <AvatarFallback>{post.user.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">{post.user.displayName}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                </div>
                <p className="my-4">{post.content}</p>
                {post.mediaUrl && (
                    <img src={post.mediaUrl} alt="Post media" className="max-h-80 w-full rounded-lg object-cover" />
                )}
                <div className="mt-4 flex items-center justify-between border-t pt-2">
                    <Button variant="ghost" className="flex items-center gap-2" onClick={() => setLiked(!liked)}>
                        <Heart className={liked ? 'text-red-500 fill-current' : ''} /> 
                        <span>{post.likes + (liked ? 1 : 0)}</span>
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2">
                                <MessageCircle /> <span>{post.comments} Comments</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Comments</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                {(commentsData as any)[post.id]?.map((c: any) => (
                                    <div key={c.id} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={c.user.avatar} alt={c.user.displayName} />
                                            <AvatarFallback>{c.user.displayName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{c.user.displayName}</p>
                                            <p>{c.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Input placeholder="Write a comment..." />
                                <Button>Post</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <Share2 /> <span>Share</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function CommunityPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Panel: Community Feed */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Community Feed</h2>
        <Card className="mb-4">
          <CardContent className="p-4 flex flex-col gap-4">
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <Input placeholder="Share your sign practice or achievement..." />
            </div>
            <div className="flex justify-between items-center">
              <Button variant="ghost" className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                <span>Attach media</span>
              </Button>
              <Button className='rounded-full'>Post</Button>
            </div>
          </CardContent>
        </Card>

        <div>
            {postsData.map(post => <CommunityPost key={post.id} post={post} />)}
        </div>
      </div>

      {/* Right Panel: Sidebar */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Activity</h2>
        <Card className="mb-4">
          <CardHeader>
            <p className="font-bold">Top Learners This Week</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {leaderboardData.map((learner, index) => (
                <li key={learner.displayName} className="flex items-center gap-3">
                  <span className='font-bold w-6'>{index + 1}</span>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={learner.avatar} alt={learner.displayName} />
                    <AvatarFallback>{learner.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{learner.displayName}</p>
                    <p className="text-xs text-muted-foreground">{learner.xp} XP</p>
                  </div>
                  {index === 0 && <Crown className="h-5 w-5 text-yellow-400" />}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <p className="font-bold">Community Challenges</p>
            </CardHeader>
            <CardContent className="space-y-4">
                {challengesData.map(challenge => (
                    <div key={challenge.id} className="p-3 bg-secondary/50 rounded-lg">
                        <p className="font-semibold">{challenge.title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                        <Progress value={challenge.progress} className="h-2 mb-3" indicatorClassName="bg-primary" />
                        <Button size="sm" className="w-full rounded-full">Join Challenge</Button>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
