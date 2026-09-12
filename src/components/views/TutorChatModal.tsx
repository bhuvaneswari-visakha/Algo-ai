import React, { useState } from 'react';
import {
  X,
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Code2,
  Check,
  Copy,
} from 'lucide-react';

interface TutorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardXP: (amount: number) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  codeSnippet?: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'tutor',
    text: "Hello Learner! I'm your AlgoAI Tutor powered by Gemini 2.5. I can explain any Data Structure or Algorithm with intuitive analogies, clean code, and time/space complexity breakdowns. What would you like to master today?",
    time: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  'Explain the Two-Pointer technique on Arrays',
  'How does Floyd’s Cycle Detection work in Linked Lists?',
  'What is the difference between BFS and DFS in Trees?',
  'Explain Dynamic Programming with an easy analogy',
];

export const TutorChatModal: React.FC<TutorChatModalProps> = ({
  isOpen,
  onClose,
  onAwardXP,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    // AI Tutor intelligent responses based on topics
    setTimeout(() => {
      let replyText = '';
      let code = '';

      const lower = text.toLowerCase();
      if (lower.includes('two-pointer') || lower.includes('two pointer')) {
        replyText =
          'The Two-Pointer technique uses two references to iterate through a data structure simultaneously—most commonly sorted arrays. Instead of nested loops O(n²), two pointers converge inward in linear O(n) time!';
        code = `function twoSumSorted(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1]; // 1-indexed
    } else if (sum < target) {
      left++; // Need larger sum
    } else {
      right--; // Need smaller sum
    }
  }
  return [];
}`;
      } else if (lower.includes('floyd') || lower.includes('cycle') || lower.includes('linked list')) {
        replyText =
          "Floyd's Cycle-Finding Algorithm (also known as the Tortoise and the Hare) uses two pointers moving at different speeds. The slow pointer advances 1 step at a time, while the fast pointer advances 2 steps. If a cycle exists, the fast pointer will inevitably lap the slow pointer in O(n) time and O(1) space!";
        code = `function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true; // Cycle detected!
    }
  }
  return false;
}`;
      } else if (lower.includes('bfs') || lower.includes('dfs') || lower.includes('tree')) {
        replyText =
          'BFS (Breadth-First Search) explores nodes layer-by-layer using a FIFO Queue, making it ideal for shortest path problems. DFS (Depth-First Search) plunges deep down one branch using recursion or a LIFO Stack, making it ideal for backtracking, connectivity, and topological sorting.';
        code = `// Level-order BFS traversal using a Queue
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`;
      } else if (lower.includes('dp') || lower.includes('dynamic programming')) {
        replyText =
          'Think of Dynamic Programming as "smart remembering". Instead of re-solving overlapping subproblems repeatedly (like calculating fib(3) five times in recursive Fibonacci), we memoize or tabulate answers into a lookup array. This transforms exponential O(2ⁿ) algorithms into linear O(n) algorithms!';
        code = `// Bottom-up Tabulation for Fibonacci
function fib(n: number): number {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`;
      } else {
        replyText = `Great question about "${text}". When tackling this in interviews, first identify the underlying invariant: are the elements sorted? Are you looking for contiguous sequences or subsets? Then choose between Two Pointers, Hash Maps, or Monotonic Stacks to achieve optimal O(n) runtime.`;
        code = `// Example template for optimal DSA problem solving
function solveProblem(input: number[]): number {
  let optimalAnswer = 0;
  // Apply optimal pattern
  return optimalAnswer;
}`;
      }

      const tutorReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: replyText,
        codeSnippet: code,
        time: 'Just now',
      };

      setMessages((prev) => [...prev, tutorReply]);
      setIsTyping(false);
      onAwardXP(10); // Reward learner for asking questions
    }, 600);
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm">
      <div
        id="tutor-chat-modal"
        className="relative w-full max-w-2xl bg-[#090e1f] border border-[#1e2954] rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[92vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#182348] bg-[#0c1328] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base">
                  AlgoAI Tutor
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300">
                  Voice + Text
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Agentic DSA Mentor • Gemini 2.5 Connected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-lg border transition-colors ${
                voiceEnabled
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-[#131b38] border-[#1d274f] text-slate-400 hover:text-slate-200'
              }`}
              title={voiceEnabled ? 'Voice Mode Active' : 'Voice Mode Muted'}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              id="close-tutor-modal-btn"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151f40] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs shadow-md'
                      : 'bg-[#0f162e] border border-[#1d274f] text-slate-200 rounded-tl-xs shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Code snippet block if tutor sent one */}
                  {msg.codeSnippet && (
                    <div className="mt-3 rounded-lg bg-[#060a16] border border-[#1b2548] p-3 text-xs font-mono text-slate-200 overflow-x-auto relative group">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#141b36] text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Code2 className="w-3 h-3 text-cyan-400" />
                          TypeScript Solution
                        </span>
                        <button
                          onClick={() => copyToClipboard(msg.codeSnippet!, msg.id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          {copiedCodeId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[11px] leading-relaxed text-blue-100">
                        {msg.codeSnippet}
                      </pre>
                    </div>
                  )}

                  <span className="block text-[10px] text-slate-400 mt-1.5 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-10">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px]">AlgoAI Tutor is thinking...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 border-t border-[#141b38] bg-[#0b1024] flex gap-2 overflow-x-auto no-scrollbar">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#121935] hover:bg-[#18234a] border border-[#202c58] text-slate-300 hover:text-white whitespace-nowrap transition-colors flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-[#182348] bg-[#0c1328] flex items-center gap-2">
          <input
            id="tutor-chat-input"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask about Two Pointers, Stacks, Dynamic Programming, Big-O..."
            className="flex-1 bg-[#070b18] border border-[#1e2954] focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-hidden transition-colors"
          />
          <button
            id="tutor-chat-send-btn"
            onClick={() => handleSend()}
            disabled={!inputPrompt.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
