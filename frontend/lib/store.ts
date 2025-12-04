// frontend/lib/store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SyncStatus = "local-only" | "sync-pending" | "synced";

export type BudgetFields = {
  income: number;
  bills: number;
  food: number;
  transport: number;
  subscriptions: number;
  misc: number;
};

export type Budget = BudgetFields & {
  lastSavedAt?: string;
  syncStatus?: SyncStatus;
};

type StoreState = {
  selectedMonth: string;
  budgetsByMonth: Record<string, Budget>;
  budget: Budget;
  setMonth: (month: string) => void;
  setField: (field: keyof BudgetFields, value: number) => void;
  markSynced: (timestamp: string) => void;
  replaceBudget: (serverBudget: Partial<BudgetFields> & { updated_at?: string }) => void;
};

const emptyBudget: Budget = {
  income: 0,
  bills: 0,
  food: 0,
  transport: 0,
  subscriptions: 0,
  misc: 0,
  lastSavedAt: undefined,
  syncStatus: "local-only",
};

function currentMonthLabel() {
  return new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  }); // e.g. "December 2025"
}

export const useBudgetStore = create<StoreState>()(
  persist(
    (set, get) => {
      const initialMonth = currentMonthLabel();
      return {
        selectedMonth: initialMonth,
        budgetsByMonth: { [initialMonth]: emptyBudget },
        budget: emptyBudget,

        setMonth: (month) => {
          const state = get();
          const existing = state.budgetsByMonth[month] ?? { ...emptyBudget };
          set({
            selectedMonth: month,
            budget: existing,
            budgetsByMonth: {
              ...state.budgetsByMonth,
              [month]: existing,
            },
          });
        },

        setField: (field, value) => {
          const state = get();
          const month = state.selectedMonth;
          const current = state.budgetsByMonth[month] ?? { ...emptyBudget };

          const updated: Budget = {
            ...current,
            [field]: value,
            lastSavedAt: new Date().toISOString(),
            syncStatus: "sync-pending",
          };

          set({
            budget: updated,
            budgetsByMonth: {
              ...state.budgetsByMonth,
              [month]: updated,
            },
          });
        },

        markSynced: (timestamp) => {
          const state = get();
          const month = state.selectedMonth;
          const current = state.budgetsByMonth[month] ?? { ...emptyBudget };
          const updated: Budget = {
            ...current,
            lastSavedAt: timestamp,
            syncStatus: "synced",
          };
          set({
            budget: updated,
            budgetsByMonth: {
              ...state.budgetsByMonth,
              [month]: updated,
            },
          });
        },

        replaceBudget: (serverBudget) => {
          const state = get();
          const month = state.selectedMonth;
          const updated: Budget = {
            ...emptyBudget,
            ...serverBudget,
            lastSavedAt:
              serverBudget.updated_at || new Date().toISOString(),
            syncStatus: "synced",
          };
          set({
            budget: updated,
            budgetsByMonth: {
              ...state.budgetsByMonth,
              [month]: updated,
            },
          });
        },
      };
    },
    {
      name: "budgetbox-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
