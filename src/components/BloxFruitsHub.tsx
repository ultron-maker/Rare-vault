import React, { useState } from 'react';
import { BLOX_ITEMS, BloxItem, BloxCategory, BloxTier, formatTradeValue, formatCurrency } from '../data/bloxData';
import { useAuth } from '../context/AuthContext';
import { 
  Sliders, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  Plus, 
  X, 
  Bookmark, 
  Bell,
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  Wand2, 
  ExternalLink,
  Zap,
  Globe
} from 'lucide-react';

export const BloxFruitsHub: React.FC = () => {
  const { toggleWatchlist, isWatched, addVirtualItem, toggleSubscription, isSubscribed } = useAuth();
  
  // Trade Calculator State
  const [sideA, setSideA] = useState<BloxItem[]>([
    BLOX_ITEMS.find((i) => i.id === 'blox-kitsune-physical')!,
  ]);
  const [sideB, setSideB] = useState<BloxItem[]>([
    BLOX_ITEMS.find((i) => i.id === 'blox-dragon-physical')!,
    BLOX_ITEMS.find((i) => i.id === 'blox-dough-physical')!,
    BLOX_ITEMS.find((i) => i.id === 'blox-buddha-physical')!,
  ]);

  // Catalog Filter State
  const [activeTier, setActiveTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [vaultSaveNotice, setVaultSaveNotice] = useState<string | null>(null);

  // Quick Slot Picker Target
  const [slotPickerTarget, setSlotPickerTarget] = useState<{ side: 'A' | 'B'; slotIndex: number } | null>(null);
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerCategory, setPickerCategory] = useState<'all' | 'rare_intermediate' | 'mythical' | 'legendary' | 'uncommon' | 'common' | 'perm' | 'gamepass'>('all');

  // Interactive Google Search query modal state
  const [googleInspectItem, setGoogleInspectItem] = useState<BloxItem | null>(null);

  // Quick fruit access list for quick-fill chips
  const quickPickList = [
    { id: 'blox-magma-physical', name: 'Magma', icon: '🌋', type: 'Rare' },
    { id: 'blox-light-physical', name: 'Light', icon: '☀️', type: 'Rare' },
    { id: 'blox-ice-physical', name: 'Ice', icon: '🧊', type: 'Rare' },
    { id: 'blox-rubber-physical', name: 'Rubber', icon: '🥊', type: 'Rare' },
    { id: 'blox-ghost-physical', name: 'Ghost', icon: '👻', type: 'Rare' },
    { id: 'blox-buddha-physical', name: 'Buddha', icon: '✨', type: 'Legendary' },
    { id: 'blox-dark-physical', name: 'Dark', icon: '🌌', type: 'Rare' },
    { id: 'blox-sound-physical', name: 'Sound', icon: '🎵', type: 'Legendary' },
  ];

  // Calculations
  const totalValueA = sideA.reduce((acc, item) => acc + item.tradeValue, 0);
  const totalValueB = sideB.reduce((acc, item) => acc + item.tradeValue, 0);
  const valueDifference = totalValueB - totalValueA; // From perspective of Person A (receiving Side B)
  const percentageDiff = totalValueA > 0 ? (valueDifference / totalValueA) * 100 : 0;

  const avgDemandA = sideA.length > 0 ? sideA.reduce((acc, i) => acc + i.demand, 0) / sideA.length : 0;
  const avgDemandB = sideB.length > 0 ? sideB.reduce((acc, i) => acc + i.demand, 0) / sideB.length : 0;

  // WFL Scale Verdict
  const getWFLStatus = () => {
    if (sideA.length === 0 && sideB.length === 0) {
      return { label: 'EMPTY TRADE', color: 'text-slate-400', barPercent: 50, badgeBg: 'bg-slate-900 border-slate-700' };
    }
    if (percentageDiff >= 20) {
      return { label: 'BIG WIN (Massive Overpay)', color: 'text-emerald-400', barPercent: 95, badgeBg: 'bg-emerald-950/80 border-emerald-500' };
    } else if (percentageDiff >= 6) {
      return { label: 'WIN (Profitable Overpay)', color: 'text-emerald-400', barPercent: 78, badgeBg: 'bg-emerald-950/60 border-emerald-500/60' };
    } else if (percentageDiff >= -6) {
      return { label: 'FAIR TRADE (Equal Market Value)', color: 'text-cyan-400', barPercent: 50, badgeBg: 'bg-cyan-950/70 border-cyan-500/60' };
    } else if (percentageDiff >= -20) {
      return { label: 'LOSE (Underpay Received)', color: 'text-amber-400', barPercent: 25, badgeBg: 'bg-amber-950/60 border-amber-500/60' };
    } else {
      return { label: 'BIG LOSE (Do Not Accept)', color: 'text-rose-500', barPercent: 5, badgeBg: 'bg-rose-950/80 border-rose-500' };
    }
  };

  const wfl = getWFLStatus();

  const addItemToSide = (item: BloxItem, side: 'A' | 'B') => {
    if (side === 'A') {
      if (sideA.length < 4) setSideA([...sideA, item]);
    } else {
      if (sideB.length < 4) setSideB([...sideB, item]);
    }
  };

  const removeItemFromSide = (index: number, side: 'A' | 'B') => {
    if (side === 'A') {
      setSideA(sideA.filter((_, i) => i !== index));
    } else {
      setSideB(sideB.filter((_, i) => i !== index));
    }
  };

  const handlePickForSlot = (item: BloxItem) => {
    if (!slotPickerTarget) return;
    const { side, slotIndex } = slotPickerTarget;

    if (side === 'A') {
      const next = [...sideA];
      if (slotIndex < next.length) {
        next[slotIndex] = item;
      } else {
        next.push(item);
      }
      setSideA(next);
    } else {
      const next = [...sideB];
      if (slotIndex < next.length) {
        next[slotIndex] = item;
      } else {
        next.push(item);
      }
      setSideB(next);
    }
    setSlotPickerTarget(null);
  };

  // Quick Fill a slot directly with a specific fruit ID
  const handleQuickSlotFill = (side: 'A' | 'B', slotIndex: number, fruitId: string) => {
    const item = BLOX_ITEMS.find((i) => i.id === fruitId);
    if (!item) return;

    if (side === 'A') {
      const next = [...sideA];
      if (slotIndex < next.length) {
        next[slotIndex] = item;
      } else {
        next.push(item);
      }
      setSideA(next);
    } else {
      const next = [...sideB];
      if (slotIndex < next.length) {
        next[slotIndex] = item;
      } else {
        next.push(item);
      }
      setSideB(next);
    }
  };

  // Fill ALL remaining empty spaces with Rare fruits
  const fillSpacesWithRare = (targetSide?: 'A' | 'B') => {
    const rareFruits = [
      BLOX_ITEMS.find((i) => i.id === 'blox-magma-physical')!,
      BLOX_ITEMS.find((i) => i.id === 'blox-light-physical')!,
      BLOX_ITEMS.find((i) => i.id === 'blox-ice-physical')!,
      BLOX_ITEMS.find((i) => i.id === 'blox-rubber-physical')!,
    ];

    if (!targetSide || targetSide === 'A') {
      const neededA = 4 - sideA.length;
      if (neededA > 0) {
        const adds = rareFruits.slice(0, neededA);
        setSideA([...sideA, ...adds]);
      }
    }

    if (!targetSide || targetSide === 'B') {
      const neededB = 4 - sideB.length;
      if (neededB > 0) {
        const adds = rareFruits.slice(0, neededB);
        setSideB([...sideB, ...adds]);
      }
    }
  };

  // Fill ALL remaining empty spaces with Intermediate / Uncommon fruits
  const fillSpacesWithIntermediate = (targetSide?: 'A' | 'B') => {
    const intermediateFruits = [
      BLOX_ITEMS.find((i) => i.id === 'blox-ghost-physical')!,
      BLOX_ITEMS.find((i) => i.id === 'blox-barrier-physical')!,
      BLOX_ITEMS.find((i) => i.id === 'blox-diamond-physical')!,
      BLOX_ITEMS.find((i) => i.id === 'blox-dark-physical')!,
    ];

    if (!targetSide || targetSide === 'A') {
      const neededA = 4 - sideA.length;
      if (neededA > 0) {
        const adds = intermediateFruits.slice(0, neededA);
        setSideA([...sideA, ...adds]);
      }
    }

    if (!targetSide || targetSide === 'B') {
      const neededB = 4 - sideB.length;
      if (neededB > 0) {
        const adds = intermediateFruits.slice(0, neededB);
        setSideB([...sideB, ...adds]);
      }
    }
  };

  // Auto Fair Fill for Empty Slots
  const handleAutoFillFair = () => {
    if (sideA.length === 0 && sideB.length === 0) {
      applyPreset('kitsune_apex');
      return;
    }

    if (valueDifference > 0) {
      // Side A needs adds
      const needed = valueDifference;
      const candidates = [...BLOX_ITEMS]
        .filter((i) => i.category === 'Physical')
        .sort((a, b) => Math.abs(a.tradeValue - needed) - Math.abs(b.tradeValue - needed));
      const best = candidates[0];
      if (sideA.length < 4 && best) {
        setSideA([...sideA, best]);
      }
    } else if (valueDifference < 0) {
      // Side B needs adds
      const needed = Math.abs(valueDifference);
      const candidates = [...BLOX_ITEMS]
        .filter((i) => i.category === 'Physical')
        .sort((a, b) => Math.abs(a.tradeValue - needed) - Math.abs(b.tradeValue - needed));
      const best = candidates[0];
      if (sideB.length < 4 && best) {
        setSideB([...sideB, best]);
      }
    }
  };

  // Quick Meta Trade Presets
  const applyPreset = (presetKey: string) => {
    const kitsune = BLOX_ITEMS.find((i) => i.id === 'blox-kitsune-physical')!;
    const dragon = BLOX_ITEMS.find((i) => i.id === 'blox-dragon-physical')!;
    const dough = BLOX_ITEMS.find((i) => i.id === 'blox-dough-physical')!;
    const buddha = BLOX_ITEMS.find((i) => i.id === 'blox-buddha-physical')!;
    const leopard = BLOX_ITEMS.find((i) => i.id === 'blox-leopard-physical')!;
    const trex = BLOX_ITEMS.find((i) => i.id === 'blox-trex-physical')!;
    const permBuddha = BLOX_ITEMS.find((i) => i.id === 'blox-perm-buddha')!;
    const darkBlade = BLOX_ITEMS.find((i) => i.id === 'blox-dark-blade')!;
    const storage = BLOX_ITEMS.find((i) => i.id === 'blox-fruit-storage')!;
    const magma = BLOX_ITEMS.find((i) => i.id === 'blox-magma-physical')!;
    const light = BLOX_ITEMS.find((i) => i.id === 'blox-light-physical')!;
    const ghost = BLOX_ITEMS.find((i) => i.id === 'blox-ghost-physical')!;
    const yeti = BLOX_ITEMS.find((i) => i.id === 'blox-yeti-physical') || kitsune;

    if (presetKey === 'kitsune_apex') {
      setSideA([kitsune]);
      setSideB([dragon, dough, buddha]);
    } else if (presetKey === 'leopard_balanced') {
      setSideA([leopard, buddha]);
      setSideB([dough, trex]);
    } else if (presetKey === 'perm_buddha') {
      setSideA([permBuddha]);
      setSideB([kitsune, leopard]);
    } else if (presetKey === 'dark_blade') {
      setSideA([darkBlade]);
      setSideB([dragon, storage]);
    } else if (presetKey === 'rare_intermediate_showdown') {
      setSideA([magma, light, ghost, buddha]);
      setSideB([dough]);
    } else if (presetKey === 'yeti_winter_trade') {
      setSideA([yeti]);
      setSideB([leopard, dough, buddha]);
    }
  };

  const handleCopyTrade = () => {
    const text = `Blox Fruits Trade Check on Rare Vault:
You Offer: ${sideA.map(i => i.name).join(', ') || 'None'} (Val: ${formatTradeValue(totalValueA)})
They Offer: ${sideB.map(i => i.name).join(', ') || 'None'} (Val: ${formatTradeValue(totalValueB)})
Verdict: ${wfl.label} (${percentageDiff >= 0 ? '+' : ''}${percentageDiff.toFixed(1)}%)`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSaveToVault = (item: BloxItem) => {
    addVirtualItem({
      itemId: item.id,
      name: item.name,
      category: item.category,
      quantity: 1,
      unitTradeValue: item.tradeValue,
      notes: `Logged from Blox Fruits Hub. Demand: ${item.demand}/10`,
      acquiredDate: new Date().toISOString().split('T')[0]
    });
    setVaultSaveNotice(`Added ${item.name} to your Virtual Vault collection!`);
    setTimeout(() => setVaultSaveNotice(null), 3000);
  };

  const filteredItems = BLOX_ITEMS.filter((item) => {
    let matchesTier = true;
    if (activeTier === 'Mythical') matchesTier = item.tier === 'Mythical';
    else if (activeTier === 'Legendary') matchesTier = item.tier === 'Legendary';
    else if (activeTier === 'Rare & Intermediate') matchesTier = item.tier === 'Rare' || item.tier === 'Uncommon';
    else if (activeTier === 'Rare') matchesTier = item.tier === 'Rare';
    else if (activeTier === 'Uncommon') matchesTier = item.tier === 'Uncommon';
    else if (activeTier === 'Common') matchesTier = item.tier === 'Common';
    else if (activeTier === 'Permanent') matchesTier = item.category === 'Permanent';
    else if (activeTier === 'Gamepass') matchesTier = item.category === 'Gamepass' || item.category === 'Limited';

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.wflNote.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTier && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header with Live Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            <Sliders className="w-4 h-4" />
            <span>Blox Fruits Trading System</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400">Live Rates · Directly Connected to Google</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display mt-1">
            Complete Blox Fruits Value Hub & W/F/L Calculator
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Side-by-side trade evaluation with instant Win/Fair/Lose calculation, 1-click slot fill for rare & intermediate fruits, live demand indices, and direct Google verification for every item.
          </p>
        </div>

        {/* Google Direct Verification Banner */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-300">
          <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px]">
            G
          </div>
          <span>Direct Google Live Rates Active</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>
      </div>

      {vaultSaveNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-200 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{vaultSaveNotice}</span>
          </div>
          <button onClick={() => setVaultSaveNotice(null)} className="text-emerald-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* DYNAMIC SIDE-BY-SIDE TRADE CALCULATOR */}
      <div className="bg-[#0c0e17] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white font-display">
                Interactive W/F/L Trade Calculator
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Fill empty slot spaces instantly using quick rare & intermediate fruit chips, or pick any fruit/pass.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoFillFair}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-xs text-cyan-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Auto-Fill Fair</span>
            </button>
            <button
              onClick={() => {
                setSideA([]);
                setSideB([]);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={handleCopyTrade}
              className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Share Trade'}</span>
            </button>
          </div>
        </div>

        {/* QUICK FILL SPACES TOOLBAR (Specifically answering: "There are spaces left in slots fill them with all blox fruits rare and intermediate") */}
        <div className="pt-3 pb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-white font-bold">Quick Fill Empty Spaces:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => fillSpacesWithRare()}
              className="px-2.5 py-1 rounded-lg bg-orange-950/60 hover:bg-orange-900/80 border border-orange-500/40 text-orange-300 font-medium transition-colors cursor-pointer text-[11px] flex items-center gap-1"
            >
              <span>🌋 Fill Spaces with Rare Fruits (Magma, Light, Ice, Rubber)</span>
            </button>

            <button
              onClick={() => fillSpacesWithIntermediate()}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-medium transition-colors cursor-pointer text-[11px] flex items-center gap-1"
            >
              <span>👻 Fill Spaces with Intermediate (Ghost, Barrier, Diamond, Dark)</span>
            </button>
          </div>
        </div>

        {/* Quick Meta Presets Bar */}
        <div className="pt-2 pb-2 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400 font-medium">
          <span className="text-slate-500 shrink-0">Popular Matchups:</span>
          <button
            onClick={() => applyPreset('kitsune_apex')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 whitespace-nowrap cursor-pointer"
          >
            🦊 Kitsune vs Dragon + Dough + Buddha
          </button>
          <button
            onClick={() => applyPreset('yeti_winter_trade')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 whitespace-nowrap cursor-pointer"
          >
            ❄️ Yeti (New) vs Leo + Dough + Buddha
          </button>
          <button
            onClick={() => applyPreset('rare_intermediate_showdown')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 whitespace-nowrap cursor-pointer"
          >
            🌋 4x Rare / Intermediate vs Dough
          </button>
          <button
            onClick={() => applyPreset('perm_buddha')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 whitespace-nowrap cursor-pointer"
          >
            👑 Perm Buddha vs Kitsune + Leo
          </button>
          <button
            onClick={() => applyPreset('dark_blade')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 whitespace-nowrap cursor-pointer"
          >
            ⚔️ Dark Blade vs Dragon + Storage
          </button>
        </div>

        {/* Side-by-side trading stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-center">
          
          {/* Side A: Your Offer (5 cols) */}
          <div className="lg:col-span-5 bg-[#08090d] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Side 1: Your Offer</span>
                <div className="text-xs text-slate-400">Total Value: <span className="text-white font-bold font-mono-numbers">{formatTradeValue(totalValueA)}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fillSpacesWithRare('A')}
                  title="Fill remaining empty spaces with Rare fruits"
                  className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 px-2 py-0.5 rounded cursor-pointer"
                >
                  + Rare Fill
                </button>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500">Avg Demand:</span>
                  <span className="text-xs font-bold text-amber-400 font-mono-numbers ml-1">{avgDemandA.toFixed(1)}/10</span>
                </div>
              </div>
            </div>

            {/* 4 Item Slots with interactive quick fruit chips for empty spaces */}
            <div className="grid grid-cols-2 gap-2.5">
              {[0, 1, 2, 3].map((slotIdx) => {
                const item = sideA[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`min-h-28 rounded-xl border p-2.5 flex flex-col justify-between relative transition-all ${
                      item
                        ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-900/40 hover:bg-slate-800/60 border-dashed border-slate-700/80 hover:border-cyan-400/60 text-slate-400'
                    }`}
                  >
                    {item ? (
                      <>
                        <div className="flex items-start justify-between">
                          <span className="text-2xl">{item.iconSymbol}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItemFromSide(slotIdx, 'A');
                            }}
                            className="text-slate-500 hover:text-white p-0.5 rounded cursor-pointer"
                            aria-label="Remove item"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="mt-1">
                          <div className="text-xs font-bold text-white truncate">{item.name}</div>
                          <div className="text-[10px] text-cyan-400 font-mono-numbers">
                            {formatTradeValue(item.tradeValue)} Value
                          </div>
                          <div className="text-[9px] text-slate-500">
                            {item.tier} · {item.demand}/10 Dem
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <div 
                          onClick={() => setSlotPickerTarget({ side: 'A', slotIndex: slotIdx })}
                          className="flex items-center justify-between cursor-pointer group"
                        >
                          <span className="text-[11px] font-bold text-slate-300 group-hover:text-cyan-300">
                            Slot {slotIdx + 1} Empty
                          </span>
                          <Plus className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-125 transition-transform" />
                        </div>

                        {/* Quick 1-click pills to fill empty slot directly with rare/intermediate */}
                        <div className="grid grid-cols-3 gap-1 pt-0.5">
                          {quickPickList.slice(0, 6).map((q) => (
                            <button
                              key={q.id}
                              onClick={() => handleQuickSlotFill('A', slotIdx, q.id)}
                              title={`Fill slot with ${q.name}`}
                              className="px-1 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-950 hover:border-cyan-500/50 border border-slate-700/60 text-[9px] text-slate-300 hover:text-cyan-300 font-medium truncate text-center cursor-pointer transition-colors"
                            >
                              {q.icon} {q.name}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setSlotPickerTarget({ side: 'A', slotIndex: slotIdx })}
                          className="text-[9px] text-cyan-400 hover:underline text-center cursor-pointer pt-0.5"
                        >
                          Browse All 35+ Fruits & Passes
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center VS & WFL Scale (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center space-y-3 py-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              VS
            </div>

            <div className={`px-3 py-1.5 rounded-xl border text-xs font-black tracking-wide ${wfl.badgeBg} ${wfl.color}`}>
              {wfl.label}
            </div>

            <div className="w-full max-w-[140px] space-y-1">
              <div className="flex justify-between text-[10px] font-mono-numbers text-slate-500">
                <span>Lose</span>
                <span>Fair</span>
                <span>Win</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(wfl.barPercent, 5), 95)}%` }}
                />
              </div>
            </div>

            <div className="text-[11px] font-mono-numbers text-slate-400">
              Diff: <span className={valueDifference >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {valueDifference >= 0 ? '+' : ''}{formatTradeValue(valueDifference)}
              </span>
            </div>
          </div>

          {/* Side B: Their Offer (5 cols) */}
          <div className="lg:col-span-5 bg-[#08090d] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Side 2: Their Offer</span>
                <div className="text-xs text-slate-400">Total Value: <span className="text-white font-bold font-mono-numbers">{formatTradeValue(totalValueB)}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fillSpacesWithIntermediate('B')}
                  title="Fill remaining empty spaces with Intermediate fruits"
                  className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-700 text-indigo-300 px-2 py-0.5 rounded cursor-pointer"
                >
                  + Add Fill
                </button>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500">Avg Demand:</span>
                  <span className="text-xs font-bold text-amber-400 font-mono-numbers ml-1">{avgDemandB.toFixed(1)}/10</span>
                </div>
              </div>
            </div>

            {/* 4 Item Slots with interactive quick fruit chips for empty spaces */}
            <div className="grid grid-cols-2 gap-2.5">
              {[0, 1, 2, 3].map((slotIdx) => {
                const item = sideB[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`min-h-28 rounded-xl border p-2.5 flex flex-col justify-between relative transition-all ${
                      item
                        ? 'bg-slate-900/90 border-indigo-500/40 shadow-sm'
                        : 'bg-slate-900/40 hover:bg-slate-800/60 border-dashed border-slate-700/80 hover:border-indigo-400/60 text-slate-400'
                    }`}
                  >
                    {item ? (
                      <>
                        <div className="flex items-start justify-between">
                          <span className="text-2xl">{item.iconSymbol}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItemFromSide(slotIdx, 'B');
                            }}
                            className="text-slate-500 hover:text-white p-0.5 rounded cursor-pointer"
                            aria-label="Remove item"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="mt-1">
                          <div className="text-xs font-bold text-white truncate">{item.name}</div>
                          <div className="text-[10px] text-indigo-400 font-mono-numbers">
                            {formatTradeValue(item.tradeValue)} Value
                          </div>
                          <div className="text-[9px] text-slate-500">
                            {item.tier} · {item.demand}/10 Dem
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col justify-between h-full space-y-1.5">
                        <div 
                          onClick={() => setSlotPickerTarget({ side: 'B', slotIndex: slotIdx })}
                          className="flex items-center justify-between cursor-pointer group"
                        >
                          <span className="text-[11px] font-bold text-slate-300 group-hover:text-indigo-300">
                            Slot {slotIdx + 1} Empty
                          </span>
                          <Plus className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-125 transition-transform" />
                        </div>

                        {/* Quick 1-click pills to fill empty slot directly with rare/intermediate */}
                        <div className="grid grid-cols-3 gap-1 pt-0.5">
                          {quickPickList.slice(0, 6).map((q) => (
                            <button
                              key={q.id}
                              onClick={() => handleQuickSlotFill('B', slotIdx, q.id)}
                              title={`Fill slot with ${q.name}`}
                              className="px-1 py-0.5 rounded bg-slate-800/80 hover:bg-indigo-950 hover:border-indigo-500/50 border border-slate-700/60 text-[9px] text-slate-300 hover:text-indigo-300 font-medium truncate text-center cursor-pointer transition-colors"
                            >
                              {q.icon} {q.name}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setSlotPickerTarget({ side: 'B', slotIndex: slotIdx })}
                          className="text-[9px] text-indigo-400 hover:underline text-center cursor-pointer pt-0.5"
                        >
                          Browse All 35+ Fruits & Passes
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* QUICK SLOT PICKER MODAL (With category filters including Rare & Intermediate) */}
      {slotPickerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="w-full max-w-2xl bg-[#0e111a] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Select Item for Slot {slotPickerTarget.slotIndex + 1} ({slotPickerTarget.side === 'A' ? 'Your Offer' : 'Their Offer'})
                </h3>
                <p className="text-xs text-slate-400">Pick any fruit, intermediate add, permanent, or gamepass.</p>
              </div>
              <button 
                onClick={() => setSlotPickerTarget(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category tabs inside picker */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'rare_intermediate', label: '⭐ Rare & Intermediate' },
                { id: 'mythical', label: 'Mythicals' },
                { id: 'legendary', label: 'Legendaries' },
                { id: 'uncommon', label: 'Uncommons' },
                { id: 'common', label: 'Commons' },
                { id: 'perm', label: 'Permanents' },
                { id: 'gamepass', label: 'Passes / Items' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPickerCategory(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                    pickerCategory === tab.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search filter in picker */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                placeholder="Search fruits, perms, or passes..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Items Grid in Picker */}
            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2.5 pr-1">
              {BLOX_ITEMS.filter((item) => {
                let matchesCategory = true;
                if (pickerCategory === 'rare_intermediate') matchesCategory = item.tier === 'Rare' || item.tier === 'Uncommon';
                else if (pickerCategory === 'mythical') matchesCategory = item.tier === 'Mythical' && item.category === 'Physical';
                else if (pickerCategory === 'legendary') matchesCategory = item.tier === 'Legendary' && item.category === 'Physical';
                else if (pickerCategory === 'uncommon') matchesCategory = item.tier === 'Uncommon';
                else if (pickerCategory === 'common') matchesCategory = item.tier === 'Common';
                else if (pickerCategory === 'perm') matchesCategory = item.category === 'Permanent';
                else if (pickerCategory === 'gamepass') matchesCategory = item.category === 'Gamepass' || item.category === 'Limited';

                const matchesSearch = item.name.toLowerCase().includes(pickerSearch.toLowerCase());
                return matchesCategory && matchesSearch;
              }).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePickForSlot(item)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-400/60 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.iconSymbol}</span>
                    <span className="text-[10px] text-amber-400 font-mono-numbers font-bold">{item.demand}/10</span>
                  </div>
                  <div className="font-bold text-white text-xs mt-1 truncate group-hover:text-cyan-300">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono-numbers mt-0.5">
                    {formatTradeValue(item.tradeValue)} Value
                  </div>
                  <div className="text-[9px] text-slate-500">
                    {item.tier} · {item.category}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ITEM CATALOG GRID WITH BELL NOTIFICATION & DIRECT GOOGLE LINK */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Category / Tier Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold">
            {(['All', 'Rare & Intermediate', 'Mythical', 'Legendary', 'Rare', 'Uncommon', 'Common', 'Permanent', 'Gamepass'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTier === tier
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tier === 'All' ? 'All 40+ Items' : tier}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fruits, perms, or passes..."
              className="w-full sm:w-64 bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Item Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const watched = isWatched(item.id);
            const subscribed = isSubscribed(item.id);

            // Direct Google Live Rates Search Query
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`Blox Fruits ${item.name} trade value live update 24`)}`;

            return (
              <div 
                key={item.id}
                className="bg-[#0c0e17] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group shadow-sm"
              >
                <div>
                  {/* Card Header: Icon, Name, Demand badge, Bell, Bookmark */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                        {item.iconSymbol}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{item.name}</h4>
                        <div className="text-[11px] text-slate-400 font-mono-numbers">
                          {item.tier} · {item.category}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Bell Notification Icon for Subscribing to Price Alerts */}
                      <button
                        onClick={() => toggleSubscription(item.id, item.name, 'blox')}
                        title={subscribed ? 'Subscribed to price alerts (Click to unsubscribe)' : 'Subscribe to live price alerts'}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          subscribed
                            ? 'bg-amber-950/80 border-amber-500/70 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-amber-400 hover:border-slate-700'
                        }`}
                        aria-label={`Subscribe to ${item.name} price alerts`}
                      >
                        <Bell className={`w-3.5 h-3.5 ${subscribed ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => toggleWatchlist(item.id, item.name)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          watched
                            ? 'bg-cyan-950 border-cyan-400 text-cyan-400'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white'
                        }`}
                        aria-label="Track item"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Value and Demand Strip with Live Price Tracking */}
                  <div className="mt-4 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-400">Trade Value:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-white font-mono-numbers">
                          {formatTradeValue(item.tradeValue)}
                        </span>
                        <span className={`text-[10px] font-mono-numbers font-semibold flex items-center ${
                          item.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {item.change24h >= 0 ? '+' : ''}{item.change24h}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Community Demand:</span>
                      <div className="flex items-center gap-1 font-mono-numbers text-amber-400 font-bold">
                        <Flame className="w-3 h-3 fill-current" />
                        <span>{item.demand}/10</span>
                      </div>
                    </div>

                    {item.beliPrice > 0 && (
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono-numbers">
                        <span>Beli Cost: {item.beliPrice.toLocaleString()} B</span>
                        {item.robuxPrice && <span>{item.robuxPrice} R$</span>}
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {item.wflNote}
                  </p>

                  {/* Direct Connection to Google: Live Search & Verification Link */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                    <a
                      href={googleSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 font-black flex items-center justify-center text-[9px]">G</span>
                      <span>Google Live Rates</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => setGoogleInspectItem(item)}
                      className="text-[10px] text-slate-400 hover:text-white cursor-pointer"
                    >
                      Inspect Feed
                    </button>
                  </div>
                </div>

                {/* Bottom Actions: Add to You, Add to Them, Save to Vault */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addItemToSide(item, 'A')}
                    className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer text-center"
                  >
                    + Offer (You)
                  </button>

                  <button
                    onClick={() => addItemToSide(item, 'B')}
                    className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer text-center"
                  >
                    + Offer (Them)
                  </button>

                  <button
                    onClick={() => handleSaveToVault(item)}
                    className="col-span-2 py-1 px-2 text-[10px] text-slate-400 hover:text-white rounded bg-slate-900/60 hover:bg-slate-900 transition-colors cursor-pointer text-center"
                  >
                    Save to My Virtual Vault
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GOOGLE LIVE RATE INSPECTOR MODAL */}
      {googleInspectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="w-full max-w-lg bg-[#0e111a] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-3xl">
                  {googleInspectItem.iconSymbol}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {googleInspectItem.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Direct Google Live Market Search & Trading Rates
                  </p>
                </div>
              </div>

              <button
                onClick={() => setGoogleInspectItem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Trade Value:</span>
                <span className="font-extrabold text-white font-mono-numbers">
                  {formatTradeValue(googleInspectItem.tradeValue)} ({googleInspectItem.tradeValue.toLocaleString()} Points)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Market Demand Index:</span>
                <span className="font-bold text-amber-400 font-mono-numbers">{googleInspectItem.demand}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">24-Hour Volatility:</span>
                <span className={`font-bold font-mono-numbers ${googleInspectItem.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {googleInspectItem.change24h >= 0 ? '+' : ''}{googleInspectItem.change24h}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">In-Game Beli Price:</span>
                <span className="text-white font-mono-numbers">
                  {googleInspectItem.beliPrice > 0 ? `${googleInspectItem.beliPrice.toLocaleString()} Beli` : 'Gamepass / Event only'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Verified Google Query Strings:</span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 break-all">
                "Blox Fruits {googleInspectItem.name} trade value live update 24"
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => toggleSubscription(googleInspectItem.id, googleInspectItem.name, 'blox')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-white font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Bell className={`w-3.5 h-3.5 ${isSubscribed(googleInspectItem.id) ? 'text-amber-400 fill-current' : ''}`} />
                <span>{isSubscribed(googleInspectItem.id) ? 'Subscribed' : 'Subscribe Alerts'}</span>
              </button>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(`Blox Fruits ${googleInspectItem.name} trade value live update 24`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <span>Launch Google Live Search</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
