'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { BarChart3, Building2, ClipboardList, FileText, GitCompare, Home, Settings, Star, Table2, TrendingUp, type LucideIcon } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { ClientDebugPanel } from '@/components/debug/ClientDebugPanel';

type NavItem = {
  href: Route;
  label: string;
  icon: LucideIcon;
};

const nav = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/new-analysis', label: 'New Analysis', icon: ClipboardList },
  { href: '/scenario-builder', label: 'Scenario Builder', icon: Table2 },
  { href: '/top-deals', label: 'Top Deals', icon: Star },
  { href: '/sensitivity-analysis', label: 'Sensitivity', icon: TrendingUp },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings }
] satisfies NavItem[];

function isActive(pathname: string, href: Route) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(String(href));
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-5 lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white"><Building2 size={22} /></div>
          <div className="min-w-0">
            <div className="truncate font-semibold text-slate-950">Property Alpha</div>
            <div className="truncate text-xs text-slate-500">Investor-grade STR analysis</div>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950',
                isActive(pathname, item.href) && 'bg-slate-950 text-white hover:bg-slate-900 hover:text-white'
              )}
            >
              <item.icon size={17} /> <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-5">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-950">European Property Investment Platform</div>
              <div className="hidden truncate text-xs text-slate-500 sm:block">Guest mode active. Connect Supabase/Auth.js for persistent multi-user accounts.</div>
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600 sm:flex"><BarChart3 size={15} /> Formula-transparent</div>
          </div>
        </header>
        <main className="min-w-0 px-4 py-5 pb-28 sm:px-5 lg:p-8">{children}</main>
      </div>

      <nav aria-label="Mobile primary navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <div className="flex max-w-full gap-1 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex min-w-[72px] shrink-0 flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-medium text-slate-500 transition',
                isActive(pathname, item.href) ? 'bg-slate-950 text-white' : 'hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <item.icon size={18} />
              <span className="mt-1 max-w-[68px] truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      <ClientDebugPanel />
    </div>
  );
}
