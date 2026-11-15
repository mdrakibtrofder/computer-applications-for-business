export type CellError = '#DIV/0!' | '#VALUE!' | '#NAME?' | '#REF!' | '#N/A' | '#NUM!' | '#SPILL!' | '#CIRC!';

export class ExcelEvalError extends Error {
  code: CellError;
  constructor(code: CellError) {
    super(code);
    this.code = code;
  }
}

export type CellScalar = string | number | boolean | null | CellError;
export type CellMatrix = CellScalar[][];
export type EvalValue = CellScalar | CellMatrix;

export type NumberFormatType = 'general' | 'comma' | 'dec2' | 'percent' | 'taka' | 'date';

export interface CellData {
  raw: string;
  format?: NumberFormatType;
}

export type SheetGrid = Record<string, CellData>; // key: "A1", "B2", etc.

export interface WorkbookContext {
  activeSheet: string;
  sheets: Record<string, SheetGrid>;
  namedRanges?: Record<string, string>; // e.g., VAT_Rate -> "Q2"
}

const EXCEL_ERRORS = new Set<string>(['#DIV/0!', '#VALUE!', '#NAME?', '#REF!', '#N/A', '#NUM!', '#SPILL!', '#CIRC!']);

export function isExcelError(val: unknown): val is CellError {
  return typeof val === 'string' && EXCEL_ERRORS.has(val);
}

export function colToIndex(col: string): number {
  let idx = 0;
  const upper = col.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    idx = idx * 26 + (upper.charCodeAt(i) - 64);
  }
  return idx - 1;
}

export function indexToCol(index: number): string {
  let col = '';
  let n = index + 1;
  while (n > 0) {
    const rem = (n - 1) % 26;
    col = String.fromCharCode(65 + rem) + col;
    n = Math.floor((n - 1) / 26);
  }
  return col;
}

export function parseCellRef(ref: string): { col: number; row: number; absCol: boolean; absRow: boolean } | null {
  const m = ref.trim().match(/^(\$?)([A-Z]{1,3})(\$?)([1-9][0-9]*)$/i);
  if (!m) return null;
  return {
    absCol: m[1] === '$',
    col: colToIndex(m[2]),
    absRow: m[3] === '$',
    row: parseInt(m[4], 10) - 1,
  };
}

