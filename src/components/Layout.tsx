import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Bookmark,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  Table2,
  Trash2,
} from 'lucide-react';
import { ALL_LESSONS, MODULES } from '../content';
import { EXCEL_FUNCTIONS } from '../data/functions';
import { GLOBAL_SHORTCUTS } from '../data/shortcuts';
import { GLOSSARY_TERMS } from '../data/glossary';
import { LABS } from '../data/labs';
import {
  BookmarkItem,
  getBookmarks,
  getStoredTheme,
  setStoredTheme,
  toggleBookmark,
} from '../utils/storage';

interface SearchResult {
  type: 'Lesson' | 'Function' | 'Shortcut' | 'Glossary' | 'Lab';
  title: string;
  subtitle: string;
  path: string;
}

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getStoredTheme());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => getBookmarks());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modulesMenuOpen, setModulesMenuOpen] = useState(false);
  const [refMenuOpen, setRefMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    setStoredTheme(theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
    setModulesMenuOpen(false);
    setRefMenuOpen(false);
    setBookmarks(getBookmarks());
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setBookmarksOpen(false);
        setModulesMenuOpen(false);
        setRefMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const searchResults = useMemo<SearchResult[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return [
        { type: 'Lesson', title: '3.5 Cell references: relative, absolute, mixed', subtitle: 'Module 3 · Excel Foundations', path: '/module/excel-foundations/3.5' },
        { type: 'Lesson', title: '4.3 Lookup functions: VLOOKUP, XLOOKUP, INDEX + MATCH', subtitle: 'Module 4 · Excel Business Calculations', path: '/module/excel-business/4.3' },
        { type: 'Lab', title: 'Lab 8: Formulas, references and basic functions', subtitle: 'Week 9 · Dataset 1', path: '/labs/lab-08' },
        { type: 'Function', title: 'SUMIFS', subtitle: 'Add cells meeting multiple criteria', path: '/functions' },
      ];
    }

    const out: SearchResult[] = [];
    for (const l of ALL_LESSONS) {
      if (
        l.title.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        l.sections.some((s) => s.heading.toLowerCase().includes(q))
      ) {
        out.push({
          type: 'Lesson',
          title: `${l.code} ${l.title}`,
          subtitle: `${l.duration} · ${l.difficulty}`,
          path: `/module/${l.moduleId}/${l.id}`,
        });
      }
    }
    for (const lab of LABS) {
      if (lab.title.toLowerCase().includes(q) || `lab ${lab.number}`.includes(q)) {
        out.push({
          type: 'Lab',
          title: `Lab ${lab.number}: ${lab.title}`,
          subtitle: `${lab.week} · ${lab.duration}`,
          path: `/labs/${lab.id}`,
        });
      }
    }
    for (const fn of EXCEL_FUNCTIONS) {
      if (fn.name.toLowerCase().includes(q) || fn.description.toLowerCase().includes(q)) {
        out.push({
          type: 'Function',
          title: fn.name,
          subtitle: `${fn.category} · ${fn.syntax}`,
          path: `/functions?q=${encodeURIComponent(fn.name)}`,
        });
      }
    }
    for (const sc of GLOBAL_SHORTCUTS) {
      if (sc.shortcut.toLowerCase().includes(q) || sc.action.toLowerCase().includes(q)) {
        out.push({
          type: 'Shortcut',
          title: `${sc.shortcut} — ${sc.action}`,
          subtitle: `${sc.app} · ${sc.lesson}`,
          path: `/shortcuts?q=${encodeURIComponent(sc.shortcut)}`,
        });
      }
    }
    for (const g of GLOSSARY_TERMS) {
      if (g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)) {
        out.push({
          type: 'Glossary',
          title: g.term,
          subtitle: g.definition.slice(0, 72) + (g.definition.length > 72 ? '…' : ''),
          path: `/glossary?q=${encodeURIComponent(g.term)}`,
        });
      }
    }
    return out.slice(0, 14);
  }, [searchQuery]);

  const navLinkCls = ({ isActive }: { isActive: boolean }) =>
    `py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 ${
      isActive
        ? 'border-[#4F46E5] text-[#4F46E5] dark:text-indigo-400 dark:border-indigo-400'
        : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100">
      {/* Sticky Header matching reference screenshot */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 no-print">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Zone */}
          <Link to="/" className="flex items-center gap-2.5 min-w-0 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-[#4F46E5] text-white flex items-center justify-center shadow-xs shrink-0">
              <Table2 className="w-4.5 h-4.5" />
            </span>
            <span className="font-display font-bold text-sm xl:text-base tracking-tight text-slate-900 dark:text-white truncate max-w-[220px] sm:max-w-none whitespace-nowrap">
              CSE 1204 Computer Applications for Business
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            <NavLink to="/" end className={navLinkCls}>
              Home
            </NavLink>
            <NavLink to="/syllabus" className={navLinkCls}>
              Syllabus
            </NavLink>

            {/* Modules Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setModulesMenuOpen((v) => !v);
                  setRefMenuOpen(false);
                }}
                className={`inline-flex items-center gap-1 py-1 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                  location.pathname.startsWith('/module')
                    ? 'border-[#4F46E5] text-[#4F46E5] dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Modules
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {modulesMenuOpen && (
                <div
                  onMouseLeave={() => setModulesMenuOpen(false)}
                  className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-2 z-50"
                >
                  {MODULES.map((m) => (
                    <Link
                      key={m.id}
                      to={`/module/${m.id}`}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: m.accentHex }}
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {m.number}: {m.shortTitle}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {m.lessonCount} lessons · {m.weeks}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/labs" className={navLinkCls}>
              Labs
            </NavLink>
            <NavLink to="/excel-lab" className={navLinkCls}>
              Excel Lab
            </NavLink>
            <NavLink to="/quizzes" className={navLinkCls}>
              Quizzes
            </NavLink>

            {/* Reference Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setRefMenuOpen((v) => !v);
                  setModulesMenuOpen(false);
                }}
                className={`inline-flex items-center gap-1 py-1 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors ${
                  ['/datasets', '/projects', '/shortcuts', '/functions', '/glossary', '/assessment', '/resources', '/faq', '/credits'].some(
                    (p) => location.pathname.startsWith(p)
                  )
                    ? 'border-[#4F46E5] text-[#4F46E5] dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Resources
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {refMenuOpen && (
                <div
                  onMouseLeave={() => setRefMenuOpen(false)}
                  className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-1.5 z-50 text-sm"
                >
                  {[
                    { to: '/datasets', label: 'Datasets & CSVs' },
                    { to: '/projects', label: 'Practice Projects' },
                    { to: '/functions', label: 'Function Reference' },
                    { to: '/shortcuts', label: 'Shortcut Cheat Sheet' },
                    { to: '/glossary', label: 'Glossary (A–Z)' },
                    { to: '/assessment', label: 'Assessment & Exam Guide' },
                    { to: '/resources', label: 'Downloads & Alternatives' },
                    { to: '/faq', label: 'Student FAQ' },
                    { to: '/credits', label: 'Credits & About' },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search course"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => {
                setBookmarks(getBookmarks());
                setBookmarksOpen(true);
              }}
              aria-label="Saved bookmarks"
              title="Bookmarks"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
              aria-label="Toggle colour theme"
              title="Toggle light/dark mode"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/syllabus', label: 'Syllabus' },
                { to: '/labs', label: 'Lab Sheets (1–13)' },
                { to: '/excel-lab', label: 'Excel Lab (Tools)' },
                { to: '/quizzes', label: 'Quizzes (3 Modes)' },
                { to: '/datasets', label: 'Datasets & CSVs' },
                { to: '/functions', label: 'Functions' },
                { to: '/shortcuts', label: 'Shortcuts' },
                { to: '/projects', label: 'Projects' },
                { to: '/glossary', label: 'Glossary' },
                { to: '/assessment', label: 'Assessment' },
                { to: '/credits', label: 'Credits & FAQ' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-500 mb-1.5">Modules</div>
              <div className="space-y-1">
                {MODULES.map((m) => (
                  <Link
                    key={m.id}
                    to={`/module/${m.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.accentHex }} />
                    <span>
                      {m.number}: {m.shortTitle}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 mt-14 no-print">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                CSE 1204 · Computer Applications for Business · BAUST, Saidpur
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
              <Link to="/syllabus" className="hover:text-slate-900 dark:hover:text-white">Syllabus</Link>
              <Link to="/excel-lab" className="hover:text-slate-900 dark:hover:text-white">Excel Lab</Link>
              <Link to="/datasets" className="hover:text-slate-900 dark:hover:text-white">Datasets</Link>
              <Link to="/assessment" className="hover:text-slate-900 dark:hover:text-white">Assessment</Link>
              <Link to="/faq" className="hover:text-slate-900 dark:hover:text-white">FAQ</Link>
              <Link to="/credits" className="hover:text-slate-900 dark:hover:text-white">Credits</Link>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Course teachers: Naimur Rahman, Md. Rakib Trofder, Saad Ahmed, Dept. of CSE, BAUST | Content &amp; teaching design: Naimur Rahman Sir | Website: Md. Rakib Trofder | For educational use · 2026
          </div>
        </div>
      </footer>

      {/* Global Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lessons, Excel functions, shortcuts, labs, glossary..."
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-500"
              >
                Esc
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  No matches found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                searchResults.map((res, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(res.path);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {res.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {res.subtitle}
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                      {res.type}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Drawer */}
      {bookmarksOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex justify-end"
          onClick={() => setBookmarksOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 p-5 flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base">Saved Bookmarks</h3>
              <button
                type="button"
                onClick={() => setBookmarksOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-2">
              {bookmarks.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No bookmarks saved yet. Click the bookmark button on any lesson or lab page to save it here.
                </p>
              ) : (
                bookmarks.map((b) => (
                  <div
                    key={b.path}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-2"
                  >
                    <Link
                      to={b.path}
                      onClick={() => setBookmarksOpen(false)}
                      className="min-w-0 flex-1"
                    >
                      <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {b.title}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{b.subtitle}</div>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setBookmarks(toggleBookmark(b))}
                      className="p-1 text-slate-400 hover:text-red-500"
                      aria-label="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
