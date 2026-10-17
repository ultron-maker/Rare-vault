import React from 'react';
import { ActiveTab } from './Navbar';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full bg-[#06070a] border-t border-slate-800/80 mt-20 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-display font-black text-slate-950 text-xs">
                R
              </div>
              <span className="font-bold text-white text-sm font-display tracking-tight">Rare Vault</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ultra-modern valuation platform for physical high-end collectibles and Blox Fruits virtual trading assets.
            </p>
          </div>

          {/* Quick Links: Physical */}
          <div>
            <h4 className="font-semibold text-slate-300 text-xs uppercase tracking-wider mb-3">Physical Collectibles</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setActiveTab('scanner')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Card Scanner Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Live Market Price Tickers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  1999 Base Set Charizard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  1909-S VDB Lincoln Cent
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Virtual */}
          <div>
            <h4 className="font-semibold text-slate-300 text-xs uppercase tracking-wider mb-3">Blox Fruits Economy</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setActiveTab('blox')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  W/F/L Trade Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blox')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Permanent Fruit Values
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('trending')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Hot Drops & Mythical Trends
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blox')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Gamepasses & Storage
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Community */}
          <div>
            <h4 className="font-semibold text-slate-300 text-xs uppercase tracking-wider mb-3">Community & Oracle</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  My Vault Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Submit Verified Comps
                </button>
              </li>
              <li>
                <span className="text-slate-500">Kaiz 3D Support AI (Online)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} Rare Vault Inc. All rights reserved. Independent valuation aggregator.</p>
          <p className="text-slate-500 text-center sm:text-right">
            Not affiliated with Nintendo, Game Freak, Roblox Corporation, Gamer Robot Inc., PSA, or PCGS.
          </p>
        </div>
      </div>
    </footer>
  );
};
