export const COURSE_INFO = {
  code: 'CSE 1204',
  title: 'Computer Applications for Business',
  credit: '0.75 credit, 1.5 hours lab per week (adjust to the official syllabus)',
  institution: 'Bangladesh Army University of Science and Technology (BAUST), Saidpur',
  tools: 'Microsoft Excel (main focus: 7 of 14 weeks), Microsoft Word, Microsoft PowerPoint (Microsoft 365 / Office 2019+)',
  teachers: [
    { name: 'Naimur Rahman', role: 'Lecturer, Department of CSE, BAUST', credit: 'Course content & teaching design' },
    { name: 'Md. Rakib Trofder', role: 'Lecturer, Department of CSE, BAUST', credit: 'Course teacher · Website design & development' },
    { name: 'Saad Ahmed', role: 'Lecturer, Department of CSE, BAUST', credit: 'Course teacher' },
  ],
};

export const COURSE_OBJECTIVES =
  'To make business students confident, independent users of a computer and of Microsoft Word, PowerPoint and, above all, Excel, so that they can prepare business documents, present business information and analyse business data for academic and professional work.';

export const COURSE_OUTCOMES = [
  { co: 'CO1', description: 'Operate a Windows computer, manage files and folders, and use the internet and email responsibly' },
  { co: 'CO2', description: 'Create and format professional business documents in Word (letter, memo, invoice, CV, report with TOC, mail merge)' },
  { co: 'CO3', description: 'Design and deliver an effective business presentation in PowerPoint, including charts from Excel' },
  { co: 'CO4', description: 'Build accurate Excel worksheets that calculate with formulas, functions, lookups, dates and financial functions for business problems (sales, VAT, payroll, loans, ageing, break-even)' },
  { co: 'CO5', description: 'Analyse and report business data in Excel using sorting, filtering, Tables, PivotTables, charts, what-if tools and a dashboard, and prepare the result for printing and sharing' },
];

export const WEEKLY_PLAN = [
  { week: 1, topic: 'Course intro, computer basics, Windows, files', lessons: '0.1–0.3', lab: 'Lab 1', moduleId: 'basics' },
  { week: 2, topic: 'Typing, Office interface, internet, email', lessons: '0.4–0.6', lab: 'Lab 2', moduleId: 'basics' },
  { week: 3, topic: 'Word: editing, formatting, page layout', lessons: '1.1–1.5', lab: 'Lab 3', moduleId: 'word' },
  { week: 4, topic: 'Word: tables, graphics, styles, TOC, mail merge, business documents', lessons: '1.6–1.11', lab: 'Lab 4', moduleId: 'word' },
  { week: 5, topic: 'PowerPoint: interface, text, design, graphics, tables and charts, media', lessons: '2.1–2.5', lab: 'Lab 5', moduleId: 'powerpoint' },
  { week: 6, topic: 'PowerPoint: animation, Slide Master, presenting, business presentations; student presentations', lessons: '2.6–2.9', lab: 'Lab 6', moduleId: 'powerpoint' },
  { week: 7, topic: 'Lab Mid exam (Word + PowerPoint)', lessons: '—', lab: 'Lab Mid', moduleId: 'word' },
  { week: 8, topic: 'Excel foundations: interface, data entry, formatting', lessons: '3.1–3.3', lab: 'Lab 7', moduleId: 'excel-foundations', isExcel: true },
  { week: 9, topic: 'Excel foundations: formulas, references, basic functions', lessons: '3.4–3.6', lab: 'Lab 8', moduleId: 'excel-foundations', isExcel: true },
  { week: 10, topic: 'Excel business calculations: IF, conditional totals, lookups', lessons: '4.1–4.3', lab: 'Lab 9', moduleId: 'excel-business', isExcel: true },
  { week: 11, topic: 'Excel business calculations: dates, finance ★, VAT, break-even, payroll', lessons: '4.4–4.6', lab: 'Lab 10', moduleId: 'excel-business', isExcel: true },
  { week: 12, topic: 'Excel data analysis: sort, filter, Tables, cleaning, PivotTables', lessons: '5.1–5.3', lab: 'Lab 11', moduleId: 'excel-analysis', isExcel: true },
  { week: 13, topic: 'Excel reporting: charts, what-if ★, modern functions ★, dashboard', lessons: '5.4–5.7', lab: 'Lab 12', moduleId: 'excel-analysis', isExcel: true },
  { week: 14, topic: 'Printing and protection, linking Office apps ★, integrated project, revision, Lab Final and viva', lessons: '5.8–5.9', lab: 'Lab 13 / Final', moduleId: 'excel-analysis', isExcel: true },
];

