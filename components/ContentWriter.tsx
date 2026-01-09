
import React, { useState } from 'react';
import { FileEdit, Loader2, Download, Copy, Eye } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const ContentWriter: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [anchorText, setAnchorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState('');

  const generateContent = async () => {
    if (!topic || !targetUrl || !anchorText) return;
    setLoading(true);
    try {
      const data = await geminiService.generateGuestPost(topic, targetUrl, anchorText);
      setArticle(data || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold mb-6">AI SEO Content Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Article Topic</label>
              <textarea 
                rows={3}
                placeholder="e.g. The Future of SaaS in 2025"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                value={topic}
                onChange={e => setTopic(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target URL</label>
              <input 
                type="text" 
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={targetUrl}
                onChange={e => setTargetUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Anchor Text</label>
              <input 
                type="text" 
                placeholder="e.g. SaaS solutions"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={anchorText}
                onChange={e => setAnchorText(e.target.value)}
              />
            </div>
            <button 
              onClick={generateContent}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100"
            >
              {loading ? <Loader2 className="animate-spin" /> : <FileEdit size={20} />}
              Generate SEO Article
            </button>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 min-h-[500px] relative">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Eye size={16} /> Live Preview
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all"><Copy size={18} /></button>
                  <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all"><Download size={18} /></button>
                </div>
              </div>

              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl z-10">
                  <Loader2 className="animate-spin text-indigo-600 mb-3" size={40} />
                  <p className="text-indigo-600 font-bold">Generating unique content...</p>
                  <p className="text-slate-400 text-xs mt-1">Researching and optimizing for SEO</p>
                </div>
              ) : null}

              <div className="prose max-w-none text-slate-700">
                {article ? (
                   <div dangerouslySetInnerHTML={{ __html: article.replace(/\n/g, '<br/>') }} />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-300 h-full mt-20">
                    <FileEdit size={48} className="mb-4 opacity-20" />
                    <p>Enter details on the left to generate your guest post.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWriter;
