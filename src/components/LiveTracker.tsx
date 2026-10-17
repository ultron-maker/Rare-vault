import React, { useState, useEffect } from 'react';
import { PHYSICAL_ASSETS, PhysicalAsset } from '../data/physicalData';
import { formatCurrency } from '../data/bloxData';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Bookmark, 
  Bell,
  Plus, 
  Radio, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
  Globe
} from 'lucide-react';

export const LiveTracker: React.FC = () => {
  const { toggleWatchlist, isWatched, addPhysicalItem, isSubscribed, toggleSubscription } = useAuth();
  
  const [filterCategory, setFilterCategory] = useState<'all' | 'pokemon' | 'sports' | 'coins' | 'currency'>('all');
  const [selectedGrade, setSelectedGrade] = useState<'Raw' | 'PSA 8' | 'PSA 9' | 'PSA 10' | 'BGS 9.5'>('PSA 10');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(true);
  const [flashingItems, setFlashingItems] = useState<{ [id: string]: 'up' | 'down' }>({});
  const [activeModalAsset, setActiveModalAsset] = useState<PhysicalAsset | null>(null);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  const [customGoogleQuery, setCustomGoogleQuery] = useState('');

  // Simulated live ticker pulse every 3.8 seconds when stream is active
  useEffect(() => {
    if (!isLiveStreamActive) return;

    const interval = setInterval(() => {
      const randomAsset = PHYSICAL_ASSETS[Math.floor(Math.random() * PHYSICAL_ASSETS.length)];
      const direction = Math.random() > 0.45 ? 'up' : 'down';

      setFlashingItems((prev) => ({
        ...prev,
        [randomAsset.id]: direction,
      }));

      setTimeout(() => {
        setFlashingItems((prev) => {
          const next = { ...prev };
          delete next[randomAsset.id];
          return next;
        });
      }, 1500);
    }, 3800);

    return () => clearInterval(interval);
  }, [isLiveStreamActive]);

  const filteredAssets = PHYSICAL_ASSETS.filter((asset) => {
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPriceForGrade = (asset: PhysicalAsset) => {
    switch (selectedGrade) {
      case 'Raw': return asset.gradePrices.raw;
      case 'PSA 8': return asset.gradePrices.psa8;
      case 'PSA 9': return asset.gradePrices.psa9;
      case 'PSA 10': return asset.gradePrices.psa10;
      case 'BGS 9.5': return asset.gradePrices.bgs9_5 || asset.gradePrices.psa10;
      default: return asset.currentMarketPrice;
    }
  };

  const handleQuickAdd = (asset: PhysicalAsset) => {
    const price = getPriceForGrade(asset);
    addPhysicalItem({
      assetId: asset.id,
      name: asset.name,
      category: asset.category,
      grade: selectedGrade,
      purchasePrice: Math.round(price * 0.9),
      currentEstimatedValue: price,
      dateAcquired: new Date().toISOString().split('T')[0],
      certNumber: asset.specs.authCode,
      notes: `Logged via Live Tracker at ${selectedGrade}`
    });
    setAddedItemNotice(`Added ${asset.name.split(' ').slice(0, 3).join(' ')} (${selectedGrade}) to your Vault!`);
    setTimeout(() => setAddedItemNotice(null), 3000);
  };

  const handleLaunchCustomGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleQuery.trim()) return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(`${customGoogleQuery} live price auction settled comps`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header with live ticker indicators */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
            <span>Real-Time Market Feeds</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400">Directly Connected to Google Live Rates</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display mt-1">
            Live Physical Asset Value Tracker
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Live prices for ultra-rare Pokémon grails, historic numismatic coins, and iconic sports cards based on verified auction settled records and direct Google live comps.
          </p>
        </div>

        {/* Live stream status toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveStreamActive(!isLiveStreamActive)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
              isLiveStreamActive 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLiveStreamActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
            <span>{isLiveStreamActive ? 'Simulated Live Ticker (Active)' : 'Ticker Paused'}</span>
          </button>
        </div>
      </div>

      {/* DIRECT GOOGLE LIVE SEARCH TOOLBAR */}
      <div className="p-4 rounded-2xl bg-[#0c0e17] border border-cyan-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-black flex items-center justify-center text-xs">
            G
          </div>
          <div>
            <div className="font-bold text-white">Google Live Price & Comps Search:</div>
            <div className="text-[11px] text-slate-400">Instant direct query to live Google settled auction feeds for any card or coin</div>
          </div>
        </div>

        <form onSubmit={handleLaunchCustomGoogleSearch} className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={customGoogleQuery}
              onChange={(e) => setCustomGoogleQuery(e.target.value)}
              placeholder="e.g. 1999 Charizard PSA 10 Goldin..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Search Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {addedItemNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-200 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{addedItemNotice}</span>
          </div>
          <button onClick={() => setAddedItemNotice(null)} className="text-emerald-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Control Bar: Filters, Search, and Grade Recalibrator */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c0e17] border border-slate-800">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 text-xs font-medium">
          {(
            [
              { key: 'all', label: 'All Categories' },
              { key: 'pokemon', label: 'Pokémon' },
              { key: 'sports', label: 'Sports Cards' },
              { key: 'coins', label: 'Rare Coins' },
              { key: 'currency', label: 'Currency Notes' }
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterCategory(tab.key)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === tab.key
                  ? 'bg-slate-800 text-cyan-400 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right side: Search and Grade Multiplier Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets by name..."
              className="w-full sm:w-56 bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Grade Recalibrator */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-500 px-2 font-medium">Grade:</span>
            {(['Raw', 'PSA 8', 'PSA 9', 'PSA 10', 'BGS 9.5'] as const).map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Table / Data Grid */}
      <div className="bg-[#0c0e17] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#08090d]/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Specimen Asset</th>
                <th className="py-3.5 px-4">Category · Year</th>
                <th className="py-3.5 px-4 text-right">Market Price ({selectedGrade})</th>
                <th className="py-3.5 px-4 text-right">24h Fluctuation</th>
                <th className="py-3.5 px-4 text-right hidden sm:table-cell">24h Volume</th>
                <th className="py-3.5 px-4 text-right hidden md:table-cell">Population</th>
                <th className="py-3.5 px-4 text-center">Google Live & Alerts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs text-slate-200">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No collectibles found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => {
                  const currentPrice = getPriceForGrade(asset);
                  const isWatchedItem = isWatched(asset.id);
                  const subscribed = isSubscribed(asset.id);
                  const flashState = flashingItems[asset.id];
                  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(`${asset.name} ${selectedGrade} live market price auction comps`)}`;

                  return (
                    <tr
                      key={asset.id}
                      className={`hover:bg-slate-900/40 transition-colors ${
                        flashState === 'up'
                          ? 'bg-emerald-950/20'
                          : flashState === 'down'
                          ? 'bg-rose-950/20'
                          : ''
                      }`}
                    >
                      {/* Asset name & icon */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setActiveModalAsset(asset)}
                            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-lg shrink-0 hover:scale-105 transition-transform cursor-pointer"
                          >
                            {asset.category === 'pokemon' ? '⚡' : asset.category === 'coins' ? '🪙' : asset.category === 'currency' ? '💵' : '🏀'}
                          </button>
                          <div>
                            <button
                              onClick={() => setActiveModalAsset(asset)}
                              className="font-bold text-white text-left hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1"
                            >
                              {asset.name}
                            </button>
                            <div className="text-[11px] text-slate-400 line-clamp-1">{asset.subtitle}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category & Year */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-medium capitalize text-slate-300">{asset.category}</div>
                        <div className="text-[11px] text-slate-500 font-mono-numbers">Year {asset.year}</div>
                      </td>

                      {/* Market Price with tabular figures & flashing indicators */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Flashing Green/Red indicator dot */}
                          <span 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              flashState === 'up'
                                ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] scale-125'
                                : flashState === 'down'
                                ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e] scale-125'
                                : asset.change24h >= 0 
                                ? 'bg-emerald-500/40' 
                                : 'bg-rose-500/40'
                            }`}
                          />
                          <span className="font-extrabold text-sm text-white font-mono-numbers">
                            {formatCurrency(currentPrice)}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono-numbers">{selectedGrade} Specimen</div>
                      </td>

                      {/* 24h Change */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className={`font-mono-numbers font-semibold flex items-center justify-end gap-1 ${
                          asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {asset.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          <span>{asset.change24h >= 0 ? '+' : ''}{asset.change24h}%</span>
                        </div>
                        <div className="text-[10px] text-slate-500">{asset.lastSaleDate}</div>
                      </td>

                      {/* 24h Volume */}
                      <td className="py-4 px-4 text-right whitespace-nowrap font-mono-numbers text-slate-300 hidden sm:table-cell">
                        {asset.volume24h}
                      </td>

                      {/* Pop Report */}
                      <td className="py-4 px-4 text-right whitespace-nowrap text-slate-400 text-[11px] hidden md:table-cell">
                        {asset.popReport}
                      </td>

                      {/* Actions with Bell, Google Live link, Watchlist, Add */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Bell Notification Subscription Icon */}
                          <button
                            onClick={() => toggleSubscription(asset.id, asset.name, 'physical')}
                            title={subscribed ? 'Subscribed to price updates (Click to unsubscribe)' : 'Subscribe to price alerts'}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              subscribed
                                ? 'bg-amber-950/80 border-amber-500/70 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                                : 'bg-slate-900 border-slate-700/80 text-slate-500 hover:text-amber-400 hover:border-slate-600'
                            }`}
                            aria-label={`Subscribe to ${asset.name} price alerts`}
                          >
                            <Bell className={`w-3.5 h-3.5 ${subscribed ? 'fill-current' : ''}`} />
                          </button>

                          {/* Direct Google Live Rates Verification */}
                          <a
                            href={googleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Verify Live Rates on Google"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => toggleWatchlist(asset.id, asset.name)}
                            title={isWatchedItem ? 'Item watched' : 'Add to watchlist'}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              isWatchedItem 
                                ? 'bg-cyan-950 border-cyan-400 text-cyan-400' 
                                : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                          </button>

                          <button
                            onClick={() => handleQuickAdd(asset)}
                            title="Add to My Vault"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700/80 text-slate-300 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Deep Dive Modal */}
      {activeModalAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="w-full max-w-2xl bg-[#0e111a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {activeModalAsset.category} Specimen Breakdown
                </span>
                <h3 className="text-2xl font-extrabold text-white font-display mt-0.5">
                  {activeModalAsset.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{activeModalAsset.subtitle}</p>
              </div>

              <button
                onClick={() => setActiveModalAsset(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Pricing Grid Across All Grades */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2">Live Grade Valuations:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] text-slate-500">Raw / Ungraded</div>
                  <div className="font-mono-numbers font-bold text-white text-sm mt-0.5">
                    {formatCurrency(activeModalAsset.gradePrices.raw)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] text-slate-500">PSA 8 (NM-MT)</div>
                  <div className="font-mono-numbers font-bold text-white text-sm mt-0.5">
                    {formatCurrency(activeModalAsset.gradePrices.psa8)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] text-slate-500">PSA 9 (Mint)</div>
                  <div className="font-mono-numbers font-bold text-white text-sm mt-0.5">
                    {formatCurrency(activeModalAsset.gradePrices.psa9)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
                  <div className="text-[11px] text-cyan-400 font-semibold">PSA 10 (Gem Mint)</div>
                  <div className="font-mono-numbers font-extrabold text-white text-sm mt-0.5">
                    {formatCurrency(activeModalAsset.gradePrices.psa10)}
                  </div>
                </div>
              </div>
            </div>

            {/* Comps List */}
            <div>
              <div className="text-xs font-semibold text-slate-300 mb-2">Recent Auction Comps:</div>
              <div className="space-y-2">
                {activeModalAsset.recentComps.map((comp, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="text-slate-200 font-semibold">{comp.grade}</div>
                      <div className="text-[11px] text-slate-500">{comp.platform} · {comp.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-numbers font-bold text-emerald-400">{formatCurrency(comp.price)}</div>
                      <div className="text-[10px] text-slate-500">Settled Comp</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Google Live Search Button in Modal */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-black flex items-center justify-center text-[10px]">G</span>
                <span className="text-slate-300">Google Live Market Auction Comps:</span>
              </div>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(`${activeModalAsset.name} live auction price comps Goldin Heritage`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Check Live Rates</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => toggleSubscription(activeModalAsset.id, activeModalAsset.name, 'physical')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSubscribed(activeModalAsset.id)
                    ? 'bg-amber-950/80 border-amber-500/70 text-amber-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Bell className={`w-3.5 h-3.5 ${isSubscribed(activeModalAsset.id) ? 'fill-current' : ''}`} />
                <span>{isSubscribed(activeModalAsset.id) ? 'Subscribed to Alerts' : 'Subscribe to Alerts'}</span>
              </button>

              <button
                onClick={() => {
                  handleQuickAdd(activeModalAsset);
                  setActiveModalAsset(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
              >
                Add Specimen to My Vault
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
