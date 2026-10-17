import React, { useState } from 'react';
import { useAuth, UserPhysicalItem, UserVirtualItem } from '../context/AuthContext';
import { PHYSICAL_ASSETS } from '../data/physicalData';
import { BLOX_ITEMS, formatTradeValue, formatCurrency } from '../data/bloxData';
import { ActiveTab } from './Navbar';
import { 
  User, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Sliders, 
  Bell, 
  Bookmark, 
  Sparkles, 
  Edit3, 
  Check, 
  X,
  Eye,
  DollarSign,
  ExternalLink,
  Flame,
  Database,
  Key,
  Copy,
  Terminal,
  Server
} from 'lucide-react';

interface UserProfileVaultProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const UserProfileVault: React.FC<UserProfileVaultProps> = ({ setActiveTab }) => {
  const { 
    user, 
    isAuthenticated, 
    openAuthModal, 
    updateProfile,
    physicalCollection, 
    removePhysicalItem, 
    addPhysicalItem,
    virtualCollection, 
    removeVirtualItem, 
    addVirtualItem,
    watchlist,
    toggleWatchlist,
    subscriptions,
    toggleSubscription,
    isSubscribed,
    notifications,
    alertThreshold,
    setAlertThreshold,
    totalPhysicalPortfolioValue,
    totalVirtualPortfolioValue
  } = useAuth();

