import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

let dbConnected = false

// Simple seed function to create demo user (run on server start)
async function ensureDemoUser() {
  try {
    const demoEmail = 'hire-me@anshumat.org'
    const demoPassword = 'HireMe@2025!'
    const hash = await bcrypt.hash(demoPassword, 10)
    const res = await pool.query('SELECT id FROM users WHERE email=$1', [demoEmail])
    if (res.rowCount === 0) {
      await pool.query('INSERT INTO users(email, password_hash) VALUES($1,$2)', [demoEmail, hash])
      console.log('Demo user created:', demoEmail)
    } else {
      console.log('Demo user exists')
    }
    dbConnected = true
  } catch (err) {
    console.warn('⚠️ Database connection failed:', (err as any).code)
    console.warn('Running in offline mode - database features disabled')
    dbConnected = false
  }
}

// simple health endpoint
app.get('/health', async (req, res) => {
  try {
    if (dbConnected) {
      await pool.query('SELECT 1')
      return res.json({ ok: true, db: true })
    } else {
      return res.status(503).json({ ok: true, db: false })
    }
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) })
  }
})


// POST /budget/sync
// Body: budget object (include user_id or use basic token in header in production)
app.post('/budget/sync', async (req, res) => {
  try {
    if (!dbConnected) {
      return res.status(503).json({ success: false, error: 'Database not connected' })
    }
    const b = req.body
    // For demo: find demo user id
    const u = await pool.query('SELECT id FROM users WHERE email=$1', ['hire-me@anshumat.org'])
    const userId = u.rows[0].id

    // Upsert by month+user
    const upsert = await pool.query(`
      INSERT INTO budgets (user_id, month, income, bills, food, transport, subscriptions, misc, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8, now())
      ON CONFLICT (user_id, month) DO UPDATE SET
        income = EXCLUDED.income,
        bills = EXCLUDED.bills,
        food = EXCLUDED.food,
        transport = EXCLUDED.transport,
        subscriptions = EXCLUDED.subscriptions,
        misc = EXCLUDED.misc,
        updated_at = now()
      RETURNING updated_at
    `, [userId, b.month || new Date().toISOString().slice(0,7), b.income, b.bills, b.food, b.transport, b.subscriptions, b.misc])

    return res.json({ success: true, timestamp: (upsert.rows[0].updated_at).toISOString() })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: String(err) })
  }
})

// GET /budget/latest
app.get('/budget/latest', async (req, res) => {
  try {
    if (!dbConnected) {
      return res.status(503).json({ error: 'Database not connected' })
    }
    const u = await pool.query('SELECT id FROM users WHERE email=$1', ['hire-me@anshumat.org'])
    const userId = u.rows[0].id
    const q = await pool.query('SELECT * FROM budgets WHERE user_id=$1 ORDER BY updated_at DESC LIMIT 1', [userId])
    if (q.rowCount === 0) return res.json({ budget: null })
    res.json({ budget: q.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: String(err) })
  }
})

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, async () => {
  console.log(`Backend running on ${PORT}`)
  await ensureDemoUser()
})

// Handle errors
server.on('error', (err) => {
  console.error('Server error:', err)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
})

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://demobudgetbox-webtechpoint-mytipumt4.vercel.app",
    "https://demobudgetbox.vercel.app", // ← Use your real Vercel domain here
  ],
  credentials: true,
}));
