import React from 'react';
import { ActiveTab } from './Navbar';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Sliders, Flame } from 'lucide-react';

interface HomeHeroProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ setActiveTab }) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/60">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
              <span>Dual-Market Valuation Protocol</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Physical & Virtual Assets</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08] text-balance">
              The Real-Time Valuation Engine for Modern Collectors.
            </h1>

            {/* Body */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Scan high-end physical Pokémon cards, rare coins, and sports grails with instant market comps. Calculate Win/Fair/Lose trades across the entire Blox Fruits virtual economy with live demand weighting.
            </p>

            {/* Dual Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => setActiveTab('scanner')}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-current" />
                <span>Scan Your Card</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('blox')}
                className="px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-100 hover:text-white font-semibold rounded-xl text-sm border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Blox Fruits Trading Calculator</span>
              </button>
            </div>

            {/* Supporting Micro-Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Auction Comps (eBay Vault, Heritage)</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Blox Community Demand Metrics (1-10)</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Mock Smartphone Graphic with Card Scanner HUD */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
              
              {/* Phone Outer Chassis with Glass Glow */}
              <div className="relative p-3 bg-gradient-to-b from-slate-700/40 via-slate-800/30 to-slate-900/60 rounded-[40px] border border-cyan-500/30 shadow-[0_0_50px_-10px_rgba(6,182,212,0.25)]">
                
                {/* Phone Screen Container */}
                <div className="relative rounded-[32px] overflow-hidden bg-[#0a0c14] border border-slate-800 aspect-[9/16] flex flex-col justify-between">
                  
                  {/* Top Phone Camera Notch & Status Bar */}
                  <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-between px-6 z-20 text-[10px] font-mono-numbers text-slate-400">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full" />
                    <span>5G · 100%</span>
                  </div>

                  {/* Main Scanner Graphic Image */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src="/src/assets/images/hero_card_scanner_mockup_1792245902341.jpg"
                      alt="High-tech card scanner simulator analyzing rare collectible"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-95"
                    />

                    {/* Scanner Reticle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-transparent to-transparent opacity-80" />

                    {/* Animated Optical Laser Line */}
                    <div className="absolute inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan-laser" />

                    {/* HUD Bounding Box Corners */}
                    <div className="absolute top-16 inset-x-8 bottom-32 pointer-events-none border border-cyan-400/30 rounded-2xl flex flex-col justify-between p-2">
                      <div className="flex justify-between items-start">
                        <div className="w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                        <div className="w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                      </div>
                      
                      {/* Live HUD Reticle Center */}
                      <div className="self-center flex flex-col items-center">
                        <div className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono-numbers text-cyan-300">
                          TARGET: CHARIZARD 1ST ED
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                        <div className="w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                      </div>
                    </div>

                    {/* HUD Valuation Floating Card */}
                    <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-[#0e1220]/90 backdrop-blur-md border border-slate-700/80 shadow-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wide">
                          AI Grade Analysis
                        </span>
                        <span className="text-[10px] font-mono-numbers px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
                          PSA 10 GEM MINT
                        </span>
                      </div>
                      
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-xl font-black font-display text-white tracking-tight">
                            $285,000
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Estimated Market Valuation
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-400 font-mono-numbers">+3.4%</span>
                          <div className="text-[10px] text-slate-400">24h Trending</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab('scanner')}
                        className="w-full py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center"
                      >
                        Open Full Scanner Studio →
                      </button>
                    </div>

                  </div>
                </div>
              </div>

              {/* Floating Decorative Blox Fruit Pill on side */}
              <div 
                onClick={() => setActiveTab('blox')}
                className="absolute -bottom-4 -left-6 bg-[#0f1424] border border-cyan-500/40 rounded-2xl p-3 shadow-2xl flex items-center gap-3 cursor-pointer hover:border-cyan-400 transition-colors hidden sm:flex"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-lg">
                  🦊
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Kitsune Fruit</span>
                    <span className="text-[10px] text-emerald-400 font-mono-numbers">+8.4%</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono-numbers">
                    125M Trade Value · 10/10 Demand
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column Proof & Metrics Strip Below Hero Split */}
        <div className="mt-16 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display font-mono-numbers">
              $248.5M+
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Physical Collectibles Volume Tracked
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display font-mono-numbers">
              3.8M+
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Blox Fruits Trades Calculated
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display font-mono-numbers">
              ±0.1 Subgrade
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Centering & Edge Scan Precision
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-display font-mono-numbers">
              100% Real-Time
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Live Auction & Community Sentiment Feeds
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