  const [activeTab, setActiveSection] = useState<'physical' | 'virtual' | 'watchlist' | 'subscriptions' | 'firebase' | 'settings'>('physical');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editRoblox, setEditRoblox] = useState(user?.robloxUsername || '');
  const [editPsa, setEditPsa] = useState(user?.psaMemberNumber || '');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Add Item Modals
  const [isAddPhysModalOpen, setIsAddPhysModalOpen] = useState(false);
  const [newPhysAssetId, setNewPhysAssetId] = useState(PHYSICAL_ASSETS[0].id);
  const [newPhysGrade, setNewPhysGrade] = useState<'Raw' | 'PSA 8' | 'PSA 9' | 'PSA 10' | 'BGS 9.5'>('PSA 10');
  const [newPhysPurchasePrice, setNewPhysPurchasePrice] = useState('1000');
  const [newPhysCert, setNewPhysCert] = useState('');

  const [isAddVirtModalOpen, setIsAddVirtModalOpen] = useState(false);
  const [newVirtItemId, setNewVirtItemId] = useState(BLOX_ITEMS[0].id);
  const [newVirtQty, setNewVirtQty] = useState('1');

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center mx-auto text-2xl text-cyan-400">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-white font-display">
          Unlock Your Personal Collector Vault
        </h2>
        <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
          Log in or sign up to manage your physical cards and virtual Blox Fruits portfolio, track live values, and receive instant price notifications.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => openAuthModal('signup')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            Create Collector Account
          </button>
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  // Calculate physical total purchase cost & total gain
  const totalPhysicalCost = physicalCollection.reduce((acc, item) => acc + item.purchasePrice, 0);
  const totalPhysicalGain = totalPhysicalPortfolioValue - totalPhysicalCost;
  const totalPhysicalGainPct = totalPhysicalCost > 0 ? (totalPhysicalGain / totalPhysicalCost) * 100 : 0;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      bio: editBio,
      robloxUsername: editRoblox,
      psaMemberNumber: editPsa
    });
    setIsEditingProfile(false);
  };

  const handleCreatePhysical = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = PHYSICAL_ASSETS.find((a) => a.id === newPhysAssetId) || PHYSICAL_ASSETS[0];
    const estimatedVal = newPhysGrade === 'Raw' 
      ? asset.gradePrices.raw 
      : newPhysGrade === 'PSA 8' 
      ? asset.gradePrices.psa8 
      : newPhysGrade === 'PSA 9' 
      ? asset.gradePrices.psa9 
      : newPhysGrade === 'PSA 10' 
      ? asset.gradePrices.psa10 
      : asset.gradePrices.bgs9_5 || asset.gradePrices.psa10;

    addPhysicalItem({
      assetId: asset.id,
      name: asset.name,
      category: asset.category,
      grade: newPhysGrade,
      purchasePrice: parseFloat(newPhysPurchasePrice) || 0,
      currentEstimatedValue: estimatedVal,
      dateAcquired: new Date().toISOString().split('T')[0],
      certNumber: newPhysCert.trim() || undefined,
      notes: `Condition verified at ${newPhysGrade}`
    });

    setIsAddPhysModalOpen(false);
    setNewPhysCert('');
  };

  const handleCreateVirtual = (e: React.FormEvent) => {
    e.preventDefault();
    const item = BLOX_ITEMS.find((b) => b.id === newVirtItemId) || BLOX_ITEMS[0];
    const qty = parseInt(newVirtQty, 10) || 1;

    addVirtualItem({
      itemId: item.id,
      name: item.name,
      category: item.category,
      quantity: qty,
      unitTradeValue: item.tradeValue,
      notes: `Added from Blox Catalog at ${item.demand}/10 demand`,
      acquiredDate: new Date().toISOString().split('T')[0]
    });

    setIsAddVirtModalOpen(false);
    setNewVirtQty('1');
  };

  const handleCopyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(label);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Watchlist & Subscribed items breakdown
  const watchedPhysical = PHYSICAL_ASSETS.filter((a) => watchlist.includes(a.id));
  const watchedBlox = BLOX_ITEMS.filter((b) => watchlist.includes(b.id));

  const subscribedPhysical = PHYSICAL_ASSETS.filter((a) => subscriptions.includes(a.id));
  const subscribedBlox = BLOX_ITEMS.filter((b) => subscriptions.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header Hero */}
      <div className="relative bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 p-1 object-cover shadow-lg shadow-cyan-500/10"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0c0e17]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white font-display">
                  {user.name}
                </h2>
                <span className="text-xs text-cyan-400 font-mono-numbers px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30">
                  {user.handle}
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                {user.bio}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono-numbers pt-1">
                <span>Joined {user.joinedDate}</span>
                {user.robloxUsername && <span>· Roblox: <strong className="text-slate-300">{user.robloxUsername}</strong></span>}
                {user.psaMemberNumber && <span>· PSA Reg: <strong className="text-slate-300">{user.psaMemberNumber}</strong></span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditName(user.name);
                setEditBio(user.bio);
                setEditRoblox(user.robloxUsername || '');
                setEditPsa(user.psaMemberNumber || '');
                setIsEditingProfile(true);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Portfolio Net Worth Metric Strips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Physical Vault Value</span>
            <div className="text-2xl font-extrabold text-white font-mono-numbers mt-1">
              {formatCurrency(totalPhysicalPortfolioValue)}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono-numbers mt-0.5">
              +{formatCurrency(totalPhysicalGain)} ({totalPhysicalGainPct >= 0 ? '+' : ''}{totalPhysicalGainPct.toFixed(1)}%)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Blox Virtual Holdings</span>
            <div className="text-2xl font-extrabold text-cyan-400 font-mono-numbers mt-1">
              {formatTradeValue(totalVirtualPortfolioValue)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {virtualCollection.reduce((acc, i) => acc + i.quantity, 0)} items in inventory
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Active Price Subscriptions</span>
            <div className="text-2xl font-extrabold text-amber-400 font-mono-numbers mt-1 flex items-center gap-2">
              <Bell className="w-5 h-5 fill-current" />
              <span>{subscriptions.length} Items</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Alert Trigger: ±{alertThreshold}% shift
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Tracked Watchlist</span>
            <div className="text-2xl font-extrabold text-indigo-400 font-mono-numbers mt-1">
              {watchlist.length} Assets
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Real-time ticker stream active
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveSection('physical')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'physical'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Physical Cards & Coins ({physicalCollection.length})
          </button>

          <button
            onClick={() => setActiveSection('virtual')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'virtual'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Blox Fruits Inventory ({virtualCollection.length})
          </button>

          <button
            onClick={() => setActiveSection('subscriptions')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'subscriptions'
                ? 'bg-slate-800 text-amber-400 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span>Subscribed Alerts ({subscriptions.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('watchlist')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'watchlist'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Watchlist ({watchlist.length})
          </button>

          <button
            onClick={() => setActiveSection('firebase')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'firebase'
                ? 'bg-slate-800 text-orange-400 border border-orange-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-orange-400" />
            <span>Firebase Guide</span>
          </button>

          <button
            onClick={() => setActiveSection('settings')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Settings
          </button>
        </div>

        {activeTab === 'physical' && (
          <button
            onClick={() => setIsAddPhysModalOpen(true)}
            className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Physical Asset</span>
          </button>
        )}

        {activeTab === 'virtual' && (
          <button
            onClick={() => setIsAddVirtModalOpen(true)}
            className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Virtual Item</span>
          </button>
        )}
      </div>

      {/* SECTION 1: PHYSICAL COLLECTION */}
      {activeTab === 'physical' && (
        <div className="space-y-4">
          {physicalCollection.length === 0 ? (
            <div className="p-12 text-center bg-[#0c0e17] border border-slate-800 rounded-3xl space-y-3">
              <p className="text-slate-400 text-sm">Your physical collection vault is currently empty.</p>
              <button
                onClick={() => setIsAddPhysModalOpen(true)}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
              >
                Log Your First Specimen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {physicalCollection.map((item) => {
                const pnl = item.currentEstimatedValue - item.purchasePrice;
                const pnlPct = item.purchasePrice > 0 ? (pnl / item.purchasePrice) * 100 : 0;
                const subscribed = isSubscribed(item.assetId);

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#0c0e17] border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                            {item.category} · {item.grade}
                          </span>
                          <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                            {item.name}
                          </h4>
                          {item.certNumber && (
                            <span className="text-[10px] text-slate-500 font-mono-numbers">
                              {item.certNumber}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleSubscription(item.assetId, item.name, 'physical')}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              subscribed
                                ? 'bg-amber-950/80 border-amber-500/70 text-amber-400'
                                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-amber-400'
                            }`}
                            title={subscribed ? 'Subscribed to alerts' : 'Subscribe to price alerts'}
                          >
                            <Bell className={`w-3.5 h-3.5 ${subscribed ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            onClick={() => removePhysicalItem(item.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Remove from vault"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono-numbers">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Cost Basis:</span>
                          <span className="text-slate-300 font-semibold">{formatCurrency(item.purchasePrice)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Est. Market:</span>
                          <span className="text-white font-bold">{formatCurrency(item.currentEstimatedValue)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono-numbers">
                      <span className="text-slate-400 text-[11px]">Unrealized Return:</span>
                      <span className={`font-bold ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)} ({pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: VIRTUAL BLOX FRUITS INVENTORY */}
      {activeTab === 'virtual' && (
        <div className="space-y-4">
          {virtualCollection.length === 0 ? (
            <div className="p-12 text-center bg-[#0c0e17] border border-slate-800 rounded-3xl space-y-3">
              <p className="text-slate-400 text-sm">Your Blox Fruits inventory is currently empty.</p>
              <button
                onClick={() => setIsAddVirtModalOpen(true)}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
              >
                Add Your Blox Fruits
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {virtualCollection.map((item) => {
                const totalItemVal = item.unitTradeValue * item.quantity;
                const subscribed = isSubscribed(item.itemId);

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#0c0e17] border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono-numbers">
                            Holding: {item.quantity}x
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleSubscription(item.itemId, item.name, 'blox')}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              subscribed
                                ? 'bg-amber-950/80 border-amber-500/70 text-amber-400'
                                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-amber-400'
                            }`}
                            title={subscribed ? 'Subscribed to alerts' : 'Subscribe to price alerts'}
                          >
                            <Bell className={`w-3.5 h-3.5 ${subscribed ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            onClick={() => removeVirtualItem(item.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono-numbers space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-[10px]">Unit Value:</span>
                          <span className="text-white font-semibold">{formatTradeValue(item.unitTradeValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 text-[10px]">Total Holding:</span>
                          <span className="text-cyan-400 font-bold">{formatTradeValue(totalItemVal)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-numbers">
                      Acquired {item.acquiredDate}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: SUBSCRIBED PRICE ALERTS (Dedicated Bell Notifications view) */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#0c0e17] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Bell className="w-4 h-4 fill-current" />
                <span>Price Alert Subscription Monitoring ({subscriptions.length} active)</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                You receive instant alerts when any of these subscribed items shift by ±{alertThreshold}% in live market settled comps.
              </p>
            </div>

            <button
              onClick={() => setActiveSection('settings')}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white rounded-xl cursor-pointer shrink-0"
            >
              Adjust Sensitivity (±{alertThreshold}%)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subscribed Physical Assets */}
            <div className="bg-[#0c0e17] border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Subscribed Physical Assets</span>
                <span className="text-xs font-mono-numbers text-amber-400">{subscribedPhysical.length} items</span>
              </h4>

              <div className="space-y-2">
                {subscribedPhysical.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    No physical assets subscribed. Click the Bell icon on any card in the Live Tracker to subscribe!
                  </p>
                ) : (
                  subscribedPhysical.map((asset) => (
                    <div 
                      key={asset.id}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{asset.name}</div>
                        <div className="text-[11px] text-slate-400">{asset.category} · Year {asset.year}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right font-mono-numbers">
                          <div className="font-bold text-white">{formatCurrency(asset.currentMarketPrice)}</div>
                          <div className={`text-[10px] ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                          </div>
                        </div>
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(`${asset.name} live price comps`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:text-cyan-300"
                          title="Google Live Comps"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => toggleSubscription(asset.id, asset.name, 'physical')}
                          title="Unsubscribe from price alerts"
                          className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-500/70 text-amber-400 hover:bg-rose-950 hover:text-rose-400 hover:border-rose-500 transition-colors cursor-pointer"
                        >
                          <Bell className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Subscribed Blox Fruits */}
            <div className="bg-[#0c0e17] border border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Subscribed Blox Fruits</span>
                <span className="text-xs font-mono-numbers text-amber-400">{subscribedBlox.length} items</span>
              </h4>

              <div className="space-y-2">
                {subscribedBlox.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    No Blox Fruits subscribed. Click the Bell icon on any fruit in the Blox Fruits Hub to subscribe!
                  </p>
                ) : (
                  subscribedBlox.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.iconSymbol}</span>
                        <div>
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-[11px] text-amber-400 font-mono-numbers">Demand: {item.demand}/10</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right font-mono-numbers">
                          <div className="font-bold text-cyan-400">{formatTradeValue(item.tradeValue)}</div>
                          <div className={`text-[10px] ${item.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {item.change24h >= 0 ? '+' : ''}{item.change24h}%
                          </div>
                        </div>
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(`Blox Fruits ${item.name} trade value live`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:text-cyan-300"
                          title="Google Live Comps"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => toggleSubscription(item.id, item.name, 'blox')}
                          title="Unsubscribe from price alerts"
                          className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-500/70 text-amber-400 hover:bg-rose-950 hover:text-rose-400 hover:border-rose-500 transition-colors cursor-pointer"
                        >
                          <Bell className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: WATCHLIST */}
      {activeTab === 'watchlist' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0c0e17] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Physical Cards & Coins Watchlist</span>
              <span className="text-xs font-mono-numbers text-cyan-400">{watchedPhysical.length} items</span>
            </h4>

            <div className="space-y-2">
              {watchedPhysical.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No physical assets on your watchlist.</p>
              ) : (
                watchedPhysical.map((asset) => (
                  <div 
                    key={asset.id}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{asset.name}</div>
                      <div className="text-[11px] text-slate-400">{asset.category} · Year {asset.year}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right font-mono-numbers">
                        <div className="font-bold text-white">{formatCurrency(asset.currentMarketPrice)}</div>
                        <div className="text-[10px] text-emerald-400">+{asset.change24h}%</div>
                      </div>
                      <button
                        onClick={() => toggleWatchlist(asset.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#0c0e17] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Blox Fruits Watchlist</span>
              <span className="text-xs font-mono-numbers text-cyan-400">{watchedBlox.length} items</span>
            </h4>

            <div className="space-y-2">
              {watchedBlox.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No virtual fruits on your watchlist.</p>
              ) : (
                watchedBlox.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.iconSymbol}</span>
                      <div>
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="text-[11px] text-amber-400 font-mono-numbers">Demand: {item.demand}/10</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right font-mono-numbers">
                        <div className="font-bold text-cyan-400">{formatTradeValue(item.tradeValue)}</div>
                        <div className="text-[10px] text-emerald-400">+{item.change24h}%</div>
                      </div>
                      <button
                        onClick={() => toggleWatchlist(item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: FIREBASE SETUP & INTEGRATION GUIDE (Prompt 7 requirement) */}
      {activeTab === 'firebase' && (
        <div className="max-w-4xl bg-[#0c0e17] border border-orange-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-950/60 border border-orange-500/50 flex items-center justify-center text-2xl text-orange-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  How to Set Up Firebase for Rare Vault
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete blueprint to connect persistent cloud storage for user authentication, collections, and price alert rules.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Steps Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px]">1</span>
                <span>Create Project & Register Web App</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Go to the official <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Firebase Console</a>, click <strong>"Add Project"</strong>, name it (e.g. <code>rare-vault-prod</code>), and register a Web App to retrieve your Firebase config object.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px]">2</span>
                <span>Enable Authentication</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                In the Firebase sidebar, navigate to <strong>Build &gt; Authentication</strong>. Click <strong>Get Started</strong> and enable sign-in providers: <strong>Email/Password</strong> and optional <strong>Google Sign-In</strong>.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">3</span>
                <span>Create Cloud Firestore Database</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Navigate to <strong>Build &gt; Firestore Database</strong>, click <strong>Create Database</strong> in production mode. Your collections will include <code>users</code>, <code>physical_vault</code>, <code>virtual_vault</code>, and <code>subscriptions</code>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px]">4</span>
                <span>Add Environment Variables</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Copy your web credentials and paste them into your project's <code>.env</code> file under client-safe Vite variables.
              </p>
            </div>
          </div>

          {/* Config Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-orange-400" />
                <span>Example .env Configuration:</span>
              </span>
              <button
                onClick={() => handleCopyCode(`VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="rare-vault.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="rare-vault"
VITE_FIREBASE_STORAGE_BUCKET="rare-vault.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abcdef"`, 'env')}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedSnippet === 'env' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'env' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="rare-vault.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="rare-vault"
VITE_FIREBASE_STORAGE_BUCKET="rare-vault.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abcdef"`}
            </pre>
          </div>

          {/* Firestore Security Rules */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>firestore.rules (User Isolation):</span>
              </span>
              <button
                onClick={() => handleCopyCode(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/subscriptions/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`, 'rules')}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedSnippet === 'rules' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'rules' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/subscriptions/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`}
            </pre>
          </div>
        </div>
      )}

      {/* SECTION 6: ALERT SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              Price Notification Settings
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure how sensitive you want the market volatility alerts to be.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Alert Volatility Trigger Threshold:</span>
              <span className="font-mono-numbers font-bold text-cyan-400 text-sm">±{alertThreshold}%</span>
            </div>

            <input
              type="range"
              min="0.5"
              max="10.0"
              step="0.5"
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />

            <div className="flex justify-between text-[10px] font-mono-numbers text-slate-500">
              <span>0.5% (Ultra Sensitive)</span>
              <span>2.5% (Recommended)</span>
              <span>10.0% (Only Major Breakouts)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-cyan-400" />
              <span>Receive in-app popups when subscribed items cross volatility threshold</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-cyan-400" />
              <span>Notify me of Blox Fruits update trade balance recommendations</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-cyan-400" />
              <span>Send digest for 1st Edition Charizard and Grail auction settles</span>
            </label>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#0e111a] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">Edit Collector Profile</h3>
              <button onClick={() => setIsEditingProfile(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Collector Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Roblox Username (for Blox trading)</label>
                <input
                  type="text"
                  value={editRoblox}
                  onChange={(e) => setEditRoblox(e.target.value)}
                  placeholder="RobloxPlayer123"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">PSA Member Registry #</label>
                <input
                  type="text"
                  value={editPsa}
                  onChange={(e) => setEditPsa(e.target.value)}
                  placeholder="PSA-884920"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 bg-slate-900 text-slate-300 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PHYSICAL ITEM MODAL */}
      {isAddPhysModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#0e111a] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white font-display">Add Specimen to Vault</h3>
              <button onClick={() => setIsAddPhysModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePhysical} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Specimen</label>
                <select
                  value={newPhysAssetId}
                  onChange={(e) => setNewPhysAssetId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {PHYSICAL_ASSETS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Condition / Grade</label>
                <select
                  value={newPhysGrade}
                  onChange={(e) => setNewPhysGrade(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Raw">Raw / Ungraded</option>
                  <option value="PSA 8">PSA 8 (NM-MT)</option>
                  <option value="PSA 9">PSA 9 (Mint)</option>
                  <option value="PSA 10">PSA 10 (Gem Mint)</option>
                  <option value="BGS 9.5">BGS 9.5 (True Gem)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Purchase Price ($ USD)</label>
                <input
                  type="number"
                  value={newPhysPurchasePrice}
                  onChange={(e) => setNewPhysPurchasePrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Cert / Slab Number (Optional)</label>
                <input
                  type="text"
                  value={newPhysCert}
                  onChange={(e) => setNewPhysCert(e.target.value)}
                  placeholder="PSA #48920199"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPhysModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl"
                >
                  Add Specimen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD VIRTUAL ITEM MODAL */}
      {isAddVirtModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#0e111a] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white font-display">Add Blox Fruit Item</h3>
              <button onClick={() => setIsAddVirtModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateVirtual} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Select Item</label>
                <select
                  value={newVirtItemId}
                  onChange={(e) => setNewVirtItemId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  {BLOX_ITEMS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.category}) - {formatTradeValue(b.tradeValue)} Value
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Quantity Held</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={newVirtQty}
                  onChange={(e) => setNewVirtQty(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddVirtModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl"
                >
                  Save to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
