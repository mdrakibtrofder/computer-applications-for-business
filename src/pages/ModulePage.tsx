import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Circle,
  HelpCircle,
  Play,
  Sparkles,
  Target,
} from 'lucide-react';
import { ALL_LESSONS, MODULES, getLessonById, getLessonsByModule } from '../content';
import { ModuleId } from '../types/course';
import {
  CalloutBox,
  FormulaBox,
  GlossaryText,
  RibbonMock,
  ShortcutKey,
  StepList,
  WorksheetView,
} from '../components/LessonBlocks';
import {
  getBookmarks,
  getCompletedLessons,
  toggleBookmark,
  toggleCompletedLesson,
} from '../utils/storage';

export const ModulePage: React.FC = () => {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId?: string }>();
  const navigate = useNavigate();

  const currentModule =
    MODULES.find((m) => m.id === (moduleId as ModuleId)) || MODULES[0];
  const moduleLessons = useMemo(
    () => getLessonsByModule(currentModule.id),
    [currentModule.id]
  );

  const activeLesson = useMemo(() => {
    if (lessonId) {
      const found = getLessonById(lessonId);
      if (found && found.moduleId === currentModule.id) return found;
    }
    return moduleLessons[0];
  }, [lessonId, moduleLessons, currentModule.id]);

  const [completedIds, setCompletedIds] = useState<string[]>(() => getCompletedLessons());
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());

  useEffect(() => {
    setCompletedIds(getCompletedLessons());
    setBookmarks(getBookmarks());
  }, [activeLesson?.id]);

  if (!activeLesson) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
        <p className="text-slate-600">Module not found.</p>
        <Link to="/" className="text-[#4F46E5] font-semibold mt-2 inline-block">
          Return Home
        </Link>
      </div>
    );
  }

  const globalIdx = ALL_LESSONS.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = globalIdx > 0 ? ALL_LESSONS[globalIdx - 1] : null;
  const nextLesson = globalIdx >= 0 && globalIdx < ALL_LESSONS.length - 1 ? ALL_LESSONS[globalIdx + 1] : null;

  const isCompleted = completedIds.includes(activeLesson.id);
  const lessonPath = `/module/${currentModule.id}/${activeLesson.id}`;
  const isBookmarked = bookmarks.some((b) => b.path === lessonPath);

  const handleToggleComplete = () => {
    setCompletedIds(toggleCompletedLesson(activeLesson.id));
  };

  const handleToggleBookmark = () => {
    setBookmarks(
      toggleBookmark({
        path: lessonPath,
        title: `${activeLesson.code} ${activeLesson.title}`,
        subtitle: `${currentModule.number} · ${currentModule.shortTitle}`,
      })
    );
  };

  const handleOpenPlayground = () => {
    const hint = activeLesson.playgroundHint;
    if (!hint) {
      navigate('/excel-lab');
      return;
    }
    const params = new URLSearchParams();
    if (hint.tool) params.set('tool', hint.tool);
    if (hint.datasetId) params.set('dataset', hint.datasetId);
    if (hint.formula) params.set('formula', hint.formula);
    navigate(`/excel-lab?${params.toString()}`);
  };

  const modDoneCount = moduleLessons.filter((l) => completedIds.includes(l.id)).length;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Module Switcher Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
        {MODULES.map((m) => {
          const active = m.id === currentModule.id;
          return (
            <Link
              key={m.id}
              to={`/module/${m.id}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors border ${
                active
                  ? 'text-white border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              style={active ? { backgroundColor: m.accentHex } : undefined}
            >
              {m.number}: {m.shortTitle}
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDEBAR: Lesson Navigation */}
        <aside className="lg:col-span-3 lg:sticky lg:top-20 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: currentModule.accentHex }}>
              {currentModule.number} · {currentModule.weeks}
            </div>
            <h2 className="font-display font-bold text-base text-slate-900 dark:text-white mt-0.5">
              {currentModule.title}
            </h2>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 tabular-nums">
              {modDoneCount} of {moduleLessons.length} completed
            </div>
          </div>

          <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
            {moduleLessons.map((lesson) => {
              const active = lesson.id === activeLesson.id;
              const done = completedIds.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  to={`/module/${currentModule.id}/${lesson.id}`}
                  className={`flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-xs transition-colors ${
                    active
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {done ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#217346] dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    )}
                  </span>
                  <span className="flex-1 leading-snug">
                    <span className="font-mono mr-1 opacity-75">{lesson.code}</span>
                    {lesson.title}
                    {lesson.isExtension && (
                      <span className="ml-1 text-[10px] text-amber-600 dark:text-amber-400" title="Extension (self-study)">
                        ★
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* CENTER: Lesson Content */}
        <article className="lg:col-span-7 space-y-6 min-w-0">
          {/* Header Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                <span className="font-bold" style={{ color: currentModule.accentHex }}>
                  {currentModule.number}
                </span>
                <span>·</span>
                <span className="font-mono">{activeLesson.code}</span>
                <span>·</span>
                <span>{activeLesson.duration}</span>
                <span>·</span>
                <span>{activeLesson.difficulty}</span>
                {activeLesson.isExtension && (
                  <>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Extension (self-study)
                    </span>
                  </>
                )}
              </div>

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
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {activeLesson.code} {activeLesson.title}
            </h1>

            {/* Learning Outcomes */}
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 p-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#4F46E5]" />
                What You Will Learn
              </div>
              <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {activeLesson.outcomes.map((out, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#217346] dark:text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Concept Sections */}
          <div className="space-y-5">
            {activeLesson.sections.map((sec, idx) => (
              <section
                key={idx}
                id={`section-${idx}`}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 scroll-mt-24"
              >
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {sec.heading}
                </h2>

                {sec.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                    <GlossaryText text={p} />
                  </p>
                ))}

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        <GlossaryText text={b} />
                      </li>
                    ))}
                  </ul>
                )}

                {sec.ribbon && (
                  <RibbonMock
                    app={sec.ribbon.app}
                    activeTab={sec.ribbon.activeTab}
                    tabs={sec.ribbon.tabs}
                    groups={sec.ribbon.groups}
                  />
                )}

                {sec.steps && sec.steps.length > 0 && <StepList steps={sec.steps} />}

                {sec.table && (
                  <div className="overflow-x-auto worksheet-scroll rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 text-left text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                          {sec.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-2.5 px-3 font-semibold whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="py-2.5 px-3 text-slate-700 dark:text-slate-300 align-top"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sec.formulas?.map((f, fIdx) => (
                  <FormulaBox key={fIdx} item={f} />
                ))}

                {sec.worksheet && <WorksheetView data={sec.worksheet} />}

                {sec.callout && <CalloutBox callout={sec.callout} />}
              </section>
            ))}
          </div>

          {/* Shortcuts Block */}
          {activeLesson.shortcuts && activeLesson.shortcuts.length > 0 && (
            <section
              id="section-shortcuts"
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-3 scroll-mt-24"
            >
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Key Keyboard Shortcuts
              </h2>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeLesson.shortcuts.map((sc, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-700 dark:text-slate-300">{sc.action}</span>
                    <ShortcutKey keys={sc.keys} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Common Mistakes */}
          {activeLesson.commonMistakes.length > 0 && (
            <section
              id="section-mistakes"
              className="rounded-2xl border border-amber-200 dark:border-amber-800/70 bg-amber-50/50 dark:bg-amber-950/20 p-6 space-y-3 scroll-mt-24"
            >
              <h2 className="font-display text-lg font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-2 text-sm text-amber-950 dark:text-amber-100 list-disc pl-5">
                {activeLesson.commonMistakes.map((m, i) => (
                  <li key={i} className="leading-relaxed">
                    {m}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Try It Yourself + Check Yourself */}
          <section
            id="section-tryit"
            className="rounded-2xl border border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 space-y-4 scroll-mt-24"
          >
            <div className="space-y-2">
              <h2 className="font-display text-lg font-bold text-[#1B5E3A] dark:text-emerald-300">
                Try It Yourself
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeLesson.tryIt}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {activeLesson.playgroundHint && (
                <button
                  type="button"
                  onClick={handleOpenPlayground}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#217346] hover:bg-[#1B5E3A] text-white text-xs font-semibold transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  {activeLesson.playgroundHint.label}
                </button>
              )}
              <Link
                to={`/quizzes?module=${currentModule.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#4F46E5]" />
                Check yourself in {currentModule.shortTitle} Quiz
              </Link>
            </div>
          </section>

          {/* Completion + Prev / Next Bar */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleToggleComplete}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isCompleted
                  ? 'bg-[#217346] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Completed (Click to Undo)' : 'Mark Lesson as Complete'}
            </button>

            <div className="flex items-center justify-between sm:justify-end gap-2">
              {prevLesson && (
                <Link
                  to={`/module/${prevLesson.moduleId}/${prevLesson.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Prev ({prevLesson.code})
                </Link>
              )}
              {nextLesson && (
                <Link
                  to={`/module/${nextLesson.moduleId}/${nextLesson.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold"
                >
                  Next ({nextLesson.code})
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </article>

        {/* RIGHT SIDEBAR: On This Page TOC */}
        <aside className="hidden xl:block xl:col-span-2 sticky top-20 space-y-2 text-xs">
          <div className="font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
            On this page
          </div>
          <nav className="space-y-1">
            {activeLesson.sections.map((sec, idx) => (
              <a
                key={idx}
                href={`#section-${idx}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`section-${idx}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors leading-snug"
              >
                {sec.heading}
              </a>
            ))}
            {activeLesson.shortcuts && activeLesson.shortcuts.length > 0 && (
              <a
                href="#section-shortcuts"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('section-shortcuts')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Keyboard shortcuts
              </a>
            )}
            <a
              href="#section-mistakes"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('section-mistakes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Common mistakes
            </a>
            <a
              href="#section-tryit"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('section-tryit')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Try it yourself
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );
};
