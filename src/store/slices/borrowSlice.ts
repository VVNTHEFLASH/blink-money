import { createSlice } from "@reduxjs/toolkit";

export interface Loan {
  id: string;
  principal: number;
  outstandingAmount: number;
  interestRate: number;
  status: "active" | "paid" | "pending";
  dueDate: string | null;
}

export interface RepaymentTransaction {
  id: string;
  loanId: string;
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
}

export interface BorrowState {
  loans: Loan[];
  repaymentTransactions: RepaymentTransaction[];
}

const initialState: BorrowState = {
  loans: [],
  repaymentTransactions: [],
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {},
});

export default borrowSlice.reducer;
