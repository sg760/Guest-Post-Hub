
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ClientFinder from './components/ClientFinder';
import SiteDiscovery from './components/SiteDiscovery';
import Outreach from './components/Outreach';
import ContentWriter from './components/ContentWriter';
import Reports from './components/Reports';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(AppTab.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard />;
      case AppTab.CLIENT_FINDER:
        return <ClientFinder />;
      case AppTab.SITE_DISCOVERY:
        return <SiteDiscovery />;
      case AppTab.OUTREACH:
        return <Outreach />;
      case AppTab.CONTENT_WRITER:
        return <ContentWriter />;
      case AppTab.REPORTS:
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
              JS
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-none">John Smith</p>
              <p className="text-xs text-slate-500 mt-1">SEO Agency Admin</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              API Connected
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
