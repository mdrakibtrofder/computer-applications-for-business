/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SyllabusPage } from './pages/SyllabusPage';
import { ModulePage } from './pages/ModulePage';
import { LabsPage } from './pages/LabsPage';
import { LabDetailPage } from './pages/LabDetailPage';
import { ExcelLabPage } from './pages/ExcelLabPage';
import { DatasetsPage } from './pages/DatasetsPage';
import { QuizzesPage } from './pages/QuizzesPage';
import {
  AssessmentPage,
  CreditsPage,
  FunctionsPage,
  GlossaryPage,
  NotFoundPage,
  ProjectsPage,
  ResourcesFaqPage,
  ShortcutsPage,
} from './pages/ReferencePages';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/module/:moduleId" element={<ModulePage />} />
          <Route path="/module/:moduleId/:lessonId" element={<ModulePage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/labs/:labId" element={<LabDetailPage />} />
          <Route path="/excel-lab" element={<ExcelLabPage />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/shortcuts" element={<ShortcutsPage />} />
          <Route path="/functions" element={<FunctionsPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/resources" element={<ResourcesFaqPage mode="resources" />} />
          <Route path="/faq" element={<ResourcesFaqPage mode="faq" />} />
          <Route path="/credits" element={<CreditsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
