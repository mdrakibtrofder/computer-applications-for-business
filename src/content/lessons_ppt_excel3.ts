import { Lesson } from '../types/course';

export const LESSONS_PPT_EXCEL3: Lesson[] = [
  // ================= MODULE 2: POWERPOINT =================
  {
    id: '2.1',
    moduleId: 'powerpoint',
    code: '2.1',
    title: 'PowerPoint interface, views and slide layouts',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Identify PowerPoint window parts and ribbon tabs.',
      'Add, duplicate, reorder, hide and delete slides.',
      'Choose appropriate slide layouts and switch presentation views.',
    ],
    sections: [
      {
        heading: 'Window parts & managing slides',
        paragraphs: [
          'Window parts: Slide thumbnails pane (left), Slide pane (centre), Notes pane (bottom), Ribbon tabs (Home, Insert, Draw, Design, Transitions, Animations, Slide Show, Record, Review, View), Status bar with view buttons and zoom.',
        ],
        steps: [
          { detail: 'Start ▸ PowerPoint ▸ Blank Presentation (16:9 widescreen by default).', ribbonPath: 'File ▸ New ▸ Blank Presentation' },
          { detail: 'Home ▸ New Slide (Ctrl + M) ▸ choose a layout: Title Slide, Title and Content, Section Header, Two Content, Comparison, Title Only, Blank, Content with Caption, Picture with Caption.', ribbonPath: 'Home ▸ New Slide' },
          { detail: 'Change a slide’s layout: Home ▸ Layout.', ribbonPath: 'Home ▸ Layout' },
          { detail: 'Duplicate: right-click a thumbnail ▸ Duplicate Slide (Ctrl + D). Delete: select ▸ Delete key.' },
          { detail: 'Reorder: drag thumbnails, or use Slide Sorter view.' },
          { detail: 'Hide a slide: right-click ▸ Hide Slide (skipped in the show).' },
          { detail: 'Group slides: right-click between slides ▸ Add Section.' },
        ],
      },
      {
        heading: 'Presentation Views',
        table: {
          headers: ['View', 'Use'],
          rows: [
            ['Normal', 'Edit slides (default)'],
            ['Outline View', 'Type and reorder text quickly'],
            ['Slide Sorter', 'See all slides; reorder; apply transitions'],
            ['Notes Page', 'Write and print speaker notes'],
            ['Reading View', 'Preview the show inside the window'],
            ['Slide Show', 'Full-screen presentation (F5)'],
            ['Presenter View', 'Speaker sees notes, timer and next slide'],
          ],
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + M', action: 'Insert a New Slide' },
      { keys: 'Ctrl + D', action: 'Duplicate selected slide' },
      { keys: 'F5', action: 'Start Slide Show from slide 1' },
    ],
    commonMistakes: [
      'Pressing Ctrl + N instead of Ctrl + M (Ctrl + N creates a whole new file rather than adding a slide).',
      'Deleting placeholders instead of changing the slide Layout properly.',
    ],
    tryIt: 'Create a 4-slide presentation using Title Slide, Title and Content, Two Content, and Comparison layouts, then reorder slides in Slide Sorter view.',
  },
  {
    id: '2.2',
    moduleId: 'powerpoint',
    code: '2.2',
    title: 'Working with text and slide design (themes, variants)',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Add and format text in placeholders and text boxes.',
      'Apply themes, variants and custom backgrounds.',
      'Follow the 6×6 readability rule for business slides.',
    ],
    sections: [
      {
        heading: 'Text placeholders, Themes & Backgrounds',
        paragraphs: [
          'Click a placeholder ("Click to add title") and type. Use Tab / Shift + Tab to change bullet indentation level. Format text with the Home tab (font, size, bold, colour, alignment, line spacing, Convert to SmartArt, Text Direction). Use Insert ▸ Text Box for extra labels.',
          'Design ▸ Themes applies colours, fonts and backgrounds to all slides; Variants changes colour schemes. Design ▸ Format Background sets Solid, Gradient, or Picture fills. Design ▸ Slide Size switches Widescreen (16:9) or Standard (4:3). Design ▸ Designer (Microsoft 365) suggests polished layouts automatically.',
          'Replace fonts across the entire presentation: Home ▸ Replace arrow ▸ Replace Fonts.',
        ],
        callout: {
          type: 'tip',
          title: 'The 6×6 Readability Guideline',
          body: 'Use no more than 6 bullets per slide and about 6 words per bullet. Titles 36–44 pt, body text at least 24 pt (never below 18 pt). Use key phrases, not full paragraphs, and dark text on a light background for bright classrooms.',
        },
      },
    ],
    commonMistakes: [
      'Copying whole textbook paragraphs onto a slide in 12 pt font.',
      'Using light grey or yellow text on a white background (low contrast on classroom projectors).',
    ],
    tryIt: 'Apply a clean light Theme, set slide size to 16:9, and write a 3-slide outline obeying the 6×6 rule with 24+ pt body text.',
  },
  {
    id: '2.3',
    moduleId: 'powerpoint',
    code: '2.3',
    title: 'Images, shapes, icons, SmartArt',
    duration: '50 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Insert, crop and compress images properly.',
      'Draw, align, group and layer shapes and icons.',
      'Create SmartArt diagrams and Photo Albums.',
    ],
    sections: [
      {
        heading: 'Visual objects & Alignment',
        paragraphs: [
          'Insert ▸ Pictures ▸ This Device / Stock Images. Picture Format ▸ Crop, Crop to Shape, Remove Background, Picture Styles, Corrections, Compress Pictures (keeps .pptx file size small).',
          'Insert ▸ Icons and Insert ▸ Shapes. Shape Format ▸ Shape Fill, Outline, Effects, Merge Shapes.',
          'Arrange: Shape Format ▸ Align (Left, Center, Middle, Distribute Horizontally), Group (Ctrl + G), Ungroup (Ctrl + Shift + G), Bring Forward / Send Backward, Selection Pane (Alt + F10). View ▸ Guides and Gridlines help line objects up cleanly.',
          'SmartArt: Insert ▸ SmartArt, or select bullet text ▸ Home ▸ Convert to SmartArt. Insert ▸ Photo Album creates one slide per photo quickly.',
        ],
        callout: {
          type: 'warning',
          title: 'Image aspect ratio rule',
          body: 'Use high-quality, relevant images; never stretch an image (always drag a corner handle, never a side handle). Credit image sources on the slide or on a final References slide.',
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + G / Ctrl + Shift + G', action: 'Group / Ungroup objects' },
      { keys: 'Alt + F10', action: 'Open Selection Pane' },
      { keys: 'Shift + drag', action: 'Keep proportions when resizing or drawing shapes' },
    ],
    commonMistakes: [
      'Distorting logos or photos by dragging side handles.',
      'Guessing object alignment by eye instead of using Shape Format ▸ Align.',
    ],
    tryIt: 'Recreate the "Basic Organization of a Computer System" diagram: Input, CPU (with CU, ALU, Memory inside a dashed box), Output and Storage connected with arrows.',
  },
  {
    id: '2.4',
    moduleId: 'powerpoint',
    code: '2.4',
    title: 'Tables and charts in slides',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Insert and style PowerPoint tables.',
      'Build embedded charts and paste linked Excel charts.',
      'Select the correct chart type for business messages.',
    ],
    sections: [
      {
        heading: 'Adding tables and charts',
        steps: [
          { detail: 'Insert ▸ Table ▸ choose rows × columns; style it with Table Design (Header Row, Banded Rows).', ribbonPath: 'Insert ▸ Table' },
          { detail: 'Insert ▸ Chart ▸ Column / Line / Pie / Bar ▸ OK. A small Excel sheet opens: type your data there and close it.', ribbonPath: 'Insert ▸ Chart' },
          { detail: 'Chart Design ▸ Edit Data, Change Chart Type, Quick Layout, Chart Styles, Add Chart Element (titles, data labels, legend).' },
          { detail: 'Paste an Excel chart: copy in Excel ▸ in PowerPoint Paste Special ▸ Keep Source Formatting & Link Data (updates when Excel changes).' },
        ],
        callout: {
          type: 'note',
          title: 'Which chart?',
          body: 'Column/Bar to compare categories; Line for change over time; Pie for parts of a whole (maximum 5–6 slices).',
        },
      },
    ],
    commonMistakes: [
      'Putting a 15-row, 10-column table on a single slide where nobody can read it.',
      'Using 3-D pie charts that visually distort slice sizes.',
    ],
    tryIt: 'Insert a Column chart comparing quarterly sales across 4 regions, add data labels, and remove cluttering gridlines.',
  },
  {
    id: '2.5',
    moduleId: 'powerpoint',
    code: '2.5',
    title: 'Audio, video and hyperlinks',
    duration: '30 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Embed and trim video and background audio clips.',
      'Create hyperlinks to slides, web pages and files.',
      'Build interactive navigation with Action Buttons and Slide Zoom.',
    ],
    sections: [
      {
        heading: 'Multimedia & interactive links',
        paragraphs: [
          'Insert ▸ Video ▸ This Device / Stock Videos / Online Videos (online videos require internet during the presentation). Playback tab: Trim Video, Fade In/Out, Volume, Start (On Click / Automatically), Play Full Screen, Loop.',
          'Insert ▸ Audio ▸ Audio on My PC or Record Audio; tick Play in Background for continuous music across slides.',
          'Insert ▸ Link (Ctrl + K) links text or shapes to a web page, another slide (Place in This Document), a file, or an email. Insert ▸ Action / Shapes ▸ Action Buttons (Next, Previous, Home) enable interactive quizzes. Insert ▸ Zoom ▸ Summary Zoom or Slide Zoom builds a clickable visual menu slide.',
        ],
      },
    ],
    shortcuts: [{ keys: 'Ctrl + K', action: 'Insert Hyperlink' }],
    commonMistakes: [
      'Linking to a local video file without copying it into the presentation folder (embed media or test on the classroom PC first).',
    ],
    tryIt: 'Create a 3-slide menu using Summary Zoom or Action Buttons (Home, Next, Previous) and test navigation in Slide Show view.',
  },
  {
    id: '2.6',
    moduleId: 'powerpoint',
    code: '2.6',
    title: 'Transitions and animations',
    duration: '50 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Apply consistent slide transitions including Morph.',
      'Distinguish Entrance, Emphasis, Exit and Motion Path animations.',
      'Use the Animation Pane, By Paragraph timing and Triggers.',
    ],
    sections: [
      {
        heading: 'Transitions vs Animations',
        paragraphs: [
          'Transitions (between slides): Transitions tab ▸ choose Fade, Push, Wipe, Morph, etc.; Effect Options; Duration; Sound; Advance Slide On Mouse Click or After 00:05; Apply To All. Morph transition: duplicate a slide, move/resize objects on the second copy, apply Morph to the second slide — objects move smoothly.',
        ],
        table: {
          headers: ['Animation Type', 'Colour in gallery', 'Example'],
          rows: [
            ['Entrance', 'Green', 'Appear, Fade, Fly In, Wipe'],
            ['Emphasis', 'Yellow', 'Pulse, Grow/Shrink, Spin'],
            ['Exit', 'Red', 'Disappear, Fade Out, Fly Out'],
            ['Motion Paths', 'Lines', 'Lines, Arcs, Custom Path'],
          ],
        },
        steps: [
          { detail: 'Select an object ▸ Animations ▸ choose an effect.', ribbonPath: 'Animations ▸ Add' },
          { detail: 'Effect Options ▸ direction or "By Paragraph" (bullets appear one by one).' },
          { detail: 'Start: On Click / With Previous / After Previous; set Duration and Delay.' },
          { detail: 'Animations ▸ Animation Pane to reorder, preview and fine-tune.', ribbonPath: 'Animations ▸ Animation Pane' },
          { detail: 'Use Add Animation (not the main gallery) to add a second effect to the same object; Animation Painter copies timing to another object.' },
          { detail: 'Triggers: Animation Pane ▸ effect ▸ Timing ▸ Triggers ▸ start on click of a specific shape.' },
        ],
        callout: {
          type: 'warning',
          title: 'Restraint rule',
          body: 'Animation must support the message — use one or two simple effects consistently; avoid loud sound effects and spinning text in academic or business talks.',
        },
      },
    ],
    commonMistakes: [
      'Replacing an existing animation instead of clicking "Add Animation" when adding a second effect.',
      'Putting flashy Bounce or Swivel effects with sound on every bullet point.',
    ],
    tryIt: 'Apply a subtle Fade transition to all slides, animate a bulleted list "By Paragraph" On Click, and build a 2-slide Morph demo.',
  },
  {
    id: '2.7',
    moduleId: 'powerpoint',
    code: '2.7',
    title: 'Slide Master, speaker notes and slide numbers',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Edit the Slide Master to enforce consistent fonts, colours and logos.',
      'Configure slide numbers, dates and footers cleanly.',
      'Write speaker notes and save reusable templates (.potx).',
    ],
    sections: [
      {
        heading: 'Mastering consistency',
        steps: [
          { detail: 'View ▸ Slide Master. The top (largest) slide controls all layouts; the smaller indented slides control individual layouts.', ribbonPath: 'View ▸ Slide Master' },
          { detail: 'Change fonts, colours, background, or insert a logo (e.g. BAUST logo) once on the top master — it appears on every slide.' },
          { detail: 'Insert ▸ Header & Footer ▸ tick Date and time, Slide number, Footer text ("CSE 1204 | Your Name"), and Don’t show on title slide ▸ Apply to All.', ribbonPath: 'Insert ▸ Header & Footer' },
          { detail: 'Close Master View to return to Normal editing.' },
          { detail: 'Type speaker notes in the Notes pane (View ▸ Notes if hidden).' },
          { detail: 'Save your design as a reusable template: File ▸ Save As ▸ PowerPoint Template (.potx).' },
        ],
      },
    ],
    commonMistakes: [
      'Editing one of the child layout masters instead of the top parent master when trying to put a logo on every slide.',
      'Forgetting to click "Close Master View" and accidentally deleting master placeholders.',
    ],
    tryIt: 'Open Slide Master, add a header strip with a small square logo icon and your course footer, close Master View, and verify it appears on new slides.',
  },
  {
    id: '2.8',
    moduleId: 'powerpoint',
    code: '2.8',
    title: 'Presenting, printing handouts and good design rules',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Control a live presentation fluently using Slide Show shortcuts.',
      'Rehearse timings, export videos/PDFs and print 3-up note handouts.',
      'Structure an academic or business presentation effectively.',
    ],
    sections: [
      {
        heading: 'Delivering, exporting & design principles',
        paragraphs: [
          'Slide Show ▸ Rehearse Timings helps practise pace; Record ▸ Record Slide Show creates a narrated video. Slide Show ▸ Set Up Slide Show ▸ Browsed at a kiosk loops slides automatically.',
          'File ▸ Export ▸ Create a Video (.mp4) or Create PDF. File ▸ Print ▸ Full Page Slides / Notes Pages / Outline / Handouts (3 slides per page includes ruled lines for audience notes).',
          'Good design principles: one idea per slide; consistent theme and fonts; high contrast (dark text on light background works best in bright rooms); clean alignment; generous white space; visuals over walls of text; cite sources; end with Summary and "Thank you / Questions".',
          'Presentation structure: Title slide (topic, name, ID, course, date) → Outline → Introduction → 3–5 content slides → Conclusion → References → Questions. Plan roughly 1 minute per slide.',
        ],
      },
    ],
    shortcuts: [
      { keys: 'F5 / Shift + F5', action: 'Start show from beginning / current slide' },
      { keys: 'Space, Enter, → / ←', action: 'Next / previous slide' },
      { keys: 'Number + Enter', action: 'Jump directly to slide n' },
      { keys: 'B / W', action: 'Black screen / White screen pause' },
      { keys: 'Ctrl + L / Ctrl + P', action: 'Laser pointer / Pen during show' },
      { keys: 'E', action: 'Erase pen ink on slide' },
      { keys: 'Esc', action: 'End Slide Show' },
    ],
    commonMistakes: [
      'Reading every word on the slide word-for-word instead of speaking from Speaker Notes.',
      'Printing Full Page Slides when distributing audience handouts (use 3 or 6 slides per page).',
    ],
    tryIt: 'Practise presenting a 5-slide deck in Presenter View using B (black screen), Laser Pointer (Ctrl+L), and direct slide jump (3 + Enter).',
  },
  {
    id: '2.9',
    moduleId: 'powerpoint',
    code: '2.9',
    title: 'Business presentations: sales report and pitch deck',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Structure a monthly sales report presentation and a business pitch deck.',
      'Paste Excel charts and tables into PowerPoint correctly (linked, embedded or picture).',
      'Present numbers clearly with one message per slide.',
    ],
    sections: [
      {
        heading: 'Deck blueprints',
        paragraphs: [
          'A business audience (manager, investor, customer) wants the answer first. Every slide title should state the message ("Rajshahi region produced 48% of October sales"), not just the topic ("Sales by region").',
        ],
        table: {
          headers: ['Deck', 'Suggested slides'],
          rows: [
            ['Monthly sales report (8 slides)', '1 Title · 2 Agenda · 3 Key numbers (3–4 KPI boxes: total sales, growth %, top region, top product) · 4 Trend chart (line) · 5 Share chart (pie or bar by region) · 6 Detail table (top 5 customers) · 7 Insights and risks · 8 Recommendations and next steps'],
            ['Pitch deck (10 slides)', '1 Title and one-line idea · 2 Problem · 3 Solution · 4 Market size · 5 Product / demo · 6 Business model (how you earn) · 7 Competition · 8 Marketing plan · 9 Financial summary (revenue, cost, profit, break-even) · 10 The ask and contact'],
          ],
        },
      },
      {
        heading: 'Putting Excel data into PowerPoint',
        steps: [
          { detail: 'In Excel, select the chart (or range) ▸ Ctrl + C.' },
          { detail: 'In PowerPoint ▸ Home ▸ Paste ▾ and choose one of three options:', ribbonPath: 'Home ▸ Paste Special' },
          { detail: '• Use Destination Theme & Link Data (takes slide colours and updates when Excel changes).' },
          { detail: '• Keep Source Formatting & Embed Workbook (keeps Excel look; data travels inside the .pptx).' },
          { detail: '• Picture (fixed image; best when numbers must not change or when emailing).' },
          { detail: 'Edit embedded/linked chart data anytime via right-click chart ▸ Edit Data. Keep slide tables to at most 5 rows × 4 columns.' },
        ],
        callout: {
          type: 'business',
          title: 'Rules for numbers on slides',
          body: 'Round to what the audience needs (৳ 5.8 lakh, not ৳ 579,577.50); keep units and decimals consistent; highlight the single bar that matters in accent colour; remove heavy gridlines and 3-D effects; cite the source and period.',
        },
      },
    ],
    shortcuts: [
      { keys: 'F5 / Shift + F5', action: 'Start from beginning / current slide' },
      { keys: 'B / W', action: 'Black / white screen' },
      { keys: 'Ctrl + click and hold', action: 'Laser pointer' },
    ],
    commonMistakes: [
      'Dumping an entire raw Excel sheet onto a slide.',
      'Tiny chart labels (< 14 pt) and missing units (৳) or titles.',
      'Leaving topic-only headings ("Sales Chart") instead of insight titles ("Rajshahi led October with 48% share").',
    ],
    tryIt: 'Build a 6-slide sales report from your Lab 11 workbook (title, key numbers, line chart, pie chart, top-5 table, recommendation) and a one-slide break-even summary pasted as a linked Excel chart.',
  },

  // ================= MODULE 3: EXCEL FOUNDATIONS =================
  {
    id: '3.1',
    moduleId: 'excel-foundations',
    code: '3.1',
    title: 'Excel interface: workbook, worksheet, cell, range',
    duration: '30 min',
    difficulty: 'Beginner',
    outcomes: [
      'Name the parts of the Excel window and explain workbook, worksheet, cell, address and range.',
      'Navigate quickly with the keyboard and the Name Box.',
      'Add, rename, colour, move and delete worksheets.',
    ],
    sections: [
      {
        heading: 'Workbook, worksheet, cell & range',
        paragraphs: [
          'Workbook: the whole .xlsx file. Worksheet: one sheet (tabs at the bottom: Sheet1, Sheet2…). A new workbook starts with one sheet; add more with the + button.',
          'Columns are letters (A … XFD, 16,384 columns); rows are numbers (1 … 1,048,576). A Cell is the box where a row and column meet. Its address is column + row, e.g. B3. The active cell has a green border. A Range is a block written first:last, e.g. A1:D10.',
          'The Name Box (left of the formula bar) shows the active cell or lets you jump to a cell or named range. The Formula Bar shows the real formula or typed content. The Status Bar at the bottom shows Average, Count, and Sum of selected numbers automatically.',
          'Sheet tabs: double-click to rename; right-click ▸ Tab Color, Move or Copy, Hide, Delete; drag to reorder.',
          'File types: .xlsx (normal workbook), .xlsm (with macros), .xls (old format), .csv (plain text, one sheet, no formatting), .xltx (template), .pdf (export).',
        ],
        ribbon: {
          app: 'Excel',
          activeTab: 'Home',
          tabs: ['File', 'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View'],
          groups: [
            { name: 'Clipboard', commands: ['Paste', 'Copy', 'Format Painter'] },
            { name: 'Font', commands: ['Calibri', '11', 'B', 'Borders', 'Fill'] },
            { name: 'Alignment', commands: ['Wrap Text', 'Merge & Center'] },
            { name: 'Number', commands: ['General', '৳', '%', ','], highlighted: true },
          ],
        },
      },
    ],
    shortcuts: [
      { keys: 'Arrow / Enter / Tab', action: 'Move one cell' },
      { keys: 'Ctrl + Home / Ctrl + End', action: 'Go to A1 / last used cell' },
      { keys: 'Ctrl + Arrow', action: 'Jump to edge of data region' },
      { keys: 'Ctrl + Shift + Arrow', action: 'Select to edge of data region' },
      { keys: 'Ctrl + Page Down / Up', action: 'Next / previous worksheet tab' },
      { keys: 'F5 or Ctrl + G', action: 'Go To cell (or type in Name Box)' },
      { keys: 'Ctrl + Space / Shift + Space', action: 'Select entire column / row' },
    ],
    commonMistakes: [
      'Confusing a workbook (.xlsx file) with a worksheet (individual tab).',
      'Saving a multi-sheet workbook as .csv and losing all other sheets and formulas.',
    ],
    tryIt: 'Open a new workbook, rename Sheet1 to Sales, add sheets Price List and Summary, colour the tabs, jump to Z100 with the Name Box, then return with Ctrl + Home.',
    playgroundHint: { label: 'Open blank grid in Excel Lab', tool: 'playground' },
  },
  {
    id: '3.2',
    moduleId: 'excel-foundations',
    code: '3.2',
    title: 'Entering and editing data, AutoFill, Flash Fill, data validation',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Enter text, numbers and dates correctly and recognise how Excel stores each.',
      'Use AutoFill, Flash Fill and data validation to enter data quickly and safely.',
      'Insert, delete, hide and freeze rows and columns.',
    ],
    sections: [
      {
        heading: 'Data types, AutoFill, Flash Fill & Data Validation',
        paragraphs: [
          'Data types: Text (left-aligned by default), Numbers (right-aligned), Dates and times (stored as serial numbers where 1 Jan 1900 = 1), Logical (TRUE/FALSE), Formulas (start with =).',
          'AutoFill: type a value or pattern (1, 2 or Jan or INV-1001, INV-1002), select both cells, drag the green fill handle at the bottom-right corner. Double-click the fill handle to fill down beside adjacent data.',
          'Flash Fill (Ctrl + E): type one example (e.g. first name from a full name) in the adjacent column; press Ctrl + E and Excel fills the pattern.',
          'Freeze headings: View ▸ Freeze Panes ▸ Freeze Top Row keeps column headings visible while scrolling.',
          'Data validation: Data ▸ Data Validation. Settings: Whole number (0 to 100), Decimal, Date, or List (e.g. Dhaka,Rangpur,Rajshahi,Bogura) for a drop-down menu. Use Input Message and Error Alert tabs to prevent mistakes.',
        ],
        callout: {
          type: 'tip',
          title: 'Good layout rules for business tables',
          body: 'One header row; one record per row; one fact per column; no blank rows/columns inside data; no merged cells in a data table; dates as real dates; numbers without units (put units like "(৳)" in the header).',
        },
      },
      {
        heading: 'Worked example: Dataset 1 first rows',
        worksheet: {
          title: 'Sales Register (Dataset 1)',
          caption: 'Type INV-1001 & INV-1002, select both and drag fill handle down. Add Data Validation List on Region.',
          columns: ['Inv No', 'Date', 'Customer', 'Product', 'Category', 'Region', 'Qty', 'Unit Price (৳)', 'Disc %'],
          rows: [
            ['INV-1001', '01-Oct-2026', 'Alam Traders', 'Printer Paper (ream)', 'Stationery', 'Rangpur', 40, 480, 0],
            ['INV-1002', '02-Oct-2026', 'Barnali Store', 'Office Chair', 'Furniture', 'Dhaka', 6, 6500, 5],
          ],
          highlightCells: ['A2', 'A3', 'F2'],
        },
      },
    ],
    shortcuts: [
      { keys: 'F2 / Alt + Enter', action: 'Edit cell / New line inside cell' },
      { keys: 'Ctrl + ; / Ctrl + Shift + ;', action: "Insert today's date / current time" },
      { keys: 'Ctrl + D / Ctrl + R', action: 'Fill down / Fill right' },
      { keys: 'Ctrl + E', action: 'Flash Fill' },
      { keys: 'Ctrl + Alt + V', action: 'Paste Special' },
      { keys: 'Ctrl + Enter', action: 'Fill all selected cells with same entry' },
    ],
    commonMistakes: [
      'Typing units or Bangla digits inside number cells ("50 pcs", ৫০, or leading apostrophe) so formulas fail.',
      'Typing dates with dots (1.10.26) so Excel treats them as text.',
      'Leaving blank rows or merged cells inside a data table.',
    ],
    tryIt: 'Type the first 10 rows of Dataset 1, AutoFill invoice numbers, add a drop-down list for Region, freeze the top row, and validate Qty (whole numbers 1 to 500).',
    playgroundHint: { label: 'Load Dataset 1 in Playground', datasetId: 'dataset-1', tool: 'playground' },
  },
  {
    id: '3.3',
    moduleId: 'excel-foundations',
    code: '3.3',
    title: 'Formatting cells, number formats (৳), conditional formatting',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Format fonts, alignment, borders and fills for a clean business worksheet.',
      'Apply number formats for Taka currency (৳), percentage, date and thousands separators.',
      'Use conditional formatting to highlight key values automatically.',
    ],
    sections: [
      {
        heading: 'Number formats, Taka (৳) & Conditional Formatting',
        paragraphs: [
          'Number formatting changes ONLY how a value looks, never the stored number behind it (a cell displaying 12.35 may still hold 12.3456). Open Format Cells with Ctrl + 1.',
          'Taka format: Ctrl + 1 ▸ Number ▸ Custom ▸ type "৳ "#,##0 (no decimals) or "৳ "#,##0.00. For South Asian lakh/crore grouping (12,34,567), use [>=10000000]##\\,##\\,##\\,##0;[>=100000]##\\,##\\,##0;##,##0 or set Windows Region to Bangladesh.',
          'Alignment: left for text, right for numbers, centre for headers; Wrap Text for long headings; avoid Merge & Center inside tables (use Center Across Selection).',
          'Conditional formatting (Home ▸ Conditional Formatting): Highlight Cells Rules (Greater Than, Duplicate Values), Top/Bottom Rules, Data Bars, Color Scales, and Formula rules such as =$H2="Overdue" to highlight an entire row.',
          '##### in a cell means the column is too narrow — double-click the column border to AutoFit.',
        ],
        callout: {
          type: 'business',
          title: 'Worked example (Dataset 1)',
          body: 'Select the Net column ▸ Conditional Formatting ▸ Highlight Cells Rules ▸ Greater Than 50000 ▸ Light Red Fill. Four invoices highlight automatically: INV-1003, INV-1009, INV-1010, INV-1016.',
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + 1', action: 'Open Format Cells dialog' },
      { keys: 'Ctrl + Shift + 1 / 5 / 4', action: 'Number / Percent / Currency format' },
      { keys: 'Ctrl + Shift + 3', action: 'Date format' },
      { keys: 'Ctrl + Shift + 7', action: 'Apply thin outline border' },
    ],
    commonMistakes: [
      'Typing "৳" or "Tk" directly into a number cell (turns the number into text; always use Format Cells!).',
      'Formatting to 0 decimals and wondering why printed totals appear off by 1 (use ROUND for financial rounding).',
    ],
    tryIt: 'Format Dataset 1: dark blue header with white bold text, dates as dd-mmm-yyyy, Unit Price as "৳ "#,##0, thin borders, and a Data Bar on Qty.',
    playgroundHint: { label: 'Try formatting in Playground', datasetId: 'dataset-1', tool: 'playground' },
  },
  {
    id: '3.4',
    moduleId: 'excel-foundations',
    code: '3.4',
    title: 'Formulas and operators, order of operations, error values',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Write formulas starting with = using cell references instead of hard-coded numbers.',
      'Apply BODMAS / PEMDAS order of operations accurately.',
      'Recognise and fix standard Excel error values.',
    ],
    sections: [
      {
        heading: 'Operators & BODMAS order',
        paragraphs: [
          'Every formula begins with =. Point mode lets you click cells while typing a formula. BODMAS order: Brackets → Power (^) → Multiplication/Division (* /) left to right → Addition/Subtraction (+ -). Example: =10+5*2 gives 20, whereas =(10+5)*2 gives 30.',
        ],
        table: {
          headers: ['Operator', 'Meaning', 'Example'],
          rows: [
            ['+ / - / * / /', 'Add, Subtract, Multiply, Divide', '=A1+B1'],
            ['^', 'Power / Exponent', '=A1^2'],
            ['%', 'Percent (divides by 100)', '=A1*10%'],
            ['&', 'Join (concatenate) text', '=A1&" "&B1'],
            ['= > < >= <= <>', 'Comparison (TRUE/FALSE)', '=A1>=40'],
          ],
        },
      },
      {
        heading: 'Worked business example (Dataset 1)',
        formulas: [
          { formula: '=G2*H2', explanation: 'Column J (Gross) = Qty × Unit Price', result: '19,200 (Row 2)', datasetId: 'dataset-1' },
          { formula: '=J2*I2/100', explanation: 'Column K (Discount ৳) = Gross × Disc % ÷ 100', result: '0 (Row 2) · 1,950 (Row 3)', datasetId: 'dataset-1' },
          { formula: '=J2-K2', explanation: 'Column L (Net) = Gross − Discount', result: '19,200 (Row 2) · 37,050 (Row 3)', datasetId: 'dataset-1' },
        ],
      },
      {
        heading: 'Common Excel error values',
        table: {
          headers: ['Error', 'Meaning', 'Fix'],
          rows: [
            ['#DIV/0!', 'Dividing by zero or an empty cell', 'Check divisor or wrap with IFERROR'],
            ['#VALUE!', 'Wrong data type (text in arithmetic)', 'Remove text/spaces from numbers'],
            ['#NAME?', 'Misspelled function or unquoted text', 'Fix spelling, add "quotes"'],
            ['#REF!', 'Referenced cell was deleted', 'Rebuild cell reference'],
            ['#N/A', 'Lookup value not found', 'Check value & lookup range'],
            ['#NUM!', 'Invalid numeric operation (e.g. SQRT(-1))', 'Check input values'],
            ['#####', 'Column too narrow or negative date', 'Widen column'],
          ],
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + `', action: 'Toggle Show Formulas / Results' },
      { keys: 'Shift + F3', action: 'Insert Function dialog' },
      { keys: 'F9', action: 'Recalculate workbook' },
    ],
    commonMistakes: [
      'Hard-coding numbers (=40*480) instead of referencing cells (=G2*H2).',
      'Typing x instead of * for multiplication.',
      'Cell formatted as Text before typing =formula (change format to General, press F2 then Enter).',
    ],
    tryIt: 'In Dataset 1 compute Gross (=G2*H2), Discount (=J2*I2/100), and Net (=J2-K2) for all 20 rows. Verify Total Gross is 610,850.',
    playgroundHint: { label: 'Open Error Spotter & Dataset 1', datasetId: 'dataset-1', tool: 'errors' },
  },
  {
    id: '3.5',
    moduleId: 'excel-foundations',
    code: '3.5',
    title: 'Cell references: relative, absolute, mixed; named ranges; other sheets',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Predict how relative, absolute and mixed references behave when copied.',
      'Lock rates and constants using $ and the F4 key.',
      'Use Named Ranges and cross-sheet references.',
    ],
    sections: [
      {
        heading: 'The four reference types',
        table: {
          headers: ['Type', 'Written', 'What happens when copied'],
          rows: [
            ['Relative', 'A1', 'Both column and row change'],
            ['Absolute', '$A$1', 'Nothing changes (fixed cell)'],
            ['Mixed (row fixed)', 'A$1', 'Column changes, row fixed'],
            ['Mixed (column fixed)', '$A1', 'Row changes, column fixed'],
          ],
        },
        callout: {
          type: 'bangla',
          title: 'বাংলা টিপস (Bangla Hint)',
          body: 'যেই সেলটি কপি করার সময় নড়বে না (যেমন VAT 15% এর ঘর), তার আগে $ চিহ্ন বসাতে F4 চাপুন। মনে রাখুন: $ মানে তালা (Lock)!',
        },
      },
      {
        heading: 'Worked example 1 (Absolute): VAT in an input cell',
        worksheet: {
          title: 'Assumptions & Sales VAT',
          caption: 'Put VAT rate (15%) in Q2. In M2 write =L2*$Q$2 and fill down.',
          columns: ['L (Net)', 'M (VAT Formula)', 'P (Label)', 'Q (Rate)'],
          rows: [
            [19200, '=L2*$Q$2', 'VAT rate', '15%'],
            [37050, '=L3*$Q$2', 'Bonus disc', '2%'],
          ],
          highlightCells: ['D1', 'B1', 'B2'],
          startRow: 2,
        },
        formulas: [
          { formula: '=L2*$Q$2', explanation: 'L2 shifts to L3, L4 as you drag down, while $Q$2 stays locked on 15% VAT.', result: '2,880.00 (Row 2)', datasetId: 'dataset-1' },
          { formula: '=$A2*B$1', explanation: 'Mixed reference for a 2D multiplication/pricing grid: column A locked, row 1 locked.', result: 'Cross-table fill' },
          { formula: "='Price List'!$C$2", explanation: 'Cross-sheet reference (use single quotes if the sheet name has a space).' },
        ],
      },
    ],
    shortcuts: [{ keys: 'F4', action: 'Cycle reference locks (A1 → $A$1 → A$1 → $A1)' }],
    commonMistakes: [
      'Forgetting $ on a rate cell so row 3 multiplies by an empty cell below the rate and gives 0.',
      'Locking everything with $A$1 when only the row or column should be fixed in a 2D table.',
    ],
    tryIt: 'In Dataset 1 place 15% in Q2, name it VAT_Rate (Formulas ▸ Define Name), and compute VAT (=ROUND(L2*VAT_Rate,2)) and Total (=L2+M2) across all 20 rows.',
    playgroundHint: { label: 'Launch Reference Visualiser', tool: 'references', formula: '=B2*$E$1' },
  },
  {
    id: '3.6',
    moduleId: 'excel-foundations',
    code: '3.6',
    title: 'Basic functions: SUM, AVERAGE, MIN, MAX, COUNT, ROUND, text & date basics',
    duration: '50 min',
    difficulty: 'Beginner',
    outcomes: [
      'Calculate totals, averages, extremes, counts and ranks accurately.',
      'Round monetary amounts using ROUND, ROUNDUP and ROUNDDOWN.',
      'Clean and extract text and read date components.',
    ],
    sections: [
      {
        heading: 'Essential business functions',
        table: {
          headers: ['Function', 'Purpose', 'Example'],
          rows: [
            ['SUM / AVERAGE', 'Total / Mean', '=SUM(L2:L21)'],
            ['MAX / MIN / MEDIAN', 'Highest / Lowest / Middle value', '=MAX(L2:L21)'],
            ['COUNT / COUNTA / COUNTBLANK', 'Count numbers / non-empty / empty cells', '=COUNTA(C2:C21)'],
            ['LARGE / SMALL / RANK.EQ', 'k-th largest / smallest / position rank', '=RANK.EQ(L2,$L$2:$L$21)'],
            ['ROUND / ROUNDUP / ROUNDDOWN', 'Round to n decimal places', '=ROUND(M2,2)'],
            ['UPPER / LOWER / PROPER / TRIM', 'Change case / remove extra spaces', '=PROPER(TRIM(C2))'],
            ['LEFT / RIGHT / MID / LEN', 'Extract text parts / length', '=LEFT(A2,3)'],
            ['TEXT / CONCAT / TEXTJOIN', 'Format number/date as text / join text', '=TEXT(B2,"mmm-yyyy")'],
            ['TODAY / NOW / DATE / MONTH', 'Current date / parts of a date', '=MONTH(B2)'],
          ],
        },
      },
      {
        heading: 'Worked example (Dataset 1 answer key)',
        formulas: [
          { formula: '=SUM(J2:J21)', explanation: 'Total gross sales across all 20 invoices', result: '610,850', datasetId: 'dataset-1' },
          { formula: '=SUM(L2:L21)', explanation: 'Total net sales after discounts', result: '579,577.50', datasetId: 'dataset-1' },
          { formula: '=ROUND(AVERAGE(L2:L21),2)', explanation: 'Average Net per invoice rounded to 2 decimals', result: '28,978.88', datasetId: 'dataset-1' },
          { formula: '=MAX(L2:L21)', explanation: 'Largest invoice Net (INV-1009)', result: '111,600', datasetId: 'dataset-1' },
          { formula: '=MIN(L2:L21)', explanation: 'Smallest invoice Net (INV-1006)', result: '5,500', datasetId: 'dataset-1' },
          { formula: '=COUNTA(A2:A21)', explanation: 'Number of invoices', result: '20', datasetId: 'dataset-1' },
        ],
        callout: {
          type: 'warning',
          title: 'Rounding rule for money',
          body: 'ROUND changes the stored value; formatting changes only the display. Always round each VAT or payroll deduction line with =ROUND(..., 2) so printed line items add up to the grand total.',
        },
      },
    ],
    shortcuts: [
      { keys: 'Alt + =', action: 'AutoSum' },
      { keys: "Ctrl + '", action: 'Copy formula from cell above' },
    ],
    commonMistakes: [
      'Including the Total cell inside its own SUM range (Circular Reference).',
      'Using COUNT on text columns like Customer Name (returns 0 — use COUNTA).',
      'Writing =B2+B3+B4+...+B21 instead of =SUM(B2:B21).',
    ],
    tryIt: 'Complete Dataset 1 summary totals, add a Month column (=TEXT(B2,"mmm-yyyy")), clean a spaced name with =PROPER(TRIM(C2)), and rank invoices with RANK.EQ.',
    playgroundHint: { label: 'Practice Basic Drills (1–8)', datasetId: 'dataset-1', tool: 'drills' },
  },
];
