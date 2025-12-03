'use client'
import React from 'react'
import { useBudgetStore } from '@/lib/store'


export default function BudgetForm() {
  const budget = useBudgetStore((s: { budget: any }) => s.budget)
  const setField = useBudgetStore((s: { setField: any }) => s.setField)

  const fields: [keyof typeof budget, string][] = [
    ['income', 'Income'],
    ['bills', 'Monthly Bills'],
    ['food', 'Food'],
    ['transport', 'Transport'],
    ['subscriptions', 'Subscriptions'],
    ['misc', 'Miscellaneous'],
  ]

  return (
  <form className="space-y-4 p-6">
    <h2 className="text-xl font-semibold text-slate-900 mb-2">
      Monthly Budget
    </h2>

    <div className="space-y-3">
      {fields.map(([key, label]) => (
        <div
          key={String(key)}
          className="flex items-center justify-between gap-3"
        >
          <label className="text-sm text-slate-700 w-32">{label}</label>
          <input
            type="number"
            value={(budget[key] ?? 0) as any}
            onChange={(e) => setField(key as any, Number(e.target.value || 0))}
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={0}
          />
        </div>
      ))}
    </div>

    <div className="pt-2 text-xs text-slate-500">
      Last saved:{" "}
      {budget.lastSavedAt
        ? new Date(budget.lastSavedAt).toLocaleString()
        : "—"}
    </div>
  </form>
);

}
