import React, { useState } from 'react';
import {
  X,
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardXP: (amount: number) => void;
}

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Arrays & Two Pointers',
    question:
      'Given a sorted array of numbers, which technique allows you to find two numbers that sum to a target in O(n) time with O(1) space?',
    options: [
      'Two Pointers (Left and Right converging)',
      'Binary Search on each element (O(n log n))',
      'Nested loop brute force (O(n²))',
      'Depth-First Search recursion',
    ],
    correctIndex: 0,
    explanation:
      'Because the array is sorted, placing one pointer at the start and one at the end allows you to adjust the sum deterministically in a single pass O(n) without auxiliary memory.',
  },
  {
    id: 2,
    topic: 'Stacks',
    question:
      'Which data structure is the optimal choice for checking if a string of brackets (e.g. "({[]})") is validly balanced?',
    options: ['Queue (FIFO)', 'Stack (LIFO)', 'Min Heap', 'Hash Set'],
    correctIndex: 1,
    explanation:
      'A Last-In-First-Out (LIFO) Stack naturally pairs each closing bracket with the most recently encountered opening bracket in O(n) time.',
  },
  {
    id: 3,
    topic: 'Trees & Traversal',
    question:
      'Which traversal of a Binary Search Tree (BST) produces the node values in strictly ascending sorted order?',
    options: ['Preorder Traversal', 'Postorder Traversal', 'Inorder Traversal', 'Level-order Traversal'],
    correctIndex: 2,
    explanation:
      'Inorder traversal visits Left Subtree -> Root -> Right Subtree. Since all left nodes are smaller and right nodes are larger, Inorder yields sorted values.',
  },
  {
    id: 4,
    topic: 'Time Complexity',
    question:
      'What is the worst-case time complexity of standard QuickSort when a bad pivot is repeatedly chosen on a sorted array?',
    options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
    correctIndex: 1,
    explanation:
      'If the smallest or largest element is consistently picked as the pivot (e.g. first element on an already sorted list), the partition degrades to size n-1, resulting in O(n²) worst-case time.',
  },
];

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  onAwardXP,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      const earnedXP = (score + (selectedOption === currentQ.correctIndex ? 1 : 0)) * 25;
      if (earnedXP > 0) {
        onAwardXP(earnedXP);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm">
      <div
        id="quiz-agent-modal"
        className="relative w-full max-w-xl bg-[#090e1f] border border-[#1e2954] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#182348] bg-[#0c1328] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base">
                  Adaptive Quiz Agent
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300">
                  Adaptive MCQs
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Adjusts difficulty to reinforce your algorithmic weaknesses
              </p>
            </div>
          </div>

          <button
            id="close-quiz-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151f40] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {!quizFinished ? (
            <div>
              {/* Progress & Topic */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-semibold text-blue-400 uppercase tracking-wider text-[10px]">
                  Topic: {currentQ.topic}
                </span>
                <span>
                  Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Question text */}
              <h4 className="text-sm sm:text-base font-semibold text-white leading-snug mb-5">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle =
                    'bg-[#0e152e] border-[#1c264a] text-slate-300 hover:bg-[#141d3d] hover:border-blue-500/40';

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle =
                        'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_#10b98125]';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-300';
                    }
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-blue-600/20 border-blue-500 text-white shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswerSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                      )}
                      {isAnswerSubmitted && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation box after submit */}
              {isAnswerSubmitted && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#0c1328] border border-[#1b254a] text-xs leading-relaxed animate-in fade-in duration-300">
                  <div className="flex items-center gap-1.5 font-semibold text-blue-400 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Agent Explanation</span>
                  </div>
                  <p className="text-slate-300">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completion Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-indigo-500/25 mb-4">
                <Sparkles className="w-8 h-8 text-amber-300" />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">Quiz Completed!</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
                You scored <span className="text-emerald-400 font-bold">{score}</span> out of{' '}
                <span className="text-white font-bold">{QUIZ_QUESTIONS.length}</span> correct.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
                <span>+{score * 25} XP Awarded to your Dashboard</span>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141d3a] hover:bg-[#1b274e] border border-[#23305c] text-xs font-medium text-slate-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white shadow-md shadow-blue-600/25"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!quizFinished && (
          <div className="p-4 border-t border-[#182348] bg-[#0c1328] flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Score: <span className="text-white font-semibold">{score}</span>
            </span>

            {!isAnswerSubmitted ? (
              <button
                id="submit-quiz-answer-btn"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="next-quiz-question-btn"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-medium transition-all shadow-md shadow-blue-600/20"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
