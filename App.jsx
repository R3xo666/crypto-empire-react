import React from 'react';
import { GameProvider, useGame } from './GameContext';
import { equipmentData, managerData, researchData, cryptoData, achievementData } from './gameData';
import './App.css';

// Main Mine Component
const MineSection = () => {
  const { gameState, handleMineClick, formatNumber } = useGame();

  return (
    <div className="mine-section">
      <div className="stats-display">
        <div className="stat-item">
          <span className="stat-icon">🪙</span>
          <div>
            <div className="stat-label">Coins</div>
            <div className="stat-value">{formatNumber(gameState.coins)}</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">⚡</span>
          <div>
            <div className="stat-label">Per Second</div>
            <div className="stat-value">{formatNumber(gameState.coinsPerSecond)}</div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">⭐</span>
          <div>
            <div className="stat-label">Golden Blocks</div>
            <div className="stat-value">{gameState.goldenBlocks}</div>
          </div>
        </div>
      </div>

      <button className="mine-button" onClick={() => handleMineClick()}>
        <span className="mine-icon">⛏️</span>
        <span>MINE</span>
        <span className="mine-power">+{gameState.clickPower}</span>
      </button>

      <div className="progress-info">
        <div>Total Mined: {formatNumber(gameState.totalCoinsEarned)}</div>
        <div>Total Clicks: {gameState.totalClicks.toLocaleString()}</div>
      </div>
    </div>
  );
};

