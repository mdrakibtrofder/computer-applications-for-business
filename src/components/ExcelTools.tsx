import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Calculator,
  BarChart3,
  PieChart,
  TrendingUp,
  Layers,
  Filter,
  RotateCcw,
} from 'lucide-react';
import {
  evaluateWorkbook,
  indexToCol,
  shiftFormulaRefs,
  SheetGrid,
  isExcelError,
} from '../utils/excelEngine';
import { ERROR_SPOTTER_ITEMS, FORMULA_DRILLS } from '../data/drills';
import { DATASETS } from '../data/datasets';
import { getSolvedDrills, markDrillSolved } from '../utils/storage';

// ------------------------------------------------------------------
// 1. REFERENCE VISUALISER
// ------------------------------------------------------------------
export const ReferenceVisualiser: React.FC<{ initialFormula?: string }> = ({
  initialFormula = '=B2*$E$1',
}) => {
  const [formula, setFormula] = useState(initialFormula);
  const [colsCount, setColsCount] = useState(3);
  const [rowsCount, setRowsCount] = useState(4);

  const highlightRefs = (f: string) => {
    const parts = f.split(/(\$?[A-Z]{1,3}\$?[0-9]+)/gi);
    return parts.map((part, idx) => {
      const m = part.match(/^(\$?)([A-Z]{1,3})(\$?)([0-9]+)$/i);
      if (!m) return <span key={idx}>{part}</span>;
      const absCol = m[1] === '$';
      const absRow = m[3] === '$';
      let cls = 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40'; // Relative
      if (absCol && absRow) cls = 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40'; // Absolute
      else if (absCol || absRow) cls = 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40'; // Mixed
      return (
        <span key={idx} className={`px-1 rounded font-semibold ${cls}`}>
          {part}
        </span>
      );
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cell Reference Visualiser</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Type a formula in cell <strong>C2</strong> and inspect how Relative, Absolute, and Mixed references transform when filled across.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {['=B2*$E$1', '=$A2*B$1', '=A2+B2', '=L2*VAT_Rate'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setFormula(preset)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Origin Formula (C2)
            </label>
            <input
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Fill Columns Right: {colsCount}
            </label>
            <input
              type="range"
              min={1}
              max={5}
              value={colsCount}
              onChange={(e) => setColsCount(Number(e.target.value))}
              className="w-full accent-[#217346]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Fill Rows Down: {rowsCount}
            </label>
            <input
              type="range"
              min={1}
              max={6}
              value={rowsCount}
              onChange={(e) => setRowsCount(Number(e.target.value))}
              className="w-full accent-[#217346]"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-xs pt-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-100 border border-blue-400"></span>
            Relative (moves both ways)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-100 border border-purple-400"></span>
            Absolute ($A$1 locked)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-400"></span>
            Mixed ($A1 or A$1 half-locked)
          </span>
        </div>

        <div className="overflow-x-auto worksheet-scroll border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <th className="w-10 p-2 border-b border-r border-slate-200 dark:border-slate-700"></th>
                {Array.from({ length: colsCount }).map((_, c) => (
                  <th key={c} className="p-2 border-b border-r border-slate-200 dark:border-slate-700 text-center">
                    {indexToCol(2 + c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rowsCount }).map((_, r) => (
                <tr key={r}>
                  <td className="p-2 border-b border-r border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-center text-slate-500">
                    {2 + r}
                  </td>
                  {Array.from({ length: colsCount }).map((_, c) => {
                    const shifted = shiftFormulaRefs(formula, c, r);
                    const isOrigin = r === 0 && c === 0;
                    return (
                      <td
                        key={c}
                        className={`p-2.5 border-b border-r border-slate-200 dark:border-slate-800 whitespace-nowrap ${
                          isOrigin ? 'ring-2 ring-inset ring-[#217346] bg-emerald-50/30 dark:bg-emerald-950/20' : ''
                        }`}
                      >
                        {highlightRefs(shifted)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 2. FORMULA BUILDER DRILLS (44 tasks)
// ------------------------------------------------------------------
export const FormulaDrillsTool: React.FC = () => {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(FORMULA_DRILLS.map((d) => d.category)))],
    []
  );
  const [activeCat, setActiveCat] = useState('All');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { ok: boolean; actual: string }>>({});
  const [solved, setSolved] = useState<string[]>(() => getSolvedDrills());

  const filtered = activeCat === 'All' ? FORMULA_DRILLS : FORMULA_DRILLS.filter((d) => d.category === activeCat);

  const checkFormulaDrill = (drillId: string) => {
    const drill = FORMULA_DRILLS.find((d) => d.id === drillId);
    if (!drill) return;
    const raw = (inputs[drillId] || '').trim();
    if (!raw.startsWith('=')) {
      setFeedback((prev) => ({
        ...prev,
        [drillId]: { ok: false, actual: 'Formula must start with =' },
      }));
      return;
    }

    const grid: SheetGrid = {};
    (drill.gridData || []).forEach((row, r) => {
      row.forEach((cellVal, c) => {
        grid[`${indexToCol(c)}${r + 1}`] = { raw: String(cellVal) };
      });
    });
    const target = drill.targetCell || 'Z1';
    grid[target] = { raw };

    const res = evaluateWorkbook({ activeSheet: 'Sheet1', sheets: { Sheet1: grid } });
    const actualVal = res.Sheet1[target];

    let ok = false;
    if (typeof drill.expectedValue === 'number' && typeof actualVal === 'number') {
      ok = Math.abs(actualVal - drill.expectedValue) <= 0.02;
    } else if (isExcelError(drill.expectedValue) && actualVal === drill.expectedValue) {
      ok = true;
    } else if (String(actualVal ?? '').toLowerCase() === String(drill.expectedValue).toLowerCase()) {
      ok = true;
    }

    setFeedback((prev) => ({
      ...prev,
      [drillId]: { ok, actual: actualVal === null ? 'Empty' : String(actualVal) },
    }));
    if (ok) setSolved(markDrillSolved(drillId));
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Formula Builder Drills ({solved.length}/{FORMULA_DRILLS.length} solved)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Type any valid Excel formula that computes the expected value on the mini-sheet.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeCat === cat
                  ? 'bg-[#217346] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((drill) => {
          const fb = feedback[drill.id];
          const isSolved = solved.includes(drill.id);

          return (
            <div
              key={drill.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Drill #{drill.number} · {drill.category}
                </div>
                {isSolved && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                  </span>
                )}
              </div>

              <div className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                {drill.task}
              </div>

              {drill.gridData && (
                <div className="overflow-x-auto">
                  <table className="border-collapse text-xs font-mono tabular-nums">
                    <tbody>
                      {drill.gridData.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <td className="px-2 py-1 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {rIdx + 1}
                          </td>
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="px-3 py-1 border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200"
                            >
                              <span className="text-[10px] text-slate-400 mr-1.5">
                                {indexToCol(cIdx)}
                                {rIdx + 1}:
                              </span>
                              {String(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {drill.type === 'formula' ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={inputs[drill.id] || ''}
                    onChange={(e) => setInputs((p) => ({ ...p, [drill.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && checkFormulaDrill(drill.id)}
                    placeholder="Type formula starting with =..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => checkFormulaDrill(drill.id)}
                    className="px-4 py-2 rounded-lg bg-[#217346] hover:bg-[#1B5E3A] text-white text-xs font-semibold whitespace-nowrap transition-colors"
                  >
                    Check Result
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-2">
                  {(drill.choices || []).map((choice) => {
                    const picked = inputs[drill.id] === choice;
                    const isRight = choice === drill.expectedValue;
                    return (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => {
                          setInputs((p) => ({ ...p, [drill.id]: choice }));
                          setFeedback((p) => ({ ...p, [drill.id]: { ok: isRight, actual: choice } }));
                          if (isRight) setSolved(markDrillSolved(drill.id));
                        }}
                        className={`text-left px-3 py-2 rounded-lg border text-xs sm:text-sm transition-colors ${
                          picked
                            ? isRight
                              ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/35 text-emerald-900 dark:text-emerald-200 font-semibold'
                              : 'border-red-300 bg-red-50 dark:bg-red-950/35 text-red-900 dark:text-red-200'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              )}

              {fb && (
                <div
                  className={`p-3 rounded-lg border text-xs sm:text-sm ${
                    fb.ok
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold flex items-center gap-1.5">
                      {fb.ok ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Correct! Output: {fb.actual}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Your output: {fb.actual} (Expected: {drill.expectedDisplay})
                        </>
                      )}
                    </span>
                    <code className="font-mono text-xs bg-white/80 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      Model: {drill.modelFormula}
                    </code>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 3. ERROR SPOTTER (12 broken formulas)
// ------------------------------------------------------------------
export const ErrorSpotterTool: React.FC = () => {
  const [selected, setSelected] = useState<Record<number, string>>({});

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Error Spotter (12 Common Broken Formulas)</h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Diagnose the symptom and pick the exact fix for each classic spreadsheet error.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {ERROR_SPOTTER_ITEMS.map((item) => {
          const picked = selected[item.id];
          const isCorrect = picked === item.correctFix;
          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-2">
                  <span className="text-slate-500">Case #{item.id}</span>
                  <span className="font-mono font-bold text-red-600 dark:text-red-400">{item.symptom}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 mb-2">
                  {item.brokenFormula}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  <strong>Cause:</strong> {item.cause}
                </div>

                <div className="space-y-1.5">
                  {item.options.map((opt) => {
                    const active = picked === opt;
                    const optIsCorrect = opt === item.correctFix;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelected((p) => ({ ...p, [item.id]: opt }))}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-colors ${
                          picked
                            ? optIsCorrect
                              ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/35 text-emerald-900 dark:text-emerald-200 font-semibold'
                              : active
                              ? 'border-red-300 bg-red-50 dark:bg-red-950/35 text-red-900 dark:text-red-200'
                              : 'border-slate-200 dark:border-slate-800 text-slate-500'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {picked && (
                <div
                  className={`p-2.5 rounded-lg text-xs ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/25 text-emerald-800 dark:text-emerald-300'
                      : 'bg-red-50 dark:bg-red-950/25 text-red-800 dark:text-red-300'
                  }`}
                >
                  {item.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 4. BUSINESS CALCULATORS
// ------------------------------------------------------------------
export const BusinessCalculatorsTool: React.FC = () => {
  const [tab, setTab] = useState<'loan' | 'savings' | 'breakeven' | 'npv' | 'dep' | 'trade'>('loan');

  // Loan state
  const [loanAmt, setLoanAmt] = useState(500000);
  const [loanRate, setLoanRate] = useState(12);
  const [loanMonths, setLoanMonths] = useState(36);

  const monthlyRate = loanRate / 100 / 12;
  const emi =
    monthlyRate === 0
      ? loanAmt / loanMonths
      : (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) /
        (Math.pow(1 + monthlyRate, loanMonths) - 1);
  const totalRepaid = emi * loanMonths;
  const totalInterest = totalRepaid - loanAmt;

  const amortRows = useMemo(() => {
    const rows = [];
    let bal = loanAmt;
    for (let m = 1; m <= Math.min(12, loanMonths); m++) {
      const interest = bal * monthlyRate;
      const principal = emi - interest;
      const closing = Math.max(0, bal - principal);
      rows.push({ m, opening: bal, interest, principal, closing });
      bal = closing;
    }
    return rows;
  }, [loanAmt, monthlyRate, emi, loanMonths]);

  // Savings FV state
  const [monthlyDep, setMonthlyDep] = useState(5000);
  const [savRate, setSavRate] = useState(8);
  const [savYears, setSavYears] = useState(5);
  const rSav = savRate / 100 / 12;
  const nSav = savYears * 12;
  const fvTotal = rSav === 0 ? monthlyDep * nSav : monthlyDep * ((Math.pow(1 + rSav, nSav) - 1) / rSav);

  // Break-even state
  const [fixedCost, setFixedCost] = useState(120000);
  const [unitPrice, setUnitPrice] = useState(250);
  const [varCost, setVarCost] = useState(150);
  const contrib = unitPrice - varCost;
  const beUnits = contrib > 0 ? fixedCost / contrib : 0;
  const beSales = beUnits * unitPrice;

  // NPV & IRR state
  const [discRate, setDiscRate] = useState(10);
  const [cf0, setCf0] = useState(-300000);
  const [cf1, setCf1] = useState(80000);
  const [cf2, setCf2] = useState(100000);
  const [cf3, setCf3] = useState(120000);
  const [cf4, setCf4] = useState(130000);
  const flows = [cf0, cf1, cf2, cf3, cf4];
  const npvVal =
    cf0 +
    [cf1, cf2, cf3, cf4].reduce((acc, cf, i) => acc + cf / Math.pow(1 + discRate / 100, i + 1), 0);
  const irrVal = useMemo(() => {
    let r = 0.1;
    for (let iter = 0; iter < 50; iter++) {
      let f = 0;
      let df = 0;
      for (let t = 0; t < flows.length; t++) {
        f += flows[t] / Math.pow(1 + r, t);
        if (t > 0) df -= (t * flows[t]) / Math.pow(1 + r, t + 1);
      }
      if (Math.abs(df) < 1e-9) break;
      r -= f / df;
    }
    return r * 100;
  }, [cf0, cf1, cf2, cf3, cf4]);

  // Depreciation state
  const [assetCost, setAssetCost] = useState(600000);
  const [salvageVal, setSalvageVal] = useState(60000);
  const [assetLife, setAssetLife] = useState(5);
  const depRows = useMemo(() => {
    const sln = (assetCost - salvageVal) / assetLife;
    const dbRate = Math.round((1 - Math.pow(salvageVal / assetCost, 1 / assetLife)) * 1000) / 1000;
    let dbTotal = 0;
    let ddbBook = assetCost;
    const out = [];
    for (let y = 1; y <= assetLife; y++) {
      const db = y === 1 ? assetCost * dbRate : (assetCost - dbTotal) * dbRate;
      dbTotal += db;
      const ddb = Math.min(ddbBook * (2 / assetLife), Math.max(0, ddbBook - salvageVal));
      ddbBook -= ddb;
      out.push({ y, sln, db, ddb });
    }
    return out;
  }, [assetCost, salvageVal, assetLife]);

  // Trade math (VAT, Discount, Markup/Margin, % Change)
  const [netInput, setNetInput] = useState(100000);
  const [vatPct, setVatPct] = useState(15);
  const [costPrice, setCostPrice] = useState(800);
  const [sellPrice, setSellPrice] = useState(1000);
  const [oldVal, setOldVal] = useState(120000);
  const [newVal, setNewVal] = useState(138000);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {[
          { id: 'loan', label: 'Loan & EMI (PMT)' },
          { id: 'savings', label: 'Savings (FV)' },
          { id: 'breakeven', label: 'Break-Even' },
          { id: 'npv', label: 'NPV & IRR' },
          { id: 'dep', label: 'Depreciation' },
          { id: 'trade', label: 'VAT, Markup & %' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id as typeof tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              tab === t.id
                ? 'bg-white dark:bg-slate-900 text-[#1E3A8A] dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* LOAN */}
      {tab === 'loan' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Loan Amount (৳)</label>
              <input type="number" value={loanAmt} onChange={(e) => setLoanAmt(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Annual Rate (%)</label>
              <input type="number" step="0.5" value={loanRate} onChange={(e) => setLoanRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Months (nper)</label>
              <input type="number" value={loanMonths} onChange={(e) => setLoanMonths(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-800 tabular-nums">
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Monthly Instalment (EMI)</div>
              <div className="text-xl font-bold text-[#1B5E3A] dark:text-emerald-400 font-mono">
                ৳ {emi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <code className="text-[11px] font-mono text-slate-500">=-PMT({loanRate}%/12,{loanMonths},{loanAmt})</code>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Total Repaid</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                ৳ {totalRepaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Total Interest Cost</div>
              <div className="text-xl font-bold text-amber-700 dark:text-amber-400 font-mono">
                ৳ {totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <h4 className="text-sm font-semibold mb-2">First 12 Months Amortisation Schedule</h4>
            <table className="w-full text-xs border-collapse tabular-nums font-mono">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-left">Month</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-right">Opening</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-right">Interest</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-right">Principal</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-right">Closing</th>
                </tr>
              </thead>
              <tbody>
                {amortRows.map((r) => (
                  <tr key={r.m}>
                    <td className="p-2 border border-slate-200 dark:border-slate-800">{r.m}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-right">{r.opening.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-right">{r.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-right">{r.principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-right">{r.closing.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SAVINGS FV */}
      {tab === 'savings' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Monthly Deposit (৳)</label>
              <input type="number" value={monthlyDep} onChange={(e) => setMonthlyDep(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Annual Return (%)</label>
              <input type="number" value={savRate} onChange={(e) => setSavRate(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Years</label>
              <input type="number" value={savYears} onChange={(e) => setSavYears(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 tabular-nums">
            <div>
              <div className="text-xs text-slate-500">Future Value</div>
              <div className="text-xl font-bold font-mono text-[#1B5E3A] dark:text-emerald-400">
                ৳ {fvTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <code className="text-[11px] font-mono text-slate-500">=FV({savRate}%/12,{nSav},-{monthlyDep})</code>
            </div>
            <div>
              <div className="text-xs text-slate-500">Total Deposited</div>
              <div className="text-xl font-bold font-mono">৳ {(monthlyDep * nSav).toLocaleString('en-US')}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Interest Earned</div>
              <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                ৳ {(fvTotal - monthlyDep * nSav).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BREAK EVEN */}
      {tab === 'breakeven' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Fixed Cost (৳)</label>
              <input type="number" value={fixedCost} onChange={(e) => setFixedCost(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Selling Price / Unit (৳)</label>
              <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Variable Cost / Unit (৳)</label>
              <input type="number" value={varCost} onChange={(e) => setVarCost(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-800 tabular-nums">
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Contribution Margin</div>
              <div className="text-xl font-bold font-mono">৳ {contrib.toLocaleString('en-US')} / unit</div>
              <code className="text-[11px] font-mono text-slate-500">={unitPrice}-{varCost}</code>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Break-Even Units</div>
              <div className="text-xl font-bold font-mono text-[#1B5E3A] dark:text-emerald-400">
                {contrib > 0 ? Math.round(beUnits).toLocaleString('en-US') : 'N/A'} units
              </div>
              <code className="text-[11px] font-mono text-slate-500">={fixedCost}/({unitPrice}-{varCost})</code>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Break-Even Sales</div>
              <div className="text-xl font-bold font-mono">৳ {Math.round(beSales).toLocaleString('en-US')}</div>
            </div>
          </div>

          {/* Break-even SVG Chart */}
          {contrib > 0 && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40">
              <div className="text-xs font-semibold mb-2 text-slate-700 dark:text-slate-300">
                Revenue vs Total Cost Lines (0 to {Math.round(beUnits * 2)} units)
              </div>
              <svg viewBox="0 0 400 180" className="w-full h-48 overflow-visible">
                {/* Axes */}
                <line x1="40" y1="150" x2="380" y2="150" stroke="#94a3b8" strokeWidth="1" />
                <line x1="40" y1="15" x2="40" y2="150" stroke="#94a3b8" strokeWidth="1" />
                {/* Total Cost line */}
                {(() => {
                  const maxU = Math.max(10, beUnits * 2);
                  const maxY = Math.max(fixedCost + varCost * maxU, unitPrice * maxU);
                  const yFix = 150 - (fixedCost / maxY) * 130;
                  const yCostEnd = 150 - ((fixedCost + varCost * maxU) / maxY) * 130;
                  const yRevEnd = 150 - ((unitPrice * maxU) / maxY) * 130;
                  const xBE = 40 + (beUnits / maxU) * 330;
                  const yBE = 150 - (beSales / maxY) * 130;
                  return (
                    <>
                      <line x1="40" y1={yFix} x2="370" y2={yCostEnd} stroke="#dc2626" strokeWidth="2.5" />
                      <line x1="40" y1="150" x2="370" y2={yRevEnd} stroke="#217346" strokeWidth="2.5" />
                      <circle cx={xBE} cy={yBE} r="5" fill="#1E3A8A" />
                      <text x={xBE + 8} y={yBE - 6} fontSize="10" fill="#1E3A8A" fontWeight="bold">
                        BE: {Math.round(beUnits)} units
                      </text>
                      <text x="290" y={yRevEnd - 6} fontSize="10" fill="#217346" fontWeight="600">
                        Revenue
                      </text>
                      <text x="290" y={yCostEnd + 14} fontSize="10" fill="#dc2626" fontWeight="600">
                        Total Cost
                      </text>
                    </>
                  );
                })()}
              </svg>
            </div>
          )}
        </div>
      )}

      {/* NPV & IRR */}
      {tab === 'npv' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Rate (%)</label>
              <input type="number" value={discRate} onChange={(e) => setDiscRate(Number(e.target.value))} className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs" />
            </div>
            {[
              { label: 'Year 0', val: cf0, set: setCf0 },
              { label: 'Year 1', val: cf1, set: setCf1 },
              { label: 'Year 2', val: cf2, set: setCf2 },
              { label: 'Year 3', val: cf3, set: setCf3 },
              { label: 'Year 4', val: cf4, set: setCf4 },
            ].map((item) => (
              <div key={item.label}>
                <label className="block text-xs font-semibold mb-1">{item.label}</label>
                <input type="number" value={item.val} onChange={(e) => item.set(Number(e.target.value))} className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs" />
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 tabular-nums">
            <div>
              <div className="text-xs text-slate-500">Net Present Value (NPV)</div>
              <div className={`text-xl font-bold font-mono ${npvVal >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600'}`}>
                ৳ {npvVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({npvVal >= 0 ? 'Accept' : 'Reject'})
              </div>
              <code className="text-[11px] font-mono text-slate-500">=NPV({discRate}%,B3:B6)+B2</code>
            </div>
            <div>
              <div className="text-xs text-slate-500">Internal Rate of Return (IRR)</div>
              <div className="text-xl font-bold font-mono text-[#1E3A8A] dark:text-indigo-400">
                {irrVal.toFixed(2)}%
              </div>
              <code className="text-[11px] font-mono text-slate-500">=IRR(B2:B6)</code>
            </div>
          </div>
        </div>
      )}

      {/* DEPRECIATION */}
      {tab === 'dep' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Asset Cost (৳)</label>
              <input type="number" value={assetCost} onChange={(e) => setAssetCost(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Salvage Value (৳)</label>
              <input type="number" value={salvageVal} onChange={(e) => setSalvageVal(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Useful Life (Years)</label>
              <input type="number" value={assetLife} onChange={(e) => setAssetLife(Math.max(1, Math.min(20, Number(e.target.value))))} className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse font-mono tabular-nums">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-left">Year</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-right">SLN (=SLN(cost,salv,life))</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-right">DB (=DB(...))</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700 text-right">DDB (=DDB(...))</th>
                </tr>
              </thead>
              <tbody>
                {depRows.map((r) => (
                  <tr key={r.y}>
                    <td className="p-2 border border-slate-200 dark:border-slate-800">Year {r.y}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-right">{r.sln.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-right">{r.db.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-2 border border-slate-200 dark:border-slate-800 text-right">{r.ddb.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TRADE MATH */}
      {tab === 'trade' && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            <h4 className="font-bold text-sm flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#217346]" /> VAT Calculator
            </h4>
            <div className="space-y-2 text-xs">
              <label className="block">Amount (৳)</label>
              <input type="number" value={netInput} onChange={(e) => setNetInput(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono" />
              <label className="block">VAT Rate (%)</label>
              <input type="number" value={vatPct} onChange={(e) => setVatPct(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono" />
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1 font-mono tabular-nums">
              <div>+ VAT: <strong>৳ {(netInput * (1 + vatPct / 100)).toLocaleString('en-US', { maximumFractionDigits: 2 })}</strong></div>
              <div>Excl. VAT: <strong>৳ {(netInput / (1 + vatPct / 100)).toLocaleString('en-US', { maximumFractionDigits: 2 })}</strong></div>
              <div className="text-[11px] text-slate-500">=Price/(1+VAT_Rate)</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            <h4 className="font-bold text-sm">Markup vs Margin</h4>
            <div className="space-y-2 text-xs">
              <label className="block">Cost (৳)</label>
              <input type="number" value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono" />
              <label className="block">Selling Price (৳)</label>
              <input type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono" />
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1 font-mono tabular-nums">
              <div>Markup on Cost: <strong>{costPrice ? (((sellPrice - costPrice) / costPrice) * 100).toFixed(1) : 0}%</strong></div>
              <div>Margin on Sales: <strong>{sellPrice ? (((sellPrice - costPrice) / sellPrice) * 100).toFixed(1) : 0}%</strong></div>
              <div className="text-[11px] text-slate-500">=(Price-Cost)/Cost vs /Price</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            <h4 className="font-bold text-sm">Percentage Change</h4>
            <div className="space-y-2 text-xs">
              <label className="block">Old Value</label>
              <input type="number" value={oldVal} onChange={(e) => setOldVal(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono" />
              <label className="block">New Value</label>
              <input type="number" value={newVal} onChange={(e) => setNewVal(Number(e.target.value))} className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 font-mono" />
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1 font-mono tabular-nums">
              <div>Change: <strong>{oldVal ? (((newVal - oldVal) / oldVal) * 100).toFixed(1) : 0}%</strong></div>
              <div className="text-[11px] text-slate-500">=(New-Old)/Old</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------------
// 5. CHART CHOOSER
// ------------------------------------------------------------------
export const ChartChooserTool: React.FC = () => {
  const [goal, setGoal] = useState<'compare' | 'trend' | 'share' | 'relationship' | 'distribution'>('compare');

  const guides = {
    compare: {
      chart: 'Clustered Column or Bar Chart',
      when: 'Comparing totals across categories, regions, or products.',
      example: 'Net sales by Region (Rajshahi ৳ 278,888 · Dhaka ৳ 172,590 · Rangpur ৳ 65,600 · Bogura ৳ 62,500)',
      tips: 'Start Y-axis at 0; use Bar chart if category labels are long.',
      Icon: BarChart3,
    },
    trend: {
      chart: 'Line Chart (or Combo with Secondary Axis)',
      when: 'Showing change over time (months, quarters, years).',
      example: 'Monthly Revenue & Cost across Jan–Dec 2026 (Dataset 5)',
      tips: 'Add a Secondary Axis if plotting Revenue (৳) alongside Profit Margin (%).',
      Icon: TrendingUp,
    },
    share: {
      chart: 'Pie or Doughnut Chart (max 5–6 slices)',
      when: 'Showing parts of a 100% total.',
      example: 'Category share of Net: Electronics 53.3% · Furniture 25.4% · Stationery 21.3%',
      tips: 'Sort slices largest to smallest and label percentages directly.',
      Icon: PieChart,
    },
    relationship: {
      chart: 'XY Scatter Plot',
      when: 'Showing how two numeric variables relate or cross.',
      example: 'Units sold vs Revenue & Total Cost lines (Break-Even at 1,200 units)',
      tips: 'Never use a Line chart when the X-axis values are uneven numeric intervals.',
      Icon: Layers,
    },
    distribution: {
      chart: 'Histogram (or Box & Whisker)',
      when: 'Seeing how values cluster across bins (e.g. small vs large invoices).',
      example: 'Distribution of the 20 October invoice sizes in Dataset 1',
      tips: 'Choose 4–6 clean bin widths so patterns stand out.',
      Icon: BarChart3,
    },
  };

  const g = guides[goal];
  const Icon = g.Icon;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-5">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interactive Chart Chooser</h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Ask: &ldquo;What do you want to show?&rdquo; and pick a goal below.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'compare', label: 'Compare items' },
          { id: 'trend', label: 'Trend over time' },
          { id: 'share', label: 'Share of total' },
          { id: 'relationship', label: 'Relationship' },
          { id: 'distribution', label: 'Distribution' },
        ].map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => setGoal(btn.id as typeof goal)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${
              goal === btn.id
                ? 'bg-[#217346] text-white border-[#217346]'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#217346] dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-1.5">
          <div className="text-base font-bold text-slate-900 dark:text-white">{g.chart}</div>
          <p className="text-sm text-slate-700 dark:text-slate-300">{g.when}</p>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Course example:</strong> {g.example}
          </div>
          <div className="text-xs text-[#217346] dark:text-emerald-400 font-medium">
            Tip: {g.tips}
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 6. INTERACTIVE DASHBOARD BUILDER DEMO
// ------------------------------------------------------------------
export const DashboardBuilderDemo: React.FC = () => {
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const ds1 = DATASETS[0];
  const enrichedRows = useMemo(() => {
    return ds1.rows.map((r) => {
      const qty = Number(r[6]);
      const price = Number(r[7]);
      const discPct = Number(r[8]);
      const gross = qty * price;
      const net = gross * (1 - discPct / 100);
      return {
        inv: String(r[0]),
        customer: String(r[2]),
        product: String(r[3]),
        category: String(r[4]),
        region: String(r[5]),
        qty,
        net,
      };
    });
  }, [ds1]);

  const filtered = useMemo(() => {
    return enrichedRows.filter(
      (r) =>
        (regionFilter === 'All' || r.region === regionFilter) &&
        (categoryFilter === 'All' || r.category === categoryFilter)
    );
  }, [enrichedRows, regionFilter, categoryFilter]);

  const totalNet = filtered.reduce((s, r) => s + r.net, 0);
  const countInv = filtered.length;
  const avgNet = countInv ? totalNet / countInv : 0;

  const byRegion = useMemo(() => {
    const map: Record<string, number> = { Rajshahi: 0, Dhaka: 0, Rangpur: 0, Bogura: 0 };
    filtered.forEach((r) => {
      map[r.region] = (map[r.region] || 0) + r.net;
    });
    return Object.entries(map);
  }, [filtered]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = { Electronics: 0, Furniture: 0, Stationery: 0 };
    filtered.forEach((r) => {
      map[r.category] = (map[r.category] || 0) + r.net;
    });
    return Object.entries(map);
  }, [filtered]);

  const topProducts = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.forEach((r) => {
      map[r.product] = (map[r.product] || 0) + r.net;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [filtered]);

  const maxRegion = Math.max(1, ...byRegion.map((x) => x[1]));
  const maxProd = Math.max(1, ...topProducts.map((x) => x[1]));

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Rahim Traders — October 2026 Sales Dashboard
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click Region or Category slicers below — KPI cards and all three charts update together like linked PivotCharts.
          </p>
        </div>
        {(regionFilter !== 'All' || categoryFilter !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setRegionFilter('All');
              setCategoryFilter('All');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Slicers
          </button>
        )}
      </div>

      {/* Slicer Bar */}
      <div className="grid sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Region Slicer
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Rajshahi', 'Dhaka', 'Rangpur', 'Bogura'].map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setRegionFilter(reg)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  regionFilter === reg
                    ? 'bg-[#1E3A8A] text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category Slicer
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Electronics', 'Furniture', 'Stationery'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#217346] text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid sm:grid-cols-3 gap-4 tabular-nums">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="text-xs text-slate-500 dark:text-slate-400">Total Net Sales</div>
          <div className="text-2xl font-extrabold font-mono text-[#1B5E3A] dark:text-emerald-400 mt-1">
            ৳ {totalNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
          <div className="text-xs text-slate-500 dark:text-slate-400">Invoices</div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">{countInv}</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-indigo-50/40 dark:bg-indigo-950/20">
          <div className="text-xs text-slate-500 dark:text-slate-400">Average Invoice Net</div>
          <div className="text-2xl font-extrabold font-mono text-[#1E3A8A] dark:text-indigo-400 mt-1">
            ৳ {avgNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* 3 Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-4 tabular-nums">
        {/* Chart 1: Net by Region */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Net Sales by Region</h4>
          <div className="space-y-2.5">
            {byRegion.map(([name, val]) => (
              <div key={name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{name}</span>
                  <span className="font-mono font-semibold">৳ {val.toLocaleString('en-US')}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-[#1E3A8A] dark:bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${(val / maxRegion) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Category Share */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Category Share of Net</h4>
          <div className="space-y-2.5">
            {byCategory.map(([name, val], idx) => {
              const pct = totalNet > 0 ? (val / totalNet) * 100 : 0;
              const colors = ['bg-[#217346]', 'bg-[#2B579A]', 'bg-[#D24726]'];
              return (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{name}</span>
                    <span className="font-mono font-semibold">
                      {pct.toFixed(1)}% (৳ {val.toLocaleString('en-US')})
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${colors[idx % colors.length]} rounded-full transition-all duration-300`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: Top 5 Products */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Top 5 Products</h4>
          {topProducts.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No matching invoices for active slicers.</p>
          ) : (
            <div className="space-y-2.5">
              {topProducts.map(([name, val]) => (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-xs gap-2">
                    <span className="truncate">{name}</span>
                    <span className="font-mono font-semibold shrink-0">৳ {val.toLocaleString('en-US')}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-[#2E8B57] rounded-full transition-all duration-300"
                      style={{ width: `${(val / maxProd) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
        <span>Source: Rahim Traders Sales Register, October 2026 (Dataset 1)</span>
        <span className="inline-flex items-center gap-1 text-[#217346] dark:text-emerald-400 font-medium">
          <Sparkles className="w-3 h-3" /> Interactive Slicer View
        </span>
      </div>
    </div>
  );
};
