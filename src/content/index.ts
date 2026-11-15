import { MODULES } from './modules';
import { LESSONS_BASICS_WORD } from './lessons_basics_word';
import { LESSONS_PPT_EXCEL3 } from './lessons_ppt_excel3';
import { LESSONS_EXCEL4_EXCEL5 } from './lessons_excel4_excel5';
import { Lesson, ModuleId } from '../types/course';

export { MODULES };

export const ALL_LESSONS: Lesson[] = [
  ...LESSONS_BASICS_WORD,
  ...LESSONS_PPT_EXCEL3,
  ...LESSONS_EXCEL4_EXCEL5,
];

export function getLessonsByModule(moduleId: ModuleId): Lesson[] {
  return ALL_LESSONS.filter((l) => l.moduleId === moduleId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === lessonId);
}
