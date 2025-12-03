import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import localForage from 'localforage'

export type Budget = {
  id?: string
  month?: string // in YYYY-MM format'
  income: number
  bills: number
  food: number
  transport: number
  subscriptions: number
  misc: number
  lastSavedAt?: string
  syncedAt?: string | null
  syncStatus?: 'local-only' | 'sync-pending' | 'synced'
}

type State = {
  budget: Budget
  setField: <K extends keyof Budget>(key: K, value: Budget[K]) => void
  setBudget: (b: Partial<Budget>) => void
  replaceBudget: (b: Budget) => void
  markSynced: (timestamp: string) => void
}

const defaultBudget: Budget = {
  income: 0,
  bills: 0,
  food: 0,
  transport: 0,
  subscriptions: 0,
  misc: 0,
  syncStatus: 'local-only'
}

export const useBudgetStore = create<State>()(
  persist(
    (set, get) => ({
      budget: defaultBudget,
      setField: (key, value) => {
        const newBudget = { ...get().budget, [key]: value, lastSavedAt: new Date().toISOString(), syncStatus: 'sync-pending' as Budget['syncStatus'] }
        set({ budget: newBudget })
      },
      setBudget: (payload) => {
        const newBudget = { ...get().budget, ...payload, lastSavedAt: new Date().toISOString(), syncStatus: 'sync-pending' as Budget['syncStatus'] }
        set({ budget: newBudget })
      },
      replaceBudget: (b) => set({ budget: b }),
      markSynced: (timestamp) => set({ budget: { ...get().budget, syncedAt: timestamp, syncStatus: 'synced' } })
    }),
    {
      name: 'budgetbox-storage',
      version: 1,
      storage: createJSONStorage(() => localForage)
    }
  )
)
