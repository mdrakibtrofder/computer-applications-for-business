import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, FileText, ShieldAlert, Award, ArrowRight } from 'lucide-react';
import {
  COURSE_INFO,
  COURSE_OBJECTIVES,
  COURSE_OUTCOMES,
  LAB_RULES,
  MARK_DISTRIBUTION,
  WEEKLY_PLAN,
} from '../data/syllabus';

export const SyllabusPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
          Official Course Outline · BAUST, Saidpur
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Course Syllabus &amp; 14-Week Lab Plan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Complete curriculum structure, learning outcomes, weekly lab schedule, grading rules, and lab standards for {COURSE_INFO.code}.
        </p>
      </div>

      {/* Course Info + Objectives */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#4F46E5]" />
            Course Overview
          </h2>
          <dl className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {[
              ['Course Code & Title', `${COURSE_INFO.code} — ${COURSE_INFO.title}`],
              ['Credit & Hours', COURSE_INFO.credit],
              ['Institution', COURSE_INFO.institution],
              ['Core Software', COURSE_INFO.tools],
              [
                'Course Teachers',
                COURSE_INFO.teachers.map((t) => `${t.name} (${t.credit})`).join(' · '),
              ],
            ].map(([k, v]) => (
              <div key={k} className="py-3 grid sm:grid-cols-3 gap-1 sm:gap-4">
                <dt className="font-semibold text-slate-700 dark:text-slate-300">{k}</dt>
                <dd className="sm:col-span-2 text-slate-600 dark:text-slate-400">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Course Objectives
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {COURSE_OBJECTIVES}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-4 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <strong>Excel-First Focus:</strong> Weeks 8–14 (half of the semester and 70% of the Lab Final practical marks) focus specifically on Microsoft Excel for business calculations and reporting.
          </div>
        </div>
      </div>

      {/* Course Outcomes (CO1-CO5) */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#217346]" />
          Course Outcomes (COs)
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {COURSE_OUTCOMES.map((item) => (
            <div
              key={item.co}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-1.5"
            >
              <div className="text-xs font-bold font-mono text-[#4F46E5] dark:text-indigo-400">
                {item.co}
              </div>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 14-Week Plan */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#4F46E5]" />
              14-Week Teaching &amp; Lab Plan
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Topics marked ★ are Extension (self-study) lessons designed for deeper mastery.
            </p>
          </div>
          <Link
            to="/labs"
            className="text-xs font-semibold text-[#4F46E5] dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            Open all Lab Sheets
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 px-4 font-semibold">Week</th>
                <th className="py-3 px-4 font-semibold">Topic</th>
                <th className="py-3 px-4 font-semibold">Lessons</th>
                <th className="py-3 px-4 font-semibold">Lab / Exam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {WEEKLY_PLAN.map((row) => (
                <tr
                  key={row.week}
                  className={
                    row.isExcel
                      ? 'bg-emerald-50/35 dark:bg-emerald-950/15 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap tabular-nums">
                    Week {row.week}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    <Link
                      to={`/module/${row.moduleId}`}
                      className="hover:text-[#4F46E5] dark:hover:text-indigo-400 font-medium"
                    >
                      {row.topic}
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {row.lessons}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                        row.isExcel
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#1B5E3A] dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {row.lab}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mark Distribution + Lab Rules */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#4F46E5]" />
              Mark Distribution (100 Marks)
            </h2>
            <Link to="/assessment" className="text-xs font-semibold text-[#4F46E5] hover:underline">
              Full Exam Breakdown →
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {MARK_DISTRIBUTION.map((m) => (
              <div key={m.component} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {m.component}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{m.notes}</div>
                </div>
                <span className="font-mono font-bold text-sm text-[#4F46E5] dark:text-indigo-400 shrink-0 tabular-nums">
                  {m.marks}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            Mandatory Lab Rules
          </h2>
          <ol className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            {LAB_RULES.map((rule, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{rule}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
};