export const LAB_RULES = [
  'Arrive on time; sign attendance. Bags and food stay outside the lab.',
  'Save all work in D:\\CSE1204_YourID and back it up to Google Drive or OneDrive.',
  'File name format: StudentID_LabNN_Topic (e.g. 2xxxxxxx_Lab08_Formulas.xlsx).',
  'Do not change computer settings, install software or unplug cables.',
  'Lab report is due before the next lab class; late submission loses marks.',
  'Copying files from another student is plagiarism; both files get zero. Working from the same dataset is expected; the formulas, layout and charts must be your own.',
  'Excel labs: every rate (VAT, house rent, PF, interest) goes into its own labelled cell. No typed numbers inside formulas. Check your totals against the Expected results box of the lab before you submit.',
];

export const MARK_DISTRIBUTION = [
  { component: 'Attendance', marks: 10, notes: 'Regular presence and on-time arrival in weekly lab sessions' },
  { component: 'Lab performance and reports (Labs 1–13)', marks: 20, notes: 'Weekly checklist execution, clean file naming, and timely submission' },
  { component: 'Lab Mid (Word 10 + PowerPoint 10, 45 min practical)', marks: 20, notes: 'Week 7 practical exam recreating business letters and slides' },
  { component: 'Lab Final (Excel 28 + Word 6 + PowerPoint 6, 90 min practical)', marks: 40, notes: 'Week 14 comprehensive practical test heavily focused on Excel' },
  { component: 'Viva / quiz', marks: 10, notes: 'Oral questions on formulas, concepts, and reasoning' },
];

export const LAB_FINAL_EXCEL_BREAKDOWN = [
  { task: '1. Format the sheet (header, date and ৳ formats, borders, freeze top row, column widths)', marks: 3 },
  { task: '2. Gross, Discount, Net, VAT (rate in a named input cell, rounded) and Total with correct references', marks: 6 },
  { task: '3. Unit Price and Category from the Price List with VLOOKUP/XLOOKUP and an error message', marks: 3 },
  { task: '4. Order-size column with IF or IFS; conditional formatting for Net above 50,000', marks: 3 },
  { task: '5. Region and Category summary tables with SUMIF/SUMIFS, and a check cell that proves the totals agree', marks: 4 },
  { task: '6. COUNTIFS and AVERAGEIF for two given questions', marks: 2 },
  { task: '7. A correctly titled chart (column or pie) of a summary table', marks: 3 },
  { task: '8. A PivotTable (or a PMT formula, as the paper specifies)', marks: 2 },
  { task: '9. Print setup (landscape, fit to one page wide, repeated headings) and protection of formula cells', marks: 2 },
];

