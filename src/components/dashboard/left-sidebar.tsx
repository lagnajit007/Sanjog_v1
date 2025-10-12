import { LogOut, Bell } from 'lucide-react';
import Image from 'next/image';
import { menuItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LeftSidebar = () => {
  const userAvatar = PlaceHolderImages.find((img) => img.id === '1');

  return (
    <aside className="hidden w-[260px] flex-col border-r bg-card p-6 shadow-subtle lg:flex">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary rounded-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17.5V6.5C7 5.11929 8.11929 4 9.5 4H14.5C15.8807 4 17 5.11929 17 6.5V12.5C17 13.8807 15.8807 15 14.5 15H10.5L7 17.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 9H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-foreground">sanjog</h1>
      </div>

      <nav className="mt-8 flex flex-1 flex-col">
        <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Menu</p>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={item.active ? 'secondary' : 'ghost'}
                className="w-full justify-start text-base"
                aria-current={item.active ? 'page' : undefined}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant={item.active ? 'default' : 'secondary'} className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-3">
          <Avatar>
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Jenny Wilson" data-ai-hint={userAvatar.imageHint} />}
            <AvatarFallback>JW</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">Jenny Wilson</span>
            <span className="text-sm text-muted-foreground">jen.wilson@example.com</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto text-red-400 hover:text-red-500">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
