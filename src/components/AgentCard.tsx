import React from 'react';
import { Bot, Brain, Laptop, MapPin, FileText } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
  const renderIcon = () => {
    switch (agent.iconType) {
      case 'tutor':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Bot className="w-5 h-5" />
          </div>
        );
      case 'quiz':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <Brain className="w-5 h-5" />
          </div>
        );
      case 'coding':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Laptop className="w-5 h-5" />
          </div>
        );
      case 'path':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <MapPin className="w-5 h-5" />
          </div>
        );
      case 'notes':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <FileText className="w-5 h-5" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id={`agent-card-${agent.id}`}
      onClick={() => onSelect(agent)}
      className="group relative rounded-2xl bg-[#0b1024] border border-[#1b254b] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-950/40 cursor-pointer overflow-hidden"
    >
      {/* Subtle hover gradient background hint */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div>
        {/* Top Icon */}
        <div className="mb-3.5 flex items-center justify-between">
          {renderIcon()}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-blue-400 text-xs">
            Launch ↗
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors tracking-tight">
          {agent.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs text-slate-400 leading-relaxed min-h-[48px]">
          {agent.description}
        </p>
      </div>

      {/* Badges & Status row */}
      <div className="mt-4 pt-3 border-t border-[#141b36] flex flex-col gap-2">
        {/* Feature badge */}
        <div>
          <span
            className={`inline-block text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${agent.badgeColor}`}
          >
            {agent.badge}
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]" />
          <span className="text-slate-400 text-[11px]">{agent.status}</span>
        </div>
      </div>
    </div>
  );
};