export const VIVA_QUESTIONS = [
  { q: 'What is the difference between RAM and ROM?', a: 'RAM is temporary (volatile) working memory lost when power turns off; ROM is permanent memory holding start-up instructions.' },
  { q: 'What is the difference between Save and Save As?', a: 'Save (Ctrl+S) updates the current file in place; Save As (F12) saves a new copy with a different name, folder, or format.' },
  { q: 'How do you insert a page break? Why not press Enter many times?', a: 'Press Ctrl+Enter (Layout ▸ Breaks ▸ Page). Pressing Enter repeatedly breaks layout whenever earlier text is edited.' },
  { q: 'What is mail merge? Name its two main parts.', a: 'Combining one Word main template document with an Excel/table recipient data source to generate personalised letters or certificates.' },
  { q: 'What is Slide Master used for?', a: 'Controlling fonts, colours, footers, and a company/university logo across every slide layout from one master slide.' },
  { q: 'What is the difference between a transition and an animation?', a: 'Transitions animate movement between slides; animations animate individual objects inside a slide.' },
  { q: 'What is a cell address? What is a range?', a: 'A cell address is column letter + row number (e.g. B3). A range is a rectangular block of cells written first:last (e.g. A1:D10).' },
  { q: 'What is the difference between relative and absolute references? Which key adds the dollar signs?', a: 'Relative (A2) shifts when copied; absolute ($A$2) stays locked. Press F4 to cycle dollar signs.' },
  { q: 'Why should a VAT rate be kept in its own cell?', a: 'So you can change the rate in one place and every formula updates automatically without editing formulas row by row.' },
  { q: 'Write an IF formula that shows "Pass" if marks are 40 or more.', a: '=IF(B2>=40,"Pass","Fail")' },
  { q: 'When do you use COUNTIF and when COUNTIFS? Which argument comes first in SUMIFS?', a: 'COUNTIF handles 1 condition; COUNTIFS handles multiple conditions. In SUMIFS, sum_range comes FIRST.' },
  { q: 'What does the last argument of VLOOKUP do? When do you use TRUE?', a: 'FALSE (0) forces exact match (codes/names); TRUE (1) finds approximate match for ascending sorted slabs like commission tiers.' },
  { q: 'What does #N/A mean and how can you handle it?', a: 'Lookup value was not found. Check spelling/trailing spaces or wrap the lookup in =IFERROR(..., "Not found").' },
  { q: 'What is the difference between markup and margin?', a: 'Markup = (Price − Cost) / Cost; Margin = (Price − Cost) / Price.' },
  { q: 'In =PMT(12%/12,36,-500000) why is the rate divided by 12?', a: 'Because 36 is in months, so the annual 12% interest rate must match the monthly payment period (1% per month).' },
  { q: 'How do you find how many days an invoice is overdue?', a: 'Subtract the Due Date from the Report Date (=$H$1 - F2).' },
  { q: 'What is a PivotTable? Why must it be refreshed?', a: 'An interactive summary table built by dragging fields. It caches source data, so press Alt+F5 (Refresh) after editing source rows.' },
  { q: 'Which chart would you use to show the share of each category? Which for a trend over time?', a: 'Pie or Doughnut chart for shares of a whole (<= 5–6 slices); Line chart for trends over time.' },
  { q: 'What does Remove Duplicates do and what should you do before using it?', a: 'Deletes repeated rows. First clean extra spaces and capitalisation with TRIM and PROPER, and check which columns define uniqueness.' },
  { q: 'How do you stop others from changing your formulas?', a: 'Unlock only input cells (Ctrl+1 ▸ Protection ▸ untick Locked), then turn on Review ▸ Protect Sheet.' },
  { q: 'What is the difference between SUM and SUBTOTAL(109, …) on a filtered list?', a: 'SUM includes hidden filtered rows; SUBTOTAL(109, …) adds only the currently visible rows.' },
  { q: 'What does Goal Seek do?', a: 'Finds the single input value needed for a formula cell to reach a desired target result.' },
];

export const PRACTICE_PROJECTS = [
  {
    id: 'proj-1',
    number: 1,
    title: 'Business Letter Pack',
    app: 'Microsoft Word',
    accent: '#2B579A',
    summary: 'Create a complete correspondence kit for a trading company.',
    deliverables: [
      'Reusable letterhead template (.dotx)',
      'Block-format quotation letter',
      'Internal Memo with aligned tab stops',
      'Company Notice & Meeting Minutes table',
      'Invoice table with =PRODUCT(LEFT) and =SUM(ABOVE)',
      '10 mail-merged customer letters from an Excel recipient list',
    ],
  },
  {
    id: 'proj-2',
    number: 2,
    title: 'Startup / Business Pitch Deck',
    app: 'Microsoft PowerPoint',
    accent: '#D24726',
    summary: 'Design a persuasive 10-slide presentation for an investor or manager.',
    deliverables: [
      'Slide Master with consistent BAUST / company branding',
      'Problem, Solution, Market size & Business model slides',
      'Competition & Marketing plan visuals (SmartArt / Icons)',
      'Financial summary featuring a linked or embedded Excel chart',
      'Speaker notes & 5-minute presentation delivery plan',
    ],
  },
  {
    id: 'proj-3',
    number: 3,
    title: 'Sales and Payroll Workbook',
    app: 'Microsoft Excel',
    accent: '#217346',
    summary: 'Build a multi-sheet operational workbook using Datasets 1 and 2.',
    deliverables: [
      'Sales Register with Price List VLOOKUP/XLOOKUP & Order Size IF/IFS',
      'Region and Category SUMIFS summaries with cross-check cell',
      'PivotTable cross-tabulation + Interactive Dashboard with slicers',
      'November Payroll sheet with input assumptions & department SUMIFs',
      'Protected formula cells and A4 Landscape print setup',
    ],
  },
  {
    id: 'proj-4',
    number: 4,
    title: 'Loan and Investment Planner',
    app: 'Microsoft Excel',
    accent: '#1B5E3A',
    summary: 'Evaluate financing and investment options with financial functions.',
    deliverables: [
      'EMI calculator using PMT with a 36-month amortisation schedule',
      'Regular monthly savings planner using FV',
      'Project evaluation comparing two investments using NPV and IRR',
      'Two-variable Data Table testing interest rates vs loan durations',
    ],
  },
  {
    id: 'proj-5',
    number: 5,
    title: 'Final Integrated Project (Rahim Traders / Campus Café)',
    app: 'Excel + Word + PowerPoint',
    accent: '#1E3A8A',
    summary: 'Combine all three Office applications into one unified business pack (Lab 13).',
    deliverables: [
      'Excel model (Sales, Price List, Payroll, Ageing, Loan, Summary, Dashboard)',
      '2-page Word executive letter with linked dashboard chart & PDF export',
      '5-slide PowerPoint executive summary with matching KPIs & ageing message',
      '100% consistent figures across every document and slide',
    ],
  },
];

