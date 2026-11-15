import { Dataset } from '../types/course';

export const DATASETS: Dataset[] = [
  {
    id: 'dataset-1',
    title: 'Dataset 1 — Rahim Traders Sales Register (October 2026)',
    shortName: 'Sales Register (Oct 2026)',
    description:
      '20 sales invoices across 4 regions (Rangpur, Dhaka, Rajshahi, Bogura) and 3 product categories (Stationery, Furniture, Electronics), paired with the official Price List sheet.',
    sheetName: 'Sales',
    headers: ['Inv No', 'Date', 'Customer', 'Product', 'Category', 'Region', 'Qty', 'Unit Price (৳)', 'Disc %'],
    rows: [
      ['INV-1001', '2026-10-01', 'Alam Traders', 'Printer Paper (ream)', 'Stationery', 'Rangpur', 40, 480, 0],
      ['INV-1002', '2026-10-02', 'Barnali Store', 'Office Chair', 'Furniture', 'Dhaka', 6, 6500, 5],
      ['INV-1003', '2026-10-03', 'City Mart', 'LED Monitor', 'Electronics', 'Dhaka', 4, 15500, 0],
      ['INV-1004', '2026-10-04', 'Delta Office', 'Keyboard', 'Electronics', 'Rajshahi', 15, 950, 5],
      ['INV-1005', '2026-10-06', 'Alam Traders', 'Ballpoint Pen (box)', 'Stationery', 'Rangpur', 60, 150, 0],
      ['INV-1006', '2026-10-07', 'Eden Books', 'Stapler', 'Stationery', 'Bogura', 25, 220, 0],
      ['INV-1007', '2026-10-08', 'City Mart', 'Mouse', 'Electronics', 'Dhaka', 20, 450, 5],
      ['INV-1008', '2026-10-09', 'Barnali Store', 'Whiteboard', 'Furniture', 'Dhaka', 3, 3200, 0],
      ['INV-1009', '2026-10-11', 'Fahim Enterprise', 'LED Monitor', 'Electronics', 'Rajshahi', 8, 15500, 10],
      ['INV-1010', '2026-10-12', 'Delta Office', 'Office Chair', 'Furniture', 'Rajshahi', 10, 6500, 10],
      ['INV-1011', '2026-10-14', 'Eden Books', 'Printer Paper (ream)', 'Stationery', 'Bogura', 100, 480, 5],
      ['INV-1012', '2026-10-15', 'Alam Traders', 'Keyboard', 'Electronics', 'Rangpur', 12, 950, 0],
      ['INV-1013', '2026-10-16', 'Fahim Enterprise', 'Mouse', 'Electronics', 'Rajshahi', 30, 450, 5],
      ['INV-1014', '2026-10-18', 'City Mart', 'Whiteboard', 'Furniture', 'Dhaka', 5, 3200, 0],
      ['INV-1015', '2026-10-20', 'Barnali Store', 'Printer Paper (ream)', 'Stationery', 'Dhaka', 50, 480, 0],
      ['INV-1016', '2026-10-21', 'Delta Office', 'LED Monitor', 'Electronics', 'Rajshahi', 5, 15500, 5],
      ['INV-1017', '2026-10-23', 'Eden Books', 'Ballpoint Pen (box)', 'Stationery', 'Bogura', 80, 150, 5],
      ['INV-1018', '2026-10-25', 'Alam Traders', 'Office Chair', 'Furniture', 'Rangpur', 4, 6500, 0],
      ['INV-1019', '2026-10-27', 'Fahim Enterprise', 'Stapler', 'Stationery', 'Rajshahi', 40, 220, 0],
      ['INV-1020', '2026-10-29', 'City Mart', 'Keyboard', 'Electronics', 'Dhaka', 18, 950, 10],
    ],
    columns: [
      { col: 'A', name: 'Inv No', type: 'Text', description: 'Unique invoice number (INV-1001 to INV-1020)' },
      { col: 'B', name: 'Date', type: 'Date', description: 'ISO invoice date in October 2026' },
      { col: 'C', name: 'Customer', type: 'Text', description: 'Customer business name (6 customers)' },
      { col: 'D', name: 'Product', type: 'Text', description: 'Product name matching Price List' },
      { col: 'E', name: 'Category', type: 'Text', description: 'Stationery, Furniture, or Electronics' },
      { col: 'F', name: 'Region', type: 'Text', description: 'Dhaka, Rajshahi, Rangpur, or Bogura' },
      { col: 'G', name: 'Qty', type: 'Number', description: 'Quantity sold (units)' },
      { col: 'H', name: 'Unit Price (৳)', type: 'Currency', description: 'Price per unit in Bangladeshi Taka' },
      { col: 'I', name: 'Disc %', type: 'Number', description: 'Discount percentage (0, 5, or 10)' },
    ],
    relatedSheet: {
      name: 'Price List',
      headers: ['Product', 'Category', 'Unit Price (৳)'],
      rows: [
        ['Printer Paper (ream)', 'Stationery', 480],
        ['Ballpoint Pen (box)', 'Stationery', 150],
        ['Stapler', 'Stationery', 220],
        ['Office Chair', 'Furniture', 6500],
        ['Whiteboard', 'Furniture', 3200],
        ['LED Monitor', 'Electronics', 15500],
        ['Keyboard', 'Electronics', 950],
        ['Mouse', 'Electronics', 450],
      ],
    },
    answerKey: [
      { measure: 'Total Gross (G*H)', value: '610,850' },
      { measure: 'Total Discount (J*I/100)', value: '31,272.50' },
      { measure: 'Total Net (J-K)', value: '579,577.50' },
      { measure: 'Total VAT (15% rounded per line)', value: '86,936.63' },
      { measure: 'Invoice Total (Net + VAT)', value: '666,514.13' },
      { measure: 'Number of invoices / Total Qty', value: '20 / 535' },
      { measure: 'Average Net', value: '28,978.875 (28,978.88 rounded)' },
      { measure: 'Highest / Lowest Net', value: '111,600 (INV-1009) / 5,500 (INV-1006)' },
      { measure: 'Net by Region', value: 'Rangpur 65,600 · Dhaka 172,590 · Rajshahi 278,887.50 · Bogura 62,500' },
      { measure: 'Net by Category', value: 'Stationery 123,500 · Furniture 147,150 · Electronics 308,927.50' },
      { measure: 'Dhaka invoices / Dhaka electronics / Net', value: '7 / 3 / 85,940' },
    ],
  },
  {
    id: 'dataset-2',
    title: 'Dataset 2 — Payroll of Rahim Traders (November 2026)',
    shortName: 'Payroll Sheet (Nov 2026)',
    description:
      '8 employees across Sales, Accounts, HR, and IT departments. Used for teaching allowances, provident fund deductions, absolute references, and department summaries.',
    sheetName: 'Payroll',
    headers: ['ID', 'Name', 'Department', 'Basic (৳)'],
    rows: [
      ['E01', 'Rahim Uddin', 'Sales', 30000],
      ['E02', 'Salma Akter', 'Accounts', 42000],
      ['E03', 'Karim Hossain', 'Sales', 28000],
      ['E04', 'Nasrin Jahan', 'HR', 35000],
      ['E05', 'Tanvir Ahmed', 'IT', 50000],
      ['E06', 'Mitu Rani', 'Accounts', 33000],
      ['E07', 'Faruk Ali', 'IT', 45000],
      ['E08', 'Lima Khatun', 'HR', 31000],
    ],
    columns: [
      { col: 'A', name: 'ID', type: 'Text', description: 'Employee ID (E01 to E08)' },
      { col: 'B', name: 'Name', type: 'Text', description: 'Full employee name' },
      { col: 'C', name: 'Department', type: 'Text', description: 'Sales, Accounts, HR, or IT' },
      { col: 'D', name: 'Basic (৳)', type: 'Currency', description: 'Monthly basic salary in Taka' },
    ],
    answerKey: [
      { measure: 'Total Basic', value: '294,000' },
      { measure: 'Total Gross (Basic + 50% HR + 1,500 Med + 1,000 Conv)', value: '461,000' },
      { measure: 'Total Provident Fund (10% of Basic)', value: '29,400' },
      { measure: 'Total Net Pay', value: '431,600' },
      { measure: 'Highest Net Pay', value: '72,500 (Tanvir Ahmed)' },
      { measure: 'Net Pay by Dept', value: 'Sales 86,200 · Accounts 110,000 · HR 97,400 · IT 138,000' },
    ],
  },
  {
    id: 'dataset-3',
    title: 'Dataset 3 — Salesperson Targets & Commission Slabs',
    shortName: 'Commission & Targets',
    description:
      '6 salespeople with monthly sales and an ascending commission slab table (0% to 7%) for practicing IF target checks, bonus formulas, and approximate-match VLOOKUP/XLOOKUP.',
    sheetName: 'Commission',
    headers: ['Salesperson', 'Monthly sales (৳)'],
    rows: [
      ['Rahim', 45000],
      ['Karim', 50000],
      ['Salma', 132000],
      ['Nasrin', 275000],
      ['Tanvir', 510000],
      ['Mitu', 99999],
    ],
    columns: [
      { col: 'A', name: 'Salesperson', type: 'Text', description: 'Sales representative name' },
      { col: 'B', name: 'Monthly sales (৳)', type: 'Currency', description: 'Total monthly sales achieved' },
    ],
    relatedSheet: {
      name: 'Slabs',
      headers: ['Sales from (৳)', 'Commission rate'],
      rows: [
        [0, 0],
        [50000, 0.02],
        [100000, 0.035],
        [200000, 0.05],
        [500000, 0.07],
      ],
    },
    answerKey: [
      { measure: 'Commission rates', value: '0% · 2% · 3.5% · 5% · 7% · 2%' },
      { measure: 'Commission amounts', value: '0 · 1,000 · 4,620 · 13,750 · 35,700 · 1,999.98 (Total 57,069.98)' },
      { measure: 'Target met (≥ 100,000)', value: 'Salma, Nasrin, Tanvir (3 people)' },
      { measure: '2% Bonus on target met', value: 'Salma 2,640 · Nasrin 5,500 · Tanvir 10,200' },
      { measure: 'Total sales', value: '1,111,999' },
    ],
  },
  {
    id: 'dataset-4',
    title: 'Dataset 4 — Receivables (Invoice Ageing), Report Date 31-Oct-2026',
    shortName: 'Receivables Ageing',
    description:
      '6 customer credit invoices with invoice dates and credit days. Used to compute due dates, days overdue, ageing buckets, and 1.5% monthly overdue interest.',
    sheetName: 'Ageing',
    headers: ['Invoice', 'Customer', 'Invoice date', 'Credit days', 'Amount (৳)'],
    rows: [
      ['A-101', 'Alam Traders', '2026-08-05', 30, 85000],
      ['A-102', 'City Mart', '2026-09-10', 30, 42000],
      ['A-103', 'Delta Office', '2026-09-25', 15, 67500],
      ['A-104', 'Eden Books', '2026-07-20', 45, 31000],
      ['A-105', 'Fahim Enterprise', '2026-10-05', 30, 98000],
      ['A-106', 'Barnali Store', '2026-06-15', 30, 24500],
    ],
    columns: [
      { col: 'A', name: 'Invoice', type: 'Text', description: 'Credit invoice reference' },
      { col: 'B', name: 'Customer', type: 'Text', description: 'Customer name' },
      { col: 'C', name: 'Invoice date', type: 'Date', description: 'Date invoice was issued' },
      { col: 'D', name: 'Credit days', type: 'Number', description: 'Allowed credit period in days' },
      { col: 'E', name: 'Amount (৳)', type: 'Currency', description: 'Receivable amount in Taka' },
    ],
    answerKey: [
      { measure: 'Days overdue (on 31-Oct-2026)', value: '57 · 21 · 21 · 58 · −4 · 108' },
      { measure: 'Not due', value: '98,000 (A-105)' },
      { measure: '1–30 days', value: '109,500 (A-102, A-103)' },
      { measure: '31–60 days', value: '116,000 (A-101, A-104)' },
      { measure: 'Over 60 days', value: '24,500 (A-106)' },
      { measure: 'Total receivable', value: '348,000' },
      { measure: 'Late interest on A-106 (4 started months @ 1.5%)', value: '1,470' },
    ],
  },
  {
    id: 'dataset-5',
    title: 'Dataset 5 — Rahim Traders Monthly Revenue and Cost (2026)',
    shortName: 'Monthly Revenue & Cost (2026)',
    description:
      '12 monthly figures for revenue and cost across 2026 (with October matching Dataset 1 Net sales rounded). Used for line, combo, pie, sparkline, and waterfall charts.',
    sheetName: 'Monthly2026',
    headers: ['Month', 'Revenue (৳)', 'Cost (৳)'],
    rows: [
      ['Jan', 410000, 300000],
      ['Feb', 385000, 285000],
      ['Mar', 450000, 330000],
      ['Apr', 470000, 345000],
      ['May', 520000, 380000],
      ['Jun', 495000, 365000],
      ['Jul', 430000, 320000],
      ['Aug', 460000, 340000],
      ['Sep', 540000, 395000],
      ['Oct', 579578, 420000],
      ['Nov', 610000, 440000],
      ['Dec', 680000, 490000],
    ],
    columns: [
      { col: 'A', name: 'Month', type: 'Text', description: 'Month abbreviation (Jan–Dec)' },
      { col: 'B', name: 'Revenue (৳)', type: 'Currency', description: 'Monthly sales revenue in Taka' },
      { col: 'C', name: 'Cost (৳)', type: 'Currency', description: 'Monthly cost of goods & expenses in Taka' },
    ],
    answerKey: [
      { measure: 'Annual Revenue / Cost', value: '6,029,578 / 4,410,000' },
      { measure: 'Annual Profit / Margin', value: '1,619,578 / 26.9%' },
      { measure: 'Highest / Lowest Month', value: 'Dec (680,000) / Feb (385,000)' },
      { measure: 'Average Monthly Revenue', value: '502,464.83' },
      { measure: 'Quarterly Revenue (Q1–Q4)', value: '1,245,000 · 1,485,000 · 1,430,000 · 1,869,578' },
    ],
  },
];

export const MESSY_CUSTOMERS_DATA = {
  headers: ['Raw Customer Entry', 'Region Split', 'Text Amount'],
  rows: [
    ['  alam traders', 'Alam Traders - Rangpur', 'Tk 19200'],
    ['ALAM TRADERS ', 'Alam Traders - Rangpur', '9000'],
    ['Alam  Traders', 'Alam Traders - Rangpur', 'Tk 11400'],
    ['city mart', 'City Mart - Dhaka', '62000'],
    ['City Mart', 'City Mart - Dhaka', '8550'],
  ],
};

export function datasetToCSV(headers: string[], rows: (string | number)[][]): string {
  const escape = (val: string | number) => {
    const s = String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  return [headers.map(escape).join(','), ...rows.map((r) => r.map(escape).join(','))].join('\n');
}

export function downloadCSV(filename: string, headers: string[], rows: (string | number)[][]): void {
  const csv = datasetToCSV(headers, rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
