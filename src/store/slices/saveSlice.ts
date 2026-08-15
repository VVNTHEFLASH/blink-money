import { createSlice } from "@reduxjs/toolkit";

export interface Sip {
  id: string;
  name: string;
  amount: number;
  frequency: "weekly" | "monthly";
  nextInvestmentDate: string | null;
}

type SipStatus =
  | "amount_selected"
  | "pending_payment"
  | "mandate_pending"
  | "active"
  | "paused"
  | "cancelled"
  | "failed"
  | "completed"
  | "closed"
  | "error"
  | "under_review";

export interface SaveTransaction {
  id: string;
  sipId: string | null;
  amount: number;
  date: string;
  status: SipStatus;
}

export interface SaveState {
  sips: Sip[];
  transactions: SaveTransaction[];
  investmentOrders: InvestmentOrder[];
  holdings: Holding[];
}

export interface InvestmentOrder {
  id: string;
  fundId: string;
  isin: string;
  fundName: string;
  status: SipStatus;
  sipAmount: string;
  frequency: "daily" | "monthly";
  investmentDay: number;
  goal: null;
  createdAt: string;
}

export interface Holding extends InvestmentOrder {
  orderId: string;
}

const initialState: SaveState = {
  sips: [],
  transactions: [],
  investmentOrders: [{ id: "INV_ORD10003849", fundId: "FND10000000", isin: "INF109K01761", fundName: "ICICI Prudential Multi-Asset Fund - Growth", status: "amount_selected", sipAmount: "100.00", frequency: "daily", investmentDay: 20, goal: null, createdAt: "2026-08-15T10:36:01.053Z" }],
  holdings: [{ id: "HLD_10000000", orderId: "INV_ORD10003849", fundId: "FND10000000", isin: "INF109K01761", fundName: "ICICI Prudential Multi-Asset Fund - Growth", status: "completed", sipAmount: "100.00", frequency: "daily", investmentDay: 20, goal: null, createdAt: "2026-08-15T10:36:01.053Z" }],
};

const saveSlice = createSlice({
  name: "save",
  initialState,
  reducers: {
    addInvestmentOrder: (state, action: { payload: InvestmentOrder }) => { state.investmentOrders.push(action.payload); },
    addHolding: (state, action: { payload: Holding }) => { state.holdings.push(action.payload); },
  },
});

export const { addInvestmentOrder, addHolding } = saveSlice.actions;

export default saveSlice.reducer;
