import { createSlice } from "@reduxjs/toolkit";

export interface Sip {
  id: string;
  name: string;
  amount: number;
  frequency: "weekly" | "monthly";
  nextInvestmentDate: string | null;
}

export interface SaveTransaction {
  id: string;
  sipId: string | null;
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
}

export interface SaveState {
  sips: Sip[];
  transactions: SaveTransaction[];
}

const initialState: SaveState = {
  sips: [],
  transactions: [],
};

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {},
});

export default saveSlice.reducer;
