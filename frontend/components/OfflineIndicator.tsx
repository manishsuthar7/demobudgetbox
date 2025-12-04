// components/OfflineIndicator.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useBudgetStore } from "../lib/store";
import { postSync, getLatest } from "../lib/syncClient";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL;

// small helper to fetch with timeout
async function fetchWithTimeout(
  url: string,
  opts: RequestInit = {},
  timeout = 3000
) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export default function OfflineIndicator() {
  const [online, setOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [serverUp, setServerUp] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const budget = useBudgetStore((s) => s.budget);
  const markSynced = useBudgetStore((s) => s.markSynced);
  const replaceBudget = useBudgetStore((s) => s.replaceBudget);
  const selectedMonth = useBudgetStore((s) => s.selectedMonth);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    // initial server probe
    probeServer();
    // poll every 10s
    intervalRef.current = window.setInterval(probeServer, 10000);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function probeServer() {
    if (!navigator.onLine) {
      setServerUp(false);
      return;
    }
    setChecking(true);
    try {
      const res = await fetchWithTimeout(`${API_BASE}/health`, {}, 3000);
      setServerUp(res.ok);
    } catch {
      setServerUp(false);
    } finally {
      setChecking(false);
    }
  }

  const doSync = async () => {
    if (!serverUp) {
      alert("Server is not reachable — cannot sync.");
      return;
    }
    try {
      const { income, bills, food, transport, subscriptions, misc } = budget;
      const res = await postSync(
        { income, bills, food, transport, subscriptions, misc },
        selectedMonth
      );
      if (res && res.timestamp) {
        markSynced(res.timestamp);
        alert("Synced ✅ at " + res.timestamp);
      } else {
        alert("Sync returned unexpected response");
      }
    } catch (err) {
      console.error(err);
      alert("Sync failed — still local-only.");
      setServerUp(false);
    }
  };

  const fetchLatestFromServer = async () => {
    if (!serverUp) {
      alert("Server is not reachable — cannot get latest.");
      return;
    }
    try {
      const r = await getLatest(selectedMonth);
      if (r && r.budget) {
        replaceBudget(r.budget);
        alert("Replaced with latest from server");
      } else {
        alert("No server copy found for this month");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch latest");
      setServerUp(false);
    }
  };

  const statusLabel = (() => {
    if (!online) return "Device: offline";
    if (serverUp === null)
      return checking ? "Checking server…" : "Server: unknown";
    return serverUp ? "Server: online" : "Server: unreachable";
  })();

  return (
    <div className="inline-flex flex-wrap items-center gap-3 bg-white/80 rounded-full border border-slate-200 px-4 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            online ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-slate-700">
          {online ? "Online" : "Offline"}
        </span>
      </div>

      <span
        className={`text-xs px-2 py-1 rounded-full border ${
          budget.syncStatus === "synced"
            ? "border-emerald-500 text-emerald-600 bg-emerald-50"
            : budget.syncStatus === "sync-pending"
            ? "border-amber-500 text-amber-600 bg-amber-50"
            : "border-slate-300 text-slate-600 bg-slate-50"
        }`}
      >
        {budget.syncStatus
          ? `Status: ${budget.syncStatus}`
          : "Status: local-only"}
      </span>

      <button
        onClick={doSync}
        className="rounded-full px-3 py-1.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60"
      >
        Sync
      </button>

      <button
        onClick={fetchLatestFromServer}
        className="rounded-full px-3 py-1.5 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
      >
        Get Latest
      </button>

      <span className="text-xs text-slate-500">{statusLabel}</span>
    </div>
  );
}

