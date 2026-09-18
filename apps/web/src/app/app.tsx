import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar } from '../components/sidebar';
import { Topbar } from '../components/topbar';
import { navigationItems } from '../lib/navigation';
import { DashboardPage } from '../pages/dashboard-page';
import { PlaceholderPage } from '../pages/placeholder-page';

export function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#080d18] text-slate-100">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen((open) => !open)}
      />
      <div className="lg:pl-72">
        <Topbar />
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {navigationItems
              .filter((item) => item.path !== '/')
              .map((item) => (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<PlaceholderPage title={item.label} />}
                />
              ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}
