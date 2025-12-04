module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/BudgetBox/frontend/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// frontend/lib/store.ts
__turbopack_context__.s([
    "useBudgetStore",
    ()=>useBudgetStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const emptyBudget = {
    income: 0,
    bills: 0,
    food: 0,
    transport: 0,
    subscriptions: 0,
    misc: 0,
    lastSavedAt: undefined,
    syncStatus: "local-only"
};
function currentMonthLabel() {
    return new Date().toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    }); // e.g. "December 2025"
}
const useBudgetStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>{
    const initialMonth = currentMonthLabel();
    return {
        selectedMonth: initialMonth,
        budgetsByMonth: {
            [initialMonth]: emptyBudget
        },
        budget: emptyBudget,
        setMonth: (month)=>{
            const state = get();
            const existing = state.budgetsByMonth[month] ?? {
                ...emptyBudget
            };
            set({
                selectedMonth: month,
                budget: existing,
                budgetsByMonth: {
                    ...state.budgetsByMonth,
                    [month]: existing
                }
            });
        },
        setField: (field, value)=>{
            const state = get();
            const month = state.selectedMonth;
            const current = state.budgetsByMonth[month] ?? {
                ...emptyBudget
            };
            const updated = {
                ...current,
                [field]: value,
                lastSavedAt: new Date().toISOString(),
                syncStatus: "sync-pending"
            };
            set({
                budget: updated,
                budgetsByMonth: {
                    ...state.budgetsByMonth,
                    [month]: updated
                }
            });
        },
        markSynced: (timestamp)=>{
            const state = get();
            const month = state.selectedMonth;
            const current = state.budgetsByMonth[month] ?? {
                ...emptyBudget
            };
            const updated = {
                ...current,
                lastSavedAt: timestamp,
                syncStatus: "synced"
            };
            set({
                budget: updated,
                budgetsByMonth: {
                    ...state.budgetsByMonth,
                    [month]: updated
                }
            });
        },
        replaceBudget: (serverBudget)=>{
            const state = get();
            const month = state.selectedMonth;
            const updated = {
                ...emptyBudget,
                ...serverBudget,
                lastSavedAt: serverBudget.updated_at || new Date().toISOString(),
                syncStatus: "synced"
            };
            set({
                budget: updated,
                budgetsByMonth: {
                    ...state.budgetsByMonth,
                    [month]: updated
                }
            });
        }
    };
}, {
    name: "budgetbox-store",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage)
}));
}),
"[project]/BudgetBox/frontend/lib/syncClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// frontend/lib/syncClient.ts
__turbopack_context__.s([
    "getLatest",
    ()=>getLatest,
    "postSync",
    ()=>postSync
]);
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:4000") || "http://localhost:4000";
async function postSync(budget, month) {
    const res = await fetch(`${API_BASE}/budget/sync`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            month,
            budget
        })
    });
    if (!res.ok) {
        throw new Error("Failed to sync");
    }
    const data = await res.json();
    // Expect backend to return { success, budget: { updated_at, ... } }
    const ts = data?.budget?.updated_at || data?.timestamp || new Date().toISOString();
    return {
        timestamp: ts
    };
}
async function getLatest(month) {
    const res = await fetch(`${API_BASE}/budget/latest?month=${encodeURIComponent(month)}`);
    if (!res.ok) {
        throw new Error("Failed to fetch latest");
    }
    return res.json();
}
}),
"[project]/BudgetBox/frontend/components/OfflineIndicator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/OfflineIndicator.tsx
__turbopack_context__.s([
    "default",
    ()=>OfflineIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$syncClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/lib/syncClient.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:4000") || "http://localhost:4000";
// small helper to fetch with timeout
async function fetchWithTimeout(url, opts = {}, timeout = 3000) {
    const controller = new AbortController();
    const id = setTimeout(()=>controller.abort(), timeout);
    try {
        const res = await fetch(url, {
            ...opts,
            signal: controller.signal
        });
        clearTimeout(id);
        return res;
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}
function OfflineIndicator() {
    const [online, setOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(typeof navigator !== "undefined" ? navigator.onLine : true);
    const [serverUp, setServerUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [checking, setChecking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const budget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.budget);
    const markSynced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.markSynced);
    const replaceBudget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.replaceBudget);
    const selectedMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.selectedMonth);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onOnline = ()=>setOnline(true);
        const onOffline = ()=>setOnline(false);
        window.addEventListener("online", onOnline);
        window.addEventListener("offline", onOffline);
        // initial server probe
        probeServer();
        // poll every 10s
        intervalRef.current = window.setInterval(probeServer, 10000);
        return ()=>{
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
        } catch  {
            setServerUp(false);
        } finally{
            setChecking(false);
        }
    }
    const doSync = async ()=>{
        if (!serverUp) {
            alert("Server is not reachable — cannot sync.");
            return;
        }
        try {
            const { income, bills, food, transport, subscriptions, misc } = budget;
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$syncClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["postSync"])({
                income,
                bills,
                food,
                transport,
                subscriptions,
                misc
            }, selectedMonth);
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
    const fetchLatestFromServer = async ()=>{
        if (!serverUp) {
            alert("Server is not reachable — cannot get latest.");
            return;
        }
        try {
            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$syncClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLatest"])(selectedMonth);
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
    const statusLabel = (()=>{
        if (!online) return "Device: offline";
        if (serverUp === null) return checking ? "Checking server…" : "Server: unknown";
        return serverUp ? "Server: online" : "Server: unreachable";
    })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "inline-flex flex-wrap items-center gap-3 bg-white/80 rounded-full border border-slate-200 px-4 py-2 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `h-2.5 w-2.5 rounded-full ${online ? "bg-emerald-500" : "bg-red-500"}`
                    }, void 0, false, {
                        fileName: "[project]/BudgetBox/frontend/components/OfflineIndicator.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-slate-700",
                        children: online ? "Online" : "Offline"
                    }, void 0, false, {
                        fileName: "[project]/BudgetBox/frontend/components/OfflineIndicator.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/BudgetBox/frontend/components/OfflineIndicator.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-xs px-2 py-1 rounded-full border ${budget.syncStatus === "synced" ? "border-emerald-500 text-emerald-600 bg-emerald-50" : budget.syncStatus === "sync-pending" ? "border-amber-500 text-amber-600 bg-amber-50" : "border-slate-300 text-slate-600 bg-slate-50"}`,
                children: budget.syncStatus ? `Status: ${budget.syncStatus}` : "Status: local-only"
            }, void 0, false, {
                fileName: "[project]/BudgetBox/frontend/components/OfflineIndicator.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: doSync,
                className: "rounded-full px-3 py-1.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60",
                children: "Sync"
            }, void 0, false, {
                fileName: "[project]/BudgetBox/frontend/components/OfflineIndicator.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: fetchLatestFromServer,
                className: "rounded-full px-3 py-1.5 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors",
                children: "Get Latest"
            }, void 0, false, {
                fileName: "[project]/BudgetBox/frontend/components/OfflineIndicator.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-slate-500",
                children: statusLabel
            }, void 0, false, {
                fileName: "[project]/BudgetBox/frontend/components/OfflineIndicator.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/BudgetBox/frontend/components/OfflineIndicator.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
}),
"[project]/BudgetBox/frontend/components/BudgetForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BudgetForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/lib/store.ts [app-ssr] (ecmascript)");
'use client';
;
;
function BudgetForm() {
    const budget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.budget);
    const setField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.setField);
    const fields = [
        [
            'income',
            'Income'
        ],
        [
            'bills',
            'Monthly Bills'
        ],
        [
            'food',
            'Food'
        ],
        [
            'transport',
            'Transport'
        ],
        [
            'subscriptions',
            'Subscriptions'
        ],
        [
            'misc',
            'Miscellaneous'
        ]
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "space-y-4 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold text-slate-900 mb-2",
                children: "Monthly Budget"
            }, void 0, false, {
                fileName: "[project]/BudgetBox/frontend/components/BudgetForm.tsx",
                lineNumber: 21,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: fields.map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm text-slate-700 w-32",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/components/BudgetForm.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: budget[key] ?? 0,
                                onChange: (e)=>setField(key, Number(e.target.value || 0)),
                                className: "flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                                min: 0
                            }, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/components/BudgetForm.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, String(key), true, {
                        fileName: "[project]/BudgetBox/frontend/components/BudgetForm.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this))
            }, void 0, false, {
                fileName: "[project]/BudgetBox/frontend/components/BudgetForm.tsx",
                lineNumber: 25,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-2 text-xs text-slate-500",
                children: [
                    "Last saved:",
                    " ",
                    budget.lastSavedAt ? new Date(budget.lastSavedAt).toLocaleString() : "—"
                ]
            }, void 0, true, {
                fileName: "[project]/BudgetBox/frontend/components/BudgetForm.tsx",
                lineNumber: 43,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/BudgetBox/frontend/components/BudgetForm.tsx",
        lineNumber: 20,
        columnNumber: 3
    }, this);
}
}),
"[project]/BudgetBox/frontend/components/Dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// frontend/components/Dashboard.tsx
__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/react-chartjs-2/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/chart.js/dist/chart.js [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ArcElement"], __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"]);
function Dashboard() {
    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.budget);
    const totalExpenses = b.bills + b.food + b.transport + b.subscriptions + b.misc || 0;
    const income = b.income || 0;
    const burnRate = income > 0 ? totalExpenses / income : 0;
    const savings = income - totalExpenses;
    const monthEndPrediction = totalExpenses * 2.5;
    const suggestions = [];
    if (income > 0) {
        if (b.food > 0.4 * income) suggestions.push('Reduce food spend next month.');
        if (b.subscriptions > 0.3 * income) suggestions.push('Consider cancelling unused apps.');
        if (savings < 0) suggestions.push('Your expenses exceed income.');
    }
    const pieData = {
        labels: [
            "Bills",
            "Food",
            "Transport",
            "Subscriptions",
            "Misc"
        ],
        datasets: [
            {
                data: [
                    b.bills,
                    b.food,
                    b.transport,
                    b.subscriptions,
                    b.misc
                ],
                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#f97316",
                    "#a855f7",
                    "#eab308"
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
                hoverOffset: 8
            }
        ]
    };
    const pieOptions = {
        plugins: {
            legend: {
                position: "right",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 8,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || "";
                        const value = context.parsed;
                        const total = b.bills + b.food + b.transport + b.subscriptions + b.misc || 1;
                        const pct = (value / total * 100).toFixed(1);
                        return `${label}: ₹${value} (${pct}%)`;
                    }
                }
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold text-slate-900",
                children: "Dashboard"
            }, void 0, false, {
                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                lineNumber: 79,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-b-black rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-slate-500",
                                children: "Burn Rate"
                            }, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                lineNumber: 84,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-2xl font-semibold text-slate-900",
                                children: [
                                    (burnRate * 100).toFixed(1),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                lineNumber: 85,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                        lineNumber: 83,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border  border-b-black rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-slate-500",
                                children: "Savings Potential"
                            }, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                lineNumber: 90,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-2xl font-semibold text-emerald-700",
                                children: [
                                    "₹ ",
                                    savings.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                lineNumber: 91,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                        lineNumber: 89,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border  border-b-black rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-slate-500",
                                children: "Month-End Prediction"
                            }, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                lineNumber: 96,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-2xl font-semibold text-slate-900",
                                children: [
                                    "₹ ",
                                    monthEndPrediction.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                lineNumber: 99,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                        lineNumber: 95,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                lineNumber: 81,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border  border-b-black rounded-xl p-4 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pie"], {
                            data: pieData,
                            options: pieOptions
                        }, void 0, false, {
                            fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                            lineNumber: 107,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                        lineNumber: 106,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border  border-b-black rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-slate-500 mb-2",
                                children: "Rule-based Warnings"
                            }, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                lineNumber: 110,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "text-sm text-slate-700 list-disc pl-4 space-y-1",
                                children: suggestions.length ? suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: s
                                    }, i, false, {
                                        fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                        lineNumber: 115,
                                        columnNumber: 39
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "No anomalies detected"
                                }, void 0, false, {
                                    fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                                lineNumber: 113,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                        lineNumber: 109,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
                lineNumber: 105,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/BudgetBox/frontend/components/Dashboard.tsx",
        lineNumber: 78,
        columnNumber: 3
    }, this);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/BudgetBox/frontend/app/dashboard/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/dashboard/page.tsx
