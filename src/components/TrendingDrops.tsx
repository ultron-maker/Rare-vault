import React, { useState } from 'react';
import { BLOX_ITEMS, formatTradeValue } from '../data/bloxData';
import { PHYSICAL_ASSETS } from '../data/physicalData';
import { ActiveTab } from './Navbar';
import { useAuth } from '../context/AuthContext';
import { 
  Flame, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Bookmark, 
  Scale, 
  ThumbsUp, 
  MessageSquare,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

interface TrendingDropsProps {
  setActiveTab: (tab: ActiveTab) => void;
}

interface CommunityTrade {
  id: string;
  user: string;
  userAvatar: string;
  timeAgo: string;
  giveItems: string[];
  receiveItems: string[];
  votes: { win: number; fair: number; lose: number };
  userVoted?: 'win' | 'fair' | 'lose';
}

const INITIAL_TRADES: CommunityTrade[] = [
  {
    id: 'tr-1',
    user: 'ShadowBlade_99',
    userAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Shadow',
    timeAgo: '12 min ago',
    giveItems: ['Kitsune Fruit (Physical)'],
    receiveItems: ['Dragon (Rework)', 'Dough Fruit', 'Buddha Fruit'],
    votes: { win: 342, fair: 48, lose: 12 }
  },
  {
    id: 'tr-2',
    user: 'GrailHunter_NYC',
    userAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Hunter',
    timeAgo: '45 min ago',
    giveItems: ['2x Permanent Buddha'],
    receiveItems: ['Permanent Kitsune'],
    votes: { win: 88, fair: 240, lose: 22 }
  },
  {
    id: 'tr-3',
    user: 'CardTitan_PSA',
    userAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Titan',
    timeAgo: '2 hours ago',
    giveItems: ['1986 Fleer Michael Jordan PSA 9'],
    receiveItems: ['1999 Base Charizard PSA 9', '+$12,000 Cash Equiv'],
    votes: { win: 195, fair: 110, lose: 8 }
  }
];

export const TrendingDrops: React.FC<TrendingDropsProps> = ({ setActiveTab }) => {
  const { toggleWatchlist, isWatched } = useAuth();
  
  const [trades, setTrades] = useState<CommunityTrade[]>(INITIAL_TRADES);
  const [votedNotice, setVotedNotice] = useState<string | null>(null);

  const hotBloxItems = BLOX_ITEMS.filter((i) => i.isHot);
  const hotPhysicalItems = PHYSICAL_ASSETS.filter((i) => i.isHot);

  const handleVote = (tradeId: string, type: 'win' | 'fair' | 'lose') => {
    setTrades((prev) =>
      prev.map((t) => {
        if (t.id === tradeId) {
          if (t.userVoted) return t; // already voted
          return {
            ...t,
            userVoted: type,
            votes: {
              ...t.votes,
              [type]: t.votes[type] + 1
            }
          };
        }
        return t;
      })
    );
    setVotedNotice(`Recorded your vote on trade ${tradeId}!`);
    setTimeout(() => setVotedNotice(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
          <Flame className="w-4 h-4 fill-current text-amber-400" />
          <span>Macro Market Momentum</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white font-display mt-1">
          Trending Drops & Hot Market Feeds
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Real-time feed detailing sudden surges in the economy—from high-demand Mythical Blox fruits breaking trading volume records to vintage card auction comps.
        </p>
      </div>

      {votedNotice && (
        <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-xs text-cyan-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-400" />
            <span>{votedNotice}</span>
          </div>
          <button onClick={() => setVotedNotice(null)} className="text-cyan-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Hero Spotlight: Blox Mythical Surge & Vintage Records */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Mythicals Skyrocketing (7 cols) */}
        <div className="lg:col-span-7 bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦊</span>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Virtual Economy: Mythical Surges
                </h3>
                <div className="text-xs text-slate-400">High trade velocity & extreme community demand</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('blox')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Trade Calculator</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hotBloxItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{item.iconSymbol}</span>
                    <div className="flex items-center gap-1 text-xs font-mono-numbers text-emerald-400 font-bold">
                      <TrendingUp className="w-3 h-3" />
                      +{item.change24h}%
                    </div>
                  </div>

                  <h4 className="font-bold text-white text-sm mt-2">{item.name}</h4>
                  <div className="text-[11px] text-slate-400 font-mono-numbers">{item.tier} · {item.category}</div>
                  
                  <div className="mt-3 flex items-baseline justify-between text-xs">
                    <span className="text-slate-400">Trade Value:</span>
                    <span className="font-mono-numbers font-extrabold text-white text-sm">
                      {formatTradeValue(item.tradeValue)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[11px] text-amber-400">
                    <span className="text-slate-400">Community Demand:</span>
                    <span className="font-mono-numbers font-bold">{item.demand}/10</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleWatchlist(item.id, item.name)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isWatched(item.id) ? 'Tracked' : 'Track'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('blox')}
                    className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                  >
                    Calculate →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Vintage Physical Record Sales (5 cols) */}
        <div className="lg:col-span-5 bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Physical Grails: Record Comps
              </h3>
              <div className="text-xs text-slate-400">Verified high-ticket auctions settled</div>
            </div>

            <button
              onClick={() => setActiveTab('tracker')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>All Tickers</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {hotPhysicalItems.slice(0, 3).map((asset) => (
              <div
                key={asset.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-cyan-400 font-mono-numbers text-[10px] uppercase">
                    <span>{asset.category}</span>
                    <span>·</span>
                    <span>PSA 10 GEM</span>
                  </div>
                  <h4 className="font-bold text-white text-sm line-clamp-1 mt-0.5">{asset.name}</h4>
                  <div className="text-[11px] text-slate-400">{asset.lastSaleDate}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono-numbers font-black text-white text-sm">
                    ${asset.currentMarketPrice.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono-numbers font-semibold">
                    +{asset.change24h}% (24h)
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Auction House Comps Synchronized</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Price points reflect confirmed settled sales from Heritage Auctions, Goldin, and eBay Vault escrow with buyers premiums verified.
            </p>
          </div>
        </div>

      </div>

      {/* Community Trade Sentiment & Consensus Voting Feed */}
      <div className="bg-[#0c0e17] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Community Trade Consensus</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-display mt-0.5">
            Live Verified Trade Evaluations
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Real trades executed by collectors. Cast your vote on whether the deal was a Win, Fair, or Lose!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trades.map((trade) => {
            const totalVotes = trade.votes.win + trade.votes.fair + trade.votes.lose;
            const winPct = Math.round((trade.votes.win / totalVotes) * 100);
            const fairPct = Math.round((trade.votes.fair / totalVotes) * 100);
            const losePct = 100 - winPct - fairPct;

            return (
              <div 
                key={trade.id}
                className="p-5 rounded-2xl bg-[#08090d] border border-slate-800 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  {/* Trader User Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={trade.userAvatar}
                        alt={trade.user}
                        className="w-6 h-6 rounded-full bg-slate-800"
                      />
                      <span className="font-semibold text-slate-200">{trade.user}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono-numbers">{trade.timeAgo}</span>
                  </div>

                  {/* Give vs Receive */}
                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-500">Gave Up:</div>
                      <div className="font-semibold text-white mt-0.5">
                        {trade.giveItems.join(', ')}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60">
                      <div className="text-[10px] uppercase font-bold text-cyan-400">Received:</div>
                      <div className="font-semibold text-slate-200 mt-0.5">
                        {trade.receiveItems.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consensus Voting */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono-numbers">
                    <span className="text-emerald-400 font-bold">{winPct}% Win</span>
                    <span className="text-cyan-400 font-bold">{fairPct}% Fair</span>
                    <span className="text-rose-400 font-bold">{losePct}% Lose</span>
                  </div>

                  {/* Spectrum Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden flex">
                    <div style={{ width: `${winPct}%` }} className="bg-emerald-500 h-full" />
                    <div style={{ width: `${fairPct}%` }} className="bg-cyan-400 h-full" />
                    <div style={{ width: `${losePct}%` }} className="bg-rose-500 h-full" />
                  </div>

                  {/* User Vote Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      onClick={() => handleVote(trade.id, 'win')}
                      disabled={!!trade.userVoted}
                      className={`py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                        trade.userVoted === 'win'
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-emerald-500/50'
                      }`}
                    >
                      Win
                    </button>

                    <button
                      onClick={() => handleVote(trade.id, 'fair')}
                      disabled={!!trade.userVoted}
                      className={`py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                        trade.userVoted === 'fair'
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50'
                      }`}
                    >
                      Fair
                    </button>

                    <button
                      onClick={() => handleVote(trade.id, 'lose')}
                      disabled={!!trade.userVoted}
                      className={`py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                        trade.userVoted === 'lose'
                          ? 'bg-rose-950 border-rose-400 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-rose-500/50'
                      }`}
                    >
                      Lose
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
