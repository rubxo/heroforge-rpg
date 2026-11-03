import { createSlice } from '@reduxjs/toolkit';

const initialState = { str: 5, agi: 5, int: 5, availablePoints: 15, currentHp: 100, bossHp: 250 };
const builds = {
  WARRIOR: { str: 17, agi: 8, int: 5 },
  MAGE: { str: 5, agi: 8, int: 17 },
  ROGUE: { str: 6, agi: 19, int: 5 },
  TANK: { str: 20, agi: 5, int: 5 },
};

const slice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    incrementStat(state, { payload: stat }) {
      if (state.availablePoints > 0) {
        state[stat]++;
        state.availablePoints--;
      }
    },
    decrementStat(state, { payload: stat }) {
      if (state[stat] > 1) {
        state[stat]--;
        state.availablePoints++;
      }
    },
    applyBuildPreset(state, { payload: build }) {
      Object.assign(state, builds[build], { availablePoints: 0 });
    },
    resetStats(state) {
      const { str, agi, int, availablePoints } = initialState;
      Object.assign(state, { str, agi, int, availablePoints });
    },
    takeDamage(state, { payload: damage }) {
      state.currentHp = Math.max(0, state.currentHp - damage);
    },
    resolveTurn(state, { payload: { attack, retaliation } }) {
      if (state.currentHp === 0 || state.bossHp === 0) return;
      state.bossHp = Math.max(0, state.bossHp - attack);
      state.currentHp = Math.max(0, state.currentHp - retaliation);
    },
    healHero(state) {
      state.currentHp = initialState.currentHp;
      state.bossHp = initialState.bossHp;
    },
  },
});

export const { incrementStat, decrementStat, applyBuildPreset, resetStats, takeDamage, resolveTurn, healHero } = slice.actions;
export default slice.reducer;
