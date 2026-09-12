import React, { useState } from 'react';
import {
  X,
  FileText,
  Copy,
  Check,
  BookOpen,
  Zap,
  Code2,
} from 'lucide-react';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardXP: (amount: number) => void;
}

interface NoteTopic {
  id: string;
  title: string;
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  keyRule: string;
  snippet: string;
}

const NOTES_TOPICS: NoteTopic[] = [
  {
    id: 'big-o',
    title: 'Big-O Complexity Cheat Sheet',
    summary: 'Essential algorithmic time & space bounds for all core data structures.',
    timeComplexity: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
    spaceComplexity: 'Auxiliary stack frames + allocated memory',
    keyRule: 'Rule of thumb: 10⁸ operations ≈ 1 second in competitive and automated testing environments.',
    snippet: `// Complexity reference:
// Array Access: O(1)
// Array Insertion / Deletion: O(n)
// Hash Map Lookup / Insert: O(1) avg, O(n) worst
// BST Search / Insert: O(log n) avg, O(n) worst
// Heap Push / Pop: O(log n)
// Sorting (Merge / Quick): O(n log n)`,
  },
  {
    id: 'two-pointers',
    title: 'Two-Pointer Technique',
    summary: 'Converging or equidistant pointers navigating sorted sequences without extra space.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    keyRule: 'Check if input is sorted. If so, two pointers often replace an O(n²) double loop.',
    snippet: `function twoPointerPattern(arr: number[]): void {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    if (conditionMet(arr[left], arr[right])) {
      // do something
      left++;
      right--;
    } else if (needSmaller()) {
      right--;
    } else {
      left++;
    }
  }
}`,
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window Pattern',
    summary: 'Dynamic contiguous subsegment expansion and contraction to find minimum or maximum ranges.',
    timeComplexity: 'O(n) amortized',
    spaceComplexity: 'O(k) where k is alphabet/range size',
    keyRule: 'Expand the right pointer to satisfy condition, then shrink left pointer to find the optimal subarray.',
    snippet: `function slidingWindow(s: string): number {
  let left = 0;
  let maxLen = 0;
  const set = new Set<string>();

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
  },
  {
    id: 'monotonic-stack',
    title: 'Monotonic Stack Pattern',
    summary: 'Maintains elements in strictly ascending or descending order for nearest greater/smaller queries.',
    timeComplexity: 'O(n) each item pushed & popped at most once',
    spaceComplexity: 'O(n)',
    keyRule: 'When you need "Next Greater Element" or "Daily Temperatures", reach for a monotonic stack.',
    snippet: `function nextGreaterElement(nums: number[]): number[] {
  const result = new Array(nums.length).fill(-1);
  const stack: number[] = []; // stores indices

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const prevIdx = stack.pop()!;
      result[prevIdx] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`,
  },
];

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  onAwardXP,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<NoteTopic>(NOTES_TOPICS[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedTopic.snippet);
    setCopied(true);
    onAwardXP(5);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm">
      <div
        id="notes-agent-modal"
        className="relative w-full max-w-3xl bg-[#090e1f] border border-[#1e2954] rounded-2xl shadow-2xl flex flex-col h-[640px] max-h-[92vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#182348] bg-[#0c1328] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base">
                  AlgoAI Notes Agent
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300">
                  AI Generated
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Concise study notes, invariant rules, and copyable implementation patterns
              </p>
            </div>
          </div>

          <button
            id="close-notes-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151f40] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#182348] overflow-hidden">
          {/* Topics sidebar */}
          <div className="p-3 bg-[#080d1d] overflow-y-auto space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
              Cheat Sheets
            </span>
            {NOTES_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all ${
                  selectedTopic.id === topic.id
                    ? 'bg-[#182245] text-white border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f162e]'
                }`}
              >
                <div className="font-semibold text-slate-200">{topic.title}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {topic.summary}
                </div>
              </button>
            ))}
          </div>

          {/* Note details */}
          <div className="md:col-span-2 p-5 bg-[#090e1f] overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {selectedTopic.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedTopic.summary}
                </p>
              </div>

              {/* Invariant Rule Card */}
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-xs text-blue-200 leading-relaxed">
                <strong className="text-blue-300 block mb-0.5">Key Invariant:</strong>
                {selectedTopic.keyRule}
              </div>

              {/* Complexity badges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0e152e] border border-[#1b254a]">
                  <span className="text-slate-400 block text-[11px]">Time Complexity</span>
                  <span className="font-mono text-amber-300 font-semibold text-xs mt-0.5 block">
                    {selectedTopic.timeComplexity}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#0e152e] border border-[#1b254a]">
                  <span className="text-slate-400 block text-[11px]">Space Complexity</span>
                  <span className="font-mono text-emerald-300 font-semibold text-xs mt-0.5 block">
                    {selectedTopic.spaceComplexity}
                  </span>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div>
                <div className="flex items-center justify-between pb-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    Code Template
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-[#060a16] border border-[#182245] font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                  {selectedTopic.snippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
