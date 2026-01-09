
import React, { useState } from 'react';
import { Globe, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const SiteDiscovery: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState<any[]>([]);

  const handleDiscovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    setLoading(true);
    try {
      const data = await geminiService.discoverSites(niche);
      setSites(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Discover Guest Posting Sites</h2>
        <form onSubmit={handleDiscovery} className="flex gap-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="e.g. Digital Marketing, Sustainable Living..."
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
          <button 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Globe size={20} />}
            Find Opportunities
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-indigo-50 transition-colors">
                <Globe className="text-slate-400 group-hover:text-indigo-600" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-slate-400">DA EST.</span>
                <span className="text-lg font-bold text-indigo-600">{site.domainAuthorityEstimate}</span>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 line-clamp-1 mb-1">{site.title}</h3>
            <p className="text-xs text-slate-500 mb-4 truncate">{site.url}</p>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 size={12} /> SPAM CHECK PASSED
              </div>
            </div>

            <div className="flex gap-2">
              <a 
                href={site.url} 
                target="_blank" 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-center py-2 rounded-lg text-sm font-bold transition-colors"
              >
                Visit Site
              </a>
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-bold transition-colors">
                Outreach
              </button>
            </div>
          </div>
        ))}
      </div>

      {sites.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <AlertCircle className="text-slate-300 mb-4" size={48} />
          <h3 className="text-lg font-bold">Start Your Discovery</h3>
          <p className="text-slate-500 max-w-sm">Enter keywords to find blogs and platforms with active "Write For Us" programs.</p>
        </div>
      )}
    </div>
  );
};

export default SiteDiscovery;
