import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Shuffle,
  BarChart3,
  Info,
  Clock,
  Zap,
} from 'lucide-react';

interface VisualizerViewProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardXP: (amount: number) => void;
}

type AlgorithmType = 'bubble-sort' | 'selection-sort' | 'binary-search';

interface AnimationStep {
  array: number[];
  comparing: number[]; // indices being compared
  swapped: number[]; // indices being swapped
  sorted: number[]; // indices sorted
  description: string;
  targetIndex?: number;
}

const INITIAL_ARRAY = [45, 18, 72, 34, 90, 23, 61, 12, 85, 50];

export const VisualizerView: React.FC<VisualizerViewProps> = ({
  isOpen,
  onClose,
  onAwardXP,
}) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble-sort');
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(400); // ms
  const [searchTarget, setSearchTarget] = useState<number>(61);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate steps whenever array or algorithm changes
  useEffect(() => {
    generateSteps(array, algorithm);
  }, [algorithm]);

  const generateSteps = (currentArr: number[], algo: AlgorithmType) => {
    const newSteps: AnimationStep[] = [];
    const arr = [...currentArr];

    if (algo === 'bubble-sort') {
      const n = arr.length;
      const sortedIndices: number[] = [];

      newSteps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        sorted: [],
        description: 'Initial array. Bubble Sort compares adjacent elements and bubbles larger ones to the right.',
      });

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          newSteps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapped: [],
            sorted: [...sortedIndices],
            description: `Comparing elements arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
          });

          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            newSteps.push({
              array: [...arr],
              comparing: [],
              swapped: [j, j + 1],
              sorted: [...sortedIndices],
              description: `Swapped: ${arr[j + 1]} was greater than ${arr[j]}.`,
            });
          }
        }
        sortedIndices.push(n - 1 - i);
      }
      sortedIndices.push(0);
      newSteps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        sorted: [...sortedIndices],
        description: 'Array is completely sorted! Total O(n²) comparisons finished.',
      });
    } else if (algo === 'selection-sort') {
      const n = arr.length;
      const sortedIndices: number[] = [];

      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          newSteps.push({
            array: [...arr],
            comparing: [minIdx, j],
            swapped: [],
            sorted: [...sortedIndices],
            description: `Scanning index ${j} (${arr[j]}). Current minimum is at ${minIdx} (${arr[minIdx]}).`,
          });

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }

        if (minIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          newSteps.push({
            array: [...arr],
            comparing: [],
            swapped: [i, minIdx],
            sorted: [...sortedIndices],
            description: `Swapped minimum element ${arr[i]} into position ${i}.`,
          });
        }
        sortedIndices.push(i);
      }
      sortedIndices.push(n - 1);
      newSteps.push({
        array: [...arr],
        comparing: [],
        swapped: [],
        sorted: [...sortedIndices],
        description: 'Selection Sort completed! Elements in place.',
      });
    } else if (algo === 'binary-search') {
      const sortedArr = [...arr].sort((a, b) => a - b);
      let low = 0;
      let high = sortedArr.length - 1;
      let found = false;

      newSteps.push({
        array: [...sortedArr],
        comparing: [],
        swapped: [],
        sorted: Array.from({ length: sortedArr.length }, (_, idx) => idx),
        description: `Binary Search requires a sorted array. Searching for target ${searchTarget} in logarithmic O(log n) time.`,
      });

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        newSteps.push({
          array: [...sortedArr],
          comparing: [mid],
          swapped: [],
          sorted: Array.from({ length: sortedArr.length }, (_, idx) => idx),
          description: `Checking middle element arr[${mid}] (${sortedArr[mid]}). Range: [${low} .. ${high}].`,
        });

        if (sortedArr[mid] === searchTarget) {
          newSteps.push({
            array: [...sortedArr],
            comparing: [],
            swapped: [],
            sorted: [mid],
            targetIndex: mid,
            description: `Found target ${searchTarget} at index ${mid} in O(log n) steps!`,
          });
          found = true;
          break;
        } else if (sortedArr[mid] < searchTarget) {
          low = mid + 1;
          newSteps.push({
            array: [...sortedArr],
            comparing: [],
            swapped: [],
            sorted: Array.from({ length: sortedArr.length }, (_, idx) => idx),
            description: `${sortedArr[mid]} < ${searchTarget}. Discarding left half; moving search to [${low} .. ${high}].`,
          });
        } else {
          high = mid - 1;
          newSteps.push({
            array: [...sortedArr],
            comparing: [],
            swapped: [],
            sorted: Array.from({ length: sortedArr.length }, (_, idx) => idx),
            description: `${sortedArr[mid]} > ${searchTarget}. Discarding right half; moving search to [${low} .. ${high}].`,
          });
        }
      }

      if (!found) {
        newSteps.push({
          array: [...sortedArr],
          comparing: [],
          swapped: [],
          sorted: [],
          description: `Target ${searchTarget} not found in array.`,
        });
      }
    }

    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleRandomize = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 10);
    setArray(newArr);
    generateSteps(newArr, algorithm);
  };

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            onAwardXP(15);
            return prev;
          }
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speed]);

  if (!isOpen) return null;

  const currentStep = steps[currentStepIndex] || {
    array,
    comparing: [],
    swapped: [],
    sorted: [],
    description: 'Ready to visualize.',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm">
      <div
        id="dsa-visualizer-modal"
        className="relative w-full max-w-4xl bg-[#090e1f] border border-[#1e2954] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#182348] bg-[#0c1328] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base">
                  Interactive DSA Visualizer
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                  Step-by-Step
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Observe pointer movements, comparisons, and element swaps live
              </p>
            </div>
          </div>

          <button
            id="close-visualizer-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#151f40] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Algorithm Selector & Controls Toolbar */}
        <div className="p-4 border-b border-[#151c38] bg-[#090f22] flex flex-wrap items-center justify-between gap-3">
          {/* Algorithm tabs */}
          <div className="flex items-center gap-1.5 bg-[#0e152e] p-1 rounded-xl border border-[#1b254a]">
            <button
              onClick={() => setAlgorithm('bubble-sort')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                algorithm === 'bubble-sort'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bubble Sort
            </button>
            <button
              onClick={() => setAlgorithm('selection-sort')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                algorithm === 'selection-sort'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Selection Sort
            </button>
            <button
              onClick={() => setAlgorithm('binary-search')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                algorithm === 'binary-search'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Binary Search
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              id="visualizer-randomize-btn"
              onClick={handleRandomize}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141d3a] hover:bg-[#1b264e] border border-[#23305c] text-xs text-slate-300 hover:text-white transition-colors"
              title="Generate New Numbers"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Randomize</span>
            </button>

            <button
              id="visualizer-reset-btn"
              onClick={() => {
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#141d3a] hover:bg-[#1b264e] border border-[#23305c] text-xs text-slate-300 hover:text-white transition-colors"
              title="Reset to Step 0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              id="visualizer-play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-medium text-white shadow-md shadow-blue-600/25 transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              id="visualizer-step-btn"
              disabled={currentStepIndex >= steps.length - 1}
              onClick={() => {
                setIsPlaying(false);
                if (currentStepIndex < steps.length - 1) {
                  setCurrentStepIndex(currentStepIndex + 1);
                }
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#141d3a] hover:bg-[#1b264e] border border-[#23305c] text-xs text-slate-300 disabled:opacity-40 transition-colors"
              title="Step Forward"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visualizer Stage Container */}
        <div className="flex-1 p-6 flex flex-col justify-between bg-[#070b18] overflow-y-auto">
          {/* Array Bars Visualization */}
          <div className="h-60 sm:h-72 w-full flex items-end justify-center gap-2 sm:gap-3 px-4 pt-6 border-b border-[#141b36] pb-4">
            {currentStep.array.map((val, idx) => {
              const isComparing = currentStep.comparing.includes(idx);
              const isSwapped = currentStep.swapped.includes(idx);
              const isSorted = currentStep.sorted.includes(idx);
              const isTarget = currentStep.targetIndex === idx;

              let barBg = 'bg-blue-600/70 border-blue-400/40';
              if (isTarget) {
                barBg = 'bg-emerald-500 border-emerald-300 shadow-[0_0_15px_#10b981] animate-bounce';
              } else if (isSwapped) {
                barBg = 'bg-rose-500 border-rose-300 shadow-[0_0_12px_#f43f5e]';
              } else if (isComparing) {
                barBg = 'bg-amber-400 border-amber-200 shadow-[0_0_12px_#fbbf24]';
              } else if (isSorted) {
                barBg = 'bg-indigo-500/80 border-indigo-400/50';
              }

              const heightPercentage = Math.max((val / 100) * 100, 15);

              return (
                <div
                  key={idx}
                  className="flex-1 max-w-[48px] flex flex-col items-center justify-end group transition-all duration-300"
                >
                  <span className="text-[11px] font-mono text-slate-300 mb-1 font-semibold">
                    {val}
                  </span>
                  <div
                    className={`w-full rounded-t-lg border-t border-x transition-all duration-300 ${barBg}`}
                    style={{ height: `${heightPercentage}%` }}
                  />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step description and progress readout */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Description box */}
            <div className="md:col-span-2 bg-[#0c1328] border border-[#1b244a] rounded-xl p-3.5 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <span>Step {currentStepIndex + 1} of {steps.length}</span>
                  {currentStepIndex === steps.length - 1 && steps.length > 0 && (
                    <span className="text-emerald-400 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>
            </div>

            {/* Complexity Card */}
            <div className="bg-[#0c1328] border border-[#1b244a] rounded-xl p-3.5 flex flex-col justify-between text-xs">
              <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between pb-1.5 border-b border-[#182348]">
                <span>Algorithm Metrics</span>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Time Complexity:</span>
                  <span className="text-amber-300 font-mono font-semibold">
                    {algorithm === 'binary-search' ? 'O(log n)' : 'O(n²)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Space Complexity:</span>
                  <span className="text-emerald-400 font-mono font-semibold">O(1)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
