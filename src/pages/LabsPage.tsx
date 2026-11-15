import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ClipboardList, Clock } from 'lucide-react';
import { LABS } from '../data/labs';
import { getLabChecklist } from '../utils/storage';

export const LabsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'office' | 'excel'>('all');

  const filtered = LABS.filter((lab) => {
    if (filter === 'excel') return lab.isExcel;
    if (filter === 'office') return !lab.isExcel;
    return true;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
            Weekly Practicals · Labs 1–13
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Lab Sheets &amp; Checklists
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Every weekly lab sheet with step-by-step tasks, linked datasets, hidden expected results, grading rubrics, and A4 print support.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All (13)' },
            { id: 'office', label: 'Basics, Word & PPT (1–6)' },
            { id: 'excel', label: 'Excel Labs (7–13)' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id as 'all' | 'office' | 'excel')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                filter === btn.id
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((lab) => {
          const checked = getLabChecklist(lab.id);
          const pct = Math.round((checked.length / lab.tasks.length) * 100);
          return (
            <Link
              key={lab.id}
              to={`/labs/${lab.id}`}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-md ${
                      lab.isExcel
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-[#217346] dark:text-emerald-400'
                        : 'bg-indigo-50 dark:bg-indigo-950/50 text-[#4F46E5] dark:text-indigo-400'
                    }`}
                  >
                    Lab {lab.number} · {lab.week}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {lab.duration}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#4F46E5] dark:group-hover:text-indigo-400 transition-colors">
                    {lab.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                    {lab.objective}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  <span className="inline-flex items-center gap-1">
                    <ClipboardList className="w-3.5 h-3.5" />
                    {checked.length}/{lab.tasks.length} steps
                  </span>
                  {pct === 100 && (
                    <span className="inline-flex items-center gap-1 text-[#217346] dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Done
                    </span>
                  )}
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: lab.isExcel ? '#217346' : '#4F46E5',
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <span>Open Lab Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
