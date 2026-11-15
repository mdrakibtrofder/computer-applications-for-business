import { Lesson } from '../types/course';

export const LESSONS_EXCEL4_EXCEL5: Lesson[] = [
  // ================= MODULE 4: EXCEL BUSINESS CALCULATIONS =================
  {
    id: '4.1',
    moduleId: 'excel-business',
    code: '4.1',
    title: 'Logical functions: IF, nested IF, IFS, AND, OR, IFERROR',
    duration: '50 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Write IF formulas that return text or numeric results for a business rule.',
      'Combine conditions with AND, OR and NOT, and nest IF or use IFS for tiered rules.',
      'Handle formula errors safely using IFERROR.',
    ],
    sections: [
      {
        heading: 'Decisions with IF, IFS, AND, OR & IFERROR',
        paragraphs: [
          'IF syntax: =IF(logical_test, value_if_true, value_if_false). Text outputs require "double quotes"; numbers and cell references do not.',
          'Nested IF evaluates tiers from highest threshold down. IFS (Excel 2019+) removes nested brackets; ending with TRUE handles "everything else".',
          'IFERROR(value, value_if_error) catches errors such as #DIV/0! or #N/A and returns a clean fallback. Always verify why an error happens before masking it.',
        ],
        formulas: [
          { formula: '=IF(B2>=$E$1,"Target met","Below target")', explanation: 'Checks if monthly sales meet target in $E$1 (Dataset 3).', result: 'Target met (3 salespeople)', datasetId: 'dataset-3' },
          { formula: '=IF(L2>=50000,"Large",IF(L2>=20000,"Medium","Small"))', explanation: 'Nested IF classifying Dataset 1 invoices from highest tier down.', result: '4 Large, 4 Medium, 12 Small', datasetId: 'dataset-1' },
          { formula: '=IFS(L2>=50000,"Large",L2>=20000,"Medium",TRUE,"Small")', explanation: 'Cleaner Excel 2019+ alternative to nested IF.', result: 'Same 4 / 4 / 12 counts', datasetId: 'dataset-1' },
          { formula: '=IF(AND(F2="Dhaka",L2>=20000),"Priority","Normal")', explanation: 'Both conditions must be TRUE (Dhaka AND Net >= 20,000).', result: '3 Priority rows', datasetId: 'dataset-1' },
          { formula: '=IF(OR(F2="Dhaka",G2>=50),0,150)', explanation: 'Free delivery if Dhaka OR 50+ items, otherwise ৳ 150.', result: '0 or 150' },
          { formula: '=IFERROR(L2/G2,0)', explanation: 'Prevents #DIV/0! if Qty is blank or zero.', result: 'Unit Net or 0' },
        ],
      },
      {
        heading: 'Worked example: Salesperson Target & Bonus (Dataset 3)',
        worksheet: {
          title: 'Dataset 3 — Target ৳ 100,000 in E1',
          caption: 'Salma, Nasrin, and Tanvir meet the 100,000 target and earn a 2% bonus.',
          columns: ['Salesperson', 'Sales (৳)', 'Status', 'Bonus (৳)'],
          rows: [
            ['Rahim', 45000, '=IF(B2>=$E$1,"Target met","Below target")', '=IF(B2>=$E$1,B2*2%,0)'],
            ['Karim', 50000, 'Below target', 0],
            ['Salma', 132000, 'Target met', 2640],
            ['Nasrin', 275000, 'Target met', 5500],
            ['Tanvir', 510000, 'Target met', 10200],
            ['Mitu', 99999, 'Below target', 0],
          ],
          highlightCells: ['C2', 'D2'],
        },
        callout: {
          type: 'bangla',
          title: 'বাংলা টিপস (Bangla Hint)',
          body: 'Nested IF লেখার সময় সবসময় বড় সংখ্যা থেকে ছোট সংখ্যার দিকে যাবেন (যেমন আগে >=50000, তারপর >=20000)। না হলে বড় অর্ডারও ভুল করে Medium হয়ে যাবে!',
        },
      },
    ],
    shortcuts: [
      { keys: 'Shift + F3', action: 'Insert Function wizard' },
      { keys: 'Ctrl + Shift + A', action: 'Insert function argument names inside brackets' },
    ],
    commonMistakes: [
      'Forgetting quotes around text outputs like "Pass" (#NAME? error).',
      'Checking >=20000 before >=50000 in a nested IF (every Large invoice stops at Medium).',
      'Missing a closing parenthesis at the end of nested IFs.',
    ],
    tryIt: 'Build the Order Size and Priority columns in Dataset 1 and verify counts: 4 Large, 4 Medium, 12 Small, and 3 Priority invoices.',
    playgroundHint: { label: 'Practice Logical Drills (9–14)', datasetId: 'dataset-3', tool: 'drills' },
  },
  {
    id: '4.2',
    moduleId: 'excel-business',
    code: '4.2',
    title: 'Conditional totals: COUNTIF(S), SUMIF(S), AVERAGEIF, MAXIFS, MINIFS, SUMPRODUCT',
    duration: '50 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Count, sum and average rows matching one or multiple business criteria.',
      'Construct criteria strings with operators, cell references and wildcards (*, ?).',
      'Build live summary tables that reconcile to the grand total.',
    ],
    sections: [
      {
        heading: 'Conditional aggregation functions',
        table: {
          headers: ['Function', 'Syntax', 'Rule to remember'],
          rows: [
            ['COUNTIF / COUNTIFS', 'COUNTIFS(range1, crit1, range2, crit2…)', 'Counts rows meeting all conditions'],
            ['SUMIF', 'SUMIF(range, criteria, sum_range)', 'sum_range is LAST'],
            ['SUMIFS', 'SUMIFS(sum_range, range1, crit1…)', 'sum_range comes FIRST!'],
            ['AVERAGEIF(S)', 'AVERAGEIF(range, criteria, avg_range)', 'Mean of matching rows'],
            ['MAXIFS / MINIFS', 'MAXIFS(max_range, range1, crit1…)', 'Extreme value matching criteria (2019+)'],
            ['SUMPRODUCT', 'SUMPRODUCT(array1, array2…)', 'Multiplies matching arrays and sums without helper column'],
          ],
        },
        callout: {
          type: 'note',
          title: 'Writing criteria correctly',
          body: 'Exact text: "Dhaka" · Comparison: ">50000" · Compare to a cell: ">"&B1 · Wildcard ends with Traders: "*Traders" · Date comparison: ">="&DATE(2026,10,15).',
        },
      },
      {
        heading: 'Worked example (Dataset 1 answer key)',
        formulas: [
          { formula: '=SUMIF(F2:F21,"Dhaka",L2:L21)', explanation: 'Total Net sales in Dhaka', result: '172,590', datasetId: 'dataset-1' },
          { formula: '=SUMIF(F2:F21,"Rajshahi",L2:L21)', explanation: 'Total Net sales in Rajshahi', result: '278,887.50', datasetId: 'dataset-1' },
          { formula: '=COUNTIF(F2:F21,"Dhaka")', explanation: 'Number of Dhaka invoices', result: '7', datasetId: 'dataset-1' },
          { formula: '=COUNTIF(C2:C21,"*Traders")', explanation: 'Wildcard count: customers ending in "Traders"', result: '4', datasetId: 'dataset-1' },
          { formula: '=AVERAGEIF(F2:F21,"Rajshahi",L2:L21)', explanation: 'Average Net invoice in Rajshahi', result: '46,481.25', datasetId: 'dataset-1' },
          { formula: '=COUNTIFS(F2:F21,"Dhaka",E2:E21,"Electronics")', explanation: 'Dhaka Electronics invoice count', result: '3', datasetId: 'dataset-1' },
          { formula: '=SUMIFS(L2:L21,F2:F21,"Dhaka",E2:E21,"Electronics")', explanation: 'Dhaka Electronics total Net sales', result: '85,940', datasetId: 'dataset-1' },
          { formula: '=MAXIFS(L2:L21,E2:E21,"Electronics")', explanation: 'Largest Electronics invoice', result: '111,600', datasetId: 'dataset-1' },
          { formula: '=SUMPRODUCT(G2:G21,H2:H21)', explanation: 'Total Gross sales without a helper column', result: '610,850', datasetId: 'dataset-1' },
        ],
      },
    ],
    shortcuts: [
      { keys: 'F4', action: 'Lock criteria & sum ranges ($F$2:$F$21) before filling down a summary table' },
      { keys: 'Ctrl + D', action: 'Fill summary formula down' },
    ],
    commonMistakes: [
      'Putting sum_range last in SUMIFS (it must be the FIRST argument in SUMIFS).',
      'Criteria range and sum range having different row heights.',
      'Forgetting $ locks when copying a summary table down.',
    ],
    tryIt: 'Build Region and Category summary tables for Dataset 1 using SUMIF($F$2:$F$21, A25, $L$2:$L$21) and check both tables total 579,577.50.',
    playgroundHint: { label: 'Practice Conditional Drills (15–20)', datasetId: 'dataset-1', tool: 'drills' },
  },
  {
    id: '4.3',
    moduleId: 'excel-business',
    code: '4.3',
    title: 'Lookup functions: VLOOKUP, HLOOKUP, XLOOKUP, INDEX + MATCH, approximate match',
    duration: '60 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Fetch unit prices, categories or rates automatically from reference tables.',
      'Choose exact match (FALSE / 0) vs approximate match (TRUE / 1) correctly.',
      'Use XLOOKUP (365/2021) and INDEX + MATCH as flexible alternatives to VLOOKUP.',
    ],
    sections: [
      {
        heading: 'Exact match vs Approximate match',
        paragraphs: [
          'VLOOKUP syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). The lookup value MUST sit in the first column of table_array, and table_array must be locked with $.',
          'Use FALSE (0) for exact match on codes, IDs and product names. Use TRUE (1) for approximate match on sorted ascending tier/slab tables (commission, grading, tax brackets).',
          'HLOOKUP searches horizontally across the top row of a table.',
          'XLOOKUP (Excel 2021 / Microsoft 365) defaults to exact match, can look left, and has a built-in not-found message. INDEX + MATCH works in every Excel version and can also look left.',
        ],
        formulas: [
          { formula: "=IFERROR(VLOOKUP(D2,'Price List'!$A$2:$C$9,3,FALSE),\"Not in price list\")", explanation: 'Exact-match VLOOKUP fetching Unit Price from Price List sheet.', result: '480 (Printer Paper)', datasetId: 'dataset-1' },
          { formula: '=VLOOKUP(B2,$E$2:$F$6,2,TRUE)', explanation: 'Approximate-match VLOOKUP on ascending commission slab table (Dataset 3).', result: '3.5% for 132,000', datasetId: 'dataset-3' },
          { formula: "=XLOOKUP(D2,'Price List'!$A$2:$A$9,'Price List'!$C$2:$C$9,\"Not in price list\")", explanation: 'Microsoft 365 / 2021 XLOOKUP equivalent (exact match by default).', result: '480', datasetId: 'dataset-1' },
          { formula: "=INDEX('Price List'!$C$2:$C$9,MATCH(D2,'Price List'!$A$2:$A$9,0))", explanation: 'Universal INDEX + MATCH alternative that works in all Excel versions and can look left.', result: '480', datasetId: 'dataset-1' },
        ],
      },
      {
        heading: 'Worked example: Commission Slabs (Dataset 3)',
        worksheet: {
          title: 'Dataset 3 — Approximate Match Commission Slabs',
          caption: 'First column of slab table (E2:F6) MUST be sorted ascending: 0, 50000, 100000, 200000, 500000.',
          columns: ['Salesperson', 'Sales (৳)', 'Rate Formula', 'Commission', 'Slab From (E)', 'Rate (F)'],
          rows: [
            ['Rahim', 45000, '=VLOOKUP(B2,$E$2:$F$6,2,TRUE)', 0, 0, '0%'],
            ['Karim', 50000, '2.0%', 1000, 50000, '2%'],
            ['Salma', 132000, '3.5%', 4620, 100000, '3.5%'],
            ['Nasrin', 275000, '5.0%', 13750, 200000, '5%'],
            ['Tanvir', 510000, '7.0%', 35700, 500000, '7%'],
            ['Mitu', 99999, '2.0%', 1999.98, '', ''],
          ],
          highlightCells: ['C2', 'E2'],
        },
      },
    ],
    shortcuts: [{ keys: 'F4', action: 'Lock lookup table range ($A$2:$C$9) immediately' }],
    commonMistakes: [
      'Omitting FALSE on product/ID lookups (VLOOKUP guesses wrong prices!).',
      'Forgetting $ locks on table_array so the lookup table shifts down row by row.',
      'Using TRUE approximate match on an unsorted slab table.',
      'Leading/trailing spaces or text-vs-number mismatch causing #N/A.',
    ],
    tryIt: 'Replace typed Unit Price & Category in Dataset 1 with Price List lookups, then compute Dataset 3 commissions and build an INDEX + MATCH Customer Finder.',
    playgroundHint: { label: 'Practice Lookup Drills (21–26)', datasetId: 'dataset-3', tool: 'drills' },
  },
  {
    id: '4.4',
    moduleId: 'excel-business',
    code: '4.4',
    title: 'Dates and time in business: due dates, ageing, working days, months',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Calculate invoice due dates, days overdue and month ends.',
      'Count working days using Bangladesh weekends (Friday & Saturday) via NETWORKDAYS.INTL.',
      'Build a complete receivables ageing report.',
    ],
    sections: [
      {
        heading: 'How Excel calculates dates',
        paragraphs: [
          'Excel stores dates as serial numbers counting days from 1 January 1900 (= 1). You can add credit days directly (=C2+D2) or subtract two dates (=$H$1-F2) to find days overdue.',
        ],
        table: {
          headers: ['Function', 'Purpose', 'Example & Result'],
          rows: [
            ['TODAY() / NOW()', 'Current date / date & time', '=TODAY()'],
            ['DATE(y,m,d)', 'Construct a valid date', '=DATE(2026,10,31)'],
            ['EDATE(date, months)', 'Same day n months later', '=EDATE(DATE(2026,10,31),1) → 30-Nov-2026'],
            ['EOMONTH(date, months)', 'Last day of month', '=EOMONTH(DATE(2026,10,15),0) → 31-Oct-2026'],
            ['NETWORKDAYS(start,end)', 'Working days (Sat–Sun weekend)', '=NETWORKDAYS(DATE(2026,10,1),DATE(2026,10,31)) → 22'],
            ['NETWORKDAYS.INTL(s,e,7)', 'Working days (code 7 = Fri–Sat weekend)', '=NETWORKDAYS.INTL(DATE(2026,10,1),DATE(2026,10,31),7) → 21'],
            ['WORKDAY(start, days)', 'Delivery date after n working days', '=WORKDAY(B2,10)'],
            ['DATEDIF(start,end,"Y")', 'Complete years/months/days elapsed', '=DATEDIF(DATE(2022,3,15),DATE(2026,10,31),"Y") → 4'],
          ],
        },
      },
      {
        heading: 'Worked example: Receivables Ageing (Dataset 4, Report Date 31-Oct-2026 in H1)',
        worksheet: {
          title: 'Dataset 4 — Invoice Ageing Report',
          caption: 'Totals: Not due 98,000 · 1–30 days 109,500 · 31–60 days 116,000 · Over 60 days 24,500 · Total 348,000.',
          columns: ['Invoice', 'Customer', 'Inv Date', 'Credit', 'Amount (৳)', 'Due (=C+D)', 'Overdue (=$H$1-F)', 'Bucket'],
          rows: [
            ['A-101', 'Alam Traders', '05-Aug-2026', 30, 85000, '04-Sep-2026', 57, '31-60 days'],
            ['A-102', 'City Mart', '10-Sep-2026', 30, 42000, '10-Oct-2026', 21, '1-30 days'],
            ['A-103', 'Delta Office', '25-Sep-2026', 15, 67500, '10-Oct-2026', 21, '1-30 days'],
            ['A-104', 'Eden Books', '20-Jul-2026', 45, 31000, '03-Sep-2026', 58, '31-60 days'],
            ['A-105', 'Fahim Enterprise', '05-Oct-2026', 30, 98000, '04-Nov-2026', -4, 'Not due'],
            ['A-106', 'Barnali Store', '15-Jun-2026', 30, 24500, '15-Jul-2026', 108, 'Over 60 days'],
          ],
        },
        formulas: [
          { formula: '=IF(G2<=0,"Not due",IF(G2<=30,"1-30 days",IF(G2<=60,"31-60 days","Over 60 days")))', explanation: 'Classifies overdue days into ageing buckets.', result: '31-60 days (Row 2)', datasetId: 'dataset-4' },
          { formula: '=IF(G2>0,E2*1.5%*ROUNDUP(G2/30,0),0)', explanation: 'Late interest at 1.5% per started 30-day month.', result: '1,470 for A-106 (108 days → 4 months)', datasetId: 'dataset-4' },
        ],
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + ;', action: "Insert today's fixed date" },
      { keys: 'Ctrl + Shift + 3', action: 'Format cell as Date' },
    ],
    commonMistakes: [
      'Typing dates in text format (left-aligned) so date subtraction gives #VALUE!.',
      'Using TODAY() in a historical report snapshot instead of a fixed date cell in H1.',
      'Forgetting code 7 in NETWORKDAYS.INTL for Bangladesh Friday–Saturday weekends.',
    ],
    tryIt: 'Build Dataset 4 ageing report, compute bucket totals with SUMIF (total 348,000), add 1.5% monthly overdue interest, and plot a column chart of the 4 buckets.',
    playgroundHint: { label: 'Load Dataset 4 & Date Drills (27–30)', datasetId: 'dataset-4', tool: 'drills' },
  },
  {
    id: '4.5',
    moduleId: 'excel-business',
    code: '4.5',
    title: 'Financial functions: PMT, FV, PV, NPER, RATE, NPV, IRR, depreciation',
    duration: '50 min',
    difficulty: 'Advanced',
    isExtension: true,
    outcomes: [
      'Calculate a loan EMI, build a monthly amortisation schedule and find total borrowing cost.',
      'Compute future value of regular savings (FV) and present value (PV).',
      'Evaluate investment projects with NPV and IRR and calculate asset depreciation (SLN, DB, DDB).',
    ],
    sections: [
      {
        heading: 'Cash-flow sign rule & period matching',
        paragraphs: [
          'Sign rule: money paid out is negative (−), money received is positive (+). Thus =PMT(rate, nper, 500000) returns a negative number; put − before PMT or −500000 for a positive instalment.',
          'Period rule: rate and nper must match! For monthly payments over 3 years at 12% p.a., use rate = 12%/12 and nper = 3*12 = 36.',
        ],
        formulas: [
          { formula: '=-PMT(12%/12,36,500000)', explanation: 'Monthly EMI on a ৳ 500,000 loan at 12% p.a. over 36 months.', result: '16,607.15 / month' },
          { formula: '=FV(8%/12,60,-5000)', explanation: 'Future value of saving ৳ 5,000/month for 5 years at 8% p.a.', result: '367,384.28' },
          { formula: '=NPV(10%,B3:B6)+B2', explanation: 'NPV of −300,000 initial cost (B2) + years 1–4 inflows (80k, 100k, 120k, 130k) at 10%.', result: '34,321.43 (Accept)' },
          { formula: '=IRR(B2:B6)', explanation: 'Internal Rate of Return of those exact cash flows.', result: '14.76% (> 10%, Accept)' },
          { formula: '=SLN(600000,60000,5)', explanation: 'Straight-line depreciation (cost 600k, salvage 60k, 5 years).', result: '108,000 / year' },
        ],
      },
      {
        heading: 'Worked example: 36-month Loan Amortisation (first 3 months)',
        worksheet: {
          title: 'Loan ৳ 500,000 · 12% Annual · 36 Months (EMI ৳ 16,607.15)',
          caption: 'Total repaid ≈ ৳ 597,857.58 · Total interest ≈ ৳ 97,857.58.',
          columns: ['Month', 'Opening Balance', 'Interest (1%)', 'Principal', 'Closing Balance'],
          rows: [
            [1, 500000, 5000.00, 11607.15, 488392.85],
            [2, 488392.85, 4883.93, 11723.23, 476669.62],
            [3, 476669.62, 4766.70, 11840.46, 464829.16],
          ],
        },
        callout: {
          type: 'note',
          title: 'NPV trap to avoid',
          body: 'Excel’s NPV assumes the first argument inside NPV() occurs at the end of Period 1. Always add the initial Period-0 outlay (+B2, which is negative) OUTSIDE NPV().',
        },
      },
    ],
    shortcuts: [{ keys: 'Ctrl + Shift + 5', action: 'Format percentage' }],
    commonMistakes: [
      'Forgetting to divide annual rate by 12 when nper is in months.',
      'Putting the initial Year-0 cost inside NPV(rate, B2:B6) instead of adding it outside.',
      'Typing 12 instead of 12% (Excel treats 12 as 1200% interest!).',
    ],
    tryIt: 'Build an EMI sheet with inputs (500,000 / 12% / 3 years) and 36-row amortisation schedule; compare 36 vs 60 months total interest.',
    playgroundHint: { label: 'Open Financial Business Calculators', tool: 'calculators' },
  },
  {
    id: '4.6',
    moduleId: 'excel-business',
    code: '4.6',
    title: 'Business mathematics in Excel: VAT, discount, profit, markup, break-even, payroll',
    duration: '50 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Calculate VAT (inclusive & exclusive), discounts, markup, margin and percentage change.',
      'Compute break-even units and target-profit sales volume.',
      'Build a full employee payroll sheet with input assumptions and department summaries.',
    ],
    sections: [
      {
        heading: 'Core business formulas',
        paragraphs: [
          'Keep every business rate in its own labelled input cell, lock it with $, and round monetary amounts to 2 decimals. Rates used here (VAT 15%, House Rent 50%, PF 10%) are teaching inputs — always check current official NBR / employer policies.',
        ],
        table: {
          headers: ['Calculation', 'Formula idea', 'Example'],
          rows: [
            ['VAT added / VAT-exclusive', '=Net*VAT_Rate / =Price/(1+VAT_Rate)', '11,500 incl. 15% VAT → 10,000 excl.'],
            ['Markup on cost vs Margin on sales', '=(Price-Cost)/Cost vs =(Price-Cost)/Price', 'Cost 800, Price 1,000 → 25% markup, 20% margin'],
            ['Percentage change', '=(New-Old)/Old', '120,000 to 138,000 → +15%'],
            ['Break-even units', '=FixedCost/(Price-VarCost)', '120,000 / (250 − 150) = 1,200 units (৳ 300,000 sales)'],
            ['Units for target profit', '=(FixedCost+TargetProfit)/(Price-VarCost)', '(120,000 + 40,000) / 100 = 1,600 units'],
          ],
        },
      },
      {
        heading: 'Worked example: Rahim Traders Payroll (Dataset 2)',
        worksheet: {
          title: 'Dataset 2 — Payroll Inputs in M2:M5 (50% HR · 1,500 Med · 1,000 Conv · 10% PF)',
          caption: 'Totals: Basic 294,000 · Gross 461,000 · PF 29,400 · Net Pay 431,600.',
          columns: ['ID', 'Name', 'Dept', 'Basic', 'House Rent', 'Med', 'Conv', 'Gross', 'PF', 'Net Pay'],
          rows: [
            ['E01', 'Rahim Uddin', 'Sales', 30000, '=D2*$M$2', '=$M$3', '=$M$4', '=D2+E2+F2+G2', '=D2*$M$5', '=H2-I2'],
            ['E02', 'Salma Akter', 'Accounts', 42000, 21000, 1500, 1000, 65500, 4200, 61300],
            ['E05', 'Tanvir Ahmed', 'IT', 50000, 25000, 1500, 1000, 77500, 5000, 72500],
          ],
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + Shift + 5 / 4', action: 'Percentage / Currency format' },
      { keys: 'Alt + =', action: 'AutoSum totals row' },
    ],
    commonMistakes: [
      'Extracting VAT from a VAT-inclusive price by multiplying by 0.85 instead of dividing by 1.15.',
      'Confusing markup (divided by Cost) with margin (divided by Selling Price).',
      'Hard-coding 50% or 1,500 inside payroll formulas instead of referencing M2:M5.',
    ],
    tryIt: 'Complete Dataset 2 payroll for all 8 employees (Net 431,600), add an Eid Bonus = 50% of Basic column, and build a break-even sheet verifying 1,200 units.',
    playgroundHint: { label: 'Open Break-Even, VAT & Margin Calculators', datasetId: 'dataset-2', tool: 'calculators' },
  },

  // ================= MODULE 5: EXCEL DATA ANALYSIS & REPORTING =================
  {
    id: '5.1',
    moduleId: 'excel-analysis',
    code: '5.1',
    title: 'Sorting, filtering, Excel Tables and slicers',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Sort multi-level tables and filter by text, numbers, dates and colours.',
      'Convert ranges into Excel Tables (Ctrl + T) with structured references and Total Rows.',
      'Add visual Slicers and use SUBTOTAL(109, …) for filtered totals.',
    ],
    sections: [
      {
        heading: 'Sorting, AutoFilter & Excel Tables',
        paragraphs: [
          'Click any single cell inside a clean table (one header row, no blank rows/columns, no merged cells) before sorting or filtering.',
          'Multi-level Sort: Data ▸ Sort ▸ tick "My data has headers" ▸ sort by Region (A–Z), then Add Level ▸ Net (Largest to Smallest). Never sort a single column alone or rows will detach from their matching records!',
          'Excel Tables (Ctrl + T): name the table in Table Design (e.g. Sales). Tables automatically band rows, copy formulas down, expand on new entries, offer structured references like =[@Qty]*[@[Unit Price]] and =SUM(Sales[Net]), support visual Slicers, and provide a Total Row using SUBTOTAL.',
        ],
        formulas: [
          { formula: '=SUBTOTAL(109,Sales[Net])', explanation: 'Sums ONLY currently visible (filtered) rows (172,590 when Region = Dhaka is filtered). Plain SUM ignores filters!', result: '579,577.50 (unfiltered) · 172,590 (Dhaka)', datasetId: 'dataset-1' },
        ],
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + T', action: 'Convert range to an Excel Table' },
      { keys: 'Ctrl + Shift + L', action: 'Toggle AutoFilter dropdowns' },
      { keys: 'Alt + ;', action: 'Select visible cells only' },
      { keys: 'Alt + Down Arrow', action: 'Open column filter menu' },
    ],
    commonMistakes: [
      'Selecting one column and clicking Sort A–Z, scrambling customer names against wrong invoice amounts.',
      'Using SUM instead of SUBTOTAL(109, …) below a filtered list.',
    ],
    tryIt: 'Convert Dataset 1 to a Table named Sales, turn on Total Row, insert Region & Category Slicers, and verify Dhaka + Electronics filters to 3 rows (or Rajshahi + Electronics to 4 rows).',
    playgroundHint: { label: 'Try Slicers in Dashboard Demo', datasetId: 'dataset-1', tool: 'dashboard' },
  },
  {
    id: '5.2',
    moduleId: 'excel-analysis',
    code: '5.2',
    title: 'Cleaning data: duplicates, Text to Columns, TRIM, Find & Replace, Go To Special',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Strip extra spaces, odd casing and non-printing characters with TRIM, PROPER and CLEAN.',
      'Convert text numbers and text dates into real numbers and dates.',
      'Split columns with Text to Columns and remove duplicates safely.',
    ],
    sections: [
      {
        heading: 'Data cleaning toolkit',
        table: {
          headers: ['Problem', 'Tool / Formula', 'Example'],
          rows: [
            ['Extra spaces & odd case', '=TRIM(PROPER(A2))', '"  alam   TRADERS " → "Alam Traders"'],
            ['Text numbers (left-aligned)', 'Convert to Number / =VALUE(A2) / Paste Special Multiply by 1', '"5000" → 5000'],
            ['Text dates (15.10.2026)', 'Data ▸ Text to Columns ▸ Next ▸ Next ▸ Date: DMY', 'Real Excel date'],
            ['One cell holds two facts', 'Data ▸ Text to Columns ▸ Delimited (dash/comma)', '"Alam Traders - Rangpur" → 2 cols'],
            ['Repeated prefix', 'Ctrl + H or =SUBSTITUTE(A2,"Tk ","")', '"Tk 500" → "500"'],
            ['Duplicate rows', 'Data ▸ Remove Duplicates (after TRIM & PROPER!)', 'Leaves unique records'],
            ['Fill all blank cells with 0', 'Ctrl + G ▸ Special ▸ Blanks ▸ type 0 ▸ Ctrl + Enter', 'Fills blanks instantly'],
          ],
        },
        callout: {
          type: 'warning',
          title: 'Safe cleaning workflow',
          body: 'Always keep a copy of the raw sheet! Clean in helper columns first, verify results, Paste Special ▸ Values, then Remove Duplicates.',
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + G, Alt + S', action: 'Go To Special (Blanks / Errors)' },
      { keys: 'Ctrl + Alt + V', action: 'Paste Special (Values / Multiply)' },
      { keys: 'Ctrl + Enter', action: 'Fill all selected blank cells with 0 at once' },
    ],
    commonMistakes: [
      'Running Remove Duplicates BEFORE running TRIM and PROPER ("alam traders" and "Alam Traders " stay as two separate rows).',
      'Deleting the source column before pasting helper formulas as Values.',
    ],
    tryIt: 'Clean the 5 messy entries ("  alam traders", "ALAM TRADERS ", "Alam  Traders", "city mart", "City Mart") using TRIM + PROPER, Paste Values, and Remove Duplicates to leave 2 unique customers.',
    playgroundHint: { label: 'Practice Text Cleaning Drills', tool: 'drills' },
  },
  {
    id: '5.3',
    moduleId: 'excel-analysis',
    code: '5.3',
    title: 'PivotTables and PivotCharts',
    duration: '60 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Build a PivotTable cross-tabulating Rows, Columns, Values and Filters.',
      'Change aggregations (Sum, Count, % of Grand Total) and group dates.',
      'Link Slicers and PivotCharts and refresh PivotTables after edits.',
    ],
    sections: [
      {
        heading: 'Building a PivotTable in 60 seconds',
        steps: [
          { detail: 'Click inside the Sales Table ▸ Insert ▸ PivotTable ▸ New Worksheet.', ribbonPath: 'Insert ▸ PivotTable' },
          { detail: 'Drag Region to Rows, Category to Columns, Net to Values (Sum of Net), and Customer to Filters.' },
          { detail: 'Right-click any value ▸ Value Field Settings / Show Values As ▸ % of Grand Total.' },
          { detail: 'PivotTable Analyze ▸ Insert Slicer ▸ Region (and Report Connections to control multiple PivotTables).', ribbonPath: 'PivotTable Analyze ▸ Insert Slicer' },
          { detail: 'PivotTable Analyze ▸ PivotChart ▸ Clustered Column.', ribbonPath: 'PivotTable Analyze ▸ PivotChart' },
          { detail: 'After changing source data, always Refresh (Alt + F5) or Refresh All (Ctrl + Alt + F5)!', ribbonPath: 'PivotTable Analyze ▸ Refresh' },
        ],
      },
      {
        heading: 'Worked example: Dataset 1 PivotTable (Sum of Net)',
        worksheet: {
          title: 'Region × Category PivotTable Cross-Tab (Dataset 1)',
          caption: 'Double-click any number inside Excel PivotTable to drill down into the underlying invoices.',
          columns: ['Region', 'Electronics', 'Furniture', 'Stationery', 'Grand Total', '% of Total'],
          rows: [
            ['Bogura', '', '', 62500.00, 62500.00, '10.8%'],
            ['Dhaka', 85940.00, 62650.00, 24000.00, 172590.00, '29.8%'],
            ['Rajshahi', 211587.50, 58500.00, 8800.00, 278887.50, '48.1%'],
            ['Rangpur', 11400.00, 26000.00, 28200.00, 65600.00, '11.3%'],
            ['Grand Total', 308927.50, 147150.00, 123500.00, 579577.50, '100.0%'],
          ],
          highlightCells: ['E6', 'F4'],
        },
      },
    ],
    shortcuts: [
      { keys: 'Alt + F5 / Ctrl + Alt + F5', action: 'Refresh PivotTable / Refresh All' },
      { keys: 'Alt + N + V', action: 'Insert PivotTable' },
    ],
    commonMistakes: [
      'Forgetting to press Refresh (Alt + F5) after modifying invoices.',
      'Dragging a numeric column into Rows instead of Values.',
      'PivotTable defaulting to Count instead of Sum because a blank or text row sits inside the numeric column.',
    ],
    tryIt: 'Build the Region × Category PivotTable above, add % of Grand Total, create Product & Customer PivotTables (top: LED Monitor 247,225; Delta Office 145,662.50), and add a PivotChart.',
    playgroundHint: { label: 'Practice PivotTable MCQs & Dashboard', tool: 'dashboard' },
  },
  {
    id: '5.4',
    moduleId: 'excel-analysis',
    code: '5.4',
    title: 'Business charts: column, line, pie, combo, sparklines, waterfall',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Choose the right chart type for comparison, trend, share, relationship or bridge.',
      'Create a Combo chart with a Secondary Axis, Sparklines and Waterfall charts.',
      'Design clutter-free charts with message titles and clear axis units.',
    ],
    sections: [
      {
        heading: 'Chart Selection Guide',
        table: {
          headers: ['Message', 'Best Chart', 'Dataset Example'],
          rows: [
            ['Compare items', 'Column or Bar', 'Net sales by Region'],
            ['Trend over time', 'Line', 'Monthly Revenue and Cost (Dataset 5)'],
            ['Parts of a whole (<= 5–6)', 'Pie / Doughnut', 'Category share (Electronics 53.3%, Furniture 25.4%, Stationery 21.3%)'],
            ['Relationship of 2 numbers', 'Scatter', 'Units vs Revenue (Break-even)'],
            ['Two different units', 'Combo (Column + Line on Secondary Axis)', 'Revenue (৳) + Profit %'],
            ['Step-by-step change', 'Waterfall', 'Revenue 6,029,578 − Costs 4,410,000 = Profit 1,619,578'],
            ['Mini trend inside 1 cell', 'Sparklines (Insert ▸ Sparklines)', 'Monthly row trend'],
          ],
        },
        callout: {
          type: 'tip',
          title: 'Chart quality checklist',
          body: 'Write an action title ("December led 2026 with ৳ 680,000"), label axes with units (৳), start Column Y-axes at zero, remove 3-D distortion and heavy gridlines, and add a source line.',
        },
      },
    ],
    shortcuts: [
      { keys: 'Alt + F1', action: 'Insert instant embedded chart on current sheet' },
      { keys: 'F11', action: 'Create chart on a dedicated new chart sheet' },
    ],
    commonMistakes: [
      'Plotting 12+ tiny slices in a Pie chart.',
      'Plotting Revenue (৳ 600,000) and Profit Margin (27%) on the same primary axis (Profit % looks like a flat line at 0 without a Secondary Axis!).',
      'Truncating a Column chart axis above zero, exaggerating differences.',
    ],
    tryIt: 'Using Dataset 5, build (1) a Line chart of Revenue & Cost, (2) a Combo chart with Profit % on Secondary Axis, (3) a Q1–Q4 Pie chart, and (4) row Sparklines.',
    playgroundHint: { label: 'Open Interactive Chart Chooser', datasetId: 'dataset-5', tool: 'charts' },
  },
  {
    id: '5.5',
    moduleId: 'excel-analysis',
    code: '5.5',
    title: 'What-if analysis: Goal Seek, Data Table, Scenario Manager, Solver',
    duration: '50 min',
    difficulty: 'Advanced',
    isExtension: true,
    outcomes: [
      'Find the exact input needed for a target formula result using Goal Seek.',
      'Compare multiple rate/term combinations in one- and two-variable Data Tables.',
      'Store Worst/Expected/Best scenarios and optimise constrained decisions with Solver.',
    ],
    sections: [
      {
        heading: 'Four What-If Tools',
        paragraphs: [
          'Goal Seek (Data ▸ What-If Analysis ▸ Goal Seek): Set cell (formula) To value (target) By changing cell (one input). Example: set monthly EMI to 15,000 (12%, 36 months) by changing loan amount → ৳ 451,612.58. Or set profit to 0 by changing units → 1,200 break-even units.',
          'Data Table: place the formula in the top-left corner cell, put rates down the left and years across the top, select the grid ▸ Data ▸ What-If Analysis ▸ Data Table.',
          'Scenario Manager: save Worst (price 230, units 1,100 → −32,000), Expected (250, 1,500 → +30,000), and Best (270, 1,900 → +108,000) and generate a Scenario Summary.',
          'Solver (enable via File ▸ Options ▸ Add-ins): maximise =800*C+1200*T subject to 3*C+5*T<=200, C<=50, T<=30, integer → optimal mix: 50 chairs and 10 tables = ৳ 52,000 profit.',
        ],
        worksheet: {
          title: 'Two-Variable Loan EMI Data Table (Loan ৳ 500,000)',
          caption: 'Row input cell = Years · Column input cell = Annual Rate.',
          columns: ['Rate \\ Years', '2 Years', '3 Years', '5 Years'],
          rows: [
            ['10%', 23072.46, 16133.59, 10623.52],
            ['12%', 23536.74, 16607.15, 11122.22],
            ['14%', 24006.44, 17088.81, 11634.13],
          ],
        },
      },
    ],
    shortcuts: [{ keys: 'Alt + A + W + G', action: 'Open Goal Seek' }],
    commonMistakes: [
      'Pointing Goal Seek at a plain typed number instead of a formula cell.',
      'Placing Data Table input cells on a different worksheet.',
      'Forgetting integer and non-negative constraints in Solver.',
    ],
    tryIt: 'Run Goal Seek for a ৳ 15,000 EMI, construct the 3×3 Data Table above, and generate a 3-case Scenario Summary for break-even profit.',
    playgroundHint: { label: 'Experiment in Business Calculators', tool: 'calculators' },
  },
  {
    id: '5.6',
    moduleId: 'excel-analysis',
    code: '5.6',
    title: 'Dynamic-array and modern functions (365): FILTER, SORT, UNIQUE, XLOOKUP, LET',
    duration: '40 min',
    difficulty: 'Advanced',
    isExtension: true,
    outcomes: [
      'Write spilling dynamic-array formulas using UNIQUE, SORT, FILTER and SEQUENCE.',
      'Refer to spilled ranges with the # operator and resolve #SPILL! errors.',
      'Know the Excel 2016/2019 alternatives when sharing workbooks.',
    ],
    sections: [
      {
        heading: 'Modern Excel 365 / 2021 Functions',
        paragraphs: [
          'Dynamic-array formulas return multiple cells that spill automatically into empty cells below/right. Reference an entire spilled range with # (e.g. A25#). If another value blocks the spill area, Excel shows #SPILL! — clear the blocking cell.',
          'Older Excel (2016/2019) alternatives: AutoFilter instead of FILTER, Remove Duplicates/PivotTable instead of UNIQUE, Data ▸ Sort instead of SORT, INDEX + MATCH instead of XLOOKUP.',
        ],
        formulas: [
          { formula: '=SORT(UNIQUE(F2:F21))', explanation: 'Spills a unique alphabetised list of regions (Bogura, Dhaka, Rajshahi, Rangpur).', result: '4 unique regions', datasetId: 'dataset-1' },
          { formula: '=FILTER(A2:L21,F2:F21="Dhaka")', explanation: 'Extracts all 7 Dhaka invoice rows dynamically.', result: '7 rows', datasetId: 'dataset-1' },
          { formula: '=FILTER(A2:L21,(F2:F21="Dhaka")*(E2:E21="Electronics"),"None")', explanation: 'Multiple AND criteria inside FILTER (* multiplies conditions).', result: '3 rows', datasetId: 'dataset-1' },
          { formula: '=SORTBY(A2:L21,L2:L21,-1)', explanation: 'Sorts entire table descending (−1) by Net sales.', result: 'INV-1009 first', datasetId: 'dataset-1' },
          { formula: '=LET(n,L2:L21,SUM(n)/COUNT(n))', explanation: 'Names intermediate range n once for cleaner formulas.', result: '28,978.875', datasetId: 'dataset-1' },
        ],
      },
    ],
    commonMistakes: [
      'Typing a dynamic array inside an Excel Table (Tables do not allow spilling — place dynamic arrays outside Tables).',
      'Sharing a 365-only workbook with users on Excel 2016 without converting or using classic equivalents.',
    ],
    tryIt: 'Put =SORT(UNIQUE(F2:F21)) in A25 and =SUMIF(F2:F21,A25#,L2:L21) in B25 to build a live expanding regional summary.',
    playgroundHint: { label: 'Test UNIQUE, SORT, FILTER in Playground', datasetId: 'dataset-1', tool: 'playground' },
  },
  {
    id: '5.7',
    moduleId: 'excel-analysis',
    code: '5.7',
    title: 'Building a dashboard',
    duration: '60 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Plan a one-page business dashboard answering clear management questions.',
      'Combine KPI cards, PivotCharts and Slicers connected via Report Connections.',
      'Style, align and prepare a dashboard for presentation and A4 printing.',
    ],
    sections: [
      {
        heading: 'Dashboard Blueprint & Step-by-Step Build',
        table: {
          headers: ['Business Question', 'Visual / KPI', 'Expected Result (Dataset 1)'],
          rows: [
            ['How much did we sell?', 'KPI Card: Total Net Sales', '৳ 579,577.50'],
            ['How many invoices?', 'KPI Card: Invoice Count', '20'],
            ['What is average invoice?', 'KPI Card: Average Net', '৳ 28,978.88'],
            ['Which region leads?', 'Column PivotChart by Region', 'Rajshahi 278,887.50 (48.1%)'],
            ['Which category earns most?', 'Doughnut/Bar PivotChart by Category', 'Electronics 308,927.50'],
            ['Top product & customer?', 'Top 5 Products bar / Top Customer card', 'LED Monitor 247,225 · Delta Office 145,662.50'],
          ],
        },
        steps: [
          { detail: 'Clean Dataset 1 and convert it to a Table named Sales (Lessons 5.1–5.2).' },
          { detail: 'Create a Calc sheet holding PivotTables (Net by Region, Category, Product Top 5) and a clean Dashboard sheet.' },
          { detail: 'Build 3 KPI cards linked to formulas (=SUM(Sales[Net]) or GETPIVOTDATA for slicer-reactive KPIs).' },
          { detail: 'Insert PivotCharts from Calc and move/paste them onto Dashboard.' },
          { detail: 'Insert Region and Category Slicers and use Slicer ▸ Report Connections to link them to ALL PivotTables.', ribbonPath: 'Slicer ▸ Report Connections' },
          { detail: 'View ▸ untick Gridlines; align charts cleanly; limit to 2–3 colours; add title ("Rahim Traders, October 2026") and source note.', ribbonPath: 'View ▸ Gridlines' },
        ],
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + Alt + F5', action: 'Refresh all PivotTables and charts' },
    ],
    commonMistakes: [
      'Connecting a Slicer to only one PivotTable so the other charts do not update.',
      'Keeping default PivotChart field buttons and "Sum of Net" titles.',
      'Crowding 8 noisy charts onto one page.',
    ],
    tryIt: 'Build the Rahim Traders October Dashboard, test both Slicers together, and paste a screenshot into a PowerPoint slide.',
    playgroundHint: { label: 'Launch Interactive Dashboard Builder Demo', datasetId: 'dataset-1', tool: 'dashboard' },
  },
  {
    id: '5.8',
    moduleId: 'excel-analysis',
    code: '5.8',
    title: 'Page setup, printing, protection, sharing and collaboration',
    duration: '40 min',
    difficulty: 'Intermediate',
    outcomes: [
      'Configure Landscape A4 printing with Fit to 1 Page Wide and repeated table headings.',
      'Unlock input cells before protecting formula sheets and workbooks.',
      'Export cleanly to PDF and UTF-8 CSV and collaborate safely.',
    ],
    sections: [
      {
        heading: 'A4 Printing & Worksheet Protection',
        steps: [
          { detail: 'Page Layout ▸ Orientation ▸ Landscape, Size ▸ A4, Print Area ▸ Set Print Area.', ribbonPath: 'Page Layout ▸ Page Setup' },
          { detail: 'Page Layout ▸ Print Titles ▸ Rows to repeat at top: $1:$1 so headers repeat on every printed page.', ribbonPath: 'Page Layout ▸ Print Titles' },
          { detail: 'Page Layout ▸ Scale to Fit ▸ Width: 1 page, Height: Automatic (prevents stray columns spilling onto page 2).' },
          { detail: 'Protect formulas in 2 steps: FIRST select editable input cells ▸ Ctrl + 1 ▸ Protection ▸ untick Locked; SECOND Review ▸ Protect Sheet.', ribbonPath: 'Review ▸ Protect Sheet' },
          { detail: 'Export fixed copies via File ▸ Export ▸ Create PDF/XPS (keep .xlsx as master; CSV saves active sheet values only).' },
        ],
        callout: {
          type: 'warning',
          title: 'Protection order matters!',
          body: 'All cells are Locked by default. If you turn on Protect Sheet BEFORE unlocking your input cells, nobody will be able to enter data.',
        },
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + P', action: 'Print Preview & Print' },
      { keys: 'Shift + F2', action: 'Insert sticky cell Note' },
    ],
    commonMistakes: [
      'Printing a wide register without Fit All Columns on One Page (splits columns across extra pages).',
      'Forgetting a workbook encryption password (cannot be recovered).',
    ],
    tryIt: 'Set Dataset 1 to A4 Landscape, Fit 1 page wide, repeat row 1, unlock Qty/Unit Price/Disc %, protect the sheet, and export to PDF.',
  },
  {
    id: '5.9',
    moduleId: 'excel-analysis',
    code: '5.9',
    title: 'Linking Excel with Word and PowerPoint; Power Query and macros overview',
    duration: '40 min',
    difficulty: 'Advanced',
    isExtension: true,
    outcomes: [
      'Link or embed Excel tables and charts cleanly inside Word and PowerPoint.',
      'Explain how Power Query automates repeatable monthly data cleaning.',
      'Record and run a simple formatting macro safely (.xlsm).',
    ],
    sections: [
      {
        heading: 'Cross-app integration, Power Query & Macros',
        paragraphs: [
          'Linking Excel to Word/PowerPoint: copy chart/table ▸ Paste Special ▸ Link & Keep Source Formatting for reports that update monthly, or Picture for frozen snapshots. Right-click ▸ Update Link in Word refreshes numbers.',
          'Power Query (Data ▸ Get Data ▸ From Text/CSV or Workbook): records steps (remove columns, split, trim, change types) in Power Query Editor ▸ Close & Load. Next month, drop the new CSV in and click Data ▸ Refresh All.',
          'Macros (View ▸ Macros ▸ Record Macro): record repetitive formatting steps once, save as Excel Macro-Enabled Workbook (.xlsm), and replay via Alt + F8 or a shortcut. Security rule: never enable macros from unknown email attachments.',
        ],
      },
    ],
    shortcuts: [
      { keys: 'Ctrl + Alt + V', action: 'Paste Special' },
      { keys: 'Alt + F8 / Alt + F11', action: 'Macro list / Visual Basic Editor' },
    ],
    commonMistakes: [
      'Moving or renaming a linked Excel file after linking it to a Word report (breaks the link path).',
      'Saving a recorded macro workbook as .xlsx instead of .xlsm (Excel discards the macro!).',
    ],
    tryIt: 'Paste a chart from your Dashboard into Word as a Linked Picture, change a sale in Excel, and Update Link in Word.',
  },
];
