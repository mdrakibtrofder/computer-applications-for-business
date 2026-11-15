import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart3,
  Calculator,
  Dumbbell,
  Grid,
  LayoutDashboard,
  Lock,
} from 'lucide-react';
import { ExcelPlayground } from '../components/ExcelPlayground';
import {
  BusinessCalculatorsTool,
  ChartChooserTool,
  DashboardBuilderDemo,
  ErrorSpotterTool,
  FormulaDrillsTool,
  ReferenceVisualiser,
} from '../components/ExcelTools';

type ExcelToolTab =
  | 'playground'
  | 'references'
  | 'drills'
  | 'errors'
  | 'calculators'
  | 'charts'
  | 'dashboard';

const TABS: { id: ExcelToolTab; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: 'playground', label: 'Spreadsheet Playground', Icon: Grid },
  { id: 'references', label: 'Reference Visualiser', Icon: Lock },
  { id: 'drills', label: 'Formula Drills (44)', Icon: Dumbbell },
  { id: 'errors', label: 'Error Spotter (12)', Icon: AlertTriangle },
  { id: 'calculators', label: 'Business Calculators', Icon: Calculator },
  { id: 'charts', label: 'Chart Chooser', Icon: BarChart3 },
  { id: 'dashboard', label: 'Dashboard Demo', Icon: LayoutDashboard },
];

export const ExcelLabPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toolParam = searchParams.get('tool') as ExcelToolTab | null;
  const datasetParam = searchParams.get('dataset') || undefined;
  const formulaParam = searchParams.get('formula') || undefined;

  const [activeTab, setActiveTab] = useState<ExcelToolTab>(
    toolParam && TABS.some((t) => t.id === toolParam) ? toolParam : 'playground'
  );

  useEffect(() => {
    if (toolParam && TABS.some((t) => t.id === toolParam)) {
      setActiveTab(toolParam);
    } else if (datasetParam || formulaParam) {
      setActiveTab('playground');
    }
  }, [toolParam, datasetParam, formulaParam]);

  const handleSelectTab = (tab: ExcelToolTab) => {
    setActiveTab(tab);
    const next = new URLSearchParams(searchParams);
    next.set('tool', tab);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#217346] dark:text-emerald-400">
          Interactive Microsoft Excel Lab · Modules 3–5
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Excel Lab &amp; Practice Workbench
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Test live formulas across all 5 course datasets, visualise relative vs absolute ($) references, complete 44 exam-style formula drills, spot 12 classic formula errors, and explore financial calculators &amp; slicer dashboards.
        </p>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleSelectTab(id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors border ${
                active
                  ? 'bg-[#217346] text-white border-[#217346] shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Active Tool */}
      <div>
        {activeTab === 'playground' && (
          <ExcelPlayground
            initialDatasetId={datasetParam}
            initialFormula={formulaParam}
          />
        )}
        {activeTab === 'references' && (
          <ReferenceVisualiser initialFormula={formulaParam || '=B2*$E$1'} />
        )}
        {activeTab === 'drills' && <FormulaDrillsTool />}
        {activeTab === 'errors' && <ErrorSpotterTool />}
        {activeTab === 'calculators' && <BusinessCalculatorsTool />}
        {activeTab === 'charts' && <ChartChooserTool />}
        {activeTab === 'dashboard' && <DashboardBuilderDemo />}
      </div>
    </div>
  );
};
