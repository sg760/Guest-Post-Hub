
import React, { useState } from 'react';
import { Search, Loader2, ExternalLink, ShieldCheck } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const ClientFinder: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche || !region) return;
    setLoading(true);
    try {
      const data = await geminiService.findClients(niche, region);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Find Potential Clients</h2>
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Niche / Industry</label>
            <input 
              type="text" 
              placeholder="e.g. Eco-friendly SaaS"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Region</label>
            <input 
              type="text" 
              placeholder="e.g. North America"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
              Discover Clients
            </button>
          </div>
        </form>
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Company Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Website</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Niche</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Traffic Est.</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((client, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{client.name}</div>
                      <div className="text-xs text-slate-500 line-clamp-1">{client.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 flex items-center gap-1 hover:underline text-sm">
                        {client.website} <ExternalLink size={12} />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs">{client.niche}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        client.estimatedTrafficCategory === 'High' ? 'bg-emerald-100 text-emerald-700' :
                        client.estimatedTrafficCategory === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {client.estimatedTrafficCategory}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg font-bold transition-colors">
                        Add to CRM
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {results.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-slate-300" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No discovery results yet</h3>
          <p className="text-slate-500 max-w-xs mx-auto">Enter a niche and region to find businesses that need your guest blogging services.</p>
        </div>
      )}
    </div>
  );
};

export default ClientFinder;
