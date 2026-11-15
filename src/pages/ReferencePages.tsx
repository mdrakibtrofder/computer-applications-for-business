import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookMarked,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  Play,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import { EXCEL_FUNCTIONS } from '../data/functions';
import { GLOBAL_SHORTCUTS } from '../data/shortcuts';
import { GLOSSARY_TERMS } from '../data/glossary';
import {
  COURSE_INFO,
  FAQ_ITEMS,
  FREE_ALTERNATIVES,
  LAB_FINAL_EXCEL_BREAKDOWN,
  MARK_DISTRIBUTION,
  PRACTICE_PROJECTS,
  VIVA_QUESTIONS,
} from '../data/syllabus';
import { ShortcutKey } from '../components/LessonBlocks';
import { ExcelFunctionRef, GlobalShortcut, GlossaryTerm } from '../types/course';

// ------------------------------------------------------------------
// 1. EXCEL FUNCTION REFERENCE (/functions)
// ------------------------------------------------------------------
export const FunctionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState<string>('All');

  const categories = [
    'All',
    'Math',
    'Statistical',
    'Logical',
    'Information',
    'Lookup',
    'Text',
    'Date',
    'Financial',
    'Dynamic array',
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXCEL_FUNCTIONS.filter((fn) => {
      if (category !== 'All' && fn.category !== category) return false;
      if (!q) return true;
      return (
        fn.name.toLowerCase().includes(q) ||
        fn.syntax.toLowerCase().includes(q) ||
        fn.description.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#217346] dark:text-emerald-400">
          {EXCEL_FUNCTIONS.length} Functions Covered in Modules 3–5
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Excel Function Reference
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Search every Excel formula taught in CSE 1204 with syntax, version compatibility (2019+ / 365), and live examples you can run in the Playground.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search function name, syntax, or purpose..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:border-[#217346]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                category === cat
                  ? 'bg-[#217346] text-white border-[#217346]'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 font-semibold">Function</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Syntax</th>
                <th className="py-3 px-4 font-semibold">Description &amp; Example</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((fn: ExcelFunctionRef) => (
                <tr key={fn.name} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 align-top whitespace-nowrap">
                    <div className="font-mono font-bold text-[#1B5E3A] dark:text-emerald-400">
                      {fn.name}
                    </div>
                    {fn.version !== 'All' && (
                      <span className="inline-block mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        Excel {fn.version}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 align-top text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {fn.category}
                  </td>
                  <td className="py-3.5 px-4 align-top font-mono text-xs text-slate-700 dark:text-slate-300">
                    {fn.syntax}
                  </td>
                  <td className="py-3.5 px-4 align-top space-y-1.5 min-w-[240px]">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {fn.description}
                    </p>
                    <code className="block font-mono text-xs text-[#4F46E5] dark:text-indigo-400 break-all">
                      {fn.example}
                    </code>
                  </td>
                  <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                    <Link
                      to={`/excel-lab?dataset=dataset-1&formula=${encodeURIComponent(fn.example)}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#217346] hover:bg-[#1B5E3A] text-white text-xs font-semibold"
                    >
                      <Play className="w-3 h-3" />
                      Try
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-slate-500">
                    No Excel functions matched your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 2. SHORTCUT CHEAT SHEET + FLASHCARDS (/shortcuts)
// ------------------------------------------------------------------
export const ShortcutsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [appFilter, setAppFilter] = useState<string>('All');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = GLOBAL_SHORTCUTS.filter((sc: GlobalShortcut) => {
      if (appFilter === 'Top 20 Excel' && !sc.isTop20) return false;
      if (appFilter !== 'All' && appFilter !== 'Top 20 Excel' && sc.app !== appFilter) return false;
      if (!q) return true;
      return (
        sc.shortcut.toLowerCase().includes(q) ||
        sc.action.toLowerCase().includes(q) ||
        sc.lesson.toLowerCase().includes(q)
      );
    });
    return list;
  }, [query, appFilter]);

  const deck = filtered.length > 0 ? filtered : GLOBAL_SHORTCUTS;
  const activeCard = deck[cardIdx % deck.length];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
            Keyboard Productivity · Windows, Word, PowerPoint &amp; Excel
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Shortcut Cheat Sheet &amp; Flashcards
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Every essential shortcut from Lessons 0.2–5.8. Switch to Flashcard Mode to quiz yourself before practical exams.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFlashcardMode((v) => !v);
            setFlipped(false);
            setCardIdx(0);
          }}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
            flashcardMode
              ? 'bg-[#4F46E5] text-white'
              : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {flashcardMode ? 'Back to Full Table' : 'Study with Flashcards'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCardIdx(0);
              setFlipped(false);
            }}
            placeholder="Search shortcut keys or action (e.g. F4, Pivot, Freeze)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:border-[#4F46E5]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['All', 'Top 20 Excel', 'Excel', 'Word', 'PowerPoint', 'All Office', 'Windows'].map((app) => (
            <button
              key={app}
              type="button"
              onClick={() => {
                setAppFilter(app);
                setCardIdx(0);
                setFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                appFilter === app
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {app}
            </button>
          ))}
        </div>
      </div>

      {flashcardMode ? (
        <div className="max-w-xl mx-auto py-4 space-y-5">
          <div className="text-center text-xs font-mono text-slate-500 dark:text-slate-400">
            Card {(cardIdx % deck.length) + 1} of {deck.length} · Click card to flip
          </div>

          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="w-full min-h-[240px] rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-md flex flex-col items-center justify-center text-center gap-4 hover:border-[#4F46E5] transition-all"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
              {activeCard.app} · {activeCard.lesson}
            </span>

            {!flipped ? (
              <>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                  {activeCard.action}
                </div>
                <div className="text-xs text-slate-400">Tap to reveal shortcut</div>
              </>
            ) : (
              <>
                <div className="scale-125 py-2">
                  <ShortcutKey keys={activeCard.shortcut} />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
                  {activeCard.action}
                </div>
              </>
            )}
          </button>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setCardIdx((i) => (i - 1 + deck.length) % deck.length);
                setFlipped(false);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Flip
            </button>
            <button
              type="button"
              onClick={() => {
                setCardIdx((i) => (i + 1) % deck.length);
                setFlipped(false);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-left text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4 font-semibold">Shortcut</th>
                  <th className="py-3 px-4 font-semibold">Action</th>
                  <th className="py-3 px-4 font-semibold">Application</th>
                  <th className="py-3 px-4 font-semibold">Lesson</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((sc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <ShortcutKey keys={sc.shortcut} />
                    </td>
                    <td className="py-3 px-4 text-slate-800 dark:text-slate-200">
                      {sc.action}
                      {sc.isTop20 && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-[#217346] dark:text-emerald-400">
                          Top 20
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {sc.app}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {sc.lesson}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------------
// 3. GLOSSARY A-Z (/glossary)
// ------------------------------------------------------------------
export const GlossaryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState<string>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((g: GlossaryTerm) => {
      if (category !== 'All' && g.category !== category) return false;
      if (!q) return true;
      return g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q);
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, category]);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
          Plain-English Computing &amp; Excel Dictionary
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Course Glossary (A–Z)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
          Quick definitions of technical terms used across Computer Basics, Word, PowerPoint, and Excel.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search glossary terms..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:border-[#4F46E5]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {['All', 'Excel', 'Word', 'PowerPoint', 'General'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                category === cat
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.term}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-1.5"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-[#4F46E5]" />
                {item.term}
              </h2>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {item.category}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 4. PRACTICE PROJECTS (/projects)
// ------------------------------------------------------------------
export const ProjectsPage: React.FC = () => {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
          Portfolio &amp; Lab Final Preparation
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          5 Guided Practice Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Apply what you learn across realistic Word, PowerPoint, and Excel deliverables — culminating in the Integrated Rahim Traders Business Pack (Lab 13).
        </p>
      </div>

      <div className="space-y-5">
        {PRACTICE_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
          >
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-lg text-white font-mono font-bold text-sm flex items-center justify-center"
                    style={{ backgroundColor: proj.accent }}
                  >
                    {proj.number}
                  </span>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: proj.accent }}>
                      {proj.app}
                    </div>
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                      Project {proj.number}: {proj.title}
                    </h2>
                  </div>
                </div>
                <Link
                  to={proj.number === 5 ? '/labs/lab-13' : '/datasets'}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] dark:text-indigo-400 hover:underline"
                >
                  {proj.number === 5 ? 'Open Lab 13 Guide' : 'Get Course Datasets'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300">{proj.summary}</p>

              <div className="grid sm:grid-cols-2 gap-2 pt-2">
                {proj.deliverables.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <Layers className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: proj.accent }} />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 5. ASSESSMENT & VIVA GUIDE (/assessment)
// ------------------------------------------------------------------
export const AssessmentPage: React.FC = () => {
  const [revealAllViva, setRevealAllViva] = useState(false);
  const [openViva, setOpenViva] = useState<Record<number, boolean>>({});

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
          Exams, Marking Criteria &amp; Oral Defence
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Assessment, Lab Final &amp; Viva Guide
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Understand how your 100 marks are awarded, the exact 28-mark Excel breakdown for the Lab Final practical, and practise all 22 common Viva questions.
        </p>
      </div>

      {/* Mark Split + Lab Mid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4F46E5]" />
            Course Marks Breakdown (100 Marks)
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {MARK_DISTRIBUTION.map((m) => (
              <div key={m.component} className="py-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {m.component}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{m.notes}</div>
                </div>
                <span className="font-mono font-bold text-sm text-[#4F46E5] dark:text-indigo-400 tabular-nums shrink-0">
                  {m.marks}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2B579A]" />
            Lab Mid Format (Week 7 · 20 Marks · 45 min)
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            <li className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <strong>Word (10 marks):</strong> Recreate a formatted business letter or memo with header/footer, an invoice table with <code className="font-mono">=PRODUCT(LEFT)</code> and <code className="font-mono">=SUM(ABOVE)</code>, and a clean PDF export.
            </li>
            <li className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
              <strong>PowerPoint (10 marks):</strong> Build a 4-slide consistent deck using Slide Master, aligned layout, an Excel chart or SmartArt diagram, and concise presenter notes.
            </li>
          </ul>
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong>Marking principles:</strong> Never type fixed tax/PF rates inside formulas (keep them in labelled input cells), use relative/absolute references so copying down works cleanly, and save both <code className="font-mono">.xlsx</code> and <code className="font-mono">.pdf</code> where requested.
          </div>
        </section>
      </div>

      {/* Lab Final 28-Mark Excel Breakdown */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#217346] dark:text-emerald-400">
            Week 14 · 90 Minutes Practical (40 Marks Total: Excel 28 + Word 6 + PowerPoint 6)
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Lab Final Excel Breakdown (28 Marks)
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {LAB_FINAL_EXCEL_BREAKDOWN.map((item) => (
            <div key={item.task} className="py-3 flex items-start justify-between gap-4 text-sm">
              <span className="text-slate-700 dark:text-slate-300">{item.task}</span>
              <span className="font-mono font-bold text-[#217346] dark:text-emerald-400 shrink-0 tabular-nums">
                {item.marks} marks
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 22 Viva Questions */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              22 Viva Questions with Model Answers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Practise answering out loud before clicking to reveal the model response.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRevealAllViva((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            {revealAllViva ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {revealAllViva ? 'Hide All Answers' : 'Show All Answers'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {VIVA_QUESTIONS.map((viva, i) => {
            const isOpen = revealAllViva || Boolean(openViva[i]);
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenViva((prev) => ({ ...prev, [i]: !prev[i] }))}
                  className="w-full text-left flex items-start justify-between gap-2"
                >
                  <span className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                    <span className="font-mono text-[#4F46E5] dark:text-indigo-400 mr-1.5">
                      Q{i + 1}.
                    </span>
                    {viva.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-[#1B5E3A] dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60 rounded-lg p-3 leading-relaxed">
                    {viva.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

// ------------------------------------------------------------------
// 6. RESOURCES & FAQ (/resources, /faq)
// ------------------------------------------------------------------
export const ResourcesFaqPage: React.FC<{ mode: 'resources' | 'faq' }> = ({ mode }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      {mode === 'resources' ? (
        <>
          <div className="space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
              Tools, Free Alternatives &amp; Practice Files
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Resources &amp; Free Alternatives
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
              You do not need a paid Microsoft Office licence to practise at home. Use these free, compatible tools alongside our downloadable CSV datasets.
            </p>
          </div>

          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Free Office Alternatives for Home Study
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-left text-xs uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th className="py-3 px-4 font-semibold">Microsoft Office App</th>
                    <th className="py-3 px-4 font-semibold">Free Compatible Tools</th>
                    <th className="py-3 px-4 font-semibold">Exam Compatibility Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {FREE_ALTERNATIVES.map((row) => (
                    <tr key={row.office}>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {row.office}
                      </td>
                      <td className="py-3.5 px-4 text-[#217346] dark:text-emerald-400 font-medium">
                        {row.free}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-[#217346]" />
                Course CSV Practice Packs
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Download all 5 clean business datasets (Sales Register, Price List, Payroll, Ageing Receivables, Loan Options, Quarterly Sales) and the Messy Customers cleaning exercise.
              </p>
              <Link
                to="/datasets"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#217346] dark:text-emerald-400 hover:underline"
              >
                Go to Datasets &amp; CSVs
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#4F46E5]" />
                Frequently Asked Questions
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Troubleshooting #NAME?, #N/A, paisa rounding differences, missing XLOOKUP in older Excel, and lab submission rules.
              </p>
              <Link
                to="/faq"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] dark:text-indigo-400 hover:underline"
              >
                Read Student FAQ
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
              Troubleshooting &amp; Course Policies
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Student Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// ------------------------------------------------------------------
// 7. CREDITS & ABOUT (/credits)
// ------------------------------------------------------------------
export const CreditsPage: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400">
          {COURSE_INFO.code} · {COURSE_INFO.institution}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Credits &amp; Course Attribution
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Acknowledgement of the faculty members and contributors behind {COURSE_INFO.code} Computer Applications for Business.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Course Teachers
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Department of Computer Science and Engineering · BAUST
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#4F46E5] dark:text-indigo-400 shrink-0">
          <GraduationCap className="w-4 h-4" />
          <span>CSE 1204 · BAUST, Saidpur</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {COURSE_INFO.teachers.map((t) => {
          const initials = t.name
            .replace(/^Md\.\s*/i, '')
            .split(/\s+/)
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
          return (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex items-start gap-4"
            >
              <span className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-[#4F46E5] dark:text-indigo-400 font-display font-bold text-sm flex items-center justify-center shrink-0">
                {initials}
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {t.name}
                </h2>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                  Lecturer · Department of CSE, BAUST
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          <strong>Main Course Credit:</strong> The curriculum structure, Bangladeshi business datasets, lesson progression, and teaching design are credited to <strong>Naimur Rahman Sir</strong>.
        </p>
        <p>
          <strong>Website Design &amp; Interactive Platform:</strong> Prepared by <strong>Md. Rakib Trofder</strong>, Lecturer, Department of Computer Science and Engineering (CSE), Bangladesh Army University of Science and Technology (BAUST), Saidpur.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          Educational Disclaimer: Tax/VAT rates (15%), salary allowances (house rent 50%, provident fund 10%), and loan examples shown in course labs are classroom teaching inputs and do not constitute tax, legal, or financial advice.
        </p>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 8. 404 PAGE
// ------------------------------------------------------------------
export const NotFoundPage: React.FC = () => (
  <div className="max-w-[680px] mx-auto px-4 py-20 text-center space-y-4">
    <div className="font-mono text-sm font-bold text-[#4F46E5]">404 · Page Not Found</div>
    <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
      We could not find that worksheet or lesson
    </h1>
    <p className="text-sm text-slate-600 dark:text-slate-400">
      Use the navigation menu above or jump straight back to the course home or Excel Lab.
    </p>
    <div className="flex items-center justify-center gap-3 pt-2">
      <Link
        to="/"
        className="px-5 py-2.5 rounded-xl bg-[#4F46E5] text-white text-sm font-semibold"
      >
        Back to Home
      </Link>
      <Link
        to="/excel-lab"
        className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold"
      >
        Open Excel Lab
      </Link>
    </div>
  </div>
);
