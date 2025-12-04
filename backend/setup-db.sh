#!/bin/bash
# setup-db.sh - Initialize Neon database schema

set -e

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building TypeScript..."
npm run build

echo "🗄️ Running database setup..."

# Create a simple Node script to run the schema
cat > /tmp/init-db.js << 'EOF'
import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function initializeDatabase() {
  try {
    console.log('🔗 Connecting to Neon database...')
    
    // Test connection
    await pool.query('SELECT NOW()')
    console.log('✅ Connected successfully')
    
    // Read schema file
    const schemaPath = path.join(process.cwd(), 'src', 'db', 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    
    console.log('📝 Executing schema...')
    
    // Split by semicolon and execute each statement
    const statements = schema.split(';').filter(s => s.trim())
    
    for (const statement of statements) {
      await pool.query(statement)
    }
    
    console.log('✅ Database schema created successfully')
    
    await pool.end()
    console.log('✨ Setup complete!')
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

initializeDatabase()
EOF

node /tmp/init-db.js

echo "🎉 Database is ready!"
