// frontend/components/Dashboard.tsx
'use client'
import React from 'react'
import { useBudgetStore } from '../lib/store'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard() {
  const b = useBudgetStore(s => s.budget)
  const totalExpenses = (b.bills + b.food + b.transport + b.subscriptions + b.misc) || 0
  const income = b.income || 0
  const burnRate = income > 0 ? totalExpenses / income : 0
  const savings = income - totalExpenses

  const monthEndPrediction = totalExpenses * 2.5

  const suggestions: string[] = []
  if (income > 0) {
    if (b.food > 0.4 * income) suggestions.push('Reduce food spend next month.')
    if (b.subscriptions > 0.3 * income) suggestions.push('Consider cancelling unused apps.')
    if (savings < 0) suggestions.push('Your expenses exceed income.')
  }

  const pieData = {
  labels: ["Bills", "Food", "Transport", "Subscriptions", "Misc"],
  datasets: [
    {
      data: [b.bills, b.food, b.transport, b.subscriptions, b.misc],
      backgroundColor: [
        "#3b82f6", // Bills - blue
        "#22c55e", // Food - green
        "#f97316", // Transport - orange
        "#a855f7", // Subscriptions - purple
        "#eab308", // Misc - yellow
      ],
      borderColor: "#ffffff",
      borderWidth: 2,
      hoverOffset: 8,
    },
  ],
};

const pieOptions = {
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 8,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || "";
          const value = context.parsed;
          const total =
            b.bills +
            b.food +
            b.transport +
            b.subscriptions +
            b.misc ||
            1;
          const pct = ((value / total) * 100).toFixed(1);
          return `${label}: ₹${value} (${pct}%)`;
        },
      },
    },
  },
};

  return (
  <div className="p-6 space-y-4">
    <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>

    <div className="grid gap-4 md:grid-cols-3">
      {/* metric cards */}
      <div className="border border-b-black rounded-xl p-4">
        <p className="text-xs font-medium text-slate-500">Burn Rate</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          {(burnRate * 100).toFixed(1)}%
        </p>
      </div>
      <div className="border  border-b-black rounded-xl p-4">
        <p className="text-xs font-medium text-slate-500">Savings Potential</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-700">
          ₹ {savings.toFixed(2)}
        </p>
      </div>
      <div className="border  border-b-black rounded-xl p-4">
        <p className="text-xs font-medium text-slate-500">
          Month-End Prediction
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">
          ₹ {monthEndPrediction.toFixed(2)}
        </p>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="border  border-b-black rounded-xl p-4 flex items-center justify-center">
        <Pie data={pieData} options={pieOptions} />
      </div>
      <div className="border  border-b-black rounded-xl p-4">
        <p className="text-xs font-medium text-slate-500 mb-2">
          Rule-based Warnings
        </p>
        <ul className="text-sm text-slate-700 list-disc pl-4 space-y-1">
          {suggestions.length ? (
            suggestions.map((s, i) => <li key={i}>{s}</li>)
          ) : (
            <li>No anomalies detected</li>
          )}
        </ul>
      </div>
    </div>
  </div>
);

}
