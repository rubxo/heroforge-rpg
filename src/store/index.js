import { configureStore } from '@reduxjs/toolkit';
import stats from './slices/statsSlice.js';
import inventory from './slices/inventorySlice.js';
import actionLog from './slices/actionLogSlice.js';

export const store = configureStore({ reducer: { stats, inventory, actionLog } });
