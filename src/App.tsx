import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HeroCard } from './components/HeroCard';
import { AgentSection } from './components/AgentSection';
import { ModuleSection } from './components/ModuleSection';
import { TutorChatModal } from './components/views/TutorChatModal';
import { VisualizerView } from './components/views/VisualizerView';
import { QuizModal } from './components/views/QuizModal';
import { CodingLabModal } from './components/views/CodingLabModal';
import { LearningPathModal } from './components/views/LearningPathModal';
import { NotesModal } from './components/views/NotesModal';
import { ModuleDetailModal } from './components/views/ModuleDetailModal';
import { AllModulesModal } from './components/views/AllModulesModal';
import { ProfileModal } from './components/views/ProfileModal';
import { AGENTS_DATA, MODULES_DATA } from './data/mockData';
import { Agent, LearningModule, NavRoute, UserStats } from './types';

export default function App() {
  // Navigation & View States
  const [activeRoute, setActiveRoute] = useState<NavRoute>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Active Modals
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCodingLabOpen, setIsCodingLabOpen] = useState(false);
  const [isPathOpen, setIsPathOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isAllModulesOpen, setIsAllModulesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  // Data & State
  const [modules, setModules] = useState<LearningModule[]>(MODULES_DATA);
  const [stats, setStats] = useState<UserStats>({
    streakDays: 1,
    xp: 0,
    badgesCount: 0,
    completedModulesCount: 0,
    totalModulesCount: 11,
  });

  // Gamification helpers
  const handleAwardXP = (amount: number) => {
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  };

  const handleAwardBadge = () => {
    setStats((prev) => ({
      ...prev,
      badgesCount: prev.badgesCount + 1,
    }));
  };

  // Toggle module completion
  const handleToggleModuleComplete = (moduleId: string) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          const nextCompleted = !mod.completed;
          const nextProgress = nextCompleted ? 100 : 0;
          return {
            ...mod,
            completed: nextCompleted,
            progress: nextProgress,
          };
        }
        return mod;
      })
    );

    // Update stats accordingly
    setStats((prev) => {
      const targetMod = modules.find((m) => m.id === moduleId);
      const isCurrentlyCompleted = targetMod?.completed;
      const newCompletedCount = isCurrentlyCompleted
        ? Math.max(0, prev.completedModulesCount - 1)
        : Math.min(prev.totalModulesCount, prev.completedModulesCount + 1);

      return {
        ...prev,
        completedModulesCount: newCompletedCount,
        xp: isCurrentlyCompleted ? Math.max(0, prev.xp - 100) : prev.xp + 100,
        badgesCount:
          !isCurrentlyCompleted && newCompletedCount > 0
            ? prev.badgesCount + 1
            : prev.badgesCount,
      };
    });

    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule((prev) =>
        prev
          ? {
              ...prev,
              completed: !prev.completed,
              progress: !prev.completed ? 100 : 0,
            }
          : null
      );
    }
  };

  const handleResetStats = () => {
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        completed: false,
        progress: 0,
      }))
    );
    setStats({
      streakDays: 1,
      xp: 0,
      badgesCount: 0,
      completedModulesCount: 0,
      totalModulesCount: 11,
    });
    setIsProfileOpen(false);
  };

  // Agent selection
  const handleSelectAgent = (agent: Agent) => {
    switch (agent.id) {
      case 'tutor':
        setIsTutorOpen(true);
        break;
      case 'quiz':
        setIsQuizOpen(true);
        break;
      case 'coding':
        setIsCodingLabOpen(true);
        break;
      case 'path':
        setIsPathOpen(true);
        break;
      case 'notes':
        setIsNotesOpen(true);
        break;
      default:
        break;
    }
  };

  // Navigation routing
  const handleRouteChange = (route: NavRoute) => {
    setActiveRoute(route);
    switch (route) {
      case 'dashboard':
        // Return to main dashboard view
        break;
      case 'tutor':
        setIsTutorOpen(true);
        break;
      case 'quiz':
        setIsQuizOpen(true);
        break;
      case 'visualizer':
        setIsVisualizerOpen(true);
        break;
      case 'coding-lab':
        setIsCodingLabOpen(true);
        break;
      case 'learning-path':
        setIsPathOpen(true);
        break;
      case 'ai-notes':
        setIsNotesOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Fixed Left Sidebar */}
      <Sidebar
        activeRoute={activeRoute}
        onRouteChange={handleRouteChange}
        stats={stats}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Viewport Container */}
      <div className="lg:pl-60 flex-1 flex flex-col min-h-screen bg-[#070b16]">
        {/* Top Header Bar */}
        <TopBar
          stats={stats}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Dashboard Main Scrollable Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] w-full mx-auto">
          {/* Hero Welcome Card */}
          <HeroCard
            stats={stats}
            onAskTutor={() => setIsTutorOpen(true)}
            onOpenVisualizer={() => setIsVisualizerOpen(true)}
            onTakeQuiz={() => setIsQuizOpen(true)}
          />

          {/* AlgoAI Agents Section */}
          <AgentSection
            agents={AGENTS_DATA}
            onSelectAgent={handleSelectAgent}
          />

          {/* Learning Modules Section */}
          <ModuleSection
            modules={modules}
            completedCount={stats.completedModulesCount}
            totalCount={stats.totalModulesCount}
            onSelectModule={(mod) => setSelectedModule(mod)}
            onViewAll={() => setIsAllModulesOpen(true)}
          />
        </main>
      </div>

      {/* Interactive Modals & Feature Views */}
      <TutorChatModal
        isOpen={isTutorOpen}
        onClose={() => {
          setIsTutorOpen(false);
          setActiveRoute('dashboard');
        }}
        onAwardXP={handleAwardXP}
      />

      <VisualizerView
        isOpen={isVisualizerOpen}
        onClose={() => {
          setIsVisualizerOpen(false);
          setActiveRoute('dashboard');
        }}
        onAwardXP={handleAwardXP}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => {
          setIsQuizOpen(false);
          setActiveRoute('dashboard');
        }}
        onAwardXP={handleAwardXP}
      />

      <CodingLabModal
        isOpen={isCodingLabOpen}
        onClose={() => {
          setIsCodingLabOpen(false);
          setActiveRoute('dashboard');
        }}
        onAwardXP={handleAwardXP}
        onAwardBadge={handleAwardBadge}
      />

      <LearningPathModal
        isOpen={isPathOpen}
        onClose={() => {
          setIsPathOpen(false);
          setActiveRoute('dashboard');
        }}
        onAwardXP={handleAwardXP}
      />

      <NotesModal
        isOpen={isNotesOpen}
        onClose={() => {
          setIsNotesOpen(false);
          setActiveRoute('dashboard');
        }}
        onAwardXP={handleAwardXP}
      />

      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onToggleComplete={handleToggleModuleComplete}
        onOpenVisualizer={() => {
          setSelectedModule(null);
          setIsVisualizerOpen(true);
        }}
        onAskTutor={() => {
          setSelectedModule(null);
          setIsTutorOpen(true);
        }}
      />

      <AllModulesModal
        isOpen={isAllModulesOpen}
        onClose={() => setIsAllModulesOpen(false)}
        modules={modules}
        onSelectModule={(mod) => {
          setIsAllModulesOpen(false);
          setSelectedModule(mod);
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={stats}
        onResetStats={handleResetStats}
      />
    </div>
  );
}
