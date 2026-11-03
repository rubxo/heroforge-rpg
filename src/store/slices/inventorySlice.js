import { createSlice } from '@reduxjs/toolkit';

const catalog = [
  { id: 'fire', name: 'Espada de Fuego', icon: '⚔️', category: 'arma', bonusStr: 7, bonusAgi: 0, bonusInt: 0, weight: 9 },
  { id: 'shield', name: 'Escudo de Titanio', icon: '🛡️', category: 'escudo', bonusStr: 3, bonusAgi: 0, bonusInt: 0, weight: 16 },
  { id: 'staff', name: 'Báculo Arcano', icon: '🪄', category: 'arma', bonusStr: 0, bonusAgi: 0, bonusInt: 10, weight: 5 },
  { id: 'boots', name: 'Botas Élficas', icon: '🥾', category: 'botas', bonusStr: 0, bonusAgi: 7, bonusInt: 0, weight: 3 },
  { id: 'armor', name: 'Armadura Maldita', icon: '🦺', category: 'armadura', bonusStr: 0, bonusAgi: 0, bonusInt: 2, weight: 25 },
  { id: 'ring', name: 'Anillo Lunar', icon: '💍', category: 'accesorio', bonusStr: 0, bonusAgi: 2, bonusInt: 4, weight: 1 },
];

const slice = createSlice({
  name: 'inventory',
  initialState: { catalog, equippedIds: [] },
  reducers: {
    toggleEquipItem(state, { payload: id }) {
      const index = state.equippedIds.indexOf(id);
      if (index >= 0) state.equippedIds.splice(index, 1);
      else if (catalog.some(item => item.id === id)) state.equippedIds.push(id);
    },
    clearEquipment(state) {
      state.equippedIds = [];
    },
  },
});

export const { toggleEquipItem, clearEquipment } = slice.actions;
export default slice.reducer;
