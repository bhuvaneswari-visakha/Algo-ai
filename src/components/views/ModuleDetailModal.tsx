import React from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Code2,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';
import { LearningModule } from '../../types';

interface ModuleDetailModalProps {
  module: LearningModule | null;
  onClose: () => void;
  onToggleComplete: (moduleId: string) => void;
  onOpenVisualizer: () => void;
  onAskTutor: () => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  module,
  onClose,
  onToggleComplete,
  onOpenVisualizer,
  onAskTutor,
}) => {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm">
      <div
        id="module-detail-modal"
        className="relative w-full max-w-2xl bg-[#090e1f] border border-[#1e2954] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#182348] bg-[#0c1328] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base">
                  {module.name}
                </h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    module.difficulty === 'Beginner'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : module.difficulty === 'Intermediate'
                      ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  }`}
                >
                  {module.difficulty}
                </span>
                {module.completed && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {module.totalLessons} Lessons • Core Data Structure
              </p>
            </div>
          </div>

          <button
            id="close-module-detail-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151f40] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Description */}
          <div className="bg-[#0b1024] border border-[#1b254a] rounded-xl p-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {module.description}
            </p>
          </div>

          {/* Key Architectural Invariant */}
          <div className="bg-blue-500/10 border border-blue-500/25 rounded-xl p-4 text-xs leading-relaxed text-blue-200">
            <strong className="text-blue-300 block mb-1">Mental Model / Key Invariant:</strong>
            {module.keyIdea}
          </div>

          {/* Topics Checklist */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Syllabus Topics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {module.topics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0d142b] border border-[#192345] text-xs text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Template */}
          {module.codeSnippet && (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-mono">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Reference Implementation</span>
              </div>
              <pre className="p-3.5 rounded-xl bg-[#060a16] border border-[#182245] font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {module.codeSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#182348] bg-[#0c1328] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onAskTutor();
              }}
              className="px-3 py-1.5 rounded-lg bg-[#141d3a] hover:bg-[#1b264e] border border-[#23305c] text-xs text-slate-300 hover:text-white transition-colors"
            >
              Ask Tutor About This
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenVisualizer();
              }}
              className="px-3 py-1.5 rounded-lg bg-[#141d3a] hover:bg-[#1b264e] border border-[#23305c] text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              Visualize
            </button>
          </div>

          <button
            id="toggle-module-complete-btn"
            onClick={() => onToggleComplete(module.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              module.completed
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{module.completed ? 'Completed (Click to Reset)' : 'Mark as Completed (+100 XP)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
