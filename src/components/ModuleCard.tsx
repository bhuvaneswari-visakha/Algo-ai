import React from 'react';
import {
  Grid,
  Type,
  Link2,
  Layers,
  ListOrdered,
  GitFork,
  Network,
  Hash,
  Database,
  Binary,
  Workflow,
} from 'lucide-react';
import { LearningModule } from '../types';

interface ModuleCardProps {
  module: LearningModule;
  onSelect: (module: LearningModule) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onSelect }) => {
  const getIcon = () => {
    switch (module.iconType) {
      case 'arrays':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
            <Grid className="w-4 h-4" />
          </div>
        );
      case 'strings':
        return (
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center">
            <Type className="w-4 h-4" />
          </div>
        );
      case 'linked-lists':
        return (
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
            <Link2 className="w-4 h-4" />
          </div>
        );
      case 'stacks':
        return (
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
        );
      case 'queues':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
            <ListOrdered className="w-4 h-4" />
          </div>
        );
      case 'trees':
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <GitFork className="w-4 h-4" />
          </div>
        );
      case 'graphs':
        return (
          <div className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center">
            <Network className="w-4 h-4" />
          </div>
        );
      case 'hash-tables':
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
            <Hash className="w-4 h-4" />
          </div>
        );
      case 'heaps':
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
        );
      case 'dp':
        return (
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
            <Binary className="w-4 h-4" />
          </div>
        );
      case 'trie':
        return (
          <div className="w-8 h-8 rounded-lg bg-fuchsia-500/15 text-fuchsia-400 flex items-center justify-center">
            <Workflow className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-700/50 text-slate-300 flex items-center justify-center">
            <Grid className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div
      id={`module-card-${module.id}`}
      onClick={() => onSelect(module)}
      className="group relative rounded-xl bg-[#0b1024] border border-[#1b254b] p-3.5 flex flex-col justify-between hover:border-blue-500/35 hover:bg-[#0e142c] transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-blue-950/30"
    >
      <div className="flex flex-col items-center text-center">
        {/* Module Icon */}
        <div className="mb-2.5 transition-transform group-hover:scale-110">
          {getIcon()}
        </div>

        {/* Name */}
        <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate max-w-full">
          {module.name}
        </h4>

        {/* Subtle status tag */}
        <span className="text-[10px] text-slate-400 mt-0.5">
          {module.completed ? 'Completed' : `${module.progress}%`}
        </span>
      </div>

      {/* Mini bottom progress bar */}
      <div className="mt-2.5 w-full bg-[#151c38] h-1 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            module.completed
              ? 'bg-emerald-400'
              : module.progress > 0
              ? 'bg-blue-400'
              : 'bg-transparent'
          }`}
          style={{ width: `${module.completed ? 100 : module.progress}%` }}
        />
      </div>
    </div>
  );
};
