import { createSlice } from "@reduxjs/toolkit";

export type RewardsTier = "Bronze" | "Silver" | "Gold" | "Platinum";

export interface RewardsState {
  blinkCoins: number;
  dailySaveStreak: number;
  monthlySaveStreak: number;
  repaymentStreak: number;
  tier: RewardsTier;
}

const initialState: RewardsState = {
  blinkCoins: 2840,
  dailySaveStreak: 7,
  monthlySaveStreak: 4,
  repaymentStreak: 3,
  tier: "Gold",
};

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    addBlinkCoins: (state, action: { payload: number }) => {
      state.blinkCoins += action.payload;
    },
    applyBlinkCoinUsage: (state, action: { payload: { earned: number; used: number } }) => {
      state.blinkCoins = Math.max(0, state.blinkCoins + action.payload.earned - action.payload.used);
    },
  },
});

export const { addBlinkCoins, applyBlinkCoinUsage } = rewardsSlice.actions;

export default rewardsSlice.reducer;
