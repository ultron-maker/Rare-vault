export interface SaleComp {
  date: string;
  price: number;
  platform: 'eBay Vault' | 'Heritage Auctions' | 'Goldin' | 'PWCC' | 'TCGPlayer' | 'Sotheby\'s' | 'Christie\'s';
  grade: string;
  verified: boolean;
}

export interface PhysicalAsset {
  id: string;
  name: string;
  subtitle: string;
  category: 'pokemon' | 'sports' | 'coins' | 'currency';
  year: number | string;
  rarity: string;
  currentMarketPrice: number; // Base PSA 10 or top certified value
  gradePrices: {
    raw: number;
    psa8: number;
    psa9: number;
    psa10: number;
    bgs9_5?: number;
  };
  change24h: number;
  volume24h: string;
  popReport: string;
  lastSaleDate: string;
  priceHistory7d: number[];
  recentComps: SaleComp[];
  description: string;
  specs: {
    centering: string;
    surface: string;
    edges: string;
    corners: string;
    authCode?: string;
  };
  isHot: boolean;
  accentColor: string;
}

export const PHYSICAL_ASSETS: PhysicalAsset[] = [
  // ============================================
  // --- POKÉMON GRAIL & ICONIC CARDS ---
  // ============================================
  {
    id: 'charizard-base-1st-ed',
    name: '1999 Pokémon Base Set Charizard #4',
    subtitle: '1st Edition Shadowless Holofoil',
    category: 'pokemon',
    year: 1999,
    rarity: 'Grail Mythic',
    currentMarketPrice: 285000,
    gradePrices: {
      raw: 8500,
      psa8: 32000,
      psa9: 82000,
      psa10: 285000,
      bgs9_5: 145000,
    },
    change24h: 3.4,
    volume24h: '$412,000',
    popReport: 'PSA 10 Pop: 122 copies worldwide',
    lastSaleDate: 'Yesterday 18:42 EST',
    priceHistory7d: [265000, 270000, 268000, 275000, 280000, 279000, 285000],
    recentComps: [
      { date: 'Oct 14, 2026', price: 285000, platform: 'Goldin', grade: 'PSA 10 Gem Mint', verified: true },
      { date: 'Oct 02, 2026', price: 81500, platform: 'Heritage Auctions', grade: 'PSA 9 Mint', verified: true },
      { date: 'Sep 24, 2026', price: 31200, platform: 'eBay Vault', grade: 'PSA 8 NM-MT', verified: true },
    ],
    description: 'The definitive grail of modern trading card collecting. Features the legendary Mitsuhiro Arita fire-breathing artwork with shadowless border and 1st edition stamp.',
    specs: {
      centering: '50/50 Front, 55/45 Back',
      surface: 'Flawless holo foil, zero print lines',
      edges: 'Crisp factory cut, zero silvering',
      corners: 'Sharp 90-degree radius, no whitening',
      authCode: 'CERT #48920199'
    },
    isHot: true,
    accentColor: '#f97316'
  },
  {
    id: 'pikachu-illustrator-promo',
    name: '1998 Pokémon CoroCoro Illustrator Pikachu',
    subtitle: 'CoroCoro Comic Illustration Contest Promo',
    category: 'pokemon',
    year: 1998,
    rarity: 'Ultra Holy Grail',
    currentMarketPrice: 4250000,
    gradePrices: {
      raw: 650000,
      psa8: 1400000,
      psa9: 2800000,
      psa10: 4250000,
      bgs9_5: 3100000,
    },
    change24h: 0.8,
    volume24h: '$1,200,000',
    popReport: 'PSA Total Graded: 39 copies known',
    lastSaleDate: 'Oct 08, 2026',
    priceHistory7d: [4150000, 4180000, 4200000, 4210000, 4230000, 4220000, 4250000],
    recentComps: [
      { date: 'Oct 08, 2026', price: 4250000, platform: 'Goldin', grade: 'PSA 10 Gem Mint', verified: true },
      { date: 'Aug 19, 2026', price: 2750000, platform: 'Heritage Auctions', grade: 'PSA 9 Mint', verified: true },
    ],
    description: 'The most valuable and rarest Pokémon card in existence, created by Atsuko Nishida. Only awarded to winners of the 1997-1998 CoroCoro Comic illustration contests.',
    specs: {
      centering: '52/48 Front, 50/50 Back',
      surface: 'Glossy Japanese cardstock, vivid ink',
      edges: 'Clean rounded borders',
      corners: 'Pristine quad corners',
      authCode: 'CERT #10093822'
    },
    isHot: true,
    accentColor: '#eab308'
  },
  {
    id: 'umbreon-vmax-moonbreon',
    name: '2021 Pokémon Evolving Skies Umbreon VMAX #215',
    subtitle: 'Alternate Art Secret Rare "Moonbreon"',
    category: 'pokemon',
    year: 2021,
    rarity: 'Modern Masterpiece',
    currentMarketPrice: 1250,
    gradePrices: {
      raw: 680,
      psa8: 750,
      psa9: 890,
      psa10: 1250,
      bgs9_5: 1050,
    },
    change24h: 6.2,
    volume24h: '$180,000',
    popReport: 'PSA 10 Pop: 11,240',
    lastSaleDate: 'Today 06:14 EST',
    priceHistory7d: [1100, 1120, 1150, 1180, 1200, 1220, 1250],
    recentComps: [
      { date: 'Oct 16, 2026', price: 1250, platform: 'TCGPlayer', grade: 'PSA 10 Gem Mint', verified: true },
      { date: 'Oct 15, 2026', price: 890, platform: 'eBay Vault', grade: 'PSA 9 Mint', verified: true },
    ],
    description: 'The iconic modern holy grail depicting Umbreon reaching for the luminous celestial full moon above a fantasy town. Huge Gen-Z investor demand.',
    specs: {
      centering: '50/50 Front, 51/49 Back',
      surface: 'Detailed textured micro-foil engraving',
      edges: 'Flawless silver border',
      corners: 'Perfect factory radius',
      authCode: 'CERT #81940284'
    },
    isHot: true,
    accentColor: '#6366f1'
  },
  {
    id: 'gengar-vmax-alt-art',
    name: '2021 Pokémon Fusion Strike Gengar VMAX #271',
    subtitle: 'Alternate Art Secret Rare',
    category: 'pokemon',
    year: 2021,
    rarity: 'Modern Alternate Art',
    currentMarketPrice: 580,
    gradePrices: {
      raw: 290,
      psa8: 340,
      psa9: 420,
      psa10: 580,
      bgs9_5: 510,
    },
    change24h: 5.6,
    volume24h: '$84,500',
    popReport: 'PSA 10 Pop: 4,890',
    lastSaleDate: 'Today 04:12 EST',
    priceHistory7d: [510, 525, 530, 545, 560, 570, 580],
    recentComps: [
      { date: 'Oct 16, 2026', price: 580, platform: 'TCGPlayer', grade: 'PSA 10 Gem Mint', verified: true },
      { date: 'Oct 15, 2026', price: 420, platform: 'eBay Vault', grade: 'PSA 9 Mint', verified: true },
    ],
    description: 'High-demand Sword & Shield era modern grail featuring Gengar swallowing buildings in a surreal cityscape. Skyrocketing modern staple with Gen-Z collectors.',
    specs: {
      centering: '51/49 Front, 50/50 Back',
      surface: 'Textured relief foil stamp',
      edges: 'Precision die-cut border',
      corners: 'Tight factory curve',
      authCode: 'CERT #78492014'
    },
    isHot: true,
    accentColor: '#a855f7'
  },
  {
    id: 'blastoise-base-1st-ed',
    name: '1999 Pokémon Base Set Blastoise #2',
    subtitle: '1st Edition Shadowless Holofoil',
    category: 'pokemon',
    year: 1999,
    rarity: 'Vintage Big Three',
    currentMarketPrice: 78000,
    gradePrices: {
      raw: 2800,
      psa8: 8500,
      psa9: 24000,
      psa10: 78000,
      bgs9_5: 42000,
    },
    change24h: 2.1,
    volume24h: '$110,000',
    popReport: 'PSA 10 Pop: 148',
    lastSaleDate: 'Oct 12, 2026',
    priceHistory7d: [75000, 75500, 76000, 76800, 77000, 77500, 78000],
    recentComps: [
      { date: 'Oct 12, 2026', price: 78000, platform: 'Goldin', grade: 'PSA 10 Gem Mint', verified: true },
    ],
    description: 'The hydro pump powerhouse of the original Big Three with famous Ken Sugimori artwork.',
    specs: {
      centering: '51/49 Front',
      surface: 'Classic starburst galaxy foil',
      edges: 'Original English blue border',
      corners: 'Clean cut corners',
      authCode: 'CERT #49821033'
    },
    isHot: false,
    accentColor: '#3b82f6'
  },
  {
    id: 'venusaur-base-1st-ed',
    name: '1999 Pokémon Base Set Venusaur #15',
    subtitle: '1st Edition Shadowless Holofoil',
    category: 'pokemon',
    year: 1999,
    rarity: 'Vintage Big Three',
    currentMarketPrice: 56000,
    gradePrices: {
      raw: 2200,
      psa8: 7200,
      psa9: 18500,
      psa10: 56000,
      bgs9_5: 32000,
    },
    change24h: 1.8,
    volume24h: '$88,000',
    popReport: 'PSA 10 Pop: 172',
    lastSaleDate: 'Oct 10, 2026',
    priceHistory7d: [54000, 54500, 55000, 55200, 55600, 55800, 56000],
    recentComps: [
      { date: 'Oct 10, 2026', price: 56000, platform: 'Goldin', grade: 'PSA 10 Gem Mint', verified: true }
    ],
    description: 'The solar beam titan concluding the triumvirate of original generation starters with glittering cosmos holofoil.',
    specs: {
      centering: '50/50 Front',
      surface: 'Emerald starburst foil',
      edges: 'Factory trimmed',
      corners: 'Zero whitening',
      authCode: 'CERT #49821034'
    },
    isHot: false,
    accentColor: '#10b981'
  },
  {
    id: 'rayquaza-gold-star-ex-deoxys',
    name: '2005 Pokémon EX Deoxys Rayquaza Gold Star #107',
    subtitle: 'Ultra-Rare Shiny Gold Star Holo',
    category: 'pokemon',
    year: 2005,
    rarity: 'EX Era Gold Star Grail',
    currentMarketPrice: 110000,
    gradePrices: {
      raw: 4800,
      psa8: 16000,
      psa9: 38000,
      psa10: 110000,
      bgs9_5: 65000,
    },
    change24h: 4.8,
    volume24h: '$140,000',
    popReport: 'PSA 10 Pop: 48 known',
    lastSaleDate: 'Oct 07, 2026',
    priceHistory7d: [102000, 104000, 105000, 107000, 108000, 109000, 110000],
    recentComps: [
      { date: 'Oct 07, 2026', price: 110000, platform: 'PWCC', grade: 'PSA 10 Gem Mint', verified: true },
    ],
    description: 'Masakazu Fukuda artwork featuring the black shiny dragon bursting outside the illustration frame.',
    specs: {
      centering: '50/50 Front',
      surface: 'Prismatic foil with shiny gold star symbol',
      edges: 'Clean silvering-free edges',
      corners: 'Sharp corners',
      authCode: 'CERT #38491024'
    },
    isHot: true,
    accentColor: '#14b8a6'
  },
  {
    id: 'lugia-neo-genesis-1st-ed',
    name: '2000 Pokémon Neo Genesis Lugia #9',
    subtitle: '1st Edition Swirl Holo #9',
    category: 'pokemon',
    year: 2000,
    rarity: 'Neo Era Apex Grail',
    currentMarketPrice: 135000,
    gradePrices: {
      raw: 3500,
      psa8: 12000,
      psa9: 34000,
      psa10: 135000,
      bgs9_5: 78000,
    },
    change24h: 3.8,
    volume24h: '$195,000',
    popReport: 'PSA 10 Pop: 44 known (Extremely tough grade)',
    lastSaleDate: 'Oct 04, 2026',
    priceHistory7d: [128000, 130000, 131000, 132500, 133000, 134000, 135000],
    recentComps: [
      { date: 'Oct 04, 2026', price: 135000, platform: 'PWCC', grade: 'PSA 10 Gem Mint', verified: true }
    ],
    description: 'The Guardian of the Seas. Famously known as one of the hardest vintage holos to achieve a PSA 10 due to extreme factory print line susceptibility.',
    specs: {
      centering: '50/50 Front',
      surface: 'Unscratched cosmos swirl holographic pool',
      edges: 'Flawless silver borders',
      corners: 'Four razor-sharp corners',
      authCode: 'CERT #2294018'
    },
    isHot: true,
    accentColor: '#38bdf8'
  },
  {
    id: 'mario-luigi-pikachu-box',
    name: '2016 Pokémon Mario Pikachu XY Promo #294',
    subtitle: 'Pokémon Center Japan Special Box Promo',
    category: 'pokemon',
    year: 2016,
    rarity: 'Cross-Franchise Crossover Grail',
    currentMarketPrice: 7800,
    gradePrices: {
      raw: 2800,
      psa8: 3400,
      psa9: 4600,
      psa10: 7800,
      bgs9_5: 6200,
    },
    change24h: 8.2,
    volume24h: '$52,000',
    popReport: 'PSA 10 Pop: 1,820',
    lastSaleDate: 'Oct 15, 2026',
    priceHistory7d: [6800, 7000, 7200, 7350, 7500, 7650, 7800],
    recentComps: [
      { date: 'Oct 15, 2026', price: 7800, platform: 'eBay Vault', grade: 'PSA 10 Gem Mint', verified: true }
    ],
    description: 'Pikachu donning Mario moustache and dungarees with Super Mushroom. Immense cultural hype bridging Nintendo & Pokémon fanbases.',
    specs: {
      centering: '50/50 Front',
      surface: 'Glossy Japanese XY cardstock',
      edges: 'Crisp borders',
      corners: 'Factory cut',
      authCode: 'CERT #9482103'
    },
    isHot: true,
    accentColor: '#ef4444'
  },

  // ============================================
  // --- SPORTS CARDS GRAILS ---
  // ============================================
  {
    id: 'jordan-1986-fleer-rookie',
    name: '1986 Fleer Michael Jordan #57 Rookie',
    subtitle: 'Chicago Bulls Shooting Guard HOF',
    category: 'sports',
    year: 1986,
    rarity: 'Basketball Iconic Grail',
    currentMarketPrice: 215000,
    gradePrices: {
      raw: 4200,
      psa8: 12500,
      psa9: 38000,
      psa10: 215000,
      bgs9_5: 98000,
    },
    change24h: -1.2,
    volume24h: '$320,000',
    popReport: 'PSA 10 Pop: 317 certified',
    lastSaleDate: '3 days ago',
    priceHistory7d: [222000, 220000, 218000, 219000, 216000, 217000, 215000],
    recentComps: [
      { date: 'Oct 14, 2026', price: 215000, platform: 'PWCC', grade: 'PSA 10 Gem Mint', verified: true },
      { date: 'Sep 29, 2026', price: 37800, platform: 'Heritage Auctions', grade: 'PSA 9 Mint', verified: true },
    ],
    description: 'The single most recognized sports card of the modern era. Michael Jordan soaring through the air towards an iconic slam dunk.',
    specs: {
      centering: 'Famous 50/50 Red/White/Blue border alignment',
      surface: 'High gloss Fleer coating',
      edges: 'Sharp unchipped red borders',
      corners: 'Pristine non-fuzzy corners',
      authCode: 'CERT #59012480'
    },
    isHot: false,
    accentColor: '#ef4444'
  },
  {
    id: 'kobe-bryant-topps-chrome-refractor',
    name: '1996 Topps Chrome Kobe Bryant #138',
    subtitle: 'Refractor Rookie Parallel',
    category: 'sports',
    year: 1996,
    rarity: 'Chrome Refractor Grail',
    currentMarketPrice: 62000,
    gradePrices: {
      raw: 3500,
      psa8: 9800,
      psa9: 22000,
      psa10: 62000,
      bgs9_5: 39000,
    },
    change24h: 2.1,
    volume24h: '$95,000',
    popReport: 'PSA 10 Pop: 268',
    lastSaleDate: 'Oct 11, 2026',
    priceHistory7d: [59500, 60000, 60800, 61200, 61500, 61800, 62000],
    recentComps: [
      { date: 'Oct 11, 2026', price: 62000, platform: 'Goldin', grade: 'PSA 10 Gem Mint', verified: true },
      { date: 'Sep 18, 2026', price: 21800, platform: 'eBay Vault', grade: 'PSA 9 Mint', verified: true },
    ],
    description: 'The shimmering rainbow refractor rookie of the Black Mamba in his rookie purple and gold jersey.',
    specs: {
      centering: '51/49 top-to-bottom',
      surface: 'Prismatic diffraction coating',
      edges: 'Foil edged',
      corners: 'Sharp 4-corner strike',
      authCode: 'CERT #61994801'
    },
    isHot: true,
    accentColor: '#f59e0b'
  },
  {
    id: 'mickey-mantle-1952-topps-311',
    name: '1952 Topps Mickey Mantle #311',
    subtitle: 'New York Yankees Center Fielder',
    category: 'sports',
    year: 1952,
    rarity: 'Baseball Mona Lisa',
    currentMarketPrice: 12600000,
    gradePrices: {
      raw: 45000,
      psa8: 1850000,
      psa9: 4500000,
      psa10: 12600000,
      bgs9_5: 8500000,
    },
    change24h: 0.1,
    volume24h: 'Heritage Auction Record',
    popReport: 'SGC 9.5 Mint+: $12.6M Record Sale',
    lastSaleDate: 'Record Auction',
    priceHistory7d: [12600000, 12600000, 12600000, 12600000, 12600000, 12600000, 12600000],
    recentComps: [
      { date: 'Settled Comp', price: 12600000, platform: 'Heritage Auctions', grade: 'SGC 9.5', verified: true }
    ],
    description: 'The crown jewel of vintage baseball cards. Struck on high-number print run #311 with Mantle holding bat over shoulder.',
    specs: {
      centering: '53/47 Centering',
      surface: 'Rich original cyan-tinted stadium background',
      edges: 'Intact vintage pulp cardstock',
      corners: 'Sharp corners with zero fray',
      authCode: 'SGC #992810'
    },
    isHot: false,
    accentColor: '#0284c7'
  },
  {
    id: 'lebron-james-2003-topps-chrome-refractor',
    name: '2003 Topps Chrome LeBron James #111',
    subtitle: 'Refractor Rookie Card #/999',
    category: 'sports',
    year: 2003,
    rarity: 'Modern Basketball King',
    currentMarketPrice: 145000,
    gradePrices: {
      raw: 6500,
      psa8: 18000,
      psa9: 46000,
      psa10: 145000,
      bgs9_5: 88000,
    },
    change24h: 3.2,
    volume24h: '$210,000',
    popReport: 'PSA 10 Pop: 284',
    lastSaleDate: 'Oct 13, 2026',
    priceHistory7d: [138000, 140000, 141000, 142000, 143500, 144000, 145000],
    recentComps: [
      { date: 'Oct 13, 2026', price: 145000, platform: 'Goldin', grade: 'PSA 10 Gem Mint', verified: true }
    ],
    description: 'The Chosen One rookie refractor card showing LeBron James taking a mid-range jumper in Cleveland wine and gold.',
    specs: {
      centering: '50/50 Front',
      surface: 'Refractor rainbow sheen',
      edges: 'Crisp factory edge',
      corners: 'Flawless corners',
      authCode: 'PSA #5092104'
    },
    isHot: true,
    accentColor: '#dc2626'
  },
  {
    id: 'tom-brady-2000-playoff-contenders',
    name: '2000 Playoff Contenders Tom Brady #144',
    subtitle: 'Rookie Ticket Autograph',
    category: 'sports',
    year: 2000,
    rarity: 'NFL All-Time GOAT Grail',
    currentMarketPrice: 2300000,
    gradePrices: {
      raw: 120000,
      psa8: 450000,
      psa9: 980000,
      psa10: 2300000,
      bgs9_5: 1650000,
    },
    change24h: 1.5,
    volume24h: '$890,000',
    popReport: 'BGS 9/10 Auto: Pop 12',
    lastSaleDate: 'Oct 01, 2026',
    priceHistory7d: [2250000, 2260000, 2270000, 2280000, 2290000, 2295000, 2300000],
    recentComps: [
      { date: 'Oct 01, 2026', price: 2300000, platform: 'Goldin', grade: 'BGS 9 Auto 10', verified: true }
    ],
    description: 'The definitive football card. Struck when Brady was drafted 199th overall, signed in black ink on the iconic ticket stub design.',
    specs: {
      centering: '50/50 Ticket border',
      surface: 'Bold unstreaked autograph grade 10',
      edges: 'Clean edges',
      corners: 'Perforated ticket style',
      authCode: 'CERT #1194029'
    },
    isHot: false,
    accentColor: '#0284c7'
  },
  {
    id: 'honus-wagner-t206',
    name: '1909-11 T206 Honus Wagner',
    subtitle: 'American Tobacco Company Sweet Caporal',
    category: 'sports',
    year: 1909,
    rarity: 'The Holy Grail of Sports Collecting',
    currentMarketPrice: 7250000,
    gradePrices: {
      raw: 850000,
      psa8: 3800000,
      psa9: 5800000,
      psa10: 7250000,
      bgs9_5: 6400000,
    },
    change24h: 0.0,
    volume24h: 'Private Sale',
    popReport: 'SGC 2: $7.25M Record Sale',
    lastSaleDate: 'Record Benchmark',
    priceHistory7d: [7250000, 7250000, 7250000, 7250000, 7250000, 7250000, 7250000],
    recentComps: [
      { date: 'Private Deal', price: 7250000, platform: 'Goldin', grade: 'SGC 2 Good', verified: true }
    ],
    description: 'The baseball legend who halted production of his card to protect young fans from smoking, creating the legendary shortage.',
    specs: {
      centering: 'T206 Lithograph Centering',
      surface: 'Authentic 1909 patina',
      edges: 'Vintage century-old cardstock',
      corners: 'Historical authentic wear',
      authCode: 'SGC #1909001'
    },
    isHot: false,
    accentColor: '#d97706'
  },
  {
    id: 'messi-2004-panini-megacracks',
    name: '2004 Panini Megacracks Lionel Messi #71 BIS',
    subtitle: 'FC Barcelona Rookie Card',
    category: 'sports',
    year: 2004,
    rarity: 'Football (Soccer) World Grail',
    currentMarketPrice: 285000,
    gradePrices: {
      raw: 8000,
      psa8: 36000,
      psa9: 88000,
      psa10: 285000,
      bgs9_5: 160000,
    },
    change24h: 2.7,
    volume24h: '$310,000',
    popReport: 'PSA 10 Pop: 24 known copies',
    lastSaleDate: 'Oct 09, 2026',
    priceHistory7d: [275000, 276000, 278000, 280000, 282000, 284000, 285000],
    recentComps: [
      { date: 'Oct 09, 2026', price: 285000, platform: 'Goldin', grade: 'PSA 10 Gem Mint', verified: true }
    ],
    description: 'The premier rookie card of the 8-time Ballon d\'Or and World Cup Champion Lionel Messi playing in his debut Barça kit.',
    specs: {
      centering: '50/50 Front',
      surface: 'Glossy Spanish Megacracks print',
      edges: 'Crisp factory trim',
      corners: 'Flawless 4 corners',
      authCode: 'PSA #6682910'
    },
    isHot: true,
    accentColor: '#3b82f6'
  },

  // ============================================
  // --- RARE COINS (WORLD-CLASS NUMISMATICS) ---
  // ============================================
  {
    id: 'coin-1933-double-eagle',
    name: '1933 Saint-Gaudens $20 Double Eagle',
    subtitle: 'Sole Legally Owned King of Gold Coins',
    category: 'coins',
    year: 1933,
    rarity: 'Numismatic King',
    currentMarketPrice: 18872250,
    gradePrices: {
      raw: 4000000,
      psa8: 8500000,
      psa9: 14000000,
      psa10: 18872250,
      bgs9_5: 16500000,
    },
    change24h: 0.0,
    volume24h: 'Sotheby’s Record',
    popReport: 'PCGS MS-65: Sole Legal Copy',
    lastSaleDate: 'World Record',
    priceHistory7d: [18872250, 18872250, 18872250, 18872250, 18872250, 18872250, 18872250],
    recentComps: [
      { date: 'Sotheby’s Sale', price: 18872250, platform: 'Heritage Auctions', grade: 'PCGS MS-65', verified: true }
    ],
    description: 'The single most valuable gold coin on Earth, ordered melted during the Gold Recall Act of 1933, with only one specimen legally authorized for private ownership.',
    specs: {
      centering: 'Augustus Saint-Gaudens High Relief strike',
      surface: 'Lustrous satin gold planchet',
      edges: 'E PLURIBUS UNUM raised lettered edge',
      corners: 'Sharp sunburst rays',
      authCode: 'PCGS #1933001'
    },
    isHot: false,
    accentColor: '#eab308'
  },
  {
    id: 'coin-1794-flowing-hair-dollar',
    name: '1794 Flowing Hair Silver Dollar',
    subtitle: 'First United States Silver Dollar Ever Struck',
    category: 'coins',
    year: 1794,
    rarity: 'Foundational Numismatic Legend',
    currentMarketPrice: 12000000,
    gradePrices: {
      raw: 450000,
      psa8: 1800000,
      psa9: 4800000,
      psa10: 12000000,
      bgs9_5: 7500000,
    },
    change24h: 0.2,
    volume24h: 'Private Sale',
    popReport: 'Specimen-66: Sole finest known',
    lastSaleDate: 'Historical Record',
    priceHistory7d: [12000000, 12000000, 12000000, 12000000, 12000000, 12000000, 12000000],
    recentComps: [
      { date: 'Recent Auction', price: 12000000, platform: 'Heritage Auctions', grade: 'PCGS SP-66', verified: true },
    ],
    description: 'Believed to be the very first silver dollar struck by the U.S. Mint in Philadelphia in October 1794, presented directly to Secretary of State Edmund Randolph.',
    specs: {
      centering: 'Early screw-press centered die',
      surface: 'Deep mirror proof-like fields',
      edges: 'Lettered edge: HUNDRED CENTS ONE DOLLAR OR UNIT',
      corners: 'Intact reeded perimeter',
      authCode: 'PCGS #0894001'
    },
    isHot: false,
    accentColor: '#06b6d4'
  },
  {
    id: 'coin-1787-brasher-doubloon',
    name: '1787 Brasher Doubloon (EB on Wing)',
    subtitle: 'Ephraim Brasher New York Gold Coin',
    category: 'coins',
    year: 1787,
    rarity: 'Colonial American Gold Apex',
    currentMarketPrice: 9360000,
    gradePrices: {
      raw: 1500000,
      psa8: 3800000,
      psa9: 6800000,
      psa10: 9360000,
      bgs9_5: 8100000,
    },
    change24h: 0.0,
    volume24h: 'Heritage Auction Record',
    popReport: 'NGC MS-65: Finest known specimen',
    lastSaleDate: 'Historic Settled Auction',
    priceHistory7d: [9360000, 9360000, 9360000, 9360000, 9360000, 9360000, 9360000],
    recentComps: [
      { date: 'Heritage Record', price: 9360000, platform: 'Heritage Auctions', grade: 'NGC MS-65', verified: true }
    ],
    description: 'The first gold coin minted for the young United States by renowned silversmith Ephraim Brasher, stamped with his iconic EB hallmark on the eagle\'s wing.',
    specs: {
      centering: 'Hand-struck colonial hammer strike',
      surface: 'Natural Spanish-gold alloy tone',
      edges: 'Hand-filed original rims',
      corners: 'Sharp eagle breast feathers',
      authCode: 'NGC #1787002'
    },
    isHot: false,
    accentColor: '#f59e0b'
  },
  {
    id: 'coin-1943-bronze-cent',
    name: '1943 Bronze Lincoln Cent (Copper Error)',
    subtitle: 'Accidental Wartime Bronze Planchet Error',
    category: 'coins',
    year: 1943,
    rarity: 'Most Famous US Mint Error',
    currentMarketPrice: 1700000,
    gradePrices: {
      raw: 85000,
      psa8: 380000,
      psa9: 890000,
      psa10: 1700000,
      bgs9_5: 1200000,
    },
    change24h: 3.1,
    volume24h: '$250,000',
    popReport: 'PCGS MS-62 Brown: Only ~15 Known',
    lastSaleDate: 'Sep 29, 2026',
    priceHistory7d: [1620000, 1640000, 1650000, 1660000, 1680000, 1690000, 1700000],
    recentComps: [
      { date: 'Sep 29, 2026', price: 1700000, platform: 'Heritage Auctions', grade: 'PCGS MS-62 BN', verified: true }
    ],
    description: 'During WWII, the U.S. Mint transitioned to zinc-coated steel to save copper for wartime ammo. A tiny batch of bronze planchets was mistakenly left in the press hoppers.',
    specs: {
      centering: 'Full centering',
      surface: 'Authentic 95% copper non-magnetic planchet',
      edges: 'Plain smooth edge',
      corners: 'Full wheatear grain detail',
      authCode: 'PCGS #1943015'
    },
    isHot: true,
    accentColor: '#ea580c'
  },
  {
    id: 'coin-1909-s-vdb-penny',
    name: '1909-S VDB Lincoln Cent',
    subtitle: 'Victor David Brenner Key Date Penny',
    category: 'coins',
    year: 1909,
    rarity: 'Key Date Lincoln',
    currentMarketPrice: 128000,
    gradePrices: {
      raw: 950,
      psa8: 4200,
      psa9: 18500,
      psa10: 128000,
      bgs9_5: 64000,
    },
    change24h: 1.8,
    volume24h: '$148,000',
    popReport: 'PCGS MS-67+ Red: Pop 14',
    lastSaleDate: 'Oct 13, 2026',
    priceHistory7d: [124000, 125000, 126000, 126500, 127000, 127500, 128000],
    recentComps: [
      { date: 'Oct 13, 2026', price: 128000, platform: 'Heritage Auctions', grade: 'PCGS MS-67+ RD', verified: true },
      { date: 'Sep 27, 2026', price: 18200, platform: 'eBay Vault', grade: 'PCGS MS-65 RD', verified: true },
    ],
    description: 'The undisputed holy grail of small cents. Struck at the San Francisco Mint with the initials of designer Victor David Brenner before public protest caused their removal.',
    specs: {
      centering: 'Full wire rim strike',
      surface: 'Lustrous copper red toning',
      edges: 'Sharp uncirculated edge',
      corners: 'Full earlobe & wheatear definition',
      authCode: 'PCGS #248109'
    },
    isHot: true,
    accentColor: '#d97706'
  },
  {
    id: 'coin-1913-liberty-nickel',
    name: '1913 Liberty Head Nickel',
    subtitle: 'One of Only 5 Known in Existence',
    category: 'coins',
    year: 1913,
    rarity: 'Ultra Numismatic Rarity',
    currentMarketPrice: 4500000,
    gradePrices: {
      raw: 950000,
      psa8: 2200000,
      psa9: 3400000,
      psa10: 4500000,
      bgs9_5: 3900000,
    },
    change24h: 0.3,
    volume24h: 'Private Sale',
    popReport: 'Olsen Specimen: PCGS PR-64',
    lastSaleDate: 'Privately Settled',
    priceHistory7d: [4500000, 4500000, 4500000, 4500000, 4500000, 4500000, 4500000],
    recentComps: [
      { date: 'Privately Settled', price: 4500000, platform: 'Heritage Auctions', grade: 'PCGS PR-64', verified: true }
    ],
    description: 'Surreptitiously struck at the Philadelphia Mint before the Buffalo nickel design transition. Only five specimens are confirmed to exist.',
    specs: {
      centering: 'High-relief proof strike',
      surface: 'Silvery nickel cameo contrast',
      edges: 'Smooth proof edge',
      corners: 'Sharp Roman numeral V on reverse',
      authCode: 'PCGS #1913005'
    },
    isHot: false,
    accentColor: '#94a3b8'
  },

  // ============================================
  // --- COLLECTIBLE CURRENCY & RARE BILLS ---
  // ============================================
  {
    id: 'bill-1934-10000-dollar',
    name: '1934 $10,000 Federal Reserve Note',
    subtitle: 'Salmon P. Chase Portrait Banknote',
    category: 'currency',
    year: 1934,
    rarity: 'Ultra High Denomination',
    currentMarketPrice: 480000,
    gradePrices: {
      raw: 140000,
      psa8: 240000,
      psa9: 360000,
      psa10: 480000,
      bgs9_5: 410000,
    },
    change24h: 4.2,
    volume24h: '$650,000',
    popReport: 'PMG Gem 66 EPQ: Fewer than 18 known',
    lastSaleDate: 'Oct 09, 2026',
    priceHistory7d: [450000, 455000, 460000, 465000, 470000, 475000, 480000],
    recentComps: [
      { date: 'Oct 09, 2026', price: 480000, platform: 'Heritage Auctions', grade: 'PMG Gem 66 EPQ', verified: true },
      { date: 'Sep 11, 2026', price: 238000, platform: 'PWCC', grade: 'PMG Choice 58', verified: true },
    ],
    description: 'The highest denomination banknote ever circulated among the general public in the United States, bearing Treasury Secretary Salmon P. Chase.',
    specs: {
      centering: 'Wide balanced margins on intaglio print',
      surface: 'Original fiber-embedded banknote paper',
      edges: 'Clean guillotine factory margins',
      corners: 'Zero corner bends or pinholes',
      authCode: 'PMG #9482103'
    },
    isHot: true,
    accentColor: '#10b981'
  },
  {
    id: 'bill-1890-1000-grand-watermelon',
    name: '1890 $1,000 "Grand Watermelon" Treasury Note',
    subtitle: 'General George Meade Treasury Note',
    category: 'currency',
    year: 1890,
    rarity: 'World’s Most Valuable Banknote',
    currentMarketPrice: 3290000,
    gradePrices: {
      raw: 850000,
      psa8: 1600000,
      psa9: 2500000,
      psa10: 3290000,
      bgs9_5: 2900000,
    },
    change24h: 0.1,
    volume24h: 'Heritage Auction Record',
    popReport: 'PCGS Banknote 63: 2 in Private Hands',
    lastSaleDate: 'Auction Record',
    priceHistory7d: [3290000, 3290000, 3290000, 3290000, 3290000, 3290000, 3290000],
    recentComps: [
      { date: 'Heritage Record', price: 3290000, platform: 'Heritage Auctions', grade: 'PCGS Choice 63', verified: true }
    ],
    description: 'Nicknamed the "Grand Watermelon" because the large green zeros on the reverse resemble watermelons. The highest priced paper money note in numismatic history.',
    specs: {
      centering: 'Wide intaglio border margins',
      surface: 'Vivid red Treasury seal and green watermelon reverse',
      edges: 'Crisp hand-cut paper',
      corners: 'Sharp corners with zero fold wear',
      authCode: 'PCGS-B #1890001'
    },
    isHot: false,
    accentColor: '#059669'
  },
  {
    id: 'bill-1934-100000-gold-cert',
    name: '1934 $100,000 Gold Certificate',
    subtitle: 'President Woodrow Wilson Series 1934',
    category: 'currency',
    year: 1934,
    rarity: 'Apex Institutional Specimen',
    currentMarketPrice: 15000000,
    gradePrices: {
      raw: 5000000,
      psa8: 9000000,
      psa9: 12000000,
      psa10: 15000000,
      bgs9_5: 13500000,
    },
    change24h: 0.0,
    volume24h: 'Smithsonian Institutional',
    popReport: 'Zero Legal in Private Hands (BEP & Fed only)',
    lastSaleDate: 'Federal Reserve Reserve',
    priceHistory7d: [15000000, 15000000, 15000000, 15000000, 15000000, 15000000, 15000000],
    recentComps: [
      { date: 'Official Appraisal', price: 15000000, platform: 'Heritage Auctions', grade: 'Specimen Uncirculated', verified: true }
    ],
    description: 'The highest denomination banknote ever printed by the U.S. Bureau of Engraving and Printing, used exclusively for gold transactions between Federal Reserve Banks.',
    specs: {
      centering: 'Perfect 50/50 Bureau of Engraving print',
      surface: 'Special golden orange reverse intaglio',
      edges: 'Pristine uncut museum margins',
      corners: 'Sharp specimen corners',
      authCode: 'BEP #1934001'
    },
    isHot: false,
    accentColor: '#eab308'
  },
  {
    id: 'bill-1882-1000-gold-cert',
    name: '1882 $1,000 Gold Certificate',
    subtitle: 'Alexander Hamilton Large Size Note',
    category: 'currency',
    year: 1882,
    rarity: 'Nineteenth Century Gold Currency',
    currentMarketPrice: 1950000,
    gradePrices: {
      raw: 350000,
      psa8: 850000,
      psa9: 1400000,
      psa10: 1950000,
      bgs9_5: 1700000,
    },
    change24h: 1.2,
    volume24h: '$410,000',
    popReport: 'PMG Choice About Unc 58: Pop 3',
    lastSaleDate: 'Sep 18, 2026',
    priceHistory7d: [1920000, 1930000, 1935000, 1940000, 1945000, 1950000, 1950000],
    recentComps: [
      { date: 'Sep 18, 2026', price: 1950000, platform: 'Heritage Auctions', grade: 'PMG AU-58', verified: true }
    ],
    description: 'Redeemable in gold coin at the United States Treasury. Features Alexander Hamilton on rich large-size banknote parchment.',
    specs: {
      centering: '50/50 Large note margins',
      surface: 'Brilliant golden-orange back intaglio',
      edges: 'Clean vintage edges',
      corners: 'Firm uncreased corners',
      authCode: 'PMG #8820019'
    },
    isHot: true,
    accentColor: '#f59e0b'
  }
];
