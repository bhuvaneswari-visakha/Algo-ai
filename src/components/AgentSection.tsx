import React from 'react';
import { Agent } from '../types';
import { AgentCard } from './AgentCard';

interface AgentSectionProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
}

export const AgentSection: React.FC<AgentSectionProps> = ({
  agents,
  onSelectAgent,
}) => {
  return (
    <section id="algoai-agents-section" className="mt-7">
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          AlgoAI Agents
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Five specialized agents working together
        </p>
      </div>

      {/* Grid of 5 Agent Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onSelect={onSelectAgent} />
        ))}
      </div>
    </section>
  );
};
