import { Agent, LearningModule } from '../types';

export const AGENTS_DATA: Agent[] = [
  {
    id: 'tutor',
    name: 'AlgoAI Tutor',
    title: 'AlgoAI Tutor',
    description: 'Explains concepts with code, analogies & voice.',
    badge: 'Voice + Text',
    status: 'Active',
    iconType: 'tutor',
    badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
    iconBg: 'from-amber-400 to-orange-500',
  },
  {
    id: 'quiz',
    name: 'Quiz Agent',
    title: 'Quiz Agent',
    description: 'Adaptive MCQs that adjust to your performance.',
    badge: 'Adaptive',
    status: 'Active',
    iconType: 'quiz',
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
    iconBg: 'from-pink-500 to-rose-500',
  },
  {
    id: 'coding',
    name: 'Coding Agent',
    title: 'Coding Agent',
    description: 'AI-generated challenges, hints & smart review.',
    badge: 'Coding Lab',
    status: 'Active',
    iconType: 'coding',
    badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-500/10',
    iconBg: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'path',
    name: 'Path Agent',
    title: 'Path Agent',
    description: 'Personalised 7-day plans from your weak spots.',
    badge: 'Personalised',
    status: 'Active',
    iconType: 'path',
    badgeColor: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
    iconBg: 'from-teal-400 to-emerald-500',
  },
  {
    id: 'notes',
    name: 'Notes Agent',
    title: 'Notes Agent',
    description: 'AI study notes with key points & code examples.',
    badge: 'AI Generated',
    status: 'Active',
    iconType: 'notes',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    iconBg: 'from-orange-400 to-amber-500',
  },
];

export const MODULES_DATA: LearningModule[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    iconType: 'arrays',
    progress: 0,
    completed: false,
    totalLessons: 8,
    completedLessons: 0,
    difficulty: 'Beginner',
    description: 'Linear memory structures with contiguous indexing, two-pointer techniques, and sliding window paradigms.',
    topics: ['Contiguous Memory & O(1) Access', 'Two Pointers (Left/Right)', 'Sliding Window', 'Prefix Sums'],
    keyIdea: 'Arrays provide instant O(1) random memory lookup but O(n) insertions and deletions.',
    codeSnippet: `// Two-Sum using Hash Map - O(n) time, O(n) space
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
  },
  {
    id: 'strings',
    name: 'Strings',
    iconType: 'strings',
    progress: 0,
    completed: false,
    totalLessons: 6,
    completedLessons: 0,
    difficulty: 'Beginner',
    description: 'Character array manipulations, ASCII/Unicode hashing, palindrome validation, and anagram grouping.',
    topics: ['String Immutability', 'Anagram Frequency Hashing', 'Substrings & Palindromes', 'KMP / Rolling Hash'],
    keyIdea: 'Treat strings as immutable byte arrays; use frequency arrays (size 26) to avoid sorting overhead.',
    codeSnippet: `// Valid Palindrome Check - O(n) time, O(1) space
function isPalindrome(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists',
    iconType: 'linked-lists',
    progress: 0,
    completed: false,
    totalLessons: 7,
    completedLessons: 0,
    difficulty: 'Beginner',
    description: 'Singly and doubly linked pointer structures, fast & slow pointer cycle detection, and list reversals.',
    topics: ['Node & Pointer References', "Floyd's Cycle Finding (Tortoise & Hare)", 'In-Place Reversal', 'Merge Sorted Lists'],
    keyIdea: 'Always maintain pointer safety and use a dummy head node to simplify edge cases.',
    codeSnippet: `// Reverse Linked List - O(n) time, O(1) space
class ListNode {
  val: number;
  next: ListNode | null = null;
  constructor(val: number) { this.val = val; }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
  },
  {
    id: 'stacks',
    name: 'Stacks',
    iconType: 'stacks',
    progress: 0,
    completed: false,
    totalLessons: 5,
    completedLessons: 0,
    difficulty: 'Intermediate',
    description: 'Last-In-First-Out (LIFO) structures, monotonic stacks for nearest greater elements, and syntax parsing.',
    topics: ['LIFO Operations', 'Valid Parentheses Matching', 'Monotonic Increasing/Decreasing Stacks', 'Call Stack Simulation'],
    keyIdea: 'Monotonic stacks solve "next greater/smaller element" queries in linear O(n) time.',
    codeSnippet: `// Valid Parentheses - O(n) time, O(n) space
function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
  },
  {
    id: 'queues',
    name: 'Queues',
    iconType: 'queues',
    progress: 0,
    completed: false,
    totalLessons: 5,
    completedLessons: 0,
    difficulty: 'Intermediate',
    description: 'First-In-First-Out (FIFO) buffers, circular ring buffers, and double-ended queues for BFS exploration.',
    topics: ['FIFO Pipeline', 'Circular Array Queues', 'Deque (Double-Ended Queue)', 'Breadth-First Search (BFS) Engine'],
    keyIdea: 'Queues preserve temporal arrival order, making them indispensable for level-order graph and tree traversal.',
    codeSnippet: `// Queue Implementation with O(1) Amortized Dequeue
class Queue<T> {
  private inStack: T[] = [];
  private outStack: T[] = [];
  
  enqueue(item: T): void {
    this.inStack.push(item);
  }
  dequeue(): T | undefined {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
    return this.outStack.pop();
  }
}`,
  },
  {
    id: 'trees',
    name: 'Trees',
    iconType: 'trees',
    progress: 0,
    completed: false,
    totalLessons: 9,
    completedLessons: 0,
    difficulty: 'Intermediate',
    description: 'Hierarchical node trees, binary search trees (BST), preorder/inorder/postorder recursive traversals, and LCA.',
    topics: ['Binary Search Tree Properties', 'DFS (Pre, In, Post-Order)', 'BFS (Level-Order Traversal)', 'Lowest Common Ancestor (LCA)'],
    keyIdea: 'BST invariant: all left subtree nodes are smaller, all right subtree nodes are greater.',
    codeSnippet: `// Maximum Depth of Binary Tree - O(n) time, O(h) space
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
  },
  {
    id: 'graphs',
    name: 'Graphs',
    iconType: 'graphs',
    progress: 0,
    completed: false,
    totalLessons: 10,
    completedLessons: 0,
    difficulty: 'Advanced',
    description: 'Network topology, adjacency lists, Dijkstra shortest path, topological sorting, and cycle detection in DAGs.',
    topics: ['Adjacency Lists & Matrices', 'BFS vs DFS Traversal', 'Topological Sort (Kahn Algorithm)', "Dijkstra's Shortest Path"],
    keyIdea: 'Always maintain a "visited" set to prevent infinite cycles in cyclic graphs.',
    codeSnippet: `// Number of Islands (BFS/DFS) - O(V + E)
function numIslands(grid: string[][]): number {
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(grid, r, c);
      }
    }
  }
  return count;
}`,
  },
  // Additional modules for full 11 list
  {
    id: 'hash-tables',
    name: 'Hash Tables',
    iconType: 'hash-tables',
    progress: 0,
    completed: false,
    totalLessons: 6,
    completedLessons: 0,
    difficulty: 'Beginner',
    description: 'Key-value associative mapping, collision resolution, hash functions, and constant-time average lookups.',
    topics: ['Hash Collision Resolution', 'Load Factor & Rehashing', 'HashSet vs HashMap', 'LRU Cache Design'],
    keyIdea: 'Average O(1) lookups; beware of worst-case O(n) under heavy hash collisions.',
    codeSnippet: `// Frequency Counter pattern
