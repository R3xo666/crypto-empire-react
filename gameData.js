// Equipment data for the game
export const equipmentData = [
  // Tier 1
  { id: 'laptop', name: 'Laptop Miner', icon: '💻', baseCost: 10, baseCps: 0.1, tier: 1 },
  { id: 'desktop', name: 'Desktop Rig', icon: '🖥️', baseCost: 50, baseCps: 0.5, tier: 1 },
  { id: 'gaming', name: 'Gaming PC', icon: '🎮', baseCost: 200, baseCps: 2, tier: 1 },
  { id: 'asic', name: 'ASIC Miner', icon: '⚙️', baseCost: 1000, baseCps: 10, tier: 1 },
  // Tier 2
  { id: 'farm', name: 'Mining Farm', icon: '🏭', baseCost: 5000, baseCps: 50, tier: 2 },
  { id: 'warehouse', name: 'Warehouse Facility', icon: '🏢', baseCost: 25000, baseCps: 250, tier: 2 },
  { id: 'complex', name: 'Industrial Complex', icon: '🏗️', baseCost: 125000, baseCps: 1200, tier: 2 },
  { id: 'cooling', name: 'Cooling Center', icon: '❄️', baseCost: 625000, baseCps: 6000, tier: 2 },
  // Tier 3
  { id: 'datacenter', name: 'Data Center', icon: '🏛️', baseCost: 3000000, baseCps: 30000, tier: 3 },
  { id: 'serverfarm', name: 'Server Farm', icon: '🖧', baseCost: 15000000, baseCps: 150000, tier: 3 },
  { id: 'blockchain', name: 'Blockchain Hub', icon: '⛓️', baseCost: 75000000, baseCps: 750000, tier: 3 },
  { id: 'quantum', name: 'Quantum Processor', icon: '⚛️', baseCost: 375000000, baseCps: 3750000, tier: 3 },
  // Tier 4
  { id: 'ai', name: 'AI Mining Network', icon: '🤖', baseCost: 1875000000, baseCps: 18750000, tier: 4 },
  { id: 'satellite', name: 'Satellite Array', icon: '🛰️', baseCost: 9375000000, baseCps: 93750000, tier: 4 },
  { id: 'lunar', name: 'Lunar Mining Base', icon: '🌙', baseCost: 46875000000, baseCps: 468750000, tier: 4 },
  { id: 'mars', name: 'Mars Colony', icon: '🔴', baseCost: 234375000000, baseCps: 2343750000, tier: 4 },
  // Tier 5
  { id: 'station', name: 'Space Station', icon: '🛸', baseCost: 1171875000000, baseCps: 11718750000, tier: 5 },
  { id: 'dyson', name: 'Dyson Sphere', icon: '☀️', baseCost: 5859375000000, baseCps: 58593750000, tier: 5 },
  { id: 'multiverse', name: 'Multiverse Portal', icon: '🌌', baseCost: 29296875000000, baseCps: 292968750000, tier: 5 },
  { id: 'time', name: 'Time Miner', icon: '⏰', baseCost: 146484375000000, baseCps: 1464843750000, tier: 5 }
];

export const managerData = [
  { id: 'junior', name: 'Junior Manager', icon: '👔', cost: 1000, effect: 10, type: 'autoclick' },
  { id: 'senior', name: 'Senior Manager', icon: '💼', cost: 50000, effect: 2, type: 'multiplier' },
  { id: 'director', name: 'Director', icon: '👨‍💼', cost: 1000000, effect: 3, type: 'multiplier' },
  { id: 'ceo', name: 'CEO', icon: '🎩', cost: 50000000, effect: 5, type: 'multiplier' },
  { id: 'quantumai', name: 'Quantum AI', icon: '🤖', cost: 1000000000, effect: 10, type: 'multiplier' }
];

export const researchData = [
  { id: 'efficiency', name: 'Mining Efficiency', icon: '⚡', baseCost: 500, maxLevel: 20, effect: 0.1, type: 'cpsBoost' },
  { id: 'overclock', name: 'Overclocking', icon: '🔥', baseCost: 2000, maxLevel: 15, effect: 0.15, type: 'cpsBoost' },
  { id: 'cooling', name: 'Cooling Systems', icon: '🧊', baseCost: 10000, maxLevel: 10, effect: 0.2, type: 'cpsBoost' },
  { id: 'energy', name: 'Energy Optimization', icon: '💡', baseCost: 50000, maxLevel: 10, effect: 0.25, type: 'cpsBoost' },
  { id: 'network', name: 'Network Expansion', icon: '🌐', baseCost: 100000, maxLevel: 5, effect: 0.5, type: 'offlineBoost' },
  { id: 'quantumtech', name: 'Quantum Computing', icon: '⚛️', baseCost: 1000000, maxLevel: 5, effect: 0.1, type: 'prestigeBoost' }
];

