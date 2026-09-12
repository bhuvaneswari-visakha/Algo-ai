import React from 'react';
import { Menu, Flame, Zap, User, Sparkles } from 'lucide-react';
import { UserStats } from '../types';

interface TopBarProps {
  stats: UserStats;
  onOpenMobileSidebar: () => void;
  onOpenProfile: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  stats,
  onOpenMobileSidebar,
  onOpenProfile,
}) => {
  return (
    <header className="h-16 border-b border-[#141a34] bg-[#070b17]/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
      {/* Left side: Mobile menu toggle + Logo & Brand */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-menu-trigger-btn"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#121832] transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-indigo-600/25 ring-1 ring-white/20">
            <span className="tracking-tight">AI</span>
          </div>
          <div>
            <h1 className="font-semibold text-sm sm:text-base text-white leading-tight tracking-tight flex items-center gap-1.5">
              AlgoAI OS
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]" />
            </h1>
            <p className="text-[11px] text-slate-400 font-normal">
              Smart DSA Learning
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Streak pill + XP pill + Profile button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Pill */}
        <div
          id="streak-indicator-badge"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#13162b] border border-amber-500/25 text-amber-300 text-xs font-medium shadow-sm hover:border-amber-500/40 transition-colors"
          title="Daily Learning Streak"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/80 animate-pulse" />
          <span className="text-[11px] sm:text-xs tracking-wide">
            {stats.streakDays}d streak
          </span>
        </div>

        {/* XP Pill */}
        <div
          id="xp-indicator-badge"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#121a36] border border-blue-500/25 text-blue-300 text-xs font-medium shadow-sm hover:border-blue-500/40 transition-colors"
          title="Accumulated Experience Points"
        >
          <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400/80" />
          <span className="text-[11px] sm:text-xs tracking-wide">
            +{stats.xp} XP
          </span>
        </div>

        {/* Profile / Settings Button */}
        <button
          id="user-profile-btn"
          onClick={onOpenProfile}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#131b38] to-[#1c2854] border border-[#263568] flex items-center justify-center text-slate-200 hover:text-white hover:border-blue-400 transition-all shadow-sm group"
          aria-label="User Profile and Settings"
          title="Learner Profile & Settings"
        >
          <User className="w-4 h-4 text-slate-300 group-hover:scale-105 transition-transform" />
        </button>
      </div>
    </header>
  );
};
