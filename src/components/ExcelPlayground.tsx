import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Eye,
  RotateCcw,
  Copy,
  ClipboardPaste,
  FileSpreadsheet,
  Sparkles,
} from 'lucide-react';
import { DATASETS } from '../data/datasets';
import {
  CellData,
  NumberFormatType,
  SheetGrid,
  evaluateWorkbook,
  formatCellDisplay,
  indexToCol,
  isExcelError,
  parseCellRef,
  shiftFormulaRefs,
} from '../utils/excelEngine';

const NUM_COLS = 14; // A..N
const NUM_ROWS = 26; // 1..26

function buildInitialSheets(presetId?: string, initialFormula?: string): {
  sheets: Record<string, SheetGrid>;
  activeSheet: string;
  namedRanges: Record<string, string>;
} {
  const sheets: Record<string, SheetGrid> = {
    Sheet1: {},
    'Price List': {},
  };

  // Always preload Price List so cross-sheet VLOOKUP/XLOOKUP/INDEX+MATCH work immediately
  const ds1 = DATASETS[0];
  if (ds1.relatedSheet) {
    ds1.relatedSheet.headers.forEach((h, c) => {
      sheets['Price List'][`${indexToCol(c)}1`] = { raw: h };
    });
    ds1.relatedSheet.rows.forEach((row, r) => {
      row.forEach((val, c) => {
        sheets['Price List'][`${indexToCol(c)}${r + 2}`] = {
          raw: String(val),
          format: c === 2 ? 'taka' : 'general',
        };
      });
    });
  }

  const chosen = DATASETS.find((d) => d.id === presetId) || (presetId === 'blank' ? undefined : DATASETS[0]);

  if (chosen) {
    const grid: SheetGrid = {};
    chosen.headers.forEach((h, c) => {
      grid[`${indexToCol(c)}1`] = { raw: h };
    });
    chosen.rows.forEach((row, r) => {
      row.forEach((val, c) => {
        let fmt: NumberFormatType = 'general';
        if (chosen.headers[c]?.includes('৳') || chosen.headers[c]?.includes('Price') || chosen.headers[c]?.includes('Amount') || chosen.headers[c]?.includes('Revenue') || chosen.headers[c]?.includes('Cost') || chosen.headers[c]?.includes('Basic') || chosen.headers[c]?.includes('sales')) {
          fmt = 'comma';
        }
        grid[`${indexToCol(c)}${r + 2}`] = { raw: String(val), format: fmt };
      });
    });

    // If Dataset 1, pre-add VAT_Rate cell in P2/Q2 and sample formula headers in J..N if initialFormula or default
    if (chosen.id === 'dataset-1') {
      grid['P1'] = { raw: 'Assumptions' };
      grid['P2'] = { raw: 'VAT_Rate' };
      grid['Q2'] = { raw: '15%', format: 'percent' };
      grid['J1'] = { raw: 'Gross' };
      grid['K1'] = { raw: 'Discount' };
      grid['L1'] = { raw: 'Net' };
      grid['M1'] = { raw: 'VAT' };
      grid['N1'] = { raw: 'Total' };
      grid['J2'] = { raw: '=G2*H2', format: 'comma' };
      grid['K2'] = { raw: '=J2*I2/100', format: 'dec2' };
      grid['L2'] = { raw: '=J2-K2', format: 'dec2' };
      grid['M2'] = { raw: '=ROUND(L2*$Q$2,2)', format: 'dec2' };
      grid['N2'] = { raw: '=L2+M2', format: 'dec2' };
    }

    if (chosen.id === 'dataset-2') {
      grid['L1'] = { raw: 'Assumptions' };
      grid['L2'] = { raw: 'House Rent %' };
      grid['M2'] = { raw: '50%', format: 'percent' };
      grid['L3'] = { raw: 'Medical' };
      grid['M3'] = { raw: '1500', format: 'comma' };
      grid['L4'] = { raw: 'Conveyance' };
      grid['M4'] = { raw: '1000', format: 'comma' };
      grid['L5'] = { raw: 'PF %' };
      grid['M5'] = { raw: '10%', format: 'percent' };
      grid['E1'] = { raw: 'House Rent' };
      grid['F1'] = { raw: 'Medical' };
      grid['G1'] = { raw: 'Conveyance' };
      grid['H1'] = { raw: 'Gross' };
      grid['I1'] = { raw: 'PF' };
      grid['J1'] = { raw: 'Net Pay' };
      grid['E2'] = { raw: '=D2*$M$2', format: 'comma' };
      grid['F2'] = { raw: '=$M$3', format: 'comma' };
      grid['G2'] = { raw: '=$M$4', format: 'comma' };
      grid['H2'] = { raw: '=D2+E2+F2+G2', format: 'comma' };
      grid['I2'] = { raw: '=D2*$M$5', format: 'comma' };
      grid['J2'] = { raw: '=H2-I2', format: 'comma' };
    }

    if (chosen.id === 'dataset-3' && chosen.relatedSheet) {
      grid['D1'] = { raw: 'Target' };
      grid['E1'] = { raw: '100000', format: 'comma' };
      grid['E2'] = { raw: 'Sales from' };
      grid['F2'] = { raw: 'Rate' };
      chosen.relatedSheet.rows.forEach((r, idx) => {
        grid[`E${idx + 3}`] = { raw: String(r[0]), format: 'comma' };
        grid[`F${idx + 3}`] = { raw: String(r[1]), format: 'percent' };
      });
      grid['C1'] = { raw: 'Status' };
      grid['C2'] = { raw: '=IF(B2>=$E$1,"Target met","Below target")' };
    }

    if (chosen.id === 'dataset-4') {
      grid['G1'] = { raw: 'Report Date' };
      grid['H1'] = { raw: '2026-10-31', format: 'date' };
      grid['F1'] = { raw: 'Due date' };
      grid['F2'] = { raw: '=C2+D2', format: 'date' };
    }

    if (initialFormula) {
      grid['J22'] = { raw: initialFormula, format: 'dec2' };
    }

    sheets.Sheet1 = grid;
  } else if (initialFormula) {
    sheets.Sheet1['A1'] = { raw: initialFormula };
  }

  return {
    sheets,
    activeSheet: 'Sheet1',
    namedRanges: { VAT_Rate: 'Q2' },
  };
}

