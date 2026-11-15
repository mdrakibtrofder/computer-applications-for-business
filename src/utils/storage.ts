const KEYS = {
  COMPLETED_LESSONS: 'cse1204_completed_lessons',
  LAB_CHECKLISTS: 'cse1204_lab_checklists',
  QUIZ_SCORES: 'cse1204_quiz_scores',
  BOOKMARKS: 'cse1204_bookmarks',
  THEME: 'cse1204_theme',
  DRILLS_SOLVED: 'cse1204_drills_solved',
};

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private mode errors
  }
}

export function getCompletedLessons(): string[] {
  return readStorage<string[]>(KEYS.COMPLETED_LESSONS, []);
}

export function toggleCompletedLesson(lessonId: string): string[] {
  const current = getCompletedLessons();
  const next = current.includes(lessonId)
    ? current.filter((id) => id !== lessonId)
    : [...current, lessonId];
  writeStorage(KEYS.COMPLETED_LESSONS, next);
  return next;
}

export function getLabChecklist(labId: string): number[] {
  const all = readStorage<Record<string, number[]>>(KEYS.LAB_CHECKLISTS, {});
  return all[labId] || [];
}

export function toggleLabTask(labId: string, taskIndex: number): number[] {
  const all = readStorage<Record<string, number[]>>(KEYS.LAB_CHECKLISTS, {});
  const current = all[labId] || [];
  const next = current.includes(taskIndex)
    ? current.filter((idx) => idx !== taskIndex)
    : [...current, taskIndex];
  all[labId] = next;
  writeStorage(KEYS.LAB_CHECKLISTS, all);
  return next;
}

export interface QuizScoreRecord {
  quizId: string;
  score: number;
  total: number;
  date: string;
}

export function getQuizScores(): Record<string, QuizScoreRecord> {
  return readStorage<Record<string, QuizScoreRecord>>(KEYS.QUIZ_SCORES, {});
}

export function saveQuizScore(quizId: string, score: number, total: number): Record<string, QuizScoreRecord> {
  const all = getQuizScores();
  all[quizId] = {
    quizId,
    score,
    total,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
  };
  writeStorage(KEYS.QUIZ_SCORES, all);
  return all;
}

export interface BookmarkItem {
  path: string;
  title: string;
  subtitle: string;
}

export function getBookmarks(): BookmarkItem[] {
  return readStorage<BookmarkItem[]>(KEYS.BOOKMARKS, []);
}

export function toggleBookmark(item: BookmarkItem): BookmarkItem[] {
  const current = getBookmarks();
  const exists = current.some((b) => b.path === item.path);
  const next = exists ? current.filter((b) => b.path !== item.path) : [item, ...current];
  writeStorage(KEYS.BOOKMARKS, next);
  return next;
}

export function getSolvedDrills(): string[] {
  return readStorage<string[]>(KEYS.DRILLS_SOLVED, []);
}

export function markDrillSolved(drillId: string): string[] {
  const current = getSolvedDrills();
  if (current.includes(drillId)) return current;
  const next = [...current, drillId];
  writeStorage(KEYS.DRILLS_SOLVED, next);
  return next;
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const val = window.localStorage.getItem(KEYS.THEME);
    return val === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    window.localStorage.setItem(KEYS.THEME, theme);
  } catch {
    // Ignore
  }
}
