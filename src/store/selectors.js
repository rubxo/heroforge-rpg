import { createSelector } from '@reduxjs/toolkit';

export const selectStats = state => state.stats;
export const selectInventory = state => state.inventory;

export const selectEquippedItems = createSelector([selectInventory], ({ catalog, equippedIds }) =>
  equippedIds.map(id => catalog.find(item => item.id === id)),
);

export const selectTotalStats = createSelector([selectStats, selectEquippedItems], (stats, items) =>
  items.reduce((total, item) => ({
    str: total.str + item.bonusStr,
    agi: total.agi + item.bonusAgi,
    int: total.int + item.bonusInt,
  }), { str: stats.str, agi: stats.agi, int: stats.int }),
);

export const selectTotalWeight = createSelector([selectEquippedItems], items =>
  items.reduce((weight, item) => weight + item.weight, 0),
);

export const selectCapacity = state => 10 + selectTotalStats(state).str * 2;
export const selectIsOverencumbered = state => selectTotalWeight(state) > selectCapacity(state);

export const selectCombatPower = createSelector(
  [selectTotalStats, selectIsOverencumbered],
  ({ str, agi, int }, overloaded) => Math.round((str * 3 + agi * 2 + int * 3) * (overloaded ? 0.7 : 1)),
);

export const selectHeroVisualClass = createSelector(
  [selectTotalStats, selectIsOverencumbered, selectEquippedItems],
  ({ str, agi, int }, overloaded, items) => {
    if (overloaded || (str >= 20 && str >= int && str >= agi)) return { name: 'Tanque Pesado', icon: '🛡️', color: '#fbbf24' };
    if (int >= 15 && int >= str && int >= agi) return { name: 'Archimago', icon: '🧙', color: '#c4a7ff' };
    if (agi >= 15 && agi >= str && agi >= int) return { name: 'Explorador', icon: '🏹', color: '#6ee7b7' };
    if (str >= 15 && items.some(item => item.category === 'arma')) return { name: 'Guerrero Berserker', icon: '🗡️', color: '#fb7185' };
    if (str >= 15) return { name: 'Guerrero Berserker', icon: '🪓', color: '#fb7185' };
    return { name: 'Aldeano', icon: '🧑', color: '#a5b4fc' };
  },
);

export const selectSpeed = state => Math.floor(selectTotalStats(state).agi * (selectIsOverencumbered(state) ? 0.5 : 1));
