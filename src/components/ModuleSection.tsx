import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LearningModule } from '../types';
import { ModuleCard } from './ModuleCard';

interface ModuleSectionProps {
  modules: LearningModule[];
  completedCount: number;
  totalCount: number;
  onSelectModule: (module: LearningModule) => void;
  onViewAll: () => void;
}

export const ModuleSection: React.FC<ModuleSectionProps> = ({
  modules,
  completedCount,
  totalCount,
  onSelectModule,
  onViewAll,
}) => {
  // Show first 7 modules in the main dashboard row as depicted in the reference image
  const visibleModules = modules.slice(0, 7);

  return (
    <section id="learning-modules-section" className="mt-7 mb-10">
      {/* Header with Title, Subtitle, and View All link */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Learning Modules
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {completedCount} of {totalCount} completed
          </p>
        </div>

        <button
          id="view-all-modules-btn"
          onClick={onViewAll}
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1428] hover:bg-[#151e3c] border border-[#1b254b] text-slate-300 hover:text-white text-xs font-medium transition-all"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Grid of 7 Module Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {visibleModules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} onSelect={onSelectModule} />
        ))}
      </div>
    </section>
  );
};
