import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, Sparkles, Mail, Lock, User, AtSign, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, signUp, logIn, logInDemo } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (authModalMode === 'signup') {
        if (!name.trim() || !email.trim()) {
          setError('Please provide your name and email');
          setIsSubmitting(false);
          return;
        }
        await signUp(name, email, handle || `@${name.toLowerCase().replace(/\s+/g, '_')}`);
      } else {
        if (!email.trim()) {
          setError('Please enter your email');
          setIsSubmitting(false);
          return;
        }
        await logIn(email);
      }
    } catch {
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#0e111a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle ambient glow header */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/15 blur-3xl pointer-events-none rounded-full" />
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Kicker */}
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Rare Vault Identity</span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-white font-display mb-1">
          {authModalMode === 'signup' ? 'Create Collector Account' : 'Welcome Back, Trader'}
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          {authModalMode === 'signup' 
            ? 'Track physical cards, coins, and live Blox Fruits trades in your personal vault.'
            : 'Access your saved watchlists, custom inventories, and real-time price alerts.'}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Carter"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Collector Handle</label>
                <div className="relative">
                  <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="grail_seeker"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@rarevault.io"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{authModalMode === 'signup' ? 'Complete Sign Up' : 'Log In to Vault'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-3">
          {/* Quick Demo Login */}
          <button
            type="button"
            onClick={logInDemo}
            className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/70 text-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Demo VIP Collector Profile</span>
          </button>

          <div className="text-center text-xs text-slate-400">
            {authModalMode === 'signup' ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-cyan-400 hover:underline font-medium cursor-pointer"
                >
                  Log In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="text-cyan-400 hover:underline font-medium cursor-pointer"
                >
                  Create one now
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
