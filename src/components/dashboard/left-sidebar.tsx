
'use client';

import { LogOut, Menu, User } from 'lucide-react';
import { menuItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';


const Logo = () => (
  <Link href="/dashboard" className="flex items-center gap-2 mb-8">
    <div className="p-2 bg-primary rounded-lg">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 17.5V6.5C7 5.11929 8.11929 4 9.5 4H14.5C15.8807 4 17 5.11929 17 6.5V12.5C17 13.8807 15.8807 15 14.5 15H10.5L7 17.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 9H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <h1 className="text-2xl font-bold text-foreground">sanjog</h1>
  </Link>
)

const NavMenu = () => {
  const pathname = usePathname();
  const modifiedPath = pathname.replace('/(app)/','/');
  return (
    <nav className="flex-1 space-y-4">
      <div>
        <p className="mb-2 px-4 text-xs font-semibold uppercase text-muted-foreground">Menu</p>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>
                <Button
                  variant={modifiedPath === item.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start text-base"
                  aria-current={modifiedPath === item.href ? 'page' : undefined}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant={modifiedPath === item.href ? 'default' : 'secondary'} className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const UserProfile = () => {
  const userAvatar = PlaceHolderImages.find((img) => img.id === '1');
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
    router.push('/');
  }

  return (
    <div className="mt-auto space-y-4">
       <Link href="/profile" className="block rounded-lg transition-colors hover:bg-secondary">
        <div className="flex w-full items-center gap-3 p-2">
          <Avatar className="cursor-pointer h-12 w-12">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Jenny Wilson" data-ai-hint={userAvatar.imageHint} />}
            <AvatarFallback>JW</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold truncate">Jenny Wilson</span>
            <span className="text-sm text-muted-foreground truncate">jen.wilson@example.com</span>
          </div>
        </div>
      </Link>
      
      <Button variant="ghost" className="w-full justify-center items-center rounded-full bg-red-100/40 text-red-500 hover:bg-red-200/60 hover:text-red-600" onClick={handleLogout}>
        <LogOut className="mr-2 h-5 w-5" />
        Log out
      </Button>
    </div>
  );
}


const LeftSidebarContent = () => {
  return (
    <>
      <Logo />
      <NavMenu />
      <UserProfile />
    </>
  );
};


const LeftSidebar = () => {
  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] flex-col border-r bg-card p-6 lg:flex">
        <LeftSidebarContent />
      </aside>
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-[260px] bg-white p-6">
              <SheetHeader>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              </SheetHeader>
              <LeftSidebarContent />
            </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default LeftSidebar;
