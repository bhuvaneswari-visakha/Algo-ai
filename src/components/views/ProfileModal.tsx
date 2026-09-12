import React from 'react';
import {
  X,
  User,
  Flame,
  Zap,
  Award,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { UserStats } from '../../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onResetStats: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  onResetStats,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm">
      <div
        id="profile-settings-modal"
        className="relative w-full max-w-md bg-[#090e1f] border border-[#1e2954] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#182348] bg-[#0c1328] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
              L
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Learner Profile</h3>
              <p className="text-[11px] text-slate-400">DSA Mastery Track</p>
            </div>
          </div>

          <button
            id="close-profile-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151f40] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Stats matrix */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#0b1024] border border-[#1b254b]">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>{stats.streakDays} Day Streak</span>
              </div>
              <p className="text-[11px] text-slate-400">Consistent daily study</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b1024] border border-[#1b254b]">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-1">
                <Zap className="w-4 h-4 fill-blue-400" />
                <span>{stats.xp} Total XP</span>
              </div>
              <p className="text-[11px] text-slate-400">Earned through practice</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b1024] border border-[#1b254b]">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold mb-1">
                <Award className="w-4 h-4" />
                <span>{stats.badgesCount} Badges</span>
              </div>
              <p className="text-[11px] text-slate-400">Algorithmic milestones</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b1024] border border-[#1b254b]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{stats.completedModulesCount} / {stats.totalModulesCount}</span>
              </div>
              <p className="text-[11px] text-slate-400">Modules Completed</p>
            </div>
          </div>

          {/* AI Platform Settings info */}
          <div className="p-3.5 rounded-xl bg-[#0b1024] border border-[#182348] text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                AI Model Engine
              </span>
              <span className="text-blue-400 font-semibold font-mono text-[11px]">Gemini 2.5 Flash</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Agent Security
              </span>
              <span className="text-emerald-400 font-semibold text-[11px]">Active Sandbox</span>
            </div>
          </div>

          {/* Action to reset stats if desired for testing */}
          <div className="pt-2">
            <button
              onClick={onResetStats}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#141d3a] hover:bg-[#1b274e] border border-[#23305c] text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Dashboard Stats to Default</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
