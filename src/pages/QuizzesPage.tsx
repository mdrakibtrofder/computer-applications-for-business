import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Award, Shuffle, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { MODULES } from '../content';
import { QuizEngine } from '../components/QuizEngine';
import { QuizQuestion } from '../types/course';
import { getQuizScores } from '../utils/storage';

type QuizTrack =
  | 'basics'
  | 'word'
  | 'powerpoint'
  | 'excel-foundations'
  | 'excel-business'
  | 'excel-analysis'
  | 'excel-practice'
  | 'final-practice';

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const QuizzesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTrack = (searchParams.get('module') as QuizTrack) || 'excel-foundations';

  const [selectedTrack, setSelectedTrack] = useState<QuizTrack>(initialTrack);
  const [seedCounter, setSeedCounter] = useState(0);
  const [savedScores, setSavedScores] = useState(() => getQuizScores());

  const excelQuestions = useMemo(
    () => QUIZ_QUESTIONS.filter((q) => q.moduleId.startsWith('excel')),
    []
  );
  const nonExcelQuestions = useMemo(
    () => QUIZ_QUESTIONS.filter((q) => !q.moduleId.startsWith('excel')),
    []
  );

  const activeConfig = useMemo<{
    quizId: string;
    title: string;
    subtitle: string;
    questions: QuizQuestion[];
    examMinutes: number;
  }>(() => {
    if (selectedTrack === 'excel-practice') {
      const picked = shuffleArray(excelQuestions).slice(0, 20);
      return {
        quizId: `excel-practice-${seedCounter}`,
        title: 'Excel-Only Practice Quiz (20 Questions)',
        subtitle: 'Drawn from Modules 3, 4, and 5 — ideal preparation for the 28-mark Excel section of Lab Final.',
        questions: picked,
        examMinutes: 20,
      };
    }

    if (selectedTrack === 'final-practice') {
      // 40 questions with >= 24 from Excel (Modules 3-5)
      const pickedExcel = shuffleArray(excelQuestions).slice(0, 26);
      const pickedOffice = shuffleArray(nonExcelQuestions).slice(0, 14);
      const combined = shuffleArray([...pickedExcel, ...pickedOffice]);
      return {
        quizId: `final-practice-${seedCounter}`,
        title: 'Full Course Final Practice Quiz (40 Questions)',
        subtitle: 'Balanced 40-question simulation with 26 Microsoft Excel questions (65%) and 14 Basics/Word/PowerPoint questions.',
        questions: combined,
        examMinutes: 35,
      };
    }

    const mod = MODULES.find((m) => m.id === selectedTrack) || MODULES[3];
    const modQs = QUIZ_QUESTIONS.filter((q) => q.moduleId === mod.id);
    return {
      quizId: `module-${mod.id}`,
      title: `${mod.number}: ${mod.title} Quiz`,
      subtitle: `${modQs.length} exam-style multiple-choice questions covering ${mod.subtitle}.`,
      questions: modQs,
      examMinutes: modQs.length >= 10 ? 12 : 10,
    };
  }, [selectedTrack, seedCounter, excelQuestions, nonExcelQuestions]);

  const handleSelectTrack = (track: QuizTrack) => {
    setSelectedTrack(track);
    const next = new URLSearchParams(searchParams);
    next.set('module', track);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-7">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
            54 Question Bank · Quick Overview, Practice &amp; Exam Modes
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            CSE 1204 MCQ Quiz Centre
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Study all questions and explanations in Quick Overview Mode, test yourself step by step in Practice Mode, or take a timed Exam Mode simulation.
          </p>
        </div>

        {(selectedTrack === 'excel-practice' || selectedTrack === 'final-practice') && (
          <button
            type="button"
            onClick={() => setSeedCounter((c) => c + 1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 shrink-0"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#4F46E5]" />
            Draw Fresh Random Set
          </button>
        )}
      </div>

      {/* Topic & Mock Quiz Selector Grid */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {MODULES.map((m) => {
            const active = selectedTrack === m.id;
            const saved = savedScores[`module-${m.id}`];
            const qCount = QUIZ_QUESTIONS.filter((q) => q.moduleId === m.id).length;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectTrack(m.id)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  active
                    ? 'border-[#4F46E5] bg-indigo-50/70 dark:bg-indigo-950/30 ring-1 ring-[#4F46E5]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 text-[11px] font-bold">
                  <span style={{ color: m.accentHex }}>{m.number}</span>
                  <span className="text-slate-400 font-mono">{qCount} Qs</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                  {m.shortTitle}
                </div>
                {saved && (
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#217346] dark:text-emerald-400">
                    <Award className="w-3 h-3" />
                    Best Exam: {saved.score}/{saved.total}
                  </div>
                )}
              </button>
            );
          })}

          {/* Excel-Only 20Q Practice */}
          <button
            type="button"
            onClick={() => handleSelectTrack('excel-practice')}
            className={`text-left p-3.5 rounded-xl border transition-all ${
              selectedTrack === 'excel-practice'
                ? 'border-[#217346] bg-emerald-50/70 dark:bg-emerald-950/30 ring-1 ring-[#217346]'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-[#217346] dark:text-emerald-400">
              <span className="inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Random Mix
              </span>
              <span className="font-mono">20 Qs</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              Excel-Only Quiz
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Modules 3–5 focus
            </div>
          </button>

          {/* Final Practice 40Q */}
          <button
            type="button"
            onClick={() => handleSelectTrack('final-practice')}
            className={`text-left p-3.5 rounded-xl border transition-all ${
              selectedTrack === 'final-practice'
                ? 'border-[#4F46E5] bg-indigo-50/70 dark:bg-indigo-950/30 ring-1 ring-[#4F46E5]'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-[#4F46E5] dark:text-indigo-400">
              <span>Full Course</span>
              <span className="font-mono">40 Qs</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              Final Practice Exam
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              26 Excel + 14 Office
            </div>
          </button>
        </div>
      </div>

      {/* 3-Mode Quiz Engine */}
      <QuizEngine
        quizId={activeConfig.quizId}
        title={activeConfig.title}
        subtitle={activeConfig.subtitle}
        questions={activeConfig.questions}
        examMinutes={activeConfig.examMinutes}
        onScoreSaved={() => setSavedScores(getQuizScores())}
      />
    </div>
  );
};
