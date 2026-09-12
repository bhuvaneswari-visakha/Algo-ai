import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Brain,
  BarChart3,
  Terminal,
  MapPin,
  FileText,
  X,
} from 'lucide-react';
import { NavRoute, UserStats } from '../types';

interface SidebarProps {
  activeRoute: NavRoute;
  onRouteChange: (route: NavRoute) => void;
  stats: UserStats;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItemConfig {
  id: NavRoute;
  label: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeRoute,
  onRouteChange,
  stats,
  isMobileOpen,
  onCloseMobile,
}) => {
  const percentage = Math.round(
    (stats.completedModulesCount / stats.totalModulesCount) * 100
  );

  const navItems: NavItemConfig[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <span className="p-1 rounded-md bg-blue-500/20 text-blue-400">
          <LayoutDashboard className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'tutor',
      label: 'AlgoAI Tutor',
      icon: (
        <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
          <Bot className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: (
        <span className="p-1 rounded-md bg-pink-500/20 text-pink-400">
          <Brain className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'visualizer',
      label: 'Visualizer',
      icon: (
        <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
          <BarChart3 className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'coding-lab',
      label: 'Coding Lab',
      icon: (
        <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400">
          <Terminal className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'learning-path',
      label: 'Learning Path',
      icon: (
        <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
          <MapPin className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'ai-notes',
      label: 'AI Notes',
      icon: (
        <span className="p-1 rounded-md bg-orange-500/20 text-orange-400">
          <FileText className="w-4 h-4" />
        </span>
      ),
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#080d1d] border-r border-[#151c38] text-slate-300 w-60 select-none">
      {/* Top Mobile Close Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#151c38]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-blue-500/20">
            AI
          </div>
          <div>
            <div className="font-semibold text-sm text-white leading-tight">AlgoAI OS</div>
            <div className="text-[11px] text-slate-400">Smart DSA Learning</div>
          </div>
        </div>
        <button
          id="mobile-nav-close-btn"
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Top Progress Card (Matching the Reference Image exactly) */}
      <div className="p-3">
        <div className="bg-[#0e1428] border border-[#1b254a] rounded-xl p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Overall Progress</span>
            <span className="text-blue-400 font-semibold">{percentage}%</span>
          </div>

          {/* Thin Progress bar */}
          <div className="w-full bg-[#161e3d] h-1.5 rounded-full overflow-hidden my-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(percentage, 3)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-normal">
            <span>
              {stats.completedModulesCount} / {stats.totalModulesCount} modules
            </span>
            <span>{stats.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="px-4 pt-4 pb-2">
        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Navigation
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => {
                onRouteChange(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                isActive
                  ? 'bg-[#182245] text-white shadow-sm border border-blue-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e1428]'
              }`}
            >
              {item.icon}
              <span className="tracking-wide">{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Subtle bottom brand status */}
      <div className="p-3 border-t border-[#131932]">
        <div className="bg-[#0b1022] border border-[#17203e] rounded-lg p-2.5 flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-[11px] text-slate-400">
            <span className="text-slate-300 font-medium">Gemini 2.5</span> Engine Online
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 flex-shrink-0">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