// Equipment Shop Component
const EquipmentShop = () => {
  const { gameState, buyEquipment, formatNumber, calculateEquipmentCost } = useGame();

  return (
    <div className="shop-section">
      <h2>⚙️ Equipment Shop</h2>
      <div className="shop-grid">
        {equipmentData.map(equip => {
          const owned = gameState.equipment[equip.id] || 0;
          const cost = calculateEquipmentCost(equip, owned);
          const canAfford = gameState.coins >= cost;

          return (
            <div key={equip.id} className={`shop-item ${!canAfford ? 'disabled' : ''}`}>
              <div className="shop-item-header">
                <span className="shop-icon">{equip.icon}</span>
                <div>
                  <div className="shop-name">{equip.name}</div>
                  <div className="shop-tier">Tier {equip.tier}</div>
                </div>
              </div>
              <div className="shop-stats">
                <div>+{formatNumber(equip.baseCps)}/s</div>
                <div className="owned">Owned: {owned}</div>
              </div>
              <button 
                onClick={() => buyEquipment(equip.id)}
                disabled={!canAfford}
                className="buy-button"
              >
                Buy: {formatNumber(cost)} 🪙
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Managers Component
const ManagersSection = () => {
  const { gameState, hireManager, formatNumber } = useGame();

  return (
    <div className="managers-section">
      <h2>👔 Hire Managers</h2>
      <div className="managers-grid">
        {managerData.map(manager => {
          const hired = gameState.managers[manager.id];
          const canAfford = gameState.coins >= manager.cost && !hired;

          return (
            <div key={manager.id} className={`manager-card ${hired ? 'hired' : ''}`}>
              <span className="manager-icon">{manager.icon}</span>
              <div className="manager-info">
                <div className="manager-name">{manager.name}</div>
                <div className="manager-effect">
                  {manager.type === 'autoclick' 
                    ? `Auto-clicks ${manager.effect}/s` 
                    : `${manager.effect}x multiplier`}
                </div>
              </div>
              {hired ? (
                <div className="hired-badge">✓ HIRED</div>
              ) : (
                <button 
                  onClick={() => hireManager(manager.id)}
                  disabled={!canAfford}
                  className="hire-button"
                >
                  Hire: {formatNumber(manager.cost)} 🪙
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Research Component
const ResearchSection = () => {
  const { gameState, buyResearch, formatNumber, calculateResearchCost } = useGame();

  return (
    <div className="research-section">
      <h2>🔬 Research Lab</h2>
      <div className="research-grid">
        {researchData.map(research => {
          const level = gameState.research[research.id] || 0;
          const cost = calculateResearchCost(research, level);
          const canAfford = gameState.coins >= cost && level < research.maxLevel;
          const maxed = level >= research.maxLevel;

          return (
            <div key={research.id} className={`research-card ${maxed ? 'maxed' : ''}`}>
              <span className="research-icon">{research.icon}</span>
              <div className="research-info">
                <div className="research-name">{research.name}</div>
                <div className="research-level">Level: {level}/{research.maxLevel}</div>
                <div className="research-effect">
                  {research.type === 'cpsBoost' && `+${research.effect * 100}% CPS per level`}
                  {research.type === 'offlineBoost' && `+${research.effect * 100}% offline earnings`}
                  {research.type === 'prestigeBoost' && `+${research.effect * 100}% prestige bonus`}
                </div>
              </div>
              {maxed ? (
                <div className="maxed-badge">MAX</div>
              ) : (
                <button 
                  onClick={() => buyResearch(research.id)}
                  disabled={!canAfford}
                  className="research-button"
                >
                  Research: {formatNumber(cost)} 🪙
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Crypto Trading Component
const TradingSection = () => {
  const { gameState, buyCrypto, sellCrypto, formatNumber } = useGame();
  const [tradeAmount, setTradeAmount] = React.useState(1);

  return (
    <div className="trading-section">
      <h2>💹 Crypto Trading</h2>
      <div className="crypto-grid">
        {cryptoData.map(crypto => {
          const owned = gameState.investments[crypto.id]?.amount || 0;
          const avgPrice = gameState.investments[crypto.id]?.avgPrice || 0;
          const currentPrice = crypto.basePrice * (1 + (Math.random() - 0.5) * crypto.volatility * 2);

          return (
            <div key={crypto.id} className="crypto-card">
              <div className="crypto-header">
                <span className="crypto-icon">{crypto.icon}</span>
                <div>
                  <div className="crypto-name">{crypto.name}</div>
                  <div className="crypto-symbol">{crypto.symbol}</div>
                </div>
              </div>
              <div className="crypto-stats">
                <div>Price: {formatNumber(currentPrice)} 🪙</div>
                <div>Owned: {owned}</div>
                {owned > 0 && (
                  <div className={currentPrice > avgPrice ? 'profit' : 'loss'}>
                    {currentPrice > avgPrice ? '📈' : '📉'} 
                    {((currentPrice - avgPrice) / avgPrice * 100).toFixed(2)}%
                  </div>
                )}
              </div>
              <div className="trade-controls">
                <input 
                  type="number" 
                  min="1" 
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="trade-input"
                />
                <div className="trade-buttons">
                  <button 
                    onClick={() => buyCrypto(crypto.id, tradeAmount)}
                    className="buy-crypto-btn"
                  >
                    Buy
                  </button>
                  <button 
                    onClick={() => sellCrypto(crypto.id, tradeAmount)}
                    disabled={owned < tradeAmount}
                    className="sell-crypto-btn"
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Achievements Component
const AchievementsSection = () => {
  const { gameState } = useGame();

  return (
    <div className="achievements-section">
      <h2>🏆 Achievements</h2>
      <div className="achievements-grid">
        {achievementData.map(achievement => {
          const unlocked = gameState.unlockedAchievements.includes(achievement.id);

          return (
            <div key={achievement.id} className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}>
              <span className="achievement-icon">{achievement.icon}</span>
              <div className="achievement-info">
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-desc">{achievement.desc}</div>
                <div className="achievement-reward">+{achievement.reward} ⭐</div>
              </div>
              {unlocked && <div className="unlock-badge">✓</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Prestige Component
const PrestigeSection = () => {
  const { gameState, performPrestige, formatNumber } = useGame();
  const goldenBlocksEarned = Math.floor(Math.sqrt(gameState.totalCoinsEarned / 1000000));

  return (
    <div className="prestige-section">
      <h2>⭐ Prestige System</h2>
      <div className="prestige-info">
        <p>Reset your progress to earn Golden Blocks and permanent bonuses!</p>
        <div className="prestige-stats">
          <div>Current Golden Blocks: {gameState.goldenBlocks}</div>
          <div>Prestige Bonus: +{gameState.prestigeBonus}%</div>
          <div>Times Prestiged: {gameState.prestigeCount}</div>
        </div>
        <div className="prestige-preview">
          {goldenBlocksEarned > 0 ? (
            <div className="can-prestige">
              You will earn <strong>{goldenBlocksEarned}</strong> Golden Blocks!
              <div className="bonus-info">Each block grants +5% to all production</div>
            </div>
          ) : (
            <div className="cannot-prestige">
              You need at least 1M total coins to prestige.
            </div>
          )}
        </div>
        <button 
          onClick={performPrestige}
          disabled={goldenBlocksEarned <= 0}
          className="prestige-button"
        >
          PRESTIGE NOW
        </button>
      </div>
    </div>
  );
};

// Notifications Component
const Notifications = () => {
  const { notifications } = useGame();

  return (
    <div className="notifications-container">
      {notifications.map(notif => (
        <div key={notif.id} className={`notification notification-${notif.type}`}>
          {notif.message}
        </div>
      ))}
    </div>
  );
};

// Main App Component
const GameApp = () => {
  const { currentTab, setCurrentTab } = useGame();

  return (
    <div className="app">
      <header className="app-header">
        <h1>⛏️ Crypto Empire Tycoon</h1>
        <div className="app-subtitle">Build Your Mining Empire!</div>
      </header>

      <nav className="app-nav">
        <button onClick={() => setCurrentTab('mine')} className={currentTab === 'mine' ? 'active' : ''}>
          ⛏️ Mine
        </button>
        <button onClick={() => setCurrentTab('equipment')} className={currentTab === 'equipment' ? 'active' : ''}>
          ⚙️ Equipment
        </button>
        <button onClick={() => setCurrentTab('managers')} className={currentTab === 'managers' ? 'active' : ''}>
          👔 Managers
        </button>
        <button onClick={() => setCurrentTab('research')} className={currentTab === 'research' ? 'active' : ''}>
          🔬 Research
        </button>
        <button onClick={() => setCurrentTab('trading')} className={currentTab === 'trading' ? 'active' : ''}>
          💹 Trading
        </button>
        <button onClick={() => setCurrentTab('achievements')} className={currentTab === 'achievements' ? 'active' : ''}>
          🏆 Achievements
        </button>
        <button onClick={() => setCurrentTab('prestige')} className={currentTab === 'prestige' ? 'active' : ''}>
          ⭐ Prestige
        </button>
      </nav>

      <main className="app-content">
        {currentTab === 'mine' && <MineSection />}
        {currentTab === 'equipment' && <EquipmentShop />}
        {currentTab === 'managers' && <ManagersSection />}
        {currentTab === 'research' && <ResearchSection />}
        {currentTab === 'trading' && <TradingSection />}
        {currentTab === 'achievements' && <AchievementsSection />}
        {currentTab === 'prestige' && <PrestigeSection />}
      </main>

      <Notifications />
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
}

export default App;
