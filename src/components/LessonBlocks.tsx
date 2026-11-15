import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Copy,
  Play,
  Lightbulb,
  Info,
  AlertTriangle,
  Languages,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { CalloutData, FormulaItem, LessonStep, WorksheetData } from '../types/course';
import { GLOSSARY_TERMS } from '../data/glossary';
import { indexToCol } from '../utils/excelEngine';

export const ShortcutKey: React.FC<{ keys: string }> = ({ keys }) => {
  const parts = keys.split(/(\s*\+\s*|\s*\/\s*)/);
  return (
    <span className="inline-flex flex-wrap items-center gap-1 font-mono text-xs">
      {parts.map((part, idx) => {
        const trimmed = part.trim();
        if (trimmed === '+' || trimmed === '/') {
          return (
            <span key={idx} className="text-slate-400 dark:text-slate-500 px-0.5">
              {trimmed}
            </span>
          );
        }
        if (!trimmed) return null;
        return (
          <kbd
            key={idx}
            className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold shadow-[0_1px_0_0_rgba(15,23,42,0.12)]"
          >
            {trimmed}
          </kbd>
        );
      })}
    </span>
  );
};

export const StepList: React.FC<{ steps: LessonStep[] }> = ({ steps }) => (
  <ol className="space-y-3 my-4">
    {steps.map((step, i) => (
      <li
        key={i}
        className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      >
        <span className="flex-none w-6 h-6 rounded-full bg-[#1E3A8A] text-white text-xs font-bold flex items-center justify-center mt-0.5 tabular-nums">
          {i + 1}
        </span>
        <div className="flex-1 min-w-0 space-y-1.5">
          {step.title && <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{step.title}</div>}
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{step.detail}</p>
          {step.ribbonPath && (
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300">
                {step.ribbonPath}
              </span>
            </div>
          )}
        </div>
      </li>
    ))}
  </ol>
);

