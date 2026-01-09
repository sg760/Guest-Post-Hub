
import React, { useState } from 'react';
import { Mail, Send, Copy, Loader2, RotateCcw } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const Outreach: React.FC = () => {
  const [details, setDetails] = useState({
    clientName: '',
    siteUrl: '',
    topic: '',
    targetUrl: '',
    anchorText: ''
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'first' | 'followup' | 'negotiation'>('first');

  const generateEmail = async () => {
    if (!details.clientName || !details.siteUrl) return;
    setLoading(true);
    try {
      const content = await geminiService.generateOutreach(type, details);
      setEmail(content || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert('Email copied to clipboard!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-xl font-bold mb-4">Email Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['first', 'followup', 'negotiation'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-all ${
                    type === t ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={details.clientName}
                onChange={e => setDetails({...details, clientName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Site URL</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={details.siteUrl}
                onChange={e => setDetails({...details, siteUrl: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Suggested Topic</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={details.topic}
              onChange={e => setDetails({...details, topic: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Link URL</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={details.targetUrl}
                onChange={e => setDetails({...details, targetUrl: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Anchor Text</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={details.anchorText}
                onChange={e => setDetails({...details, anchorText: e.target.value})}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={generateEmail}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-indigo-100"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Mail size={20} />}
          Generate {type.charAt(0).toUpperCase() + type.slice(1)} Email
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Email Content Preview</h2>
          <div className="flex gap-2">
            <button 
              onClick={copyToClipboard}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={18} />
            </button>
            <button 
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
              title="Regenerate"
              onClick={generateEmail}
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-100 overflow-y-auto whitespace-pre-wrap text-slate-700 font-serif leading-relaxed min-h-[400px]">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 italic">
              <Loader2 className="animate-spin mb-2" size={32} />
              AI is drafting your email...
            </div>
          ) : email || "Your generated email will appear here..."}
        </div>

        <div className="mt-4 flex gap-3">
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100">
            <Send size={18} /> Send via Gmail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Outreach;
