
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Link from 'next/link';

const HeaderRightContent = () => {
  const userAvatar = PlaceHolderImages.find((img) => img.id === '1');
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
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Jenny Wilson" data-ai-hint={userAvatar.imageHint} />}
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

      </div>
    </>
  );
};


export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <LeftSidebar />
      <div className="flex flex-1 flex-col lg:ml-[260px]">
        <header className="sticky top-0 z-40 flex h-[70px] shrink-0 items-center justify-between gap-4 border-b bg-surface p-4 shadow-sm">
            <div className="flex-1">
              <div className="relative w-full max-w-sm hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Search lessons, challenges, or friends" className="pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <HeaderRightContent />
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