interface ExcelPlaygroundProps {
  initialDatasetId?: string;
  initialFormula?: string;
}

export const ExcelPlayground: React.FC<ExcelPlaygroundProps> = ({
  initialDatasetId,
  initialFormula,
}) => {
  const init = useMemo(
    () => buildInitialSheets(initialDatasetId, initialFormula),
    [initialDatasetId, initialFormula]
  );

  const [sheets, setSheets] = useState<Record<string, SheetGrid>>(init.sheets);
  const [activeSheet, setActiveSheet] = useState<string>(init.activeSheet);
  const [namedRanges] = useState<Record<string, string>>(init.namedRanges);
  const [selectedCell, setSelectedCell] = useState<string>(initialFormula ? 'J22' : 'J2');
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [formulaInput, setFormulaInput] = useState<string>('');
  const [showFormulas, setShowFormulas] = useState<boolean>(false);
  const [copiedCell, setCopiedCell] = useState<{ addr: string; data: CellData } | null>(null);
  const [fillSource, setFillSource] = useState<string | null>(null);
  const [loadedPreset, setLoadedPreset] = useState<string>(initialDatasetId || 'dataset-1');
  const [nameBoxInput, setNameBoxInput] = useState<string>(initialFormula ? 'J22' : 'J2');
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nextInit = buildInitialSheets(initialDatasetId, initialFormula);
    setSheets(nextInit.sheets);
    setActiveSheet(nextInit.activeSheet);
    setLoadedPreset(initialDatasetId || 'dataset-1');
    const target = initialFormula ? (initialDatasetId === 'dataset-1' || !initialDatasetId ? 'J22' : 'A1') : 'A1';
    setSelectedCell(target);
    setNameBoxInput(target);
  }, [initialDatasetId, initialFormula]);

  const currentGrid = sheets[activeSheet] || {};

  useEffect(() => {
    setFormulaInput(currentGrid[selectedCell]?.raw || '');
    setNameBoxInput(selectedCell);
  }, [selectedCell, activeSheet, currentGrid]);

  const evaluated = useMemo(() => {
    return evaluateWorkbook({
      activeSheet,
      sheets,
      namedRanges,
    });
  }, [activeSheet, sheets, namedRanges]);

  const sheetValues = evaluated[activeSheet] || {};

  const updateCell = (addr: string, raw: string, format?: NumberFormatType) => {
    setSheets((prev) => {
      const grid = { ...(prev[activeSheet] || {}) };
      const existingFmt = grid[addr]?.format;
      if (raw === '' && !format && !existingFmt) {
        delete grid[addr];
      } else {
        grid[addr] = { raw, format: format ?? existingFmt ?? 'general' };
      }
      return { ...prev, [activeSheet]: grid };
    });
  };

  const applyFormatToSelected = (fmt: NumberFormatType) => {
    const existing = currentGrid[selectedCell] || { raw: '' };
    updateCell(selectedCell, existing.raw, fmt);
  };

  const commitEdit = (addr: string, val: string, moveDown = false) => {
    updateCell(addr, val);
    setEditingCell(null);
    if (moveDown) {
      const ref = parseCellRef(addr);
      if (ref && ref.row + 1 < NUM_ROWS) {
        setSelectedCell(`${indexToCol(ref.col)}${ref.row + 2}`);
      }
    }
  };

  const handleLoadPreset = (presetId: string) => {
    const next = buildInitialSheets(presetId);
    setSheets(next.sheets);
    setActiveSheet('Sheet1');
    setLoadedPreset(presetId);
    setSelectedCell('A1');
    setEditingCell(null);
  };

  const handleCopy = () => {
    const data = currentGrid[selectedCell];
    if (data) setCopiedCell({ addr: selectedCell, data: { ...data } });
  };

  const handlePaste = () => {
    if (!copiedCell) return;
    const src = parseCellRef(copiedCell.addr);
    const dst = parseCellRef(selectedCell);
    if (!src || !dst) return;
    const shifted = shiftFormulaRefs(copiedCell.data.raw, dst.col - src.col, dst.row - src.row);
    updateCell(selectedCell, shifted, copiedCell.data.format);
  };

  const handleAutoFillTo = (targetAddr: string) => {
    if (!fillSource || fillSource === targetAddr) {
      setFillSource(null);
      return;
    }
    const src = parseCellRef(fillSource);
    const dst = parseCellRef(targetAddr);
    const srcData = currentGrid[fillSource];
    if (!src || !dst || !srcData) {
      setFillSource(null);
      return;
    }

    setSheets((prev) => {
      const grid = { ...(prev[activeSheet] || {}) };
      if (dst.col === src.col) {
        const step = dst.row >= src.row ? 1 : -1;
        for (let r = src.row + step; step > 0 ? r <= dst.row : r >= dst.row; r += step) {
          const addr = `${indexToCol(src.col)}${r + 1}`;
          let val = srcData.raw;
          if (val.startsWith('=')) {
            val = shiftFormulaRefs(val, 0, r - src.row);
          } else {
            // Pattern e.g. INV-1001
            const m = val.match(/^(.*?)(\d+)$/);
            if (m) {
              const nextNum = parseInt(m[2], 10) + (r - src.row);
              val = `${m[1]}${String(nextNum).padStart(m[2].length, '0')}`;
            }
          }
          grid[addr] = { raw: val, format: srcData.format };
        }
      } else if (dst.row === src.row) {
        const step = dst.col >= src.col ? 1 : -1;
        for (let c = src.col + step; step > 0 ? c <= dst.col : c >= dst.col; c += step) {
          const addr = `${indexToCol(c)}${src.row + 1}`;
          const val = srcData.raw.startsWith('=')
            ? shiftFormulaRefs(srcData.raw, c - src.col, 0)
            : srcData.raw;
          grid[addr] = { raw: val, format: srcData.format };
        }
      }
      return { ...prev, [activeSheet]: grid };
    });
    setSelectedCell(targetAddr);
    setFillSource(null);
  };

  const handleGridKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '`') {
      e.preventDefault();
      setShowFormulas((v) => !v);
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c' && !editingCell) {
      handleCopy();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v' && !editingCell) {
      handlePaste();
      return;
    }
    if (editingCell) return;

    const ref = parseCellRef(selectedCell);
    if (!ref) return;

    if (e.key === 'F2') {
      e.preventDefault();
      setEditingCell(selectedCell);
      return;
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      updateCell(selectedCell, '');
      return;
    }
    if (e.key === 'ArrowUp' && ref.row > 0) {
      e.preventDefault();
      setSelectedCell(`${indexToCol(ref.col)}${ref.row}`);
    } else if ((e.key === 'ArrowDown' || e.key === 'Enter') && ref.row + 1 < NUM_ROWS) {
      e.preventDefault();
      setSelectedCell(`${indexToCol(ref.col)}${ref.row + 2}`);
    } else if (e.key === 'ArrowLeft' && ref.col > 0) {
      e.preventDefault();
      setSelectedCell(`${indexToCol(ref.col - 1)}${ref.row + 1}`);
    } else if ((e.key === 'ArrowRight' || e.key === 'Tab') && ref.col + 1 < NUM_COLS) {
      e.preventDefault();
      setSelectedCell(`${indexToCol(ref.col + 1)}${ref.row + 1}`);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      setEditingCell(selectedCell);
      setFormulaInput(e.key);
    }
  };

  const fillDataset1Formulas = () => {
    if (loadedPreset !== 'dataset-1') return;
    setSheets((prev) => {
      const grid = { ...(prev.Sheet1 || {}) };
      for (let r = 2; r <= 21; r++) {
        grid[`J${r}`] = { raw: `=G${r}*H${r}`, format: 'comma' };
        grid[`K${r}`] = { raw: `=J${r}*I${r}/100`, format: 'dec2' };
        grid[`L${r}`] = { raw: `=J${r}-K${r}`, format: 'dec2' };
        grid[`M${r}`] = { raw: `=ROUND(L${r}*$Q$2,2)`, format: 'dec2' };
        grid[`N${r}`] = { raw: `=L${r}+M${r}`, format: 'dec2' };
      }
      grid['A22'] = { raw: 'TOTAL' };
      grid['G22'] = { raw: '=SUM(G2:G21)', format: 'comma' };
      grid['J22'] = { raw: '=SUM(J2:J21)', format: 'comma' };
      grid['K22'] = { raw: '=SUM(K2:K21)', format: 'dec2' };
      grid['L22'] = { raw: '=SUM(L2:L21)', format: 'dec2' };
      grid['M22'] = { raw: '=SUM(M2:M21)', format: 'dec2' };
      grid['N22'] = { raw: '=SUM(N2:N21)', format: 'dec2' };
      return { ...prev, Sheet1: grid };
    });
    setSelectedCell('L22');
  };

  const activeVal = sheetValues[selectedCell];

  return (
    <div
      ref={tableRef}
      tabIndex={0}
      onKeyDown={handleGridKeyDown}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden focus:outline-none"
    >
      {/* Top Toolbar */}
      <div className="p-3 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#217346] dark:text-emerald-400">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Load sheet:</span>
          </div>
          <select
            value={loadedPreset}
            onChange={(e) => handleLoadPreset(e.target.value)}
            aria-label="Load sample sheet"
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium"
          >
            {DATASETS.map((ds) => (
              <option key={ds.id} value={ds.id}>
                {ds.shortName}
              </option>
            ))}
            <option value="blank">Blank Worksheet</option>
          </select>

          {loadedPreset === 'dataset-1' && (
            <button
              type="button"
              onClick={fillDataset1Formulas}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#217346] hover:bg-[#1B5E3A] text-white text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Auto-Complete Oct Totals
            </button>
          )}
        </div>

        {/* Number Format & Utility Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden text-xs">
            <button
              type="button"
              title="Taka format (৳)"
              onClick={() => applyFormatToSelected('taka')}
              className="px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold border-r border-slate-200 dark:border-slate-700"
            >
              ৳
            </button>
            <button
              type="button"
              title="Percentage format (%)"
              onClick={() => applyFormatToSelected('percent')}
              className="px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold border-r border-slate-200 dark:border-slate-700"
            >
              %
            </button>
            <button
              type="button"
              title="Comma format"
              onClick={() => applyFormatToSelected('comma')}
              className="px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold border-r border-slate-200 dark:border-slate-700"
            >
              ,
            </button>
            <button
              type="button"
              title="Two decimal places"
              onClick={() => applyFormatToSelected('dec2')}
              className="px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 font-mono font-semibold"
            >
              .00
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy selected cell (Ctrl+C)"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy
          </button>
          <button
            type="button"
            onClick={handlePaste}
            disabled={!copiedCell}
            title="Paste with reference shift (Ctrl+V)"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            Paste
          </button>

          <button
            type="button"
            onClick={() => setShowFormulas((v) => !v)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              showFormulas
                ? 'bg-[#217346] text-white border-[#217346]'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Show Formulas
          </button>

          <button
            type="button"
            onClick={() => handleLoadPreset(loadedPreset)}
            title="Reset sheet"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Name Box + Formula Bar */}
      <div className="px-3 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={nameBoxInput}
          onChange={(e) => setNameBoxInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const parsed = parseCellRef(nameBoxInput);
              if (parsed && parsed.col < NUM_COLS && parsed.row < NUM_ROWS) {
                setSelectedCell(`${indexToCol(parsed.col)}${parsed.row + 1}`);
              }
            }
          }}
          aria-label="Name Box"
          className="w-16 px-2 py-1 text-center font-mono text-xs font-bold rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        />
        <span className="font-mono text-xs font-bold text-[#217346] dark:text-emerald-400 px-1.5 select-none">
          fx
        </span>
        <input
          type="text"
          value={formulaInput}
          onChange={(e) => setFormulaInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              commitEdit(selectedCell, formulaInput, true);
            } else if (e.key === 'Escape') {
              setFormulaInput(currentGrid[selectedCell]?.raw || '');
            }
          }}
          onBlur={() => {
            if (formulaInput !== (currentGrid[selectedCell]?.raw || '')) {
              updateCell(selectedCell, formulaInput);
            }
          }}
          placeholder="Type a value or =formula (e.g. =SUM(L2:L21))"
          aria-label="Formula Bar"
          className="flex-1 px-2.5 py-1 font-mono text-xs sm:text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#217346]/40"
        />
      </div>

      {/* Interactive Grid */}
      <div className="overflow-auto max-h-[470px] worksheet-scroll relative select-none">
        <table className="border-collapse text-xs tabular-nums w-max min-w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              <th className="w-10 border-b border-r border-slate-200 dark:border-slate-700 py-1.5 text-center sticky left-0 z-20 bg-slate-100 dark:bg-slate-800"></th>
              {Array.from({ length: NUM_COLS }).map((_, c) => {
                const colLetter = indexToCol(c);
                return (
                  <th
                    key={colLetter}
                    className="min-w-[96px] border-b border-r border-slate-200 dark:border-slate-700 py-1.5 px-2 text-center font-semibold"
                  >
                    {colLetter}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: NUM_ROWS }).map((_, r) => {
              const rowNum = r + 1;
              return (
                <tr key={rowNum}>
                  <td className="border-b border-r border-slate-200 dark:border-slate-700 py-1 text-center font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 sticky left-0 z-10">
                    {rowNum}
                  </td>
                  {Array.from({ length: NUM_COLS }).map((_, c) => {
                    const addr = `${indexToCol(c)}${rowNum}`;
                    const cell = currentGrid[addr];
                    const isSelected = selectedCell === addr;
                    const isEditing = editingCell === addr;
                    const evalVal = sheetValues[addr];
                    const isHeaderRow = rowNum === 1 && cell?.raw;

                    let displayText = '';
                    if (showFormulas && cell?.raw) {
                      displayText = cell.raw;
                    } else if (evalVal !== undefined && evalVal !== null) {
                      displayText = formatCellDisplay(evalVal, cell?.format || 'general');
                    }

                    const errCell = isExcelError(evalVal);
                    const isNum = typeof evalVal === 'number';

                    return (
                      <td
                        key={addr}
                        onClick={() => {
                          if (fillSource) {
                            handleAutoFillTo(addr);
                          } else {
                            setSelectedCell(addr);
                          }
                        }}
                        onDoubleClick={() => {
                          setSelectedCell(addr);
                          setEditingCell(addr);
                          setFormulaInput(cell?.raw || '');
                        }}
                        onMouseEnter={() => {
                          // Visual clue when fill-dragging via click-mode
                        }}
                        className={`relative border-b border-r border-slate-200 dark:border-slate-800 px-2 py-1 max-w-[160px] truncate cursor-cell ${
                          isHeaderRow
                            ? 'bg-slate-50 dark:bg-slate-800/70 font-semibold text-slate-900 dark:text-slate-100'
                            : 'bg-white dark:bg-slate-900'
                        } ${isSelected ? 'ring-2 ring-inset ring-[#217346] z-10' : ''} ${
                          errCell
                            ? 'text-red-600 dark:text-red-400 font-mono font-semibold bg-red-50/40 dark:bg-red-950/20'
                            : isNum
                            ? 'text-right font-mono text-slate-800 dark:text-slate-200'
                            : 'text-left text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isEditing ? (
                          <input
                            autoFocus
                            type="text"
                            value={formulaInput}
                            onChange={(e) => setFormulaInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.stopPropagation();
                                commitEdit(addr, formulaInput, true);
                              } else if (e.key === 'Escape') {
                                e.stopPropagation();
                                setEditingCell(null);
                                setFormulaInput(cell?.raw || '');
                              }
                            }}
                            onBlur={() => commitEdit(addr, formulaInput, false)}
                            className="w-full h-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs outline-none"
                          />
                        ) : (
                          displayText
                        )}
                        {/* Fill Handle */}
                        {isSelected && !isEditing && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFillSource(fillSource ? null : addr);
                            }}
                            title="AutoFill handle: click here, then click target cell down/right to fill"
                            className={`absolute bottom-0 right-0 w-2.5 h-2.5 cursor-crosshair ${
                              fillSource === addr ? 'bg-orange-500 animate-pulse' : 'bg-[#217346]'
                            }`}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sheet Tabs & Status Bar */}
      <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          {Object.keys(sheets).map((sName) => (
            <button
              key={sName}
              type="button"
              onClick={() => setActiveSheet(sName)}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                activeSheet === sName
                  ? 'bg-white dark:bg-slate-800 text-[#217346] dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {sName}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          {fillSource && (
            <span className="text-orange-600 dark:text-orange-400 font-semibold">
              AutoFill active from {fillSource}: click destination cell in same column/row
            </span>
          )}
          <span className="font-mono">
            {selectedCell}: {activeVal !== undefined && activeVal !== null ? formatCellDisplay(activeVal, currentGrid[selectedCell]?.format) : 'Empty'}
          </span>
        </div>
      </div>
    </div>
  );
};
