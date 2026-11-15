import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckSquare,
  Database,
  Eye,
  EyeOff,
  Printer,
  Square,
} from 'lucide-react';
import { LABS, STANDARD_LAB_RUBRIC } from '../data/labs';
import { DATASETS } from '../data/datasets';
import { ALL_LESSONS } from '../content';
import {
  getBookmarks,
  getLabChecklist,
  toggleBookmark,
  toggleLabTask,
} from '../utils/storage';

export const LabDetailPage: React.FC = () => {
  const { labId } = useParams<{ labId: string }>();
  const lab = LABS.find((l) => l.id === labId) || LABS[0];

  const [checkedSteps, setCheckedSteps] = useState<number[]>(() => getLabChecklist(lab.id));
  const [showExpected, setShowExpected] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());

  useEffect(() => {
    setCheckedSteps(getLabChecklist(lab.id));
    setShowExpected(false);
  }, [lab.id]);

  const idx = LABS.findIndex((l) => l.id === lab.id);
  const prevLab = idx > 0 ? LABS[idx - 1] : null;
  const nextLab = idx >= 0 && idx < LABS.length - 1 ? LABS[idx + 1] : null;

  const rubric = lab.rubric || STANDARD_LAB_RUBRIC;
  const pagePath = `/labs/${lab.id}`;
  const isBookmarked = bookmarks.some((b) => b.path === pagePath);

  const handleToggleStep = (stepIdx: number) => {
    setCheckedSteps(toggleLabTask(lab.id, stepIdx));
  };

  const handleToggleBookmark = () => {
    setBookmarks(
      toggleBookmark({
        path: pagePath,
        title: `Lab ${lab.number}: ${lab.title}`,
        subtitle: `${lab.week} · ${lab.duration}`,
      })
    );
  };

  const linkedLessons = lab.lessons
    .map((code) => ALL_LESSONS.find((l) => l.code === code))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const linkedDatasets = (lab.datasetIds || [])
    .map((id) => DATASETS.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <Link
          to="/labs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#4F46E5]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all 13 Labs
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleBookmark}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              isBookmarked
                ? 'border-[#4F46E5] bg-indigo-50 dark:bg-indigo-950/40 text-[#4F46E5] dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Download / Print Lab Sheet
          </button>
        </div>
      </div>

      {/* Main Lab Sheet Container */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
            <span className={lab.isExcel ? 'text-[#217346] dark:text-emerald-400 font-bold' : 'text-[#4F46E5] font-bold'}>
              CSE 1204 · Lab {lab.number}
            </span>
            <span>·</span>
            <span>{lab.week}</span>
            <span>·</span>
            <span>{lab.duration}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Lab {lab.number}: {lab.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Objective:</strong> {lab.objective}
          </p>
        </div>

        {/* Linked Lessons & Datasets */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Linked Lessons
            </div>
            <div className="flex flex-wrap gap-2">
              {linkedLessons.map((l) => (
                <Link
                  key={l.id}
                  to={`/module/${l.moduleId}/${l.id}`}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#4F46E5] text-slate-700 dark:text-slate-200"
                >
                  {l.code} {l.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Datasets &amp; Submission
            </div>
            {linkedDatasets.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-1">
                {linkedDatasets.map((ds) => (
                  <Link
                    key={ds.id}
                    to={`/excel-lab?dataset=${ds.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#217346] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    <Database className="w-3 h-3" />
                    Open {ds.shortName}
                  </Link>
                ))}
              </div>
            )}
            <div className="text-xs text-slate-600 dark:text-slate-300 font-mono">
              Submit: {lab.submit}
            </div>
          </div>
        </div>

        {/* Interactive Tasks Checklist */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Tasks Checklist ({checkedSteps.length}/{lab.tasks.length} done)
            </h2>
            <span className="text-xs text-slate-500 no-print">Click each step as you finish it</span>
          </div>

          <div className="space-y-2">
            {lab.tasks.map((task, tIdx) => {
              const done = checkedSteps.includes(tIdx);
              return (
                <button
                  key={tIdx}
                  type="button"
                  onClick={() => handleToggleStep(tIdx)}
                  className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                    done
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {done ? (
                    <CheckSquare className="w-4.5 h-4.5 text-[#217346] dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-sm leading-relaxed ${
                      done ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <strong className="font-mono mr-1.5">{tIdx + 1}.</strong>
                    {task}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Expected Results (Hidden until clicked) */}
        {lab.expectedResults && lab.expectedResults.length > 0 && (
          <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Expected Results Check
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Attempt the formulas first, then reveal this box to verify your totals.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExpected((v) => !v)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 no-print"
              >
                {showExpected ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showExpected ? 'Hide Expected Results' : 'Show Expected Results'}
              </button>
            </div>

            {showExpected && (
              <ul className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-mono text-[#1B5E3A] dark:text-emerald-300 tabular-nums">
                {lab.expectedResults.map((res, rIdx) => (
                  <li key={rIdx}>• {res}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Grading Rubric */}
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Lab Grading Rubric
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-left text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2.5 px-4 font-semibold">Criterion</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rubric.map((r, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">{r.criterion}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {r.marks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Prev / Next Lab Navigation */}
      <div className="flex items-center justify-between gap-3 no-print">
        {prevLab ? (
          <Link
            to={`/labs/${prevLab.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Lab {prevLab.number}: {prevLab.title}
          </Link>
        ) : (
          <div />
        )}
        {nextLab && (
          <Link
            to={`/labs/${nextLab.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold"
          >
            Lab {nextLab.number}: {nextLab.title}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
