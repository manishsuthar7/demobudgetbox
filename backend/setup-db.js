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
    const schemaPath = path.join(__dirname, 'src', 'db', 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    
    console.log('📝 Executing schema...')
    
    // Execute entire schema at once (handles dollar-quoted strings properly)
    await pool.query(schema)
    
    console.log('✅ Database schema created successfully')
    
    await pool.end()
    console.log('✨ Setup complete!')
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

initializeDatabase()
