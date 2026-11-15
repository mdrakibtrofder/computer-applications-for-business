import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronRight,
  ClipboardCheck,
  Database,
  FileSpreadsheet,
  GraduationCap,
  HelpCircle,
  Keyboard,
  Layers,
  Play,
  Table2,
  CheckCircle2,
} from 'lucide-react';
import { ALL_LESSONS, MODULES } from '../content';
import { LABS } from '../data/labs';
import { COURSE_INFO } from '../data/syllabus';
import { getCompletedLessons } from '../utils/storage';

export const HomePage: React.FC = () => {
  const [completedIds] = useState<string[]>(() => getCompletedLessons());
  const [vatRate, setVatRate] = useState<number>(0.15);

  const totalLessons = ALL_LESSONS.length;
  const completedCount = completedIds.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Interactive Hero mini-ledger calculation (Dataset 1 Row 2: Pen Box A4)
  const heroCalc = useMemo(() => {
    const qty = 20;
    const price = 180;
    const discPct = 0.05;
    const gross = qty * price;
    const discount = gross * discPct;
    const net = gross - discount;
    const vat = Math.round(net * vatRate * 100) / 100;
    const total = net + vat;
    return { qty, price, gross, discount, net, vat, total };
  }, [vatRate]);

  const portalCards = [
    {
      to: '/excel-lab',
      badge: '7 Interactive Tools',
      title: 'Excel Lab & Playground',
      desc: 'Live formula grid with 70+ Excel functions, Reference Visualiser, 44 Formula Drills, 12 Error Spotters, Financial Calculators, and a Slicer Dashboard.',
      icon: FileSpreadsheet,
      iconBg: 'bg-[#217346]',
      badgeColor: 'text-[#217346] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      to: '/labs',
      badge: '13 Guided Labs',
      title: 'Weekly Lab Sheets',
      desc: 'Step-by-step lab assignments for Weeks 1–14 with interactive checklists, printable A4 sheets, grading rubrics, and hidden expected-result checks.',
      icon: ClipboardCheck,
      iconBg: 'bg-[#4F46E5]',
      badgeColor: 'text-[#4F46E5] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      to: '/quizzes',
      badge: '54 Questions · 3 Modes',
      title: 'Quizzes & Exam Simulator',
      desc: 'Quick Overview with Hide/Show Answers toggle, interactive Practice Mode with instant feedback, and a timed Exam Mode with final scorecards.',
      icon: HelpCircle,
      iconBg: 'bg-[#D24726]',
      badgeColor: 'text-[#D24726] dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40',
    },
    {
      to: '/datasets',
      badge: '5 Datasets + CSVs',
      title: 'Business Datasets & CSVs',
      desc: 'Download Rahim Traders Sales, Payroll, Invoice Ageing, Loan Options, and Quarterly Sales datasets with worked Answer Keys in Bangladeshi Taka.',
      icon: Database,
      iconBg: 'bg-[#2B579A]',
      badgeColor: 'text-[#2B579A] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40',
    },
    {
      to: '/functions',
      badge: '53 Functions',
      title: 'Excel Function Reference',
      desc: 'Searchable reference of every formula taught in CSE 1204 — Math, Logical, Lookup, Date, Financial, and 365 Dynamic Arrays with examples.',
      icon: Calculator,
      iconBg: 'bg-[#0D9488]',
      badgeColor: 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40',
    },
    {
      to: '/shortcuts',
      badge: 'Top 20 + Flashcards',
      title: 'Shortcuts & Glossary',
      desc: 'Master high-speed Windows, Word, PowerPoint, and Excel keyboard shortcuts with interactive flip flashcards and an A–Z business computing glossary.',
      icon: Keyboard,
      iconBg: 'bg-slate-700',
      badgeColor: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800',
    },
  ];

  const featuredLab = LABS[7]; // Lab 8: Formulas, references and basic functions

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-12">
      {/* HERO SECTION (Matching Reference Screenshot 1) */}
      <section className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xs">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-semibold tracking-wide text-[#4F46E5] dark:text-indigo-400 uppercase flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{COURSE_INFO.code}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-500 dark:text-slate-400">BAUST, Saidpur</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-500 dark:text-slate-400">0.75 Credits · 14 Lab Weeks</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Computer Applications{' '}
              <span className="text-[#4F46E5] dark:text-indigo-400 block sm:inline">
                for Business
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              Learn <strong>Windows, Microsoft Word, PowerPoint, and Excel</strong> through practical
              Bangladeshi business cases — invoices, payrolls, VAT ledgers, ageing receivables, loan
              schedules, PivotTables, and executive dashboards.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              More than half of CSE 1204 (Weeks 8–14) builds hands-on fluency in Microsoft Excel,
              supported by an interactive in-browser spreadsheet engine, 44 formula drills, 13
              weekly lab sheets, and 3-mode practice quizzes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/module/basics/0.1"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold shadow-xs transition-colors"
              >
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/excel-lab"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-semibold transition-colors"
              >
                <Table2 className="w-4 h-4 text-[#217346] dark:text-emerald-400" />
                Open Excel Lab
              </Link>
              <Link
                to="/syllabus"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#4F46E5] dark:hover:text-indigo-400 transition-colors"
              >
                14-Week Plan
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <GraduationCap className="w-4 h-4 text-[#4F46E5] dark:text-indigo-400 shrink-0 mt-0.5" />
              <span>
                Course Teachers: <strong className="text-slate-700 dark:text-slate-200">Naimur Rahman</strong>,{' '}
                <strong className="text-slate-700 dark:text-slate-200">Md. Rakib Trofder</strong>,{' '}
                <strong className="text-slate-700 dark:text-slate-200">Saad Ahmed</strong> · Dept. of CSE, BAUST ·{' '}
                Content credit: <strong className="text-slate-700 dark:text-slate-200">Naimur Rahman Sir</strong> · Website: Md. Rakib Trofder
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Business Spreadsheet Preview Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950 p-4 shadow-md space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-semibold text-[#217346] dark:text-emerald-400">
                  Sales_Register.xlsx · Sheet1
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 dark:text-slate-400 mr-1">VAT:</span>
                  {[0.05, 0.1, 0.15].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setVatRate(r)}
                      className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold transition-colors ${
                        vatRate === r
                          ? 'bg-[#217346] text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {Math.round(r * 100)}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Formula bar */}
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                  M2
                </span>
                <span className="text-slate-400">fx</span>
                <span className="text-[#1B5E3A] dark:text-emerald-400 font-semibold truncate">
                  =ROUND(L2*$Q$2, 2)
                </span>
              </div>

              {/* Mini Spreadsheet Table */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden text-xs tabular-nums">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      <th className="py-1.5 px-2 text-left border-b border-r border-slate-200 dark:border-slate-700">Item</th>
                      <th className="py-1.5 px-2 text-right border-b border-r border-slate-200 dark:border-slate-700">Net (L2)</th>
                      <th className="py-1.5 px-2 text-right border-b border-r border-slate-200 dark:border-slate-700">VAT (M2)</th>
                      <th className="py-1.5 px-2 text-right border-b border-slate-200 dark:border-slate-700">Total (N2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-emerald-50/50 dark:bg-emerald-950/30 font-medium">
                      <td className="py-2 px-2 border-b border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
                        Pen Box A4
                      </td>
                      <td className="py-2 px-2 border-b border-r border-slate-200 dark:border-slate-700 text-right font-mono">
                        ৳{heroCalc.net.toLocaleString('en-US')}
                      </td>
                      <td className="py-2 px-2 border-b border-r border-slate-200 dark:border-slate-700 text-right font-mono font-bold text-[#217346] dark:text-emerald-400 ring-1 ring-inset ring-[#217346]/40">
                        ৳{heroCalc.vat.toLocaleString('en-US')}
                      </td>
                      <td className="py-2 px-2 border-b border-slate-200 dark:border-slate-700 text-right font-mono font-semibold">
                        ৳{heroCalc.total.toLocaleString('en-US')}
                      </td>
                    </tr>
                    <tr className="text-slate-500 dark:text-slate-400">
                      <td className="py-2 px-2 border-r border-slate-200 dark:border-slate-700">Office Chair</td>
                      <td className="py-2 px-2 border-r border-slate-200 dark:border-slate-700 text-right font-mono">৳18,000</td>
                      <td className="py-2 px-2 border-r border-slate-200 dark:border-slate-700 text-right font-mono">
                        ৳{Math.round(18000 * vatRate).toLocaleString('en-US')}
                      </td>
                      <td className="py-2 px-2 text-right font-mono">
                        ৳{Math.round(18000 * (1 + vatRate)).toLocaleString('en-US')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 dark:text-slate-400">
                  Input cell <code className="font-mono font-semibold text-slate-700 dark:text-slate-200">$Q$2</code> updates all rows
                </span>
                <Link
                  to="/excel-lab?dataset=dataset-1"
                  className="inline-flex items-center gap-1 font-semibold text-[#217346] dark:text-emerald-400 hover:underline"
                >
                  <Play className="w-3 h-3" />
                  Try live
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE PROGRESS BAR */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#217346] dark:text-emerald-400" />
              Your Course Progress
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {completedCount} of {totalLessons} lessons completed ({progressPct}%) · Saved locally in this browser
            </p>
          </div>
          <Link
            to="/quizzes"
            className="text-xs font-semibold text-[#4F46E5] dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
          >
            Test yourself in Quizzes
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#217346] transition-all duration-300"
            style={{ width: `${Math.max(progressPct, completedCount > 0 ? 3 : 0)}%` }}
          />
        </div>
      </section>

      {/* 6 MODULE CARDS (Inspired by Reference Screenshot 3 Header Bands) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
              6 Curriculum Modules · 44 Lessons
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
              Course Modules
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Start from computer fundamentals, master Word &amp; PowerPoint, then go deep into business Excel (Modules 3–5).
            </p>
          </div>
          <Link
            to="/syllabus"
            className="text-sm font-semibold text-[#4F46E5] dark:text-indigo-400 hover:underline inline-flex items-center gap-1 shrink-0"
          >
            View full 14-week syllabus
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((mod) => {
            const modLessons = ALL_LESSONS.filter((l) => l.moduleId === mod.id);
            const modDone = modLessons.filter((l) => completedIds.includes(l.id)).length;
            return (
              <div
                key={mod.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Colored Header Band matching Screenshot 3 */}
                <div
                  className="p-5 text-white relative"
                  style={{
                    background: `linear-gradient(135deg, ${mod.accentHex} 0%, ${mod.accentHex}dd 100%)`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/15 px-2.5 py-0.5 rounded-md">
                      {mod.weeks}
                    </span>
                    <span className="text-[11px] font-medium bg-black/20 px-2 py-0.5 rounded-md">
                      {mod.isExcel ? 'Core Excel Track' : mod.number}
                    </span>
                  </div>
                  <div className="text-xs opacity-85 font-medium">{mod.number}</div>
                  <h3 className="font-display text-lg font-bold leading-snug mt-0.5">
                    {mod.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {mod.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{mod.lessonCount} lessons</span>
                      {modDone > 0 && (
                        <span className="text-[#217346] dark:text-emerald-400 font-semibold">
                          · {modDone} done
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/module/${mod.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: mod.accentHex }}
                    >
                      Open Module
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* COURSE TEACHERS (Matching Reference Screenshot) */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Course Teachers
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Department of Computer Science and Engineering · BAUST
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#4F46E5] dark:text-indigo-400 shrink-0">
            <GraduationCap className="w-4 h-4" />
            <span>CSE 1204 · BAUST, Saidpur</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              initials: 'NR',
              name: 'Naimur Rahman',
              role: 'Lecturer · Department of CSE, BAUST',
            },
            {
              initials: 'RT',
              name: 'Md. Rakib Trofder',
              role: 'Lecturer · Department of CSE, BAUST',
            },
            {
              initials: 'SA',
              name: 'Saad Ahmed',
              role: 'Lecturer · Department of CSE, BAUST',
            },
          ].map((teacher) => (
            <div
              key={teacher.name}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex items-start gap-4"
            >
              <span className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-[#4F46E5] dark:text-indigo-400 font-display font-bold text-sm flex items-center justify-center shrink-0">
                {teacher.initials}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {teacher.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                  {teacher.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORE THE STUDY PORTAL (Matching Reference Screenshot 2) */}
      <section className="space-y-5">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Explore the Study Portal
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Everything you need for CSE 1204 — in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {portalCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-start justify-between gap-4"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-10 h-10 rounded-xl ${card.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#4F46E5] dark:group-hover:text-indigo-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED WEEKLY LAB + EXAM PREP CALLOUT */}
      <section className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#217346] dark:text-emerald-400">
              Featured Practical · {featuredLab.week}
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Lab {featuredLab.number}: {featuredLab.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {featuredLab.objective} Check your formulas against the hidden Expected Results box before submitting.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/labs/${featuredLab.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#217346] hover:bg-[#1B5E3A] text-white text-xs font-semibold transition-colors"
            >
              Open Lab {featuredLab.number} Checklist
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/labs"
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:underline"
            >
              Browse all 13 Lab Sheets
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
              Assessment &amp; Viva Ready
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#4F46E5]" />
              Lab Final &amp; 22 Viva Q&amp;As
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              See the exact 28-mark Excel breakdown for the 90-minute Lab Final and practise all 22 viva questions.
            </p>
          </div>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] dark:text-indigo-400 hover:underline"
          >
            Open Assessment &amp; Viva Guide
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
