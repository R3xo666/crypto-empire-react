import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { equipmentData, managerData, researchData, cryptoData, achievementData } from './gameData';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

// Utility functions
const formatNumber = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return Math.floor(num).toLocaleString();
};

const calculateEquipmentCost = (baseEquip, owned) => {
  return Math.floor(baseEquip.baseCost * Math.pow(1.15, owned));
};

const calculateResearchCost = (baseResearch, level) => {
  return Math.floor(baseResearch.baseCost * Math.pow(2, level));
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('cryptoEmpireGameState');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      coins: 10,
      totalCoinsEarned: 10,
      coinsPerSecond: 0,
      clickPower: 1,
      totalClicks: 0,
      goldenBlocks: 0,
      prestigeCount: 0,
      prestigeBonus: 0,
      equipment: {},
      managers: {},
      research: {},
      investments: {},
      achievements: {},
      unlockedAchievements: [],
      profitTrades: 0,
      startTime: Date.now(),
      lastSave: Date.now(),
      settings: {
        soundEnabled: true,
        notificationsEnabled: true,
        particlesEnabled: true
      }
    };
  });

  const [notifications, setNotifications] = useState([]);
  const [currentTab, setCurrentTab] = useState('mine');

  // Auto-save game state
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('cryptoEmpireGameState', JSON.stringify(gameState));
    }, 5000);
    return () => clearInterval(saveInterval);
  }, [gameState]);

  // Game loop - calculate coins per second
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameState(prev => {
        let cps = 0;
        
        // Calculate from equipment
        equipmentData.forEach(equip => {
          const owned = prev.equipment[equip.id] || 0;
          if (owned > 0) {
            cps += equip.baseCps * owned;
          }
        });

        // Apply manager multipliers
        let multiplier = 1;
        managerData.forEach(manager => {
          if (prev.managers[manager.id]) {
            if (manager.type === 'multiplier') {
              multiplier *= manager.effect;
            }
          }
        });

        // Apply research bonuses
        researchData.forEach(research => {
          const level = prev.research[research.id] || 0;
          if (level > 0 && research.type === 'cpsBoost') {
            multiplier *= (1 + research.effect * level);
          }
        });

        // Apply prestige bonus
        if (prev.prestigeBonus > 0) {
          multiplier *= (1 + prev.prestigeBonus / 100);
        }

        cps *= multiplier;

        const coinsGained = cps / 10; // Update every 100ms

        return {
          ...prev,
          coins: prev.coins + coinsGained,
          totalCoinsEarned: prev.totalCoinsEarned + coinsGained,
          coinsPerSecond: cps
        };
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, []);

  // Auto-click from Junior Manager
  useEffect(() => {
    if (!gameState.managers['junior']) return;

    const autoClickInterval = setInterval(() => {
      handleMineClick(true);
    }, 100);

    return () => clearInterval(autoClickInterval);
  }, [gameState.managers]);

  const handleMineClick = useCallback((isAuto = false) => {
    setGameState(prev => {
      let power = prev.clickPower;
      
      if (prev.managers['junior'] && isAuto) {
        power = managerData.find(m => m.id === 'junior').effect;
      }

      const coinsGained = power;
      
      return {
        ...prev,
        coins: prev.coins + coinsGained,
        totalCoinsEarned: prev.totalCoinsEarned + coinsGained,
        totalClicks: isAuto ? prev.totalClicks : prev.totalClicks + 1
      };
    });

    checkAchievements();
  }, []);

  const buyEquipment = useCallback((equipId) => {
    const equip = equipmentData.find(e => e.id === equipId);
    const owned = gameState.equipment[equipId] || 0;
    const cost = calculateEquipmentCost(equip, owned);

    if (gameState.coins >= cost) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - cost,
        equipment: {
          ...prev.equipment,
          [equipId]: (prev.equipment[equipId] || 0) + 1
        }
      }));

      addNotification(`Bought ${equip.name}!`, 'success');
      checkAchievements();
    }
  }, [gameState.coins, gameState.equipment]);

  const hireManager = useCallback((managerId) => {
    const manager = managerData.find(m => m.id === managerId);
    
    if (gameState.coins >= manager.cost && !gameState.managers[managerId]) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - manager.cost,
        managers: {
          ...prev.managers,
          [managerId]: true
        }
      }));

      addNotification(`Hired ${manager.name}!`, 'success');
      checkAchievements();
    }
  }, [gameState.coins, gameState.managers]);

  const buyResearch = useCallback((researchId) => {
    const research = researchData.find(r => r.id === researchId);
    const currentLevel = gameState.research[researchId] || 0;
    
    if (currentLevel >= research.maxLevel) return;

    const cost = calculateResearchCost(research, currentLevel);

    if (gameState.coins >= cost) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - cost,
        research: {
          ...prev.research,
          [researchId]: currentLevel + 1
        }
      }));

      addNotification(`Researched ${research.name}!`, 'success');
      checkAchievements();
    }
  }, [gameState.coins, gameState.research]);

  const buyCrypto = useCallback((cryptoId, amount) => {
    const crypto = cryptoData.find(c => c.id === cryptoId);
    const price = crypto.basePrice * (1 + (Math.random() - 0.5) * crypto.volatility * 2);
    const totalCost = price * amount;

    if (gameState.coins >= totalCost) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - totalCost,
        investments: {
          ...prev.investments,
          [cryptoId]: {
            amount: (prev.investments[cryptoId]?.amount || 0) + amount,
            avgPrice: ((prev.investments[cryptoId]?.avgPrice || 0) * (prev.investments[cryptoId]?.amount || 0) + totalCost) / 
                     ((prev.investments[cryptoId]?.amount || 0) + amount)
          }
        }
      }));

      addNotification(`Bought ${amount} ${crypto.symbol}!`, 'success');
    }
  }, [gameState.coins, gameState.investments]);

  const sellCrypto = useCallback((cryptoId, amount) => {
    const crypto = cryptoData.find(c => c.id === cryptoId);
    const owned = gameState.investments[cryptoId]?.amount || 0;
    
    if (owned < amount) return;

    const currentPrice = crypto.basePrice * (1 + (Math.random() - 0.5) * crypto.volatility * 2);
    const totalValue = currentPrice * amount;
    const avgPrice = gameState.investments[cryptoId].avgPrice;
    const profit = totalValue - (avgPrice * amount);

    setGameState(prev => ({
      ...prev,
      coins: prev.coins + totalValue,
      profitTrades: profit > 0 ? prev.profitTrades + 1 : prev.profitTrades,
      investments: {
        ...prev.investments,
        [cryptoId]: {
          ...prev.investments[cryptoId],
          amount: owned - amount
        }
      }
    }));

    addNotification(`Sold ${amount} ${crypto.symbol} for ${formatNumber(totalValue)} coins!`, 
                   profit > 0 ? 'success' : 'warning');
    
    if (profit > 0) checkAchievements();
  }, [gameState.investments]);

  const performPrestige = useCallback(() => {
    const goldenBlocksEarned = Math.floor(Math.sqrt(gameState.totalCoinsEarned / 1000000));
    
    if (goldenBlocksEarned <= 0) {
      addNotification('You need at least 1M total coins to prestige!', 'error');
      return;
    }

    setGameState({
      coins: 10,
      totalCoinsEarned: 10,
      coinsPerSecond: 0,
      clickPower: 1,
      totalClicks: 0,
      goldenBlocks: gameState.goldenBlocks + goldenBlocksEarned,
      prestigeCount: gameState.prestigeCount + 1,
      prestigeBonus: (gameState.goldenBlocks + goldenBlocksEarned) * 5,
      equipment: {},
      managers: {},
      research: {},
      investments: {},
      achievements: gameState.achievements,
      unlockedAchievements: gameState.unlockedAchievements,
      profitTrades: 0,
      startTime: Date.now(),
      lastSave: Date.now(),
      settings: gameState.settings
    });

    addNotification(`Prestiged! Earned ${goldenBlocksEarned} Golden Blocks!`, 'success');
    checkAchievements();
  }, [gameState]);

  const checkAchievements = useCallback(() => {
    achievementData.forEach(achievement => {
      if (gameState.unlockedAchievements.includes(achievement.id)) return;

      let unlocked = false;

      switch (achievement.type) {
        case 'coins':
          unlocked = gameState.totalCoinsEarned >= achievement.requirement;
          break;
        case 'equipment':
          const totalEquipment = Object.values(gameState.equipment).reduce((a, b) => a + b, 0);
          unlocked = totalEquipment >= achievement.requirement;
          break;
        case 'clicks':
          unlocked = gameState.totalClicks >= achievement.requirement;
          break;
        case 'managers':
          unlocked = Object.keys(gameState.managers).length >= achievement.requirement;
          break;
        case 'research':
          unlocked = Object.keys(gameState.research).length >= achievement.requirement;
          break;
        case 'prestige':
          unlocked = gameState.prestigeCount >= achievement.requirement;
          break;
        case 'profitTrades':
          unlocked = gameState.profitTrades >= achievement.requirement;
          break;
        case 'speedrun':
          const timePlayed = (Date.now() - gameState.startTime) / 1000 / 60;
          unlocked = gameState.totalCoinsEarned >= 1000000 && timePlayed <= 5;
          break;
      }

      if (unlocked) {
        setGameState(prev => ({
          ...prev,
          goldenBlocks: prev.goldenBlocks + achievement.reward,
          unlockedAchievements: [...prev.unlockedAchievements, achievement.id]
        }));
        addNotification(`Achievement Unlocked: ${achievement.name}! +${achievement.reward} Golden Blocks`, 'achievement');
      }
    });
  }, [gameState]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const value = {
    gameState,
    notifications,
    currentTab,
    setCurrentTab,
    handleMineClick,
    buyEquipment,
    hireManager,
    buyResearch,
    buyCrypto,
    sellCrypto,
    performPrestige,
    formatNumber,
    calculateEquipmentCost,
    calculateResearchCost
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
