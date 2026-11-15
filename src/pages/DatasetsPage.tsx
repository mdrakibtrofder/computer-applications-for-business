import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye, EyeOff, Play, Table2 } from 'lucide-react';
import { DATASETS, MESSY_CUSTOMERS_DATA, downloadCSV } from '../data/datasets';
import { WorksheetView } from '../components/LessonBlocks';

export const DatasetsPage: React.FC = () => {
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  const toggleAnswerKey = (id: string) => {
    setOpenKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#217346] dark:text-emerald-400">
          Course Practice Data · Datasets 1–5
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Datasets, CSV Downloads &amp; Answer Keys
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          Every spreadsheet exercise in CSE 1204 uses these standardised Bangladeshi business datasets. Download any sheet as a clean CSV for desktop Excel, or open it straight in the interactive browser Playground.
        </p>
      </div>

      {/* Quick Anchor Pills */}
      <div className="flex flex-wrap gap-2">
        {DATASETS.map((ds) => (
          <a
            key={ds.id}
            href={`#${ds.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(ds.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#217346]"
          >
            {ds.shortName}
          </a>
        ))}
        <a
          href="#messy-customers"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('messy-customers')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-[#217346]"
        >
          Messy Customers (Cleaning)
        </a>
      </div>

      {/* Datasets 1 to 5 */}
      <div className="space-y-8">
        {DATASETS.map((ds) => {
          const isKeyOpen = Boolean(openKeys[ds.id]);
          return (
            <section
              key={ds.id}
              id={ds.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-5 scroll-mt-20"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#217346] dark:text-emerald-400">
                    Sheet: {ds.sheetName} · {ds.rows.length} rows
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {ds.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {ds.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => downloadCSV(`${ds.id}-${ds.sheetName}.csv`, ds.headers, ds.rows)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download CSV
                  </button>
                  <Link
                    to={`/excel-lab?dataset=${ds.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#217346] hover:bg-[#1B5E3A] text-white text-xs font-semibold"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Open in Playground
                  </Link>
                </div>
              </div>

              {/* Preview Worksheet */}
              <WorksheetView
                data={{
                  title: `${ds.shortName} (${ds.sheetName})`,
                  columns: ds.headers,
                  rows: ds.rows,
                  startRow: 2,
                }}
              />

              {/* Related Price List Sheet (Dataset 1) */}
              {ds.relatedSheet && (
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Table2 className="w-4 h-4 text-[#217346]" />
                      Related Lookup Sheet: {ds.relatedSheet.name}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        downloadCSV(
                          'dataset-1-price-list.csv',
                          ds.relatedSheet!.headers,
                          ds.relatedSheet!.rows
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Price List CSV
                    </button>
                  </div>
                  <WorksheetView
                    data={{
                      title: ds.relatedSheet.name,
                      columns: ds.relatedSheet.headers,
                      rows: ds.relatedSheet.rows,
                      startRow: 2,
                    }}
                  />
                </div>
              )}

              {/* Column Dictionary */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Column Dictionary
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 text-left text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <th className="py-2 px-3 font-semibold">Col</th>
                        <th className="py-2 px-3 font-semibold">Field</th>
                        <th className="py-2 px-3 font-semibold">Type</th>
                        <th className="py-2 px-3 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {ds.columns.map((c) => (
                        <tr key={c.col}>
                          <td className="py-2 px-3 font-mono font-bold text-[#217346] dark:text-emerald-400">
                            {c.col}
                          </td>
                          <td className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200">
                            {c.name}
                          </td>
                          <td className="py-2 px-3 font-mono text-xs text-slate-500">{c.type}</td>
                          <td className="py-2 px-3 text-slate-600 dark:text-slate-400">
                            {c.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Worked Answer Key */}
              {ds.answerKey && ds.answerKey.length > 0 && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        Worked Answer Key ({ds.shortName})
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Verify your Excel calculations down to the last paisa.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleAnswerKey(ds.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      {isKeyOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {isKeyOpen ? 'Hide Answer Key' : 'Show Answer Key'}
                    </button>
                  </div>

                  {isKeyOpen && (
                    <div className="grid sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      {ds.answerKey.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs tabular-nums"
                        >
                          <span className="text-slate-600 dark:text-slate-300">{item.measure}</span>
                          <span className="font-mono font-bold text-[#1B5E3A] dark:text-emerald-400">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}

        {/* Messy Customers Cleaning Sheet */}
        <section
          id="messy-customers"
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 scroll-mt-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-semibold text-[#D24726]">
                Data Cleaning Practice · Lesson 5.2 &amp; Lab 11
              </div>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Messy Customers — Data Cleaning Sample
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Contains extra spaces, inconsistent casing, trailing spaces, duplicate entries, and hyphens inside phone numbers — fix using TRIM, PROPER, SUBSTITUTE, and Remove Duplicates.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                downloadCSV(
                  'messy-customers-cleaning.csv',
                  MESSY_CUSTOMERS_DATA.headers,
                  MESSY_CUSTOMERS_DATA.rows
                )
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Download Messy CSV
            </button>
          </div>

          <WorksheetView
            data={{
              title: 'Messy_Customers',
              columns: MESSY_CUSTOMERS_DATA.headers,
              rows: MESSY_CUSTOMERS_DATA.rows,
              startRow: 2,
            }}
          />
        </section>
      </div>
    </div>
  );
};