const countMap = new Map<string, number>();
for (const item of items) {
  countMap.set(item, (countMap.get(item) || 0) + 1);
}`,
  },
  {
    id: 'heaps',
    name: 'Heaps & Priority Queues',
    iconType: 'heaps',
    progress: 0,
    completed: false,
    totalLessons: 6,
    completedLessons: 0,
    difficulty: 'Intermediate',
    description: 'Binary min/max heaps, heapify sift operations, top-K frequent elements, and streaming median finding.',
    topics: ['Min-Heap vs Max-Heap', 'Heapify O(n) vs O(n log n)', 'Top K Elements', 'Median from Data Stream'],
    keyIdea: 'Heaps grant instantaneous O(1) min/max peek and O(log n) insertions/extractions.',
    codeSnippet: `// Finding K-th largest with Min Heap of size K`,
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    iconType: 'dp',
    progress: 0,
    completed: false,
    totalLessons: 12,
    completedLessons: 0,
    difficulty: 'Advanced',
    description: 'Optimal substructure and overlapping subproblems, memoization vs bottom-up tabulation, and knapsack problem.',
    topics: ['1D Tabulation & Memoization', '0/1 Knapsack Problem', 'Longest Common Subsequence', 'State Machine DP'],
    keyIdea: 'Break the problem into subproblems; store solutions to avoid recomputing identical states.',
    codeSnippet: `// 1D DP: Climbing Stairs - O(n) time, O(1) space
function climbStairs(n: number): number {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
  },
  {
    id: 'trie',
    name: 'Trie (Prefix Trees)',
    iconType: 'trie',
    progress: 0,
    completed: false,
    totalLessons: 4,
    completedLessons: 0,
    difficulty: 'Intermediate',
    description: 'Prefix tree for rapid string retrieval, autocomplete search engines, and bitwise XOR maximum matching.',
    topics: ['Trie Node Architecture', 'Prefix Insertion & Search', 'Autocomplete Engine', 'Bitwise XOR Trie'],
    keyIdea: 'Search complexity is proportional to word length O(L), independent of total dictionary size.',
    codeSnippet: `// Trie Node Definition
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
}`,
  },
];
