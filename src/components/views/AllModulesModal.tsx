import React, { useState } from 'react';
import { X, Search, Filter, Layers, CheckCircle2 } from 'lucide-react';
import { LearningModule } from '../../types';
import { ModuleCard } from '../ModuleCard';

interface AllModulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: LearningModule[];
  onSelectModule: (module: LearningModule) => void;
}

export const AllModulesModal: React.FC<AllModulesModalProps> = ({
  isOpen,
  onClose,
  modules,
  onSelectModule,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  if (!isOpen) return null;

  const filtered = modules.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = filterDifficulty === 'All' || m.difficulty === filterDifficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm">
      <div
        id="all-modules-modal"
        className="relative w-full max-w-4xl bg-[#090e1f] border border-[#1e2954] rounded-2xl shadow-2xl flex flex-col h-[700px] max-h-[92vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#182348] bg-[#0c1328] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base">
                All Learning Modules (11 Total)
              </h3>
              <p className="text-[11px] text-slate-400">
                Complete core DSA curriculum from foundations to advanced graphs & dynamic programming
              </p>
            </div>
          </div>

          <button
            id="close-all-modules-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151f40] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-[#151c38] bg-[#0a1024] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search data structure (e.g. Trees, DP, Queues)..."
              className="w-full bg-[#070b18] border border-[#1e2954] focus:border-blue-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#0e152e] p-1 rounded-xl border border-[#1b254a] text-xs">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterDifficulty === diff
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of All Modules */}
        <div className="p-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {filtered.map((m) => (
              <ModuleCard
                key={m.id}
                module={m}
                onSelect={(mod) => {
                  onSelectModule(mod);
                }}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No modules match your query "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
