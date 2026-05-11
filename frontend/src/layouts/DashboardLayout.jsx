import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const collapsed = useStore((s) => s.sidebarCollapsed);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div
        className={cn(
          "transition-[padding] duration-200",
          collapsed ? "lg:pl-[76px]" : "lg:pl-[260px]"
        )}
      >
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1680px] mx-auto" data-testid="page-main">
          <Outlet />
        </main>
        <footer className="px-4 sm:px-6 lg:px-8 pt-2 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-t border-border pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              AIOps Transformation OS · v1.0 · Crafted by Siddharth Dutt
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              All data is simulated for demonstration · Static-host ready
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