export function shiftFormulaRefs(formula: string, dCol: number, dRow: number): string {
  if (!formula.startsWith('=')) return formula;
  // Replace cell references outside quoted strings
  let out = '';
  let inQuotes = false;
  let i = 0;
  while (i < formula.length) {
    const ch = formula[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      out += ch;
      i++;
      continue;
    }
    if (!inQuotes && (ch === '$' || /[A-Za-z]/.test(ch))) {
      // Check if preceded by identifier char (avoid shifting function names or sheet names like 'Price List'!)
      const prev = i > 0 ? formula[i - 1] : '';
      if (!/[A-Za-z0-9_.]/.test(prev)) {
        const rest = formula.slice(i);
        const m = rest.match(/^(\$?)([A-Z]{1,3})(\$?)([1-9][0-9]*)(?![A-Za-z0-9_(])/i);
        if (m) {
          const absCol = m[1] === '$';
          const colIdx = colToIndex(m[2]);
          const absRow = m[3] === '$';
          const rowIdx = parseInt(m[4], 10) - 1;
          const newCol = absCol ? colIdx : colIdx + dCol;
          const newRow = absRow ? rowIdx : rowIdx + dRow;
          if (newCol < 0 || newRow < 0) {
            out += '#REF!';
          } else {
            out += `${absCol ? '$' : ''}${indexToCol(newCol)}${absRow ? '$' : ''}${newRow + 1}`;
          }
          i += m[0].length;
          continue;
        }
      }
    }
    out += ch;
    i++;
  }
  return out;
}

// Excel Date Helpers (serial 1 = 1900-01-01; using standard JS UTC offset 25569 for 1970-01-01)
export function dateToExcelSerial(d: Date): number {
  const utc = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor(utc / 86400000) + 25569;
}

export function excelSerialToDate(serial: number): Date {
  const utcMs = (Math.floor(serial) - 25569) * 86400000;
  const d = new Date(utcMs);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

export function parseDateString(str: string): number | null {
  const s = str.trim();
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    return dateToExcelSerial(new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
  }
  const dmy = s.match(/^(\d{1,2})[-/ ]([A-Za-z]{3})[-/ ](\d{4})$/);
  if (dmy) {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const mIdx = months.indexOf(dmy[2].toLowerCase());
    if (mIdx >= 0) {
      return dateToExcelSerial(new Date(Number(dmy[3]), mIdx, Number(dmy[1])));
    }
  }
  return null;
}

function formatExcelDate(serial: number, fmt: string): string {
  const d = excelSerialToDate(serial);
  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const f = fmt.toLowerCase();
  if (f === 'dddd') return daysFull[d.getDay()];
  if (f === 'ddd') return daysShort[d.getDay()];
  if (f === 'mmmm') return monthsFull[d.getMonth()];
  if (f === 'mmm') return monthsShort[d.getMonth()];
  if (f === 'mmm-yyyy') return `${monthsShort[d.getMonth()]}-${d.getFullYear()}`;
  if (f === 'dd-mmm-yyyy') {
    return `${String(d.getDate()).padStart(2, '0')}-${monthsShort[d.getMonth()]}-${d.getFullYear()}`;
  }
  if (f === 'yyyy-mm-dd') {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  return `${String(d.getDate()).padStart(2, '0')}-${monthsShort[d.getMonth()]}-${d.getFullYear()}`;
}

export function formatCellDisplay(val: CellScalar, format: NumberFormatType = 'general'): string {
  if (val === null || val === undefined || val === '') return '';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (isExcelError(val)) return val;
  if (typeof val === 'string') {
    if (format === 'date') {
      const ser = parseDateString(val);
      if (ser !== null) return formatExcelDate(ser, 'dd-mmm-yyyy');
    }
    return val;
  }
  if (typeof val === 'number') {
    if (!Number.isFinite(val)) return '#NUM!';
    switch (format) {
      case 'taka':
        return `৳ ${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
      case 'percent':
        return `${(val * 100).toFixed(1).replace(/\.0$/, '')}%`;
      case 'dec2':
        return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      case 'comma':
        return val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
      case 'date':
        return formatExcelDate(val, 'dd-mmm-yyyy');
      default: {
        if (Math.abs(val) >= 1e11) return val.toExponential(2);
        const rounded = Math.round(val * 1e8) / 1e8;
        return Number.isInteger(rounded) ? String(rounded) : String(Number(rounded.toFixed(4)));
      }
    }
  }
  return String(val);
}

// Tokenizer & Recursive Descent Parser
type TokenType = 'NUMBER' | 'STRING' | 'BOOL' | 'CELL' | 'RANGE' | 'IDENT' | 'OP' | 'LPAREN' | 'RPAREN' | 'COMMA' | 'EOF';

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const s = expr.trim();

  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (ch === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }
    if (ch === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }
    if (ch === ',') {
      tokens.push({ type: 'COMMA', value: ',' });
      i++;
      continue;
    }
    if (ch === '"') {
      let str = '';
      i++;
      while (i < s.length) {
        if (s[i] === '"' && s[i + 1] === '"') {
          str += '"';
          i += 2;
        } else if (s[i] === '"') {
          i++;
          break;
        } else {
          str += s[i++];
        }
      }
      tokens.push({ type: 'STRING', value: str });
      continue;
    }
    // Multi-char operators
    const two = s.slice(i, i + 2);
    if (two === '>=' || two === '<=' || two === '<>') {
      tokens.push({ type: 'OP', value: two });
      i += 2;
      continue;
    }
    if ('+-*/^%&><='.includes(ch)) {
      tokens.push({ type: 'OP', value: ch });
      i++;
      continue;
    }
    // Numbers
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(s[i + 1] || ''))) {
      let num = '';
      while (i < s.length && /[0-9.]/.test(s[i])) num += s[i++];
      if (s[i] === '%') {
        tokens.push({ type: 'NUMBER', value: String(parseFloat(num) / 100) });
        i++;
      } else {
        tokens.push({ type: 'NUMBER', value: num });
      }
      continue;
    }
    // Quoted sheet reference: 'Price List'!A2:C9 or 'Price List'!$A$2
    if (ch === "'") {
      const rest = s.slice(i);
      const m = rest.match(/^'([^']+)'!(\$?[A-Z]{1,3}\$?[0-9]+(?::\$?[A-Z]{1,3}\$?[0-9]+)?)/i);
      if (m) {
        const isRange = m[2].includes(':');
        tokens.push({ type: isRange ? 'RANGE' : 'CELL', value: `${m[1]}!${m[2]}` });
        i += m[0].length;
        continue;
      }
    }
    // Unquoted sheet or cell/range/ident/function
    if (/[A-Za-z_$#]/.test(ch)) {
      const rest = s.slice(i);
      // Error literal
      const errMatch = rest.match(/^#(DIV\/0!|VALUE!|NAME\?|REF!|N\/A|NUM!|SPILL!)/i);
      if (errMatch) {
        tokens.push({ type: 'STRING', value: errMatch[0].toUpperCase() });
        i += errMatch[0].length;
        continue;
      }
      // Sheet!Range or Sheet!Cell
      const sheetRef = rest.match(/^([A-Za-z0-9_]+)!(\$?[A-Z]{1,3}\$?[0-9]+(?::\$?[A-Z]{1,3}\$?[0-9]+)?)/i);
      if (sheetRef) {
        const isRange = sheetRef[2].includes(':');
        tokens.push({ type: isRange ? 'RANGE' : 'CELL', value: `${sheetRef[1]}!${sheetRef[2]}` });
        i += sheetRef[0].length;
        continue;
      }
      // Range A1:B5 or A1#: handled
      const rangeMatch = rest.match(/^(\$?[A-Z]{1,3}\$?[1-9][0-9]*):(\$?[A-Z]{1,3}\$?[1-9][0-9]*)/i);
      if (rangeMatch) {
        tokens.push({ type: 'RANGE', value: rangeMatch[0] });
        i += rangeMatch[0].length;
        continue;
      }
      // Cell ref (allow optional # for spill)
      const cellMatch = rest.match(/^(\$?[A-Z]{1,3}\$?[1-9][0-9]*)(#?)(?![A-Za-z0-9_(])/i);
      if (cellMatch) {
        tokens.push({ type: 'CELL', value: cellMatch[1] });
        i += cellMatch[0].length;
        continue;
      }
      // Identifier / function name / TRUE / FALSE / NamedRange
      const idMatch = rest.match(/^[A-Za-z_][A-Za-z0-9_.]*/);
      if (idMatch) {
        const word = idMatch[0];
        const up = word.toUpperCase();
        if (up === 'TRUE' || up === 'FALSE') {
          tokens.push({ type: 'BOOL', value: up });
        } else {
          tokens.push({ type: 'IDENT', value: word });
        }
        i += word.length;
        continue;
      }
    }
    throw new ExcelEvalError('#VALUE!');
  }

  tokens.push({ type: 'EOF', value: '' });
  return tokens;
}

function toNumber(v: EvalValue): number {
  if (Array.isArray(v)) v = v[0]?.[0] ?? 0;
  if (isExcelError(v)) throw new ExcelEvalError(v);
  if (v === null || v === '') return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return v ? 1 : 0;
  if (typeof v === 'string') {
    const trimmed = v.trim();
    if (trimmed === '') return 0;
    const dSer = parseDateString(trimmed);
    if (dSer !== null) return dSer;
    const n = Number(trimmed.replace(/,/g, ''));
    if (!Number.isNaN(n)) return n;
  }
  throw new ExcelEvalError('#VALUE!');
}

function toStringVal(v: EvalValue): string {
  if (Array.isArray(v)) v = v[0]?.[0] ?? '';
  if (isExcelError(v)) throw new ExcelEvalError(v);
  if (v === null || v === undefined) return '';
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  return String(v);
}

function toBool(v: EvalValue): boolean {
  if (Array.isArray(v)) v = v[0]?.[0] ?? false;
  if (isExcelError(v)) throw new ExcelEvalError(v);
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v !== 0;
  if (typeof v === 'string') {
    if (v.toUpperCase() === 'TRUE') return true;
    if (v.toUpperCase() === 'FALSE' || v === '') return false;
  }
  throw new ExcelEvalError('#VALUE!');
}

function flattenValues(args: EvalValue[]): CellScalar[] {
  const out: CellScalar[] = [];
  for (const a of args) {
    if (Array.isArray(a)) {
      for (const row of a) {
        for (const cell of row) out.push(cell);
      }
    } else {
      out.push(a);
    }
  }
  return out;
}

function flattenNumbers(args: EvalValue[]): number[] {
  const out: number[] = [];
  for (const a of args) {
    if (Array.isArray(a)) {
      for (const row of a) {
        for (const cell of row) {
          if (isExcelError(cell)) throw new ExcelEvalError(cell);
          if (typeof cell === 'number') out.push(cell);
          else if (typeof cell === 'string') {
            const dSer = parseDateString(cell);
            if (dSer !== null) out.push(dSer);
          }
        }
      }
    } else {
      if (isExcelError(a)) throw new ExcelEvalError(a);
      if (typeof a === 'number') out.push(a);
      else if (typeof a === 'boolean') out.push(a ? 1 : 0);
      else if (typeof a === 'string' && a.trim() !== '') {
        const dSer = parseDateString(a);
        if (dSer !== null) out.push(dSer);
        else {
          const n = Number(a.replace(/,/g, ''));
          if (Number.isNaN(n)) throw new ExcelEvalError('#VALUE!');
          out.push(n);
        }
      }
    }
  }
  return out;
}

function matchesCriteria(cellVal: CellScalar, critVal: CellScalar): boolean {
  if (critVal === null || critVal === '') {
    return cellVal === null || cellVal === '';
  }
  const critStr = String(critVal).trim();
  if (critStr === '<>') {
    return cellVal !== null && cellVal !== '';
  }
  const opMatch = critStr.match(/^(>=|<=|<>|>|<|=)(.*)$/);
  if (opMatch) {
    const op = opMatch[1];
    const rhsRaw = opMatch[2].trim();
    const rhsNum = Number(rhsRaw);
    const cellNum = typeof cellVal === 'number' ? cellVal : typeof cellVal === 'string' ? parseDateString(cellVal) ?? Number(cellVal) : NaN;
    if (!Number.isNaN(rhsNum) && !Number.isNaN(cellNum) && rhsRaw !== '') {
      if (op === '>') return cellNum > rhsNum;
      if (op === '<') return cellNum < rhsNum;
      if (op === '>=') return cellNum >= rhsNum;
      if (op === '<=') return cellNum <= rhsNum;
      if (op === '<>') return cellNum !== rhsNum;
      if (op === '=') return cellNum === rhsNum;
    }
    const lhsStr = String(cellVal ?? '').toLowerCase();
    const rhsStr = rhsRaw.toLowerCase();
    if (op === '<>') return lhsStr !== rhsStr;
    if (op === '=') return lhsStr === rhsStr;
    return false;
  }
  // Wildcards * and ?
  if (typeof critVal === 'string' && (critVal.includes('*') || critVal.includes('?'))) {
    const regexStr = '^' + critVal.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$';
    return new RegExp(regexStr, 'i').test(String(cellVal ?? ''));
  }
  if (typeof cellVal === 'number' && typeof critVal === 'number') {
    return cellVal === critVal;
  }
  return String(cellVal ?? '').toLowerCase() === critStr.toLowerCase();
}

export function evaluateWorkbook(ctx: WorkbookContext): Record<string, Record<string, CellScalar>> {
  const results: Record<string, Record<string, CellScalar>> = {};
  const visiting = new Set<string>();
  const localEnv: Record<string, EvalValue> = {};

  function resolveRawCell(sheetName: string, key: string): CellScalar {
    const fullKey = `${sheetName}!${key}`;
    if (results[sheetName]?.[key] !== undefined) return results[sheetName][key];
    if (visiting.has(fullKey)) return '#CIRC!';

    const grid = ctx.sheets[sheetName];
    if (!grid) return '#REF!';
    const cell = grid[key];
    if (!cell || cell.raw === '') {
      results[sheetName] = results[sheetName] || {};
      results[sheetName][key] = null;
      return null;
    }

    const raw = cell.raw.trim();
    if (!raw.startsWith('=')) {
      let parsed: CellScalar = raw;
      if (/^-?[0-9,]+(\.[0-9]+)?%?$/.test(raw)) {
        if (raw.endsWith('%')) parsed = parseFloat(raw.replace(/,/g, '')) / 100;
        else parsed = parseFloat(raw.replace(/,/g, ''));
      } else if (raw.toUpperCase() === 'TRUE') parsed = true;
      else if (raw.toUpperCase() === 'FALSE') parsed = false;
      results[sheetName] = results[sheetName] || {};
      results[sheetName][key] = parsed;
      return parsed;
    }

    visiting.add(fullKey);
    let val: CellScalar;
    try {
      const ev = evalExpression(raw.slice(1), sheetName);
      if (Array.isArray(ev)) {
        val = ev[0]?.[0] ?? null;
      } else {
        val = ev;
      }
    } catch (e) {
      if (e instanceof ExcelEvalError) val = e.code;
      else val = '#VALUE!';
    }
    visiting.delete(fullKey);
    results[sheetName] = results[sheetName] || {};
    results[sheetName][key] = val;
    return val;
  }

  function resolveRange(rangeToken: string, currentSheet: string): CellMatrix {
    let sheet = currentSheet;
    let body = rangeToken;
    if (rangeToken.includes('!')) {
      const idx = rangeToken.indexOf('!');
      sheet = rangeToken.slice(0, idx);
      body = rangeToken.slice(idx + 1);
    }
    const [startStr, endStr] = body.split(':');
    const s = parseCellRef(startStr);
    const e = parseCellRef(endStr);
    if (!s || !e) throw new ExcelEvalError('#REF!');
    const r1 = Math.min(s.row, e.row);
    const r2 = Math.max(s.row, e.row);
    const c1 = Math.min(s.col, e.col);
    const c2 = Math.max(s.col, e.col);
    const matrix: CellMatrix = [];
    for (let r = r1; r <= r2; r++) {
      const rowArr: CellScalar[] = [];
      for (let c = c1; c <= c2; c++) {
        rowArr.push(resolveRawCell(sheet, `${indexToCol(c)}${r + 1}`));
      }
      matrix.push(rowArr);
    }
    return matrix;
  }

  function evalExpression(expr: string, currentSheet: string): EvalValue {
    const tokens = tokenize(expr);
    let pos = 0;
    const peek = () => tokens[pos];
    const next = () => tokens[pos++];

    function parseComparison(): EvalValue {
      let left = parseConcat();
      while (peek().type === 'OP' && ['=', '<>', '>=', '<=', '>', '<'].includes(peek().value)) {
        const op = next().value;
        const right = parseConcat();
        left = applyBinaryMatrix(left, right, (a, b) => {
          const an = typeof a === 'number' ? a : typeof a === 'string' ? parseDateString(a) : null;
          const bn = typeof b === 'number' ? b : typeof b === 'string' ? parseDateString(b) : null;
          if (an !== null && bn !== null) {
            if (op === '=') return an === bn;
            if (op === '<>') return an !== bn;
            if (op === '>') return an > bn;
            if (op === '<') return an < bn;
            if (op === '>=') return an >= bn;
            if (op === '<=') return an <= bn;
          }
          const as = String(a ?? '').toLowerCase();
          const bs = String(b ?? '').toLowerCase();
          if (op === '=') return as === bs;
          if (op === '<>') return as !== bs;
          if (op === '>') return as > bs;
          if (op === '<') return as < bs;
          if (op === '>=') return as >= bs;
          return as <= bs;
        });
      }
      return left;
    }

    function parseConcat(): EvalValue {
      let left = parseAddSub();
      while (peek().type === 'OP' && peek().value === '&') {
        next();
        const right = parseAddSub();
        left = `${toStringVal(left)}${toStringVal(right)}`;
      }
      return left;
    }

    function parseAddSub(): EvalValue {
      let left = parseMulDiv();
      while (peek().type === 'OP' && (peek().value === '+' || peek().value === '-')) {
        const op = next().value;
        const right = parseMulDiv();
        left = applyBinaryMatrix(left, right, (a, b) => {
          const x = toNumber(a);
          const y = toNumber(b);
          return op === '+' ? x + y : x - y;
        });
      }
      return left;
    }

    function parseMulDiv(): EvalValue {
      let left = parsePower();
      while (peek().type === 'OP' && (peek().value === '*' || peek().value === '/')) {
        const op = next().value;
        const right = parsePower();
        left = applyBinaryMatrix(left, right, (a, b) => {
          const x = toNumber(a);
          const y = toNumber(b);
          if (op === '/') {
            if (y === 0) throw new ExcelEvalError('#DIV/0!');
            return x / y;
          }
          return x * y;
        });
      }
      return left;
    }

    function parsePower(): EvalValue {
      let left = parseUnary();
      while (peek().type === 'OP' && peek().value === '^') {
        next();
        const right = parseUnary();
        left = Math.pow(toNumber(left), toNumber(right));
      }
      return left;
    }

    function parseUnary(): EvalValue {
      if (peek().type === 'OP' && (peek().value === '-' || peek().value === '+')) {
        const op = next().value;
        const val = parseUnary();
        const n = toNumber(val);
        return op === '-' ? -n : n;
      }
      return parsePrimary();
    }

    function applyBinaryMatrix(l: EvalValue, r: EvalValue, fn: (a: CellScalar, b: CellScalar) => CellScalar): EvalValue {
      if (!Array.isArray(l) && !Array.isArray(r)) return fn(l, r);
      const lm: CellMatrix = Array.isArray(l) ? l : [[l]];
      const rm: CellMatrix = Array.isArray(r) ? r : [[r]];
      const rows = Math.max(lm.length, rm.length);
      const cols = Math.max(lm[0]?.length || 1, rm[0]?.length || 1);
      const out: CellMatrix = [];
      for (let i = 0; i < rows; i++) {
        const row: CellScalar[] = [];
        for (let j = 0; j < cols; j++) {
          const lv = lm[Math.min(i, lm.length - 1)][Math.min(j, (lm[0]?.length || 1) - 1)];
          const rv = rm[Math.min(i, rm.length - 1)][Math.min(j, (rm[0]?.length || 1) - 1)];
          row.push(fn(lv, rv));
        }
        out.push(row);
      }
      return out;
    }

    function parsePrimary(): EvalValue {
      const t = peek();
      if (t.type === 'NUMBER') {
        next();
        return parseFloat(t.value);
      }
      if (t.type === 'STRING') {
        next();
        return t.value;
      }
      if (t.type === 'BOOL') {
        next();
        return t.value === 'TRUE';
      }
      if (t.type === 'LPAREN') {
        next();
        const v = parseComparison();
        if (peek().type !== 'RPAREN') throw new ExcelEvalError('#VALUE!');
        next();
        return v;
      }
      if (t.type === 'RANGE') {
        next();
        return resolveRange(t.value, currentSheet);
      }
      if (t.type === 'CELL') {
        next();
        let sheet = currentSheet;
        let addr = t.value;
        if (t.value.includes('!')) {
          const idx = t.value.indexOf('!');
          sheet = t.value.slice(0, idx);
          addr = t.value.slice(idx + 1);
        }
        const parsed = parseCellRef(addr);
        if (!parsed) throw new ExcelEvalError('#REF!');
        return resolveRawCell(sheet, `${indexToCol(parsed.col)}${parsed.row + 1}`);
      }
      if (t.type === 'IDENT') {
        next();
        const name = t.value;
        // Local LET variable
        if (peek().type !== 'LPAREN') {
          if (localEnv[name] !== undefined) return localEnv[name];
          const nr = ctx.namedRanges?.[name];
          if (nr) {
            if (nr.includes(':')) return resolveRange(nr, currentSheet);
            const parsed = parseCellRef(nr);
            if (parsed) return resolveRawCell(currentSheet, `${indexToCol(parsed.col)}${parsed.row + 1}`);
          }
          throw new ExcelEvalError('#NAME?');
        }
        // Function call
        next(); // consume '('
        const fnName = name.toUpperCase();
        // Lazy evaluation for IF, IFS, IFERROR, LET
        if (fnName === 'IF') {
          const cond = parseComparison();
          if (peek().type === 'COMMA') next();
          const tVal = parseArgRaw();
          let fVal: EvalValue = false;
          if (peek().type === 'COMMA') {
            next();
            fVal = parseArgRaw();
          }
          if (peek().type !== 'RPAREN') throw new ExcelEvalError('#VALUE!');
          next();
          return toBool(cond) ? evalExpression(tVal, currentSheet) : typeof fVal === 'string' ? evalExpression(fVal, currentSheet) : fVal;
        }
        if (fnName === 'IFERROR') {
          const primaryExpr = parseArgRaw();
          if (peek().type !== 'COMMA') throw new ExcelEvalError('#VALUE!');
          next();
          const fallbackExpr = parseArgRaw();
          if (peek().type !== 'RPAREN') throw new ExcelEvalError('#VALUE!');
          next();
          try {
            const res = evalExpression(primaryExpr, currentSheet);
            if (!Array.isArray(res) && isExcelError(res)) {
              return evalExpression(fallbackExpr, currentSheet);
            }
            return res;
          } catch {
            return evalExpression(fallbackExpr, currentSheet);
          }
        }
        if (fnName === 'LET') {
          const rawArgs: string[] = [];
          while (peek().type !== 'RPAREN' && peek().type !== 'EOF') {
            rawArgs.push(parseArgRaw());
            if (peek().type === 'COMMA') next();
          }
          if (peek().type !== 'RPAREN' || rawArgs.length < 3 || rawArgs.length % 2 === 0) throw new ExcelEvalError('#VALUE!');
          next();
          const saved: Record<string, EvalValue> = {};
          for (let k = 0; k < rawArgs.length - 1; k += 2) {
            const varName = rawArgs[k].trim();
            saved[varName] = localEnv[varName];
            localEnv[varName] = evalExpression(rawArgs[k + 1], currentSheet);
          }
          const result = evalExpression(rawArgs[rawArgs.length - 1], currentSheet);
          Object.keys(saved).forEach((vn) => {
            if (saved[vn] === undefined) delete localEnv[vn];
            else localEnv[vn] = saved[vn];
          });
          return result;
        }

        const args: EvalValue[] = [];
        if (peek().type !== 'RPAREN') {
          args.push(parseComparison());
          while (peek().type === 'COMMA') {
            next();
            args.push(parseComparison());
          }
        }
        if (peek().type !== 'RPAREN') throw new ExcelEvalError('#VALUE!');
        next();
        return callFunction(fnName, args);
      }
      throw new ExcelEvalError('#VALUE!');
    }

    function parseArgRaw(): string {
      let depth = 0;
      let inStr = false;
      let buf = '';
      while (peek().type !== 'EOF') {
        const cur = tokens[pos];
        if (!inStr) {
          if (cur.type === 'LPAREN') depth++;
          else if (cur.type === 'RPAREN') {
            if (depth === 0) break;
            depth--;
          } else if (cur.type === 'COMMA' && depth === 0) {
            break;
          }
        }
        if (cur.type === 'STRING') buf += `"${cur.value.replace(/"/g, '""')}"`;
        else buf += cur.value + (cur.type === 'IDENT' ? '' : '');
        pos++;
      }
      return buf;
    }

    const out = parseComparison();
    if (peek().type !== 'EOF') throw new ExcelEvalError('#VALUE!');
    return out;
  }

  function callFunction(fn: string, args: EvalValue[]): EvalValue {
    switch (fn) {
      case 'SUM':
        return flattenNumbers(args).reduce((a, b) => a + b, 0);
      case 'AVERAGE': {
        const nums = flattenNumbers(args);
        if (nums.length === 0) throw new ExcelEvalError('#DIV/0!');
        return nums.reduce((a, b) => a + b, 0) / nums.length;
      }
      case 'MIN': {
        const nums = flattenNumbers(args);
        return nums.length ? Math.min(...nums) : 0;
      }
      case 'MAX': {
        const nums = flattenNumbers(args);
        return nums.length ? Math.max(...nums) : 0;
      }
      case 'MEDIAN': {
        const nums = flattenNumbers(args).sort((a, b) => a - b);
        if (!nums.length) throw new ExcelEvalError('#NUM!');
        const mid = Math.floor(nums.length / 2);
        return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      }
      case 'LARGE': {
        const nums = flattenNumbers([args[0]]).sort((a, b) => b - a);
        const k = toNumber(args[1]);
        if (k < 1 || k > nums.length) throw new ExcelEvalError('#NUM!');
        return nums[k - 1];
      }
      case 'SMALL': {
        const nums = flattenNumbers([args[0]]).sort((a, b) => a - b);
        const k = toNumber(args[1]);
        if (k < 1 || k > nums.length) throw new ExcelEvalError('#NUM!');
        return nums[k - 1];
      }
      case 'COUNT': {
        const vals = flattenValues(args);
        return vals.filter((v) => typeof v === 'number' || (typeof v === 'string' && parseDateString(v) !== null)).length;
      }
      case 'COUNTA': {
        const vals = flattenValues(args);
        return vals.filter((v) => v !== null && v !== '').length;
      }
      case 'COUNTBLANK': {
        const vals = flattenValues(args);
        return vals.filter((v) => v === null || v === '').length;
      }
      case 'RANK.EQ':
      case 'RANK': {
        const target = toNumber(args[0]);
        const nums = flattenNumbers([args[1]]);
        const order = args[2] !== undefined ? toNumber(args[2]) : 0;
        const sorted = [...nums].sort((a, b) => (order === 0 ? b - a : a - b));
        const idx = sorted.indexOf(target);
        if (idx === -1) throw new ExcelEvalError('#N/A');
        return idx + 1;
      }
      case 'ROUND': {
        const n = toNumber(args[0]);
        const d = toNumber(args[1] ?? 0);
        const factor = Math.pow(10, d);
        return Math.round((n + Number.EPSILON) * factor) / factor;
      }
      case 'ROUNDUP': {
        const n = toNumber(args[0]);
        const d = toNumber(args[1] ?? 0);
        const factor = Math.pow(10, d);
        return (n >= 0 ? Math.ceil(n * factor) : Math.floor(n * factor)) / factor;
      }
      case 'ROUNDDOWN': {
        const n = toNumber(args[0]);
        const d = toNumber(args[1] ?? 0);
        const factor = Math.pow(10, d);
        return Math.trunc(n * factor) / factor;
      }
      case 'INT':
        return Math.floor(toNumber(args[0]));
      case 'MOD': {
        const a = toNumber(args[0]);
        const b = toNumber(args[1]);
        if (b === 0) throw new ExcelEvalError('#DIV/0!');
        return ((a % b) + b) % b;
      }
      case 'ABS':
        return Math.abs(toNumber(args[0]));
      case 'SQRT': {
        const n = toNumber(args[0]);
        if (n < 0) throw new ExcelEvalError('#NUM!');
        return Math.sqrt(n);
      }
      case 'POWER':
        return Math.pow(toNumber(args[0]), toNumber(args[1]));
      case 'PRODUCT':
        return flattenNumbers(args).reduce((a, b) => a * b, 1);
      case 'SUMPRODUCT': {
        const mats: CellScalar[][] = args.map((a) => flattenValues([a]));
        const len = mats[0]?.length || 0;
        let sum = 0;
        for (let i = 0; i < len; i++) {
          let prod = 1;
          for (const m of mats) {
            const v = m[i];
            prod *= typeof v === 'number' ? v : typeof v === 'boolean' ? (v ? 1 : 0) : Number(v || 0);
          }
          sum += prod;
        }
        return sum;
      }
      case 'SUBTOTAL': {
        const fnum = toNumber(args[0]);
        const rest = args.slice(1);
        if (fnum === 9 || fnum === 109) return callFunction('SUM', rest);
        if (fnum === 1 || fnum === 101) return callFunction('AVERAGE', rest);
        if (fnum === 2 || fnum === 102) return callFunction('COUNT', rest);
        if (fnum === 3 || fnum === 103) return callFunction('COUNTA', rest);
        if (fnum === 4 || fnum === 104) return callFunction('MAX', rest);
        if (fnum === 5 || fnum === 105) return callFunction('MIN', rest);
        return callFunction('SUM', rest);
      }
      case 'IFS': {
        for (let i = 0; i + 1 < args.length; i += 2) {
          if (toBool(args[i])) return args[i + 1];
        }
        throw new ExcelEvalError('#N/A');
      }
      case 'AND':
        return flattenValues(args).every((v) => toBool(v));
      case 'OR':
        return flattenValues(args).some((v) => toBool(v));
      case 'NOT':
        return !toBool(args[0]);
      case 'ISBLANK': {
        const v = Array.isArray(args[0]) ? args[0][0][0] : args[0];
        return v === null || v === '';
      }
      case 'ISNUMBER': {
        const v = Array.isArray(args[0]) ? args[0][0][0] : args[0];
        return typeof v === 'number';
      }
      case 'ISTEXT': {
        const v = Array.isArray(args[0]) ? args[0][0][0] : args[0];
        return typeof v === 'string' && !isExcelError(v);
      }
      case 'ISERROR': {
        const v = Array.isArray(args[0]) ? args[0][0][0] : args[0];
        return isExcelError(v);
      }
      case 'COUNTIF': {
        const r = flattenValues([args[0]]);
        const crit = Array.isArray(args[1]) ? args[1][0][0] : args[1];
        return r.filter((v) => matchesCriteria(v, crit)).length;
      }
      case 'COUNTIFS': {
        const ranges: CellScalar[][] = [];
        const crits: CellScalar[] = [];
        for (let i = 0; i + 1 < args.length; i += 2) {
          ranges.push(flattenValues([args[i]]));
          const c = args[i + 1];
          crits.push(Array.isArray(c) ? c[0][0] : c);
        }
        const len = ranges[0]?.length || 0;
        let count = 0;
        for (let r = 0; r < len; r++) {
          if (ranges.every((arr, idx) => matchesCriteria(arr[r], crits[idx]))) count++;
        }
        return count;
      }
      case 'SUMIF': {
        const r = flattenValues([args[0]]);
        const crit = Array.isArray(args[1]) ? args[1][0][0] : args[1];
        const sumR = args[2] !== undefined ? flattenValues([args[2]]) : r;
        let total = 0;
        for (let i = 0; i < r.length; i++) {
          if (matchesCriteria(r[i], crit)) {
            const val = sumR[i];
            if (typeof val === 'number') total += val;
          }
        }
        return total;
      }
      case 'SUMIFS': {
        const sumR = flattenValues([args[0]]);
        const ranges: CellScalar[][] = [];
        const crits: CellScalar[] = [];
        for (let i = 1; i + 1 < args.length; i += 2) {
          ranges.push(flattenValues([args[i]]));
          const c = args[i + 1];
          crits.push(Array.isArray(c) ? c[0][0] : c);
        }
        let total = 0;
        for (let r = 0; r < sumR.length; r++) {
          if (ranges.every((arr, idx) => matchesCriteria(arr[r], crits[idx]))) {
            const val = sumR[r];
            if (typeof val === 'number') total += val;
          }
        }
        return total;
      }
      case 'AVERAGEIF': {
        const r = flattenValues([args[0]]);
        const crit = Array.isArray(args[1]) ? args[1][0][0] : args[1];
        const avgR = args[2] !== undefined ? flattenValues([args[2]]) : r;
        let total = 0;
        let count = 0;
        for (let i = 0; i < r.length; i++) {
          if (matchesCriteria(r[i], crit) && typeof avgR[i] === 'number') {
            total += avgR[i] as number;
            count++;
          }
        }
        if (count === 0) throw new ExcelEvalError('#DIV/0!');
        return total / count;
      }
      case 'AVERAGEIFS': {
        const avgR = flattenValues([args[0]]);
        const ranges: CellScalar[][] = [];
        const crits: CellScalar[] = [];
        for (let i = 1; i + 1 < args.length; i += 2) {
          ranges.push(flattenValues([args[i]]));
          const c = args[i + 1];
          crits.push(Array.isArray(c) ? c[0][0] : c);
        }
        let total = 0;
        let count = 0;
        for (let r = 0; r < avgR.length; r++) {
          if (ranges.every((arr, idx) => matchesCriteria(arr[r], crits[idx])) && typeof avgR[r] === 'number') {
            total += avgR[r] as number;
            count++;
          }
        }
        if (count === 0) throw new ExcelEvalError('#DIV/0!');
        return total / count;
      }
      case 'MAXIFS':
      case 'MINIFS': {
        const targetR = flattenValues([args[0]]);
        const ranges: CellScalar[][] = [];
        const crits: CellScalar[] = [];
        for (let i = 1; i + 1 < args.length; i += 2) {
          ranges.push(flattenValues([args[i]]));
          const c = args[i + 1];
          crits.push(Array.isArray(c) ? c[0][0] : c);
        }
        const matched: number[] = [];
        for (let r = 0; r < targetR.length; r++) {
          if (ranges.every((arr, idx) => matchesCriteria(arr[r], crits[idx])) && typeof targetR[r] === 'number') {
            matched.push(targetR[r] as number);
          }
        }
        if (!matched.length) return 0;
        return fn === 'MAXIFS' ? Math.max(...matched) : Math.min(...matched);
      }
      case 'VLOOKUP': {
        const lookupVal = Array.isArray(args[0]) ? args[0][0][0] : args[0];
        const table = args[1] as CellMatrix;
        const colIdx = toNumber(args[2]);
        const approx = args[3] === undefined ? true : toBool(args[3]);
        if (!Array.isArray(table)) throw new ExcelEvalError('#VALUE!');
        if (colIdx < 1 || colIdx > (table[0]?.length || 0)) throw new ExcelEvalError('#REF!');
        if (!approx) {
          for (const row of table) {
            const key = row[0];
            if (typeof key === 'number' && typeof lookupVal === 'number' && key === lookupVal) return row[colIdx - 1];
            if (String(key ?? '').toLowerCase() === String(lookupVal ?? '').toLowerCase()) return row[colIdx - 1];
          }
          throw new ExcelEvalError('#N/A');
        } else {
          const targetNum = toNumber(lookupVal);
          let bestRow: CellScalar[] | null = null;
          for (const row of table) {
            if (typeof row[0] === 'number' && row[0] <= targetNum) {
              bestRow = row;
            }
          }
          if (!bestRow) throw new ExcelEvalError('#N/A');
          return bestRow[colIdx - 1];
        }
      }
      case 'HLOOKUP': {
        const lookupVal = Array.isArray(args[0]) ? args[0][0][0] : args[0];
        const table = args[1] as CellMatrix;
        const rowIdx = toNumber(args[2]);
        const approx = args[3] === undefined ? true : toBool(args[3]);
        if (!Array.isArray(table)) throw new ExcelEvalError('#VALUE!');
        if (rowIdx < 1 || rowIdx > table.length) throw new ExcelEvalError('#REF!');
        const topRow = table[0];
        if (!approx) {
          for (let c = 0; c < topRow.length; c++) {
            if (String(topRow[c] ?? '').toLowerCase() === String(lookupVal ?? '').toLowerCase()) return table[rowIdx - 1][c];
          }
          throw new ExcelEvalError('#N/A');
        } else {
          const targetNum = toNumber(lookupVal);
          let bestCol = -1;
          for (let c = 0; c < topRow.length; c++) {
            if (typeof topRow[c] === 'number' && (topRow[c] as number) <= targetNum) bestCol = c;
          }
          if (bestCol === -1) throw new ExcelEvalError('#N/A');
          return table[rowIdx - 1][bestCol];
        }
      }
      case 'XLOOKUP': {
        const lookupVal = Array.isArray(args[0]) ? args[0][0][0] : args[0];
        const lookupArr = flattenValues([args[1]]);
        const returnArr = flattenValues([args[2]]);
        const ifNotFound = args[3];
        const matchMode = args[4] !== undefined ? toNumber(args[4]) : 0;
        if (matchMode === 0) {
          for (let i = 0; i < lookupArr.length; i++) {
            const k = lookupArr[i];
            if (typeof k === 'number' && typeof lookupVal === 'number' && k === lookupVal) return returnArr[i] ?? null;
            if (String(k ?? '').toLowerCase() === String(lookupVal ?? '').toLowerCase()) return returnArr[i] ?? null;
          }
        } else if (matchMode === -1) {
          const t = toNumber(lookupVal);
          let best = -1;
          for (let i = 0; i < lookupArr.length; i++) {
            if (typeof lookupArr[i] === 'number' && (lookupArr[i] as number) <= t) best = i;
          }
          if (best >= 0) return returnArr[best] ?? null;
        }
        if (ifNotFound !== undefined) return ifNotFound;
        throw new ExcelEvalError('#N/A');
      }
      case 'INDEX': {
        const arr = args[0] as CellMatrix;
        const r = toNumber(args[1]);
        const c = args[2] !== undefined ? toNumber(args[2]) : 1;
        if (!Array.isArray(arr)) throw new ExcelEvalError('#VALUE!');
        if (r < 1 || r > arr.length || c < 1 || c > (arr[0]?.length || 0)) throw new ExcelEvalError('#REF!');
        return arr[r - 1][c - 1];
      }
      case 'MATCH': {
        const val = Array.isArray(args[0]) ? args[0][0][0] : args[0];
        const arr = flattenValues([args[1]]);
        const mode = args[2] !== undefined ? toNumber(args[2]) : 1;
        if (mode === 0) {
          for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'number' && typeof val === 'number' && arr[i] === val) return i + 1;
            if (String(arr[i] ?? '').toLowerCase() === String(val ?? '').toLowerCase()) return i + 1;
          }
          throw new ExcelEvalError('#N/A');
        }
        const t = toNumber(val);
        let best = -1;
        for (let i = 0; i < arr.length; i++) {
          if (typeof arr[i] === 'number' && (arr[i] as number) <= t) best = i;
        }
        if (best === -1) throw new ExcelEvalError('#N/A');
        return best + 1;
      }
      case 'LEFT': {
        const s = toStringVal(args[0]);
        const n = args[1] !== undefined ? toNumber(args[1]) : 1;
        return s.slice(0, Math.max(0, n));
      }
      case 'RIGHT': {
        const s = toStringVal(args[0]);
        const n = args[1] !== undefined ? toNumber(args[1]) : 1;
        return n <= 0 ? '' : s.slice(-n);
      }
      case 'MID': {
        const s = toStringVal(args[0]);
        const start = toNumber(args[1]);
        const len = toNumber(args[2]);
        if (start < 1 || len < 0) throw new ExcelEvalError('#VALUE!');
        return s.slice(start - 1, start - 1 + len);
      }
      case 'LEN':
        return toStringVal(args[0]).length;
      case 'TRIM':
        return toStringVal(args[0]).trim().replace(/\s+/g, ' ');
      case 'CLEAN':
        // eslint-disable-next-line no-control-regex
        return toStringVal(args[0]).replace(/[\x00-\x1F]/g, '');
      case 'UPPER':
        return toStringVal(args[0]).toUpperCase();
      case 'LOWER':
        return toStringVal(args[0]).toLowerCase();
      case 'PROPER':
        return toStringVal(args[0])
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase());
      case 'CONCAT':
      case 'CONCATENATE':
        return flattenValues(args)
          .map((v) => (v === null ? '' : String(v)))
          .join('');
      case 'TEXTJOIN': {
        const delim = toStringVal(args[0]);
        const ignoreEmpty = toBool(args[1]);
        const items = flattenValues(args.slice(2)).map((v) => (v === null ? '' : String(v)));
        return (ignoreEmpty ? items.filter((x) => x !== '') : items).join(delim);
      }
      case 'SUBSTITUTE': {
        const txt = toStringVal(args[0]);
        const oldT = toStringVal(args[1]);
        const newT = toStringVal(args[2]);
        return txt.split(oldT).join(newT);
      }
      case 'TEXT': {
        const val = toNumber(args[0]);
        const fmt = toStringVal(args[1]);
        if (fmt.includes('mmm') || fmt.includes('ddd') || fmt.includes('yyyy')) {
          return formatExcelDate(val, fmt);
        }
        if (fmt.includes('%')) return `${(val * 100).toFixed(1)}%`;
        return formatCellDisplay(val, 'comma');
      }
      case 'VALUE': {
        const n = Number(toStringVal(args[0]).replace(/[^0-9.-]/g, ''));
        if (Number.isNaN(n)) throw new ExcelEvalError('#VALUE!');
        return n;
      }
      case 'TODAY':
        return dateToExcelSerial(new Date());
      case 'NOW':
        return dateToExcelSerial(new Date());
      case 'DATE':
        return dateToExcelSerial(new Date(toNumber(args[0]), toNumber(args[1]) - 1, toNumber(args[2])));
      case 'YEAR':
        return excelSerialToDate(toNumber(args[0])).getFullYear();
      case 'MONTH':
        return excelSerialToDate(toNumber(args[0])).getMonth() + 1;
      case 'DAY':
        return excelSerialToDate(toNumber(args[0])).getDate();
      case 'EDATE': {
        const d = excelSerialToDate(toNumber(args[0]));
        const m = toNumber(args[1]);
        const target = new Date(d.getFullYear(), d.getMonth() + m, d.getDate());
        return dateToExcelSerial(target);
      }
      case 'EOMONTH': {
        const d = excelSerialToDate(toNumber(args[0]));
        const m = toNumber(args[1]);
        return dateToExcelSerial(new Date(d.getFullYear(), d.getMonth() + m + 1, 0));
      }
      case 'WEEKDAY': {
        const d = excelSerialToDate(toNumber(args[0]));
        return d.getDay() + 1;
      }
      case 'DATEDIF': {
        const s = excelSerialToDate(toNumber(args[0]));
        const e = excelSerialToDate(toNumber(args[1]));
        if (s > e) throw new ExcelEvalError('#NUM!');
        const unit = toStringVal(args[2]).toUpperCase();
        if (unit === 'D') return dateToExcelSerial(e) - dateToExcelSerial(s);
        if (unit === 'M') return (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()) - (e.getDate() < s.getDate() ? 1 : 0);
        if (unit === 'Y') {
          let y = e.getFullYear() - s.getFullYear();
          if (e.getMonth() < s.getMonth() || (e.getMonth() === s.getMonth() && e.getDate() < s.getDate())) y--;
          return y;
        }
        return dateToExcelSerial(e) - dateToExcelSerial(s);
      }
      case 'NETWORKDAYS':
      case 'NETWORKDAYS.INTL': {
        const sSer = Math.floor(toNumber(args[0]));
        const eSer = Math.floor(toNumber(args[1]));
        const weekendCode = fn === 'NETWORKDAYS.INTL' && args[2] !== undefined ? toNumber(args[2]) : 1;
        // code 1 = Sat(6), Sun(0); code 7 = Fri(5), Sat(6)
        const weekendDays = weekendCode === 7 ? [5, 6] : [0, 6];
        let count = 0;
        const step = sSer <= eSer ? 1 : -1;
        for (let cur = sSer; step > 0 ? cur <= eSer : cur >= eSer; cur += step) {
          const dow = excelSerialToDate(cur).getDay();
          if (!weekendDays.includes(dow)) count += step;
        }
        return count;
      }
      case 'WORKDAY': {
        let cur = Math.floor(toNumber(args[0]));
        let remaining = Math.floor(toNumber(args[1]));
        const step = remaining >= 0 ? 1 : -1;
        remaining = Math.abs(remaining);
        while (remaining > 0) {
          cur += step;
          const dow = excelSerialToDate(cur).getDay();
          if (dow !== 0 && dow !== 6) remaining--;
        }
        return cur;
      }
      case 'PMT': {
        const rate = toNumber(args[0]);
        const nper = toNumber(args[1]);
        const pv = toNumber(args[2]);
        const fv = args[3] !== undefined ? toNumber(args[3]) : 0;
        if (rate === 0) return -(pv + fv) / nper;
        const pvif = Math.pow(1 + rate, nper);
        return -(rate * (pv * pvif + fv)) / (pvif - 1);
      }
      case 'FV': {
        const rate = toNumber(args[0]);
        const nper = toNumber(args[1]);
        const pmt = toNumber(args[2]);
        const pv = args[3] !== undefined ? toNumber(args[3]) : 0;
        if (rate === 0) return -(pv + pmt * nper);
        const factor = Math.pow(1 + rate, nper);
        return -(pv * factor + pmt * ((factor - 1) / rate));
      }
      case 'PV': {
        const rate = toNumber(args[0]);
        const nper = toNumber(args[1]);
        const pmt = toNumber(args[2]);
        const fv = args[3] !== undefined ? toNumber(args[3]) : 0;
        if (rate === 0) return -(fv + pmt * nper);
        const factor = Math.pow(1 + rate, nper);
        return -(fv + pmt * ((factor - 1) / rate)) / factor;
      }
      case 'NPER': {
        const rate = toNumber(args[0]);
        const pmt = toNumber(args[1]);
        const pv = toNumber(args[2]);
        const fv = args[3] !== undefined ? toNumber(args[3]) : 0;
        if (rate === 0) return -(pv + fv) / pmt;
        return Math.log((pmt - fv * rate) / (pmt + pv * rate)) / Math.log(1 + rate);
      }
      case 'RATE': {
        const nper = toNumber(args[0]);
        const pmt = toNumber(args[1]);
        const pv = toNumber(args[2]);
        let r = 0.01;
        for (let iter = 0; iter < 50; iter++) {
          const factor = Math.pow(1 + r, nper);
          const f = pv * factor + pmt * ((factor - 1) / r);
          const df =
            pv * nper * Math.pow(1 + r, nper - 1) +
            pmt * ((nper * r * Math.pow(1 + r, nper - 1) - (factor - 1)) / (r * r));
          r = r - f / df;
        }
        return r;
      }
      case 'IPMT': {
        const rate = toNumber(args[0]);
        const per = toNumber(args[1]);
        const nper = toNumber(args[2]);
        const pv = toNumber(args[3]);
        const pmt = callFunction('PMT', [rate, nper, pv]) as number;
        let bal = pv;
        for (let p = 1; p < per; p++) {
          bal = bal * (1 + rate) + pmt;
        }
        return -bal * rate;
      }
      case 'PPMT': {
        const rate = toNumber(args[0]);
        const per = toNumber(args[1]);
        const nper = toNumber(args[2]);
        const pv = toNumber(args[3]);
        const pmt = callFunction('PMT', [rate, nper, pv]) as number;
        const ipmt = callFunction('IPMT', [rate, per, nper, pv]) as number;
        return pmt - ipmt;
      }
      case 'NPV': {
        const rate = toNumber(args[0]);
        const flows = flattenNumbers(args.slice(1));
        return flows.reduce((acc, cf, idx) => acc + cf / Math.pow(1 + rate, idx + 1), 0);
      }
      case 'IRR': {
        const flows = flattenNumbers([args[0]]);
        let r = 0.1;
        for (let iter = 0; iter < 60; iter++) {
          let npv = 0;
          let dnpv = 0;
          for (let t = 0; t < flows.length; t++) {
            npv += flows[t] / Math.pow(1 + r, t);
            if (t > 0) dnpv -= (t * flows[t]) / Math.pow(1 + r, t + 1);
          }
          if (Math.abs(npv) < 1e-7) break;
          r = r - npv / dnpv;
        }
        return r;
      }
      case 'SLN': {
        const cost = toNumber(args[0]);
        const salvage = toNumber(args[1]);
        const life = toNumber(args[2]);
        return (cost - salvage) / life;
      }
      case 'DB': {
        const cost = toNumber(args[0]);
        const salvage = toNumber(args[1]);
        const life = toNumber(args[2]);
        const period = toNumber(args[3]);
        const rate = Math.round((1 - Math.pow(salvage / cost, 1 / life)) * 1000) / 1000;
        let dep = 0;
        let totalDep = 0;
        for (let p = 1; p <= period; p++) {
          dep = p === 1 ? (cost * rate * 12) / 12 : (cost - totalDep) * rate;
          totalDep += dep;
        }
        return dep;
      }
      case 'DDB': {
        const cost = toNumber(args[0]);
        const salvage = toNumber(args[1]);
        const life = toNumber(args[2]);
        const period = toNumber(args[3]);
        const factor = args[4] !== undefined ? toNumber(args[4]) : 2;
        const rate = factor / life;
        let book = cost;
        let dep = 0;
        for (let p = 1; p <= period; p++) {
          dep = Math.min(book * rate, Math.max(0, book - salvage));
          book -= dep;
        }
        return dep;
      }
      case 'UNIQUE': {
        const vals = flattenValues([args[0]]).filter((v) => v !== null && v !== '');
        const seen = new Set<string>();
        const out: CellMatrix = [];
        for (const v of vals) {
          const k = String(v).toLowerCase();
          if (!seen.has(k)) {
            seen.add(k);
            out.push([v]);
          }
        }
        return out.length ? out : [[null]];
      }
      case 'SORT': {
        const mat = (Array.isArray(args[0]) ? args[0] : [[args[0]]]) as CellMatrix;
        const sortCol = (args[1] !== undefined ? toNumber(args[1]) : 1) - 1;
        const order = args[2] !== undefined ? toNumber(args[2]) : 1;
        return [...mat].sort((a, b) => {
          const va = a[sortCol];
          const vb = b[sortCol];
          if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * order;
          return String(va ?? '').localeCompare(String(vb ?? '')) * order;
        });
      }
      case 'FILTER': {
        const mat = args[0] as CellMatrix;
        const inc = flattenValues([args[1]]);
        const filtered = mat.filter((_, idx) => Boolean(inc[idx]));
        if (filtered.length === 0) {
          if (args[2] !== undefined) return args[2];
          throw new ExcelEvalError('#N/A');
        }
        return filtered;
      }
      case 'SEQUENCE': {
        const rows = toNumber(args[0]);
        const cols = args[1] !== undefined ? toNumber(args[1]) : 1;
        const start = args[2] !== undefined ? toNumber(args[2]) : 1;
        const step = args[3] !== undefined ? toNumber(args[3]) : 1;
        const out: CellMatrix = [];
        let val = start;
        for (let r = 0; r < rows; r++) {
          const row: CellScalar[] = [];
          for (let c = 0; c < cols; c++) {
            row.push(val);
            val += step;
          }
          out.push(row);
        }
        return out;
      }
      default:
        throw new ExcelEvalError('#NAME?');
    }
  }

  Object.keys(ctx.sheets).forEach((sName) => {
    results[sName] = results[sName] || {};
    const grid = ctx.sheets[sName];
    Object.keys(grid).forEach((cellKey) => {
      resolveRawCell(sName, cellKey);
    });
  });

  return results;
}
