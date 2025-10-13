'use client';

import React, { useState } from 'react';
import { LogOut, Menu, CreditCard } from 'lucide-react';
import { menuItems as initialMenuItems } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from '../ui/card';
import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar';
import { motion } from 'framer-motion';

const Logo = () => (
    <Link href="/dashboard" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Sanjog
      </motion.span>
    </Link>
);

const LogoIcon = () => (
    <Link href="/dashboard" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black dark:text-white">
        <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
);

const UserProfile = ({ onLogoutClick, open }: { onLogoutClick: () => void, open: boolean }) => {
  const { user, isUserLoading } = useUser();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  if (isUserLoading) {
    return (
      <div className="mt-auto space-y-2 p-4">
        <div className="flex w-full items-center gap-3 p-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          {open && (
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-auto space-y-2">
      <SidebarLink
        link={{
          label: user?.displayName || 'New User',
          href: "/profile",
          icon: (
            <Avatar className="h-7 w-7 shrink-0 rounded-full">
              {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User avatar'} />}
              <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
            </Avatar>
          ),
        }}
      />
      <SidebarLink
        link={{
          label: 'Logout',
          href: '#',
          icon: <LogOut className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        }}
        onClick={onLogoutClick}
      />
    </div>
  );
};

export default function LeftSidebar({ onLogoutClick }: { onLogoutClick: () => void }) {
  const pathname = usePathname();
  const modifiedPath = pathname.replace('/(app)/', '/');
  const [open, setOpen] = useState(false);

  const menuItems = initialMenuItems.map(item => ({
    ...item,
    href: item.href,
    icon: <item.icon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
  }));

  return (
    <Sidebar open={open} setOpen={setOpen} className="bg-card border-r">
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {menuItems.map((link, idx) => (
              <SidebarLink key={idx} link={link} active={modifiedPath === link.href} />
            ))}
          </div>
        </div>
        <div>
          <UserProfile onLogoutClick={onLogoutClick} open={open} />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
