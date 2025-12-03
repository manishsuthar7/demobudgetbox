// app/dashboard/page.tsx
"use client";

import OfflineIndicator from "../../components/OfflineIndicator";
import BudgetForm from "../../components/BudgetForm";
import Dashboard from "../../components/Dashboard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top bar */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              BudgetBox Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Track your monthly budget offline-first, sync when you&apos;re ready.
            </p>
          </div>
          <OfflineIndicator />
        </header>

        {/* Content */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <BudgetForm />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <Dashboard />
          </div>
        </section>
      </div>
    </main>
  );
}
