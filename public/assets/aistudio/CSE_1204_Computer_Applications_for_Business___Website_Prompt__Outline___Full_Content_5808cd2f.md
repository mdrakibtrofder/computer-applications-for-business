# CSE 1204 Computer Applications for Business — Website Prompt, Outline & Full Content

Course Teachers:
Naimur Rahman, Lecturer, CSE, BAUST
Md. Rakib Trofder, Lecturer, CSE, BAUST
Saad Ahmed, Lecturer, CSE, BAUST

## About this document

This document holds everything needed to build a complete learning website for CSE 1204 Computer Applications for Business: a copy-paste master prompt (Part A), the site outline (Part B), the full lesson content for every page (Part C), and labs, datasets, assessment, quizzes and reference material (Part D). It follows the same structure as the CSE 2110 Computer Fundamentals Sessional website document, but **more than half of the course (7 of 14 weeks, 24 of 43 lessons) is Microsoft Excel for business work**: formulas, business functions, lookups, dates, finance, data analysis, PivotTables, charts, what-if analysis and dashboards.

| Item | Detail |
| --- | --- |
| Course code | CSE 1204 |
| Course title | Computer Applications for Business |
| Credit / contact | 0.75 credit, 1.5 hours lab per week (adjust to the official syllabus) |
| Institution | Bangladesh Army University of Science and Technology (BAUST), Saidpur |
| Core tools | Microsoft Excel (main focus), Microsoft Word, Microsoft PowerPoint (Microsoft 365 / Office 2019+) |
| Course teachers | Naimur Rahman, Md. Rakib Trofder, Saad Ahmed (Lecturers, Department of CSE, BAUST) |

**How to use it**

1. Copy the whole of Part A into Claude, Claude Code, Cursor, Lovable or any AI site builder.
2. Paste Parts B, C and D right after it as the "content source". The prompt tells the builder to use that text word for word.
3. Review the generated site, then replace any lesson, lab or dataset with the teachers' own slides, lab sheets or files where they differ.

**Assumptions to check before you publish**