__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$components$2f$OfflineIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/components/OfflineIndicator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$components$2f$BudgetForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/components/BudgetForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$components$2f$Dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/components/Dashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/BudgetBox/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const MONTH_OPTIONS = (()=>{
    const now = new Date();
    const labels = [];
    for(let i = 0; i < 6; i++){
        const d = new Date(now);
        d.setMonth(now.getMonth() - i);
        labels.push(d.toLocaleString("en-US", {
            month: "long",
            year: "numeric"
        })); // e.g. "December 2025"
    }
    return labels;
})();
function DashboardPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        router
    ]);
    const selectedMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.selectedMonth);
    const setMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBudgetStore"])((s)=>s.setMonth);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen px-4 py-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-semibold text-slate-900",
                                    children: "BudgetBox Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-500",
                                    children: "Track your monthly budget offline-first, sync when you're ready."
                                }, void 0, false, {
                                    fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: selectedMonth,
                                    onChange: (e)=>setMonth(e.target.value),
                                    className: "rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 bg-white shadow-sm",
                                    children: MONTH_OPTIONS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: m,
                                            children: m
                                        }, m, false, {
                                            fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$components$2f$OfflineIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "grid gap-6 md:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-sm border border-slate-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$components$2f$BudgetForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-sm border border-slate-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$BudgetBox$2f$frontend$2f$components$2f$Dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/BudgetBox/frontend/app/dashboard/page.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f3b68d11._.js.map