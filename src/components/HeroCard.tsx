import React from 'react';
import {
  Sparkles,
  MessageSquare,
  BarChart3,
  Brain,
  Flame,
  Zap,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { UserStats } from '../types';

interface HeroCardProps {
  stats: UserStats;
  onAskTutor: () => void;
  onOpenVisualizer: () => void;
  onTakeQuiz: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  stats,
  onAskTutor,
  onOpenVisualizer,
  onTakeQuiz,
}) => {
  const percentage = Math.round(
    (stats.completedModulesCount / stats.totalModulesCount) * 100
  );

  // SVG circle calculations for progress ring
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      id="hero-welcome-card"
      className="relative overflow-hidden rounded-2xl bg-[#0b1024]/90 border border-[#1d274f] p-5 sm:p-7 shadow-xl shadow-blue-950/20 backdrop-blur-sm"
    >
      {/* Subtle background ambient atmospheric glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Column: Welcome content, actions, stats */}
        <div className="flex-1 min-w-0">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 text-[11px] font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Agentic AI • Gemini 2.5</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-tight">
            Welcome back,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              Learner
            </span>{' '}
            <span>👋</span>
          </h2>

          {/* Supporting text */}
          <p className="mt-2 text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
            Your 4 AlgoAI agents are online. Continue mastering Data Structures &
            Algorithms with personalized learning.
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              id="hero-ask-tutor-btn"
              onClick={onAskTutor}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask AlgoAI Tutor</span>
            </button>

            <button
              id="hero-visualizer-btn"
              onClick={onOpenVisualizer}
              className="px-4 py-2.5 rounded-xl bg-[#141c38] hover:bg-[#1a254c] border border-[#233160] text-slate-200 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Visualizer</span>
            </button>

            <button
              id="hero-quiz-btn"
              onClick={onTakeQuiz}
              className="px-4 py-2.5 rounded-xl bg-[#141c38] hover:bg-[#1a254c] border border-[#233160] text-slate-200 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Brain className="w-4 h-4 text-pink-400" />
              <span>Take Quiz</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#182245] my-5 w-full" />

          {/* Learner Statistics Row */}
          <div className="grid grid-cols-4 gap-3 max-w-md pt-0.5">
            {/* Streak */}
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 text-sm sm:text-base font-bold">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{stats.streakDays}d</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-normal">
                Streak
              </div>
            </div>

            {/* XP */}
            <div>
              <div className="flex items-center gap-1.5 text-blue-400 text-sm sm:text-base font-bold">
                <Zap className="w-4 h-4 fill-blue-400" />
                <span>{stats.xp}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-normal">
                XP
              </div>
            </div>

            {/* Badges */}
            <div>
              <div className="flex items-center gap-1.5 text-indigo-400 text-sm sm:text-base font-bold">
                <Award className="w-4 h-4" />
                <span>{stats.badgesCount}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-normal">
                Badges
              </div>
            </div>

            {/* Done */}
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm sm:text-base font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{percentage}%</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-normal">
                Done
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Progress Gauge */}
        <div className="flex flex-col items-center justify-center self-center md:self-auto sm:pr-4">
          <div
            id="circular-progress-ring-container"
            className="relative w-28 h-28 flex items-center justify-center"
          >
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#151d38"
                strokeWidth="7"
              />
              {/* Active progress stroke */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="url(#progressGradient)"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Text */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                {percentage}%
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                progress
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
