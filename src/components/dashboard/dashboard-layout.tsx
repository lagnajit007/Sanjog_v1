import LeftSidebar from '@/components/dashboard/left-sidebar';
import RightSidebar from '@/components/dashboard/right-sidebar';
import MainContent from '@/components/dashboard/main-content';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <LeftSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <MainContent />
        </main>
      </div>
      <RightSidebar />
    </div>
  );
}