export const FAQ_ITEMS = [
  {
    q: "I don't have Microsoft Office at home. What can I use?",
    a: 'You can use Microsoft 365 web apps (free online with a university/Microsoft account), Google Docs/Slides/Sheets, or LibreOffice (Writer, Impress, Calc). Remember that lab exams run on Microsoft Office desktop.',
  },
  {
    q: 'My formula shows #NAME? or #N/A. What should I do?',
    a: 'Open the Error Spotter in the Excel Lab. For #NAME?, check function spelling and make sure text strings are inside double quotes. For #N/A, verify the lookup value exists in the first column of the lookup range and check for extra spaces.',
  },
  {
    q: 'XLOOKUP or FILTER does not work on my computer.',
    a: 'Dynamic array functions (FILTER, SORT, UNIQUE, XLOOKUP, LET) require Excel 2021 or Microsoft 365. Use VLOOKUP or INDEX + MATCH and AutoFilter in Excel 2016/2019 — lab grading accepts either unless stated otherwise.',
  },
  {
    q: 'Why do my totals differ by a few paisa from the answer key?',
    a: 'Round each VAT line with =ROUND(L2*VAT_Rate, 2) before summing. Number formatting only changes what is displayed, not the stored decimal digits.',
  },
  {
    q: 'Which VAT and salary rates should I use?',
    a: 'The rates in our labs (VAT 15%, house rent 50%, PF 10%) are teaching inputs placed in labelled cells, not legal advice. Always put rates in input cells and check official NBR / employer rules in real work.',
  },
  {
    q: 'My file won’t open on the lab PC.',
    a: 'Always save as standard .docx, .pptx, or .xlsx (not .pages, .numbers, or .odt), and bring a PDF copy as backup.',
  },
  {
    q: 'I lost my file or forgot where I saved it.',
    a: 'Check File ▸ Open ▸ Recent, check the Windows Recycle Bin, and look under File ▸ Info ▸ Manage Workbook/Document ▸ Recover Unsaved. Always save inside D:\\CSE1204_YourID and turn on cloud backup.',
  },
  {
    q: 'How do I submit labs?',
    a: 'Submit via Google Classroom or email as instructed in class, strictly following the file naming rule: StudentID_LabNN_Topic.',
  },
  {
    q: 'Can I use a phone to study this website?',
    a: 'Yes! Every lesson, dataset, quiz, and even the Excel Playground works on a 360px mobile screen, though you should practise on a computer for keyboard shortcuts and lab exams.',
  },
];

export const FREE_ALTERNATIVES = [
  { office: 'Microsoft Word (.docx)', free: 'Google Docs / LibreOffice Writer / Word for the Web', notes: 'Styles, headings, tables, PDF export work similarly; Mail Merge is best in desktop Word.' },
  { office: 'Microsoft PowerPoint (.pptx)', free: 'Google Slides / LibreOffice Impress / PowerPoint Web', notes: 'Slide Master (Theme Builder in Slides), transitions, charts, and PDF export all supported.' },
  { office: 'Microsoft Excel (.xlsx)', free: 'Google Sheets / LibreOffice Calc / Excel for the Web', notes: 'Google Sheets supports XLOOKUP, FILTER, SORT, and UNIQUE for free; PivotTables and charts work smoothly.' },
];
