import React, { useState } from 'react';
import {
  X,
  MapPin,
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface LearningPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardXP: (amount: number) => void;
}

interface Milestone {
  day: number;
  title: string;
  focus: string;
  duration: string;
  completed: boolean;
  topics: string[];
}

const INITIAL_MILESTONES: Milestone[] = [
  {
    day: 1,
    title: 'Arrays & Two Pointers',
    focus: 'In-place array manipulation and pointer convergence',
    duration: '45 mins',
    completed: true,
    topics: ['Prefix Sums', 'Two Sum Sorted', 'Remove Duplicates'],
  },
  {
    day: 2,
    title: 'Sliding Window & Strings',
    focus: 'Dynamic frequency windows and anagram matching',
    duration: '60 mins',
    completed: false,
    topics: ['Longest Substring Without Repeating Characters', 'Minimum Window Substring'],
  },
  {
    day: 3,
    title: 'Fast & Slow Pointers (Linked Lists)',
    focus: 'Cycle detection and list middle-point identification',
    duration: '45 mins',
    completed: false,
    topics: ["Floyd's Cycle Algorithm", 'Palindrome Linked List'],
  },
  {
    day: 4,
    title: 'Monotonic Stacks & Queues',
    focus: 'Next Greater Element and sliding window maximums',
    duration: '50 mins',
    completed: false,
    topics: ['Daily Temperatures', 'Valid Parentheses', 'Sliding Window Maximum'],
  },
  {
    day: 5,
    title: 'Binary Search & BST Traversals',
    focus: 'Logarithmic search space reduction and DFS recursion',
    duration: '65 mins',
    completed: false,
    topics: ['Search in Rotated Sorted Array', 'Lowest Common Ancestor'],
  },
  {
    day: 6,
    title: 'Graph BFS & DFS Foundations',
    focus: 'Matrix grid traversals and connected components',
    duration: '60 mins',
    completed: false,
    topics: ['Number of Islands', 'Clone Graph', 'Rotting Oranges'],
  },
  {
    day: 7,
    title: 'Dynamic Programming Patterns',
    focus: '1D memoization and overlapping subproblems',
    duration: '75 mins',
    completed: false,
    topics: ['Climbing Stairs', 'Coin Change', 'House Robber'],
  },
];

export const LearningPathModal: React.FC<LearningPathModalProps> = ({
  isOpen,
  onClose,
  onAwardXP,
}) => {
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);

  if (!isOpen) return null;

  const toggleMilestone = (day: number) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.day === day) {
          const nextState = !m.completed;
          if (nextState) onAwardXP(20);
          return { ...m, completed: nextState };
        }
        return m;
      })
    );
  };

  const completedCount = milestones.filter((m) => m.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm">
      <div
        id="path-agent-modal"
        className="relative w-full max-w-2xl bg-[#090e1f] border border-[#1e2954] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#182348] bg-[#0c1328] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base">
                  Personalized 7-Day Path
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300">
                  Adaptive Roadmap
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Crafted by Path Agent based on your weak algorithmic areas
              </p>
            </div>
          </div>

          <button
            id="close-learning-path-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151f40] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress header bar */}
        <div className="px-5 py-3 bg-[#0a1024] border-b border-[#151c38] flex items-center justify-between text-xs">
          <span className="text-slate-300">
            Roadmap Progress: <strong className="text-emerald-400">{completedCount} of 7 days completed</strong>
          </span>
          <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target: Top 15% DSA Interview Ready</span>
          </div>
        </div>

        {/* Milestones list */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {milestones.map((m) => (
            <div
              key={m.day}
              onClick={() => toggleMilestone(m.day)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                m.completed
                  ? 'bg-[#0a1428] border-emerald-500/30 shadow-[0_0_12px_#10b98110]'
                  : 'bg-[#0d142b] border-[#1c264a] hover:border-blue-500/40 hover:bg-[#101936]'
              }`}
            >
              <button
                className="mt-0.5 flex-shrink-0 text-slate-400"
                aria-label={m.completed ? 'Mark incomplete' : 'Mark complete'}
              >
                {m.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 hover:text-blue-400 transition-colors" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Day {m.day}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{m.duration}</span>
                  </div>
                </div>

                <h4
                  className={`text-sm font-semibold mt-0.5 ${
                    m.completed ? 'text-slate-300 line-through' : 'text-white'
                  }`}
                >
                  {m.title}
                </h4>

                <p className="text-xs text-slate-400 mt-1">{m.focus}</p>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {m.topics.map((top, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#141d3b] border border-[#202d58] text-slate-300"
                    >
                      {top}
                    </span>
                  ))}
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
