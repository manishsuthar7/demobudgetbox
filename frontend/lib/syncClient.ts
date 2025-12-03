import axios from 'axios'
import type { Budget } from './store'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function postSync(budget: Budget) {
  const res = await axios.post(`${API_BASE}/budget/sync`, budget, { headers: { 'content-type': 'application/json' } })
  return res.data // { success: true, timestamp: 'ISO' }
}

export async function getLatest() {
  const res = await axios.get(`${API_BASE}/budget/latest`)
  return res.data // { budget: {...} }
}
