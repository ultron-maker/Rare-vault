import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, User, Check, X, LogOut, Sparkles } from 'lucide-react';

export type ActiveTab = 'home' | 'scanner' | 'tracker' | 'blox' | 'trending' | 'profile' | 'contact';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { 
    user, 
    isAuthenticated, 
    openAuthModal, 
    logOut, 
    notifications, 
    unreadNotificationCount, 
    markAllNotificationsRead, 
    dismissNotification 
  } = useAuth();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090d]/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <span className="font-display font-black text-slate-950 text-base">R</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0 group-hover:text-cyan-400 transition-colors">
              Rare Vault
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('home')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'home' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'scanner' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Card Scanner
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'tracker' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Live Value Tracker
          </button>
          <button
            onClick={() => setActiveTab('blox')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'blox' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Blox Fruits Hub
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'trending' ? 'text-cyan-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Hot Drops
          </button>
        </nav>

        {/* Zone 3: 1 primary action / User profile zone */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Price change alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#08090d]" />
              )}
            </button>

            {/* Notification Tray */}
            {isNotifOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0e111a] border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 text-slate-200 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white font-display">Live Price Alerts</span>
                    <span className="text-xs text-slate-400 font-mono-numbers">({notifications.length})</span>
                  </div>
                  {unreadNotificationCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 mt-2">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-500">
                      No price change notifications yet. Add items to your watchlist!
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`py-2.5 px-1.5 flex items-start justify-between gap-3 text-xs ${
                          !notif.read ? 'bg-cyan-950/20 rounded-lg' : ''
                        }`}
                      >
                        <div>
                          <div className="font-medium text-slate-200 flex items-center gap-1.5">
                            <span>{notif.itemName}</span>
                            <span className={`text-[10px] font-mono-numbers font-semibold ${
                              notif.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                              {notif.direction === 'up' ? '+' : ''}{notif.changePercent}%
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {notif.previousPrice} → <span className="text-white font-semibold">{notif.newPrice}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                        </div>
                        <button
                          onClick={() => dismissNotification(notif.id)}
                          className="text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                          aria-label="Dismiss notification"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User state */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-xs font-medium text-slate-200 max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>

              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-[#0e111a] border border-slate-800 rounded-xl shadow-xl py-2 z-50 text-xs text-slate-300 animate-fadeIn"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="font-semibold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.handle}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>My Vault & Portfolio</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 text-slate-300 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Submit Price Data</span>
                  </button>
                  <div className="border-t border-slate-800 my-1" />
                  <button
                    onClick={logOut}
                    className="w-full text-left px-3 py-2 hover:bg-red-950/40 text-red-400 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('signup')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 rounded-xl transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Join Vault
            </button>
          )}

          {/* Quick Portfolio Tab CTA */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-slate-800 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            <span>My Vault</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/60 px-2 py-2 text-xs text-slate-400 overflow-x-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${activeTab === 'home' ? 'text-cyan-400 font-bold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab('scanner')}
          className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${activeTab === 'scanner' ? 'text-cyan-400 font-bold' : ''}`}
        >
          Scanner
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${activeTab === 'tracker' ? 'text-cyan-400 font-bold' : ''}`}
        >
          Tracker
        </button>
        <button
          onClick={() => setActiveTab('blox')}
          className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${activeTab === 'blox' ? 'text-cyan-400 font-bold' : ''}`}
        >
          Blox Fruits
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${activeTab === 'trending' ? 'text-cyan-400 font-bold' : ''}`}
        >
          Hot Drops
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-2.5 py-1 whitespace-nowrap cursor-pointer ${activeTab === 'profile' ? 'text-cyan-400 font-bold' : ''}`}
        >
          Portfolio
        </button>
      </div>
    </header>
  );
};
