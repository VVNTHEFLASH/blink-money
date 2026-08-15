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
  reducers: {},
});

export default rewardsSlice.reducer;
