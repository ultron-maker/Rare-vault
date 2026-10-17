import React, { useState } from 'react';
import { PHYSICAL_ASSETS, PhysicalAsset } from '../data/physicalData';
import { formatCurrency } from '../data/bloxData';
import { useAuth } from '../context/AuthContext';
import { 
  Scan, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  Bookmark, 
  Bell,
  Plus, 
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sliders
} from 'lucide-react';

export const CardScannerStudio: React.FC = () => {
  const { addPhysicalItem, isWatched, toggleWatchlist, isSubscribed, toggleSubscription } = useAuth();
  
  const [selectedAsset, setSelectedAsset] = useState<PhysicalAsset>(PHYSICAL_ASSETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [customCardName, setCustomCardName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<'Raw' | 'PSA 8' | 'PSA 9' | 'PSA 10' | 'BGS 9.5'>('PSA 10');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const handleStartScan = (asset: PhysicalAsset) => {
    setSelectedAsset(asset);
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 280);
  };

  const handleSaveToVault = () => {
    const gradePrice = selectedGrade === 'Raw' 
      ? selectedAsset.gradePrices.raw
      : selectedGrade === 'PSA 8' 
      ? selectedAsset.gradePrices.psa8
      : selectedGrade === 'PSA 9' 
      ? selectedAsset.gradePrices.psa9
      : selectedGrade === 'PSA 10' 
      ? selectedAsset.gradePrices.psa10
      : (selectedAsset.gradePrices.bgs9_5 || selectedAsset.gradePrices.psa10);

    addPhysicalItem({
      assetId: selectedAsset.id,
      name: selectedAsset.name,
      category: selectedAsset.category,
      grade: selectedGrade,
      purchasePrice: Math.round(gradePrice * 0.88), // realistic purchase price
      currentEstimatedValue: gradePrice,
      dateAcquired: new Date().toISOString().split('T')[0],
      certNumber: selectedAsset.specs.authCode,
      notes: `Scanned on Rare Vault Studio. ${selectedAsset.specs.centering}`
    });

    setSaveSuccessMessage(`Saved ${selectedAsset.name} (${selectedGrade}) to your Vault!`);
    setTimeout(() => setSaveSuccessMessage(null), 3500);
  };

  const getCurrentValuation = () => {
    switch (selectedGrade) {
      case 'Raw': return selectedAsset.gradePrices.raw;
      case 'PSA 8': return selectedAsset.gradePrices.psa8;
      case 'PSA 9': return selectedAsset.gradePrices.psa9;
      case 'PSA 10': return selectedAsset.gradePrices.psa10;
      case 'BGS 9.5': return selectedAsset.gradePrices.bgs9_5 || selectedAsset.gradePrices.psa10;
      default: return selectedAsset.currentMarketPrice;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header section */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          <Scan className="w-4 h-4" />
          <span>Optical Inspection Studio</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white font-display mt-1">
          Physical Card & Coin Scanner
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Simulate high-resolution computerized vision inspection. Select a grail preset below or upload a high-res front photo to inspect centering, edge silvering, and live auction comps.
        </p>
      </div>

      {/* Preset Item Selector Pill Bar */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          Select Specimen to Inspect:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {PHYSICAL_ASSETS.map((asset) => {
            const isSelected = selectedAsset.id === asset.id;
            return (
              <button
                key={asset.id}
                onClick={() => handleStartScan(asset)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono-numbers text-cyan-400 truncate">
                  {asset.category.toUpperCase()}
                </div>
                <div className="text-xs font-bold truncate mt-0.5">{asset.name.split(' ').slice(0, 3).join(' ')}</div>
                <div className="text-[11px] font-mono-numbers text-slate-300 mt-1">
                  {formatCurrency(asset.gradePrices.psa10)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scanner Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Scanner Stage (7 cols) */}
        <div className="lg:col-span-7 bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          
          {/* Subtle Stage Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

          {/* Scanner Controls Toolbar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-mono-numbers text-cyan-400">STATUS:</span>
              <span>{isScanning ? 'DIAGNOSTIC SWEEP RUNNING...' : 'OPTICAL LOCK ENGAGED'}</span>
            </div>
            
            <button
              onClick={() => handleStartScan(selectedAsset)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rescan Specimen</span>
            </button>
          </div>

          {/* Card Inspection Viewport */}
          <div className="relative aspect-[4/3] rounded-2xl bg-[#07080d] border border-slate-800 flex items-center justify-center overflow-hidden">
            
            {/* Holographic grid background */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'radial-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Specimen Visual Representation */}
            <div className="relative w-56 sm:w-64 aspect-[3/4] rounded-2xl p-4 bg-gradient-to-b from-slate-900 to-[#121626] border-2 border-cyan-500/30 shadow-2xl flex flex-col justify-between overflow-hidden group">
              
              {/* Foil Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent pointer-events-none" />

              {/* Top slab label */}
              <div className="p-2 rounded-lg bg-black/80 border border-slate-700 text-[10px] space-y-0.5">
                <div className="flex justify-between font-mono-numbers text-slate-400">
                  <span>{selectedAsset.specs.authCode || 'CERT #48920199'}</span>
                  <span className="text-cyan-400">{selectedGrade}</span>
                </div>
                <div className="font-bold text-white truncate">{selectedAsset.name}</div>
              </div>

              {/* Center Artwork / Coin Shield */}
              <div className="my-auto py-6 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-slate-800 via-cyan-950 to-slate-900 border border-cyan-500/40 flex items-center justify-center text-3xl shadow-inner mb-2">
                  {selectedAsset.category === 'pokemon' ? '⚡' : selectedAsset.category === 'coins' ? '🪙' : selectedAsset.category === 'currency' ? '💵' : '🏀'}
                </div>
                <div className="text-xs font-bold text-slate-200 px-2 line-clamp-1">
                  {selectedAsset.subtitle}
                </div>
                <div className="text-[10px] text-slate-400 font-mono-numbers mt-0.5">
                  Year {selectedAsset.year} · {selectedAsset.rarity}
                </div>
              </div>

              {/* Bottom security strip */}
              <div className="flex items-center justify-between text-[9px] font-mono-numbers text-slate-500 pt-2 border-t border-slate-800">
                <span>SECURITY HOLOGRAM</span>
                <span className="text-emerald-400">GENUINE</span>
              </div>

              {/* Laser Line Scanning Effect when active */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-scan-laser pointer-events-none" />
              )}
            </div>

            {/* Bounding Box HUD Overlay */}
            <div className="absolute inset-8 pointer-events-none border border-cyan-500/20 rounded-2xl flex flex-col justify-between p-3">
              <div className="flex justify-between text-[10px] font-mono-numbers text-cyan-400">
                <span>FRONT CENTERING: {selectedAsset.specs.centering.split(',')[0]}</span>
                <span>ALIGNMENT: 99.4%</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono-numbers text-slate-400">
                <span>SURFACE: CLEAN REFLECTANCE</span>
                <span>SUBGRADE: 9.8</span>
              </div>
            </div>

            {/* Scanning Progress Bar Overlay */}
            {isScanning && (
              <div className="absolute bottom-4 inset-x-8 bg-black/90 border border-slate-700 rounded-xl p-3 backdrop-blur-md">
                <div className="flex justify-between text-xs text-cyan-300 font-mono-numbers mb-1.5">
                  <span>ANALYZING MICROSCOPIC SURFACE TEXTURE...</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Subgrade Inspection Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Centering</div>
              <div className="text-white font-bold font-mono-numbers mt-0.5">50/50 Front</div>
              <div className="text-[10px] text-emerald-400 mt-1">Subgrade 10.0</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Surface Texture</div>
              <div className="text-white font-bold font-mono-numbers mt-0.5">Zero Scratches</div>
              <div className="text-[10px] text-emerald-400 mt-1">Subgrade 9.5</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Edges & Foil</div>
              <div className="text-white font-bold font-mono-numbers mt-0.5">No Silvering</div>
              <div className="text-[10px] text-emerald-400 mt-1">Subgrade 9.5</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Corners</div>
              <div className="text-white font-bold font-mono-numbers mt-0.5">Sharp 90° Cut</div>
              <div className="text-[10px] text-emerald-400 mt-1">Subgrade 10.0</div>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Live Market Valuation & Vault Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {selectedAsset.category} Grail Index
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleSubscription(selectedAsset.id, selectedAsset.name, 'physical')}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isSubscribed(selectedAsset.id)
                        ? 'bg-amber-950/80 border-amber-500/70 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-amber-400'
                    }`}
                    title={isSubscribed(selectedAsset.id) ? 'Subscribed to price updates (Click to unsubscribe)' : 'Subscribe to price alerts'}
                    aria-label="Subscribe to item alerts"
                  >
                    <Bell className={`w-4 h-4 ${isSubscribed(selectedAsset.id) ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => toggleWatchlist(selectedAsset.id, selectedAsset.name)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isWatched(selectedAsset.id)
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-400'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    aria-label="Track item"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-display mt-1">
                {selectedAsset.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {selectedAsset.description}
              </p>
            </div>

            {/* Interactive Grade Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Evaluate By Target Grade:
              </label>
              <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-semibold">
                {(['Raw', 'PSA 8', 'PSA 9', 'PSA 10', 'BGS 9.5'] as const).map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      selectedGrade === grade
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Valuation Big Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-[#101424] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Verified Market Value ({selectedGrade})</span>
                <span className="text-emerald-400 font-mono-numbers font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{selectedAsset.change24h}% (24h)
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white font-display font-mono-numbers tracking-tight">
                {formatCurrency(getCurrentValuation())}
              </div>

              <div className="text-xs text-slate-400 pt-1 border-t border-slate-800/80 flex justify-between">
                <span>Population Rarity:</span>
                <span className="text-slate-300 font-mono-numbers">{selectedAsset.popReport}</span>
              </div>
            </div>

            {/* Save Message Alert */}
            {saveSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleSaveToVault}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to My Vault Collection</span>
              </button>

              <button
                onClick={() => toggleWatchlist(selectedAsset.id, selectedAsset.name)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-cyan-400" />
                <span>{isWatched(selectedAsset.id) ? 'Item Tracked in Alerts' : 'Arm Price Alert for This Specimen'}</span>
              </button>
            </div>

            {/* Recent Sales Comps */}
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Recent Verified Sales Comps:
              </div>
              <div className="space-y-2">
                {selectedAsset.recentComps.map((comp, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="text-slate-200 font-medium">{comp.grade}</div>
                      <div className="text-[11px] text-slate-500">{comp.platform} · {comp.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white font-mono-numbers">{formatCurrency(comp.price)}</div>
                      <div className="text-[10px] text-emerald-400">Verified Sale</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
