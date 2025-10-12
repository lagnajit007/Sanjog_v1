import LeftSidebar from '@/components/dashboard/left-sidebar';
import RightSidebar from '@/components/dashboard/right-sidebar';
import MainContent from '@/components/dashboard/main-content';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground flex-col lg:flex-row">
      <LeftSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex lg:hidden items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-primary rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17.5V6.5C7 5.11929 8.11929 4 9.5 4H14.5C15.8807 4 17 5.11929 17 6.5V12.5C17 13.8807 15.8807 15 14.5 15H10.5L7 17.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-foreground">sanjog</h1>
            </div>
            <RightSidebar />
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