- **Audience:** students of a business programme (for example the Department of Business Administration) who are not computer-science majors. If the audience is different, change the "Audience" line in Part A and the examples will still work.
- **Credit hours, 14 lab weeks and the mark split** in Part D follow common BAUST sessional practice. Replace them with the official course outline if it says otherwise.
- **Business rates** used in examples (VAT 15%, house rent 50% of basic, provident fund 10%, commission slabs, the "class tax slab") are **teaching inputs kept in cells, not legal advice**. Rates change; students must always put a rate in its own cell and check the current official rate (NBR for VAT and tax, the employer's policy for salary).
- **Datasets** in Part D are fictional (company, people and customers are invented) and every worked answer was recomputed, so they can be used as an answer key.
- **Credit wording:** the main credit line keeps the CSE 2110 pattern (Naimur Rahman Sir for content and teaching design) and lists all three course teachers. Change the wording on the Credits page if the teachers prefer a different split.

## Part A — Master website-building prompt (copy everything in the box)

```markdown
ROLE
You are a senior front-end developer and instructional designer. Build a complete,
production-ready educational website for a university lab course. Every page must be
fully written — no "Lorem ipsum", no "content coming soon", no placeholders.

COURSE IDENTITY
- Course: CSE 1204 — Computer Applications for Business
- Institution: Bangladesh Army University of Science and Technology (BAUST), Saidpur, Bangladesh
- Audience: undergraduate business students (non-technical; many use a computer
  seriously for the first time). Write in clear, simple English. Add a short Bangla
  hint (বাংলা টিপস) box under difficult steps where helpful. Use Bangladesh business
  examples: Taka (৳), local trading companies, salary sheets, VAT, invoices, loans.
- Course teachers (show all three on the Home page hero, footer and Credits page):
  Naimur Rahman, Lecturer, CSE, BAUST; Md. Rakib Trofder, Lecturer, CSE, BAUST;
  Saad Ahmed, Lecturer, CSE, BAUST.
- Main credit: Naimur Rahman Sir, Department of CSE, BAUST — course content and
  teaching design.
- Website prepared by: Md. Rakib Trofder.
- Core software: Microsoft Excel (main focus: more than half of the course), Microsoft
  Word and PowerPoint (Microsoft 365 / Office 2019+, Windows 10/11). Mention Google
  Sheets/Docs/Slides equivalents in a small "Free alternative" note where useful, and
  mark the functions that exist only in Microsoft 365 (XLOOKUP, FILTER, SORT, UNIQUE,
  LET, IFS in older versions) with a small "365" badge and give an older-Excel alternative.

CONTENT SOURCE (MOST IMPORTANT RULE)
I will paste the site outline (Part B), the full lesson content (Part C) and labs,
datasets, assessment, quizzes, glossary, function reference and shortcuts (Part D)
after this prompt. Use that text as the single source of truth. Keep every heading,
step, table, shortcut, formula, dataset, lab task and quiz question. You may improve
layout and add visuals, but do not drop or shorten content. Formulas must be shown
exactly as written (monospace, copy button) and must not be "auto-corrected".

TECH STACK
- Static site, no backend, deployable free on GitHub Pages, Netlify or Vercel.
- Preferred: Vite + React + TypeScript + Tailwind CSS + React Router (HashRouter so
  GitHub Pages refresh works). Alternative if I ask: plain HTML/CSS/JS, one file per page.
- Store lesson content in /src/content as Markdown or TS objects (one file per lesson)
  and datasets in /src/data as CSV or JSON, so a teacher can edit text and data without
  touching components.
- Icons: lucide-react. Fonts: Inter (body), Poppins or Plus Jakarta Sans (headings),
  Noto Sans Bengali for Bangla text, JetBrains Mono for formulas.
- Spreadsheet engine for the playground: use a small open-source formula library
  (for example hot-formula-parser, MIT) or write a minimal evaluator; no paid APIs,
  no login, no database. Progress, quiz scores and lab checklists are saved in
  localStorage (wrap every read/write in try/catch).

DESIGN SYSTEM
- Light, clean, academic. White or #F8FAFC backgrounds with dark text (#0F172A).
  Do NOT use dark backgrounds for main content or slides. Optional dark-mode toggle only.
- Module colour accents (mirror the real apps so students connect them):
  Module 0 Computer Basics = Slate #475569; Word (Module 1) = Blue #2B579A;
  PowerPoint (Module 2) = Orange-red #D24726; Excel (Modules 3, 4, 5) = Green #217346
  with three shades: 3 Foundations #217346, 4 Business Calculations #1B5E3A,
  5 Data Analysis #2E8B57.
- BAUST navy #1E3A8A for header and primary buttons.
- Rounded cards (12px), soft shadows, 8px spacing grid, max content width 1100px.
- Excel look: the playground and all worked examples use a realistic worksheet grid
  (column letters, row numbers, green selected-cell border, formula bar above the grid).
- Fully responsive: must work at 360px phone width (most students use phones),
  16px side gutters, no horizontal scroll, tables and worksheets scroll inside their own box.
- Accessible: WCAG AA contrast, alt text, keyboard navigation, visible focus rings.

GLOBAL LAYOUT
- Sticky header: course code + title, nav links (Home, Syllabus, Modules dropdown,
  Labs, Excel Lab (tools), Practice, Quizzes, Resources, Credits), search icon.
- Lesson pages: left sidebar with module/lesson tree and tick marks for completed
  lessons; right "On this page" mini table of contents; breadcrumb on top;
  Previous / Next lesson buttons at the bottom; "Mark as complete" button.
- Footer on every page: "Course teachers: Naimur Rahman, Md. Rakib Trofder, Saad Ahmed,
  Dept. of CSE, BAUST | Content & teaching design: Naimur Rahman Sir | Website:
  Md. Rakib Trofder | For educational use" + year.

REUSABLE COMPONENTS (build each one)
1. StepList — numbered steps with the ribbon path shown as a chip,
   e.g. [Insert ▸ Table ▸ Insert Table].
2. ShortcutKey — renders keys like <kbd>Ctrl</kbd> + <kbd>S</kbd>.
3. Callout boxes: Tip (green), Note (blue), Warning (amber), Bangla hint (purple),
   Try it (orange), Business case (teal).
4. RibbonMock — a simple HTML/CSS imitation of the Office ribbon that highlights
   the tab/group used in a step (no screenshots of Microsoft UI needed).
5. FormulaBox — monospace Excel formula with a "Copy" button, an explanation line and
   an "Open in playground" button that loads the formula into the playground.
6. Excel playground (the most important component — see EXCEL LAB below).
7. Quiz component — multiple choice, instant feedback with explanation, score,
   retry, score saved in localStorage.
8. Flashcards for shortcuts and for functions (flip on click).
9. Lab card — objective, time, files to submit, step checklist (checkboxes saved
   locally), expected-results box (answer key, hidden behind "Show expected results"),
   marking rubric table, "Download lab sheet (Print)" button using window.print()
   with a print stylesheet.
10. Progress bar per module and overall on the home page.
11. Global search (client-side, e.g. Fuse.js) over lesson titles, headings, shortcuts,
    function names and glossary terms.
12. Glossary tooltip — glossary terms underlined with dotted line show definition on hover/tap.
13. WorksheetView — read-only styled worksheet that displays a table from the content
    (with row/column headers and optional highlighted ranges) so every dataset and every
    "before/after" example looks like real Excel.
14. DatasetCard — shows a dataset preview, its column dictionary, and buttons
    "Download CSV" and "Open in playground".
15. Function finder — searchable, filterable table of Excel functions (from the Function
    Reference in Part D) with syntax, purpose, example, category and a "365 only" badge.

EXCEL LAB (page /excel-lab, also embedded in Excel lessons)
Build these interactive tools. All run in the browser with the datasets from Part D.
a. Playground: a grid of at least 12 columns x 25 rows with a formula bar, Name Box,
   typing, arrow-key navigation, copy/paste of formulas with relative/absolute reference
   adjustment, AutoFill by dragging the fill handle, a "Show formulas" toggle (Ctrl+`),
   error values shown like Excel (#DIV/0!, #VALUE!, #NAME?, #REF!, #N/A), number-format
   buttons (comma, 0 / 2 decimals, %, ৳). Supported functions at minimum: SUM, AVERAGE,
   MIN, MAX, COUNT, COUNTA, COUNTBLANK, ROUND, ROUNDUP, ROUNDDOWN, ABS, SQRT, POWER, MOD,
   IF, IFS, AND, OR, NOT, IFERROR, SUMIF, SUMIFS, COUNTIF, COUNTIFS, AVERAGEIF, MAXIFS,
   MINIFS, SUMPRODUCT, VLOOKUP, HLOOKUP, XLOOKUP, INDEX, MATCH, LEFT, RIGHT, MID, LEN,
   TRIM, UPPER, LOWER, PROPER, CONCAT, TEXTJOIN, TEXT, TODAY, NOW, DATE, YEAR, MONTH, DAY,
   EDATE, EOMONTH, WEEKDAY, DATEDIF, NETWORKDAYS, PMT, FV, PV, NPER, RATE, NPV, IRR, SLN,
   DB, DDB, RANK.EQ. A "Load sample sheet" menu loads the datasets from Part D.
b. Reference visualiser: the student types a formula such as =B2*$E$1 in one cell, then
   drags it down/right; the tool shows which references moved and which stayed fixed
   (colour-coded relative / absolute / mixed).
c. Formula builder drills: 30 small tasks ("Find the total of column F", "Show Pass if
   marks >= 40", "Find the price of product code in H2 from the price list"). The student
   types a formula in a mini-sheet and the tool checks the result (not the exact text).
d. Error spotter: 12 broken formulas (#DIV/0!, #VALUE!, #NAME?, #REF!, #N/A, circular
   reference, text-number, missing $, wrong range, unmatched bracket, wrong argument
   order, approximate-match mistake); the student picks the fix.
e. Business calculators (each shows the Excel formula it uses next to the answer):
   EMI / loan (PMT) with a 12-row amortisation table; compound interest and savings (FV);
   break-even (units, sales, chart of cost/revenue lines); NPV and IRR; depreciation
   (SLN, DB, DDB side by side); VAT and discount; markup vs margin; percentage change.
f. Chart chooser: ask "What do you want to show?" (compare, trend, share of total,
   relationship, distribution) and recommend a chart with an example.
g. Dashboard builder demo: a fixed sales dataset with KPI cards, a slicer-like filter
   (region, category) and three charts that update together (shows how an Excel dashboard works).

PAGES (follow Part B exactly)
Home, Course Overview & Syllabus, Getting Started (Module 0), Microsoft Word (Module 1),
Microsoft PowerPoint (Module 2), Excel Foundations (Module 3), Excel Business
Calculations (Module 4), Excel Data Analysis & Reporting (Module 5), Lab Sheets
(Lab 1–13), Excel Lab (tools), Datasets, Practice Projects, Quizzes, Shortcut Cheat Sheet,
Function Reference, Glossary, Assessment & Exam Guide, Downloads/Resources, FAQ,
Credits & About, 404 page.

EACH LESSON PAGE MUST HAVE, IN THIS ORDER
1. Title, module badge, estimated time, difficulty (Beginner/Intermediate/Advanced) and,
   where Part C says so, an "Extension (self-study)" badge.
2. Learning outcomes (3–5 bullets, starting with verbs).
3. Concept explanation in short paragraphs.
4. Step-by-step procedures with ribbon path chips.
5. Worked business example (Excel lessons): a WorksheetView with the formulas shown.
6. Keyboard shortcuts table for the lesson.
7. Common mistakes & fixes.
8. "Try it yourself" practice task (Excel lessons: with an "Open in playground" button).
9. "Check yourself" link to that module's quiz (questions in Part D).
10. Previous / Next navigation.

QUALITY CHECKLIST BEFORE YOU FINISH
- Every link works; no empty page; no placeholder text.
- All three course teachers appear on Home, footer and Credits page; Naimur Rahman Sir's
  content-and-design credit appears on Home, footer and Credits page.
- Every formula in Part C and Part D appears exactly as written and the playground returns
  the expected results listed in Part D for the datasets.
- Excel content is clearly the largest part of the site (Modules 3, 4, 5 and Labs 7–13).
- Lighthouse: Performance, Accessibility, Best Practices, SEO all 90+.
- Tested at 360px, 768px and 1280px widths.
- Print stylesheet makes lab sheets print cleanly on A4.
- Provide a README with: install, run (npm run dev), build, deploy to GitHub Pages,
  how a teacher edits lesson content, and how to add or replace a dataset.

OUTPUT
Give me the full project file tree, then every file's complete code. Do not skip files.
```

Paste Parts B, C and D directly under this prompt when you send it.

## Part B — Website outline and sitemap

The site has 19 top-level pages and 43 lessons across six modules (three of them Excel), plus 13 lab sheets, 5 datasets and an Excel lab with 7 interactive tools.

| # | Page | URL | What it contains |
| --- | --- | --- | --- |
| 1 | Home | / | Hero (course code, title, BAUST, the three course teachers, credit to Naimur Rahman Sir), 6 module cards (Excel highlighted as the main focus), progress bar, "Start learning" button, "Open the Excel Lab" button, this week's lab |
| 2 | Course Overview & Syllabus | /syllabus | Course info table, objectives, course outcomes (CO1–CO5), 14-week plan, lab rules, mark distribution |
| 3 | Module 0 — Getting Started | /module/basics | Lessons 0.1–0.6 |
| 4 | Module 1 — Microsoft Word | /module/word | Lessons 1.1–1.11 |
| 5 | Module 2 — Microsoft PowerPoint | /module/powerpoint | Lessons 2.1–2.9 |
| 6 | Module 3 — Excel Foundations | /module/excel-foundations | Lessons 3.1–3.6 |
| 7 | Module 4 — Excel Business Calculations | /module/excel-business | Lessons 4.1–4.6 |
| 8 | Module 5 — Excel Data Analysis & Reporting | /module/excel-analysis | Lessons 5.1–5.9 |
| 9 | Lab Sheets | /labs | Lab 1–13 cards, each with its own page /labs/lab-01 … /labs/lab-13 |
| 10 | Excel Lab (tools) | /excel-lab | Playground, reference visualiser, formula drills, error spotter, business calculators, chart chooser, dashboard demo |
| 11 | Datasets | /datasets | 5 fictional business datasets with column dictionaries and CSV download |
| 12 | Practice Projects | /projects | 3 mini projects (business letter pack, pitch deck, sales and payroll workbook) + final integrated project |
| 13 | Quizzes | /quizzes | Module quizzes (Modules 0–5) and one 40-question final practice quiz |
| 14 | Shortcut Cheat Sheet | /shortcuts | Searchable table + flashcards |
| 15 | Function Reference | /functions | Searchable Excel function finder with examples |
| 16 | Glossary | /glossary | A–Z terms |
| 17 | Assessment & Exam Guide | /assessment | Marks split, lab mid and lab final format, rubrics, viva questions |
| 18 | Resources, FAQ | /resources, /faq | Downloads, free alternatives, typing practice links, student questions |
| 19 | Credits & About | /credits | Course teachers, main credit to Naimur Rahman Sir, website credit, acknowledgement, disclaimer |
| — | 404 | \* | Friendly "page not found" with link home |

**Lesson tree** (★ = extension lesson for self-study or if time allows)

- Module 0 — Getting Started with Computers
  - 0.1 Computer basics: hardware, software, input/output, storage units
  - 0.2 Windows essentials: desktop, taskbar, Start menu, windows
  - 0.3 File and folder management, File Explorer, naming and saving
  - 0.4 Keyboard, mouse and touch typing basics
  - 0.5 Introduction to Microsoft Office and the Ribbon interface
  - 0.6 Internet, email etiquette and safe computer use
- Module 1 — Microsoft Word (business documents)
  - 1.1 Word interface and creating your first document
  - 1.2 Typing, selecting and editing text
  - 1.3 Character (font) formatting
  - 1.4 Paragraph formatting: alignment, spacing, indents, lists
  - 1.5 Page layout: margins, orientation, size, columns, breaks
  - 1.6 Tables in Word
  - 1.7 Pictures, shapes, SmartArt, text boxes, WordArt
  - 1.8 Headers, footers, page numbers, footnotes
  - 1.9 Styles, table of contents, references and citations
  - 1.10 Proofing, track changes, mail merge, printing and PDF
  - 1.11 Business documents: letter, memo, notice, invoice and report templates
- Module 2 — Microsoft PowerPoint (business presentations)
  - 2.1 PowerPoint interface, views and slide layouts
  - 2.2 Working with text and slide design (themes, variants)
  - 2.3 Images, shapes, icons, SmartArt
  - 2.4 Tables and charts in slides
  - 2.5 Audio, video and hyperlinks
  - 2.6 Transitions and animations
  - 2.7 Slide Master, speaker notes, slide numbers
  - 2.8 Presenting, printing handouts and good design rules
  - 2.9 Business presentations: sales report and pitch deck
- Module 3 — Excel Foundations
  - 3.1 Excel interface: workbook, worksheet, cell, range
  - 3.2 Entering and editing data, AutoFill, Flash Fill, data validation
  - 3.3 Formatting cells, number formats (৳), conditional formatting
  - 3.4 Formulas and operators, order of operations, error values
  - 3.5 Cell references: relative, absolute, mixed; named ranges; other sheets
  - 3.6 Basic functions: SUM, AVERAGE, MIN, MAX, COUNT, ROUND, text and date basics
- Module 4 — Excel Business Calculations
  - 4.1 Logical functions: IF, nested IF, IFS, AND, OR, IFERROR
  - 4.2 Conditional totals: COUNTIF(S), SUMIF(S), AVERAGEIF, MAXIFS, MINIFS, SUMPRODUCT
  - 4.3 Lookup functions: VLOOKUP, HLOOKUP, XLOOKUP, INDEX + MATCH, approximate match
  - 4.4 Dates and time in business: due dates, ageing, working days, months
  - 4.5 ★ Financial functions: PMT, FV, PV, NPER, RATE, NPV, IRR, depreciation
  - 4.6 Business mathematics in Excel: VAT, discount, profit, markup, break-even, payroll
- Module 5 — Excel Data Analysis & Reporting
  - 5.1 Sorting, filtering, Excel Tables and slicers
  - 5.2 Cleaning data: duplicates, Text to Columns, TRIM, Find & Replace, Go To Special
  - 5.3 PivotTables and PivotCharts
  - 5.4 Business charts: column, line, pie, combo, sparklines, waterfall
  - 5.5 ★ What-if analysis: Goal Seek, Data Table, Scenario Manager, Solver
  - 5.6 ★ Dynamic-array and modern functions (365): FILTER, SORT, UNIQUE, XLOOKUP, LET
  - 5.7 Building a dashboard
  - 5.8 Page setup, printing, protection, sharing and collaboration
  - 5.9 ★ Linking Excel with Word and PowerPoint; Power Query and macros overview

**Navigation rules:** Home → module page (lesson list with times) → lesson → next lesson. Each module page ends with its quiz and linked labs. Labs link back to the lessons they need. Excel lessons link to the matching playground tool and dataset.

## Part C — Full course content

Every lesson below follows the same pattern: outcomes, explanation, steps, shortcuts, common mistakes and a "Try it" task. Excel lessons (Modules 3, 4 and 5) also include a **worked business example** with the formulas shown. Module quizzes are in Part D. Datasets used in the examples are in Part D (Datasets 1–5).

**Lesson labels:** every Excel lesson ends with a line `Playground:` naming the dataset and tool to open. Lessons marked ★ are extension lessons.

### Module 0 — Getting Started with Computers

**Module goal:** students can use a Windows computer confidently, manage files, and understand the Office interface before starting Word, PowerPoint and Excel. Total time: about 2 lab weeks (Weeks 1–2).

#### Lesson 0.1 — Computer basics (40 min)

**Learning outcomes**

- Define a computer and describe the Input–Process–Output–Storage cycle.
- Distinguish hardware from software, and system software from application software.
- Name common input, output and storage devices.
- Convert between storage units (bit, byte, KB, MB, GB, TB).

**Explanation**

A computer is an electronic machine that accepts data (input), processes it according to instructions (program), produces results (output) and stores data for later use. Data is raw facts; information is processed, meaningful data.

The basic organization has five units: Input unit, Central Processing Unit (CPU: Control Unit + Arithmetic Logic Unit), Memory unit (primary memory: RAM and ROM), Output unit, and Secondary storage (HDD, SSD, pen drive).

| Category | Examples |
| --- | --- |
| Input devices | Keyboard, mouse, scanner, microphone, webcam, touchscreen, OMR/OCR reader |
| Output devices | Monitor, printer, speaker, projector, headphones |
| Storage devices | Hard disk (HDD), Solid state drive (SSD), USB pen drive, memory card, DVD, cloud storage |
| System software | Operating systems: Windows, macOS, Linux, Android; device drivers; utilities |
| Application software | MS Word, PowerPoint, Excel, web browsers, media players, Zoom |

**Storage units**

| Unit | Equals |
| --- | --- |
| 1 Bit | 0 or 1 (binary digit) |
| 1 Byte | 8 bits (one character) |
| 1 Kilobyte (KB) | 1024 bytes |
| 1 Megabyte (MB) | 1024 KB |
| 1 Gigabyte (GB) | 1024 MB |
| 1 Terabyte (TB) | 1024 GB |

RAM is temporary (volatile) working memory; its data is lost when power goes off. ROM is permanent and holds start-up instructions. Secondary storage keeps files permanently.

**Common mistakes:** calling the whole system box the "CPU" (the CPU is the processor chip inside); confusing RAM size with storage size.

**Try it:** open Settings ▸ System ▸ About and write down your computer's processor, installed RAM and Windows edition.

#### Lesson 0.2 — Windows essentials (40 min)

**Learning outcomes**

- Start, sign in to, lock, restart and shut down Windows safely.
- Identify desktop, taskbar, Start menu, notification area and icons.
- Open, move, resize, minimize, maximize and switch between windows.

**Explanation and steps**

- **Desktop:** the main screen with icons and wallpaper. **Taskbar:** bar at the bottom with Start button, search, pinned and open apps, clock and notification area.
- Open an app: click Start, type the app name (e.g. "Word"), press Enter.
- Window controls (top-right): Minimize (–), Maximize/Restore (□), Close (×).
- Snap windows side by side: drag a window to the left or right screen edge, or press Windows + Left/Right arrow.
- Shut down properly: Start ▸ Power ▸ Shut down. Never switch off the power directly; unsaved work and the system can be damaged.

| Action | Shortcut |
| --- | --- |
| Open Start menu | Windows key |
| Switch between open apps | Alt + Tab |
| Show desktop | Windows + D |
| Open File Explorer | Windows + E |
| Lock the computer | Windows + L |
| Close current app | Alt + F4 |
| Task Manager (app not responding) | Ctrl + Shift + Esc |
| Screenshot of selected area | Windows + Shift + S |

**Try it:** open Word and File Explorer, snap them side by side, then lock and unlock the computer.

#### Lesson 0.3 — File and folder management (60 min)

**Learning outcomes**

- Create, rename, copy, move and delete files and folders.
- Understand drives, folders, file paths and file extensions.
- Save files in an organised folder structure and find them again.

**Explanation**

A file is a named collection of data (a document, picture, song). A folder holds files and other folders. A drive is a storage device such as C: or a pen drive (E:). A path shows the location, e.g. `D:\BAUST\CSE1204\Lab01\MyCV.docx`. The extension after the dot tells the file type.

| Extension | File type |
| --- | --- |
| .docx | Word document |
| .pptx | PowerPoint presentation |
| .xlsx | Excel workbook |
| .pdf | Portable Document Format |
| .jpg / .png | Image |
| .mp4 / .mp3 | Video / audio |
| .zip | Compressed folder |

**Steps**

1. Create a folder: open File Explorer (Windows + E) ▸ go to D: drive ▸ right-click empty space ▸ New ▸ Folder ▸ type `CSE1204_YourID` ▸ Enter.
2. Rename: select the item ▸ press F2 ▸ type new name ▸ Enter.
3. Copy: select ▸ Ctrl + C ▸ open destination ▸ Ctrl + V.
4. Move: select ▸ Ctrl + X ▸ open destination ▸ Ctrl + V (or drag with the mouse).
5. Delete: select ▸ Delete key (goes to Recycle Bin). Restore from Recycle Bin if needed. Shift + Delete removes permanently.
6. Select many files: Ctrl + click for separate files, Shift + click for a range, Ctrl + A for all.
7. Compress: right-click folder ▸ Compress to ZIP file (Windows 11) or Send to ▸ Compressed (zipped) folder.
8. Search: type in the search box at the top-right of File Explorer.

**Good naming rules:** use StudentID\_Lab01\_Topic.docx; avoid spaces at the start, symbols like / \\ : \* ? " < > |, and names like "New Document (3)".

**Common mistakes:** saving everything to Downloads or Desktop; forgetting where a file was saved (always check the Save As location); removing a pen drive without "Eject".

**Try it:** create `CSE1204_YourID` with subfolders Word, PowerPoint, Excel and Labs. Create a blank Word file inside Word, rename it, copy it to Labs, then zip the main folder.

#### Lesson 0.4 — Keyboard, mouse and touch typing (40 min)

**Learning outcomes**

- Name the main key groups and their uses.
- Use mouse actions: click, double-click, right-click, drag, scroll.
- Place fingers on the home row and practise touch typing.

**Key groups:** alphabet and number keys; function keys F1–F12 (F1 help, F2 rename, F5 refresh/start slideshow, F7 spelling, F12 Save As in Office); modifier keys Ctrl, Alt, Shift, Windows; navigation keys Home, End, Page Up, Page Down, arrows; editing keys Backspace (deletes left), Delete (deletes right), Insert, Enter, Tab, Caps Lock, Esc.

**Mouse actions:** single click selects; double-click opens; right-click shows the context menu; drag moves or selects; scroll wheel moves up/down; Ctrl + scroll zooms.

**Touch typing:** left fingers rest on A S D F, right fingers on J K L ; with thumbs on Space. The F and J keys have small bumps to find position without looking. Target for this course: 25+ words per minute with 90%+ accuracy by the end of the semester.

**Try it:** 10 minutes daily on a free typing tutor (see Resources page) and record your speed each week.

#### Lesson 0.5 — Introduction to Microsoft Office and the Ribbon (30 min)

**Learning outcomes**

- Name the main Office applications and what each is used for.
- Identify the common parts of the Office window.
- Use Backstage view to create, open, save, Save As and export files.

| Application | Used for | File extension |
| --- | --- | --- |
| Word | Letters, reports, CVs, assignments | .docx |
| PowerPoint | Slide presentations | .pptx |
| Excel | Tables of numbers, calculations, charts | .xlsx |
| Outlook | Email and calendar | — |
| OneNote | Digital notebook | — |

**Common window parts:** Title bar (file name), Quick Access Toolbar (Save, Undo, Redo), Ribbon with Tabs (Home, Insert, Design, Layout…), Groups inside each tab (e.g. Font group), Commands (buttons), Dialog box launcher (small arrow at a group's corner), Work area, Status bar (page/word count, zoom slider), View buttons.

**Backstage view (File tab):** New, Open, Info, Save, Save As, Print, Share, Export (Create PDF), Close, Options.

**Save vs Save As:** Save (Ctrl + S) updates the current file. Save As (F12) creates a new copy with a new name, location or format. Turn on AutoSave when the file is on OneDrive.

| Common Office shortcut | Action |
| --- | --- |
| Ctrl + N | New file |
| Ctrl + O | Open |
| Ctrl + S | Save |
| F12 | Save As |
| Ctrl + P | Print |
| Ctrl + Z / Ctrl + Y | Undo / Redo |
| Ctrl + C / X / V | Copy / Cut / Paste |
| Ctrl + A | Select all |
| Ctrl + F / Ctrl + H | Find / Replace |
| Alt (then letters) | Show ribbon key tips |

#### Lesson 0.6 — Internet, email and safe computer use (30 min)

**Learning outcomes**

- Search the web effectively and judge whether a source is reliable.
- Write a formal email with subject, greeting, body, closing and attachment.
- Follow basic cyber-safety and academic honesty rules.

**Search tips:** use specific keywords; put exact phrases in quotes ("mail merge in Word"); use `site:edu` to limit results; check author, date and organisation before trusting a page.

**Formal email format**

1. To: teacher's official email; Cc if needed.
2. Subject: clear and specific, e.g. `CSE 1204 Lab 03 Submission – ID 2xxxxxxx`.
3. Greeting: "Dear Sir," or "Respected Sir,".
4. Body: short, polite, purpose in the first line.
5. Closing: "Sincerely," + full name, ID, section, department.
6. Attach the file and check it opens before sending.

**Safety rules:** use strong passwords (12+ characters, mix of letters, numbers, symbols); never share OTPs; scan pen drives for viruses; do not open unknown attachments; log out of lab computers; back up work to Google Drive or OneDrive.

**Academic honesty:** copying another student's file (even with changed name) is plagiarism. Always cite images and text taken from the internet.

### Module 1 — Microsoft Word

**Module goal:** students produce well-formatted business documents: business letters, memos, notices, invoices, a CV, a report with a table of contents, and mail-merged letters with Excel data. Total time: about 2 lab weeks (Weeks 3–4).

#### Lesson 1.1 — Word interface and your first document (40 min)

**Learning outcomes**

- Identify the Word window parts and the main ribbon tabs.
- Create, save, close and reopen a document.
- Switch views and use zoom.

**Ribbon tabs in Word:** File, Home (font, paragraph, styles, editing), Insert (pages, tables, pictures, shapes, header/footer, symbols), Draw, Design (themes, watermark, page colour, borders), Layout (margins, orientation, size, columns, breaks, indent, spacing), References (TOC, footnotes, citations, captions), Mailings (mail merge, envelopes), Review (spelling, word count, comments, track changes), View (Read Mode, Print Layout, Web Layout, Outline, Navigation Pane, ruler, zoom), Help.

**Steps**

1. Start ▸ type Word ▸ Enter ▸ Blank document.
2. Type your name, department and ID on three lines.
3. File ▸ Save As ▸ Browse ▸ choose `CSE1204_YourID\Word` ▸ name `Lesson1_FirstDoc` ▸ Save.
4. Close with Ctrl + W; reopen with File ▸ Open ▸ Recent.
5. View ▸ show Ruler and Navigation Pane; use the zoom slider at the bottom-right.

**Status bar** shows page number, word count, language and proofing status. Right-click it to choose what to show.

#### Lesson 1.2 — Typing, selecting and editing text (40 min)

**Learning outcomes**

- Select text quickly with mouse and keyboard.
- Cut, copy, paste with paste options; undo and redo.
- Use Find, Replace and Go To.

| To select | Do this |
| --- | --- |
| A word | Double-click it |
| A paragraph | Triple-click inside it |
| A line | Click in the left margin next to it |
| Whole document | Ctrl + A |
| Character by character | Shift + Left/Right arrow |
| Word by word | Ctrl + Shift + Left/Right arrow |
| To end of line | Shift + End |
| A vertical block | Alt + drag |

**Paste options** (Ctrl + V then Ctrl, or Home ▸ Paste arrow): Keep Source Formatting, Merge Formatting, Picture, Keep Text Only. Use Keep Text Only (Ctrl + Shift + V in Microsoft 365) when pasting from websites to avoid strange fonts.

**Find and Replace:** Ctrl + F opens the Navigation Pane search. Ctrl + H opens Replace: type the old word, the new word, then Replace All. Use More ▸ Match case or Find whole words only for accuracy. Ctrl + G (Go To) jumps to a page number.

**Other editing tools:** Change Case (Home ▸ Aa: Sentence case, lowercase, UPPERCASE, Capitalize Each Word; Shift + F3 cycles), Insert ▸ Symbol (©, ®, ±, √, ৳), Insert ▸ Equation (Alt + =), Clear All Formatting (Home ▸ A with eraser).

**Common mistakes:** pressing Enter at the end of every line (Word wraps automatically — press Enter only for a new paragraph); using many spaces to line up text (use Tab or tables).

**Try it:** type three paragraphs about your hometown, replace every "city" with "town" using Replace All, and change the title to UPPERCASE with Change Case.

#### Lesson 1.3 — Character (font) formatting (40 min)

**Learning outcomes:** apply font, size, style, colour, highlight and effects; use Format Painter; use the Font dialog box.

| Command | Path | Shortcut |
| --- | --- | --- |
| Bold / Italic / Underline | Home ▸ Font | Ctrl + B / I / U |
| Font size up / down | Home ▸ Font | Ctrl + \] / Ctrl + \[ (or Ctrl + Shift + > / <) |
| Font dialog | Home ▸ Font launcher | Ctrl + D |
| Subscript (H₂O) | Home ▸ Font | Ctrl + = |
| Superscript (x²) | Home ▸ Font | Ctrl + Shift + + |
| Strikethrough | Home ▸ Font | — |
| Text highlight colour | Home ▸ Font | — |
| Font colour | Home ▸ Font | — |
| Text effects | Home ▸ Font ▸ A (glow) | — |
| Format Painter | Home ▸ Clipboard (brush) | Ctrl + Shift + C / V |

**Format Painter:** select formatted text ▸ click the brush once to copy formatting to one place, or double-click it to apply many times; press Esc to stop.

**Academic font guideline:** body text Times New Roman 12 pt or Calibri 11 pt; headings 14–16 pt bold; use at most two fonts per document; avoid bright colours in formal writing.

#### Lesson 1.4 — Paragraph formatting and lists (50 min)

**Learning outcomes:** set alignment, line and paragraph spacing, indents, tabs, bullets and numbering, borders and shading.

| Command | Path | Shortcut |
| --- | --- | --- |
| Align left / center / right | Home ▸ Paragraph | Ctrl + L / E / R |
| Justify | Home ▸ Paragraph | Ctrl + J |
| Line spacing 1.0 / 1.5 / 2.0 | Home ▸ Line and Paragraph Spacing | Ctrl + 1 / 5 / 2 |
| Increase / decrease indent | Home ▸ Paragraph | Ctrl + M / Ctrl + Shift + M |
| Hanging indent | Paragraph dialog ▸ Special | Ctrl + T |
| Paragraph dialog | Home ▸ Paragraph launcher | — |
| Show/hide formatting marks (¶) | Home ▸ Paragraph | Ctrl + Shift + 8 |
| Bulleted list | Home ▸ Bullets | — |
| Numbered list | Home ▸ Numbering | — |
| Multilevel list | Home ▸ Multilevel List | Tab / Shift + Tab to change level |

**Spacing:** Line spacing is space between lines inside a paragraph. Paragraph spacing (Before/After, in points) is space between paragraphs — use 6 pt After instead of pressing Enter twice.

**Indents on the ruler:** First Line Indent (top triangle), Hanging Indent (bottom triangle), Left Indent (small box), Right Indent.

**Tabs:** click the tab selector at the left of the ruler to choose Left, Center, Right or Decimal tab, then click on the ruler. Use Paragraph ▸ Tabs to add dot leaders (e.g. `Chapter 1 .......... 5`).

**Borders and shading:** Home ▸ Borders arrow ▸ Borders and Shading ▸ choose Box, style, colour, width, and Shading fill. Page Border tab adds a border to the whole page.

**Drop Cap:** Insert ▸ Drop Cap ▸ Dropped (large first letter).

**Try it:** format a paragraph as Justify, 1.5 line spacing, 0.5" first-line indent, 6 pt after. Make a two-level numbered list of your semester courses.

#### Lesson 1.5 — Page layout (40 min)

**Learning outcomes:** set margins, orientation, paper size, columns, page and section breaks, watermark, page colour and border.

**Steps**

1. Layout ▸ Margins ▸ Normal (1" all sides) or Custom Margins (e.g. Top 1", Bottom 1", Left 1.25", Right 1").
2. Layout ▸ Orientation ▸ Portrait or Landscape.
3. Layout ▸ Size ▸ A4 (standard in Bangladesh) or Letter.
4. Layout ▸ Columns ▸ Two (newsletter style); More Columns ▸ Line between.
5. Layout ▸ Breaks ▸ Page (Ctrl + Enter) starts a new page; Column break; Section Break ▸ Next Page lets one page be landscape and others portrait.
6. Design ▸ Watermark ▸ CONFIDENTIAL / DRAFT or Custom Watermark (text or picture).
7. Design ▸ Page Color and Page Borders.

**Measurement units:** File ▸ Options ▸ Advanced ▸ Display ▸ Show measurements in inches or centimeters.

**Common mistake:** pressing Enter many times to reach a new page. Always use a Page Break.

#### Lesson 1.6 — Tables in Word (60 min)

**Learning outcomes:** insert, edit, format and convert tables; merge/split cells; add formulas and sort.

**Steps**

1. Insert ▸ Table ▸ drag over the grid (e.g. 5×4) or Insert Table ▸ enter columns and rows.
2. Type in cells; Tab moves to the next cell (Tab in the last cell adds a row); Shift + Tab goes back.
3. Table Design tab: Table Styles, Header Row, Banded Rows, Shading, Borders, Pen colour.
4. Layout tab (table): Insert Above/Below/Left/Right, Delete, Merge Cells, Split Cells, Split Table, AutoFit (Contents/Window), Distribute Rows/Columns, cell Alignment, Text Direction, Cell Margins.
5. Repeat Header Rows (Layout tab) so the header shows on every page.
6. Sort: Layout ▸ Sort ▸ choose column and Ascending/Descending.
7. Simple calculation: click a cell ▸ Layout ▸ Formula ▸ `=SUM(ABOVE)` or `=AVERAGE(LEFT)`.
8. Convert: select tab-separated text ▸ Insert ▸ Table ▸ Convert Text to Table; reverse with Layout ▸ Convert to Text.
9. Draw Table and Eraser for irregular tables; Quick Tables for calendars.

**Try it:** create your class routine (Days × Periods) with merged lunch-break cells, a coloured header row and centred text.

#### Lesson 1.7 — Pictures, shapes, SmartArt, text boxes, WordArt (50 min)

**Learning outcomes:** insert and format graphics; control text wrapping and position; group objects; add captions.

- **Pictures:** Insert ▸ Pictures ▸ This Device / Stock Images / Online Pictures. Picture Format tab: Corrections, Color, Artistic Effects, Picture Styles, Crop, Size, Remove Background, Alt Text.
- **Wrap Text** (Layout Options icon or Picture Format ▸ Wrap Text): In Line with Text (moves like a letter), Square, Tight, Through, Top and Bottom, Behind Text, In Front of Text. Use Square or Top and Bottom for reports.
- **Shapes:** Insert ▸ Shapes ▸ draw with drag (hold Shift for a perfect circle/square); Shape Format ▸ Fill, Outline, Effects; right-click ▸ Add Text.
- **Group:** Ctrl + click several shapes ▸ right-click ▸ Group. Arrange order with Bring Forward / Send Backward; use Align ▸ Align Center.
- **SmartArt:** Insert ▸ SmartArt ▸ List, Process, Cycle, Hierarchy (organisation chart), Relationship, Matrix, Pyramid. Type in the text pane; change colours in SmartArt Design.
- **Text box:** Insert ▸ Text Box ▸ Draw Text Box. **WordArt:** Insert ▸ WordArt (use sparingly).
- **Icons, Charts, Screenshot, 3D Models** are also in Insert.
- **Caption:** right-click a picture ▸ Insert Caption ▸ "Figure 1: …".

**Try it:** design a one-page event poster for a Business Fair at BAUST: title WordArt, a picture with Square wrap, a SmartArt Process of the schedule and a text box with contact details.

#### Lesson 1.8 — Headers, footers, page numbers, footnotes (30 min)

**Steps**

1. Insert ▸ Header ▸ choose a style ▸ type the course name; Insert ▸ Footer ▸ type your name and ID.
2. Insert ▸ Page Number ▸ Bottom of Page ▸ Plain Number 2. Format Page Numbers ▸ start at 1, or i, ii, iii for front pages.
3. Header & Footer tab ▸ Different First Page (no number on cover), Different Odd & Even Pages.
4. For different numbering in sections: insert Section Break (Next Page), then untick Link to Previous.
5. References ▸ Insert Footnote (Alt + Ctrl + F) puts a note at the bottom of the page; Insert Endnote puts it at the end of the document.
6. Double-click the main text or press Close Header and Footer to leave.

#### Lesson 1.9 — Styles, table of contents, references and citations (50 min)

**Learning outcomes:** apply and modify styles; build an automatic table of contents; insert citations, bibliography and captions.

**Steps**

1. Apply Heading 1 to chapter titles, Heading 2 to sub-titles (Home ▸ Styles; Ctrl + Alt + 1 / 2).
2. Modify a style: right-click the style ▸ Modify ▸ set font, size, colour, spacing ▸ OK. All headings update at once.
3. Place cursor on a blank page ▸ References ▸ Table of Contents ▸ Automatic Table 1.
4. After editing, References ▸ Update Table ▸ Update entire table.
5. Citations: References ▸ Style (APA or Harvard are common in business reports) ▸ Insert Citation ▸ Add New Source ▸ fill author, title, year, publisher.
6. References ▸ Bibliography ▸ Bibliography or References inserts the list automatically.
7. Insert Caption for figures and tables, then Insert Table of Figures.
8. Cover page: Insert ▸ Cover Page.

**Why styles matter:** the Navigation Pane, table of contents and consistent formatting all depend on Heading styles.

#### Lesson 1.10 — Proofing, track changes, mail merge, printing and PDF (60 min)

**Proofing:** red underline = spelling, blue double underline = grammar. Review ▸ Spelling & Grammar (F7); Editor shows suggestions; Review ▸ Thesaurus (Shift + F7); Word Count; set language to English (United Kingdom) or (United States) via Review ▸ Language.

**Comments and Track Changes:** Review ▸ New Comment (Ctrl + Alt + M). Review ▸ Track Changes (Ctrl + Shift + E) records every insertion/deletion; the reviewer uses Accept / Reject. Use Display for Review ▸ Simple Markup / All Markup / No Markup. Review ▸ Compare compares two versions.

**Mail merge** (one letter, many recipients):

1. Prepare the data source in Excel with headings: Name, ID, Department, Marks.
2. In Word: Mailings ▸ Start Mail Merge ▸ Letters.
3. Mailings ▸ Select Recipients ▸ Use an Existing List ▸ choose the Excel file and sheet.
4. Write the letter; place cursor where data goes ▸ Insert Merge Field ▸ Name, etc.
5. Mailings ▸ Preview Results; use arrows to check each record.
6. Mailings ▸ Finish & Merge ▸ Edit Individual Documents (new document with all letters) or Print Documents.
7. Also available: Envelopes, Labels, Rules (If…Then…Else).

**Protect and share:** File ▸ Info ▸ Protect Document ▸ Encrypt with Password or Restrict Editing.

**Print and PDF:** File ▸ Print (Ctrl + P) ▸ choose printer, copies, pages (e.g. 1-3,5), one-sided/two-sided, orientation, pages per sheet. File ▸ Export ▸ Create PDF/XPS or Save As ▸ PDF. Always submit a PDF when formatting must not change.

**Try it:** mail-merge 5 "Lab completion certificates" from an Excel list of 5 students and export the result as PDF.

**Word module shortcut summary:** Ctrl + Enter page break · Shift + Enter line break · Ctrl + Shift + Space non-breaking space · F4 repeat last action · Ctrl + K hyperlink · Alt + Shift + D insert date · Ctrl + Home / End go to start / end of document.

#### Lesson 1.11 — Business documents: letter, memo, notice, invoice and report templates (50 min)

**Learning outcomes**

- Write a business letter in block format and a memo with the correct parts.
- Build a notice, meeting minutes and an invoice using tables, styles and templates.
- Save a company letterhead as a reusable template (.dotx) and use mail merge with Excel data.

**Explanation**

Business documents follow fixed layouts so that readers find information quickly. Use Word styles (not manual spacing) so every document in a company looks the same.

| Document | Parts, in order |
| --- | --- |
| Business letter (block format) | Letterhead (company name, logo, address) · Date · Reference no. · Inside address (receiver) · Salutation (Dear Sir / Dear Mr Rahman,) · Subject line (bold) · Body (3 short paragraphs: purpose, details, action wanted) · Complimentary close (Yours sincerely,) · Signature, name, designation · Enclosures / cc |
| Memo (internal) | Heading MEMO · To · From · Date · Subject · Body · Initials. No salutation or closing |
| Notice | Company name · NOTICE · Date · Heading · Short body (what, when, where, who) · Name and designation of the issuer |
| Meeting minutes | Title · Date, time, place · Attendees · Agenda items · Decision · Action by · Deadline (best as a 4-column table) |
| Invoice | Seller details · Invoice no. and date · Buyer details · Item table (No., Description, Qty, Unit price, Amount) · Subtotal · VAT · Total · Payment terms |
| Quotation | Like an invoice, plus "Valid until" date and delivery terms |

**Steps**

1. **Letterhead:** Insert ▸ Header ▸ Edit Header ▸ type the company name (Heading style, 18 pt, bold), insert the logo (Wrap Text: In Line with Text), add address and contact in a smaller grey font, then a bottom border under the paragraph (Home ▸ Borders ▸ Bottom Border).
2. **Block-format letter:** every line starts at the left margin; leave one blank line between parts using paragraph spacing (Home ▸ Paragraph ▸ Spacing After 12 pt), not the Enter key.
3. **Memo:** type `To:`, `From:`, `Date:`, `Subject:` then press Tab and use one tab stop (Home ▸ Paragraph ▸ Tabs ▸ 2 cm) so the answers line up.
4. **Meeting minutes:** Insert ▸ Table ▸ 4 columns; shade the header row; Table Layout ▸ Repeat Header Rows.
5. **Invoice:** Insert ▸ Table ▸ 5 columns × 6 rows; right-align the number columns; in the Amount column use Table Layout ▸ Formula ▸ `=PRODUCT(LEFT)` for each row (Qty × Unit price when they are the two cells to the left); in the Total cell use `=SUM(ABOVE)`.
6. **Save as template:** File ▸ Save As ▸ Word Template (*.dotx). New documents from it: File ▸ New ▸ Personal.
7. **Ready-made designs:** File ▸ New ▸ search "business letter", "invoice" or "memo" and customise.
8. **Mail merge with Excel data:** prepare the customer list in Excel (one header row, no blank rows) ▸ Word: Mailings ▸ Start Mail Merge ▸ Letters ▸ Select Recipients ▸ Use an Existing List ▸ Insert Merge Field ▸ Finish & Merge (see Lesson 1.10). Use Labels for envelope labels.
9. Print Preview (Ctrl + P); export to PDF before emailing a letter.

| Task | Shortcut |
| --- | --- |
| Insert today's date field | Alt + Shift + D |
| Non-breaking space (keeps "৳ 5,000" together) | Ctrl + Shift + Space |
| New line without a new paragraph | Shift + Enter |
| Format Painter (copy style) | Ctrl + Shift + C / V |
| Page break | Ctrl + Enter |

**Writing tips:** one purpose per letter; start with the main point; be polite and specific (dates, amounts, invoice numbers); avoid slang; proofread names and figures twice (Review ▸ Spelling & Grammar, F7).

**Common mistakes:** using the Enter key and spaces to position text; typing the date manually in a template (use a Date field); forgetting the subject line; leaving "Dear Sir/Madam" for a named person; wrong total in an invoice because numbers are typed as text.

**Try it:** create the letterhead for "Rahim Traders, Saidpur", write a block-format quotation letter to a customer for 10 office chairs, add an invoice table with `=SUM(ABOVE)`, save it as `RahimTraders_Letterhead.dotx`, and produce 5 letters with mail merge from a small Excel list.

### Module 2 — Microsoft PowerPoint

**Module goal:** students design and deliver a clear 8–10 slide business presentation with consistent design, visuals, a chart and purposeful animation. Total time: about 2 lab weeks (Weeks 5–6).

#### Lesson 2.1 — Interface, views and slide layouts (40 min)

**Learning outcomes:** identify PowerPoint window parts; add, duplicate, reorder, hide and delete slides; choose layouts; use the different views.

**Window parts:** Slide thumbnails pane (left), Slide pane (centre), Notes pane (bottom), Ribbon tabs (Home, Insert, Draw, Design, Transitions, Animations, Slide Show, Record, Review, View), Status bar with view buttons and zoom.

**Steps**

1. Start ▸ PowerPoint ▸ Blank Presentation (16:9 widescreen by default).
2. Home ▸ New Slide (Ctrl + M) ▸ choose a layout: Title Slide, Title and Content, Section Header, Two Content, Comparison, Title Only, Blank, Content with Caption, Picture with Caption.
3. Change a slide's layout: Home ▸ Layout.
4. Duplicate: right-click a thumbnail ▸ Duplicate Slide (Ctrl + D). Delete: select ▸ Delete key.
5. Reorder: drag thumbnails, or use Slide Sorter view.
6. Hide a slide: right-click ▸ Hide Slide (skipped in the show).
7. Group slides: right-click between slides ▸ Add Section.

| View | Use |
| --- | --- |
| Normal | Edit slides (default) |
| Outline View | Type and reorder text quickly |
| Slide Sorter | See all slides; reorder; apply transitions |
| Notes Page | Write and print speaker notes |
| Reading View | Preview the show inside the window |
| Slide Show | Full-screen presentation (F5) |
| Presenter View | Speaker sees notes, timer and next slide |

#### Lesson 2.2 — Text and slide design (40 min)

**Learning outcomes:** add and format text in placeholders and text boxes; apply themes, variants and backgrounds; use Designer.

- Click a placeholder ("Click to add title") and type. Use Tab / Shift + Tab to change bullet level.
- Format text with the Home tab (same as Word): font, size, bold, colour, alignment, line spacing, Convert to SmartArt, Text Direction.
- Insert ▸ Text Box for extra text anywhere.
- Design ▸ Themes applies colours, fonts and backgrounds to all slides; Variants changes colour schemes.
- Design ▸ Format Background ▸ Solid / Gradient / Picture fill; Apply to All.
- Design ▸ Slide Size ▸ Widescreen (16:9) or Standard (4:3).
- Design ▸ Designer (Microsoft 365) suggests layouts automatically.
- Replace fonts everywhere: Home ▸ Replace arrow ▸ Replace Fonts.

**Text rules for readable slides (6×6 guideline):** no more than 6 bullets per slide and about 6 words per bullet. Titles 36–44 pt, body text at least 24 pt (never below 18 pt). Use key phrases, not full paragraphs. Use high contrast: dark text on a light background.

#### Lesson 2.3 — Images, shapes, icons, SmartArt (50 min)

- Insert ▸ Pictures ▸ This Device / Stock Images. Picture Format ▸ Crop, Crop to Shape, Remove Background, Picture Styles, Corrections, Compress Pictures (makes the file smaller).
- Insert ▸ Icons and Insert ▸ Shapes. Shape Format ▸ Shape Fill, Outline, Effects, Merge Shapes.
- Arrange: Shape Format ▸ Align (Left, Center, Middle, Distribute Horizontally), Group (Ctrl + G), Ungroup (Ctrl + Shift + G), Bring Forward / Send Backward, Selection Pane (Alt + F10).
- View ▸ Guides and Gridlines help line objects up.
- SmartArt: Insert ▸ SmartArt, or select bullet text ▸ Home ▸ Convert to SmartArt.
- Insert ▸ Photo Album creates one slide per photo quickly.

**Image rules:** use high-quality, relevant images; never stretch (drag a corner, not a side, to keep proportions); credit sources on the slide or a final "Image credits" slide.

**Try it:** recreate the "Basic Organization of a Computer System" diagram: Input, CPU (with CU, ALU, Memory inside a dashed box), Output and Storage with arrows.

#### Lesson 2.4 — Tables and charts in slides (40 min)

1. Insert ▸ Table ▸ choose rows × columns; style it with Table Design (Header Row, Banded Rows).
2. Insert ▸ Chart ▸ Column / Line / Pie / Bar ▸ OK. A small Excel sheet opens: type your data there and close it.
3. Chart Design ▸ Edit Data, Change Chart Type, Quick Layout, Chart Styles, Add Chart Element (titles, data labels, legend).
4. Paste an Excel chart: copy in Excel ▸ in PowerPoint Paste Special ▸ keep source formatting & link data (updates when Excel changes).

**Which chart?** Column/bar to compare categories, line for change over time, pie for parts of a whole (max 5–6 slices).

#### Lesson 2.5 — Audio, video and hyperlinks (30 min)

- Insert ▸ Video ▸ This Device / Stock Videos / Online Videos (needs internet during the show).
- Playback tab: Trim Video, Fade In/Out, Volume, Start (On Click / Automatically), Play Full Screen, Loop.
- Insert ▸ Audio ▸ Audio on My PC or Record Audio; tick Play in Background for music across slides.
- Insert ▸ Link (Ctrl + K) to a web page, another slide (Place in This Document), a file or an email.
- Insert ▸ Action / Shapes ▸ Action Buttons (Next, Previous, Home) for interactive quizzes.
- Insert ▸ Zoom ▸ Summary Zoom or Slide Zoom for a clickable menu slide.

**Tip:** media is embedded in the file; copy the .pptx and test on the lab or classroom PC before presenting.

#### Lesson 2.6 — Transitions and animations (50 min)

**Transitions** (between slides): Transitions tab ▸ choose Fade, Push, Wipe, Morph, etc.; Effect Options; Duration; Sound; Advance Slide On Mouse Click or After 00:05; Apply To All.

**Morph transition:** duplicate a slide, move/resize objects on the second copy, apply Morph to the second slide — objects move smoothly.

**Animations** (objects inside a slide):

| Type | Colour in gallery | Example |
| --- | --- | --- |
| Entrance | Green | Appear, Fade, Fly In, Wipe |
| Emphasis | Yellow | Pulse, Grow/Shrink, Spin |
| Exit | Red | Disappear, Fade Out, Fly Out |
| Motion Paths | Lines | Lines, Arcs, Custom Path |

**Steps**

1. Select an object ▸ Animations ▸ choose an effect.
2. Effect Options ▸ direction or "By Paragraph" (bullets appear one by one).
3. Start: On Click / With Previous / After Previous; set Duration and Delay.
4. Animations ▸ Animation Pane to reorder, preview and fine-tune.
5. Add Animation to put a second effect on the same object; Animation Painter copies animation to another object.
6. Triggers: Animation Pane ▸ effect ▸ Timing ▸ Triggers ▸ start on click of a shape.

**Rule:** animation must support the message — use one or two simple effects consistently; avoid sounds and spinning text in academic talks.

#### Lesson 2.7 — Slide Master, notes and slide numbers (40 min)

1. View ▸ Slide Master. The top (largest) slide controls all layouts; the smaller ones control individual layouts.
2. Change fonts, colours, background, add a logo (e.g. BAUST logo) or footer once — it appears on every slide.
3. Insert ▸ Header & Footer ▸ Date and time, Slide number, Footer text ("CSE 1204 | Your Name"), Don't show on title slide ▸ Apply to All.
4. Close Master View.
5. Type speaker notes in the Notes pane (View ▸ Notes if hidden).
6. Save your design as a template: File ▸ Save As ▸ PowerPoint Template (.potx).

#### Lesson 2.8 — Presenting, printing and design principles (40 min)

| Action during slide show | Shortcut |
| --- | --- |
| Start from beginning | F5 |
| Start from current slide | Shift + F5 |
| Next / previous | Space, Enter, → / Backspace, ← |
| Go to slide number n | Type n + Enter |
| Black screen / white screen | B / W |
| Laser pointer | Ctrl + L |
| Pen | Ctrl + P |
| Erase ink | E |
| End show | Esc |

- Slide Show ▸ Rehearse Timings to practise; Record ▸ Record Slide Show to make a narrated video.
- Slide Show ▸ Set Up Slide Show ▸ Browsed at a kiosk (loops automatically).
- File ▸ Export ▸ Create a Video (.mp4) or Create PDF; Package Presentation for CD collects linked files.
- File ▸ Print ▸ Full Page Slides / Notes Pages / Outline / Handouts (3 slides per page includes lines for notes).

**Good design principles:** one idea per slide; consistent theme and fonts; contrast (light background with dark text works best in bright classrooms); alignment; white space; visuals over text; cite sources; end with a Summary and a "Thank you / Questions" slide.

**Presentation structure for students:** Title slide (topic, name, ID, course, date) → Outline → Introduction → 3–5 content slides → Conclusion → References → Questions. Spend about 1 minute per slide.

**PowerPoint module shortcut summary:** Ctrl + M new slide · Ctrl + D duplicate · Ctrl + G group · Ctrl + Shift + C / V copy/paste formatting · Shift + drag keeps proportions · Alt + F10 Selection Pane · F5 start show.

#### Lesson 2.9 — Business presentations: sales report and pitch deck (40 min)

**Learning outcomes**

- Structure a monthly sales report presentation and a business pitch deck.
- Paste Excel charts and tables into PowerPoint correctly (linked, embedded or as a picture).
- Present numbers clearly with one message per slide.

**Explanation**

A business audience (manager, investor, customer) wants the answer first. Every slide title should state the message ("Rajshahi region produced 48% of October sales"), not just the topic ("Sales by region").

| Deck | Suggested slides |
| --- | --- |
| Monthly sales report (8 slides) | 1 Title · 2 Agenda · 3 Key numbers (3–4 KPI boxes: total sales, growth %, top region, top product) · 4 Trend chart (line) · 5 Share chart (pie or bar by region) · 6 Detail table (top 5 customers) · 7 Insights and risks · 8 Recommendations and next steps |
| Pitch deck (10 slides) | 1 Title and one-line idea · 2 Problem · 3 Solution · 4 Market size · 5 Product / demo · 6 Business model (how you earn) · 7 Competition · 8 Marketing plan · 9 Financial summary (revenue, cost, profit, break-even) · 10 The ask and contact |

**Putting Excel data into PowerPoint**

1. In Excel, select the chart (or range) ▸ Ctrl + C.
2. In PowerPoint ▸ Home ▸ Paste ▾ and choose:
   - **Use Destination Theme & Link Data** (chart takes the slide colours and updates when the Excel file changes);
   - **Keep Source Formatting & Embed Workbook** (chart keeps the Excel look; the data travels inside the .pptx);
   - **Picture** (a fixed image; best when the numbers must not change or the file will be emailed).
3. Edit the data later: right-click the chart ▸ Edit Data.
4. For a table: paste as a Table (editable) or Picture (fixed). Keep tables to at most 5 rows × 4 columns per slide.

**Rules for numbers on slides:** round to what the audience needs (৳ 5.8 lakh, not ৳ 579,577.50); same unit and decimals everywhere; label axes and units; highlight the one bar or point that matters using a different colour; remove gridlines and 3-D effects; always give the source and the period ("Source: sales register, October 2026").

**Presenting numbers:** say the message first, then show the evidence, then say what to do. Keep to about one minute per slide; keep the detailed table in an appendix slide or a handout.

| Task | Shortcut |
| --- | --- |
| Start from the beginning / current slide | F5 / Shift + F5 |
| Black / white screen | B / W |
| Go to slide number | Type the number, then Enter |
| Laser pointer | Ctrl + click and hold |

**Common mistakes:** dumping a whole Excel sheet on a slide; tiny fonts (keep body text at 20 pt or larger); different number formats on different slides; a chart with no title or units; reading the slide aloud.

**Try it:** build a 6-slide sales report from your Lab 11 workbook (title, key numbers, line chart, pie chart, top-5 table, recommendation) and a one-slide "break-even" summary pasted from Excel as a linked chart.



### Module 3 — Excel Foundations

**Module goal:** students enter data accurately, format it professionally, write correct formulas with the right kind of cell reference, and use the basic functions on a small business worksheet. Total time: about 2 lab weeks (Weeks 8–9). **From this module on, the course is about Excel for business work.**

#### Lesson 3.1 — Excel interface: workbook, worksheet, cell, range (30 min)

**Learning outcomes**

- Name the parts of the Excel window and explain workbook, worksheet, cell, address and range.
- Navigate quickly with the keyboard and the Name Box.
- Add, rename, colour, move and delete worksheets.

**Explanation**

- **Workbook:** the whole `.xlsx` file. **Worksheet:** one sheet (tabs at the bottom: Sheet1, Sheet2…). A new workbook starts with one sheet; add more with the + button.
- **Columns** are letters (A … XFD, 16,384 columns); **rows** are numbers (1 … 1,048,576).
- **Cell:** the box where a row and a column meet. Its **address** is column + row, e.g. B3. The **active cell** has a green border.
- **Range:** a block of cells written first:last, e.g. `A1:D10`. A range of one column is written `C2:C21`.
- **Name Box** (left of the formula bar) shows the active cell or lets you jump to a cell or name; the **Formula Bar** shows the real content of the cell (a formula or a typed value). The **Status Bar** at the bottom shows Average, Count and Sum of the selected cells, with no formula needed.
- **Ribbon tabs:** File (Backstage: Save, Open, Print, Export, Options), Home, Insert, Page Layout, Formulas, Data, Review, View. Quick Access Toolbar: Save, Undo, Redo (add your favourites).
- **Sheet tabs:** double-click to rename; right-click ▸ Tab Color, Move or Copy, Hide, Delete; drag a tab to reorder. Ctrl + click tabs to select several sheets (edits apply to all: use carefully).
- **File types:** `.xlsx` (normal workbook), `.xlsm` (with macros), `.xls` (old format), `.csv` (plain text, one sheet, no formatting), `.xltx` (template), `.pdf` (export).

| Navigation | Shortcut |
| --- | --- |
| Move one cell | Arrow keys; Enter (down); Shift + Enter (up); Tab (right) |
| Go to A1 | Ctrl + Home |
| Go to last used cell | Ctrl + End |
| Jump to the edge of data | Ctrl + Arrow |
| Select to the edge of data | Ctrl + Shift + Arrow |
| Next / previous sheet | Ctrl + Page Down / Page Up |
| Go to a cell | F5 or Ctrl + G, or type in the Name Box |
| Select whole column / row / sheet | Ctrl + Space / Shift + Space / Ctrl + A |
| Undo / redo | Ctrl + Z / Ctrl + Y |

**Common mistakes:** confusing a workbook with a worksheet; typing in the Formula Bar area while a cell is not selected; saving as `.csv` and losing other sheets and formatting.

**Try it:** open a new workbook, rename Sheet1 to `Sales`, add sheets `Price List` and `Summary`, colour the tabs, jump to cell `Z100` with the Name Box, then return with Ctrl + Home.

**Playground:** open the blank grid; click cells and watch the Name Box and formula bar.

#### Lesson 3.2 — Entering and editing data (40 min)

**Learning outcomes**

- Enter text, numbers and dates correctly and recognise how Excel stores each.
- Use AutoFill, Flash Fill and data validation to enter data quickly and safely.
- Insert, delete, hide and freeze rows and columns.

**Explanation**

- **Data types:** Text (left-aligned by default), Numbers (right-aligned), Dates and times (stored as numbers: 1 January 1900 = 1; a date is a count of days), Logical (TRUE/FALSE), Formulas (start with `=`).
- Type in a cell and press Enter. Edit: double-click or F2. Replace: just type over. Clear: Delete. Cancel entry: Esc.
- `Alt + Enter` starts a new line inside a cell; `Ctrl + ;` inserts today's date (fixed), `Ctrl + Shift + ;` the current time.
- **Column width / row height:** double-click the border between column letters to AutoFit; Home ▸ Format ▸ Column Width.
- **Insert / delete:** right-click a row or column header ▸ Insert / Delete (`Ctrl + +` / `Ctrl + -`). Hide/Unhide from the same menu.
- **AutoFill:** type a value or pattern (1, 2 or Jan or Monday), select both cells, drag the small square (fill handle) at the bottom-right corner. Double-click the fill handle to fill down to the end of the neighbouring data. `Ctrl + D` fills down, `Ctrl + R` fills right. Home ▸ Fill ▸ Series for custom steps (e.g. invoice numbers).
- **Flash Fill (Ctrl + E):** type one example (for example the first name from a full name) in the next column; Excel completes the pattern.
- **Freeze headings:** View ▸ Freeze Panes ▸ Freeze Top Row (or Freeze First Column). Keeps headings visible while scrolling.
- **Data validation:** Data ▸ Data Validation. Settings: Whole number between 0 and 100 (stops wrong marks); Decimal; Date; **List** with a source like `Dhaka,Rangpur,Rajshahi,Bogura` (creates a drop-down); Text length. Use Input Message and Error Alert tabs to guide the user.
- **Find & Replace:** `Ctrl + F` / `Ctrl + H`. **Paste Special:** `Ctrl + Alt + V` ▸ Values (formula result only), Formats, Transpose, Multiply.
- **Good data layout for business sheets:** one header row; one record per row; one fact per column; no blank rows or columns inside the data; no merged cells in a data table; dates as real dates; numbers without units (put units in the header, e.g. `Unit Price (৳)`).

**Worked example (Dataset 1, first rows): typing the sales register**

| | A | B | C | D | E | F | G | H | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Inv No | Date | Customer | Product | Category | Region | Qty | Unit Price (৳) | Disc % |
| 2 | INV-1001 | 01-Oct-2026 | Alam Traders | Printer Paper (ream) | Stationery | Rangpur | 40 | 480 | 0 |
| 3 | INV-1002 | 02-Oct-2026 | Barnali Store | Office Chair | Furniture | Dhaka | 6 | 6500 | 5 |

Type `INV-1001` and `INV-1002`, select both and drag the fill handle: Excel continues INV-1003, INV-1004… In F2 use a data-validation list so only the four regions can be chosen.

| Task | Shortcut |
| --- | --- |
| Edit cell / new line in cell | F2 / Alt + Enter |
| Today's date / time | Ctrl + ; / Ctrl + Shift + ; |
| Fill down / right | Ctrl + D / Ctrl + R |
| Flash Fill | Ctrl + E |
| Paste Special | Ctrl + Alt + V |
| Fill the selected cells with the same entry | type, then Ctrl + Enter |
| Pick from existing entries in the column | Alt + Down Arrow |

**Common mistakes:** typing numbers with spaces or as text ("50 marks", Bangla digits like ৫০, an apostrophe before a number) so they cannot be calculated; typing dates as text (`1.10.26`) so they cannot be sorted or subtracted; blank rows inside data; using merged cells in the middle of a table.

**Try it:** type the first 10 rows of Dataset 1, use AutoFill for the invoice numbers, add a drop-down list for Region, freeze the top row, and add validation so Qty only accepts whole numbers from 1 to 500.

**Playground:** Dataset 1 (empty copy), drill "Enter and fill".

#### Lesson 3.3 — Formatting cells, number formats and conditional formatting (40 min)

**Learning outcomes**

- Format fonts, alignment, borders and fills for a clear, professional worksheet.
- Apply number formats for currency (৳), percentage, date and thousands separators.
- Use conditional formatting to highlight important values automatically.

**Explanation**

- Home tab groups: Font, Alignment (Wrap Text, Merge & Center, indent, orientation), Number, Styles.
- **Number formats:** General, Number (decimal places, 1000 separator), Currency / Accounting, Percentage, Date, Time, Text. Increase/Decrease Decimal buttons. The number format changes only **how a value looks**, not the stored value (a cell showing 12.35 may hold 12.3456).
- **Format Cells dialog:** `Ctrl + 1` ▸ Number, Alignment, Font, Border, Fill, Protection.
- **Taka format:** `Ctrl + 1` ▸ Number ▸ Custom ▸ type `"৳ "#,##0` (no decimals) or `"৳ "#,##0.00`. **Lakh/crore grouping** (12,34,567): use the custom format `[>=10000000]##\,##\,##\,##0;[>=100000]##\,##\,##0;##,##0` (works for positive numbers). Or set Windows Region to Bangladesh.
- **Percent:** type 15% or format a 0.15 cell with the % button. **Date:** Format Cells ▸ Date ▸ choose `14-Mar-12` style or custom `dd-mmm-yyyy`.
- **Alignment:** left for text, right for numbers, centre for headings; Wrap Text for long headings; avoid Merge & Center inside tables (use Center Across Selection from Format Cells ▸ Alignment ▸ Horizontal).
- **Borders and fills:** Home ▸ Borders ▸ All Borders / Thick Box Border; header row with a dark fill and white bold text. Keep to 2–3 colours.
- **Cell Styles and Format as Table (Ctrl + T)** give quick professional looks (Module 5 explains Tables).
- **Format Painter:** copy formatting from one cell to others (double-click the brush to keep it on).
- **Conditional formatting:** Home ▸ Conditional Formatting:
  - Highlight Cells Rules: Greater Than, Less Than, Between, Equal To, Text that Contains, Duplicate Values.
  - Top/Bottom Rules: Top 10 Items, Above Average.
  - Data Bars, Color Scales, Icon Sets (visual size comparison).
  - New Rule ▸ Use a formula, e.g. `=$H2="Overdue"` formats the whole row.
  - Manage Rules to edit or delete; Clear Rules to remove.
- `#####` in a cell means the column is too narrow: widen it (it is not an error in the formula).

**Worked example:** select the Net column of the sales register ▸ Conditional Formatting ▸ Highlight Cells Rules ▸ Greater Than `50000` ▸ Light Red Fill. Four invoices turn red (INV-1003, INV-1009, INV-1010, INV-1016).

| Task | Shortcut |
| --- | --- |
| Format Cells dialog | Ctrl + 1 |
| Bold / Italic / Underline | Ctrl + B / I / U |
| Number / Percent / Currency / General | Ctrl + Shift + 1 / 5 / 4 / ` |
| Date format | Ctrl + Shift + 3 |
| Wrap text | Alt + H, W |
| Apply border outline | Ctrl + Shift + 7 |

**Common mistakes:** typing the ৳ symbol or "Tk" inside the cell (turns the number into text; use a number format); rounding by formatting only and then wondering why totals differ by 1 (use ROUND, Lesson 3.6); too many colours; merging cells in data tables.

**Try it:** format the sales register: header row dark blue with white bold text, dates as `dd-mmm-yyyy`, Unit Price in `"৳ "#,##0`, Qty as a number with no decimals, a thin border around the table, and a Data Bar on Qty.

**Playground:** Dataset 1 with the number-format buttons; drill "Choose the right format".

#### Lesson 3.4 — Formulas and operators (40 min)

**Learning outcomes**

- Write formulas that start with `=` and use cell references instead of typed numbers.
- Apply the order of operations correctly.
- Recognise error values and fix their causes.

**Explanation**

A formula always begins with `=` and can use numbers, cell references, operators and functions. When a referenced cell changes, the result updates automatically. Click a cell while typing a formula to insert its reference (point mode); press Enter to finish.

| Operator | Meaning | Example |
| --- | --- | --- |
| + | Addition | `=A1+B1` |
| - | Subtraction | `=A1-B1` |
| \* | Multiplication | `=A1*B1` |
| / | Division | `=A1/B1` |
| ^ | Power | `=A1^2` |
| % | Percent | `=A1*10%` |
| & | Join text | `=A1&" "&B1` |
| = > < >= <= <> | Comparison (TRUE/FALSE) | `=A1>=40` |

**Order of operations (BODMAS / PEMDAS):** brackets → power → multiplication and division (left to right) → addition and subtraction. Example: `=10+5*2` gives 20, but `=(10+5)*2` gives 30. Percent is applied before the other operators: `=100+10%` gives 100.1.

**Business example (Dataset 1, layout in Part D):** in J2 type `=G2*H2` (Gross = Qty × Unit Price); in K2 `=J2*I2/100` (Discount amount, using the Disc % in column I); in L2 `=J2-K2` (Net). Later, in Lesson 3.5, the VAT rate moves into its own cell.

**Common error values**

| Error | Meaning | Fix |
| --- | --- | --- |
| #DIV/0! | Dividing by zero or an empty cell | Check the divisor; or use IFERROR (Lesson 4.1) |
| #VALUE! | Wrong type (text in a calculation) | Remove text/spaces from numbers |
| #NAME? | Misspelled function or text without quotes | Correct the spelling, add "quotes" |
| #REF! | A referenced cell was deleted | Rebuild the reference |
| #N/A | Lookup value not found | Check the lookup value and the range |
| #NUM! | Impossible number (e.g. square root of a negative) | Check the inputs |
| ##### | Column too narrow (or negative date) | Widen the column |
| Circular reference | A formula refers to its own cell | Change the reference |

**Show formulas:** `Ctrl + \`` (grave accent) toggles formulas and results; use it when checking lab work. Formulas ▸ Formula Auditing ▸ Trace Precedents / Trace Dependents / Evaluate Formula show how a result was built. A green triangle in a cell corner is Excel's warning; click the warning icon to see why.

| Task | Shortcut |
| --- | --- |
| Start a formula | = |
| Show formulas / results | Ctrl + \` |
| Insert a function | Shift + F3 |
| Complete a function name | Tab |
| Recalculate now | F9 |
| Edit the formula in the cell | F2 |

**Common mistakes:** typing the numbers into the formula (`=40*480`) instead of using cells; forgetting brackets; typing `x` for multiply; leaving a formula as text because the cell was formatted as Text (change to General, then re-enter); calculating a percentage as `=A1/100` when the cell is already formatted as %.

**Try it:** in Dataset 1 compute Gross (`=G2*H2`), Discount amount (`=J2*I2/100`) and Net (`=J2-K2`) for all 20 rows by filling down. Check that the sum of Gross is 610,850.

**Playground:** Dataset 1; error spotter drill "Fix the formula".

#### Lesson 3.5 — Cell references: relative, absolute, mixed (40 min)

**Learning outcomes**

- Predict what happens to a formula when it is copied.
- Use `$` and F4 to lock a cell (a rate, a price, a total).
- Use named ranges and references to other sheets.

**Explanation**

| Type | Written | What happens when copied |
| --- | --- | --- |
| Relative | `A1` | Both column and row change |
| Absolute | `$A$1` | Nothing changes (fixed cell) |
| Mixed (row fixed) | `A$1` | Column changes, row fixed |
| Mixed (column fixed) | `$A1` | Row changes, column fixed |

Press **F4** after typing or selecting a reference to cycle through `A1` → `$A$1` → `A$1` → `$A1`.

**Worked example 1 (absolute): VAT and discount rates in input cells**

| | P | Q |
| --- | --- | --- |
| 1 | **Assumptions** | |
| 2 | VAT rate | 15% |
| 3 | Bonus discount | 2% |

In `M2` write `=L2*$Q$2` (VAT on the Net in L2). Fill down: `L2` becomes `L3`, `L4`… but `$Q$2` never changes. If you change Q2 to 10%, all VAT amounts update at once. **Rule:** never type a rate (15%) inside formulas; keep it in a labelled cell and lock it with `$`.

**Worked example 2 (mixed): a multiplication table or price × quantity grid**

| | A | B | C | D |
| --- | --- | --- | --- | --- |
| 1 | | 10 | 20 | 30 |
| 2 | 100 | | | |
| 3 | 200 | | | |

In `B2` write `=$A2*B$1` and fill right and down: `$A` stays fixed to column A, `$1` stays fixed to row 1.

**Other references**

- Another sheet: `=Prices!B5`; a sheet name with spaces needs quotes: `='Price List'!B5`.
- Named range: Formulas ▸ Define Name (or type in the Name Box), e.g. `VAT_Rate` for `$Q$2`; then `=L2*VAT_Rate`. Names make formulas readable. Create from labels: select a table ▸ Formulas ▸ Create from Selection.
- 3-D sum across sheets: `=SUM(Jan:Dec!B2)` adds B2 of every sheet between Jan and Dec.
- Absolute vs relative when you **move** (cut and paste) a formula: references do not change; when you **copy**, they adjust.

**Common mistakes:** forgetting `$` so a rate moves down the column and returns 0 or wrong results (check with `Ctrl + \``); locking too much (`$A$1` when only the row should be fixed); typing a sheet name wrongly.

**Try it:** in Dataset 1 add VAT_Rate (15%) in an assumptions area, name it `VAT_Rate`, then compute VAT and Total for all 20 rows with one formula copied down. Change the rate to 10% and watch the totals change; change it back.

**Playground:** reference visualiser tool.

#### Lesson 3.6 — Basic functions (50 min)

**Learning outcomes**

- Use SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, COUNTBLANK and ROUND.
- Use basic text and date functions to prepare business data.
- Insert functions with AutoSum, the fx button and the Function Library.

**Explanation**

A function is a built-in formula: `=FUNCTION(arguments)`. Insert it by typing, with the fx button, Formulas ▸ Function Library, or **AutoSum** (`Alt + =`). The arguments can be numbers, cells or ranges: `=SUM(B2:B21)`; separate several arguments with commas.

| Function | Purpose | Example |
| --- | --- | --- |
| SUM | Adds numbers | `=SUM(L2:L21)` |
| AVERAGE | Mean | `=AVERAGE(L2:L21)` |
| MAX / MIN | Highest / lowest | `=MAX(L2:L21)` |
| COUNT | Counts cells with numbers | `=COUNT(G2:G21)` |
| COUNTA | Counts non-empty cells | `=COUNTA(C2:C21)` |
| COUNTBLANK | Counts empty cells | `=COUNTBLANK(G2:G21)` |
| ROUND | Rounds to n decimals | `=ROUND(M2,2)` |
| ROUNDUP / ROUNDDOWN | Always up / down | `=ROUNDUP(M2,0)` |
| INT / MOD | Whole part / remainder | `=MOD(G2,12)` |
| SQRT, ABS, POWER | Square root, absolute value, power | `=POWER(1+B1,B2)` |
| PRODUCT | Multiplies | `=PRODUCT(G2,H2)` |
| MEDIAN | Middle value | `=MEDIAN(L2:L21)` |
| LARGE / SMALL | k-th largest / smallest | `=LARGE(L2:L21,3)` |
| RANK.EQ | Position in a list | `=RANK.EQ(L2,$L$2:$L$21)` |
| UPPER / LOWER / PROPER | Change text case | `=PROPER(C2)` |
| LEN, LEFT, RIGHT, MID | Text length and parts | `=LEFT(A2,3)` gives `INV` |
| TRIM | Removes extra spaces | `=TRIM(C2)` |
| CONCAT / TEXTJOIN / & | Join text | `=C2&" - "&D2` |
| TEXT | Number or date as formatted text | `=TEXT(B2,"mmm-yyyy")` |
| TODAY / NOW | Current date / date-time | `=TODAY()` |
| DATE, YEAR, MONTH, DAY | Build a date / take parts | `=MONTH(B2)` |

**Status Bar:** select a range and read Average, Count and Sum at the bottom without a formula. Right-click the Status Bar to add Min and Max.

**Worked example (Dataset 1: Gross in column J, Net in column L, Qty in column G, rows 2–21)**

| Question | Formula | Expected result |
| --- | --- | --- |
| Total gross sales | `=SUM(J2:J21)` | 610,850 |
| Total net sales | `=SUM(L2:L21)` | 579,577.50 |
| Average net per invoice | `=AVERAGE(L2:L21)` | 28,978.875 → `=ROUND(AVERAGE(L2:L21),2)` gives 28,978.88 |
| Largest invoice | `=MAX(L2:L21)` | 111,600 (INV-1009) |
| Smallest invoice | `=MIN(L2:L21)` | 5,500 (INV-1006) |
| Number of invoices | `=COUNTA(A2:A21)` | 20 |
| Total quantity sold | `=SUM(G2:G21)` | 535 |

**Rounding rule:** ROUND changes the stored value; formatting changes only the look. For money that will be added up or paid (VAT, salary), round each line with `=ROUND(…,2)` so the total equals the sum of the printed lines.

| Task | Shortcut |
| --- | --- |
| AutoSum | Alt + = |
| Insert function dialog | Shift + F3 |
| Absolute reference | F4 |
| Select a table region | Ctrl + A (inside data) |
| Copy the formula from the cell above | Ctrl + ' |

**Common mistakes:** using SUM on a range that includes the total row itself (circular reference) or on text numbers (SUM ignores them: check the left-aligned values); AVERAGE of a range that has zeros where there should be blanks; counting with COUNT instead of COUNTA when the cells contain text; adding the numbers `=B2+B3+B4+…` instead of a range.

**Try it:** complete Dataset 1 totals as in the table above; add `=TEXT(B2,"mmm-yyyy")` in a Month column; use `=PROPER(TRIM(C2))` on a customer name that has extra spaces; compute the rank of every invoice by Net with RANK.EQ (the highest Net is rank 1).

**Playground:** Dataset 1; drills 1–8 (basic functions).


### Module 4 — Excel Business Calculations

**Module goal:** students solve real business questions with formulas: decisions (IF), conditional totals, price and rate lookups, due dates and ageing, loans and investments, VAT, profit, break-even and payroll. Total time: about 2 lab weeks (Weeks 10–11).

#### Lesson 4.1 — Logical functions: IF, nested IF, IFS, AND, OR, IFERROR (50 min)

**Learning outcomes**

- Write IF formulas that return text or numbers for a business rule.
- Combine conditions with AND, OR and NOT, and nest IF or use IFS for several levels.
- Hide errors safely with IFERROR.

**Explanation**

**IF:** `=IF(logical_test, value_if_true, value_if_false)`. The logical test is a comparison that is TRUE or FALSE (`>=`, `<=`, `=`, `<>`). Text in a formula needs "quotes"; numbers and cell references do not.

- Target check: `=IF(B2>=100000,"Target met","Below target")`
- Bonus: `=IF(B2>=100000,B2*2%,0)`

**Nested IF (several levels, work from the highest level down):**

```text
=IF(L2>=50000,"Large",IF(L2>=20000,"Medium","Small"))
```

**IFS (Excel 2019 and later):** the same rule without nesting; the last test `TRUE` works as "everything else".

```text
=IFS(L2>=50000,"Large",L2>=20000,"Medium",TRUE,"Small")
```

**AND / OR / NOT**

| Formula | Meaning |
| --- | --- |
| `=IF(AND(B2>=100000,C2>=5),"Gold","Standard")` | Both conditions must be true |
| `=IF(OR(F2="Dhaka",F2="Rajshahi"),"Priority","Normal")` | At least one must be true |
| `=IF(NOT(ISBLANK(B2)),"Entered","Missing")` | Reverses TRUE and FALSE |

**IFERROR:** `=IFERROR(value, value_if_error)` returns a friendly result when a formula gives an error. Example: `=IFERROR(L2/G2,0)` avoids `#DIV/0!` when Qty is empty. Use it only after you understand the error: hiding a wrong formula hides the mistake.

**Useful companions:** `ISBLANK(B2)`, `ISNUMBER(B2)`, `ISTEXT(B2)`, `ISERROR(B2)` return TRUE or FALSE for checking inputs.

**Worked example 1 (Dataset 1, Net in column L): order size.** Put the Nested IF above in column O and fill down. Expected counts: Large 4 (INV-1003, 1009, 1010, 1016), Medium 4 (INV-1002, 1011, 1015, 1018), Small 12.

**Worked example 2 (Dataset 3): target and bonus.** Monthly sales are in B2:B7 (Rahim 45,000; Karim 50,000; Salma 132,000; Nasrin 275,000; Tanvir 510,000; Mitu 99,999) and the target is 100,000 in cell E1 (use `$E$1`).

| | A | B | C | D |
| --- | --- | --- | --- | --- |
| 1 | Salesperson | Sales (৳) | Status | Bonus (৳) |
| 2 | Rahim | 45,000 | `=IF(B2>=$E$1,"Target met","Below target")` | `=IF(B2>=$E$1,B2*2%,0)` |

Expected: Target met for Salma, Nasrin and Tanvir (3 people); Bonus 2,640 / 5,500 / 10,200.

**Worked example 3: delivery charge.** `=IF(OR(F2="Dhaka",G2>=50),0,150)` gives free delivery for Dhaka or for 50 or more items, otherwise ৳ 150.

| Task | Shortcut |
| --- | --- |
| Insert function / argument help | Shift + F3 / Ctrl + Shift + A (inside the brackets) |
| Evaluate a formula step by step | Formulas ▸ Evaluate Formula |
| Show formulas | Ctrl + \` |

**Common mistakes:** typing text without quotes (`#NAME?`); comparing text with different spelling or extra spaces ("Dhaka " is not "Dhaka": use TRIM); more than one IF written in the wrong order (`>=20000` before `>=50000` makes every large order "Medium"); a missing closing bracket for each nested IF; comparing a number to text ("50" typed as text).

**Try it:** build the order-size column for Dataset 1, then a Priority column that returns "Priority" when Region is Dhaka AND Net is at least 20,000. Count the Priority rows with COUNTIF (Lesson 4.2); you should get 3 (INV-1002, INV-1003 and INV-1015).

**Playground:** Dataset 3 and Dataset 1; drills 9–14 (logical functions).

#### Lesson 4.2 — Conditional totals: COUNTIF(S), SUMIF(S), AVERAGEIF, MAXIFS, MINIFS, SUMPRODUCT (50 min)

**Learning outcomes**

- Count, add and average only the rows that meet one or more conditions.
- Write criteria correctly (text, numbers, comparisons, wildcards, dates).
- Build a small summary report with formulas that update automatically.

**Explanation**

| Function | Syntax | Meaning |
| --- | --- | --- |
| COUNTIF | `COUNTIF(range, criteria)` | Counts cells that meet one condition |
| COUNTIFS | `COUNTIFS(range1, crit1, range2, crit2…)` | Counts rows meeting all conditions |
| SUMIF | `SUMIF(range, criteria, sum_range)` | Adds the cells of sum_range where range meets the criteria |
| SUMIFS | `SUMIFS(sum_range, range1, crit1, range2, crit2…)` | Adds with several conditions. **Note: the sum range comes first** |
| AVERAGEIF(S) | `AVERAGEIF(range, criteria, avg_range)` | Average with conditions |
| MAXIFS / MINIFS | `MAXIFS(max_range, range1, crit1…)` | Highest / lowest with conditions (Excel 2019+) |
| SUMPRODUCT | `SUMPRODUCT(array1, array2…)` | Multiplies matching cells and adds them; can apply conditions |

**Writing criteria**

| You want | Criteria |
| --- | --- |
| Equal to text | `"Dhaka"` or a cell like `F2` |
| Equal to a number | `500` |
| Comparison | `">50000"`, `"<=100"`, `"<>Dhaka"` (not equal) |
| Compare with a cell | `">"&B1` (join the operator and the cell with &) |
| Text pattern | `"*Traders"` (ends with), `"A*"` (starts with), `"?ouse"` (one unknown letter) |
| Dates | `">="&DATE(2026,10,15)` or `">="&B1` |
| Blank / not blank | `""` / `"<>"` |

**Worked example (Dataset 1: Category E, Region F, Qty G, Net L; rows 2–21)**

| Question | Formula | Expected result |
| --- | --- | --- |
| Net sales of Dhaka | `=SUMIF(F2:F21,"Dhaka",L2:L21)` | 172,590 |
| Net sales of Rajshahi | `=SUMIF(F2:F21,"Rajshahi",L2:L21)` | 278,887.50 |
| Number of Dhaka invoices | `=COUNTIF(F2:F21,"Dhaka")` | 7 |
| Invoices with Net above 50,000 | `=COUNTIF(L2:L21,">50000")` | 4 |
| Customers whose name ends with "Traders" | `=COUNTIF(C2:C21,"*Traders")` | 4 |
| Average Net in Rajshahi | `=AVERAGEIF(F2:F21,"Rajshahi",L2:L21)` | 46,481.25 |
| Dhaka electronics invoices | `=COUNTIFS(F2:F21,"Dhaka",E2:E21,"Electronics")` | 3 |
| Net sales of Dhaka electronics | `=SUMIFS(L2:L21,F2:F21,"Dhaka",E2:E21,"Electronics")` | 85,940 |
| Largest electronics invoice | `=MAXIFS(L2:L21,E2:E21,"Electronics")` | 111,600 |
| Smallest stationery invoice | `=MINIFS(L2:L21,E2:E21,"Stationery")` | 5,500 |
| Total gross sales (no helper column) | `=SUMPRODUCT(G2:G21,H2:H21)` | 610,850 |
| Gross sales of Dhaka | `=SUMPRODUCT((F2:F21="Dhaka")*G2:G21*H2:H21)` | 176,700 |

**Summary table (best practice):** list the regions once in `A25:A28` and write `=SUMIF($F$2:$F$21,A25,$L$2:$L$21)` next to each; the absolute `$` lets you fill down. Add `=SUM(B25:B28)` and check that it equals the total Net (579,577.50). Expected: Rangpur 65,600; Dhaka 172,590; Rajshahi 278,887.50; Bogura 62,500. By category: Stationery 123,500; Furniture 147,150; Electronics 308,927.50.

| Task | Shortcut |
| --- | --- |
| Copy a formula to the cells below | Ctrl + D |
| Lock a range | F4 after selecting the range |
| Select a range with the keyboard | Shift + Arrow keys |
| Expand names list in a formula | Tab (accept the suggestion) |

**Common mistakes:** a criteria range and a sum range of different sizes; forgetting the quotes around text or operators (`>50000` without quotes); putting the sum range last in SUMIFS (it goes first); counting with a trailing space in the data ("Dhaka " is not "Dhaka": use Remove Duplicates and TRIM in Lesson 5.2); forgetting `$` so the range slides down when the formula is copied.

**Try it:** build the Region and Category summary tables above, a customer ranking (SUMIF per customer then RANK.EQ), and check each table total against 579,577.50. Expected top customers: Delta Office 145,662.50; Fahim Enterprise 133,225; City Mart 101,940; Barnali Store 70,650; Alam Traders 65,600; Eden Books 62,500.

**Playground:** Dataset 1; drills 15–20.

#### Lesson 4.3 — Lookup functions: VLOOKUP, HLOOKUP, XLOOKUP, INDEX + MATCH (60 min)

**Learning outcomes**

- Fetch a price, rate or name from a table using a code.
- Choose exact match or approximate match correctly.
- Replace VLOOKUP with XLOOKUP or INDEX + MATCH when appropriate.

**Explanation**

A lookup takes a value (the **lookup value**), finds it in the first column or row of a table, and returns a value from the same row or column. Use it so a code (product, customer ID, salesperson) brings its price, name or rate automatically.

**VLOOKUP** (vertical): `=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`

- `lookup_value`: what to find (e.g. `D2`, the product name).
- `table_array`: the lookup table, **locked with `$`** (e.g. `'Price List'!$A$2:$C$9`). The lookup value must be in the **first column** of this range.
- `col_index_num`: which column of the table to return (1 = first).
- `range_lookup`: **FALSE (or 0) = exact match** (use for codes and names); **TRUE (or 1) = approximate match** (use for slabs; the first column **must be sorted ascending**).

**Example 1, exact match (price list).** Price List sheet (A1:C9): Product, Category, Unit Price.

```text
=VLOOKUP(D2,'Price List'!$A$2:$C$9,3,FALSE)
```

For `Printer Paper (ream)` this returns 480; for `LED Monitor`, 15,500. If the product is missing, the result is `#N/A`; wrap it: `=IFERROR(VLOOKUP(D2,'Price List'!$A$2:$C$9,3,FALSE),"Not in price list")`.

**Example 2, approximate match (commission slab, Dataset 3).** Slab table in `E2:F6`, sorted ascending by the lower limit:

| E (Sales from ৳) | F (Commission rate) |
| --- | --- |
| 0 | 0% |
| 50,000 | 2% |
| 100,000 | 3.5% |
| 200,000 | 5% |
| 500,000 | 7% |

```text
=VLOOKUP(B2,$E$2:$F$6,2,TRUE)         (the rate)
=B2*VLOOKUP(B2,$E$2:$F$6,2,TRUE)      (the commission)
```

Approximate match finds the largest value that is **less than or equal to** the lookup value. Expected commission: Rahim 45,000 → 0; Karim 50,000 → 2% → 1,000; Salma 132,000 → 3.5% → 4,620; Nasrin 275,000 → 5% → 13,750; Tanvir 510,000 → 7% → 35,700; Mitu 99,999 → 2% → 1,999.98.

**HLOOKUP** works the same for tables arranged in rows: `=HLOOKUP(lookup_value, table_array, row_index_num, FALSE)`.

**XLOOKUP (Excel 2021 and Microsoft 365)**

```text
=XLOOKUP(D2,'Price List'!$A$2:$A$9,'Price List'!$C$2:$C$9,"Not in price list")
```

Arguments: lookup value, lookup array (one column), return array (one column), [if not found], [match mode], [search mode]. It defaults to exact match, can look to the left, and returns the value you choose without counting columns. Approximate version for slabs: `=XLOOKUP(B2,$E$2:$E$6,$F$2:$F$6,0,-1)` (match mode −1 = exact or next smaller).

**INDEX + MATCH (works in every version, can look left):**

```text
=INDEX('Price List'!$C$2:$C$9,MATCH(D2,'Price List'!$A$2:$A$9,0))
```

`MATCH(value, range, 0)` returns the position of the value; `INDEX(range, position)` returns the item at that position. The `0` means exact match.

| Choose | When |
| --- | --- |
| VLOOKUP | Simple, every Excel version, return column is to the right of the key |
| XLOOKUP | Excel 2021 / 365; clearer; exact by default; returns "not found" text directly |
| INDEX + MATCH | Older Excel and when you need to look to the left or use two-way lookups |

**Worked example: use the lookup to fill the invoice.** In the register, delete the typed Unit Price and use the lookup above; the totals remain 610,850 Gross and 579,577.50 Net. Change the price of `Mouse` in the Price List to 500: every Mouse invoice updates at once.

| Task | Shortcut |
| --- | --- |
| Lock the table range | Select it in the formula, then F4 |
| Insert a function | Shift + F3 |
| Show formulas | Ctrl + \` |

**Common mistakes:** forgetting FALSE (VLOOKUP then guesses and returns wrong prices); not locking the table (`$`), so it slides down when filled; a column number larger than the table; an unsorted first column with TRUE; text that looks equal but has extra spaces or different spelling; returning a column to the left of the key with VLOOKUP (use XLOOKUP or INDEX + MATCH); numbers stored as text in one table and real numbers in the other.

**Try it:** (1) create the Price List sheet and fill Unit Price and Category by lookup; (2) build the commission table and compute the commissions above; (3) build a "Customer finder": type an Inv No in a cell and show Customer, Product and Net with INDEX + MATCH.

**Playground:** Dataset 1 + Price List, Dataset 3; drills 21–26.

#### Lesson 4.4 — Dates and time in business: due dates, ageing, working days (40 min)

**Learning outcomes**

- Calculate due dates, days overdue, months and working days.
- Build an invoice ageing report.
- Format dates and extract parts of a date.

**Explanation**

Excel stores a date as a serial number of days (1 = 1 January 1900), so you can add and subtract dates: `=B2+30` is 30 days later; `=D2-B2` is the number of days between two dates. Format the cell as a Date to see it as a date and as Number to see the serial number.

| Function | Purpose | Example | Result |
| --- | --- | --- | --- |
| TODAY() / NOW() | Current date / date and time (recalculates each day) | `=TODAY()` | today |
| DATE(y,m,d) | Build a date | `=DATE(2026,10,31)` | 31-Oct-2026 |
| YEAR / MONTH / DAY | Parts of a date | `=MONTH(B2)` | 10 |
| EDATE(date, months) | Same day, n months later | `=EDATE(DATE(2026,10,31),1)` | 30-Nov-2026 |
| EOMONTH(date, months) | Last day of a month | `=EOMONTH(DATE(2026,10,15),0)` | 31-Oct-2026 |
| WEEKDAY(date) | Day number (1 = Sunday … 7 = Saturday) | `=WEEKDAY(DATE(2026,10,31))` | 7 (Saturday) |
| TEXT(date, "dddd") | Day name | `=TEXT(DATE(2026,10,31),"dddd")` | Saturday |
| NETWORKDAYS(start, end, [holidays]) | Working days (Saturday and Sunday are weekends) | `=NETWORKDAYS(DATE(2026,10,1),DATE(2026,10,31))` | 22 |
| NETWORKDAYS.INTL(start, end, weekend, [holidays]) | Working days with your own weekend (code 7 = Friday and Saturday) | `=NETWORKDAYS.INTL(DATE(2026,10,1),DATE(2026,10,31),7)` | 21 |
| WORKDAY(start, days) | Date after n working days | `=WORKDAY(B2,10)` | |
| DATEDIF(start, end, "Y"/"M"/"D"/"YM") | Complete years, months, days | `=DATEDIF(DATE(2022,3,15),DATE(2026,10,31),"Y")` | 4 |

**Worked example: invoice ageing (Dataset 4)**

Put the report date in `H1` (31-Oct-2026, a fixed date so answers stay the same; in real work use `=TODAY()`).

| | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Invoice | Customer | Invoice date | Credit days | Amount (৳) | Due date |
| 2 | A-101 | Alam Traders | 05-Aug-2026 | 30 | 85,000 | `=C2+D2` |

Add `G` Days overdue `=$H$1-F2` and `H` Ageing bucket (use the nested IF from Lesson 4.1):

```text
=IF(G2<=0,"Not due",IF(G2<=30,"1-30 days",IF(G2<=60,"31-60 days","Over 60 days")))
```

Expected: A-101 due 04-Sep, 57 days, 31-60 days · A-102 due 10-Oct, 21 days, 1-30 days · A-103 due 10-Oct, 21 days, 1-30 days · A-104 due 03-Sep, 58 days, 31-60 days · A-105 due 04-Nov, −4 days, Not due · A-106 due 15-Jul, 108 days, Over 60 days. Totals by bucket with SUMIF: Not due 98,000; 1–30 days 109,500; 31–60 days 116,000; Over 60 days 24,500; **total receivable 348,000.**

**Working days and deadlines:** if an order takes 10 working days from 1 Oct 2026, `=WORKDAY(DATE(2026,10,1),10)` gives the delivery date. Add a holidays range as the third argument.

| Task | Shortcut |
| --- | --- |
| Insert today's date (fixed) | Ctrl + ; |
| Date format | Ctrl + Shift + 3 |
| Fill dates by months | Fill handle ▸ Auto Fill Options ▸ Fill Months |

**Common mistakes:** dates typed as text (cell is left-aligned, calculations fail: retype with the system date format or use Data ▸ Text to Columns ▸ Date); a negative date shows `#####`; mixing `TODAY()` into a report that must not change (use a fixed report date); using `DATEDIF` with the start date later than the end date (#NUM!); forgetting that `NETWORKDAYS` counts both the start and end date.

**Try it:** build the full ageing report for Dataset 4 with a bucket summary and a column chart of the four buckets. Add a column "Interest at 1.5% per month on overdue amount" `=IF(G2>0,E2*1.5%*ROUNDUP(G2/30,0),0)` and check that A-106 (108 days → 4 started months) gives 1,470.

**Playground:** Dataset 4; drills 27–30.

#### Lesson 4.5 — ★ Financial functions: PMT, FV, PV, NPER, RATE, NPV, IRR, depreciation (50 min) — Extension

**Learning outcomes**

- Calculate a loan instalment, an amortisation schedule and the cost of borrowing.
- Calculate the future value of savings and the present value of a loan amount.
- Compare projects with NPV and IRR and compute depreciation.

**Explanation**

Excel's financial functions share a vocabulary: **rate** (interest rate per period), **nper** (number of periods), **pmt** (payment per period), **pv** (present value, the amount now), **fv** (future value). **Sign rule:** money you pay out is negative and money you receive is positive, so `=PMT(…, 500000)` returns a negative instalment; write `-500000` or put a minus before the function to get a positive number. **Keep the period consistent:** for monthly payments divide the annual rate by 12 and use the number of months.

| Function | Meaning | Example | Result |
| --- | --- | --- | --- |
| PMT(rate, nper, pv) | Payment per period for a loan | `=PMT(12%/12,36,-500000)` | 16,607.15 per month |
| PV(rate, nper, pmt) | Loan you can afford for a given payment | `=PV(12%/12,36,-20000)` | 602,150.10 |
| FV(rate, nper, pmt) | Future value of regular deposits | `=FV(8%/12,60,-5000)` | 367,384.28 |
| NPER(rate, pmt, pv) | Number of payments | `=NPER(12%/12,-16607.15,500000)` | 36 (about, because the instalment is rounded) |
| RATE(nper, pmt, pv) | Rate per period | `=RATE(36,-16607.15,500000)*12` | 12.00% a year (about) |
| IPMT / PPMT | Interest part / principal part of a payment | `=IPMT(1%,1,36,-500000)` | 5,000.00 (month 1 interest) |
| NPV(rate, values) | Present value of future cash flows (at period ends) | `=NPV(10%,80000,100000,120000,130000)-300000` | 34,321.43 |
| IRR(values) | Rate at which NPV is zero | `=IRR(B2:B6)` | 14.76% |
| SLN(cost, salvage, life) | Straight-line depreciation per year | `=SLN(600000,60000,5)` | 108,000 |
| DB(cost, salvage, life, period) | Declining-balance depreciation | `=DB(600000,60000,5,1)` | 221,400 |
| DDB(cost, salvage, life, period) | Double-declining-balance | `=DDB(600000,60000,5,1)` | 240,000 |

**Worked example 1: loan.** Loan ৳ 500,000, 12% a year, 36 monthly payments. `=-PMT(12%/12,36,500000)` shows 16,607.15. Total repaid ≈ 597,857.58, so the cost of borrowing (interest) ≈ 97,857.58. Amortisation schedule (first three months):

| Month | Opening balance | Interest (1%) | Principal | Closing balance |
| --- | --- | --- | --- | --- |
| 1 | 500,000.00 | 5,000.00 | 11,607.15 | 488,392.85 |
| 2 | 488,392.85 | 4,883.93 | 11,723.23 | 476,669.62 |
| 3 | 476,669.62 | 4,766.70 | 11,840.46 | 464,829.16 |

Formulas: Interest `=B2*$F$1/12` (annual rate in `F1`), Principal `=$F$2-C2` (payment in `F2`), Closing `=B2-D2`, next Opening `=E2`.

**Worked example 2: savings and compound interest.** Saving ৳ 5,000 a month for 5 years at 8%: `=FV(8%/12,60,-5000)` = 367,384.28 (deposited 300,000). One lump sum of 100,000 at 9% for 5 years: compound `=100000*(1+9%)^5` = 153,862.40; simple interest `=100000*(1+9%*5)` = 145,000.

**Worked example 3: should we invest?** Cost 300,000 now; cash inflows 80,000, 100,000, 120,000 and 130,000 in years 1–4; required return 10%. Cash flows in `B2:B6` = −300,000, 80,000, 100,000, 120,000, 130,000. `=NPV(10%,B3:B6)+B2` = **34,321.43** (positive: accept) and `=IRR(B2:B6)` = **14.76%** (higher than 10%: accept). NPV treats the first value as one period after today, so the starting cost is added outside the function.

**Worked example 4: depreciation of equipment** (cost 600,000; salvage 60,000; life 5 years).

| Year | SLN | DB | DDB |
| --- | --- | --- | --- |
| 1 | 108,000 | 221,400.00 | 240,000.00 |
| 2 | 108,000 | 139,703.40 | 144,000.00 |
| 3 | 108,000 | 88,152.85 | 86,400.00 |
| 4 | 108,000 | 55,624.45 | 51,840.00 |
| 5 | 108,000 | 35,099.03 | 17,760.00 |

DDB stops at the salvage value (book value 60,000 at the end of year 5).

| Task | Shortcut |
| --- | --- |
| Percentage format | Ctrl + Shift + 5 |
| Fill down a schedule | Ctrl + D |
| Show formulas | Ctrl + \` |

**Common mistakes:** using an annual rate with monthly periods (divide by 12); wrong signs (a positive PMT of a positive loan gives a negative answer, which is correct, not an error); forgetting that `NPV` assumes the first cash flow is at the end of period 1; using IRR when all flows are positive (#NUM!); typing 12 instead of 12% (rate of 1200%).

**Try it:** build an EMI sheet with inputs (amount, annual rate, years) and a 12-row amortisation table; change the rate to 10% and observe the instalment; then compare buying with a 36-month loan versus 60 months in total interest.

**Playground:** EMI, savings and NPV/IRR calculators; drills 31–34.

#### Lesson 4.6 — Business mathematics in Excel: VAT, discount, profit, break-even and payroll (50 min)

**Learning outcomes**

- Calculate VAT, discounts, profit, markup and margin correctly.
- Compute percentage change and break-even.
- Build a payroll sheet with allowances and deductions.

**Explanation**

Keep every rate in its own labelled input cell, use absolute references, and round money to 2 decimals. **The rates below are teaching inputs, not legal advice: check the current official rate (NBR for VAT and tax) and your employer's policy.**

| Calculation | Formula idea | Example |
| --- | --- | --- |
| VAT added | `=Net*VAT_Rate` | Net 100,000, VAT 15% → 15,000; total 115,000 |
| Price excluding VAT from a VAT-inclusive price | `=Price/(1+VAT_Rate)` | `=11500/(1+15%)` = 10,000 |
| Discount amount / price after discount | `=Price*Disc%` / `=Price*(1-Disc%)` | 6,500 less 5% = 6,175 |
| Profit | `=Revenue-Cost` | 250 − 150 = 100 per unit |
| Markup on cost | `=(Price-Cost)/Cost` | cost 800, price 1,000 → 25% |
| Margin on sales | `=(Price-Cost)/Price` | cost 800, price 1,000 → 20% |
| Percentage change | `=(New-Old)/Old` | 120,000 to 138,000 → 15% |
| Share of total (percent of total) | `=Part/Total` (lock the total with `$`) | Region net 172,590 / 579,577.50 = 29.8% |
| Simple interest | `=P*Rate*Time` | 80,000 at 10% for 9 months: `=80000*10%*9/12` = 6,000 |
| Weighted average | `=SUMPRODUCT(Values,Weights)/SUM(Weights)` | price weighted by quantity |

**Break-even analysis.** Fixed costs 120,000 per month; selling price 250 per unit; variable cost 150 per unit. Contribution per unit = 250 − 150 = 100. **Break-even units** = Fixed costs ÷ Contribution = `=120000/(250-150)` = **1,200 units**; break-even sales = 1,200 × 250 = **300,000**. Units needed for a profit of 40,000: `=(120000+40000)/(250-150)` = **1,600 units**. Draw units (0 to 2,400) against revenue and total cost to see the lines cross (a scatter chart, Lesson 5.4). Goal Seek (Lesson 5.5) can find the same answer.

**Payroll sheet (Dataset 2).** Inputs: House rent = 50% of Basic; Medical = ৳ 1,500; Conveyance = ৳ 1,000; Provident Fund = 10% of Basic (class assumptions; use your employer's policy). Layout: A ID, B Name, C Department, D Basic, E House Rent, F Medical, G Conveyance, H Gross, I PF, J Net Pay.

```text
E2: =D2*$M$2           (M2 = house rent rate, 50%)
F2: =$M$3              (medical)
G2: =$M$4              (conveyance)
H2: =D2+E2+F2+G2       (gross pay)
I2: =D2*$M$5           (PF rate 10%)
J2: =H2-I2             (net pay)
```

Expected for E01 Rahim Uddin (Basic 30,000): House rent 15,000; Gross 47,500; PF 3,000; Net 44,500. Totals for the 8 employees: **Basic 294,000; Gross 461,000; PF 29,400; Net 431,600.** Department summary with SUMIF (for example Accounts net pay: 61,300 + 48,700 = 110,000). Highest net pay: `=MAX(J2:J9)` = 72,500 (Tanvir Ahmed); name with `=INDEX(B2:B9,MATCH(MAX(J2:J9),J2:J9,0))`.

**Invoice with VAT (Dataset 1).** Total = Net + VAT, where VAT = `=ROUND(L2*VAT_Rate,2)`. Expected totals (rounded): Net 579,577.50; VAT ≈ 86,936.63; Invoice total ≈ 666,514.13.

| Task | Shortcut |
| --- | --- |
| Percent style | Ctrl + Shift + 5 |
| Currency style | Ctrl + Shift + 4 |
| AutoSum | Alt + = |
| Absolute reference | F4 |

**Common mistakes:** typing 15 for 15% (formula gives 1500%); applying VAT to a VAT-inclusive price (divide, do not multiply by 0.85); confusing markup and margin; calculating percentage change with the new value in the denominator; typing allowances inside formulas instead of input cells; not rounding VAT per line.

**Try it:** complete the payroll sheet for the 8 employees and the department summary; add a column "Eid bonus = 50% of Basic" with the rate in an input cell; build a break-even sheet with three inputs (fixed cost, price, variable cost) and check the 1,200-unit answer.

**Playground:** Dataset 2; break-even, VAT and margin calculators; drills 35–40.


### Module 5 — Excel Data Analysis & Reporting

**Module goal:** students turn a raw business worksheet into a clean, summarised and presentable report: sorted and filtered data, Tables, PivotTables, charts, what-if analysis, a dashboard and a printable, protected workbook. Total time: about 3 lab weeks (Weeks 12–14).

#### Lesson 5.1 — Sorting, filtering, Excel Tables and slicers (40 min)

**Learning outcomes**

- Sort data by one or several columns and filter it by text, number, date and colour.
- Convert a range to an Excel Table and use structured references, the Total Row and slicers.
- Use an Advanced Filter and Subtotals for quick reports.

**Explanation**

**Before you start:** the data must have one header row, no blank rows or columns, and no merged cells. Click any one cell inside the data (do not select part of it) so Excel finds the whole table.

**Sorting**

1. Data ▸ Sort A to Z / Z to A for one column.
2. Data ▸ Sort ▸ tick "My data has headers" ▸ choose Sort by ▸ **Add Level** to sort by Region (A to Z), then by Net (Largest to Smallest).
3. Custom List (for example sort by High, Medium, Low) in the Order box ▸ Custom List. Sort by Cell Color or Font Color is also available.
4. Sorting a single column of a table separately from the others breaks the rows apart: always sort the whole table.

**Filtering**

1. Data ▸ Filter (`Ctrl + Shift + L`) adds a drop-down arrow to each heading.
2. Choose values, or use Text Filters (Contains, Begins With), Number Filters (Greater Than, Between, Top 10, Above Average), Date Filters (This Month, Between…), Filter by Color.
3. Several columns filter together (AND). The Status Bar shows "7 of 20 records found".
4. Clear: Data ▸ Clear; remove arrows: `Ctrl + Shift + L` again.
5. Copy only the visible rows: select ▸ `Alt + ;` ▸ copy ▸ paste.

**Advanced Filter:** Data ▸ Advanced. Create a small criteria area with the same headings above the data (for example Region = Dhaka and Category = Electronics on the same row means AND; on different rows means OR), choose "Copy to another location" and "Unique records only" if needed.

**Excel Tables (Ctrl + T)**

- Select a cell in the data ▸ Insert ▸ Table (`Ctrl + T`) ▸ tick "My table has headers". Rename it in Table Design ▸ Table Name (for example `Sales`).
- Benefits: automatic banding, filter buttons, formulas copy down automatically, the table grows when you type below it, charts and PivotTables update, and **structured references** make formulas readable: `=[@Qty]*[@[Unit Price]]` (this row), `=SUM(Sales[Net])` (whole column).
- **Total Row:** Table Design ▸ Total Row; pick Sum, Average or Count from the drop-down in each column (it uses SUBTOTAL so it respects filters).
- **Slicers:** Table Design ▸ Insert Slicer ▸ tick Region and Category: click buttons to filter; Ctrl + click for several; the clear-filter icon resets.
- Rename headings with simple words (Qty, Unit Price, Net) before making a Table; avoid special characters.

**Subtotals:** sort by Region first ▸ Data ▸ Subtotal ▸ At each change in: Region ▸ Use function: Sum ▸ Add subtotal to: Net. The outline buttons `1 2 3` at the left show or hide detail. Use Remove All to undo. (Subtotal does not work inside an Excel Table: convert to a range first, or use a PivotTable, Lesson 5.3.)

**Worked example (Dataset 1)**

| Task | Result to expect |
| --- | --- |
| Filter Region = Dhaka | 7 of 20 records |
| Filter Net greater than 50,000 | 4 records (INV-1003, 1009, 1010, 1016) |
| Filter Region = Rajshahi and Category = Electronics | 4 records |
| Sort by Region A–Z, then Net Largest to Smallest | Bogura first; Dhaka starts with INV-1003 (62,000); Rajshahi starts with INV-1009 (111,600) |
| `=SUBTOTAL(109,Sales[Net])` with Region = Dhaka filtered | 172,590 |

`SUBTOTAL(109, range)` adds only the **visible** (filtered) cells; `SUBTOTAL(103, range)` counts visible cells. Plain `SUM` also adds the hidden rows, which is a common reporting mistake.

| Task | Shortcut |
| --- | --- |
| Filter on/off | Ctrl + Shift + L |
| Create a Table | Ctrl + T |
| Select visible cells only | Alt + ; |
| Open the filter list | Alt + Down Arrow |
| Select the whole data region | Ctrl + A (or Ctrl + Shift + 8) |
| Sort dialog | Alt + A + S + S |

**Common mistakes:** selecting one column and sorting only that column; sorting data with merged cells or blank rows; summing a filtered list with SUM instead of SUBTOTAL; forgetting "My data has headers" (the header row gets sorted into the data); a typed value of "Dhaka " (extra space) appearing as a separate filter item.

**Try it:** convert Dataset 1 to a Table named `Sales`, add Gross, Discount, Net, VAT and Total columns with structured references, switch on the Total Row, add Region and Category slicers, and sort by Net.

**Playground:** Dataset 1; dashboard demo (filters).

#### Lesson 5.2 — Cleaning data: duplicates, Text to Columns, TRIM, Find & Replace, Go To Special (40 min)

**Learning outcomes**

- Remove duplicates, extra spaces and inconsistent text.
- Convert text numbers and text dates into real numbers and dates.
- Split and combine columns, and find blanks and errors quickly.

**Explanation**

Real business data arrives messy (typed by many people, exported from software). Clean it before any total, lookup or PivotTable; a wrong cell ("Dhaka " with a space, "5O" with a letter O) quietly gives wrong totals.

| Problem | Tool | Example |
| --- | --- | --- |
| Extra spaces, odd capitals | `=TRIM(PROPER(A2))` | `  alam   TRADERS ` becomes `Alam Traders` |
| Non-printing characters | `=CLEAN(A2)` | imported text from a web page |
| Numbers stored as text (green triangle, left-aligned) | Select ▸ warning icon ▸ Convert to Number; or `=VALUE(A2)`; or type 1 in a cell, copy, select the numbers ▸ Paste Special ▸ Multiply | `"5000"` becomes 5000 |
| Dates stored as text | Data ▸ Text to Columns ▸ Next ▸ Next ▸ Date: DMY ▸ Finish; or `=DATEVALUE(A2)` | `15.10.2026` becomes a real date |
| One column holds two facts | Data ▸ Text to Columns ▸ Delimited (comma, space, dash) | `Alam Traders - Rangpur` into Customer and Region |
| Combine columns | `=A2&" - "&B2` or `=TEXTJOIN(" - ",TRUE,A2:B2)` | |
| Repeated text to change | Find & Replace (`Ctrl + H`); `=SUBSTITUTE(A2,"Tk ","")` | remove "Tk " from "Tk 500" |
| Extract part of text | `=LEFT(A2,3)`, `=MID(A2,5,4)`, `=RIGHT(A2,2)` | `INV-1001` → `INV` |
| Repeated rows | Data ▸ Remove Duplicates ▸ choose the columns that identify a duplicate | |
| Blanks or errors to find | `Ctrl + G` ▸ Special ▸ Blanks / Formulas ▸ Errors / Constants | fill blanks with `0` then `Ctrl + Enter` |
| Wrong entries in future | Data Validation (Lesson 3.2) | list of allowed regions |

**Worked example: messy customer list.** Raw cells in column A: `  alam traders`, `ALAM TRADERS `, `Alam  Traders`, `city mart`, `City Mart`. Column B: `=PROPER(TRIM(A2))` gives `Alam Traders` three times and `City Mart` twice. After Copy ▸ Paste Special ▸ Values, **Remove Duplicates** on column B leaves **2** customers. (Without cleaning, Excel would see 5 different customers.)

**Worked example: split and join.** `INV-1001|Dhaka|2026-10-02` with Text to Columns using `|` gives three columns; `=LEFT(A2,3)` returns `INV`; `=VALUE(RIGHT(A2,4))` returns 1001 as a number.

**Safe cleaning workflow**

1. Make a copy of the sheet (right-click tab ▸ Move or Copy ▸ Create a copy) or keep the raw data on its own sheet.
2. Clean with formulas in helper columns; check results; Paste Special ▸ Values; delete helper columns.
3. Remove Duplicates only after trimming and fixing case.
4. Add data validation so the problem does not return.

| Task | Shortcut |
| --- | --- |
| Find / Replace | Ctrl + F / Ctrl + H |
| Go To Special | Ctrl + G, then Alt + S |
| Paste Special | Ctrl + Alt + V |
| Flash Fill | Ctrl + E |
| Fill selected blank cells with the typed value | Ctrl + Enter |

**Common mistakes:** removing duplicates on one column when a repeated customer is valid (choose all identifying columns); overwriting the raw data; replacing "1" everywhere and changing other numbers (use Match entire cell contents); leaving helper formulas that depend on deleted raw data.

**Try it:** clean the "messy customers" list above, convert the text amounts to numbers, split `Alam Traders - Rangpur` into two columns, and remove duplicates; report how many unique customers remain.

**Playground:** error spotter and drills on text functions.

#### Lesson 5.3 — PivotTables and PivotCharts (60 min)

**Learning outcomes**

- Create a PivotTable from a Table and arrange fields in Rows, Columns, Values and Filters.
- Change the calculation (sum, count, average, % of total) and group dates.
- Add slicers and a PivotChart and refresh after the data changes.

**Explanation**

A **PivotTable** summarises thousands of rows in seconds without formulas: drag fields to build a report, rearrange it in one click, and refresh it when the data changes.

**Create**

1. Click inside the `Sales` Table ▸ Insert ▸ PivotTable ▸ New Worksheet.
2. In the **PivotTable Fields** pane drag: **Region** to Rows, **Net** to Values. The default is Sum of Net.
3. Add **Category** to Columns for a cross-table; add **Customer** to Filters to see one customer.
4. Value Field Settings (right-click a value ▸ Value Field Settings): Sum, Count, Average, Max, Min; Show Values As ▸ % of Grand Total, % of Column Total, Difference From.
5. Design tab ▸ Report Layout, Subtotals, Grand Totals; PivotTable Analyze ▸ Refresh (`Alt + F5`) or Refresh All (`Ctrl + Alt + F5`). A PivotTable does **not** update automatically when the source changes: refresh it.
6. **Group dates:** right-click a date in Rows ▸ Group ▸ Months (and Years); this gives a monthly report.
7. **Slicer:** PivotTable Analyze ▸ Insert Slicer ▸ Region; **Timeline** for dates. Slicer ▸ Report Connections to control several PivotTables.
8. **PivotChart:** PivotTable Analyze ▸ PivotChart ▸ choose Column, Bar or Pie. It follows the PivotTable and its filters.
9. **Calculated Field:** PivotTable Analyze ▸ Fields, Items & Sets ▸ Calculated Field, for example `Net * 15%` for VAT. Double-click a Grand Total number to see the rows behind it (drill-down).

**Worked example (Dataset 1, Sum of Net)**

| Region | Electronics | Furniture | Stationery | Grand Total | % of Grand Total |
| --- | --- | --- | --- | --- | --- |
| Bogura | | | 62,500.00 | 62,500.00 | 10.8% |
| Dhaka | 85,940.00 | 62,650.00 | 24,000.00 | 172,590.00 | 29.8% |
| Rajshahi | 211,587.50 | 58,500.00 | 8,800.00 | 278,887.50 | 48.1% |
| Rangpur | 11,400.00 | 26,000.00 | 28,200.00 | 65,600.00 | 11.3% |
| **Grand Total** | **308,927.50** | **147,150.00** | **123,500.00** | **579,577.50** | **100.0%** |

Other quick reports to build: Rows = Product, Values = Sum of Net (LED Monitor 247,225; Office Chair 121,550; Printer Paper (ream) 88,800; Keyboard 40,327.50; Whiteboard 25,600; Mouse 21,375; Ballpoint Pen (box) 20,400; Stapler 14,300); Rows = Customer (Delta Office is first with 145,662.50); Values = Count of Inv No for the number of invoices.

**PivotTable or formulas?** Use SUMIFS when you need a fixed report cell inside a formatted layout; use a PivotTable to explore the data quickly. Many reports use both.

| Task | Shortcut |
| --- | --- |
| Refresh / refresh all | Alt + F5 / Ctrl + Alt + F5 |
| Insert PivotTable | Alt + N + V |
| Select the PivotTable | Ctrl + A (inside it) |
| Drill-down | Double-click a value |

**Common mistakes:** blank rows or merged cells in the source; forgetting to refresh after changing data; a Value shown as Count when the column contains text numbers; dragging Net to Rows (it becomes a list of numbers) instead of Values; typing over a PivotTable cell (not allowed: use the fields pane).

**Try it:** build the cross-table above, add % of Grand Total, group a second PivotTable by Months (all invoices are in October), insert a Region slicer, and create a PivotChart (clustered column) of Net by Region.

**Playground:** Dataset 1; dashboard demo; drills 41–44.

#### Lesson 5.4 — Business charts: column, line, pie, combo, sparklines, waterfall (40 min)

**Learning outcomes**

- Choose the right chart for the message and create it quickly.
- Format a chart (title, axis titles, labels, colours) so it is clear on a slide or printout.
- Build a combo chart, sparklines and a waterfall chart.

**Explanation**

1. Select the data including headings (use Ctrl to select non-adjacent columns, e.g. Month and Revenue).
2. Insert ▸ Recommended Charts, or choose Column, Bar, Line, Pie, Scatter.
3. Chart Design: Add Chart Element (Chart Title, Axis Titles, Data Labels, Legend, Gridlines, Trendline), Quick Layout, Change Colors, Chart Styles, Switch Row/Column, Select Data, Change Chart Type, Move Chart (to a new sheet).
4. Format: double-click any part (series, axis, label) to open the Format pane; right-click ▸ Format Data Series.
5. `Alt + F1` makes an instant chart on the sheet; `F11` makes one on a new chart sheet.

| Message | Chart | Example (Dataset 5 or 1) |
| --- | --- | --- |
| Compare items | Column or Bar | Net sales by Region |
| Trend over time | Line | Monthly revenue and cost |
| Parts of a whole (up to 5–6 parts) | Pie or Doughnut (or a 100% stacked bar) | Share of Net by Category |
| Relationship of two numbers | Scatter | Units versus revenue (break-even) |
| Two measures with different units | Combo (columns + line on a secondary axis) | Revenue (৳) and profit margin (%) |
| Contribution to a change | Waterfall (Excel 2016+) | Profit from revenue minus costs |
| Tiny trend inside a cell | Sparklines (Insert ▸ Sparklines ▸ Line / Column) | Monthly pattern per product |
| Distribution | Histogram | Invoice sizes |

**Worked example 1: monthly trend (Dataset 5).** Revenue by month for 2026: highest 680,000 in December, lowest 385,000 in February; annual revenue 6,029,578; annual cost 4,410,000; profit 1,619,578. Select Month, Revenue and Cost ▸ Insert ▸ Line ▸ Line with Markers. Title: "Revenue and cost, 2026 (৳)". Add axis titles and a data label to the last point.

**Worked example 2: combo chart.** Add Profit % = `=(B2-C2)/B2` in column D, select Month, Revenue and Profit % ▸ Insert ▸ Combo ▸ Revenue: Clustered Column, Profit %: Line on **Secondary Axis**. The primary axis shows ৳ and the secondary shows %.

**Worked example 3: share chart.** Pie of Net by Category (Electronics 53.3%, Furniture 25.4%, Stationery 21.3%): add data labels with percentage, remove the legend, label the slices directly, and sort the slices from largest to smallest.

**Worked example 4: waterfall.** Revenue 6,029,578 → minus cost of goods and expenses 4,410,000 → profit 1,619,578. Insert ▸ Waterfall ▸ set Total on the first and last bars.

**Every chart needs:** a title that states the message (for example "December was the best month"), axis titles with units, readable labels, a logical order, two or three colours, and no 3-D effects, heavy gridlines or decoration that distort values. Start a column-chart axis at zero. Keep the data source visible (a note under the chart).

| Task | Shortcut |
| --- | --- |
| Instant chart / chart on new sheet | Alt + F1 / F11 |
| Select non-adjacent columns | Ctrl + click headers |
| Insert chart dialog | Alt + N + R |
| Move between chart elements | Arrow keys when a chart is selected |

**Common mistakes:** a pie chart with too many slices; selecting a column of year numbers so Excel plots it as a data series (set it as the axis labels instead); a truncated axis that exaggerates differences; two different unit scales on one axis; forgetting titles and units; colours that are the same in the printout (use patterns or direct labels).

**Try it:** with Dataset 5 build (1) a line chart of revenue and cost, (2) the combo chart with Profit %, (3) a pie chart of Q1–Q4 revenue (1,245,000; 1,485,000; 1,430,000; 1,869,578) and (4) sparklines for each row of a small month-by-product table.

**Playground:** Dataset 5; chart chooser.

#### Lesson 5.5 — ★ What-if analysis: Goal Seek, Data Table, Scenario Manager, Solver (50 min) — Extension

**Learning outcomes**

- Find an input value that produces a target result with Goal Seek.
- Compare many inputs with a one- or two-variable Data Table.
- Save and compare Best / Expected / Worst scenarios; use Solver for a constrained decision.

**Explanation**

What-if analysis changes inputs to see their effect on a result. The model must be built with formulas that depend on input cells (Module 3 and 4 rules).

**Goal Seek** (Data ▸ What-If Analysis ▸ Goal Seek): *Set cell* (a formula cell) *To value* (the target) *By changing cell* (one input).

- Example 1: EMI on a 36-month loan at 12% must be ৳ 15,000. Set the PMT cell to 15,000 by changing the loan amount. Answer: loan amount ≈ **451,612.58** (check with `=PV(12%/12,36,-15000)`).
- Example 2: profit cell to 0 by changing units gives the break-even **1,200 units** (Lesson 4.6).

**Data Table** (Data ▸ What-If Analysis ▸ Data Table): shows a result for many input values at once.

- One-variable: loan instalment for different interest rates (loan 500,000, 36 months): 8% → 15,668.18; 10% → 16,133.59; 12% → 16,607.15; 14% → 17,088.81.
- Two-variable: instalment for rates (10%, 12%, 14%) and loan years (2, 3, 5):

| Rate \ Years | 2 | 3 | 5 |
| --- | --- | --- | --- |
| 10% | 23,072.46 | 16,133.59 | 10,623.52 |
| 12% | 23,536.74 | 16,607.15 | 11,122.22 |
| 14% | 24,006.44 | 17,088.81 | 11,634.13 |

Steps: put the formula in the top-left corner cell of the table, rates down the left and years across the top, select the whole block ▸ Data Table ▸ Row input cell = years input; Column input cell = rate input.

**Scenario Manager** (Data ▸ What-If Analysis ▸ Scenario Manager): store sets of inputs. Model: fixed cost 120,000; variable cost 150 per unit; profit = (price − 150) × units − 120,000.

| Scenario | Price | Units | Profit |
| --- | --- | --- | --- |
| Worst | 230 | 1,100 | −32,000 |
| Expected | 250 | 1,500 | 30,000 |
| Best | 270 | 1,900 | 108,000 |

Use Summary to create a comparison sheet.

**Solver** (File ▸ Options ▸ Add-ins ▸ Manage Excel Add-ins ▸ Go ▸ tick Solver Add-in; then Data ▸ Solver): decide how many chairs (C) and tables (T) to make. Profit: chair 800, table 1,200. Labour hours: chair 3, table 5; available 200 hours. Demand limits: chairs at most 50, tables at most 30. Objective: maximise `=800*C+1200*T` by changing C and T, subject to `3*C+5*T<=200`, `C<=50`, `T<=30`, integer. Answer: **50 chairs and 10 tables, profit 52,000** (making 30 tables and 16 chairs earns less: 36,000 + 12,800 = 48,800).

| Task | Shortcut |
| --- | --- |
| Open Goal Seek | Alt + A + W + G |
| Recalculate | F9 |
| Absolute reference | F4 |

**Common mistakes:** Goal Seek on a cell that is not a formula; an input cell that is typed directly into a formula instead of a cell; Data Table input cells on a different sheet (they must be on the same sheet as the table); forgetting to add Solver and to set integer and non-negative constraints.

**Try it:** build the loan model, use Goal Seek for a 15,000 instalment, build the two-variable Data Table, and create the three scenarios above.

**Playground:** EMI and break-even calculators.

#### Lesson 5.6 — ★ Dynamic-array and modern functions (Excel 2021 / 365): FILTER, SORT, UNIQUE, LET (40 min) — Extension

**Learning outcomes**

- Return a whole list or table with one formula that "spills".
- Combine FILTER, SORT and UNIQUE for quick reports.
- Know which functions work in older versions and how to replace them.

**Explanation**

In Microsoft 365 and Excel 2021, one formula can return many cells; the result **spills** into the cells below and to the right. The spilled range is referred to with `#` (for example `A25#`). A `#SPILL!` error means something is blocking the spill range: clear the cells.

| Function | Example (Dataset 1) | Result |
| --- | --- | --- |
| UNIQUE | `=UNIQUE(F2:F21)` | Rangpur, Dhaka, Rajshahi, Bogura (first appearance) |
| SORT | `=SORT(UNIQUE(F2:F21))` | Bogura, Dhaka, Rajshahi, Rangpur |
| FILTER | `=FILTER(A2:L21,F2:F21="Dhaka")` | the 7 Dhaka rows |
| FILTER with two conditions | `=FILTER(A2:L21,(F2:F21="Dhaka")*(E2:E21="Electronics"),"None")` | 3 rows |
| SORTBY | `=SORTBY(A2:L21,L2:L21,-1)` | all rows, largest Net first |
| XLOOKUP | `=XLOOKUP(D2,'Price List'!A2:A9,'Price List'!C2:C9,"Not found")` | the price |
| SEQUENCE | `=SEQUENCE(12)` | 1 … 12 |
| LET | `=LET(n,L2:L21,SUM(n)/COUNT(n))` | average Net, 28,978.875 |

**Live summary example:** put `=SORT(UNIQUE(F2:F21))` in `A25`; in `B25` write `=SUMIF(F2:F21,A25#,L2:L21)`. The summary lists the regions alphabetically with their totals (Bogura 62,500; Dhaka 172,590; Rajshahi 278,887.50; Rangpur 65,600) and grows automatically when new regions are added.

**Older Excel (2016 / 2019):** use AutoFilter or Advanced Filter instead of FILTER; Remove Duplicates or a PivotTable instead of UNIQUE; Data ▸ Sort instead of SORT; INDEX + MATCH instead of XLOOKUP. Google Sheets also supports FILTER, SORT and UNIQUE.

**Common mistakes:** typing a dynamic-array formula in a cell with data below it (`#SPILL!`); expecting these functions in Excel 2016 / 2019 (the cell shows `#NAME?`); using them in a file shared with people who have older Excel.

**Try it:** create a Dhaka-only list with FILTER, sort the Dhaka list by Net with SORT, and a live region summary as above.

**Playground:** Dataset 1 (365 badge: the playground may implement UNIQUE, SORT and FILTER as a preview).

#### Lesson 5.7 — Building a dashboard (60 min)

**Learning outcomes**

- Plan a one-page dashboard that answers specific business questions.
- Build KPI cards, PivotCharts and slicers that update together.
- Make the dashboard clean, protected and printable.

**Explanation**

A **dashboard** is one worksheet that shows the key numbers and charts of a business at a glance, driven by a Table and PivotTables and controlled by slicers. Plan before you build: *who reads it, which three or four questions must it answer, how often does the data change?*

**Plan for the Rahim Traders October dashboard (Dataset 1)**

| Question | KPI or chart | Expected value |
| --- | --- | --- |
| How much did we sell? | KPI card: Total Net sales | 579,577.50 |
| How many invoices? | KPI card: Count | 20 |
| What is an average invoice? | KPI card: Average Net | 28,978.88 |
| Which region leads? | Column chart of Net by Region (PivotChart) | Rajshahi 278,887.50 (48.1%) |
| Which category earns most? | Doughnut or bar of Net by Category | Electronics 308,927.50 |
| Which product and customer lead? | Top 5 products bar; top customer card | LED Monitor 247,225; Delta Office 145,662.50 |
| Can I focus on one region or category? | Slicers: Region, Category | linked to every chart |

**Build steps**

1. Clean the data and convert it to a Table named `Sales` (Lessons 5.1–5.2).
2. Create a worksheet `Calc` with PivotTables: Net by Region; Net by Category; Net by Product (sorted, top 5). Create a sheet `Dashboard`.
3. KPI cards: type labels in merged-looking boxes (use a border and a large font) and link the value cells to formulas, for example `=SUM(Sales[Net])`, `=COUNTA(Sales[Inv No])`, `=AVERAGE(Sales[Net])`. KPI formulas use the Table, so they respond to new rows but not to slicers; for slicer-aware KPIs use `GETPIVOTDATA` or a PivotTable value.
4. Insert PivotCharts from the `Calc` PivotTables and cut/paste them onto `Dashboard`.
5. Insert slicers (Region, Category) and use Slicer ▸ Report Connections to connect them to **all** PivotTables.
6. Layout: View ▸ untick Gridlines; leave white space; align charts on a grid; same font and 2–3 colours (use green for good, red for bad only); a title that states the period ("Rahim Traders, October 2026").
7. Add a source note ("Source: sales register, October 2026") and a "Last updated" date.
8. Test: click each slicer and check every chart changes; click Clear Filter; refresh all (`Ctrl + Alt + F5`) after editing the data.
9. Protect: unlock the slicers' sheet area only as needed, protect the `Calc` sheet, or hide it (right-click ▸ Hide); set Print Area, Landscape, Fit to 1 page (Lesson 5.8).

| Task | Shortcut |
| --- | --- |
| Hide gridlines | View ▸ Gridlines (untick) |
| Refresh all | Ctrl + Alt + F5 |
| Select several objects | Hold Ctrl and click, or Home ▸ Find & Select ▸ Selection Pane |
| Align objects | Shape Format ▸ Align |

**Common mistakes:** too many charts and colours; charts linked to different PivotTables so slicers only control some; forgetting to refresh; KPI cards that ignore filters without saying so; tiny text that cannot be read when printed or pasted on a slide; ugly default titles ("Sum of Net").

**Try it:** build the October dashboard from Dataset 1 with 3 KPI cards, 2 charts and 2 slicers; then paste the dashboard as a picture into a PowerPoint slide with the title "October: Rajshahi delivered 48% of sales".

**Playground:** dashboard builder demo.

#### Lesson 5.8 — Page setup, printing, protection, sharing and collaboration (40 min)

**Learning outcomes**

- Prepare a worksheet so it prints correctly on A4.
- Protect formulas and input cells, and protect a workbook with a password.
- Share a workbook, use comments and notes, and export to PDF or CSV.

**Explanation**

**Page setup and printing**

- Page Layout ▸ Orientation (Landscape for wide sheets), Size (A4), Margins, **Print Area ▸ Set Print Area**, **Print Titles ▸ Rows to repeat at top** (row 1 so headings appear on every page).
- Page Layout ▸ Scale to Fit ▸ Width: 1 page, Height: Automatic (or File ▸ Print ▸ Fit All Columns on One Page).
- View ▸ Page Break Preview to drag page breaks; View ▸ Page Layout to add header and footer (company name, date, "Page &[Page] of &[Pages]").
- Gridlines: View ▸ Gridlines to show or hide; to print them: Page Layout ▸ Sheet Options ▸ Print.
- File ▸ Print (`Ctrl + P`): preview first; Print Active Sheets / Entire Workbook / Selection.

**Protection (control what others can change)**

1. Decide which cells users may change (inputs: rates, quantities). Select them ▸ `Ctrl + 1` ▸ Protection ▸ untick **Locked**.
2. Review ▸ **Protect Sheet** ▸ choose what users may do (select unlocked cells, sort, use AutoFilter) ▸ password (optional) ▸ OK. Formulas are now locked.
3. To hide formulas: `Ctrl + 1` ▸ Protection ▸ tick **Hidden** before protecting the sheet.
4. Review ▸ **Protect Workbook** protects the structure (no adding or deleting sheets). File ▸ Info ▸ Protect Workbook ▸ Encrypt with Password encrypts the whole file (if you forget the password the file cannot be opened).
5. Allow Edit Ranges (Review) lets chosen people edit chosen ranges.
6. Sheet protection prevents accidents; it is **not strong security**. Never rely on it to hide confidential data.

**Sharing and collaboration**

- File ▸ Share (OneDrive / SharePoint) lets several people edit one workbook at the same time (co-authoring). Version History (File ▸ Info ▸ Version History) restores old versions.
- **Comments** (threaded discussion) and **Notes** (simple sticky notes): Review ▸ New Comment / New Note (`Shift + F2`).
- Check before sharing: File ▸ Info ▸ Check for Issues ▸ Inspect Document (hidden sheets, comments, personal information).
- Export: File ▸ Export ▸ Create PDF/XPS for a fixed copy; Save As ▸ CSV (UTF-8) for data exchange (only the active sheet, no formatting or formulas); keep the `.xlsx` as the master.
- Good habits: a `README` sheet (purpose, author, date, assumptions), consistent file names (`StudentID_Lab13_BusinessPlan_v2.xlsx`), back up to OneDrive or Google Drive.

| Task | Shortcut |
| --- | --- |
| Print / print preview | Ctrl + P |
| New note | Shift + F2 |
| Format Cells ▸ Protection | Ctrl + 1 |
| Save As | F12 |
| Save | Ctrl + S |

**Common mistakes:** protecting a sheet before unlocking the input cells (nobody can type); forgetting the password; printing without Print Titles and Fit to 1 page wide (columns spill to many pages); sharing a workbook that contains hidden sheets with private data.

**Try it:** set up the sales register to print on one A4 landscape page width with repeating headings, protect the sheet so that only Qty, Unit Price and Disc % can be edited, export it to PDF, and compare the result with a CSV export.

**Playground:** none (practise in desktop Excel).

#### Lesson 5.9 — ★ Linking Excel with Word and PowerPoint; Power Query and macros overview (40 min) — Extension

**Learning outcomes**

- Move Excel tables and charts into Word and PowerPoint in the right way.
- Describe what Power Query and macros do and when to use them.
- Record and run a simple macro safely.

**Explanation**

**Excel in Word and PowerPoint**

- Paste options for a table or chart: **Keep Source Formatting**, **Use Destination Styles**, **Link & Keep Source Formatting** (updates when the Excel file changes), **Embed**, and **Picture**. Use Link for reports that update monthly; use Picture for a fixed result.
- Paste Special ▸ Paste Link ▸ Microsoft Excel Worksheet Object: double-click to open the source.
- **Mail merge** (Lesson 1.10): Excel is the data source; each row is one letter, each column a merge field.
- Lesson 2.9 covers charts in presentations.

**Power Query (Data ▸ Get Data)** imports and cleans data from files, folders and the web by recording steps:

1. Data ▸ Get Data ▸ From File ▸ From Text/CSV (or From Workbook) ▸ Transform Data.
2. In the Power Query Editor: remove columns, change data types, filter rows, split columns, trim text, append (stack) or merge (join) tables. Each step is saved on the right.
3. Home ▸ Close & Load. When the source file changes: Data ▸ Refresh All repeats every step.
Use it when you receive the same messy monthly export every month.

**Macros (record and replay)**

1. Developer tab (File ▸ Options ▸ Customize Ribbon ▸ tick Developer) or View ▸ Macros ▸ Record Macro.
2. Name it (no spaces, e.g. `FormatReport`), optionally set a shortcut such as `Ctrl + Shift + R`, store in **This Workbook**.
3. Perform the steps once (apply header format, set number formats, freeze the top row, auto-fit columns) ▸ Stop Recording.
4. Run it: View ▸ Macros ▸ View Macros ▸ Run, or the shortcut. Save the file as **Excel Macro-Enabled Workbook (.xlsm)**.
5. **Security:** a macro is a program. Never enable macros in a file from an unknown source; keep Trust Center ▸ Macro Settings on "Disable all macros with notification"; only enable macros in files you trust.
6. Record with **Relative References** when the steps must work from the selected cell.

**Free alternatives:** Google Sheets (formulas, pivot tables, charts; Apps Script instead of macros), LibreOffice Calc.

| Task | Shortcut |
| --- | --- |
| Paste Special | Ctrl + Alt + V |
| Refresh all (queries and PivotTables) | Ctrl + Alt + F5 |
| Open the macro list | Alt + F8 |
| Visual Basic editor | Alt + F11 |

**Common mistakes:** linking a Word report to an Excel file and then moving or renaming the Excel file (the link breaks); trusting a macro-enabled file from email; recording a macro that depends on absolute cell positions when it should be relative.

**Try it:** paste a chart from the dashboard into Word as a linked picture, change a number in Excel, and update the link in Word (right-click ▸ Update Link); record a macro that formats a header row and run it on a new sheet.

**Playground:** none (desktop Excel).

**Excel module shortcut summary:** `Ctrl + 1` Format Cells · `Alt + =` AutoSum · `F4` absolute reference · `F2` edit cell · `Ctrl + \`` show formulas · `Ctrl + T` Table · `Ctrl + Shift + L` filter · `Ctrl + D` fill down · `Ctrl + E` Flash Fill · `Ctrl + Shift + 5` percent · `Ctrl + Shift + 4` currency · `Ctrl + ;` today's date · `Alt + F1` instant chart · `Alt + F5` refresh PivotTable · `Ctrl + Alt + V` Paste Special · `Ctrl + G` Go To · `Ctrl + P` print.


## Part D — Syllabus page, labs, datasets, assessment, quizzes and reference

### Course objectives and outcomes

**Objectives:** to make business students confident, independent users of a computer and of Microsoft Word, PowerPoint and, above all, Excel, so that they can prepare business documents, present business information and analyse business data for academic and professional work.

| CO | After this course, students will be able to… |
| --- | --- |
| CO1 | Operate a Windows computer, manage files and folders, and use the internet and email responsibly |
| CO2 | Create and format professional business documents in Word (letter, memo, invoice, CV, report with TOC, mail merge) |
| CO3 | Design and deliver an effective business presentation in PowerPoint, including charts from Excel |
| CO4 | Build accurate Excel worksheets that calculate with formulas, functions, lookups, dates and financial functions for business problems (sales, VAT, payroll, loans, ageing, break-even) |
| CO5 | Analyse and report business data in Excel using sorting, filtering, Tables, PivotTables, charts, what-if tools and a dashboard, and prepare the result for printing and sharing |

### 14-week lab plan

Excel takes **Weeks 8–14** (half of the course). Lessons marked ★ are extensions: teach them if time allows; students may study them on their own.

| Week | Topic | Lessons | Lab |
| --- | --- | --- | --- |
| 1 | Course intro, computer basics, Windows, files | 0.1–0.3 | Lab 1 |
| 2 | Typing, Office interface, internet, email | 0.4–0.6 | Lab 2 |
| 3 | Word: editing, formatting, page layout | 1.1–1.5 | Lab 3 |
| 4 | Word: tables, graphics, styles, TOC, mail merge, business documents | 1.6–1.11 | Lab 4 |
| 5 | PowerPoint: interface, text, design, graphics, tables and charts, media | 2.1–2.5 | Lab 5 |
| 6 | PowerPoint: animation, Slide Master, presenting, business presentations; student presentations | 2.6–2.9 | Lab 6 |
| 7 | Lab Mid exam (Word + PowerPoint) | — | Lab Mid |
| 8 | Excel foundations: interface, data entry, formatting | 3.1–3.3 | Lab 7 |
| 9 | Excel foundations: formulas, references, basic functions | 3.4–3.6 | Lab 8 |
| 10 | Excel business calculations: IF, conditional totals, lookups | 4.1–4.3 | Lab 9 |
| 11 | Excel business calculations: dates, finance ★, VAT, break-even, payroll | 4.4–4.6 | Lab 10 |
| 12 | Excel data analysis: sort, filter, Tables, cleaning, PivotTables | 5.1–5.3 | Lab 11 |
| 13 | Excel reporting: charts, what-if ★, modern functions ★, dashboard | 5.4–5.7 | Lab 12 |
| 14 | Printing and protection, linking Office apps ★, integrated project, revision, Lab Final and viva | 5.8–5.9 | Lab 13 / Final |

### Lab rules

- Arrive on time; sign attendance. Bags and food stay outside the lab.
- Save all work in `D:\CSE1204_YourID` and back it up to Google Drive or OneDrive.
- File name format: `StudentID_LabNN_Topic` (e.g. `2xxxxxxx_Lab08_Formulas.xlsx`).
- Do not change computer settings, install software or unplug cables.
- Lab report is due before the next lab class; late submission loses marks.
- Copying files from another student is plagiarism; both files get zero. Working from the same dataset is expected; the formulas, layout and charts must be your own.
- **Excel labs:** every rate (VAT, house rent, PF, interest) goes into its own labelled cell. No typed numbers inside formulas. Check your totals against the **Expected results** box of the lab before you submit.

### Lab sheets (Lab 1–13)

Each lab page on the website shows: objective, time (90 min), lessons needed, tasks as a checklist, files to submit, expected results (Excel labs, hidden until "Show expected results" is pressed) and the rubric.

#### Labs 1–6 (Computer basics, Word and PowerPoint)

| Lab | Title | Tasks (summary) | Submit |
| --- | --- | --- | --- |
| 1 | Know your computer | Identify input/output/storage devices in the lab; record system specs from Settings ▸ About; convert 5 storage values; shut down correctly | Word file with a 2-column table of devices and specs |
| 2 | Files, folders and email | Build the CSE1204 folder tree (Word, PowerPoint, Excel, Labs); create, rename, copy, move, delete and restore files; zip the folder; send a formal email with the zip attached to the teacher | Zip file + sent email |
| 3 | Formatting a business letter | Type a 250-word business letter and a one-paragraph notice; letterhead in the header, block format, subject line in bold, justified body, 1.15 spacing, a numbered list of 3 items, bullet list, Find & Replace one word, page number in the footer | .docx and .pdf |
| 4 | Business documents and mail merge | Memo with aligned tab stops; meeting-minutes table with merged heading and repeated header row; an invoice table with `=PRODUCT(LEFT)` and `=SUM(ABOVE)`; save the letterhead as `.dotx`; mail-merge 5 letters from a 5-row Excel customer list | .docx, .dotx, merged letters .pdf |
| 5 | Building a business presentation | 6-slide deck on a small business idea: title, outline, 3 content slides with picture/SmartArt/icons, a table or chart, conclusion; theme and consistent fonts; slide numbers in footer | .pptx |
| 6 | Pitch deck | 8–10 slide pitch for a business idea (problem, solution, market, business model, competition, financial summary, ask) with a chart, transitions, "by paragraph" animations, Slide Master with logo, speaker notes; present for 5 minutes | .pptx + live presentation |

**Standard lab rubric (10 marks per lab)**

| Criterion | Marks |
| --- | --- |
| All tasks completed | 4 |
| Correct use of required features | 3 |
| Neatness, consistency and layout | 2 |
| Correct file naming and on-time submission | 1 |

#### Lab 7 — First business spreadsheet (Week 8, 90 min)

**Objective:** enter, format and validate a real data set. **Lessons:** 3.1–3.3. **Dataset:** Dataset 1 (Sales Register).

1. Create `2xxxxxxx_Lab07_SalesRegister.xlsx`. Rename Sheet1 `Sales`; add sheets `Price List` and `Summary` with coloured tabs.
2. Type the headings and all 20 rows of Dataset 1 (columns A–I). Use AutoFill for the invoice numbers.
3. Add data validation: Region must be one of Dhaka, Rajshahi, Rangpur, Bogura (list); Qty must be a whole number from 1 to 500; Disc % must be 0–20.
4. Type the Price List (Dataset 1, Price List table) on the `Price List` sheet.
5. Format: header row bold white on dark blue, freeze the top row, dates `dd-mmm-yyyy`, Unit Price `"৳ "#,##0`, Disc % as a number, thin borders, column widths AutoFit, a Data Bar on Qty.
6. Add Gross in column J (`=G2*H2`) and fill down.
7. Highlight rows where Qty is 50 or more (conditional formatting with a formula, `=$G2>=50`).
8. Keep the data table starting in A1 (no title rows above it); put your name, ID and date on the `Summary` sheet.

**Expected results:** the sum of Gross is **610,850**; total Qty **535**; 4 rows have Qty of 50 or more (INV-1005, 1011, 1015, 1017).
**Submit:** the `.xlsx` file and a screenshot of the formatted sheet.

#### Lab 8 — Formulas, references and basic functions (Week 9, 90 min)

**Objective:** build correct formulas with absolute references and basic functions. **Lessons:** 3.4–3.6. **Dataset:** Lab 7 workbook.

1. On `Sales` add: K Discount (৳) `=J2*I2/100`; L Net `=J2-K2`; M VAT `=ROUND(L2*VAT_Rate,2)`; N Total `=L2+M2`.
2. Put the VAT rate (15%) in `Q2` with the label in `P2`, name it `VAT_Rate`.
3. Add a totals row (row 22) with `SUM` for Qty, Gross, Discount, Net, VAT and Total.
4. On `Summary` calculate: invoice count, average Net, highest and lowest Net (with the invoice number using INDEX + MATCH), and the rank of every invoice by Net in column O of `Sales`.
5. Add `Month` with `=TEXT(B2,"mmm-yyyy")`.
6. Conditional formatting: Net greater than 50,000 in light red; top 3 Net with a green fill.
7. Show formulas (`Ctrl + \``) and take a screenshot of two rows.

**Expected results:** Discount **31,272.50**; Net **579,577.50**; VAT **86,936.63**; Total **666,514.13**; average Net **28,978.88**; highest Net **111,600 (INV-1009)**; lowest **5,500 (INV-1006)**; 4 red cells (INV-1003, 1009, 1010, 1016).
**Submit:** `.xlsx` and the formulas screenshot.

#### Lab 9 — Logical and lookup functions (Week 10, 90 min)

**Objective:** automate decisions and fetch prices and rates. **Lessons:** 4.1–4.3. **Datasets:** Dataset 1 + Price List, Dataset 3.

1. In the Lab 8 workbook, delete the typed Unit Price and replace column H with `=VLOOKUP(D2,'Price List'!$A$2:$C$9,3,FALSE)` wrapped in IFERROR ("Not in price list"). Check that the totals do not change.
2. Add Category with a lookup too (column 2 of the Price List).
3. Add column O `Order Size` with the nested IF (Large ≥ 50,000; Medium ≥ 20,000; Small otherwise); repeat the rule with IFS in column P.
4. Add column Q `Priority` = "Priority" when Region is Dhaka AND Net ≥ 20,000.
5. On a new sheet `Commission` build Dataset 3: slab table and 6 salespeople; compute Rate (approximate VLOOKUP), Commission, "Target met / Below target" (target 100,000 in a cell) and a 2% bonus for those who met the target.
6. On `Summary` build the Region table (4 regions) and the Category table with SUMIF; add COUNTIF for invoice counts; add `SUMIFS` for Dhaka electronics.

**Expected results:** Order Size: 4 Large, 4 Medium, 12 Small; Priority 3 rows; Region net: Bogura 62,500; Dhaka 172,590; Rajshahi 278,887.50; Rangpur 65,600 (sum 579,577.50); Dhaka electronics 85,940; Commission: Rahim 0, Karim 1,000, Salma 4,620, Nasrin 13,750, Tanvir 35,700, Mitu 1,999.98; Target met 3.
**Submit:** `.xlsx`.

#### Lab 10 — Dates, finance and payroll (Week 11, 90 min)

**Objective:** use dates, financial functions and a payroll model. **Lessons:** 4.4–4.6. **Datasets:** Dataset 4, Dataset 2.

1. **Ageing (sheet `Ageing`):** type Dataset 4; Due date `=C2+D2`; Days overdue `=$H$1-F2` (report date 31-Oct-2026 in `H1`); Ageing bucket by nested IF; a summary by bucket with SUMIF; late interest at 1.5% per started month for overdue invoices.
2. **Payroll (sheet `Payroll`):** type Dataset 2; inputs for House rent 50%, Medical 1,500, Conveyance 1,000 and PF 10%; compute House Rent, Gross, PF, Net; totals; department summary by SUMIF; the highest net pay with the employee name.
3. **Loan (sheet `Loan`):** inputs 500,000; 12%; 3 years; instalment with `=-PMT(…)`; a 36-row amortisation table with Interest, Principal and Balance (the last balance should be 0.00); total interest.
4. **Break-even (sheet `BreakEven`):** inputs fixed cost 120,000, price 250, variable cost 150; compute contribution, break-even units and sales, and the units for a profit of 40,000. Add a table of units 0–2,400 in steps of 200 with revenue, total cost and profit.

**Expected results:** days overdue 57, 21, 21, 58, −4, 108; buckets Not due 98,000; 1–30 days 109,500; 31–60 days 116,000; Over 60 days 24,500; total 348,000; interest on A-106 **1,470**. Payroll totals: Basic 294,000; Gross 461,000; PF 29,400; Net 431,600; highest net 72,500 (Tanvir Ahmed). Loan instalment **16,607.15**; total interest ≈ **97,857.58**; month-1 interest 5,000.00. Break-even **1,200 units, 300,000 sales; 1,600 units for a profit of 40,000.**
**Submit:** `.xlsx`.

#### Lab 11 — Data cleaning, Tables and PivotTables (Week 12, 90 min)

**Objective:** clean, summarise and filter business data. **Lessons:** 5.1–5.3. **Dataset:** Dataset 1 (as a Table), messy customer list.

1. Convert `Sales` to a Table named `Sales`; use structured references for Gross, Net and Total; switch on the Total Row.
2. Sort by Region A–Z then Net largest to smallest; take a screenshot. Filter Region = Rajshahi and Category = Electronics (expect 4 records); clear the filters.
3. Add slicers for Region and Category.
4. Clean the messy customer list from Lesson 5.2 (TRIM, PROPER, Remove Duplicates, text amounts to numbers).
5. Create a PivotTable on a new sheet: Rows = Region, Columns = Category, Values = Sum of Net; add Grand Totals and "% of Grand Total"; add a PivotTable of Net by Product (sorted largest first) and a PivotTable of Net by Customer.
6. Insert a PivotChart (clustered column) of Net by Region and connect the slicers to both PivotTables.
7. Check one PivotTable value against a `SUMIFS` formula.

**Expected results:** the cross-table matches the one in Lesson 5.3 (Grand Total **579,577.50**; Electronics 308,927.50; Furniture 147,150; Stationery 123,500; Region shares 10.8%, 29.8%, 48.1%, 11.3% for Bogura, Dhaka, Rajshahi, Rangpur); top product LED Monitor 247,225; top customer Delta Office 145,662.50; cleaned customer list has **2** unique customers.
**Submit:** `.xlsx`.

#### Lab 12 — Charts, what-if analysis and a dashboard (Week 13, 90 min)

**Objective:** present the data visually and answer what-if questions. **Lessons:** 5.4–5.7. **Datasets:** Dataset 5, Dataset 1, Loan sheet.

1. Type Dataset 5 (12 months). Create a line chart of revenue and cost, a combo chart of revenue with Profit % on a secondary axis, a pie chart of quarterly revenue, and sparklines. Every chart has a title that states the message, axis titles with units, and readable labels.
2. Goal Seek: find the loan amount that gives an instalment of 15,000 at 12% for 36 months. Build a two-variable Data Table of instalments (rates 10%, 12%, 14% × years 2, 3, 5).
3. Scenario Manager: Worst, Expected and Best scenarios for the break-even model; produce the summary sheet.
4. Dashboard (`Dashboard` sheet) for Dataset 1: three KPI cards (Total Net, invoice count, average invoice), PivotCharts for Region and Category, a Top-5 products chart, two slicers connected to all charts, no gridlines, a title and a source note.
5. Set the print area of the dashboard to one A4 landscape page.

**Expected results:** annual revenue **6,029,578**; cost **4,410,000**; profit **1,619,578**; best month December (680,000), lowest February (385,000); quarterly revenue 1,245,000 / 1,485,000 / 1,430,000 / 1,869,578; Goal Seek loan ≈ **451,612.58**; Data Table matches Lesson 5.5; scenario profits −32,000, 30,000, 108,000; KPI cards 579,577.50 / 20 / 28,978.88.
**Submit:** `.xlsx` and a PDF of the dashboard.

#### Lab 13 — Integrated business project (Week 14, 90 min, finishing in the Lab Final week)

**Objective:** produce one complete business pack that uses Excel, Word and PowerPoint together. **Scenario:** you are the assistant manager of **Rahim Traders**, Saidpur. The owner asks for the October business pack and a loan proposal for new equipment.

1. **Excel (`Rahim_Traders_October.xlsx`):** sheets `Sales` (Table), `Price List`, `Payroll`, `Ageing`, `Loan`, `Summary` (SUMIFS by region and category), `Dashboard`. All rates in input cells; print setup done; input cells unlocked and the other cells protected on `Summary` and `Dashboard`.
2. **Word (`Rahim_Traders_Report.docx`, 2 pages):** a business letter to the owner (letterhead from Lab 4) with a short summary of results, the Region summary table and a linked chart from the dashboard; saved as PDF too.
3. **PowerPoint (`Rahim_Traders_Summary.pptx`, 5 slides):** title; key numbers (KPI boxes); Region chart (pasted from Excel); receivables ageing table with the message "Over 60 days: ৳ 24,500"; recommendation and loan request (instalment 16,607.15 a month for 36 months).
4. Check that the numbers in all three files agree (Net 579,577.50; Total receivable 348,000).

**Rubric (20 marks, counted as part of the Lab performance marks):** Excel accuracy and use of functions 8; Word report 4; PowerPoint 4; consistency of numbers and layout 2; file naming and submission 2.
**Submit:** the three files and the PDF.

### Datasets (CSV and worksheet data for the website)

All five datasets are fictional. Show each one on the Datasets page with a preview, a column dictionary and "Download CSV". Dates are ISO (`YYYY-MM-DD`) in the CSV and formatted `dd-mmm-yyyy` in the worksheet view.

#### Dataset 1 — Rahim Traders sales register, October 2026 (20 rows)

**Columns:** `A Inv No` · `B Date` · `C Customer` · `D Product` · `E Category` · `F Region` · `G Qty` · `H Unit Price (৳)` · `I Disc %` · then formulas created by students: `J Gross = G*H` · `K Discount = J*I/100` · `L Net = J-K` · `M VAT = ROUND(L*VAT_Rate,2)` · `N Total = L+M`.

| Inv No | Date | Customer | Product | Category | Region | Qty | Unit Price | Disc % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| INV-1001 | 2026-10-01 | Alam Traders | Printer Paper (ream) | Stationery | Rangpur | 40 | 480 | 0 |
| INV-1002 | 2026-10-02 | Barnali Store | Office Chair | Furniture | Dhaka | 6 | 6,500 | 5 |
| INV-1003 | 2026-10-03 | City Mart | LED Monitor | Electronics | Dhaka | 4 | 15,500 | 0 |
| INV-1004 | 2026-10-04 | Delta Office | Keyboard | Electronics | Rajshahi | 15 | 950 | 5 |
| INV-1005 | 2026-10-06 | Alam Traders | Ballpoint Pen (box) | Stationery | Rangpur | 60 | 150 | 0 |
| INV-1006 | 2026-10-07 | Eden Books | Stapler | Stationery | Bogura | 25 | 220 | 0 |
| INV-1007 | 2026-10-08 | City Mart | Mouse | Electronics | Dhaka | 20 | 450 | 5 |
| INV-1008 | 2026-10-09 | Barnali Store | Whiteboard | Furniture | Dhaka | 3 | 3,200 | 0 |
| INV-1009 | 2026-10-11 | Fahim Enterprise | LED Monitor | Electronics | Rajshahi | 8 | 15,500 | 10 |
| INV-1010 | 2026-10-12 | Delta Office | Office Chair | Furniture | Rajshahi | 10 | 6,500 | 10 |
| INV-1011 | 2026-10-14 | Eden Books | Printer Paper (ream) | Stationery | Bogura | 100 | 480 | 5 |
| INV-1012 | 2026-10-15 | Alam Traders | Keyboard | Electronics | Rangpur | 12 | 950 | 0 |
| INV-1013 | 2026-10-16 | Fahim Enterprise | Mouse | Electronics | Rajshahi | 30 | 450 | 5 |
| INV-1014 | 2026-10-18 | City Mart | Whiteboard | Furniture | Dhaka | 5 | 3,200 | 0 |
| INV-1015 | 2026-10-20 | Barnali Store | Printer Paper (ream) | Stationery | Dhaka | 50 | 480 | 0 |
| INV-1016 | 2026-10-21 | Delta Office | LED Monitor | Electronics | Rajshahi | 5 | 15,500 | 5 |
| INV-1017 | 2026-10-23 | Eden Books | Ballpoint Pen (box) | Stationery | Bogura | 80 | 150 | 5 |
| INV-1018 | 2026-10-25 | Alam Traders | Office Chair | Furniture | Rangpur | 4 | 6,500 | 0 |
| INV-1019 | 2026-10-27 | Fahim Enterprise | Stapler | Stationery | Rajshahi | 40 | 220 | 0 |
| INV-1020 | 2026-10-29 | City Mart | Keyboard | Electronics | Dhaka | 18 | 950 | 10 |

**Price List sheet (Dataset 1):**

| Product | Category | Unit Price (৳) |
| --- | --- | --- |
| Printer Paper (ream) | Stationery | 480 |
| Ballpoint Pen (box) | Stationery | 150 |
| Stapler | Stationery | 220 |
| Office Chair | Furniture | 6,500 |
| Whiteboard | Furniture | 3,200 |
| LED Monitor | Electronics | 15,500 |
| Keyboard | Electronics | 950 |
| Mouse | Electronics | 450 |

**Answer key for Dataset 1** (VAT rate 15% in an input cell; VAT rounded to 2 decimals per invoice)

| Measure | Value |
| --- | --- |
| Total Gross | 610,850 |
| Total Discount | 31,272.50 |
| Total Net | 579,577.50 |
| Total VAT | 86,936.63 |
| Invoice total | 666,514.13 |
| Number of invoices / total Qty | 20 / 535 |
| Average Net | 28,978.875 (28,978.88 rounded) |
| Highest / lowest Net | 111,600 (INV-1009) / 5,500 (INV-1006) |
| Net by Region | Rangpur 65,600 · Dhaka 172,590 · Rajshahi 278,887.50 · Bogura 62,500 |
| Net by Category | Stationery 123,500 · Furniture 147,150 · Electronics 308,927.50 |
| Net by Product | LED Monitor 247,225 · Office Chair 121,550 · Printer Paper (ream) 88,800 · Keyboard 40,327.50 · Whiteboard 25,600 · Mouse 21,375 · Ballpoint Pen (box) 20,400 · Stapler 14,300 |
| Net by Customer | Delta Office 145,662.50 · Fahim Enterprise 133,225 · City Mart 101,940 · Barnali Store 70,650 · Alam Traders 65,600 · Eden Books 62,500 |
| Invoices with Net above 50,000 | 4 (INV-1003, 1009, 1010, 1016) |
| Dhaka invoices / Dhaka electronics invoices / their Net | 7 / 3 / 85,940 |
| Net per invoice (INV-1001 to INV-1020) | 19,200 · 37,050 · 62,000 · 13,537.50 · 9,000 · 5,500 · 8,550 · 9,600 · 111,600 · 58,500 · 45,600 · 11,400 · 12,825 · 16,000 · 24,000 · 73,625 · 11,400 · 26,000 · 8,800 · 15,390 |

#### Dataset 2 — Payroll of Rahim Traders, November 2026 (8 employees)

**Columns:** `A ID` · `B Name` · `C Department` · `D Basic (৳)`, then formulas: `E House Rent = D*50%` · `F Medical = 1,500` · `G Conveyance = 1,000` · `H Gross = D+E+F+G` · `I PF = D*10%` · `J Net Pay = H-I`. The four rates are teaching inputs in cells `M2:M5`.

| ID | Name | Department | Basic (৳) |
| --- | --- | --- | --- |
| E01 | Rahim Uddin | Sales | 30,000 |
| E02 | Salma Akter | Accounts | 42,000 |
| E03 | Karim Hossain | Sales | 28,000 |
| E04 | Nasrin Jahan | HR | 35,000 |
| E05 | Tanvir Ahmed | IT | 50,000 |
| E06 | Mitu Rani | Accounts | 33,000 |
| E07 | Faruk Ali | IT | 45,000 |
| E08 | Lima Khatun | HR | 31,000 |

**Answer key:** Gross: 47,500 · 65,500 · 44,500 · 55,000 · 77,500 · 52,000 · 70,000 · 49,000. Net pay: 44,500 · 61,300 · 41,700 · 51,500 · 72,500 · 48,700 · 65,500 · 45,900. **Totals:** Basic 294,000 · Gross 461,000 · PF 29,400 · Net 431,600. Net pay by department: Sales 86,200 · Accounts 110,000 · HR 97,400 · IT 138,000.

#### Dataset 3 — Salesperson targets and commission slabs

**Salesperson table** (target 100,000 in a cell):

| Salesperson | Monthly sales (৳) |
| --- | --- |
| Rahim | 45,000 |
| Karim | 50,000 |
| Salma | 132,000 |
| Nasrin | 275,000 |
| Tanvir | 510,000 |
| Mitu | 99,999 |

**Commission slab table** (sorted ascending, for approximate-match lookup):

| Sales from (৳) | Commission rate |
| --- | --- |
| 0 | 0% |
| 50,000 | 2% |
| 100,000 | 3.5% |
| 200,000 | 5% |
| 500,000 | 7% |

**Answer key:** Rate 0% · 2% · 3.5% · 5% · 7% · 2%. Commission 0 · 1,000 · 4,620 · 13,750 · 35,700 · 1,999.98 (total 57,069.98). Target met: Salma, Nasrin, Tanvir (3). Bonus at 2% of sales for those who met the target: 2,640 · 5,500 · 10,200. Total sales 1,111,999.

#### Dataset 4 — Receivables (invoice ageing), report date 31-Oct-2026

**Columns:** `A Invoice` · `B Customer` · `C Invoice date` · `D Credit days` · `E Amount (৳)`, then formulas `F Due date = C+D` · `G Days overdue = $H$1-F` · `H Ageing bucket`; the report date is typed in `H1`.

| Invoice | Customer | Invoice date | Credit days | Amount (৳) |
| --- | --- | --- | --- | --- |
| A-101 | Alam Traders | 05-Aug-2026 | 30 | 85,000 |
| A-102 | City Mart | 10-Sep-2026 | 30 | 42,000 |
| A-103 | Delta Office | 25-Sep-2026 | 15 | 67,500 |
| A-104 | Eden Books | 20-Jul-2026 | 45 | 31,000 |
| A-105 | Fahim Enterprise | 05-Oct-2026 | 30 | 98,000 |
| A-106 | Barnali Store | 15-Jun-2026 | 30 | 24,500 |

**Answer key:** Due dates 04-Sep-2026 · 10-Oct-2026 · 10-Oct-2026 · 03-Sep-2026 · 04-Nov-2026 · 15-Jul-2026. Days overdue 57 · 21 · 21 · 58 · −4 · 108. Buckets: 31-60 · 1-30 · 1-30 · 31-60 · Not due · Over 60. Totals: Not due 98,000 · 1–30 days 109,500 · 31–60 days 116,000 · Over 60 days 24,500 · **348,000**. Late interest (1.5% per started month): A-101 2 months 2,550 · A-102 1 month 630 · A-103 1 month 1,012.50 · A-104 2 months 930 · A-105 0 · A-106 4 months 1,470.

#### Dataset 5 — Rahim Traders monthly revenue and cost, 2026

| Month | Revenue (৳) | Cost (৳) |
| --- | --- | --- |
| Jan | 410,000 | 300,000 |
| Feb | 385,000 | 285,000 |
| Mar | 450,000 | 330,000 |
| Apr | 470,000 | 345,000 |
| May | 520,000 | 380,000 |
| Jun | 495,000 | 365,000 |
| Jul | 430,000 | 320,000 |
| Aug | 460,000 | 340,000 |
| Sep | 540,000 | 395,000 |
| Oct | 579,578 | 420,000 |
| Nov | 610,000 | 440,000 |
| Dec | 680,000 | 490,000 |

**Answer key:** Annual revenue 6,029,578 · annual cost 4,410,000 · profit 1,619,578 · profit margin 26.9% · highest month Dec (680,000) · lowest Feb (385,000) · average monthly revenue 502,464.83 · quarterly revenue Q1 1,245,000, Q2 1,485,000, Q3 1,430,000, Q4 1,869,578 · monthly profit Jan 110,000, Feb 100,000, Mar 120,000, Apr 125,000, May 140,000, Jun 130,000, Jul 110,000, Aug 120,000, Sep 145,000, Oct 159,578, Nov 170,000, Dec 190,000 (October revenue is Dataset 1's Net, rounded).

### Excel Lab: drill bank (for the formula builder, 44 tasks)

Each drill shows a mini-sheet, the task, and accepts any formula that returns the expected result (do not compare formula text). Show the model formula after the student answers.

**Warm-ups:** **W1 Enter and fill:** type 1, 2 and fill to 10; fill the days Sunday to Saturday; fill INV-1001 … INV-1005. **W2 Choose the right format:** match each value to its number format (15% → Percentage; 05-Oct-2026 → Date; 12500 shown as ৳ 12,500 → Currency/custom; 0.5 shown as 50% → Percentage; `007` kept with zeros → Text).

**Basic functions (mini-sheet: A1:A6 = 12, 8, 15, 20, 5, 10; A7 = "n/a")**

| # | Task | Model formula | Expected |
| --- | --- | --- | --- |
| 1 | Total of A1:A6 | `=SUM(A1:A6)` | 70 |
| 2 | Average of A1:A6 rounded to 1 decimal | `=ROUND(AVERAGE(A1:A6),1)` | 11.7 |
| 3 | Highest value | `=MAX(A1:A6)` | 20 |
| 4 | Lowest value | `=MIN(A1:A6)` | 5 |
| 5 | How many cells in A1:A7 contain numbers? How many are not empty? | `=COUNT(A1:A7)` and `=COUNTA(A1:A7)` | 6 and 7 |
| 6 | Third largest value | `=LARGE(A1:A6,3)` | 12 |
| 7 | Clean `"  rahim UDDIN "` | `=PROPER(TRIM(A1))` | Rahim Uddin |
| 8 | Round 12.341 up to 2 decimals | `=ROUNDUP(12.341,2)` | 12.35 |

**Logical functions**

| # | Task | Model formula | Expected |
| --- | --- | --- | --- |
| 9 | Marks 38: Pass if 40 or more | `=IF(B2>=40,"Pass","Fail")` | Fail |
| 10 | Score 72: A if 80+, B if 60+, otherwise C | `=IF(B2>=80,"A",IF(B2>=60,"B","C"))` | B |
| 11 | Qty 120: discount 10% if 100+, 5% if 50+, else 0 | `=IFS(A1>=100,10%,A1>=50,5%,TRUE,0)` | 10% |
| 12 | Sales 150,000 and customers 12: "Gold" if sales ≥ 100,000 AND customers ≥ 10 | `=IF(AND(A1>=100000,B1>=10),"Gold","Standard")` | Gold |
| 13 | Region "Bogura": "Priority" if Dhaka OR Rajshahi, else "Normal" | `=IF(OR(A1="Dhaka",A1="Rajshahi"),"Priority","Normal")` | Normal |
| 14 | Show "Check qty" instead of an error for 100/0 | `=IFERROR(100/0,"Check qty")` | Check qty |

**Conditional totals (mini-sheet: A1:A5 = Dhaka, Rajshahi, Dhaka, Rangpur, Dhaka; B1:B5 = 100, 200, 150, 50, 80)**

| # | Task | Model formula | Expected |
| --- | --- | --- | --- |
| 15 | Total sales of Dhaka | `=SUMIF(A1:A5,"Dhaka",B1:B5)` | 330 |
| 16 | Number of Dhaka rows | `=COUNTIF(A1:A5,"Dhaka")` | 3 |
| 17 | Average of Dhaka | `=AVERAGEIF(A1:A5,"Dhaka",B1:B5)` | 110 |
| 18 | Sales of 100 or more (count) | `=COUNTIF(B1:B5,">=100")` | 3 |
| 19 | Dhaka sales of 100 or more (total) | `=SUMIFS(B1:B5,A1:A5,"Dhaka",B1:B5,">=100")` | 250 |
| 20 | Largest Dhaka sale | `=MAXIFS(B1:B5,A1:A5,"Dhaka")` | 150 |

**Lookup (price table A1:C3: P101 Pen 10; P102 Notebook 45; P103 Bag 650; slab table E1:F3: 0 → 0%, 1000 → 5%, 5000 → 8%)**

| # | Task | Model formula | Expected |
| --- | --- | --- | --- |
| 21 | Price of P102 | `=VLOOKUP("P102",A1:C3,3,FALSE)` | 45 |
| 22 | Price of P104 (not in the table) | `=VLOOKUP("P104",A1:C3,3,FALSE)` | #N/A |
| 23 | Same, but show "Not found" | `=IFERROR(VLOOKUP("P104",A1:C3,3,FALSE),"Not found")` | Not found |
| 24 | Price of P103 with INDEX + MATCH | `=INDEX(C1:C3,MATCH("P103",A1:A3,0))` | 650 |
| 25 | Rate for an amount of 3,200 | `=VLOOKUP(3200,E1:F3,2,TRUE)` | 5% |
| 26 | Price of "Notebook" with XLOOKUP (365 / 2021) | `=XLOOKUP("Notebook",B1:B3,C1:C3)` | 45 |

**Dates**

| # | Task | Model formula | Expected |
| --- | --- | --- | --- |
| 27 | 30 days after 31-Oct-2026 | `=DATE(2026,10,31)+30` | 30-Nov-2026 |
| 28 | Days from 01-Oct-2026 to 31-Oct-2026 | `=DATE(2026,10,31)-DATE(2026,10,1)` | 30 |
| 29 | Last day of the month of 10-Feb-2026 | `=EOMONTH(DATE(2026,2,10),0)` | 28-Feb-2026 |
| 30 | Working days Monday 5 Oct to Friday 9 Oct 2026 | `=NETWORKDAYS(DATE(2026,10,5),DATE(2026,10,9))` | 5 |

**Financial**

| # | Task | Model formula | Expected |
| --- | --- | --- | --- |
| 31 | Monthly instalment: 100,000, 12 months, 12% a year | `=-PMT(12%/12,12,100000)` | 8,884.88 |
| 32 | Value after 3 years of 1,000 at 10% a year (one lump sum) | `=-FV(10%,3,0,1000)` | 1,331.00 |
| 33 | Present value of 1,331 received in 3 years at 10% | `=-PV(10%,3,0,1331)` | 1,000.00 |
| 34 | Straight-line depreciation: cost 10,000, salvage 1,000, 3 years | `=SLN(10000,1000,3)` | 3,000 |

**Business mathematics**

| # | Task | Model formula | Expected |
| --- | --- | --- | --- |
| 35 | Price excluding VAT from 2,300 including 15% | `=2300/(1+15%)` | 2,000 |
| 36 | Markup: cost 80, price 100 | `=(100-80)/80` | 25% |
| 37 | Margin: cost 80, price 100 | `=(100-80)/100` | 20% |
| 38 | Percentage change from 50 to 65 | `=(65-50)/50` | 30% |
| 39 | Break-even units: fixed cost 60,000, price 200, variable cost 120 | `=60000/(200-120)` | 750 |
| 40 | Net pay: basic 20,000, house rent 50% of basic, medical 1,500, PF 10% of basic | `=20000+20000*50%+1500-20000*10%` | 29,500 |

**Tables and PivotTables (multiple choice)**

| # | Question | Answer |
| --- | --- | --- |
| 41 | Which field goes to **Values** to show total sales by region? | Net (Sum), with Region in Rows |
| 42 | You changed the source data. What must you do? | Refresh the PivotTable (`Alt + F5`) |
| 43 | Which shortcut turns a range into an Excel Table? | `Ctrl + T` |
| 44 | Which function adds only the visible rows of a filtered list? | `SUBTOTAL(109, range)` |

### Excel Lab: error spotter (12 broken formulas)

| # | Broken formula or situation | Symptom | Cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | `=B2/C2` with C2 empty | `#DIV/0!` | Dividing by an empty cell | `=IFERROR(B2/C2,0)` after checking the data |
| 2 | `=B2+C2` where C2 is `"50 pcs"` | `#VALUE!` | Text in a calculation | Keep the number only; put the unit in the heading |
| 3 | `=SUMM(B2:B9)` | `#NAME?` | Misspelled function | `=SUM(B2:B9)` |
| 4 | A formula that points to a deleted column | `#REF!` | Deleted referenced cells | Rebuild the reference |
| 5 | `=VLOOKUP("P104",A1:C3,3,FALSE)` | `#N/A` | Value not in the table | Check the code or wrap with IFERROR |
| 6 | `=SUM(B2:B9)` in cell B9 | Circular reference warning | The formula includes its own cell | `=SUM(B2:B8)` |
| 7 | Numbers left-aligned with a green triangle | SUM gives 0 | Numbers stored as text | Convert to Number |
| 8 | `=B2*C2` copied down but the rate cell moves (`=B3*C3`) | Wrong results below row 2 | Missing `$` | `=B2*$C$1` |
| 9 | `=SUM(B2:B8)` but data goes to row 9 | Total too low | Range too short | `=SUM(B2:B9)` or use a Table |
| 10 | `=IF(B2>=40,"Pass","Fail"` | Formula will not enter | Missing closing bracket | Add `)` |
| 11 | `=VLOOKUP(B2,A1:C9,3)` with an unsorted first column | Wrong price returned | Approximate match used by default | Add `,FALSE` |
| 12 | `=PMT(12%,36,500000)` for a monthly loan | Instalment is far too large and negative | Annual rate with monthly periods and no sign | `=-PMT(12%/12,36,500000)` |

### Function reference (for the Function finder page)

**Version:** All = every Excel version in use; 2019+ = Excel 2019, 2021 and Microsoft 365; 365/2021 = Excel 2021 and Microsoft 365 only.

| Function | Category | Syntax | What it does | Version |
| --- | --- | --- | --- | --- |
| SUM | Math | `SUM(number1,[number2],…)` | Adds numbers | All |
| AVERAGE | Statistical | `AVERAGE(number1,…)` | Mean | All |
| MIN / MAX | Statistical | `MAX(number1,…)` | Smallest / largest | All |
| MEDIAN | Statistical | `MEDIAN(number1,…)` | Middle value | All |
| LARGE / SMALL | Statistical | `LARGE(array,k)` | k-th largest / smallest | All |
| COUNT | Statistical | `COUNT(value1,…)` | Counts numbers | All |
| COUNTA | Statistical | `COUNTA(value1,…)` | Counts non-empty cells | All |
| COUNTBLANK | Statistical | `COUNTBLANK(range)` | Counts empty cells | All |
| RANK.EQ | Statistical | `RANK.EQ(number,ref,[order])` | Rank in a list | All |
| ROUND / ROUNDUP / ROUNDDOWN | Math | `ROUND(number,digits)` | Rounds | All |
| INT / MOD | Math | `MOD(number,divisor)` | Whole part / remainder | All |
| ABS / SQRT / POWER | Math | `POWER(number,power)` | Absolute value, root, power | All |
| PRODUCT | Math | `PRODUCT(number1,…)` | Multiplies | All |
| SUMPRODUCT | Math | `SUMPRODUCT(array1,[array2],…)` | Multiplies and adds | All |
| SUBTOTAL | Math | `SUBTOTAL(function_num,ref1,…)` | Total that respects filters (109 = sum, 103 = count) | All |
| IF | Logical | `IF(test,if_true,if_false)` | Decision | All |
| IFS | Logical | `IFS(test1,value1,test2,value2,…)` | Several decisions | 2019+ |
| AND / OR / NOT | Logical | `AND(logical1,…)` | Combine conditions | All |
| IFERROR | Logical | `IFERROR(value,if_error)` | Replace an error | All |
| ISBLANK / ISNUMBER / ISTEXT | Information | `ISNUMBER(value)` | Check a cell | All |
| COUNTIF / COUNTIFS | Statistical | `COUNTIFS(range1,crit1,…)` | Count with conditions | All |
| SUMIF / SUMIFS | Math | `SUMIFS(sum_range,range1,crit1,…)` | Add with conditions | All |
| AVERAGEIF / AVERAGEIFS | Statistical | `AVERAGEIF(range,crit,[avg_range])` | Average with conditions | All |
| MAXIFS / MINIFS | Statistical | `MAXIFS(max_range,range1,crit1,…)` | Max / min with conditions | 2019+ |
| VLOOKUP / HLOOKUP | Lookup | `VLOOKUP(value,table,col,[exact])` | Table lookup | All |
| XLOOKUP | Lookup | `XLOOKUP(value,lookup,return,[not_found],[match],[search])` | Flexible lookup | 365/2021 |
| INDEX / MATCH | Lookup | `INDEX(range,row,[col])` · `MATCH(value,range,0)` | Position and item | All |
| LEFT / RIGHT / MID | Text | `MID(text,start,length)` | Text parts | All |
| LEN / TRIM / CLEAN | Text | `TRIM(text)` | Length, remove extra spaces and non-printing characters | All |
| UPPER / LOWER / PROPER | Text | `PROPER(text)` | Change case | All |
| SUBSTITUTE / REPLACE | Text | `SUBSTITUTE(text,old,new)` | Replace text | All |
| CONCAT / TEXTJOIN | Text | `TEXTJOIN(delim,ignore_empty,text1,…)` | Join text | 2019+ |
| TEXT | Text | `TEXT(value,"format")` | Value as formatted text | All |
| VALUE / DATEVALUE | Text | `VALUE(text)` | Text to number / date | All |
| TODAY / NOW | Date | `TODAY()` | Current date / date-time | All |
| DATE / YEAR / MONTH / DAY | Date | `DATE(year,month,day)` | Build / split dates | All |
| EDATE / EOMONTH | Date | `EOMONTH(start,months)` | Months later / end of month | All |
| WEEKDAY | Date | `WEEKDAY(date,[type])` | Day of the week | All |
| NETWORKDAYS / NETWORKDAYS.INTL | Date | `NETWORKDAYS.INTL(start,end,[weekend],[holidays])` | Working days | All |
| WORKDAY | Date | `WORKDAY(start,days,[holidays])` | Date after n working days | All |
| DATEDIF | Date | `DATEDIF(start,end,"Y")` | Years, months or days between dates | All |
| PMT / IPMT / PPMT | Financial | `PMT(rate,nper,pv)` | Loan payment, interest and principal parts | All |
| PV / FV | Financial | `FV(rate,nper,pmt,[pv])` | Present / future value | All |
| NPER / RATE | Financial | `RATE(nper,pmt,pv)` | Number of periods / rate | All |
| NPV / IRR | Financial | `NPV(rate,value1,…)` · `IRR(values)` | Present value of flows / rate of return | All |
| SLN / DB / DDB | Financial | `SLN(cost,salvage,life)` | Depreciation | All |
| UNIQUE | Dynamic array | `UNIQUE(array)` | Distinct values | 365/2021 |
| SORT / SORTBY | Dynamic array | `SORT(array,[col],[order])` | Sorted list | 365/2021 |
| FILTER | Dynamic array | `FILTER(array,include,[if_empty])` | Rows that meet a condition | 365/2021 |
| SEQUENCE | Dynamic array | `SEQUENCE(rows,[cols],[start],[step])` | Number series | 365/2021 |
| LET | Logical | `LET(name,value,calculation)` | Name a value inside a formula | 365/2021 |
| GETPIVOTDATA | Lookup | `GETPIVOTDATA(data_field,pivot_cell,…)` | Read a value from a PivotTable | All |


### Practice projects

1. **Business letter pack (Word):** letterhead template, a block-format quotation letter, a memo, a notice, an invoice with `=SUM(ABOVE)`, and 10 mail-merged customer letters from an Excel list.
2. **Pitch deck (PowerPoint):** 10-slide pitch for a small business idea (problem, solution, market, business model, competition, marketing, financial summary with a chart from Excel, the ask).
3. **Sales and payroll workbook (Excel):** Dataset 1 with Price List lookups, order-size IFs, SUMIFS summaries, a PivotTable and a dashboard; Dataset 2 payroll with department totals; protected input cells; print-ready.
4. **Loan and investment planner (Excel):** a loan with a monthly amortisation table, a savings plan (FV), an NPV/IRR comparison of two projects, and a two-variable Data Table of instalments.
5. **Final integrated project:** the "Rahim Traders business pack" of Lab 13, or a new project chosen with the teacher (for example "Campus Café monthly budget and break-even": Excel model with dashboard, Word proposal letter, PowerPoint summary).

### Assessment and exam guide

Confirm marks with the official course outline; this is the suggested split. Excel is tested most heavily.

| Component | Marks |
| --- | --- |
| Attendance | 10 |
| Lab performance and reports (Labs 1–13) | 20 |
| Lab Mid (Word 10 + PowerPoint 10, 45 min practical) | 20 |
| Lab Final (Excel 28 + Word 6 + PowerPoint 6, 90 min practical) | 40 |
| Viva / quiz | 10 |
| **Total** | **100** |

**Lab Mid format (45 min):** Part A (Word, 10 marks): recreate a given one-page business letter or notice, including letterhead text, subject line, a 4-row table, a bulleted list, footer with Name/ID/Section. Part B (PowerPoint, 10 marks): recreate one given slide (for example "Basic organisation of a business computer system") with text formatting, shapes, arrows and a table; save as `StudentID_LabMid.pptx` and `StudentID_LabMid.docx`.

**Lab Final format (90 min):** Part A Word (6 marks): format a given raw text into a short business report with heading styles, a table, header/footer and page numbers. Part B PowerPoint (6 marks): build 4 slides from given content with a theme, a chart and one animation. **Part C Excel (28 marks)**, on a fresh copy of Dataset 1 (no formulas):

| Task | Marks |
| --- | --- |
| 1. Format the sheet (header, date and ৳ formats, borders, freeze top row, column widths) | 3 |
| 2. Gross, Discount, Net, VAT (rate in a named input cell, rounded) and Total with correct references | 6 |
| 3. Unit Price and Category from the Price List with VLOOKUP/XLOOKUP and an error message | 3 |
| 4. Order-size column with IF or IFS; conditional formatting for Net above 50,000 | 3 |
| 5. Region and Category summary tables with SUMIF/SUMIFS, and a check cell that proves the totals agree | 4 |
| 6. COUNTIFS and AVERAGEIF for two given questions | 2 |
| 7. A correctly titled chart (column or pie) of a summary table | 3 |
| 8. A PivotTable (or a PMT formula, as the paper specifies) | 2 |
| 9. Print setup (landscape, fit to one page wide, repeated headings) and protection of formula cells | 2 |

**Marking notes:** reward correct formulas and absolute references over typed numbers; deduct for hard-coded rates, merged cells in the data, missing chart titles or units, and totals that do not match the answer key.

**Sample viva questions**

1. What is the difference between RAM and ROM?
2. What is the difference between Save and Save As?
3. How do you insert a page break? Why not press Enter many times?
4. What is mail merge? Name its two main parts.
5. What is Slide Master used for?
6. What is the difference between a transition and an animation?
7. What is a cell address? What is a range?
8. What is the difference between relative and absolute references? Which key adds the dollar signs?
9. Why should a VAT rate be kept in its own cell?
10. Write an IF formula that shows "Pass" if marks are 40 or more.
11. When do you use COUNTIF and when COUNTIFS? Which argument comes first in SUMIFS?
12. What does the last argument of VLOOKUP do? When do you use TRUE?
13. What does #N/A mean and how can you handle it?
14. What is the difference between markup and margin?
15. In `=PMT(12%/12,36,-500000)` why is the rate divided by 12?
16. How do you find how many days an invoice is overdue?
17. What is a PivotTable? Why must it be refreshed?
18. Which chart would you use to show the share of each category? Which for a trend over time?
19. What does Remove Duplicates do and what should you do before using it?
20. How do you stop others from changing your formulas?
21. What is the difference between SUM and SUBTOTAL(109, …) on a filtered list?
22. What does Goal Seek do?

### Module quizzes (answers marked ✔)

**Module 0 — Computer basics**

1. Which is an input device? (a) Monitor (b) Printer (c) Scanner ✔ (d) Speaker
2. 1 Kilobyte equals: (a) 1000 bits (b) 1024 bytes ✔ (c) 8 bytes (d) 1024 MB
3. Which memory loses data when power is off? (a) ROM (b) Hard disk (c) RAM ✔ (d) SSD
4. Windows is an example of: (a) Application software (b) Operating system ✔ (c) Hardware (d) Virus
5. Shortcut to open File Explorer: (a) Windows + E ✔ (b) Ctrl + E (c) Alt + F4 (d) Windows + L
6. Pressing F2 on a selected file will: (a) Delete it (b) Rename it ✔ (c) Copy it (d) Open it
7. The extension of an Excel workbook is: (a) .docx (b) .pptx (c) .xlsx ✔ (d) .pdf
8. Shift + Delete on a file: (a) Moves it to Recycle Bin (b) Deletes it permanently ✔ (c) Copies it (d) Hides it

**Module 1 — Word**

1. Shortcut to center-align text: (a) Ctrl + C (b) Ctrl + E ✔ (c) Ctrl + J (d) Ctrl + R
2. To start a new page you should use: (a) Enter many times (b) Ctrl + Enter ✔ (c) Tab (d) Shift + Enter
3. An automatic table of contents depends on: (a) Bold text (b) Heading styles ✔ (c) Font size (d) Page colour
4. Which tab has Mail Merge? (a) Insert (b) Review (c) Mailings ✔ (d) Layout
5. Format Painter copies: (a) Text (b) Formatting ✔ (c) Pictures (d) Tables
6. To show a different header on the first page, tick: (a) Different First Page ✔ (b) Link to Previous (c) Header Row (d) Gridlines
7. Track Changes is on the: (a) Review tab ✔ (b) View tab (c) Design tab (d) Home tab
8. Wrap style that lets text flow around a picture: (a) In Line with Text (b) Square ✔ (c) Behind Text (d) None

**Module 2 — PowerPoint**

1. Shortcut to add a new slide: (a) Ctrl + N (b) Ctrl + M ✔ (c) Ctrl + S (d) Ctrl + D
2. Start the show from the current slide: (a) F5 (b) Shift + F5 ✔ (c) Ctrl + F5 (d) Esc
3. To put a logo on every slide, use: (a) Slide Sorter (b) Slide Master ✔ (c) Reading View (d) Notes Page
4. Movement between slides is a: (a) Transition ✔ (b) Animation (c) Theme (d) Layout
5. Green effects in the animation gallery are: (a) Exit (b) Emphasis (c) Entrance ✔ (d) Motion paths
6. The 6×6 rule limits: (a) Slides per talk (b) Bullets and words per slide ✔ (c) Colours (d) Pictures
7. Press B during a slide show to: (a) Go back (b) Show a black screen ✔ (c) Bold text (d) End show
8. Best chart for parts of a whole: (a) Line (b) Pie ✔ (c) Scatter (d) Column

**Module 3 — Excel Foundations**

1. Every formula begins with: (a) + (b) @ (c) = ✔ (d) #
2. B3 refers to: (a) Row B, column 3 (b) Column B, row 3 ✔ (c) Sheet 3 (d) Range B to 3
3. The result of `=10+5*2` is: (a) 30 (b) 20 ✔ (c) 25 (d) 17
4. Which key makes a reference absolute? (a) F2 (b) F5 (c) F12 (d) F4 ✔
5. `=A2*$E$1` is copied down to row 3. It becomes: (a) `=A3*$E$1` ✔ (b) `=A3*$E$2` (c) `=A2*$E$1` (d) `=A3*E2`
6. A number format changes: (a) The stored value (b) How the value looks ✔ (c) The formula (d) The column letter
7. `#DIV/0!` means: (a) Column too narrow (b) Wrong function name (c) Division by zero ✔ (d) Deleted cell
8. Which shortcut shows all formulas on the sheet? (a) Ctrl + F (b) Ctrl + \` ✔ (c) Ctrl + T (d) Ctrl + G
9. Which function counts all non-empty cells, including text? (a) COUNT (b) SUM (c) COUNTBLANK (d) COUNTA ✔
10. Which key combination inserts AutoSum? (a) Ctrl + S (b) Alt + = ✔ (c) Ctrl + = (d) F9

**Module 4 — Excel Business Calculations**

1. Which formula shows "Pass" for marks of 40 or more in B2? (a) `=IF(B2>=40,"Pass","Fail")` ✔ (b) `=IF(B2>40,Pass,Fail)` (c) `=IF("Pass",B2>=40)` (d) `=PASS(B2>=40)`
2. `=COUNTIF(F2:F21,"Dhaka")` returns: (a) The total sales of Dhaka (b) The number of cells equal to Dhaka ✔ (c) The average of Dhaka (d) The first Dhaka row
3. In SUMIFS, the first argument is: (a) The first criteria range (b) The first criterion (c) The sum range ✔ (d) The lookup value
4. To get an exact match with VLOOKUP, the last argument is: (a) TRUE (b) FALSE ✔ (c) 1 (d) It is optional and ignored
5. An approximate-match lookup of commission slabs needs the first column to be: (a) Sorted ascending ✔ (b) Sorted descending (c) Text (d) Unique names
6. `=-PMT(12%/12,36,500000)` returns the: (a) Total interest (b) Loan balance (c) Interest rate (d) Monthly instalment ✔
7. `=EOMONTH(DATE(2026,10,15),0)` returns: (a) 15-Nov-2026 (b) 31-Oct-2026 ✔ (c) 01-Oct-2026 (d) 30-Oct-2026
8. Cost 800, selling price 1,000: the markup on cost is: (a) 20% (b) 80% (c) 25% ✔ (d) 200%
9. Break-even units equal: (a) Fixed cost ÷ (price − variable cost) ✔ (b) Price ÷ fixed cost (c) Fixed cost × price (d) Variable cost ÷ price
10. `=IFERROR(VLOOKUP(D2,A:C,3,FALSE),"Not found")` is used to: (a) Delete errors (b) Replace the #N/A error with a message ✔ (c) Sort the table (d) Round the answer

**Module 5 — Excel Data Analysis & Reporting**

1. Which shortcut creates an Excel Table? (a) Ctrl + T ✔ (b) Ctrl + L (c) Alt + T (d) Ctrl + B
2. To add only the visible rows of a filtered list use: (a) SUM (b) COUNTA (c) SUBTOTAL(109, …) ✔ (d) TOTAL
3. After the source data changes, a PivotTable: (a) Updates instantly (b) Must be refreshed ✔ (c) Is deleted (d) Becomes a chart
4. In a PivotTable, a number you want to total goes to: (a) Rows (b) Columns (c) Filters (d) Values ✔
5. Before Remove Duplicates you should: (a) Merge cells (b) Delete the header (c) TRIM and fix the text (d) Sort by colour — choose the best: (c) ✔
6. The best chart for the share of each category in a whole is: (a) Line (b) Pie or doughnut ✔ (c) Scatter (d) Histogram
7. Goal Seek is used to: (a) Find the input that gives a target result ✔ (b) Sort data (c) Print a sheet (d) Remove errors
8. To protect formulas but let users type in some cells, first: (a) Hide the sheet (b) Untick Locked for the input cells ✔ (c) Delete the formulas (d) Save as CSV
9. Which function exists only in Excel 2021 and Microsoft 365? (a) SUMIF (b) IFERROR (c) VLOOKUP (d) FILTER ✔
10. A macro is saved in a file with the extension: (a) .xlsx (b) .csv (c) .xlsm ✔ (d) .pdf

The Final practice quiz on the website draws **40 random questions** from the six module sets (54 questions), with at least 24 of them from Modules 3, 4 and 5. A separate "Excel only" practice quiz draws 20 from Modules 3–5.

### Glossary

| Term | Meaning |
| --- | --- |
| Absolute reference | A cell reference that does not change when copied, e.g. dollar-sign form of A1 |
| Animation | Movement effect applied to an object on a slide |
| AutoFill | Dragging the fill handle to continue a series or copy a formula |
| Backstage view | The File tab screen with New, Open, Save, Print and Export |
| Cell | Intersection of a row and column in Excel |
| Citation | A reference to a source inside the text |
| Conditional formatting | Formatting that changes automatically based on a cell's value |
| CPU | Central Processing Unit; the processor that executes instructions |
| Footnote | A note at the bottom of a page |
| Formula | An expression starting with = that calculates a value |
| Function | A built-in formula such as SUM or IF |
| Gutter | Extra margin space for binding |
| Mail merge | Combining one document with a data list to create personalised copies |
| Operating system | System software that manages the computer, e.g. Windows |
| Placeholder | A dotted box on a slide layout for title, text or content |
| Range | A group of adjacent cells, e.g. A1:D10 |
| Ribbon | The command strip with tabs and groups at the top of Office apps |
| Section break | A break that lets parts of a document have different layout |
| Slide Master | The top slide that controls design of all slides |
| SmartArt | Ready-made diagrams for lists, processes and hierarchies |
| Style | A saved set of formatting (e.g. Heading 1) |
| Template | A pre-designed file used as a starting point |
| Transition | Visual effect when moving from one slide to the next |
| Workbook | An Excel file containing one or more worksheets |
| Absolute reference | A cell reference with dollar signs (for example $B$1) that does not change when the formula is copied |
| Ageing report | A list of unpaid invoices grouped by how long they are overdue |
| Amortisation | Repaying a loan in regular instalments, each part interest and part principal |
| Approximate match | A lookup that finds the largest value less than or equal to the lookup value (sorted data needed) |
| Break-even point | The sales level at which total revenue equals total cost (profit is zero) |
| Chart title | The heading of a chart; it should state the message |
| Contribution margin | Selling price minus variable cost per unit |
| Dashboard | One worksheet that shows the key numbers and charts of a business at a glance |
| Data validation | A rule that limits what can be typed in a cell |
| Dynamic array | A formula that returns many cells that "spill" into neighbouring cells (365 / 2021) |
| Exact match | A lookup that finds only the identical value (FALSE or 0) |
| Fill handle | The small square at the corner of the active cell used for AutoFill |
| Filter | Hiding rows that do not meet a condition |
| Goal Seek | A what-if tool that finds the input value needed to reach a target result |
| IRR | Internal rate of return: the discount rate at which the NPV of a project is zero |
| Lookup value | The value that a lookup function searches for |
| Macro | A recorded set of steps that Excel can replay |
| Margin | Profit as a percentage of the selling price |
| Markup | Profit as a percentage of the cost |
| Named range | A cell or range given a name, such as VAT_Rate |
| NPV | Net present value: today's value of future cash flows minus the cost |
| PivotTable | An interactive summary report built by dragging fields |
| Power Query | An Excel tool that imports and cleans data by recording steps |
| Principal | The original amount of a loan, without interest |
| Relative reference | A cell reference that changes when the formula is copied |
| Salvage value | The estimated value of an asset at the end of its life |
| Scenario | A saved set of input values for what-if comparison |
| Slicer | A button panel that filters a Table or PivotTable |
| Sparkline | A tiny chart inside one cell |
| Spill | The way a dynamic-array result fills several cells |
| Structured reference | A formula reference that uses a Table and column name, such as Sales[Net] |
| Table (Excel Table) | A range converted with Ctrl + T that has headers, filters and auto-expanding formulas |
| VAT | Value Added Tax: a tax added to the price of goods and services |
| What-if analysis | Changing inputs to see how the results change |

### Shortcut cheat sheet page

The website combines the shortcut tables from Lessons 0.2, 0.5, 1.2–1.4, 1.10, 1.11, 2.8, 2.9 and all Excel lessons (3.1–5.9), and the module summaries, into one searchable table with columns: Shortcut · Action · App (Windows / All Office / Word / PowerPoint / Excel) · Lesson. Excel shortcuts are the largest group and are shown first when the Excel filter is chosen. Add a flashcard mode (shortcut on the front, action on the back) and a "Top 20 Excel shortcuts" card:

`Ctrl + Arrow` jump to edge · `Ctrl + Shift + Arrow` select to edge · `Ctrl + Home` go to A1 · `Ctrl + 1` Format Cells · `Alt + =` AutoSum · `F4` absolute reference · `F2` edit cell · `Ctrl + \`` show formulas · `Ctrl + T` Table · `Ctrl + Shift + L` filter · `Ctrl + D` fill down · `Ctrl + E` Flash Fill · `Ctrl + ;` today's date · `Ctrl + Shift + 5` percent · `Ctrl + Alt + V` Paste Special · `Ctrl + G` Go To · `Alt + F1` instant chart · `Alt + F5` refresh PivotTable · `Ctrl + P` print · `F12` Save As.

### Resources and downloads

- Datasets (Part D, Datasets 1–5) as CSV and as ready-made `.xlsx` files (teachers may add): `Dataset1_SalesRegister_Oct2026`, `Dataset1_PriceList`, `Dataset2_Payroll_Nov2026`, `Dataset3_Commission`, `Dataset4_Ageing_31Oct2026`, `Dataset5_Monthly_2026`, `Messy_Customers`.
- Other practice files to provide: `raw_essay.txt`, `letterhead_template.dotx`, `report_raw_text.docx`, `customers_list.xlsx` (for mail merge), `presentation_content.docx`, `lab_final_sample_dataset.xlsx`.
- Free alternatives: Google Docs, Slides and Sheets; LibreOffice (Writer, Impress, Calc); Microsoft 365 web apps with a university email. Functions marked 365/2021 (XLOOKUP, FILTER, SORT, UNIQUE, LET) work in Microsoft 365 and Google Sheets (XLOOKUP, FILTER, SORT, UNIQUE) but not in Excel 2016 / 2019.
- Typing practice: any free online typing tutor (e.g. typing.com, keybr.com).
- Official help: Microsoft Support pages for Word, PowerPoint and Excel (function help, PivotTables, charts). For tax and VAT rules use the official National Board of Revenue (NBR) website.

### FAQ

- **I don't have Office at home. What can I use?** Microsoft 365 web apps (free online), Google Docs/Slides/Sheets, or LibreOffice. Lab exams are on Microsoft Office desktop.
- **My formula shows `#NAME?` or `#N/A`. What should I do?** Open the Error spotter in the Excel Lab; check the spelling of the function, the quotes around text, the lookup value and the range.
- **XLOOKUP or FILTER does not work on my computer.** They need Excel 2021 or Microsoft 365. Use VLOOKUP / INDEX + MATCH and AutoFilter instead; the lab and exam accept either unless the paper says otherwise.
- **Why do my totals differ by a few paisa from the answer key?** Round each VAT line with `ROUND(…,2)` before adding; formatting alone does not change the stored value.
- **Which VAT and salary rates should I use?** The rates in the labs are teaching inputs in cells (VAT 15%, house rent 50%, PF 10%). Keep them in input cells; in real work check the official rates.
- **My file won't open on the lab PC.** Save as .docx/.pptx/.xlsx (not .pages, .numbers or .odt) and carry a PDF copy.
- **I lost my file.** Check File ▸ Open ▸ Recent, the Recycle Bin, and File ▸ Info ▸ Manage Workbook / Document ▸ Recover Unsaved. Turn on AutoSave next time.
- **How do I submit labs?** As instructed in class (Google Classroom or email) using the file naming format.
- **Can I use a phone?** You can read lessons and use the playground on a phone, but practise on a computer.

### Credits and About page text

**Course teachers:** Naimur Rahman, Lecturer, Department of Computer Science and Engineering (CSE), BAUST; Md. Rakib Trofder, Lecturer, Department of CSE, BAUST; Saad Ahmed, Lecturer, Department of CSE, BAUST.

**Course content and teaching design:** Naimur Rahman Sir, Department of Computer Science and Engineering, Bangladesh Army University of Science and Technology (BAUST), Saidpur. This website is built on the course structure, lessons and lab approach of CSE 1204 Computer Applications for Business, following the approach of CSE 2110 Computer Fundamentals Sessional, with extended Excel content for business users.

**Website design and development:** Md. Rakib Trofder.

**For:** students of the business programme (course CSE 1204) at BAUST.

**Disclaimer:** Microsoft, Word, PowerPoint and Excel are trademarks of Microsoft Corporation. This site is an independent educational resource and is not affiliated with Microsoft. All companies, people and figures in the datasets are fictional. Business rates in examples (VAT, allowances, provident fund, commission and interest) are teaching inputs, not legal or financial advice. For official course rules and marks, follow the course teachers and the BAUST course outline.
