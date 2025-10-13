'use client';

import React, { useState } from 'react';
import LeftSidebar from '@/components/dashboard/left-sidebar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import LogoutConfirmationModal from '@/components/logout-confirmation-modal';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const HeaderRightContent = ({ onLogoutClick }: { onLogoutClick: () => void }) => {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <div className="flex items-center gap-4">
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
                {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />}
                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.displayName || 'New User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || 'No email'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                 <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Upgrade to Pro</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogoutClick} className="text-red-500 cursor-pointer focus:bg-red-100 focus:text-red-600">
                  Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

      </div>
    </>
  );
};

const AppLayoutSkeleton = () => (
  <div className="flex min-h-screen w-full bg-background text-foreground">
    {/* Sidebar Skeleton */}
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] flex-col border-r bg-card p-6 lg:flex">
      <div className="flex items-center gap-2 mb-8">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="space-y-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="mt-auto space-y-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </aside>

    <div className="flex flex-1 flex-col lg:ml-[260px]">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-40 flex h-[70px] shrink-0 items-center justify-between gap-4 border-b bg-surface p-4 shadow-sm">
        <Skeleton className="h-10 w-full max-w-sm hidden md:block" />
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="space-y-8">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </main>
    </div>
  </div>
);


export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
    router.push('/');
    setIsLogoutModalOpen(false);
  };

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  
  if (isUserLoading) {
    return <AppLayoutSkeleton />;
  }

  return (
    <div className={cn(
      "flex w-full flex-1 flex-col overflow-hidden",
      "h-screen"
    )}>
      <LeftSidebar onLogoutClick={openLogoutModal} />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-[70px] shrink-0 items-center justify-between gap-4 border-b bg-surface p-4 shadow-sm">
            <div className="relative w-full max-w-sm hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search lessons, challenges, or friends" className="pl-10" />
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-4">
              <HeaderRightContent onLogoutClick={openLogoutModal} />
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-background">
          {children}
        </main>
      </div>
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleLogout}
      />
    </div>
  );
}
