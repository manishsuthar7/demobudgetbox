// app/dashboard/page.tsx
"use client";

import OfflineIndicator from "../../components/OfflineIndicator";
import BudgetForm from "../../components/BudgetForm";
import Dashboard from "../../components/Dashboard";
import { useBudgetStore } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MONTH_OPTIONS = (() => {
  const now = new Date();
  const labels: string[] = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(now);
    d.setMonth(now.getMonth() - i);
    labels.push(
      d.toLocaleString("en-US", { month: "long", year: "numeric" })
    ); // e.g. "December 2025"
  }
  return labels;
})();

export default function DashboardPage() {
 const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("bb_logged_in") === "true";
      if (!loggedIn) {
        router.replace("/login");
      }
    }
  }, [router]);

  const selectedMonth = useBudgetStore((s) => s.selectedMonth);
  const setMonth = useBudgetStore((s) => s.setMonth);

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
              Track your monthly budget offline-first, sync when you&apos;re
              ready.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setMonth(e.target.value)}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 bg-white shadow-sm"
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <OfflineIndicator />
          </div>
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
