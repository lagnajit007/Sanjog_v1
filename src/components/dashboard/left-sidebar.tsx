
'use client';

import { LogOut, Menu, CreditCard } from 'lucide-react';
import { menuItems } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from '../ui/card';

const Logo = () => (
    <Link href="/dashboard" className="flex items-center gap-2 mb-8">
      <svg width="109" height="40" viewBox="0 0 109 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.846 21.856q-.038 1.634.93 2.45t2.966.817q3.242 0 3.242-1.986 0-.728-.415-1.156-.402-.427-1.257-.616-.615-.138-1.897-.276a37 37 0 0 1-1.634-.213q-1.62-.29-2.6-1.257-.98-.98-.98-2.551 0-1.722 1.369-2.865 1.381-1.155 3.807-1.156 2.601 0 4.147 1.407 1.558 1.395 1.596 3.695h-2.3q-.1-3.092-3.468-3.092-1.382 0-2.149.516-.754.514-.754 1.42 0 1.42 1.596 1.696.603.114 1.76.251 1.156.139 1.633.214 1.797.327 2.853 1.332 1.055.993 1.055 2.601 0 1.81-1.483 2.94-1.47 1.132-4.172 1.131-.98 0-1.847-.163-.854-.15-1.671-.54a4.9 4.9 0 0 1-1.382-.98q-.566-.59-.905-1.52t-.327-2.1zm15.745 5.303q-2.073 0-3.392-1.006-1.32-1.005-1.32-2.915 0-1.533 1.106-2.651 1.106-1.12 2.966-1.307.703-.075 1.608-.151.905-.088 1.42-.126.515-.05 1.068-.125.553-.076.88-.176.34-.101.527-.252v-.402q0-1.344-.98-2.123-.967-.792-2.488-.792-1.583 0-2.563.779-.98.78-1.018 2.237h-2.287q.038-2.238 1.721-3.67t4.197-1.432q1.508 0 2.778.59a4.96 4.96 0 0 1 2.073 1.76q.816 1.181.842 2.752v5.039q0 1.596 1.583 1.596h.314v2.01h-.69q-1.082 0-1.91-.477-.83-.479-1.232-1.458-.705 1.068-2.086 1.684-1.37.616-3.117.616m-2.362-3.996q0 .93.679 1.445.69.515 1.872.515 1.897 0 3.28-1.043 1.395-1.043 1.394-2.538v-1.056a1.4 1.4 0 0 1-.44.214q-.276.075-.804.15a35 35 0 0 1-.942.1q-.402.039-1.332.114-.918.075-1.495.126-2.212.213-2.212 1.973m16.386-9.739a6.1 6.1 0 0 1 2.124-.377q1.092 0 2.123.377 1.03.377 1.898 1.106t1.395 1.947q.527 1.207.527 2.727v7.59h-2.261v-7.175q0-2.262-.993-3.38-.98-1.131-2.69-1.131t-2.701 1.143q-.98 1.131-.98 3.393v7.15h-2.262v-7.59q0-1.52.528-2.727.527-1.218 1.395-1.947a6.3 6.3 0 0 1 1.897-1.106m28.299 6.647q0 1.634-.54 2.991-.529 1.357-1.446 2.25a6.7 6.7 0 0 1-2.11 1.369 6.8 6.8 0 0 1-2.54.477q-1.344 0-2.55-.477a6.7 6.7 0 0 1-2.111-1.37q-.905-.88-1.445-2.236t-.54-3.004q0-1.634.54-2.978t1.445-2.211a6.5 6.5 0 0 1 2.11-1.358 6.9 6.9 0 0 1 2.552-.477q1.344 0 2.538.477 1.194.466 2.111 1.345.918.867 1.445 2.212.54 1.344.54 2.99m-10.933.038q0 2.374 1.232 3.67 1.23 1.294 3.066 1.294 1.834 0 3.066-1.295 1.23-1.294 1.231-3.669 0-2.451-1.219-3.707-1.218-1.27-3.078-1.27t-3.079 1.27q-1.219 1.257-1.219 3.707m18.787 11.159q-2.74 0-4.385-1.157-1.647-1.143-1.734-3.317h2.287q.138 2.388 3.832 2.388.805-.001 1.483-.176a4 4 0 0 0 1.257-.566q.578-.39.904-1.093.327-.69.327-1.634v-1.495a5.5 5.5 0 0 1-1.91 1.508 5.6 5.6 0 0 1-2.438.553q-1.156 0-2.236-.44a6.4 6.4 0 0 1-1.936-1.244q-.855-.804-1.37-2.073-.514-1.282-.514-2.828 0-1.582.527-2.865.54-1.281 1.445-2.098a6.3 6.3 0 0 1 2.049-1.244 6.7 6.7 0 0 1 2.412-.44q2.79 0 4.511 1.81Q109 16.652 109 19.505v6.333q0 1.357-.515 2.413-.516 1.067-1.395 1.709a6.4 6.4 0 0 1-1.985.967 7.9 7.9 0 0 1-2.338.34m-4.008-11.549q0 2.1 1.156 3.293 1.168 1.18 2.752 1.18.792 0 1.508-.263a4.3 4.3 0 0 0 1.307-.804q.603-.54.955-1.433.351-.891.351-2.023 0-2.225-1.143-3.38-1.13-1.155-2.878-1.156-1.76 0-2.89 1.169-1.118 1.168-1.118 3.417" fill="#141414"/><path fillRule="evenodd" clipRule="evenodd" d="M73.652 30.916h.729q2.588 0 3.945-1.395 1.37-1.395 1.37-4.034V13.411h-2.262v12.051q0 1.872-.842 2.651-.829.792-2.55.792h-.39z" fill="#141414"/><path d="M77.02 10.194q0-.64.452-1.093.465-.452 1.093-.452.603 0 1.056.465.465.452.465 1.08 0 .654-.465 1.119a1.45 1.45 0 0 1-1.056.452q-.628 0-1.093-.452a1.55 1.55 0 0 1-.452-1.119" fill="#8400FF"/><path d="M13.573 11.602A13.793 13.793 0 0 1 27.296 24.04 13.789 13.789 0 0 1 3.823 35.142l5.637-5.637a5.818 5.818 0 1 0 4.113-9.93zM11.1.265a13.79 13.79 0 0 1 12.44 3.774l-5.638 5.637a5.817 5.817 0 1 0-4.113 9.93v7.972A13.789 13.789 0 0 1 11.1.265" fill="#141414"/></svg>
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

const UserProfile = ({ onLogoutClick }: { onLogoutClick: () => void }) => {
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
      <div className="mt-auto space-y-4">
        <div className="flex w-full items-center gap-3 p-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    );
  }

  return (
    <div className="mt-auto space-y-4">
       <Link href="/profile" className="block rounded-lg transition-colors hover:bg-accent">
        <div className="flex w-full items-center gap-3 p-2">
          <Avatar className="cursor-pointer h-12 w-12">
            {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User avatar'} />}
            <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold truncate">{user?.displayName || 'New User'}</span>
            <span className="text-sm text-muted-foreground truncate">{user?.email || 'No email'}</span>
          </div>
        </div>
      </Link>
      
      <Button variant="ghost" className="w-full justify-center items-center rounded-full bg-red-100/40 text-red-500 hover:bg-red-200/60 hover:text-red-600" onClick={onLogoutClick}>
        <LogOut className="mr-2 h-5 w-5" />
        Log out
      </Button>
    </div>
  );
}


const LeftSidebarContent = ({ onLogoutClick }: { onLogoutClick: () => void }) => {
  return (
    <>
      <Logo />
      <NavMenu />
      <div className='mt-auto space-y-2'>
        <Card className='bg-primary/10 border-primary/20'>
          <CardContent className='p-4 text-center'>
            <CreditCard className='mx-auto mb-2 h-6 w-6 text-primary'/>
            <p className='text-sm font-semibold'>Upgrade to Pro</p>
            <p className='text-xs text-muted-foreground mb-3'>Unlock all features</p>
            <Button size='sm' className='w-full'>Upgrade</Button>
          </CardContent>
        </Card>
        <UserProfile onLogoutClick={onLogoutClick} />
      </div>
    </>
  );
};


const LeftSidebar = ({ onLogoutClick }: { onLogoutClick: () => void }) => {
  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] flex-col border-r bg-card p-6 lg:flex">
        <LeftSidebarContent onLogoutClick={onLogoutClick} />
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
              <LeftSidebarContent onLogoutClick={onLogoutClick} />
            </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default LeftSidebar;
