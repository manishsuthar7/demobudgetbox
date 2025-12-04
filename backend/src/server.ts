// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// 🔐 CORS – add your real Vercel URL
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://YOUR-VERCEL-URL.vercel.app", // TODO: replace
    ],
    credentials: true,
  })
);

// Demo user email
const DEMO_EMAIL = "hire-me@anshumat.org";

// helper – always use the same demo user
async function getDemoUserId() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [DEMO_EMAIL]
    );

    if (rows.length === 0) {
      // fallback: create row if seed not run
      const insert = await client.query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
        [DEMO_EMAIL, ""]
      );
      return insert.rows[0].id;
    }

    return rows[0].id;
  } finally {
    client.release();
  }
}

// simple root
app.get("/", (_req, res) => {
  res.json({ message: "BudgetBox backend running" });
});

/**
 * POST /budget/sync
 * body: { month: "December 2025", budget: { income, bills, food, transport, subscriptions, misc } }
 */
app.post("/budget/sync", async (req, res) => {
  const { month, budget } = req.body;

  if (!month || !budget) {
    return res
      .status(400)
      .json({ success: false, error: "month and budget are required" });
  }

  const userId = await getDemoUserId();

  const {
    income = 0,
    bills = 0,
    food = 0,
    transport = 0,
    subscriptions = 0,
    misc = 0,
  } = budget;

  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      INSERT INTO budgets
        (user_id, month, income, bills, food, transport, subscriptions, misc, updated_at)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, now())
      ON CONFLICT (user_id, month)
      DO UPDATE SET
        income = EXCLUDED.income,
        bills = EXCLUDED.bills,
        food = EXCLUDED.food,
        transport = EXCLUDED.transport,
        subscriptions = EXCLUDED.subscriptions,
        misc = EXCLUDED.misc,
        updated_at = now()
      RETURNING *;
      `,
      [userId, month, income, bills, food, transport, subscriptions, misc]
    );

    res.json({
      success: true,
      status: "synced",
      budget: result.rows[0],
    });
  } catch (err) {
    console.error("Error in /budget/sync:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to sync budget to server" });
  } finally {
    client.release();
  }
});

/**
 * GET /budget/latest?month=December%202025
 */
app.get("/budget/latest", async (req, res) => {
  const month = req.query.month as string;

  if (!month) {
    return res
      .status(400)
      .json({ success: false, error: "month query param is required" });
  }

  const userId = await getDemoUserId();
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM budgets
      WHERE user_id = $1 AND month = $2
      ORDER BY updated_at DESC
      LIMIT 1;
      `,
      [userId, month]
    );

    if (rows.length === 0) {
      return res.json({ success: true, budget: null });
    }

    res.json({ success: true, budget: rows[0] });
  } catch (err) {
    console.error("Error in /budget/latest:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch latest budget" });
  } finally {
    client.release();
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});


app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// POST /login  (demo login for reviewer)
app.post('/login', async (req, res) => {
  try {
    // Optionally, you can check database connectivity here if needed.
    // For now, remove the dbConnected check since it's not defined.

    const { email, password } = req.body as {
      email?: string
      password?: string
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: 'Email and password are required' })
    }

    // Look up user by email
    const result = await pool.query(
      'SELECT id, email, password_hash FROM users WHERE email=$1',
      [email]
    )

    if (result.rowCount === 0) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid email or password' })
    }

    const user = result.rows[0]

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid email or password' })
    }

    // For this assignment we don’t need JWT, just confirm login success
    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    return res
      .status(500)
      .json({ success: false, error: 'Internal server error' })
  }
})
