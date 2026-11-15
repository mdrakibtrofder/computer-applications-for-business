import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Clock,
  RotateCcw,
  Award,
  BookOpen,
  PlayCircle,
  Timer,
} from 'lucide-react';
import { QuizQuestion } from '../types/course';
import { saveQuizScore } from '../utils/storage';

export type QuizMode = 'overview' | 'practice' | 'exam';

interface QuizEngineProps {
  quizId: string;
  title: string;
  subtitle?: string;
  questions: QuizQuestion[];
  examMinutes?: number;
  onScoreSaved?: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quizId,
  title,
  subtitle,
  questions,
  examMinutes = 15,
  onScoreSaved,
}) => {
  // Default mode: Quick Overview Mode as explicitly required
  const [mode, setMode] = useState<QuizMode>('overview');

  // Mode 1: Quick Overview global toggle (default: answers visible)
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(true);

  // Mode 2: Practice Mode state
  const [practiceSelections, setPracticeSelections] = useState<Record<string, number>>({});

  // Mode 3: Exam Mode state
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examSelections, setExamSelections] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(examMinutes * 60);

  // Reset exam timer when quizId or examMinutes changes
  useEffect(() => {
    setPracticeSelections({});
    setExamStarted(false);
    setExamSubmitted(false);
    setExamSelections({});
    setSecondsLeft(examMinutes * 60);
  }, [quizId, examMinutes]);

  useEffect(() => {
    if (mode !== 'exam' || !examStarted || examSubmitted) return;
    if (secondsLeft <= 0) {
      handleExamSubmit();
      return;
    }
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, examStarted, examSubmitted, secondsLeft]);

  const handleExamSubmit = () => {
    const score = questions.reduce(
      (acc, q) => (examSelections[q.id] === q.correctIndex ? acc + 1 : acc),
      0
    );
    saveQuizScore(quizId, score, questions.length);
    setExamSubmitted(true);
    onScoreSaved?.();
  };

  const startNewExam = () => {
    setExamSelections({});
    setExamSubmitted(false);
    setSecondsLeft(examMinutes * 60);
    setExamStarted(true);
  };

  const resetPractice = () => {
    setPracticeSelections({});
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const practiceAnsweredCount = Object.keys(practiceSelections).length;
  const practiceCorrectCount = questions.reduce(
    (acc, q) => (practiceSelections[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );

  const examCorrectCount = questions.reduce(
    (acc, q) => (examSelections[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );
  const examAnsweredCount = Object.keys(examSelections).length;

  return (
    <div className="space-y-6">
      {/* Header & 3-Mode Switcher */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
            {subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{subtitle}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2 tabular-nums">
              <span>{questions.length} Questions</span>
              <span aria-hidden="true">·</span>
              <span>Multiple Choice</span>
              <span aria-hidden="true">·</span>
              <span>{examMinutes} min Exam Timer</span>
            </div>
          </div>

          {/* Segmented 3-Mode Selector */}
          <div
            role="tablist"
            aria-label="Quiz mode"
            className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'overview'}
              onClick={() => setMode('overview')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                mode === 'overview'
                  ? 'bg-white dark:bg-slate-900 text-[#1E3A8A] dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Quick Overview
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'practice'}
              onClick={() => setMode('practice')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                mode === 'practice'
                  ? 'bg-white dark:bg-slate-900 text-[#217346] dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Practice Mode
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'exam'}
              onClick={() => setMode('exam')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                mode === 'exam'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              Exam Mode
            </button>
          </div>
        </div>

        {/* Mode-specific Top Control Bar */}
        {mode === 'overview' && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Review all {questions.length} questions, verified answers, and explanations on one scrollable page.
            </p>
            <button
              type="button"
              onClick={() => setShowAllAnswers((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 transition-colors"
            >
              {showAllAnswers ? (
                <>
                  <EyeOff className="w-4 h-4 text-slate-500" />
                  Hide Answers
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-[#1E3A8A] dark:text-indigo-400" />
                  Show Answers
                </>
              )}
            </button>
          </div>
        )}

        {mode === 'practice' && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 tabular-nums">
              Progress: <strong className="text-slate-900 dark:text-white">{practiceAnsweredCount}/{questions.length}</strong> answered
              {practiceAnsweredCount > 0 && (
                <>
                  {' '}· Score: <strong className="text-emerald-700 dark:text-emerald-400">{practiceCorrectCount}/{practiceAnsweredCount}</strong>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={resetPractice}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Practice
            </button>
          </div>
        )}

        {mode === 'exam' && examStarted && !examSubmitted && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs sm:text-sm tabular-nums">
              <span
                className={`inline-flex items-center gap-1.5 font-mono font-bold px-3 py-1 rounded-lg border ${
                  secondsLeft < 60
                    ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
                    : 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                {formatTime(secondsLeft)}
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                Answered: <strong className="text-slate-900 dark:text-white">{examAnsweredCount}/{questions.length}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleExamSubmit}
              className="px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-indigo-900 text-white text-xs font-semibold transition-colors"
            >
              Submit Exam
            </button>
          </div>
        )}
      </div>

      {/* MODE 1: QUICK OVERVIEW MODE */}
      {mode === 'overview' && (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Question {idx + 1} · {q.moduleLabel}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{q.question}</h3>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, oIdx) => {
                  const isCorrect = oIdx === q.correctIndex;
                  const letter = String.fromCharCode(97 + oIdx);
                  return (
                    <div
                      key={oIdx}
                      className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg border text-sm ${
                        showAllAnswers && isCorrect
                          ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/35 text-emerald-950 dark:text-emerald-200 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>
                        <span className="font-mono text-xs opacity-70 mr-2">({letter})</span>
                        {opt}
                      </span>
                      {showAllAnswers && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
              {showAllAnswers && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong className="text-emerald-700 dark:text-emerald-400">Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODE 2: PRACTICE MODE */}
      {mode === 'practice' && (
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const picked = practiceSelections[q.id];
            const hasAnswered = picked !== undefined;
            const isRight = picked === q.correctIndex;

            return (
              <div
                key={q.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs"
              >
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Question {idx + 1} · {q.moduleLabel}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">{q.question}</h3>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, oIdx) => {
                    const letter = String.fromCharCode(97 + oIdx);
                    const isSelected = picked === oIdx;
                    const isCorrect = oIdx === q.correctIndex;

                    let cardCls =
                      'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-800 dark:text-slate-200 cursor-pointer';
                    if (hasAnswered) {
                      if (isCorrect) {
                        cardCls =
                          'border-emerald-400 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/35 text-emerald-950 dark:text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        cardCls =
                          'border-red-300 dark:border-red-700 bg-red-50/80 dark:bg-red-950/35 text-red-900 dark:text-red-200';
                      } else {
                        cardCls = 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={hasAnswered}
                        onClick={() => setPracticeSelections((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`flex items-center justify-between gap-2 text-left px-3.5 py-2.5 rounded-lg border text-sm transition-colors ${cardCls}`}
                      >
                        <span>
                          <span className="font-mono text-xs opacity-70 mr-2">({letter})</span>
                          {opt}
                        </span>
                        {hasAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                        {hasAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasAnswered && (
                  <div
                    className={`mt-3 p-3 rounded-lg border text-xs sm:text-sm ${
                      isRight
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/25 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-red-50/60 dark:bg-red-950/25 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
                    }`}
                  >
                    <div className="font-semibold mb-0.5 flex items-center gap-1.5">
                      {isRight ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Incorrect — Correct answer is ({String.fromCharCode(97 + q.correctIndex)}) {q.options[q.correctIndex]}
                        </>
                      )}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 3: EXAM MODE */}
      {mode === 'exam' && (
        <div>
          {!examStarted ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center max-w-xl mx-auto shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-[#1E3A8A] dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
                <Timer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Simulated Exam Environment</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                You will have <strong>{examMinutes} minutes</strong> to complete <strong>{questions.length} questions</strong>.
                Answers and explanations stay hidden until you submit the exam, when your final scorecard and full review will appear.
              </p>
              <button
                type="button"
                onClick={startNewExam}
                className="px-6 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-indigo-900 text-white text-sm font-semibold transition-colors"
              >
                Start Timed Exam
              </button>
            </div>
          ) : !examSubmitted ? (
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const picked = examSelections[q.id];
                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs"
                  >
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Question {idx + 1} of {questions.length} · {q.moduleLabel}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">{q.question}</h3>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oIdx) => {
                        const letter = String.fromCharCode(97 + oIdx);
                        const isSelected = picked === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => setExamSelections((prev) => ({ ...prev, [q.id]: oIdx }))}
                            className={`text-left px-3.5 py-2.5 rounded-lg border text-sm transition-colors ${
                              isSelected
                                ? 'border-[#1E3A8A] dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <span className="font-mono text-xs opacity-70 mr-2">({letter})</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-sm text-slate-600 dark:text-slate-400 tabular-nums">
                  {examAnsweredCount} of {questions.length} questions answered
                </span>
                <button
                  type="button"
                  onClick={handleExamSubmit}
                  className="px-6 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-indigo-900 text-white text-sm font-semibold transition-colors"
                >
                  Submit & View Scorecard
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Final Scorecard */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-[#1E3A8A] dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Exam Scorecard</div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                        {examCorrectCount} / {questions.length}{' '}
                        <span className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                          ({Math.round((examCorrectCount / questions.length) * 100)}%)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Score saved to your browser progress. Review every answer below.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={startNewExam}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 transition-colors self-start sm:self-center"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake Exam
                  </button>
                </div>
              </div>

              {/* Full Review */}
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const picked = examSelections[q.id];
                  const isCorrect = picked === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Question {idx + 1} · {q.moduleLabel}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold ${
                            isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> {picked === undefined ? 'Unanswered' : 'Incorrect'}
                            </>
                          )}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3">{q.question}</h3>
                      <div className="grid sm:grid-cols-2 gap-2 text-sm">
                        {q.options.map((opt, oIdx) => {
                          const letter = String.fromCharCode(97 + oIdx);
                          const isKey = oIdx === q.correctIndex;
                          const isUser = oIdx === picked;
                          return (
                            <div
                              key={oIdx}
                              className={`px-3 py-2 rounded-lg border flex items-center justify-between ${
                                isKey
                                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/80 dark:bg-emerald-950/35 text-emerald-950 dark:text-emerald-200 font-semibold'
                                  : isUser
                                  ? 'border-red-300 dark:border-red-700 bg-red-50/80 dark:bg-red-950/35 text-red-900 dark:text-red-200'
                                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              <span>
                                <span className="font-mono text-xs opacity-70 mr-1.5">({letter})</span>
                                {opt}
                              </span>
                              {isKey && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                              {!isKey && isUser && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-800 dark:text-slate-200">Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
