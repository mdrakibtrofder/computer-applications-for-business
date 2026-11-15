# CSE 1204 — Computer Applications for Business

Interactive course companion and Excel practice platform for **CSE 1204 (Computer Applications for Business)** at **Bangladesh Army University of Science and Technology (BAUST), Saidpur**.

- **Course Teachers:** Naimur Rahman, Md. Rakib Trofder, Saad Ahmed (Department of CSE, BAUST)
- **Content & Teaching Design:** Naimur Rahman Sir
- **Website Design & Development:** Md. Rakib Trofder

---

## Features

- **6 Modules · 44 Lessons:** Computer Basics, Microsoft Word, Microsoft PowerPoint, and an intensive Microsoft Excel track (Modules 3–5 covering >50% of the semester).
- **Interactive Excel Lab:**
  - **Spreadsheet Playground:** 14×26 live grid with `=formula` evaluation (70+ Excel functions), Name Box, Formula Bar, F2/arrow navigation, `Ctrl+\`` Show Formulas toggle, Copy/Paste with reference shifting, AutoFill handle, Bangladeshi Taka (`৳`) / `%` / `,` formatting, and preloaded course datasets.
  - **Cell Reference Visualiser:** Live `$` relative/absolute/mixed reference transformer.
  - **44 Formula Drills & 12 Error Spotters:** Exam-style practice with instant checks.
  - **Business Calculators:** Loan PMT & 12-month amortisation schedule, Savings FV, Break-Even + chart, NPV & IRR, Depreciation (SLN/DB/DDB), and VAT/Markup/Margin helpers.
  - **Chart Chooser & Interactive Dashboard Demo:** Slicer-driven KPIs and synced charts.
- **3-Mode MCQ Quiz Centre (54 Questions + Mock Mixes):**
  - **Quick Overview Mode (Default):** All questions, answers, and explanations visible on one scrollable page with a global **Hide Answers / Show Answers** toggle.
  - **Practice Mode:** Interactive self-paced answering with instant feedback and explanations.
  - **Exam Mode:** Timed test simulator with hidden answers during the attempt and a final scorecard & review screen.
- **13 Lab Sheets & Printable Checklists:** Interactive checklists saved in `localStorage`, hidden Expected Results verification, rubrics, and clean A4 print styles.
- **5 Business Datasets + CSV Downloads:** One-click CSV export and worked Answer Keys.

---

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build & Static Hosting

```bash
npm run build
```

Because the app uses React Router `HashRouter`, the generated `dist/` folder can be deployed directly to **GitHub Pages**, **Netlify**, **Vercel**, or any static web server without server-side rewrite rules.

---

## Maintaining Content

- **Edit or add lessons:** Update `/src/content/lessons_basics_word.ts`, `/src/content/lessons_ppt_excel3.ts`, or `/src/content/lessons_excel4_excel5.ts`.
- **Add or update datasets:** Edit `/src/data/datasets.ts` — changes automatically propagate to the Datasets page, CSV downloads, and Excel Playground preset loader.
- **Edit quizzes, labs, functions, shortcuts, or syllabus:** Update the corresponding typed files under `/src/data/`.
