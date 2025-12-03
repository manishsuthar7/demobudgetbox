-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- budgets
CREATE TABLE IF NOT EXISTS budgets (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  month TEXT,
  income NUMERIC DEFAULT 0,
  bills NUMERIC DEFAULT 0,
  food NUMERIC DEFAULT 0,
  transport NUMERIC DEFAULT 0,
  subscriptions NUMERIC DEFAULT 0,
  misc NUMERIC DEFAULT 0,
  updated_at TIMESTAMP DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'unique_user_month'
  ) THEN
    ALTER TABLE budgets
    ADD CONSTRAINT unique_user_month UNIQUE (user_id, month);
  END IF;
END$$;