export const cryptoData = [
  { id: 'btc', symbol: 'BTC', name: 'BitCoin', icon: '₿', basePrice: 1000, volatility: 0.02 },
  { id: 'eth', symbol: 'ETH', name: 'EthCoin', icon: 'Ξ', basePrice: 500, volatility: 0.05 },
  { id: 'doge', symbol: 'DOGE', name: 'DogeCoin', icon: '🐕', basePrice: 100, volatility: 0.15 },
  { id: 'moon', symbol: 'MOON', name: 'MoonCoin', icon: '🌙', basePrice: 50, volatility: 0.30 },
  { id: 'qtm', symbol: 'QTM', name: 'QuantumCoin', icon: '⚛️', basePrice: 2000, volatility: 0.10 }
];

export const achievementData = [
  { id: 'first', name: 'First Coin', icon: '🪙', desc: 'Mine your first coin', requirement: 1, type: 'coins', reward: 1 },
  { id: 'hundred', name: 'Getting Started', icon: '💰', desc: 'Mine 1,000 coins', requirement: 1000, type: 'coins', reward: 2 },
  { id: 'thousand', name: 'Coin Master', icon: '💎', desc: 'Mine 100,000 coins', requirement: 100000, type: 'coins', reward: 3 },
  { id: 'million', name: 'Millionaire', icon: '🏆', desc: 'Mine 1 million coins', requirement: 1000000, type: 'coins', reward: 5 },
  { id: 'billion', name: 'Billionaire', icon: '👑', desc: 'Mine 1 billion coins', requirement: 1000000000, type: 'coins', reward: 10 },
  { id: 'trillion', name: 'Trillionaire', icon: '💫', desc: 'Mine 1 trillion coins', requirement: 1000000000000, type: 'coins', reward: 25 },
  { id: 'firstequip', name: 'First Purchase', icon: '🛒', desc: 'Buy your first equipment', requirement: 1, type: 'equipment', reward: 1 },
  { id: 'collector', name: 'Equipment Collector', icon: '🏭', desc: 'Own 100 total equipment', requirement: 100, type: 'equipment', reward: 3 },
  { id: 'tycoon', name: 'Equipment Tycoon', icon: '🏢', desc: 'Own 500 total equipment', requirement: 500, type: 'equipment', reward: 10 },
  { id: 'empire', name: 'Mining Empire', icon: '🌍', desc: 'Own 1000 total equipment', requirement: 1000, type: 'equipment', reward: 20 },
  { id: 'clicker', name: 'Clicking Master', icon: '👆', desc: 'Click 1,000 times', requirement: 1000, type: 'clicks', reward: 2 },
  { id: 'hyperclicker', name: 'Hyper Clicker', icon: '🖱️', desc: 'Click 10,000 times', requirement: 10000, type: 'clicks', reward: 5 },
  { id: 'automation', name: 'Automation Expert', icon: '🤖', desc: 'Hire all managers', requirement: 5, type: 'managers', reward: 5 },
  { id: 'researcher', name: 'Tech Researcher', icon: '🔬', desc: 'Unlock all research', requirement: 6, type: 'research', reward: 10 },
  { id: 'prestige1', name: 'Prestige Pioneer', icon: '⭐', desc: 'Prestige for the first time', requirement: 1, type: 'prestige', reward: 10 },
  { id: 'prestige5', name: 'Prestige Veteran', icon: '🌟', desc: 'Prestige 5 times', requirement: 5, type: 'prestige', reward: 15 },
  { id: 'prestige10', name: 'Prestige Legend', icon: '✨', desc: 'Prestige 10 times', requirement: 10, type: 'prestige', reward: 25 },
  { id: 'investor', name: 'Smart Investor', icon: '📈', desc: 'Make a profitable trade', requirement: 1, type: 'profitTrades', reward: 3 },
  { id: 'trader', name: 'Master Trader', icon: '💹', desc: 'Make 50 profitable trades', requirement: 50, type: 'profitTrades', reward: 10 },
  { id: 'speedrun', name: 'Speed Runner', icon: '⚡', desc: 'Reach 1M coins in under 5 minutes', requirement: 1, type: 'speedrun', reward: 15 }
];