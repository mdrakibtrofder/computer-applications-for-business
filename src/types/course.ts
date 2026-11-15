export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ModuleId =
  | 'basics'
  | 'word'
  | 'powerpoint'
  | 'excel-foundations'
  | 'excel-business'
  | 'excel-analysis';

export interface ModuleInfo {
  id: ModuleId;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  accentHex: string;
  bgTintClass: string;
  textAccentClass: string;
  borderAccentClass: string;
  weeks: string;
  lessonCount: number;
  isExcel?: boolean;
  description: string;
}

export interface LessonStep {
  title?: string;
  detail: string;
  ribbonPath?: string;
}

export interface CalloutData {
  type: 'tip' | 'note' | 'warning' | 'bangla' | 'tryit' | 'business';
  title: string;
  body: string;
}

export interface FormulaItem {
  formula: string;
  explanation: string;
  result?: string;
  datasetId?: string;
}

export interface WorksheetData {
  title?: string;
  caption?: string;
  columns: string[];
  rows: (string | number)[][];
  highlightCells?: string[];
  startRow?: number;
}

export interface ShortcutEntry {
  keys: string;
  action: string;
}

export interface LessonSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: LessonStep[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  formulas?: FormulaItem[];
  worksheet?: WorksheetData;
  callout?: CalloutData;
  ribbon?: {
    app: 'Word' | 'PowerPoint' | 'Excel';
    activeTab: string;
    tabs: string[];
    groups: { name: string; commands: string[]; highlighted?: boolean }[];
  };
}

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  code: string;
  title: string;
  duration: string;
  difficulty: Difficulty;
  isExtension?: boolean;
  outcomes: string[];
  sections: LessonSection[];
  shortcuts?: ShortcutEntry[];
  commonMistakes: string[];
  tryIt: string;
  playgroundHint?: {
    label: string;
    datasetId?: string;
    tool?: 'playground' | 'references' | 'drills' | 'errors' | 'calculators' | 'charts' | 'dashboard';
    formula?: string;
  };
}

export interface LabItem {
  id: string;
  number: number;
  week: string;
  title: string;
  duration: string;
  objective: string;
  lessons: string[];
  datasetIds?: string[];
  tasks: string[];
  submit: string;
  expectedResults?: string[];
  rubric?: { criterion: string; marks: number }[];
  isExcel: boolean;
}

export interface DatasetColumn {
  col: string;
  name: string;
  type: string;
  description: string;
}

export interface Dataset {
  id: string;
  title: string;
  shortName: string;
  description: string;
  sheetName: string;
  headers: string[];
  rows: (string | number)[][];
  columns: DatasetColumn[];
  answerKey?: { measure: string; value: string }[];
  relatedSheet?: {
    name: string;
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId;
  moduleLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FormulaDrill {
  id: string;
  number: number | string;
  category: string;
  task: string;
  modelFormula: string;
  expectedDisplay: string;
  expectedValue: string | number;
  type: 'formula' | 'mcq';
  choices?: string[];
  gridData?: (string | number)[][];
  targetCell?: string;
}

export interface ErrorSpotterItem {
  id: number;
  brokenFormula: string;
  symptom: string;
  cause: string;
  correctFix: string;
  options: string[];
  explanation: string;
}

export interface ExcelFunctionRef {
  name: string;
  category: 'Math' | 'Statistical' | 'Logical' | 'Information' | 'Lookup' | 'Text' | 'Date' | 'Financial' | 'Dynamic array';
  syntax: string;
  description: string;
  example: string;
  version: 'All' | '2019+' | '365/2021';
}

export interface GlobalShortcut {
  shortcut: string;
  action: string;
  app: 'Windows' | 'All Office' | 'Word' | 'PowerPoint' | 'Excel';
  lesson: string;
  isTop20?: boolean;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'General' | 'Word' | 'PowerPoint' | 'Excel';
}
