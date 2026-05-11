import { Sun, Moon, Search, Command as CommandIcon, ChevronDown, Bell, Menu } from "lucide-react";
import { useStore } from "@/store/useStore";
import { PERSONAS, getPersona } from "@/data/personas";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_GROUPS } from "@/data/navigation";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Header() {
  const navigate = useNavigate();
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const persona = useStore((s) => s.persona);
  const setPersona = useStore((s) => s.setPersona);

  const current = getPersona(persona);
  const PersonaIcon = current.icon;

  return (
    <header
      data-testid="app-header"
      className="sticky top-0 z-30 h-16 border-b border-border bg-card/85 backdrop-blur-xl"
    >
      <div className="flex h-full items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" data-testid="mobile-menu-btn">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetHeader className="p-4 border-b border-border text-left">
                <SheetTitle className="font-heading">AIOps OS</SheetTitle>
              </SheetHeader>
              <nav className="p-3 overflow-y-auto h-[calc(100vh-64px)]">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="mb-4">
                    <p className="overline text-muted-foreground px-2 mb-2">{group.label}</p>
                    <ul className="space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.id}>
                            <NavLink
                              to={item.path}
                              className={({ isActive }) =>
                                cn(
                                  "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm",
                                  isActive ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                                )
                              }
                            >
                              <Icon className="h-4 w-4" /> {item.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Brand credit */}
          <div className="hidden md:flex items-center gap-3">
            <div className="leading-tight" data-testid="brand-credit">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Crafted By
              </p>
              <p className="font-heading text-sm font-semibold tracking-tight">
                Siddharth Dutt
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center h-9 px-3 rounded-md border border-border bg-background/60 text-muted-foreground gap-2 min-w-[260px]" data-testid="header-search">
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs">Search services, runbooks…</span>
            <kbd className="ml-auto font-mono text-[10px] px-1.5 py-0.5 border border-border rounded-sm flex items-center gap-1">
              <CommandIcon className="h-3 w-3" /> K
            </kbd>
          </div>

          {/* Live status */}
          <div className="hidden lg:flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">All systems</span>
          </div>

          {/* Persona switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 px-3 gap-2" data-testid="persona-switcher">
                <PersonaIcon className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline text-sm">{current.label}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>
                <p className="text-sm">Switch persona</p>
                <p className="text-xs text-muted-foreground">Reshapes KPIs & narrative</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PERSONAS.map((p) => {
                const Icon = p.icon;
                return (
                  <DropdownMenuItem
                    key={p.id}
                    onClick={() => {
                      setPersona(p.id);
                      navigate(p.landing);
                    }}
                    data-testid={`persona-option-${p.id}`}
                    className="flex items-start gap-3 py-2"
                  >
                    <Icon className="h-4 w-4 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.focus}</p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" data-testid="header-bell">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-warning" />
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
