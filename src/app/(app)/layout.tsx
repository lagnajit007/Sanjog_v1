import LeftSidebar from '@/components/dashboard/left-sidebar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import RightSidebar from '@/components/dashboard/right-sidebar';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground flex-col lg:flex-row">
      <LeftSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-[70px] shrink-0 items-center justify-between gap-4 border-b bg-surface p-4 shadow-sm">
            <h1 className="text-2xl font-bold text-textPrimary hidden lg:block">Dashboard</h1>

            <div className="relative w-full max-w-sm hidden md:block ml-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search lessons, challenges, or friends" className="pl-10" />
            </div>

            <div className="flex items-center gap-4 ml-4">
              <RightSidebar />
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
