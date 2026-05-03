import { useState } from 'react';
import { analyzeNews, NewsAnalysisResult } from './services/geminiService';
import { AlertCircle, CheckCircle, FileText, Loader2, ShieldAlert, XCircle, BarChart3, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<NewsAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const analysisRecord = await analyzeNews(inputText);
      setResult(analysisRecord);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-serif p-4 md:p-10 flex flex-col overflow-hidden selection:bg-[#C21E2E] selection:text-white border-[12px] border-white">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-baseline border-b-2 border-[#1A1A1A] pb-4 mb-8">
        <div className="flex flex-col">
          <h1 className="text-5xl font-black tracking-tighter leading-none flex items-center gap-3">
            VERACITY AI
          </h1>
          <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase mt-2 text-[#666]">Fake News Detection Framework • v1.0.2</span>
        </div>
        <div className="text-left md:text-right mt-4 md:mt-0">
          <p className="text-xs font-sans font-bold uppercase tracking-widest leading-tight">Developed By</p>
          <p className="text-xl font-medium tracking-tight">Nitin Saini</p>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Input text */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="mb-6 relative">
            <h2 className="text-xs font-sans font-black uppercase tracking-[0.3em] mb-4 text-[#C21E2E]">Input Field</h2>
            
            <div className="relative">
              <label htmlFor="article-input" className="absolute -top-3 -left-3 bg-[#C21E2E] text-white text-[10px] px-2 py-1 font-sans font-bold uppercase z-10">
                Live Text Stream
              </label>
              <textarea
                id="article-input"
                className="w-full h-48 md:h-64 p-6 bg-white border border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] text-lg leading-relaxed italic text-gray-700 outline-none focus:ring-0 focus:border-[#C21E2E] focus:shadow-[4px_4px_0px_#C21E2E] transition-all resize-y font-serif"
                placeholder="E.g., Breaking: Scientists have discovered a new planet made entirely of diamonds..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isAnalyzing}
              />
              <div className="absolute bottom-4 right-4 text-xs font-sans font-bold text-gray-400 uppercase">
                {inputText.length} chars
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 border border-[#1A1A1A] bg-[#C21E2E]/10 text-[#C21E2E] font-sans text-sm flex items-start gap-2 shadow-[2px_2px_0px_#1A1A1A]"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="font-bold">{error}</span>
              </motion.div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="mt-6 self-start bg-[#1A1A1A] hover:bg-[#C21E2E] text-white font-sans font-bold uppercase tracking-widest text-sm px-8 py-4 shadow-[4px_4px_0px_#C21E2E] hover:shadow-[4px_4px_0px_#1A1A1A] hover-translate-y-[2px] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Classify Text
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-5 flex flex-col border border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] bg-[#FDFCFB] overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {!result && !isAnalyzing ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#1A1A1A] text-white"
              >
                <div className="relative mb-6">
                  <BarChart3 className="w-12 h-12 text-[#C21E2E]" />
                </div>
                <h3 className="text-xs font-sans font-bold tracking-[0.4em] uppercase opacity-50 mb-2">Awaiting Input</h3>
                <p className="font-serif text-lg italic opacity-80 max-w-xs leading-snug">
                   System standby. Awaiting text stream for classification.
                </p>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-8 bg-[#1A1A1A] text-white"
              >
                <div className="relative mb-6 text-[#C21E2E]">
                  <div className="w-16 h-16 border-2 border-white/10 border-t-[#C21E2E] rounded-full animate-spin"></div>
                  <TrendingUp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-xs font-sans font-bold tracking-[0.4em] uppercase text-[#C21E2E] mb-2">Processing</h3>
                <p className="font-serif text-sm italic opacity-70 text-center max-w-xs leading-snug">
                  Running NLP feature extraction and vectorization...
                </p>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col"
              >
                {/* Result Top Panel */}
                <div className="bg-[#1A1A1A] text-white p-8 flex flex-col items-center justify-center relative overflow-hidden shrink-0 min-h-[50%]">
                  <div className="absolute top-4 left-4 opacity-10 text-[100px] font-black leading-none font-sans text-white z-0 pointer-events-none select-none">
                    {result.confidence}%
                  </div>
                  <h3 className="text-xs font-sans font-bold uppercase tracking-[0.4em] mb-4 text-[#C21E2E] z-10">Classification Result</h3>
                  <div className="text-7xl font-black tracking-tighter mb-4 z-10"
                    style={{ color: 
                      result.classification === 'REAL' ? '#047857' : 
                      result.classification === 'FAKE' ? '#C21E2E' : '#a16207'
                    }}
                  >
                    {result.classification}
                  </div>
                  <div className="h-1 w-32 mb-6 z-10"
                    style={{ backgroundColor: 
                      result.classification === 'REAL' ? '#047857' : 
                      result.classification === 'FAKE' ? '#C21E2E' : '#a16207'
                    }}
                  ></div>
                  <div className="flex items-center gap-2 z-10">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Confidence</span>
                    <span className="font-sans text-xl font-black">{result.confidence}%</span>
                  </div>
                </div>

                {/* Result Details */}
                <div className="p-6 flex-1 flex flex-col gap-6 bg-[#FDFCFB] overflow-y-auto">
                  
                  <div>
                    <h4 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] mb-3 text-[#1A1A1A] border-b border-[#1A1A1A] pb-2 text-opacity-60">
                      Analysis Explanation
                    </h4>
                    <p className="font-serif text-lg leading-snug italic text-gray-800">
                      "{result.explanation}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] mb-3 text-[#1A1A1A] border-b border-[#1A1A1A] pb-2 text-opacity-60">
                      Extracted NLP Features
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                       {result.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="px-2 py-1 bg-white border border-[#1A1A1A] text-[#1A1A1A] font-sans text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0px_#1A1A1A]"
                        >
                          {feature}
                        </div>
                      ))}
                      {result.features.length === 0 && (
                        <span className="text-sm font-serif italic text-gray-400">No explicit features listed.</span>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Footer Info */}
      <footer className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-sans font-bold uppercase tracking-widest opacity-60 border-t border-[#1A1A1A] pt-4 gap-4">
        <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
           <span>Model: Logistic Reg / Naive Bayes (Simulated)</span>
           <span>Library: Scikit-learn / NumPy / Pandas (Concepts)</span>
        </div>
        <div className="text-center md:text-right">
          © 2024 NITIN SAINI • AI SOCIAL IMPACT DIVISION
        </div>
      </footer>
    </div>
  );
}
