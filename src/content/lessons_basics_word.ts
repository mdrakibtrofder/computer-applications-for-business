import { Lesson } from '../types/course';

export const LESSONS_BASICS_WORD: Lesson[] = [
  // ================= MODULE 0 =================
  {
    id: '0.1',
    moduleId: 'basics',
    code: '0.1',
    title: 'Computer basics: hardware, software, input/output, storage units',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Define a computer and describe the Input–Process–Output–Storage cycle.',
      'Distinguish hardware from software, and system software from application software.',
      'Name common input, output and storage devices.',
      'Convert between storage units (bit, byte, KB, MB, GB, TB).',
    ],
    sections: [
      {
        heading: 'How a computer works',
        paragraphs: [
          'A computer is an electronic machine that accepts data (input), processes it according to instructions (program), produces results (output) and stores data for later use. Data is raw facts; information is processed, meaningful data.',
          'The basic organization has five units: Input unit, Central Processing Unit (CPU: Control Unit + Arithmetic Logic Unit), Memory unit (primary memory: RAM and ROM), Output unit, and Secondary storage (HDD, SSD, pen drive).',
        ],
        table: {
          headers: ['Category', 'Examples'],
          rows: [
            ['Input devices', 'Keyboard, mouse, scanner, microphone, webcam, touchscreen, OMR/OCR reader'],
            ['Output devices', 'Monitor, printer, speaker, projector, headphones'],
            ['Storage devices', 'Hard disk (HDD), Solid state drive (SSD), USB pen drive, memory card, DVD, cloud storage'],
            ['System software', 'Operating systems: Windows, macOS, Linux, Android; device drivers; utilities'],
            ['Application software', 'MS Word, PowerPoint, Excel, web browsers, media players, Zoom'],
          ],
        },
      },
      {
        heading: 'Storage units & memory',
        paragraphs: [
          'RAM is temporary (volatile) working memory; its data is lost when power goes off. ROM is permanent and holds start-up instructions. Secondary storage keeps files permanently.',
        ],
        table: {
          headers: ['Unit', 'Equals'],
          rows: [
            ['1 Bit', '0 or 1 (binary digit)'],
            ['1 Byte', '8 bits (one character)'],
            ['1 Kilobyte (KB)', '1024 bytes'],
            ['1 Megabyte (MB)', '1024 KB'],
            ['1 Gigabyte (GB)', '1024 MB'],
            ['1 Terabyte (TB)', '1024 GB'],
          ],
        },
        callout: {
          type: 'bangla',
          title: 'বাংলা টিপস (Bangla Hint)',
          body: 'RAM হলো কাজের টেবিলের মতো—কারেন্ট চলে গেলে টেবিল খালি হয়ে যায়। আর Hard Disk বা SSD হলো আলমারির মতো—ফাইল স্থায়ীভাবে জমা থাকে।',
        },
      },
    ],
    commonMistakes: [
      'Calling the whole system box the "CPU" (the CPU is the processor chip inside).',
      'Confusing RAM size (e.g. 8 GB working memory) with storage size (e.g. 512 GB SSD).',
    ],
    tryIt: 'Open Settings ▸ System ▸ About and write down your computer’s processor, installed RAM and Windows edition.',
  },
  {
    id: '0.2',
    moduleId: 'basics',
    code: '0.2',
    title: 'Windows essentials: desktop, taskbar, Start menu, windows',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Start, sign in to, lock, restart and shut down Windows safely.',
      'Identify desktop, taskbar, Start menu, notification area and icons.',
      'Open, move, resize, minimize, maximize and switch between windows.',
    ],
    sections: [
      {
        heading: 'Navigating Windows 10/11',
        paragraphs: [
          'The Desktop is the main screen with icons and wallpaper. The Taskbar is the bar at the bottom with the Start button, search, pinned and open apps, clock and notification area.',
        ],
        steps: [
          { detail: 'Open an app: click Start, type the app name (e.g. "Word"), and press Enter.', ribbonPath: 'Start ▸ Search' },
          { detail: 'Control any window from the top-right buttons: Minimize (–), Maximize/Restore (□), Close (×).' },
          { detail: 'Snap windows side by side: drag a window to the left or right screen edge, or press Windows + Left/Right arrow.' },
          { detail: 'Shut down properly: Start ▸ Power ▸ Shut down. Never switch off the power directly; unsaved work and the system can be damaged.', ribbonPath: 'Start ▸ Power ▸ Shut down' },
        ],
      },
    ],
    shortcuts: [
      { keys: 'Windows key', action: 'Open Start menu' },
      { keys: 'Alt + Tab', action: 'Switch between open apps' },
      { keys: 'Windows + D', action: 'Show desktop' },
      { keys: 'Windows + E', action: 'Open File Explorer' },
      { keys: 'Windows + L', action: 'Lock the computer' },
      { keys: 'Alt + F4', action: 'Close current app' },
      { keys: 'Ctrl + Shift + Esc', action: 'Task Manager (when an app is not responding)' },
      { keys: 'Windows + Shift + S', action: 'Screenshot of selected area' },
    ],
    commonMistakes: [
      'Switching off the power outlet without using Start ▸ Shut down.',
      'Leaving your university lab account unlocked when stepping away (always press Windows + L).',
    ],
    tryIt: 'Open Word and File Explorer, snap them side by side, then lock and unlock the computer.',
  },
  {
    id: '0.3',
    moduleId: 'basics',
    code: '0.3',
    title: 'File and folder management, File Explorer, naming and saving',
    duration: '60 min',
    difficulty: 'Beginner',
    outcomes: [
      'Create, rename, copy, move and delete files and folders.',
      'Understand drives, folders, file paths and file extensions.',
      'Save files in an organised folder structure and find them again.',
    ],
    sections: [
      {
        heading: 'Drives, paths, and extensions',
        paragraphs: [
          'A file is a named collection of data (a document, picture, or workbook). A folder holds files and other folders. A drive is a storage device such as C: or a pen drive (E:). A path shows the exact location, e.g. D:\\BAUST\\CSE1204\\Lab01\\MyCV.docx. The extension after the dot identifies the file type.',
        ],
        table: {
          headers: ['Extension', 'File type'],
          rows: [
            ['.docx', 'Word document'],
            ['.pptx', 'PowerPoint presentation'],
            ['.xlsx', 'Excel workbook'],
            ['.pdf', 'Portable Document Format'],
            ['.jpg / .png', 'Image'],
            ['.mp4 / .mp3', 'Video / audio'],
            ['.zip', 'Compressed folder'],
          ],
        },
      },
      {
        heading: 'Managing files step by step',
        steps: [
          { detail: 'Create a folder: open File Explorer (Windows + E) ▸ go to D: drive ▸ right-click empty space ▸ New ▸ Folder ▸ type CSE1204_YourID ▸ Enter.', ribbonPath: 'File Explorer ▸ New ▸ Folder' },
          { detail: 'Rename: select the item ▸ press F2 ▸ type new name ▸ Enter.' },
          { detail: 'Copy: select ▸ Ctrl + C ▸ open destination ▸ Ctrl + V.' },
          { detail: 'Move: select ▸ Ctrl + X ▸ open destination ▸ Ctrl + V (or drag with the mouse).' },
          { detail: 'Delete: select ▸ Delete key (goes to Recycle Bin). Restore from Recycle Bin if needed. Shift + Delete removes permanently.' },
          { detail: 'Select many files: Ctrl + click for separate files, Shift + click for a range, Ctrl + A for all.' },
          { detail: 'Compress: right-click folder ▸ Compress to ZIP file (Windows 11) or Send to ▸ Compressed (zipped) folder.' },
          { detail: 'Search: type in the search box at the top-right of File Explorer.' },
        ],
        callout: {
          type: 'tip',
          title: 'Good naming rules',
          body: 'Use StudentID_Lab01_Topic.docx; avoid leading spaces, forbidden symbols (/ \\ : * ? " < > |), and vague names like "New Document (3)".',
        },
      },
    ],
    commonMistakes: [
      'Saving everything to Downloads or Desktop where lab PCs may wipe files.',
      'Forgetting where a file was saved (always check the Save As folder path).',
      'Unplugging a USB pen drive without clicking Eject.',
    ],
    tryIt: 'Create CSE1204_YourID with subfolders Word, PowerPoint, Excel and Labs. Create a blank Word file inside Word, rename it, copy it to Labs, then zip the main folder.',
  },
  {
    id: '0.4',
    moduleId: 'basics',
    code: '0.4',
    title: 'Keyboard, mouse and touch typing basics',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Name the main key groups and their uses.',
      'Use mouse actions: click, double-click, right-click, drag, scroll.',
      'Place fingers on the home row and practise touch typing.',
    ],
    sections: [
      {
        heading: 'Key groups and mouse actions',
        paragraphs: [
          'Key groups include alphabet and number keys; function keys F1–F12 (F1 help, F2 rename, F5 refresh/start slideshow, F7 spelling, F12 Save As in Office); modifier keys Ctrl, Alt, Shift, Windows; navigation keys Home, End, Page Up, Page Down, arrows; editing keys Backspace (deletes left), Delete (deletes right), Insert, Enter, Tab, Caps Lock, Esc.',
          'Mouse actions: single click selects; double-click opens; right-click shows the context menu; drag moves or selects; scroll wheel moves up/down; Ctrl + scroll zooms.',
        ],
      },
      {
        heading: 'Touch typing posture',
        paragraphs: [
          'Left fingers rest on A S D F, right fingers on J K L ; with thumbs on Space. The F and J keys have small tactile bumps to find position without looking. Target for this course: 25+ words per minute with 90%+ accuracy by the end of the semester.',
        ],
        callout: {
          type: 'bangla',
          title: 'বাংলা টিপস (Bangla Hint)',
          body: 'F আর J বাটনে ছোট উঁচু দাগ থাকে। না তাকিয়ে ওই দুই দাগে তর্জনী আঙুল রাখাই টাইপিং শেখার প্রথম নিয়ম।',
        },
      },
    ],
    commonMistakes: [
      'Confusing Backspace (erases to the left) and Delete (erases to the right).',
      'Looking down at the keyboard instead of feeling the F and J home-row bumps.',
    ],
    tryIt: 'Spend 10 minutes daily on a free typing tutor (see Resources page) and record your WPM speed each week.',
  },
  {
    id: '0.5',
    moduleId: 'basics',
    code: '0.5',
    title: 'Introduction to Microsoft Office and the Ribbon interface',
    duration: '30 min',
    difficulty: 'Beginner',
    outcomes: [
      'Name the main Office applications and what each is used for.',
      'Identify the common parts of the Office window.',
      'Use Backstage view to create, open, save, Save As and export files.',
    ],
    sections: [
      {
        heading: 'Core Office applications',
        table: {
          headers: ['Application', 'Used for', 'File extension'],
          rows: [
            ['Word', 'Letters, reports, CVs, assignments', '.docx'],
            ['PowerPoint', 'Slide presentations', '.pptx'],
            ['Excel', 'Tables of numbers, calculations, charts', '.xlsx'],
            ['Outlook', 'Email and calendar', '—'],
            ['OneNote', 'Digital notebook', '—'],
          ],
        },
      },
      {
        heading: 'Window anatomy & Backstage view',
        paragraphs: [
          'Common window parts: Title bar (file name), Quick Access Toolbar (Save, Undo, Redo), Ribbon with Tabs (Home, Insert, Design, Layout…), Groups inside each tab (e.g. Font group), Commands (buttons), Dialog box launcher (small arrow at a group’s corner), Work area, Status bar (page/word count, zoom slider), View buttons.',
          'Backstage view (File tab): New, Open, Info, Save, Save As, Print, Share, Export (Create PDF), Close, Options.',
          'Save vs Save As: Save (Ctrl + S) updates the current file. Save As (F12) creates a new copy with a new name, location or format. Turn on AutoSave when the file is on OneDrive.',
        ],
        ribbon: {
          app: 'Word',
          activeTab: 'Home',
          tabs: ['File', 'Home', 'Insert', 'Design', 'Layout', 'References', 'Mailings', 'Review', 'View'],
          groups: [
            { name: 'Clipboard', commands: ['Paste', 'Cut', 'Copy', 'Format Painter'] },
            { name: 'Font', commands: ['Calibri', '11', 'B', 'I', 'U'], highlighted: true },
            { name: 'Paragraph', commands: ['Bullets', 'Align', 'Spacing'] },
            { name: 'Styles', commands: ['Normal', 'Heading 1', 'Heading 2'] },
          ],
        },
        callout: {
          type: 'note',
          title: 'Free alternatives',
          body: 'You can practise similar tools using Microsoft 365 for the Web, Google Docs/Slides/Sheets, or LibreOffice.',
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + N', action: 'New file' },
      { keys: 'Ctrl + O', action: 'Open' },
      { keys: 'Ctrl + S', action: 'Save' },
      { keys: 'F12', action: 'Save As' },
      { keys: 'Ctrl + P', action: 'Print' },
      { keys: 'Ctrl + Z / Ctrl + Y', action: 'Undo / Redo' },
      { keys: 'Ctrl + C / X / V', action: 'Copy / Cut / Paste' },
      { keys: 'Ctrl + A', action: 'Select all' },
      { keys: 'Ctrl + F / Ctrl + H', action: 'Find / Replace' },
      { keys: 'Alt (then letters)', action: 'Show ribbon key tips' },
    ],
    commonMistakes: [
      'Using Save (Ctrl + S) when you actually wanted Save As (F12) to keep the original template untouched.',
    ],
    tryIt: 'Open Word, press Alt once to inspect the Ribbon key tips, then press F12 to save a test file to your CSE1204 folder.',
  },
  {
    id: '0.6',
    moduleId: 'basics',
    code: '0.6',
    title: 'Internet, email etiquette and safe computer use',
    duration: '30 min',
    difficulty: 'Beginner',
    outcomes: [
      'Search the web effectively and judge whether a source is reliable.',
      'Write a formal email with subject, greeting, body, closing and attachment.',
      'Follow basic cyber-safety and academic honesty rules.',
    ],
    sections: [
      {
        heading: 'Effective searching & formal email',
        paragraphs: [
          'Search tips: use specific keywords; put exact phrases in quotes ("mail merge in Word"); use site:edu to limit results; check author, date and organisation before trusting a page.',
        ],
        steps: [
          { detail: 'To: teacher’s official email; Cc if needed.' },
          { detail: 'Subject: clear and specific, e.g. CSE 1204 Lab 03 Submission – ID 2xxxxxxx.' },
          { detail: 'Greeting: "Dear Sir," or "Respected Sir,".' },
          { detail: 'Body: short, polite, purpose in the first line.' },
          { detail: 'Closing: "Sincerely," + full name, ID, section, department.' },
          { detail: 'Attach the file and check it opens properly before sending.' },
        ],
      },
      {
        heading: 'Cyber safety & academic honesty',
        paragraphs: [
          'Use strong passwords (12+ characters, mix of letters, numbers, symbols); never share OTPs; scan pen drives for viruses; do not open unknown attachments; log out of lab computers; back up work to Google Drive or OneDrive.',
          'Academic honesty: copying another student’s file (even with changed name) is plagiarism. Always cite images and text taken from the internet.',
        ],
      },
    ],
    commonMistakes: [
      'Sending an email with an empty Subject line or typing the entire message inside the Subject box.',
      'Forgetting to attach the file before clicking Send.',
    ],
    tryIt: 'Draft a formal lab submission email to your course teacher with a clear subject line and signature block.',
  },

  // ================= MODULE 1: WORD =================
  {
    id: '1.1',
    moduleId: 'word',
    code: '1.1',
    title: 'Word interface and creating your first document',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Identify the Word window parts and the main ribbon tabs.',
      'Create, save, close and reopen a document.',
      'Switch views and use zoom.',
    ],
    sections: [
      {
        heading: 'Ribbon tabs in Microsoft Word',
        paragraphs: [
          'Key tabs: File, Home (font, paragraph, styles, editing), Insert (pages, tables, pictures, shapes, header/footer, symbols), Draw, Design (themes, watermark, page colour, borders), Layout (margins, orientation, size, columns, breaks, indent, spacing), References (TOC, footnotes, citations, captions), Mailings (mail merge, envelopes), Review (spelling, word count, comments, track changes), View (Read Mode, Print Layout, Web Layout, Outline, Navigation Pane, ruler, zoom), Help.',
          'The Status Bar at the bottom shows page number, word count, language and proofing status. Right-click it to choose what to show.',
        ],
        steps: [
          { detail: 'Start ▸ type Word ▸ Enter ▸ Blank document.', ribbonPath: 'Start ▸ Word ▸ Blank document' },
          { detail: 'Type your name, department and ID on three separate lines.' },
          { detail: 'File ▸ Save As ▸ Browse ▸ choose CSE1204_YourID\\Word ▸ name Lesson1_FirstDoc ▸ Save.', ribbonPath: 'File ▸ Save As ▸ Browse' },
          { detail: 'Close with Ctrl + W; reopen with File ▸ Open ▸ Recent.', ribbonPath: 'File ▸ Open ▸ Recent' },
          { detail: 'View ▸ show Ruler and Navigation Pane; use the zoom slider at the bottom-right.', ribbonPath: 'View ▸ Ruler & Navigation Pane' },
        ],
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + W', action: 'Close current document' },
      { keys: 'Ctrl + N', action: 'Create new blank document' },
      { keys: 'F12', action: 'Save As' },
    ],
    commonMistakes: [
      'Working in Read Mode or Web Layout accidentally and wondering why margins disappeared (switch back to View ▸ Print Layout).',
    ],
    tryIt: 'Create Lesson1_FirstDoc.docx, turn on the Ruler, write your profile lines, close it, and reopen from Recent.',
  },
  {
    id: '1.2',
    moduleId: 'word',
    code: '1.2',
    title: 'Typing, selecting and editing text',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Select text quickly with mouse and keyboard.',
      'Cut, copy, paste with paste options; undo and redo.',
      'Use Find, Replace and Go To.',
    ],
    sections: [
      {
        heading: 'Fast selection techniques',
        table: {
          headers: ['To select', 'Do this'],
          rows: [
            ['A word', 'Double-click it'],
            ['A paragraph', 'Triple-click inside it'],
            ['A line', 'Click in the left margin next to it'],
            ['Whole document', 'Ctrl + A'],
            ['Character by character', 'Shift + Left/Right arrow'],
            ['Word by word', 'Ctrl + Shift + Left/Right arrow'],
            ['To end of line', 'Shift + End'],
            ['A vertical block', 'Alt + drag'],
          ],
        },
      },
      {
        heading: 'Paste options, Find & Replace, Change Case',
        paragraphs: [
          'Paste options (Ctrl + V then Ctrl, or Home ▸ Paste arrow): Keep Source Formatting, Merge Formatting, Picture, Keep Text Only. Use Keep Text Only (Ctrl + Shift + V in Microsoft 365) when pasting from websites to avoid strange fonts.',
          'Find and Replace: Ctrl + F opens the Navigation Pane search. Ctrl + H opens Replace: type the old word, the new word, then Replace All. Use More ▸ Match case or Find whole words only for accuracy. Ctrl + G (Go To) jumps to a page number.',
          'Other editing tools: Change Case (Home ▸ Aa: Sentence case, lowercase, UPPERCASE, Capitalize Each Word; Shift + F3 cycles), Insert ▸ Symbol (©, ®, ±, √, ৳), Insert ▸ Equation (Alt + =), Clear All Formatting (Home ▸ A with eraser).',
        ],
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + F / Ctrl + H', action: 'Find / Find and Replace' },
      { keys: 'Ctrl + G', action: 'Go To page/section' },
      { keys: 'Shift + F3', action: 'Cycle Change Case' },
      { keys: 'Alt + =', action: 'Insert Equation' },
      { keys: 'Ctrl + Shift + V', action: 'Paste Keep Text Only (365)' },
    ],
    commonMistakes: [
      'Pressing Enter at the end of every line (Word wraps automatically — press Enter only for a new paragraph).',
      'Using many spaces to line up text (use Tab or tables instead).',
    ],
    tryIt: 'Type three paragraphs about your hometown, replace every "city" with "town" using Replace All, and change the title to UPPERCASE with Change Case.',
  },
  {
    id: '1.3',
    moduleId: 'word',
    code: '1.3',
    title: 'Character (font) formatting',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Apply font, size, style, colour, highlight and effects.',
      'Use Format Painter efficiently.',
      'Use the Font dialog box for precise character controls.',
    ],
    sections: [
      {
        heading: 'Font formatting & Format Painter',
        paragraphs: [
          'Format Painter: select formatted text ▸ click the brush once to copy formatting to one place, or double-click it to apply many times; press Esc to stop.',
          'Academic font guideline: body text Times New Roman 12 pt or Calibri 11 pt; headings 14–16 pt bold; use at most two fonts per document; avoid bright colours in formal writing.',
        ],
        table: {
          headers: ['Command', 'Path', 'Shortcut'],
          rows: [
            ['Bold / Italic / Underline', 'Home ▸ Font', 'Ctrl + B / I / U'],
            ['Font size up / down', 'Home ▸ Font', 'Ctrl + ] / Ctrl + [ (or Ctrl + Shift + > / <)'],
            ['Font dialog', 'Home ▸ Font launcher', 'Ctrl + D'],
            ['Subscript (H₂O)', 'Home ▸ Font', 'Ctrl + ='],
            ['Superscript (x²)', 'Home ▸ Font', 'Ctrl + Shift + +'],
            ['Strikethrough / Highlight / Font colour', 'Home ▸ Font', '—'],
            ['Format Painter', 'Home ▸ Clipboard (brush)', 'Ctrl + Shift + C / V'],
          ],
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + B / I / U', action: 'Bold / Italic / Underline' },
      { keys: 'Ctrl + D', action: 'Open Font dialog box' },
      { keys: 'Ctrl + Shift + C / V', action: 'Copy / Paste character formatting' },
    ],
    commonMistakes: [
      'Mixing four or five decorative fonts in one business letter.',
      'Using bright yellow highlight or neon font colours in formal reports.',
    ],
    tryIt: 'Format a short paragraph with Calibri 11 pt, highlight one key term, format a chemical formula H₂O using subscript, and copy heading formatting with Format Painter.',
  },
  {
    id: '1.4',
    moduleId: 'word',
    code: '1.4',
    title: 'Paragraph formatting: alignment, spacing, indents, lists',
    duration: '50 min',
    difficulty: 'Beginner',
    outcomes: [
      'Set alignment, line spacing and paragraph spacing.',
      'Configure indents and custom tab stops with dot leaders.',
      'Create bulleted, numbered and multilevel lists with borders and shading.',
    ],
    sections: [
      {
        heading: 'Alignment, spacing & indents',
        paragraphs: [
          'Line spacing is space between lines inside a paragraph. Paragraph spacing (Before/After, in points) is space between paragraphs — use 6 pt After instead of pressing Enter twice.',
          'Indents on the ruler: First Line Indent (top triangle), Hanging Indent (bottom triangle), Left Indent (small box), Right Indent.',
          'Tabs: click the tab selector at the left of the ruler to choose Left, Center, Right or Decimal tab, then click on the ruler. Use Paragraph ▸ Tabs to add dot leaders (e.g. Chapter 1 .......... 5).',
          'Borders and shading: Home ▸ Borders arrow ▸ Borders and Shading ▸ choose Box, style, colour, width, and Shading fill. Page Border tab adds a border to the whole page. Drop Cap: Insert ▸ Drop Cap ▸ Dropped.',
        ],
        table: {
          headers: ['Command', 'Path', 'Shortcut'],
          rows: [
            ['Align left / center / right', 'Home ▸ Paragraph', 'Ctrl + L / E / R'],
            ['Justify', 'Home ▸ Paragraph', 'Ctrl + J'],
            ['Line spacing 1.0 / 1.5 / 2.0', 'Home ▸ Line and Paragraph Spacing', 'Ctrl + 1 / 5 / 2'],
            ['Increase / decrease indent', 'Home ▸ Paragraph', 'Ctrl + M / Ctrl + Shift + M'],
            ['Hanging indent', 'Paragraph dialog ▸ Special', 'Ctrl + T'],
            ['Show/hide formatting marks (¶)', 'Home ▸ Paragraph', 'Ctrl + Shift + 8'],
            ['Multilevel list level', 'Home ▸ Multilevel List', 'Tab / Shift + Tab'],
          ],
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + L / E / R / J', action: 'Align Left / Center / Right / Justify' },
      { keys: 'Ctrl + 1 / 5 / 2', action: '1.0 / 1.5 / 2.0 line spacing' },
      { keys: 'Ctrl + Shift + 8', action: 'Toggle formatting marks (¶)' },
    ],
    commonMistakes: [
      'Pressing Enter twice between paragraphs instead of setting Spacing After 6 pt.',
      'Using spacebar presses instead of Tab stops to align columns of text.',
    ],
    tryIt: 'Format a paragraph as Justify, 1.5 line spacing, 0.5" first-line indent, 6 pt after. Make a two-level numbered list of your semester courses.',
  },
  {
    id: '1.5',
    moduleId: 'word',
    code: '1.5',
    title: 'Page layout: margins, orientation, size, columns, breaks',
    duration: '40 min',
    difficulty: 'Beginner',
    outcomes: [
      'Set page margins, orientation and A4 paper size.',
      'Format multi-column layouts and insert page and section breaks.',
      'Apply watermarks, page colours and page borders.',
    ],
    sections: [
      {
        heading: 'Configuring page layout',
        steps: [
          { detail: 'Layout ▸ Margins ▸ Normal (1" all sides) or Custom Margins (e.g. Top 1", Bottom 1", Left 1.25", Right 1").', ribbonPath: 'Layout ▸ Margins' },
          { detail: 'Layout ▸ Orientation ▸ Portrait or Landscape.', ribbonPath: 'Layout ▸ Orientation' },
          { detail: 'Layout ▸ Size ▸ A4 (standard in Bangladesh) or Letter.', ribbonPath: 'Layout ▸ Size ▸ A4' },
          { detail: 'Layout ▸ Columns ▸ Two (newsletter style); More Columns ▸ Line between.', ribbonPath: 'Layout ▸ Columns' },
          { detail: 'Layout ▸ Breaks ▸ Page (Ctrl + Enter) starts a new page; Section Break ▸ Next Page lets one page be landscape and others portrait.', ribbonPath: 'Layout ▸ Breaks' },
          { detail: 'Design ▸ Watermark ▸ CONFIDENTIAL / DRAFT or Custom Watermark (text or picture); Design ▸ Page Color and Page Borders.', ribbonPath: 'Design ▸ Watermark' },
        ],
        callout: {
          type: 'note',
          title: 'Measurement units',
          body: 'Switch between inches and centimeters via File ▸ Options ▸ Advanced ▸ Display ▸ Show measurements in units of.',
        },
      },
    ],
    shortcuts: [{ keys: 'Ctrl + Enter', action: 'Insert Page Break' }],
    commonMistakes: [
      'Pressing Enter many times to reach a new page. Always use a Page Break (Ctrl + Enter).',
      'Leaving paper size on Letter instead of A4 when printing in Bangladesh.',
    ],
    tryIt: 'Set page size to A4, add a "DRAFT" watermark, format page 1 in Portrait and use a Section Break (Next Page) to make page 2 Landscape.',
  },
  {
    id: '1.6',
    moduleId: 'word',
    code: '1.6',
    title: 'Tables in Word',
    duration: '60 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Insert, edit, format and convert tables.',
      'Merge and split cells, distribute rows/columns and repeat header rows.',
      'Sort table data and insert simple Word table formulas.',
    ],
    sections: [
      {
        heading: 'Building and formatting tables',
        steps: [
          { detail: 'Insert ▸ Table ▸ drag over the grid (e.g. 5×4) or Insert Table ▸ enter columns and rows.', ribbonPath: 'Insert ▸ Table' },
          { detail: 'Type in cells; Tab moves to the next cell (Tab in the last cell adds a new row); Shift + Tab goes back.' },
          { detail: 'Table Design tab: apply Table Styles, Header Row, Banded Rows, Shading, Borders, Pen colour.', ribbonPath: 'Table Design' },
          { detail: 'Table Layout tab: Insert Above/Below/Left/Right, Delete, Merge Cells, Split Cells, Split Table, AutoFit (Contents/Window), Distribute Rows/Columns, cell Alignment, Text Direction, Cell Margins.', ribbonPath: 'Table Layout' },
          { detail: 'Turn on Repeat Header Rows (Table Layout) so the heading row repeats automatically across pages.', ribbonPath: 'Table Layout ▸ Repeat Header Rows' },
          { detail: 'Sort: Table Layout ▸ Sort ▸ choose column and Ascending/Descending.', ribbonPath: 'Table Layout ▸ Sort' },
          { detail: 'Simple calculation: click a cell ▸ Table Layout ▸ Formula ▸ =SUM(ABOVE) or =AVERAGE(LEFT).', ribbonPath: 'Table Layout ▸ Formula' },
          { detail: 'Convert: select tab-separated text ▸ Insert ▸ Table ▸ Convert Text to Table; reverse with Layout ▸ Convert to Text.' },
        ],
      },
    ],
    shortcuts: [
      { keys: 'Tab / Shift + Tab', action: 'Next / previous table cell (adds row at end)' },
    ],
    commonMistakes: [
      'Forgetting to update Word table formulas (select and press F9) after changing a number.',
      'Creating a multi-page table without turning on Repeat Header Rows.',
    ],
    tryIt: 'Create your class routine (Days × Periods) with merged lunch-break cells, a coloured header row and centred text.',
  },
  {
    id: '1.7',
    moduleId: 'word',
    code: '1.7',
    title: 'Pictures, shapes, SmartArt, text boxes, WordArt',
    duration: '50 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Insert and format pictures, shapes, SmartArt and text boxes.',
      'Control text wrapping and object alignment/grouping.',
      'Add numbered captions to figures.',
    ],
    sections: [
      {
        heading: 'Working with graphics',
        paragraphs: [
          'Pictures: Insert ▸ Pictures ▸ This Device / Stock Images. Picture Format tab: Corrections, Color, Artistic Effects, Picture Styles, Crop, Size, Remove Background, Alt Text.',
          'Wrap Text (Layout Options icon or Picture Format ▸ Wrap Text): In Line with Text (moves like a letter), Square, Tight, Through, Top and Bottom, Behind Text, In Front of Text. Use Square or Top and Bottom for reports.',
          'Shapes: Insert ▸ Shapes ▸ draw with drag (hold Shift for a perfect circle/square); Shape Format ▸ Fill, Outline, Effects; right-click ▸ Add Text. Group: Ctrl + click several shapes ▸ right-click ▸ Group.',
          'SmartArt: Insert ▸ SmartArt ▸ List, Process, Cycle, Hierarchy (organisation chart), Relationship, Matrix, Pyramid. Type in the text pane; change colours in SmartArt Design.',
          'Text box: Insert ▸ Text Box ▸ Draw Text Box. WordArt: Insert ▸ WordArt (use sparingly). Caption: right-click a picture ▸ Insert Caption ▸ "Figure 1: …".',
        ],
      },
    ],
    commonMistakes: [
      'Leaving an image as "In Line with Text" when you want to drag it freely beside a paragraph (use Square wrap).',
      'Stretching images from side handles instead of corner handles, distorting proportions.',
    ],
    tryIt: 'Design a one-page event poster for a Business Fair at BAUST: title WordArt, a picture with Square wrap, a SmartArt Process of the schedule and a text box with contact details.',
  },
  {
    id: '1.8',
    moduleId: 'word',
    code: '1.8',
    title: 'Headers, footers, page numbers, footnotes',
    duration: '30 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Insert consistent headers, footers and formatted page numbers.',
      'Hide headers on the first page and configure section-specific numbering.',
      'Insert footnotes and endnotes.',
    ],
    sections: [
      {
        heading: 'Configuring headers, footers & notes',
        steps: [
          { detail: 'Insert ▸ Header ▸ choose a style ▸ type the course name; Insert ▸ Footer ▸ type your name and ID.', ribbonPath: 'Insert ▸ Header / Footer' },
          { detail: 'Insert ▸ Page Number ▸ Bottom of Page ▸ Plain Number 2. Format Page Numbers ▸ start at 1, or i, ii, iii for front pages.', ribbonPath: 'Insert ▸ Page Number' },
          { detail: 'Header & Footer tab ▸ Different First Page (no number on cover), Different Odd & Even Pages.', ribbonPath: 'Header & Footer ▸ Different First Page' },
          { detail: 'For different numbering in sections: insert Section Break (Next Page), then untick Link to Previous.' },
          { detail: 'References ▸ Insert Footnote (Alt + Ctrl + F) puts a note at the bottom of the page; Insert Endnote puts it at the end of the document.', ribbonPath: 'References ▸ Insert Footnote' },
          { detail: 'Double-click the main text or press Close Header and Footer to leave.' },
        ],
      },
    ],
    shortcuts: [{ keys: 'Alt + Ctrl + F', action: 'Insert Footnote' }],
    commonMistakes: [
      'Typing page numbers manually into the footer (every page will show the same number — always use Insert ▸ Page Number).',
      'Forgetting to untick "Link to Previous" before changing Roman numerals (i, ii) to Arabic numbers (1, 2) in a new section.',
    ],
    tryIt: 'Add a header with your course code, a footer with centred page numbers, enable Different First Page, and insert one footnote.',
  },
  {
    id: '1.9',
    moduleId: 'word',
    code: '1.9',
    title: 'Styles, table of contents, references and citations',
    duration: '50 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Apply and modify built-in Heading styles.',
      'Generate and update an automatic Table of Contents.',
      'Insert citations, a bibliography, figure captions and a cover page.',
    ],
    sections: [
      {
        heading: 'Automatic Table of Contents & Citations',
        paragraphs: [
          'Why styles matter: the Navigation Pane, automatic Table of Contents, and consistent formatting all depend on Heading styles.',
        ],
        steps: [
          { detail: 'Apply Heading 1 to chapter titles, Heading 2 to sub-titles (Home ▸ Styles; Ctrl + Alt + 1 / 2).', ribbonPath: 'Home ▸ Styles' },
          { detail: 'Modify a style: right-click the style ▸ Modify ▸ set font, size, colour, spacing ▸ OK. All headings update at once.' },
          { detail: 'Place cursor on a blank page ▸ References ▸ Table of Contents ▸ Automatic Table 1.', ribbonPath: 'References ▸ Table of Contents' },
          { detail: 'After editing headings or page counts, References ▸ Update Table ▸ Update entire table.' },
          { detail: 'Citations: References ▸ Style (APA or Harvard are common in business reports) ▸ Insert Citation ▸ Add New Source ▸ fill author, title, year, publisher.', ribbonPath: 'References ▸ Insert Citation' },
          { detail: 'References ▸ Bibliography ▸ Bibliography or References inserts the list automatically.' },
          { detail: 'Insert Caption for figures and tables, then Insert Table of Figures. Add a cover via Insert ▸ Cover Page.' },
        ],
      },
    ],
    shortcuts: [{ keys: 'Ctrl + Alt + 1 / 2', action: 'Apply Heading 1 / Heading 2 style' }],
    commonMistakes: [
      'Making headings bold and 16 pt manually instead of using Heading 1/2 styles — Automatic Table of Contents will say "No table of contents entries found".',
      'Forgetting to Update Table before exporting to PDF.',
    ],
    tryIt: 'Create a 3-section mini report using Heading 1 and Heading 2 styles, generate an Automatic Table of Contents on page 1, and insert one APA citation.',
  },
  {
    id: '1.10',
    moduleId: 'word',
    code: '1.10',
    title: 'Proofing, track changes, mail merge, printing and PDF',
    duration: '60 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Proof documents using Spelling & Grammar, Thesaurus and Track Changes.',
      'Run a complete Mail Merge from an Excel recipient list.',
      'Protect, print and export documents to PDF.',
    ],
    sections: [
      {
        heading: 'Proofing & Track Changes',
        paragraphs: [
          'Proofing: red underline = spelling, blue double underline = grammar. Review ▸ Spelling & Grammar (F7); Editor shows suggestions; Review ▸ Thesaurus (Shift + F7); Word Count; set language via Review ▸ Language.',
          'Comments and Track Changes: Review ▸ New Comment (Ctrl + Alt + M). Review ▸ Track Changes (Ctrl + Shift + E) records every insertion/deletion; the reviewer uses Accept / Reject. Display for Review switches between Simple Markup / All Markup / No Markup. Review ▸ Compare compares two versions.',
        ],
      },
      {
        heading: 'Mail Merge (one letter, many recipients)',
        steps: [
          { detail: 'Prepare the data source in Excel with clear headings: Name, ID, Department, Marks.' },
          { detail: 'In Word: Mailings ▸ Start Mail Merge ▸ Letters.', ribbonPath: 'Mailings ▸ Start Mail Merge' },
          { detail: 'Mailings ▸ Select Recipients ▸ Use an Existing List ▸ choose the Excel file and sheet.', ribbonPath: 'Mailings ▸ Select Recipients' },
          { detail: 'Write the letter; place cursor where data goes ▸ Insert Merge Field ▸ Name, etc.', ribbonPath: 'Mailings ▸ Insert Merge Field' },
          { detail: 'Mailings ▸ Preview Results; use arrows to check each record.' },
          { detail: 'Mailings ▸ Finish & Merge ▸ Edit Individual Documents (new document with all letters) or Print Documents.', ribbonPath: 'Mailings ▸ Finish & Merge' },
        ],
      },
      {
        heading: 'Protect, Print and PDF',
        paragraphs: [
          'Protect: File ▸ Info ▸ Protect Document ▸ Encrypt with Password or Restrict Editing.',
          'Print & PDF: File ▸ Print (Ctrl + P) ▸ choose printer, copies, pages (e.g. 1-3,5), one-sided/two-sided, orientation. File ▸ Export ▸ Create PDF/XPS or Save As ▸ PDF. Always submit a PDF when formatting must not change.',
        ],
      },
    ],
    shortcuts: [
      { keys: 'F7 / Shift + F7', action: 'Spelling & Grammar / Thesaurus' },
      { keys: 'Ctrl + Shift + E', action: 'Toggle Track Changes' },
      { keys: 'Ctrl + Alt + M', action: 'New Comment' },
      { keys: 'Ctrl + K', action: 'Hyperlink' },
      { keys: 'Shift + Enter', action: 'Line break (same paragraph)' },
    ],
    commonMistakes: [
      'Submitting the unmerged Word template showing «Name» placeholders instead of clicking Finish & Merge.',
      'Leaving Track Changes balloons visible in a final PDF.',
    ],
    tryIt: 'Mail-merge 5 "Lab completion certificates" from an Excel list of 5 students and export the result as PDF.',
  },
  {
    id: '1.11',
    moduleId: 'word',
    code: '1.11',
    title: 'Business documents: letter, memo, notice, invoice and report templates',
    duration: '50 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Write a business letter in block format and a memo with the correct parts.',
      'Build a notice, meeting minutes and an invoice using tables, styles and templates.',
      'Save a company letterhead as a reusable template (.dotx) and use mail merge with Excel data.',
    ],
    sections: [
      {
        heading: 'Standard structures of business documents',
        paragraphs: [
          'Business documents follow fixed layouts so that readers find information quickly. Use Word styles (not manual spacing) so every document in a company looks the same.',
        ],
        table: {
          headers: ['Document', 'Parts, in order'],
          rows: [
            ['Business letter (block format)', 'Letterhead (company name, logo, address) · Date · Reference no. · Inside address (receiver) · Salutation (Dear Sir / Dear Mr Rahman,) · Subject line (bold) · Body (3 short paragraphs: purpose, details, action wanted) · Complimentary close (Yours sincerely,) · Signature, name, designation · Enclosures / cc'],
            ['Memo (internal)', 'Heading MEMO · To · From · Date · Subject · Body · Initials. No salutation or closing'],
            ['Notice', 'Company name · NOTICE · Date · Heading · Short body (what, when, where, who) · Name and designation of the issuer'],
            ['Meeting minutes', 'Title · Date, time, place · Attendees · Agenda items · Decision · Action by · Deadline (best as a 4-column table)'],
            ['Invoice', 'Seller details · Invoice no. and date · Buyer details · Item table (No., Description, Qty, Unit price, Amount) · Subtotal · VAT · Total · Payment terms'],
            ['Quotation', 'Like an invoice, plus "Valid until" date and delivery terms'],
          ],
        },
      },
      {
        heading: 'Step-by-step templates & invoices',
        steps: [
          { detail: 'Letterhead: Insert ▸ Header ▸ Edit Header ▸ type the company name (Heading style, 18 pt, bold), insert logo (In Line with Text), add address in smaller grey font, then Home ▸ Borders ▸ Bottom Border.', ribbonPath: 'Insert ▸ Header' },
          { detail: 'Block-format letter: every line starts at the left margin; leave space using Spacing After 12 pt, not the Enter key.' },
          { detail: 'Memo: type To:, From:, Date:, Subject: then press Tab using one 2 cm tab stop (Home ▸ Paragraph ▸ Tabs) so answers align.' },
          { detail: 'Meeting minutes: Insert ▸ Table ▸ 4 columns; shade header row; Table Layout ▸ Repeat Header Rows.' },
          { detail: 'Invoice: Insert ▸ Table ▸ 5 columns × 6 rows; right-align numbers; in Amount column use Table Layout ▸ Formula ▸ =PRODUCT(LEFT) for each row and =SUM(ABOVE) for Total.', ribbonPath: 'Table Layout ▸ Formula' },
          { detail: 'Save as template: File ▸ Save As ▸ Word Template (*.dotx). Use ready-made designs via File ▸ New.' },
          { detail: 'Print Preview (Ctrl + P) and export to PDF before emailing.' },
        ],
        callout: {
          type: 'business',
          title: 'Writing tips for business correspondence',
          body: 'One purpose per letter; start with the main point; be polite and specific (dates, amounts, invoice numbers); avoid slang; proofread names and figures twice (F7).',
        },
      },
    ],
    shortcuts: [
      { keys: 'Alt + Shift + D', action: "Insert today's dynamic date field" },
      { keys: 'Ctrl + Shift + Space', action: 'Non-breaking space (keeps "৳ 5,000" on one line)' },
      { keys: 'Shift + Enter', action: 'New line without a new paragraph' },
      { keys: 'Ctrl + Shift + C / V', action: 'Format Painter' },
      { keys: 'Ctrl + Enter', action: 'Page break' },
    ],
    commonMistakes: [
      'Using the Enter key and spaces to position text instead of paragraph spacing and tab stops.',
      'Typing the date manually in a reusable template instead of using a Date field.',
      'Forgetting the bold Subject line or leaving "Dear Sir/Madam" for a named recipient.',
      'Wrong invoice total because numbers were typed with text inside cells.',
    ],
    tryIt: 'Create the letterhead for "Rahim Traders, Saidpur", write a block-format quotation letter to a customer for 10 office chairs, add an invoice table with =SUM(ABOVE), save it as RahimTraders_Letterhead.dotx, and produce 5 letters with mail merge.',
  },
];
