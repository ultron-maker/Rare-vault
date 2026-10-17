import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar: string;
  joinedDate: string;
  bio: string;
  robloxUsername?: string;
  psaMemberNumber?: string;
}

export interface UserPhysicalItem {
  id: string;
  assetId: string; // references PHYSICAL_ASSETS
  name: string;
  category: 'pokemon' | 'sports' | 'coins' | 'currency';
  grade: 'Raw' | 'PSA 8' | 'PSA 9' | 'PSA 10' | 'BGS 9.5';
  purchasePrice: number;
  currentEstimatedValue: number;
  dateAcquired: string;
  certNumber?: string;
  notes?: string;
}

export interface UserVirtualItem {
  id: string;
  itemId: string; // references BLOX_ITEMS
  name: string;
  category: 'Physical' | 'Permanent' | 'Gamepass' | 'Limited';
  quantity: number;
  unitTradeValue: number;
  notes?: string;
  acquiredDate: string;
}

export interface PriceNotification {
  id: string;
  itemId: string;
  itemName: string;
  itemType: 'physical' | 'blox';
  previousPrice: string;
  newPrice: string;
  changePercent: number;
  direction: 'up' | 'down';
  timestamp: string;
  read: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  signUp: (name: string, email: string, handle: string) => Promise<boolean>;
  logIn: (email: string) => Promise<boolean>;
  logInDemo: () => void;
  logOut: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  
  // Collections
  physicalCollection: UserPhysicalItem[];
  virtualCollection: UserVirtualItem[];
  addPhysicalItem: (item: Omit<UserPhysicalItem, 'id'>) => void;
  removePhysicalItem: (id: string) => void;
  addVirtualItem: (item: Omit<UserVirtualItem, 'id'>) => void;
  removeVirtualItem: (id: string) => void;
  
  // Watchlist & Tracking
  watchlist: string[];
  toggleWatchlist: (itemId: string, itemName?: string) => void;
  isWatched: (itemId: string) => boolean;

  // Subscriptions (Bell alerts)
  subscriptions: string[];
  toggleSubscription: (itemId: string, itemName: string, itemType?: 'physical' | 'blox') => boolean;
  isSubscribed: (itemId: string) => boolean;
  
  // Toast
  toast: { message: string; type: 'success' | 'info' | 'alert' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'alert') => void;
  dismissToast: () => void;
  
  // Notifications
  notifications: PriceNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;
  alertThreshold: number;
  setAlertThreshold: (percent: number) => void;
  
  // Stats
  totalPhysicalPortfolioValue: number;
  totalVirtualPortfolioValue: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr-collector-01',
  name: 'Alex Vance',
  handle: '@cyber_grail',
  email: 'alex.vance@rarevault.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  joinedDate: 'Joined March 2026',
  bio: 'Dual high-end asset collector. Chasing PSA 10 vintage Japanese promos & Mythical Blox perms.',
  robloxUsername: 'VanceKitsuneMaster',
  psaMemberNumber: 'PSA-884920'
};

const DEFAULT_PHYSICAL_ITEMS: UserPhysicalItem[] = [
  {
    id: 'phys-1',
    assetId: 'charizard-base-1st-ed',
    name: '1999 Pokémon Base Set Charizard #4 1st Ed',
    category: 'pokemon',
    grade: 'PSA 9',
    purchasePrice: 68000,
    currentEstimatedValue: 82000,
    dateAcquired: '2025-11-14',
    certNumber: 'PSA-48920199',
    notes: 'Flawless holo swirl near tail, crisp stamp'
  },
  {
    id: 'phys-2',
    assetId: 'gengar-vmax-alt-art',
    name: '2021 Pokémon Fusion Strike Gengar VMAX #271',
    category: 'pokemon',
    grade: 'PSA 10',
    purchasePrice: 380,
    currentEstimatedValue: 580,
    dateAcquired: '2026-02-10',
    certNumber: 'PSA-78492014',
    notes: 'Pack fresh submission'
  },
  {
    id: 'phys-3',
    assetId: 'coin-1909-s-vdb-penny',
    name: '1909-S VDB Lincoln Cent Key Date',
    category: 'coins',
    grade: 'PSA 9',
    purchasePrice: 16500,
    currentEstimatedValue: 18500,
    dateAcquired: '2026-01-22',
    certNumber: 'PCGS-248109',
    notes: 'MS-65 Red toning with full reverse initials'
  }
];

