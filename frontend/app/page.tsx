// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/90 shadow-lg rounded-2xl p-8 border border-slate-200">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-3">
          BudgetBox
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 mb-3">
          Local-first budget planner
        </h1>
        <p className="text-slate-600 mb-6">
          Capture your monthly expenses instantly, even when you&apos;re offline.
          Your data is stored on your device and can be synced to the server
          whenever you&apos;re online.
        </p>

        <div className="flex items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-colors"
          >
            Open Dashboard
          </Link>
          <span className="text-xs text-slate-500">
            Tip: Try disconnecting internet and editing numbers.
          </span>
        </div>
      </div>
    </main>
  );
}
