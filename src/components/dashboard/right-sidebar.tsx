'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import ProgressCircle from './progress-circle';
import { badges, leaderboard } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { User, Flame, Trophy, Crown, Bell } from 'lucide-react';

const RightSidebarContent = () => {
  const userAvatar = PlaceHolderImages.find((img) => img.id === '1');
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-4">
          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Jenny Wilson" data-ai-hint={userAvatar.imageHint} />}
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
        <h3 className="text-lg font-semibold">Good Morning Jenny 🔥</h3>
        <p className="text-sm text-muted-foreground">Continue your learning to achieve your target!</p>
        <div className="mt-4">
          <ProgressCircle progress={32} size={120} />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Badges 06/60</h4>
          <Button variant="link" className="h-auto p-0 text-primary">View all</Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((badge) => (
            <Badge key={badge.label} variant="outline" className={`font-medium ${badge.color}`}>{badge.label}</Badge>
          ))}
        </div>
      </div>
      
      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Leaderboard</h4>
          <Button variant="link" className="h-auto p-0 text-primary">View all</Button>
        </div>
        <ul className="space-y-4">
          {leaderboard.map((entry, index) => {
            const avatar = PlaceHolderImages.find((img) => img.id === entry.avatarId);
            return (
              <li key={index} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {avatar && <AvatarImage src={avatar.imageUrl} alt={entry.name} data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">{entry.points}</p>
                </div>
                <div className="text-right">
                  {entry.icon && <entry.icon className="h-5 w-5 text-yellow-400" />}
                  <p className="text-xs font-bold text-muted-foreground">{entry.level}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

const RightSidebar = () => {
  const userAvatar = PlaceHolderImages.find((img) => img.id === '1');
  return (
    <>
      {/* Desktop */}
      <aside className="hidden xl:flex w-[320px] flex-col gap-8 border-l bg-card p-6">
        <RightSidebarContent />
      </aside>

      {/* Mobile top bar items */}
      <div className="xl:hidden flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Flame className="h-6 w-6 text-[#FF6C3E]" />
            <span className="font-bold text-sm">7 Days</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold text-sm">1250 XP</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col w-[320px] p-6 gap-8 overflow-auto bg-white">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <div className="text-center text-muted-foreground py-12">
                <p>No new notifications</p>
              </div>
            </SheetContent>
        </Sheet>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Jenny Wilson" data-ai-hint={userAvatar.imageHint} />}
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

      </div>
    </>
  );
};


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default RightSidebar;
