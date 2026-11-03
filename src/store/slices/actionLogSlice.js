import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'actionLog',
  initialState: { entries: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      action => action.type.startsWith('stats/') || action.type.startsWith('inventory/'),
      (state, action) => {
        state.entries.unshift({ type: action.type, payload: action.payload ?? null });
        if (state.entries.length > 5) state.entries.pop();
      },
    );
  },
}).reducer;
