import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Link2, AlertCircle, FileText, Sparkles } from 'lucide-react';

export const ContactSubmit: React.FC = () => {
  const [submissionType, setSubmissionType] = useState<'discrepancy' | 'comp' | 'blox_update' | 'general'>('comp');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('pokemon');
  const [reportedValue, setReportedValue] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Decentralized Verification Desk</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white font-display mt-1">
          Submit Price Data & Comps
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-xl">
          Help calibrate the Rare Vault valuation oracle. Submit verified recent auction sales, report an inaccurate card comp, or propose Blox Fruits trade value adjustments with proof.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Main Submission Form (7 cols) */}
        <div className="md:col-span-7 bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Data Proposal Dispatched
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you! Our automated scraper and community sentinel team will review the submitted proof link and update the market oracle if verified.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setItemName('');
                  setReportedValue('');
                  setProofUrl('');
                  setNotes('');
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs text-cyan-400 font-semibold rounded-xl border border-slate-700 cursor-pointer"
              >
                Submit Another Entry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Submission Type Radio Pill Tabs */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Submission Type:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'comp', label: 'Verified Auction Comp' },
                    { id: 'blox_update', label: 'Blox Fruit Value Shift' },
                    { id: 'discrepancy', label: 'Report Discrepancy' },
                    { id: 'general', label: 'General Feedback' }
                  ].map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setSubmissionType(type.id as any)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        submissionType === type.id
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Name */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Item or Specimen Name *
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. 1999 Base Set Charizard PSA 9 or Permanent Kitsune"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Category */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
                  >
                    <option value="pokemon">Pokémon Cards</option>
                    <option value="sports">Sports Cards</option>
                    <option value="coins">Rare Coins</option>
                    <option value="currency">Currency Bills</option>
                    <option value="blox_fruits">Blox Fruits (Virtual)</option>
                  </select>
                </div>

                {/* Proposed or Settled Value */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Settled Price / Value</label>
                  <input
                    type="text"
                    required
                    value={reportedValue}
                    onChange={(e) => setReportedValue(e.target.value)}
                    placeholder="e.g. $84,500 or 130M Value"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Proof URL */}
              <div>
                <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                  <span>Proof Link / Comp URL *</span>
                  <span className="text-[10px] text-slate-500">eBay, Heritage, PWCC, or Discord trade link</span>
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="url"
                    required
                    value={proofUrl}
                    onChange={(e) => setProofUrl(e.target.value)}
                    placeholder="https://www.ebay.com/itm/..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submitter Email */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Email (for verification bounty)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trader@domain.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Additional Context / Subgrade Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Include condition details, buyers premium status, or why the fruit demand is surging..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Verification Record</span>
              </button>
            </form>
          )}

        </div>

        {/* Right Info & Verification Standards (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Oracle Verification Protocol</span>
            </h3>
            
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Rare Vault aggregates and validates transaction settlement records across physical auction houses and high-tier Roblox Blox Fruits communities.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-white block">1. Settled Comps Only</span>
                <span className="text-[11px] text-slate-400">
                  Asking prices or buy-it-now listings with no bids are filtered out. We only index settled sales.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-white block">2. Blox Fruit Demand Weighting</span>
                <span className="text-[11px] text-slate-400">
                  Trade values adjust daily based on trade volume ratios from over 3,000 verified Discord trades.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-white block">3. Contributor Bounty</span>
                <span className="text-[11px] text-slate-400">
                  Verified price submissions earn you the "Oracle Contributor" badge on your collector profile.
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              <span>Need Direct API Integration?</span>
            </span>
            <p className="text-[11px] text-slate-400">
              For volume traders or Discord bots seeking our real-time websocket feed, reach out to <code className="text-cyan-400 font-mono-numbers">api@rarevault.io</code>.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
