// frontend/lib/syncClient.ts
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

import type { BudgetFields } from "./store";

export async function postSync(
  budget: BudgetFields,
  month: string
): Promise<{ timestamp?: string }> {
  const res = await fetch(`${API_BASE}/budget/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ month, budget }),
  });

  if (!res.ok) {
    throw new Error("Failed to sync");
  }

  const data = await res.json();
  // Expect backend to return { success, budget: { updated_at, ... } }
  const ts =
    data?.budget?.updated_at || data?.timestamp || new Date().toISOString();
  return { timestamp: ts };
}

export async function getLatest(month: string): Promise<{
  budget: any | null;
}> {
  const res = await fetch(
    `${API_BASE}/budget/latest?month=${encodeURIComponent(month)}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch latest");
  }
  return res.json();
}
