import { NavLink } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { NAV_GROUPS } from "@/data/navigation";
import { ChevronsLeft, ChevronsRight, Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Sidebar() {
  const collapsed = useStore((s) => s.sidebarCollapsed);
  const toggle = useStore((s) => s.toggleSidebar);

  return (
    <aside
      data-testid="app-sidebar"
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden lg:flex flex-col border-r border-border bg-card",
        "transition-[width] duration-200",
        collapsed ? "w-[76px]" : "w-[260px]"
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 rounded-md bg-primary/10 ring-1 ring-primary/30 flex items-center justify-center">
            <Hexagon className="h-5 w-5 text-primary" strokeWidth={2.25} />
            <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-success live-dot ring-2 ring-card" />
          </div>
          {!collapsed && (
            <div className="leading-none">
              <p className="font-heading text-[15px] font-bold tracking-tight">AIOps OS</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-1">Transformation</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4">
        <TooltipProvider delayDuration={120}>
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="px-3 mb-5">
              {!collapsed && (
                <p className="overline text-muted-foreground px-2 mb-2">{group.label}</p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <NavLink
                      to={item.path}
                      data-testid={`nav-${item.id}`}
                      className={({ isActive }) =>
                        cn(
                          "group relative flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-sm bg-primary" />
                          )}
                          <Icon
                            className={cn(
                              "h-[18px] w-[18px] shrink-0",
                              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )}
                          />
                          {!collapsed && (
                            <>
                              <span className="truncate">{item.label}</span>
                              {item.badge && (
                                <span className="ml-auto font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                  return (
                    <li key={item.id}>
                      {collapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>{content}</TooltipTrigger>
                          <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </TooltipProvider>
      </nav>

      {/* Footer toggle */}
      <button
        type="button"
        data-testid="sidebar-toggle-btn"
        onClick={toggle}
        className={cn(
          "h-12 border-t border-border flex items-center gap-2 px-4 text-xs text-muted-foreground hover:text-foreground transition-colors",
          collapsed && "justify-center"
        )}
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        {!collapsed && <span className="font-mono uppercase tracking-[0.18em] text-[10px]">Collapse</span>}
      </button>
    </aside>
  );
}
