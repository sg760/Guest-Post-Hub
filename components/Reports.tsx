
import React from 'react';
import { 
  BarChart3, 
  Download, 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ExternalLink,
  Table as TableIcon
} from 'lucide-react';

const Reports: React.FC = () => {
  const reports = [
    { id: '1', client: 'GreenTech Solutions', site: 'Forbes', status: 'Live', date: '2023-11-15', url: 'forbes.com/article-1', anchor: 'Sustainable Tech' },
    { id: '2', client: 'FastSaaS Inc.', site: 'TechCrunch', status: 'Pending', date: '2023-11-18', url: 'techcrunch.com/article-2', anchor: 'SaaS automation' },
    { id: '3', client: 'CloudVault', site: 'VentureBeat', status: 'Failed', date: '2023-11-20', url: '-', anchor: 'Cloud security' },
    { id: '4', client: 'EduStream', site: 'Entrepreneur', status: 'Live', date: '2023-11-22', url: 'entrepreneur.com/edu', anchor: 'E-learning growth' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Campaign Reports</h2>
          <p className="text-slate-500 text-sm">Monitor live links and delivery status across all clients.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} /> Export to Sheets
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            <BarChart3 size={16} /> Generate AI Insights
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600"><CheckCircle2 /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Live Links</p>
            <p className="text-2xl font-bold">142</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-600"><Clock /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Approval</p>
            <p className="text-2xl font-bold">28</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600"><TableIcon /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Campaigns</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold">Recent Deliveries</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by client or site..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client / Site</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Anchor Text</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Publication Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{report.client}</div>
                    <div className="text-xs text-slate-500">on {report.site}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      report.status === 'Live' ? 'bg-emerald-100 text-emerald-700' :
                      report.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {report.status === 'Live' ? <CheckCircle2 size={12} /> : 
                       report.status === 'Pending' ? <Clock size={12} /> : 
                       <XCircle size={12} />}
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                      {report.anchor}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4">
                    {report.url !== '-' ? (
                      <a href={`https://${report.url}`} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                        <ExternalLink size={14} /> View Link
                      </a>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
