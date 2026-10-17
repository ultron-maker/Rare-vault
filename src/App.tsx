import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { CardScannerStudio } from './components/CardScannerStudio';
import { LiveTracker } from './components/LiveTracker';
import { BloxFruitsHub } from './components/BloxFruitsHub';
import { TrendingDrops } from './components/TrendingDrops';
import { UserProfileVault } from './components/UserProfileVault';
import { ContactSubmit } from './components/ContactSubmit';
import { KaizSupportAI } from './components/KaizSupportAI';
import { AuthModal } from './components/AuthModal';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';
import { PHYSICAL_ASSETS } from './data/physicalData';
import { BLOX_ITEMS, formatTradeValue, formatCurrency } from './data/bloxData';
import { ArrowRight, Scan, Sliders, Bell } from 'lucide-react';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const { isSubscribed, toggleSubscription } = useAuth();

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Bar Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body Content based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section with Mockup Phone Graphic & Dual CTAs */}
            <HomeHero setActiveTab={setActiveTab} />

            {/* Home Showcase 1: Quick Scanner Preview Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                    <Scan className="w-4 h-4" />
                    <span>Computer Vision Inspection</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                    Instant Physical Card & Coin Grading
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTab('scanner')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Full Scanner Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Specimen Grid with Bell Subscription Icon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PHYSICAL_ASSETS.slice(0, 4).map((asset) => (
                  <div
                    key={asset.id}
                    className="p-5 rounded-2xl bg-[#0c0e17] border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono-numbers text-slate-500 mb-2">
                        <span className="uppercase text-cyan-400">{asset.category}</span>
                        <div className="flex items-center gap-2">
                          <span>Year {asset.year}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubscription(asset.id, asset.name, 'physical');
                            }}
                            title={isSubscribed(asset.id) ? 'Subscribed to price updates (Click to unsubscribe)' : 'Subscribe to price alerts'}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              isSubscribed(asset.id)
                                ? 'bg-amber-950/80 border-amber-500/70 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                                : 'bg-slate-900 border-slate-700/80 text-slate-500 hover:text-amber-400'
                            }`}
                            aria-label={`Subscribe to ${asset.name}`}
                          >
                            <Bell className={`w-3 h-3 ${isSubscribed(asset.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                      <h3 
                        onClick={() => setActiveTab('scanner')}
                        className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors line-clamp-1 cursor-pointer"
                      >
                        {asset.name}
                      </h3>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{asset.subtitle}</div>
                    </div>

                    <div 
                      onClick={() => setActiveTab('scanner')}
                      className="mt-5 pt-4 border-t border-slate-800/80 flex items-baseline justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-[10px] text-slate-500">PSA 10 Gem Mint</div>
                        <div className="text-lg font-black text-white font-mono-numbers">
                          {formatCurrency(asset.gradePrices.psa10)}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-emerald-400 font-mono-numbers">
                        +{asset.change24h}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Home Showcase 2: Blox Fruits Trading Highlight with Bell Notification */}
            <section className="bg-[#0a0c14] border-y border-slate-800/80 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
                      <Sliders className="w-4 h-4" />
                      <span>Virtual Meta Trading</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                      Blox Fruits Real-Time Trade Values
                    </h2>
                  </div>

                  <button
                    onClick={() => setActiveTab('blox')}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Open W/F/L Trade Calculator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {BLOX_ITEMS.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-[#0c0e17] border border-slate-800 hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{item.iconSymbol}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold font-mono-numbers text-amber-400">
                              {item.demand}/10 Demand
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSubscription(item.id, item.name, 'blox');
                              }}
                              title={isSubscribed(item.id) ? 'Subscribed to price updates (Click to unsubscribe)' : 'Subscribe to price alerts'}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                isSubscribed(item.id)
                                  ? 'bg-amber-950/80 border-amber-500/70 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                                  : 'bg-slate-900 border-slate-700/80 text-slate-500 hover:text-amber-400'
                              }`}
                              aria-label={`Subscribe to ${item.name}`}
                            >
                              <Bell className={`w-3 h-3 ${isSubscribed(item.id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>
                        <h3 
                          onClick={() => setActiveTab('blox')}
                          className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors mt-3 cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        <div className="text-[11px] text-slate-400 font-mono-numbers mt-0.5">
                          {item.tier} · {item.category}
                        </div>
                      </div>

                      <div 
                        onClick={() => setActiveTab('blox')}
                        className="mt-5 pt-4 border-t border-slate-800/80 flex items-baseline justify-between cursor-pointer"
                      >
                        <div>
                          <div className="text-[10px] text-slate-500">Trade Value</div>
                          <div className="text-lg font-black text-cyan-400 font-mono-numbers">
                            {formatTradeValue(item.tradeValue)}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-emerald-400 font-mono-numbers">
                          +{item.change24h}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'scanner' && <CardScannerStudio />}
        {activeTab === 'tracker' && <LiveTracker />}
        {activeTab === 'blox' && <BloxFruitsHub />}
        {activeTab === 'trending' && <TrendingDrops setActiveTab={setActiveTab} />}
        {activeTab === 'profile' && <UserProfileVault setActiveTab={setActiveTab} />}
        {activeTab === 'contact' && <ContactSubmit />}
      </main>

      {/* 3D Superman-Type Support AI Companion "Kaiz" */}
      <KaizSupportAI setActiveTab={setActiveTab} />

      {/* Global Auth Modal for Sign Up / Log In / Demo */}
      <AuthModal />

      {/* Instant Action Toast Notifications */}
      <ToastNotification />

      {/* Quiet Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