const DEFAULT_VIRTUAL_ITEMS: UserVirtualItem[] = [
  {
    id: 'virt-1',
    itemId: 'blox-kitsune-physical',
    name: 'Kitsune Fruit',
    category: 'Physical',
    quantity: 2,
    unitTradeValue: 125000000,
    notes: 'Holding for Dragon Rework trade offers',
    acquiredDate: '2026-03-01'
  },
  {
    id: 'virt-2',
    itemId: 'blox-perm-buddha',
    name: 'Permanent Buddha',
    category: 'Permanent',
    quantity: 1,
    unitTradeValue: 165000000,
    notes: 'Main raid farming unlock',
    acquiredDate: '2026-02-18'
  },
  {
    id: 'virt-3',
    itemId: 'blox-fruit-storage',
    name: '+1 Fruit Storage Pass',
    category: 'Gamepass',
    quantity: 3,
    unitTradeValue: 52000000,
    notes: 'High liquidity trade chips',
    acquiredDate: '2026-03-10'
  }
];

const INITIAL_NOTIFICATIONS: PriceNotification[] = [
  {
    id: 'notif-1',
    itemId: 'blox-dragon-physical',
    itemName: 'Blox Fruits: Dragon (Rework)',
    itemType: 'blox',
    previousPrice: '108M Value',
    newPrice: '120M Value',
    changePercent: 12.5,
    direction: 'up',
    timestamp: '14 min ago',
    read: false
  },
  {
    id: 'notif-2',
    itemId: 'charizard-base-1st-ed',
    itemName: '1999 Base Set Charizard PSA 10',
    itemType: 'physical',
    previousPrice: '$275,000',
    newPrice: '$285,000',
    changePercent: 3.4,
    direction: 'up',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    itemId: 'blox-mammoth-physical',
    itemName: 'Blox Fruits: Mammoth',
    itemType: 'blox',
    previousPrice: '14.8M Value',
    newPrice: '14.0M Value',
    changePercent: -2.8,
    direction: 'down',
    timestamp: 'Yesterday',
    read: true
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('rarevault_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const [physicalCollection, setPhysicalCollection] = useState<UserPhysicalItem[]>(() => {
    const saved = localStorage.getItem('rarevault_physical_collection');
    return saved ? JSON.parse(saved) : DEFAULT_PHYSICAL_ITEMS;
  });

  const [virtualCollection, setVirtualCollection] = useState<UserVirtualItem[]>(() => {
    const saved = localStorage.getItem('rarevault_virtual_collection');
    return saved ? JSON.parse(saved) : DEFAULT_VIRTUAL_ITEMS;
  });

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('rarevault_watchlist');
    return saved ? JSON.parse(saved) : ['charizard-base-1st-ed', 'blox-kitsune-physical', 'blox-dragon-physical', 'coin-1909-s-vdb-penny'];
  });

  const [subscriptions, setSubscriptions] = useState<string[]>(() => {
    const saved = localStorage.getItem('rarevault_subscriptions');
    return saved ? JSON.parse(saved) : ['blox-kitsune-physical', 'charizard-base-1st-ed'];
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'alert' } | null>(null);

  const [notifications, setNotifications] = useState<PriceNotification[]>(() => {
    const saved = localStorage.getItem('rarevault_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [alertThreshold, setAlertThreshold] = useState<number>(() => {
    const saved = localStorage.getItem('rarevault_alert_threshold');
    return saved ? parseFloat(saved) : 2.5;
  });

  const showToast = (message: string, type: 'success' | 'info' | 'alert' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 4000);
  };

  const dismissToast = () => setToast(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('rarevault_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);
  useEffect(() => {
    if (user) {
      localStorage.setItem('rarevault_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rarevault_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rarevault_physical_collection', JSON.stringify(physicalCollection));
  }, [physicalCollection]);

  useEffect(() => {
    localStorage.setItem('rarevault_virtual_collection', JSON.stringify(virtualCollection));
  }, [virtualCollection]);

  useEffect(() => {
    localStorage.setItem('rarevault_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('rarevault_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('rarevault_alert_threshold', alertThreshold.toString());
  }, [alertThreshold]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const signUp = async (name: string, email: string, handle: string): Promise<boolean> => {
    const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      handle: cleanHandle,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      joinedDate: 'Joined Today',
      bio: 'New collector on Rare Vault. Building holy grail physical & Blox Fruits assets.',
      robloxUsername: handle.replace('@', ''),
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const logIn = async (email: string): Promise<boolean> => {
    const existing: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      handle: `@${email.split('@')[0]}`,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      joinedDate: 'Active Member',
      bio: 'Verified Rare Vault collector & trader.',
    };
    setUser(existing);
    setIsAuthModalOpen(false);
    return true;
  };

  const logInDemo = () => {
    setUser(DEMO_USER);
    setPhysicalCollection(DEFAULT_PHYSICAL_ITEMS);
    setVirtualCollection(DEFAULT_VIRTUAL_ITEMS);
    setIsAuthModalOpen(false);
  };

  const logOut = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const addPhysicalItem = (item: Omit<UserPhysicalItem, 'id'>) => {
    const newItem: UserPhysicalItem = {
      ...item,
      id: `phys-${Date.now()}`
    };
    setPhysicalCollection((prev) => [newItem, ...prev]);
  };

  const removePhysicalItem = (id: string) => {
    setPhysicalCollection((prev) => prev.filter((i) => i.id !== id));
  };

  const addVirtualItem = (item: Omit<UserVirtualItem, 'id'>) => {
    const newItem: UserVirtualItem = {
      ...item,
      id: `virt-${Date.now()}`
    };
    setVirtualCollection((prev) => [newItem, ...prev]);
  };

  const removeVirtualItem = (id: string) => {
    setVirtualCollection((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleWatchlist = (itemId: string, itemName?: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        return prev.filter((id) => id !== itemId);
      } else {
        // Add a notification when newly tracked
        if (itemName) {
          const newNotif: PriceNotification = {
            id: `notif-${Date.now()}`,
            itemId,
            itemName: `Watching: ${itemName}`,
            itemType: itemId.startsWith('blox') ? 'blox' : 'physical',
            previousPrice: 'Alert Armed',
            newPrice: `±${alertThreshold}% Threshold Active`,
            changePercent: 0,
            direction: 'up',
            timestamp: 'Just now',
            read: false
          };
          setNotifications((n) => [newNotif, ...n]);
        }
        return [...prev, itemId];
      }
    });
  };

  const isWatched = (itemId: string) => watchlist.includes(itemId);

  const isSubscribed = (itemId: string) => subscriptions.includes(itemId);

  const toggleSubscription = (itemId: string, itemName: string, itemType: 'physical' | 'blox' = 'physical'): boolean => {
    if (!user) {
      showToast('Please sign in or create an account to subscribe to price updates!', 'alert');
      openAuthModal('signup');
      return false;
    }

    const alreadySubscribed = subscriptions.includes(itemId);

    if (alreadySubscribed) {
      setSubscriptions((prev) => prev.filter((id) => id !== itemId));
      showToast(`Unsubscribed from price updates for ${itemName}.`, 'info');
      return false;
    } else {
      setSubscriptions((prev) => [...prev, itemId]);
      showToast(`Subscribed! You will receive price alerts for ${itemName} (±${alertThreshold}% threshold).`, 'success');

      // Create instant subscription notification event
      const notif: PriceNotification = {
        id: `sub-${Date.now()}`,
        itemId,
        itemName: `Subscribed: ${itemName}`,
        itemType,
        previousPrice: 'Tracking Armed',
        newPrice: `Alert Active (±${alertThreshold}%)`,
        changePercent: 0,
        direction: 'up',
        timestamp: 'Just now',
        read: false,
      };
      setNotifications((prev) => [notif, ...prev]);
      return true;
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const totalPhysicalPortfolioValue = physicalCollection.reduce(
    (sum, item) => sum + item.currentEstimatedValue,
    0
  );

  const totalVirtualPortfolioValue = virtualCollection.reduce(
    (sum, item) => sum + item.unitTradeValue * item.quantity,
    0
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signUp,
        logIn,
        logInDemo,
        logOut,
        updateProfile,
        physicalCollection,
        virtualCollection,
        addPhysicalItem,
        removePhysicalItem,
        addVirtualItem,
        removeVirtualItem,
        watchlist,
        toggleWatchlist,
        isWatched,
        subscriptions,
        toggleSubscription,
        isSubscribed,
        toast,
        showToast,
        dismissToast,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsRead,
        dismissNotification,
        alertThreshold,
        setAlertThreshold,
        totalPhysicalPortfolioValue,
        totalVirtualPortfolioValue
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