export const CalloutBox: React.FC<{ callout: CalloutData }> = ({ callout }) => {
  const styles: Record<CalloutData['type'], { bg: string; border: string; iconColor: string; Icon: React.FC<{ className?: string }> }> = {
    tip: {
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/25',
      border: 'border-emerald-200 dark:border-emerald-800/70',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      Icon: Lightbulb,
    },
    note: {
      bg: 'bg-blue-50/70 dark:bg-blue-950/25',
      border: 'border-blue-200 dark:border-blue-800/70',
      iconColor: 'text-blue-700 dark:text-blue-400',
      Icon: Info,
    },
    warning: {
      bg: 'bg-amber-50/70 dark:bg-amber-950/25',
      border: 'border-amber-200 dark:border-amber-800/70',
      iconColor: 'text-amber-700 dark:text-amber-400',
      Icon: AlertTriangle,
    },
    bangla: {
      bg: 'bg-purple-50/70 dark:bg-purple-950/25',
      border: 'border-purple-200 dark:border-purple-800/70',
      iconColor: 'text-purple-700 dark:text-purple-400',
      Icon: Languages,
    },
    tryit: {
      bg: 'bg-orange-50/70 dark:bg-orange-950/25',
      border: 'border-orange-200 dark:border-orange-800/70',
      iconColor: 'text-orange-700 dark:text-orange-400',
      Icon: Sparkles,
    },
    business: {
      bg: 'bg-teal-50/70 dark:bg-teal-950/25',
      border: 'border-teal-200 dark:border-teal-800/70',
      iconColor: 'text-teal-700 dark:text-teal-400',
      Icon: Briefcase,
    },
  };

  const cfg = styles[callout.type];
  const Icon = cfg.Icon;

  return (
    <div className={`my-4 rounded-xl border ${cfg.border} ${cfg.bg} p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-none mt-0.5 ${cfg.iconColor}`} />
        <div className="space-y-1">
          <div className={`text-sm font-semibold ${cfg.iconColor}`}>{callout.title}</div>
          <p className={`text-sm leading-relaxed text-slate-700 dark:text-slate-300 ${callout.type === 'bangla' ? 'font-bn' : ''}`}>
            {callout.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export const RibbonMock: React.FC<{
  app: 'Word' | 'PowerPoint' | 'Excel';
  activeTab: string;
  tabs: string[];
  groups: { name: string; commands: string[]; highlighted?: boolean }[];
}> = ({ app, activeTab, tabs, groups }) => {
  const accentBg =
    app === 'Word' ? 'bg-[#2B579A]' : app === 'PowerPoint' ? 'bg-[#D24726]' : 'bg-[#217346]';
  const accentText =
    app === 'Word'
      ? 'text-[#2B579A] dark:text-blue-400'
      : app === 'PowerPoint'
      ? 'text-[#D24726] dark:text-orange-400'
      : 'text-[#217346] dark:text-emerald-400';

  return (
    <div className="my-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
      <div className={`${accentBg} text-white px-3 py-1.5 flex items-center gap-1 overflow-x-auto text-xs`}>
        <span className="font-semibold mr-2 opacity-90">{app} Ribbon</span>
        {tabs.map((tab) => (
          <span
            key={tab}
            className={`px-2.5 py-0.5 rounded-t whitespace-nowrap ${
              tab === activeTab ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold' : 'opacity-80'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="p-2.5 flex items-stretch gap-2 overflow-x-auto bg-slate-50/80 dark:bg-slate-900/60">
        {groups.map((grp) => (
          <div
            key={grp.name}
            className={`flex flex-col justify-between px-2.5 py-1.5 rounded-lg border text-xs shrink-0 ${
              grp.highlighted
                ? 'border-[#217346]/40 bg-white dark:bg-slate-800 shadow-xs'
                : 'border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40'
            }`}
          >
            <div className="flex flex-wrap gap-1.5 pb-1.5">
              {grp.commands.map((cmd) => (
                <span
                  key={cmd}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                >
                  {cmd}
                </span>
              ))}
            </div>
            <div className={`text-[10px] text-center font-semibold uppercase tracking-wider ${grp.highlighted ? accentText : 'text-slate-400'}`}>
              {grp.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FormulaBox: React.FC<{ item: FormulaItem }> = ({ item }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(item.formula);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const handleOpenPlayground = () => {
    const params = new URLSearchParams();
    if (item.datasetId) params.set('dataset', item.datasetId);
    params.set('formula', item.formula);
    navigate(`/excel-lab?${params.toString()}`);
  };

  return (
    <div className="my-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
        <code className="font-mono text-sm font-semibold text-[#1B5E3A] dark:text-emerald-400 break-all">
          {item.formula}
        </code>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={handleOpenPlayground}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#217346] hover:bg-[#1B5E3A] text-white text-xs font-medium transition-colors"
          >
            <Play className="w-3 h-3" />
            Playground
          </button>
        </div>
      </div>
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
        <span>{item.explanation}</span>
        {item.result && (
          <span className="font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
            Result: {item.result}
          </span>
        )}
      </div>
    </div>
  );
};

export const WorksheetView: React.FC<{ data: WorksheetData }> = ({ data }) => {
  const startRow = data.startRow ?? 2;
  const highlights = new Set(data.highlightCells || []);

  return (
    <div className="my-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
      {data.title && (
        <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-800 dark:text-slate-200">{data.title}</span>
          <span className="font-mono text-[#217346] dark:text-emerald-400 font-medium">Excel Worksheet View</span>
        </div>
      )}
      <div className="overflow-x-auto worksheet-scroll">
        <table className="w-full border-collapse text-xs tabular-nums">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
              <th className="w-9 border-b border-r border-slate-200 dark:border-slate-700 py-1 text-center select-none"></th>
              {data.columns.map((_, cIdx) => (
                <th
                  key={cIdx}
                  className="border-b border-r border-slate-200 dark:border-slate-700 py-1 px-2.5 text-center font-semibold select-none"
                >
                  {indexToCol(cIdx)}
                </th>
              ))}
            </tr>
            <tr className="bg-emerald-50/60 dark:bg-emerald-950/30 text-slate-800 dark:text-slate-100 font-semibold">
              <td className="border-b border-r border-slate-200 dark:border-slate-700 py-1.5 text-center font-mono text-slate-400 bg-slate-100 dark:bg-slate-800">
                {startRow - 1}
              </td>
              {data.columns.map((colName, cIdx) => (
                <td key={cIdx} className="border-b border-r border-slate-200 dark:border-slate-700 py-1.5 px-2.5 whitespace-nowrap">
                  {colName}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rIdx) => {
              const rowNum = startRow + rIdx;
              return (
                <tr key={rIdx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="border-b border-r border-slate-200 dark:border-slate-700 py-1.5 text-center font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 select-none">
                    {rowNum}
                  </td>
                  {row.map((cell, cIdx) => {
                    const addr = `${indexToCol(cIdx)}${rowNum}`;
                    const isHl = highlights.has(addr);
                    const isNum = typeof cell === 'number';
                    const isFormula = typeof cell === 'string' && cell.startsWith('=');
                    return (
                      <td
                        key={cIdx}
                        className={`border-b border-r border-slate-200 dark:border-slate-700 py-1.5 px-2.5 whitespace-nowrap ${
                          isNum ? 'text-right font-mono' : 'text-left'
                        } ${isFormula ? 'font-mono text-[#1B5E3A] dark:text-emerald-400 font-medium' : 'text-slate-700 dark:text-slate-200'} ${
                          isHl ? 'ring-2 ring-inset ring-[#217346] bg-emerald-50/50 dark:bg-emerald-950/40' : ''
                        }`}
                      >
                        {isNum ? cell.toLocaleString('en-US') : cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.caption && (
        <div className="px-3.5 py-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          {data.caption}
        </div>
      )}
    </div>
  );
};

// Lightweight Glossary inline tooltip enhancer
const TARGET_TERMS = GLOSSARY_TERMS.filter((g) => g.term.length >= 4 && !g.term.includes('(')).slice(0, 24);

export const GlossaryText: React.FC<{ text: string }> = ({ text }) => {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  // Highlight at most the first matched glossary term per paragraph to keep reading clean
  const matched = TARGET_TERMS.find((item) => new RegExp(`\\b${item.term}\\b`, 'i').test(text));
  if (!matched) return <>{text}</>;

  const regex = new RegExp(`(\\b${matched.term}\\b)`, 'i');
  const parts = text.split(regex);
  let replaced = false;

  return (
    <>
      {parts.map((part, idx) => {
        if (!replaced && part.toLowerCase() === matched.term.toLowerCase()) {
          replaced = true;
          return (
            <span key={idx} className="relative inline-block">
              <button
                type="button"
                onClick={() => setActiveTerm(activeTerm === matched.term ? null : matched.term)}
                onMouseEnter={() => setActiveTerm(matched.term)}
                onMouseLeave={() => setActiveTerm(null)}
                className="underline decoration-dotted decoration-indigo-500 underline-offset-4 hover:text-indigo-700 dark:hover:text-indigo-400 font-medium cursor-help"
              >
                {part}
              </button>
              {activeTerm === matched.term && (
                <span
                  role="tooltip"
                  className="absolute z-30 left-0 bottom-full mb-2 w-64 p-2.5 rounded-lg bg-slate-900 text-white text-xs leading-relaxed shadow-lg pointer-events-none"
                >
                  <strong className="block text-indigo-300 mb-0.5">{matched.term}</strong>
                  {matched.definition}
                </span>
              )}
            </span>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
};
